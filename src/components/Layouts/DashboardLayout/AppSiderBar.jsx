import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  X,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,

  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import petConnectLogo from "../../../assets/images/PetConnect-logo.png"
import { NavLink } from "react-router"
import { SidebarMenuButton, useSidebar } from "../../ui/sidebar"
import DashboardNavbar from "./DashboardNavbar"
import { Separator } from "../../ui/separator"
import { Button } from "../../ui/button"


const AppSidebar = ({ userLinks, adminLinks }) => {

  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="md:hidden ml-2">
            <Button
              variant="outline"
              onClick={() => toggleSidebar()}
              className=" hover:bg-red-50"
              size="icon"
            >
              <X size={36} strokeWidth={3} />
            </Button>
          </div>
          <NavLink to="/" className="">
            <SidebarMenuButton
              size="lg"
              className="hover:cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-2 mx-auto md:mx-0">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src={petConnectLogo} className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ">
                  <span className="truncate font-extrabold text-xl font-delius-regular">PetConnect</span>
                </div>
              </div>

            </SidebarMenuButton>

          </NavLink>

        </div>
      </SidebarHeader>

      <div className="px-2">
        <Separator></Separator>
      </div>

      <SidebarContent>
        {/* DashBoard Navbar */}
        <DashboardNavbar userLinks={userLinks} adminLinks={adminLinks} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;