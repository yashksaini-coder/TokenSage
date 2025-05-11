"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HomeIcon, SearchIcon, SettingsIcon, Coins } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Home",
    icon: <HomeIcon />,
    href: "/",
  },
  {
    label: "Explore",
    icon: <SearchIcon />,
    href: "/explore",
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
    href: "/settings",
  },
]


export function AppSidebar() {
  const path = usePathname();
  
  return (
    <Sidebar className="bg-accent">
      <SidebarHeader className="bg-accent flex justify-center items-center" />
      <div className="bg-accent flex justify-center items-center">
        <Coins className="w-6 h-6 text-primary mx-2 rounded-full" />
        <h1 className="text-xl font-bold">Web3 Perplexity</h1>
      </div>
      <SidebarContent className="bg-accent">
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild className={`p-5 py-6 hover:bg-primary/10 hover:font-bold 
                    ${path?.includes(item.href) && "font-bold"}`}>
                    <Link href={item.href}>
                      {item.icon}
                      <span className="text-lg">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-accent" />
    </Sidebar>
  )
}
