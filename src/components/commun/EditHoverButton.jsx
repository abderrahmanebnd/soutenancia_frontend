import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FilePen, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";
function EditHoverButton({ children, path }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          className="fixed bottom-3 right-3 rounded-full w-12 h-12 lg:w-14 lg:h-14 ring-offset-2 ring-4 hover:ring-primary transition-all duration-300 cursor-pointer"
          asChild
        >
          <Link to={path}>
            <Pencil />
          </Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex items-center justify-center gap-2 text-primary w-auto">
        <FilePen /> {children}
      </HoverCardContent>
    </HoverCard>
  );
}

export default EditHoverButton;
