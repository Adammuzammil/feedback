"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, Folder, MenuIcon, X } from "lucide-react";
import Link from "next/link";

import React, { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState<Boolean>(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <Folder className="mr-2 w-4 h-4" />
            Projects
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/payments"}>
            <CreditCard className="mr-2 w-4 h-4" />
            Subscription
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
