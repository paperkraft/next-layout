'use client'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SidebarMenu  from "./Sidebar";
import { cn } from "@/lib/utils";
import { useConfig, userConfig } from "@/hooks/use-config";
import React, { useEffect } from "react";
import Header from "./Header";
import { useMounted } from "@/hooks/use-mounted";
import { useRouter } from "next/navigation";

function AppLayout({ children }:{children: React.ReactNode}) {
    const [config] = useConfig();
    const [user] = userConfig();
    const isMounted = useMounted();
    const router = useRouter();

    useEffect(()=>{
        if(isMounted && !user.email){
            router.replace('/sign-in')
        }
    },[user, isMounted, router])

    return (
        <React.Fragment>
            <Header />
            {
                config.layout === 'sidebar' &&
                <aside className="hidden sm:block md:fixed z-50 bg-background">
                    <SidebarMenu />
                </aside>
            }
            <main className={cn("p-4 mt-16",{"md:ml-56":config.layout === 'sidebar'})}>
                <ScrollArea className={cn("h-[calc(100vh-96px)] p-2",{"md:w-[calc(100vw-246px)]":config.layout === 'sidebar'})} aria-label="scrollarea">
                    <style>
                        {`
                            [data-radix-scroll-area-viewport] > div {
                                display:block !important;
                            }
                        `}
                    </style>
                    {children}
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            </main>
        </React.Fragment>
    );
}
export default AppLayout;