import React from 'react';

import AppSidebar from "./AppSiderBar"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../../ui/breadcrumb"

import { Separator } from "../../ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../../ui/sidebar"

import {
    PlusCircle,
    PawPrint,
    Users,
    HeartHandshake,
    FolderHeart,
    HandCoins,
    ShieldCheck,
    Gift,
    Dog
} from "lucide-react";
import { Outlet } from 'react-router';

const DashboardLayout = () => {

    const userLinks = [
        {
            path: "/dashboard/add-pet",
            linkName: "Add Pet",
            icon: PlusCircle
        },
        {
            path: "/dashboard/my-pets",
            linkName: "My Pets",
            icon: PawPrint
        },
        {
            path: "/dashboard/received-adoption-requests",
            linkName: "Requests for My Pets",
            icon: Users
        },
        {
            path: "/dashboard/sent-adoption-requests",
            linkName: "My Sent Requests",
            icon: HeartHandshake
        },
        {
            path: "/dashboard/create-donation-campaign",
            linkName: "Create Campaign",
            icon: PlusCircle
        },
        {
            path: "/dashboard/my-donation-campaigns",
            linkName: "My Campaigns",
            icon: FolderHeart
        },
        {
            path: "/dashboard/my-donations",
            linkName: "My Donations",
            icon: HandCoins
        }

    ]


    const adminLinks = [
        {
            path: "/dashboard/all-users",
            linkName: "Users",
            icon: ShieldCheck,
        },
        {
            path: "/dashboard/all-pets",
            linkName: "All Pets",
            icon: Dog,
        },
        {
            path: "/dashboard/all-donations",
            linkName: "All Donations",
            icon: Gift,
        },
    ];

    return (
        <div className='w-full h-screen flex'>
            <SidebarProvider>

                <AppSidebar userLinks={userLinks} adminLinks={adminLinks}/>

                <SidebarInset className="flex-1 flex flex-col overflow-x-hidden">
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 border-b-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1 hover:text-secondary" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            {/* <div></div> */}
                            {/* <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb> */}
                        </div>
                    </header>
                    <div className="bg-accent overflow-y-auto flex-1">
                        <Outlet></Outlet>
                    </div>
                </SidebarInset>
            </SidebarProvider>

        </div>

    );
};

export default DashboardLayout;