import SearchBar from "./search-bar";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <SearchBar />
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
