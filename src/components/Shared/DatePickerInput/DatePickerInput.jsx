import { useEffect, useState } from 'react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../ui/popover"
import { Button } from '../../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "../../ui/calendar"
import AnimatedFormError from '../AnimatedFormError/AnimatedFormError';
import { format } from 'date-fns';

function formatDate(date) {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime())
}

const DatePickerInput = ({ label = "Select Date", onDateChange, register, errors, resetDate }) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState()
    const [month, setMonth] = useState()
    const [value, setValue] = useState(formatDate())

    useEffect(() => {
        if (resetDate) {
            setDate(null)
            setMonth(null)
            setValue("")
        }
    }, [resetDate])

    const handleInputChange = (e) => {
        const inputDate = new Date(e.target.value)
        setValue(e.target.value)
        if (isValidDate(inputDate)) {

            setDate(inputDate)
            setMonth(inputDate)

            if (onDateChange) {
                onDateChange(inputDate)
            }
        }
    }

    const handleCalendarSelect = (selectedDate) => {
        setDate(selectedDate)
        setValue(formatDate(selectedDate))
        setOpen(false)
        if (onDateChange) {
            onDateChange(selectedDate)
        }
    }
    console.log(value)
    return (
        <>
            <div className="flex flex-col">
                <Label className="px-1 mb-1 text-base font-medium">
                    {label}
                </Label>
                <div className="relative flex">
                    <Input
                        type="text"
                        // value={format(value, "MMMM dd, yyyy")}
                        value={value}
                        placeholder="Select a date"
                        className="bg-background pr-10"
                        onChange={handleInputChange}
                        readOnly
                        onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                                e.preventDefault()
                                setOpen(true)
                            }
                        }}
                        {...register("deadline", {
                            required: "Donation deadline is required"
                        })}
                    />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className="absolute top-1/2 right-2 size-6 -translate-y-1/2 hover:text-secondary"
                            >
                                <CalendarIcon className="size-4" />
                                <span className="sr-only">Open calendar</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="end"
                            alignOffset={-8}
                            sideOffset={10}
                        >
                            <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                month={month}
                                onMonthChange={setMonth}
                                onSelect={handleCalendarSelect}
                                disabled={{ before: new Date() }}
                                maxDate={new Date("2030-12-31")}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

            </div>
            {errors.deadline && <AnimatedFormError message={errors.deadline.message}></AnimatedFormError>}
        </>
    );
};

export default DatePickerInput;