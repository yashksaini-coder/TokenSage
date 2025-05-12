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
import { HomeIcon, SearchIcon, Coins, LogInIcon, LogOutIcon, Crown, Settings, ChevronDown, SettingsIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import * as React from "react";
import {AgentsDropdown} from "@/components/DashboardComponents/Agentsmenu";
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
  }
];

export function AppSidebar() {
  const path = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null; // or a loading spinner
  }

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
            {!isSignedIn ? (
              <div className="flex flex-col gap-2 mx-4">
                <SignInButton mode="modal">
                  <Button className="rounded-lg w-full bg-primary">
                    <LogInIcon className="mr-2" />
                    <span>Sign in</span>
                  </Button>
                </SignInButton>
              </div>
            ) : (
              <div className="mx-4">
                <SignOutButton>
                  <Button className="rounded-lg w-full bg-primary">
                    <LogOutIcon className="mr-2" />
                    <span>Sign out</span>
                  </Button>
                </SignOutButton>
              </div>
            )}
          </SidebarContent>
        </SidebarGroup>

        {/* Custom separator: short line, not touching the ends */}
        <div className="flex justify-center my-4">
          <div className="h-px bg-border" style={{ width: "85%" }} />
        </div>
        <AgentsDropdown />
      </SidebarContent>
      <SidebarFooter className="bg-accent">
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Unlock advanced features and analytics</p>
          </div>
          <Button variant="default" className="w-full rounded-lg">
            <Crown className="w-4 h-4 mr-2" />
            <span>Upgrade Now</span>
          </Button>
          {/* Custom separator: short line, not touching the ends */}
          <div className="flex justify-center my-4">
            <div className="h-px bg-border" style={{ width: "85%" }} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserButton />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Account</span>
                <span className="text-xs text-muted-foreground">Manage settings</span>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
