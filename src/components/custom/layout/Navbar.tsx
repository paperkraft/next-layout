import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { findActiveMenuIds, IMenuItem, menus, uniqueLabels } from "./Menu";
import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Config, useConfig } from "@/hooks/use-config";

interface MenuItemProps {
    menu: IMenuItem;
    pathname: string;
    openSubmenus: string[];
    config: Config
}

interface SubMenuProps {
    submenu: IMenuItem;
    pathname: string;
    openSubmenus: string[];
    config: Config
}

const SubMenuItems: React.FC<SubMenuProps> = React.memo(({submenu, pathname, openSubmenus, config}) => {
    const isActive = pathname === submenu.href || openSubmenus.includes(submenu.name);
    const renderSubMenu = (item: IMenuItem) => (
        <React.Fragment key={item.name}>
          <DropdownMenuItem className={item.submenu && "hidden"} asChild>
            <li className={cn({"bg-accent": pathname === item.href})}>
              <Link href={item.href} className={cn("w-full", {
                "text-primary font-semibold": pathname === item.href 
            })}>
                {item.name}
              </Link>
            </li>
          </DropdownMenuItem>
          {item.submenu && <SubMenuItems submenu={item} pathname={pathname} openSubmenus={openSubmenus} config={config}/>}
        </React.Fragment>
    );

    return(
        <DropdownMenuSub key={submenu.name}>
            <DropdownMenuSubTrigger className={cn("w-full",{
                "text-primary font-semibold bg-accent": isActive
            })}>
                <Link href={submenu.href}>
                    {submenu.name}
                </Link>
            </DropdownMenuSubTrigger>
            {submenu.submenu && (
                <DropdownMenuPortal>
                    <DropdownMenuSubContent className={`theme-${config.theme}`}>
                        {submenu.submenu.map(renderSubMenu)}
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>)}
        </DropdownMenuSub>
    )
});

const MenuItems: React.FC<MenuItemProps> = React.memo(({menu, pathname, openSubmenus, config})=> {
    const isActive = pathname === menu.href || openSubmenus.includes(menu.name);
    return(
        <DropdownMenu key={menu.name}>
            <DropdownMenuTrigger asChild>
                <li className={cn("[&[data-state=open]>a>svg]:rotate-180")}>
                    <Link href={menu.href} 
                        className={cn("w-full p-1 px-2",{
                            "flex items-center gap-1": menu.submenu,
                            "bg-accent rounded": isActive,
                            "text-primary-foreground dark:text-primary": !isActive
                        })}>
                        {menu.name}
                        {menu.submenu && <ChevronDown className={cn('w-4 h-4')}/>}
                    </Link>
                </li>
            </DropdownMenuTrigger>
            {menu.submenu && (
                <DropdownMenuContent align="start" className={cn("mt-4",`theme-${config.theme}`)}>
                    {menu.submenu.map((submenu)=>(
                        <React.Fragment key={submenu.name}>
                            <DropdownMenuItem key={submenu.name} className={cn({"hidden": submenu.submenu})} asChild>
                                <li className={cn({"bg-accent": pathname === submenu.href})}>
                                    <Link href={submenu.href} 
                                        className={cn("w-full cursor-pointer",{
                                            "font-semibold text-primary": pathname === submenu.href
                                        })}>
                                        {submenu.name}
                                    </Link>
                                </li>
                            </DropdownMenuItem>
                            {
                                submenu.submenu &&
                                <SubMenuItems submenu={submenu} pathname={pathname} openSubmenus={openSubmenus} config={config}/>
                            }
                        </React.Fragment>
                        ))}
                </DropdownMenuContent>)}
        </DropdownMenu>
    )
});

SubMenuItems.displayName = "SubMenuItems"
MenuItems.displayName = "MenuItems"

export default function NavbarNavigation() {
    const pathname = usePathname();
    const [config] = useConfig();
    const [openSubmenus, setOpenSubmenus] = React.useState<string[]>([]);

    React.useEffect(() => {
        const initialOpenSubmenus = findActiveMenuIds(menus, pathname);
        setOpenSubmenus(initialOpenSubmenus);
    }, [pathname]);

    return (
        <nav className={cn("hidden md:flex gap-2 items-center")}>
        {
            uniqueLabels.length > 0 &&
            uniqueLabels.map((label)=>(
                <ul key={label} className="flex gap-2 items-center">
                    {
                        menus
                        .filter((menu) => menu.label === label).map((menu)=>(
                            <MenuItems menu={menu} key={menu.name} pathname={pathname} openSubmenus={openSubmenus} config={config}/>
                        ))
                    }
                </ul>
            ))
        }
        </nav>
    )
}
