import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { IMenuItem, menus, uniqueLabels } from "./Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SearchProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const RenderMenus = (items: IMenuItem[], indentLevel = 0) => {
    const pathname = usePathname();
    return items.map((item: IMenuItem) => (
        <React.Fragment key={item.name}>
            <CommandItem
                style={{ paddingLeft: `${indentLevel * 16}px` }}
                className="ml-1"
                disabled={item.href === "#" || item.href === pathname}
            >
                <Link href={item.href} className="flex w-full">
                    <span className="ml-2">{item.icon}</span>
                    <span>{item.name}</span>
                </Link>
            </CommandItem>
            {item.submenu && RenderMenus(item.submenu, indentLevel + 1)}
        </React.Fragment>
    ));
}

export default function SearchDialog({ open, setOpen }: SearchProps) {
    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <CommandInput placeholder="Search..." />
            <CommandList className="mb-2" aria-describedby={"Command"}>
                <CommandEmpty>No results found.</CommandEmpty>
                {uniqueLabels.map((label) => (
                    <React.Fragment key={label}>
                        <CommandSeparator />
                        <CommandGroup key={label} heading={label}>
                            {RenderMenus(menus.filter((menu) => menu.label === label))}
                        </CommandGroup>
                    </React.Fragment>
                ))}
            </CommandList>
        </CommandDialog>
    )
}