"use client";
import React, { useEffect, useState } from "react";
import {
  CircleUserRound,
  PowerIcon,
  Search,
  Settings,
  UserIcon
} from "lucide-react";
import Image from "next/image";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useConfig } from "@/hooks/use-config";
import SearchDialog from "./SearchDialog";
import { Button } from "@/components/ui/button";

const UserAction = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const [config, setConfig] = useConfig();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "q" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        localStorage.removeItem("user");
        router.replace("/sign-in");
      }
      if (e.key === "x" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        router.push("/settings");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [router]);

  const onDarkModeToggle = (e:boolean) => {
    setTheme(e ? "dark" : "light");
    setConfig({
      ...config,
      mode: e ? "dark" : "light"
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    router.replace('/sign-in')
    
  };

  return (
    <React.Fragment>
      <div className="flex items-center" >
        <Search className="text-primary-foreground dark:text-white cursor-pointer" size={20} onClick={() => setOpen(true)}/>

        <DarkModeSwitch
          className={cn("mx-4 sm:block text-primary-foreground dark:text-white",
            {"[&_circle]:fill-none":config.mode === "light"}
          )}
          checked={config.mode === "dark"}
          onChange={onDarkModeToggle}
          size={20}
        />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <CircleUserRound className="w-5 h-5 text-primary-foreground dark:text-white cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className={cn("w-56 mt-4 mr-1 [&_svg]:w-5 [&_svg]:stroke-[1.5] [&_svg]:mr-2 [&_svg]:h-5", `theme-${config.theme}`)}
            style={{fontFamily: `var(--${config.font})`}}
          >
            
            <DropdownMenuLabel className="flex items-center">
              <Image src={"/sv.svg"} width={38} height={38} alt="user" />
              <span className="flex flex-col ml-4 overflow-ellipsis">
                <span>Vishal Sannake</span>
                <span className="text-muted-foreground text-xs truncate w-2/3">
                  vishal.sannake@akronsystems.com
                </span>
              </span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

              <li className="flex text-sm p-2 group hover:bg-accent">
                <Link href={'/settings'} className="flex w-full">
                  <Settings />Settings
                </Link>
              </li>

            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <li className="flex text-sm group hover:bg-accent text-primary">
              <Button asChild onClick={() => logout()} variant={'ghost'} size={'sm'}>
                <Link href={'/sign-in'} className="flex w-full">
                  <PowerIcon />Logout
                  <DropdownMenuShortcut>Ctrl+Q</DropdownMenuShortcut>
                </Link>
              </Button>
            </li>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <SearchDialog open={open} setOpen={setOpen}/>
    </React.Fragment>
  );
};

export default UserAction;
