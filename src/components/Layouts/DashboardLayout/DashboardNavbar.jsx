import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import { NavLink } from "react-router";
import { useSidebar } from "../../ui/sidebar";
import useUserRole from "../../../hooks/useUserRole";
import DashboardLoadingSkeleton from "./DashboardLoadingSkeleton";
import { ShieldUser } from "lucide-react";

const DashboardNavbar = ({ userLinks, adminLinks }) => {
  const { toggleSidebar, isMobile } = useSidebar();
  const { role, isRoleLoading } = useUserRole();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-2 my-2">
        {/* <SidebarTrigger className="-ml-1" /> */}
        {
          isRoleLoading ?
            <DashboardLoadingSkeleton></DashboardLoadingSkeleton>
            :
            <>
              {
                userLinks.map((item, index) =>
                  <NavLink key={index} to={item.path}
                    className={({ isActive }) => `${isActive ? "hover:bg-primary bg-primary text-white" : ""} rounded-lg active:scale-95`} onClick={() => {
                      if (isMobile) {
                        toggleSidebar();
                      }

                    }}>

                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip={item.linkName}
                        className="px-4 py-5 hover:bg-accent active:bg-accent font-semibold cursor-pointer"
                      >
                        {item.icon && <item.icon />}
                        <span>{item.linkName}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                  </NavLink>
                )
              }

              {
                role === "admin" &&
                <>
                  <div className="flex items-center mt-5">
                    <div className="border-b flex-1"></div>
                    <div className="">
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          className="px-4 border flex-1"
                        >
                          <ShieldUser />
                          <span className="text-xs">Admin Section</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                    <div className="border-b flex-1"></div>
                  </div>


                  {
                    adminLinks.map((item, index) =>
                      <NavLink key={index} to={item.path}
                        className={({ isActive }) => `${isActive ? "hover:bg-primary bg-primary text-white" : ""} rounded-lg active:scale-95`} onClick={() => {
                          if (isMobile) {
                            toggleSidebar();
                          }

                        }}>

                        <SidebarMenuItem>
                          <SidebarMenuButton tooltip={item.linkName}
                            className="px-4 py-5 hover:bg-accent active:bg-accent font-semibold cursor-pointer"
                          >
                            {item.icon && <item.icon />}
                            <span>{item.linkName}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>

                      </NavLink>
                    )
                  }
                </>
              }

            </>
        }
      </SidebarMenu>
    </SidebarGroup >
  );
};

export default DashboardNavbar;


