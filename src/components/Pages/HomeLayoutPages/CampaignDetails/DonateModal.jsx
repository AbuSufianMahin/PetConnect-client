import  { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "../../../ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from 'react-hook-form';
import { errorAlert, successAlert } from '../../../../Utilities/sweetAlerts';
import { errorToast } from '../../../../Utilities/toastAlerts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

const DonateForm = ({ setOpenDonateModal, maxAmount, campaignData, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const queryClient = useQueryClient();
    const { register, handleSubmit, watch } = useForm();
    const stripe = useStripe();
    const elements = useElements();

    const amount = watch("amount");

    const [isLoading, setIsLoading] = useState(false);
    const [cardError, setCardError] = useState("");

    const { _id } = campaignData;
    const handleDonate = async (data) => {
        if (parseFloat(data.amount) > maxAmount) {
            errorToast(`You can donate up to $${maxAmount.toLocaleString()} only.`, 2000)
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });



        if (error) {
            setCardError(error.message);
            return;
        } else {
            setCardError("");
        }

        setIsLoading(true);
        // create payment intent
        try {
            // Step 1: Create Payment Intent from backend
            const res = await axiosSecure.post("/create-payment-intent", {
                amount,
                campaignId: _id,
            });

            const clientSecret = res.data.clientSecret;

            // Step 2: Confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email,
                    },
                },
            });

            if (result.error) {
                console.error(result.error.message);
                errorAlert("Payment Failed", result.error.message || "Please try again.");

            } else if (result.paymentIntent.status === "succeeded") {
                setCardError("");
                successAlert("Donation Successful", "Your kind donation brings hope and help to a pet in need.");
                setOpenDonateModal(false);
                const donationData = {
                    userEmail: user.email,
                    amount: parseFloat(amount),
                    campaignId: _id,
                    transactionId: result.paymentIntent.id,
                    donatedAt: new Date().toISOString(),
                };

                // store data in mongoDB
                try {
                    await axiosSecure.post(`/donations?email=${user.email}`, donationData);
                } catch (err) {
                    console.error("Failed to log donation:", err);
                }

            }
        } catch (error) {
            console.log(error);
            errorAlert("Oops!", "We couldn't complete your donation. Please try again later.");
        }
        finally {
            setIsLoading(false);
            queryClient.invalidateQueries({ queryKey: ['recommendedCampaigns'] })
            refetch();
        }
    };

    return (
        <form onSubmit={handleSubmit(handleDonate)} className="space-y-4">
            <Input
                type="number"
                step="0.01"
                placeholder="Donation amount"
                {...register("amount", { required: true, min: 1 })}
            />

            <div className="border px-3 py-2 rounded-md shadow-sm bg-white dark:bg-background">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": { color: "#aab7c4" },
                            },
                            invalid: { color: "#9e2146" },
                        },
                    }}
                />
            </div>
            {cardError && <p className="text-xs text-red-500 -mt-3 ml-1">{cardError}</p>}

            <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={() => setOpenDonateModal(false)}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading || !amount || parseFloat(amount) <= 0 || !stripe}>
                    {isLoading ? "Processing..." : "Donate"}
                </Button>
            </DialogFooter>
        </form>
    );
};


export const DonateModal = ({ openDonateModal, setOpenDonateModal, campaignData, refetch }) => {
    const { petName, maxDonationAmount, donatedAmount } = campaignData;
    const remainingAmount = maxDonationAmount - donatedAmount;
    return (
        <Dialog open={openDonateModal} onOpenChange={setOpenDonateModal}>
            <DialogContent className="sm:max-w-[500px] px-2 md:px-6">
                <DialogHeader>
                    <DialogTitle className="text-xl">Donate for <span className='text-2xl font-bold font-delius-regular'>{petName}</span></DialogTitle>
                    <DialogDescription>
                        <span>Minimum donation: $1. Every bit helps 🐾</span>
                        <br />
                        <span>Please enter the amount (up to ${remainingAmount.toLocaleString()}) and complete your donation using a secure payment method.</span>
                    </DialogDescription>
                </DialogHeader>

                <DonateForm setOpenDonateModal={setOpenDonateModal} maxAmount={remainingAmount} campaignData={campaignData} refetch={refetch} />
            </DialogContent>
        </Dialog>
    );
};


