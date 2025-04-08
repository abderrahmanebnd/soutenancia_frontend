import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListFilter } from "lucide-react";

function Filter({ children, filterValue = [], maxMembersValue = 0 }) {
  const filterLength = filterValue.length + (maxMembersValue ? 1 : 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {filterLength > 0 ? (
            <span className="bg-primary text-secondary h-7 w-7 rounded-full flex items-center justify-center">
              {filterLength}
            </span>
          ) : (
            ""
          )}
          Filter
          <ListFilter />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-max pb-0">
        <div>
          <h4 className="text-sm text-muted-foreground border-b  pb-2 mb-2">
            Choose your filter and find exactly what you need!
          </h4>
          <div className="space-y-2">
            <p className="text-sm">Filter by:</p>
            {children}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Filter;
