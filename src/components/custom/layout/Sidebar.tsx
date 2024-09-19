'use client';
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";
import { findActiveMenuIds, IMenuItem, menus } from "./Menu";
import { ChevronDownIcon, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubMenuProps {
    submenu: IMenuItem[];
    pathname: string;
    toggleSubmenu: (name: string) => void;
    openSubmenus: string[];
    level: number
}

interface MenuItemProps {
    menu: IMenuItem;
    isSubmenuOpen: boolean;
    pathname: string;
    toggleSubmenu: (name: string) => void;
    openSubmenus: string[];
    level: number
}

const SubMenu: React.FC<SubMenuProps> = ({ submenu, pathname, toggleSubmenu, openSubmenus, level }) => (
    <ul className={cn("text-sm font-medium")}>
        {submenu.map(subItem => (
            <MenuItem 
                key={subItem.name} 
                menu={subItem} 
                pathname={pathname} 
                toggleSubmenu={toggleSubmenu}
                isSubmenuOpen={openSubmenus.includes(subItem.name)}
                openSubmenus={openSubmenus}
                level={level + 1}
            />
        ))}
    </ul>
);

const MenuItem: React.FC<MenuItemProps> = React.memo(({ menu, pathname, toggleSubmenu, isSubmenuOpen, openSubmenus, level }) => {
    const isActive = pathname === menu.href || openSubmenus.includes(menu.name);
    return(
        <li>
            <Link href={menu.href} 
                className={cn(
                    `group flex justify-between items-center rounded-md p-2 text-sm font-normal leading-6`,
                    { 
                        "text-primary bg-accent dark:text-primary dark:bg-accent": isActive,
                        "hover:text-primary hover:bg-accent dark:hover:text-primary dark:hover:bg-accent": !isActive,
                    }
                )}
                onClick={() => menu.submenu ? toggleSubmenu(menu.name) : undefined}
                aria-expanded={isSubmenuOpen}
                aria-controls={`menu-${menu.name}`}
                style={{ paddingLeft: level === 0 ? '8px' : `${level * 6}px` }}
            >
                <span className={`flex ${level >= 1 ? "items-center" : "" }`}>
                    {menu.icon}
                    {menu.name}
                </span>
                {menu.submenu && (
                    <ChevronDownIcon className={cn("w-4 h-4 duration-150", { "rotate-180": isSubmenuOpen })}/>
                )}
            </Link>
            {isSubmenuOpen && menu.submenu && (
                <SubMenu submenu={menu.submenu} pathname={pathname} toggleSubmenu={toggleSubmenu} openSubmenus={openSubmenus} level={level + 1}/>
            )}
        </li>
    )
});

MenuItem.displayName = "MenuItem";

export default function SidebarMenu() {
    const pathname = usePathname();
    const [openSubmenus, setOpenSubmenus] = React.useState<string[]>([]);

    React.useEffect(() => {
        const initialOpenSubmenus = findActiveMenuIds(menus, pathname);
        setOpenSubmenus(initialOpenSubmenus);
    }, [pathname]);

    const handleToggleSubmenu = React.useCallback((name: string) => {
        setOpenSubmenus(prev => {
            const newSubmenus = [...prev];
            if (newSubmenus.includes(name)) {
                return newSubmenus.filter(submenu => submenu !== name);
            } else {
                return [...newSubmenus, name];
            }
        });
    }, []);

    const uniqueLabels = Array.from(new Set(menus.map((menu) => menu.label)));
    // const uniqueLabels:any[] = []
    return (
        <ScrollArea className="md:w-56 border-0 md:border-r h-[calc(100vh-63px)]">
            <nav className="md:px-4 sm:p-0 mt-5 last:mb-10">
                {uniqueLabels.length > 0 ? (
                    uniqueLabels.map((label, index) => (
                        <ul key={label} role="list" className="flex flex-1 flex-col">
                            {label && (<p className={`mx-4 mb-3 text-xs text-left tracking-wider text-muted-foreground ${index > 0 ? 'mt-10' : ''}`}>{label}</p>)}
                            {
                                menus
                                .filter((menu) => menu.label === label)
                                .map((menu) => ( 
                                    <MenuItem 
                                        key={menu.name}
                                        menu={menu}
                                        pathname={pathname}
                                        toggleSubmenu={handleToggleSubmenu}
                                        isSubmenuOpen={openSubmenus.includes(menu.name)}
                                        openSubmenus={openSubmenus}
                                        level={0}
                                    />
                                ))
                            }
                        </ul>
                    ))
                ) : (
                    <ul role="list" className="flex flex-1 flex-col">
                        <p className={`mx-4 mb-3 text-xs text-left tracking-wider text-slate-500`}>Dashboard</p>
                        <Link href={'/home'} className="group flex justify-between items-center rounded-md p-2 text-sm font-normal leading-6 text-primary bg-gray-100 dark:text-primary dark:bg-slate-800">
                            <span className="flex">
                                <Home size={20} className="stroke-[1.5] mr-1" />
                                Home
                            </span>
                        </Link>
                    </ul>
                )}
            </nav>
        </ScrollArea>
    );
}
