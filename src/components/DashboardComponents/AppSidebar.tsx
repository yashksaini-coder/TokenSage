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
import { HomeIcon, SearchIcon, SettingsIcon, Coins, LogInIcon, TwitterIcon, GithubIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

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
        <h1 className="text-xl font-bold">Token Sage</h1>
      </div>
      <SidebarContent className="bg-accent">
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild className={`p-5 py-6 hover:bg-primary/10 hover:font-bold 
                    ${path === item.href ? "font-bold" : ""}`}>
                    <Link href={item.href}>
                      {item.icon}
                      <span className="text-lg">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Button className="rounded-lg mx-4 mt-4 bg-primary">
              <LogInIcon />
              <span>Sign up</span>
            </Button>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-accent">
        <div className="p-8">
          <h2 className="text-gray-300">Try Pro</h2>
          <p className="text-gray-300">Get access to all features</p>
          <Button variant="outline" className="w-full rounded-lg px-4 mt-2 bg-primary text-gray-300">
            <LogInIcon />
            <span>Learn More</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
