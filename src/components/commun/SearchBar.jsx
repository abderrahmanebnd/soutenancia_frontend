import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSearchParams } from "react-router";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  function handleSearch(e) {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      searchParams.delete("search");
    } else {
      searchParams.set("search", e.target.value.toLowerCase());
    }
    setSearchParams(searchParams);
  }
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search by title..."
        className="w-full sm:w-[250px] xl:w-[300px]"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
