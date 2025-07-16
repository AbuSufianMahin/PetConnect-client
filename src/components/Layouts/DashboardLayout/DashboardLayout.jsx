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
    HandCoins
} from "lucide-react";
import { Outlet } from 'react-router';

const DashboardLayout = () => {

    const userLinks = [
        {
            path: "/dashboard/add-pet",
            linkName: "Add a Pet",
            icon: PlusCircle
        },
        {
            path: "/dashboard/my-pets",
            linkName: "My Added Pets",
            icon: PawPrint
        },
        {
            path: "/dashboard/adoption-requests",
            linkName: "Adoption Requests",
            icon: Users
        },
        {
            path: "/dashboard/create-donation-campaign",
            linkName: "Create Donation Campaign",
            icon: HeartHandshake
        },
        {
            path: "/dashboard/my-donation-campaigns",
            linkName: "My Donation Campaigns",
            icon: FolderHeart
        },
        {
            path: "/dashboard/my-donations",
            linkName: "My Donations",
            icon: HandCoins
        }
    ]

    return (
        <SidebarProvider>

            <AppSidebar userLinks={userLinks} />

            <SidebarInset className="flex-1 flex flex-col h-screen">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
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
                <div className="bg-accent flex-1">
                    <Outlet></Outlet>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardLayout;