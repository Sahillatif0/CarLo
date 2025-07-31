import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import SearchFilters from "./search-filters";

export const SearchInput = ({ filters, setFilters }: { filters: any; setFilters: any }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (val: string) => {
      setFilters((prev: any) => ({ ...prev, query: val }))
  };

  return (
     <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6 mb-8 animate-slide-up">
      <div className="flex md:flex-row flex-col gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            placeholder="Search by make, model, or keyword..."
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value); handleSearch(e.target.value)}}
            className="pl-10 h-12 border-slate-300 focus:border-blue-500 text-lg"
            onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
          />
        </div>

        <Button
          onClick={() => handleSearch(searchQuery)}
          className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
        </div>
        <SearchFilters filters={filters} setFilters={setFilters} />
        </div>

  )
}
