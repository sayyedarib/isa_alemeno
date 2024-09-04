"use client";

import { useState } from "react";
import { EllipsisVertical, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SearchBar() {
  const [position, setPosition] = useState("book_name");
  return (
    <div className="flex items-center w-full space-x-2 rounded-lg border px-3.5 py-2">
      <SearchIcon />
      <Input
        type="search"
        placeholder="Search"
        className="w-full border-0 h-8 font-semibold"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Search by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="book_name">
              Book Name
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="author_name">
              Author Name
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
