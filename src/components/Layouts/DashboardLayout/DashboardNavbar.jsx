import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router";

const DashboardNavbar = ({ userLinks }) => {
  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-2 my-2">
        {
          userLinks.map((item, index) =>
            <NavLink key={index} to={item.path}
              className={({ isActive }) => `${isActive? "hover:bg-primary bg-primary text-white" : ""} rounded-lg active:scale-95`}>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.linkName} 
                className="px-4 py-5 hover:bg-accent active:bg-accent font-semibold"
                >
                  {item.icon && <item.icon />}
                  <span>{item.linkName}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>


            </NavLink>
          )}
      </SidebarMenu>
    </SidebarGroup >
  );
};

export default DashboardNavbar;


