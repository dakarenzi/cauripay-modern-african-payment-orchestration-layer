import React from "react";
import { LayoutDashboard, Smartphone, ListOrdered, Settings, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Simulator", icon: Smartphone, path: "/simulator" },
    { title: "Transactions", icon: ListOrdered, path: "/transactions" },
    { title: "Settings", icon: Settings, path: "/settings" },
  ];
  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-amber-500 flex items-center justify-center shadow-lg">
            <ShieldCheck className="text-white h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground">CauriPay</span>
            <span className="text-2xs font-medium text-muted-foreground uppercase tracking-widest">Orchestrator</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.path}
                  className={cn(
                    "transition-all duration-200 h-11",
                    location.pathname === item.path ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "hover:bg-accent"
                  )}
                >
                  <Link to={item.path}>
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-6 border-t border-border/50">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">DK</div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Dakar E-Shop</span>
            <span className="text-xs text-muted-foreground">Standard Tier</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}