import { BookTextIcon, ClipboardList, DotIcon, GraduationCap, Home, ReceiptIndianRupeeIcon, SwatchBook, UniversityIcon, Users } from "lucide-react";
export interface IMenuItem {
    label?: string;
    name: string;
    icon: JSX.Element;
    href: string;
    submenu?: IMenuItem[];
    level?: number
}

export const menus: IMenuItem[] = [
    {
        label: "Home",
        name: "Dashboard",
        icon: <Home size={20} className="stroke-[1.5] mr-1" />,
        href: "/",
    },
    {
        label: "Master",
        name: "College",
        icon: <UniversityIcon size={20} className="stroke-[1.5] mr-1" />,
        href: "/master/college",
    },
    {
        label: "Master",
        name: "Academic",
        icon: <BookTextIcon size={20} className="stroke-[1.5] mr-1" />,
        href: "#",
        submenu: [
            {
                name: "Department",
                icon: <DotIcon size={20} className="stroke-[1.5]" />,
                href: "/master/academic/department",
            },
            {
                name: "Standard",
                icon: <DotIcon size={20} className="stroke-[1.5]" />,
                href: "/master/academic/standard",
            },
            {
                name: "Subject",
                icon: <DotIcon size={20} className="stroke-[1.5]" />,
                href: "/master/academic/subject",
            },
            {
                name: "Division",
                icon: <DotIcon size={20} className="stroke-[1.5]" />,
                href: "/master/academic/division",
            }
        ],
    },
    {
        label: "Master",
        name: "Fees",
        icon: <ReceiptIndianRupeeIcon size={20} className="stroke-[1.5] mr-1" />,
        href: "#",
        submenu: [
            {
                name: "Fee Type",
                icon: <DotIcon size={20} className="stroke-[1.5]" />,
                href: "/master/fees/feeType",
            },
            {
                name: "Payment Mode",
                icon: <DotIcon size={20} className="stroke-[1.5]" />,
                href: "/master/fees/paymentMode",
            }
        ],
    },
    {
        label: "Module",
        name: "Tasks",
        icon: <ClipboardList size={20} className="stroke-[1.5] mr-1" />,
        href: "/tasks",
    },
    {
        label: "Module",
        name: "Staff",
        icon: <Users size={20} className="stroke-[1.5] mr-1" />,
        href: "/staff",
    },
    {
        label: "Module",
        name: "Student",
        icon: <GraduationCap size={20} className="stroke-[1.5] mr-1" />,
        href: "/student",
    },
    {
        label: "Module",
        name: "Department",
        icon: <SwatchBook size={20} className="stroke-[1.5] mr-1" />,
        href: "#",
        submenu:[
            {
                name: "Computer",
                icon: <DotIcon size={20} className="stroke-[1.5]" />,
                href: "#",
                submenu: [
                    {
                        name: "First Year",
                        icon: <DotIcon size={20} className="stroke-[1.5]" />,
                        href: "#",
                        submenu: [
                            {
                                name: "A",
                                icon: <DotIcon size={20} className="stroke-[1.5]" />,
                                href: "/department/computer/FE-CSE/A",
                            },
                            {
                                name: "B",
                                icon: <DotIcon size={20} className="stroke-[1.5]" />,
                                href: "/department/computer/FE-CSE/B",
                            },
                        ]
                    },
                    {
                        name: "Second Year",
                        icon: <DotIcon size={20} className="stroke-[1.5]" />,
                        href: "/department/computer/SE-CSE",
                    },
                    {
                        name: "Third Year",
                        icon: <DotIcon size={20} className="stroke-[1.5]" />,
                        href: "/department/computer/TE-CSE",
                    },
                    {
                        name: "Fourth Year",
                        icon: <DotIcon size={20} className="stroke-[1.5]" />,
                        href: "/department/computer/BE-CSE",
                    }
                ]
            },
            {
                name: "Civil",
                icon: <DotIcon size={20} className="stroke-[1.5]" />,
                href: "#",
                submenu: [
                    {
                        name: "First Year",
                        icon: <DotIcon size={20} className="stroke-[1.5]" />,
                        href: "/department/civil/first-year",
                    },
                    {
                        name: "Second Year",
                        icon: <DotIcon size={20} className="stroke-[1.5]" />,
                        href: "/department/civil/second-year",
                    }
                ]
            }
        ]
    },
    
];

export const uniqueLabels = Array.from(new Set(menus.map((menu) => menu.label)));

export const findActiveMenuIds = (menus: IMenuItem[], targetPath: string): string[] => {
    const activeMenuIds: string[] = [];

    const traverse = (menuList: IMenuItem[]) => {
        for (const menu of menuList) {
            if (menu.href === targetPath) {
                activeMenuIds.push(menu.name);
                return true;
            }
            if (menu.submenu) {
                const found = traverse(menu.submenu);
                if (found) {
                    activeMenuIds.push(menu.name);
                    return true;
                }
            }
        }
        return false;
    };

    traverse(menus);
    return activeMenuIds.reverse();
};