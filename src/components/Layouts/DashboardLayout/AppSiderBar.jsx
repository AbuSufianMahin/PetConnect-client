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
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,

  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import petConnectLogo from "../../../assets/images/PetConnect-logo.png"
import { NavLink } from "react-router"
import { SidebarMenuButton } from "../../ui/sidebar"
import DashboardNavbar from "./DashboardNavbar"
import { Separator } from "../../ui/separator"


const AppSidebar = ({userLinks}) => {
  console.log(userLinks);
 
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavLink to="/">
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

      </SidebarHeader>

      <div className="px-5">
        <Separator></Separator>
      </div>

      <SidebarContent>
        {/* DashBoard Navbar */}
        <DashboardNavbar userLinks={userLinks}/>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;