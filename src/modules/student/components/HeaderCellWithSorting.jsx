import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

function HeaderCellWithSorting({ title, onClick }) {
  return (
    <Button variant="ghost" onClick={onClick} className="p-0">
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default HeaderCellWithSorting;
