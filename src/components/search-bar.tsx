import { EllipsisVertical, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="flex items-center w-full space-x-2 rounded-lg border px-3.5 py-2">
      <SearchIcon />
      <Input
        type="search"
        placeholder="Search"
        className="w-full border-0 h-8 font-semibold"
      />
      <EllipsisVertical className="cursor-pointer" />
    </div>
  );
}
