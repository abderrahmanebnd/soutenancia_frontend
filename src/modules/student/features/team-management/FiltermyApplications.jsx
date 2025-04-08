import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function FilterMyApplications({ table }) {
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [minSpotsInput, setMinSpotsInput] = useState("");

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
  ];

  const handleStatusSelect = (statusValue) => {
    const newSelectedStatus = selectedStatus.includes(statusValue)
      ? selectedStatus.filter((v) => v !== statusValue)
      : [...selectedStatus, statusValue];

    setSelectedStatus(newSelectedStatus);
    table.getColumn("status")?.setFilterValue(
      newSelectedStatus.length > 0 ? newSelectedStatus : undefined
    );
  };

  const handleMinSpotsFilter = () => {
    const value = minSpotsInput === "" ? undefined : parseInt(minSpotsInput);
    table.getColumn("teamProgress")?.setFilterValue(value);
  };

  const clearAllFilters = () => {
    setSelectedStatus([]);
    setMinSpotsInput("");
    table.resetColumnFilters();
  };

  const hasFilters = selectedStatus.length > 0 || minSpotsInput !== "";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-between">
              {selectedStatus.length > 0
                ? `${selectedStatus.length} status selected`
                : "Filter by status"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {statusOptions.map((status) => (
                    <CommandItem
                      key={status.value}
                      onSelect={() => handleStatusSelect(status.value)}
                    >
                      <Checkbox
                        checked={selectedStatus.includes(status.value)}
                        className="mr-2"
                      />
                      {status.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={minSpotsInput}
            onChange={(e) => setMinSpotsInput(e.target.value)}
            placeholder="Min spots remaining"
            className="p-2 border rounded w-32 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            variant="outline"
            onClick={handleMinSpotsFilter}
            className="h-8 px-3 text-sm"
          >
            Apply
          </Button>
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="h-8 px-3 text-sm"
          >
            <X className="h-3.5 w-3.5 mr-1.5" />
            Clear filters
          </Button>
        )}
      </div>

      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {selectedStatus.map((status) => (
            <Badge key={status} variant="secondary" className="capitalize">
              {status}
            </Badge>
          ))}
          {minSpotsInput !== "" && (
            <Badge variant="secondary">Min {minSpotsInput} spots remaining</Badge>
          )}
        </div>
      )}
    </div>
  );
}