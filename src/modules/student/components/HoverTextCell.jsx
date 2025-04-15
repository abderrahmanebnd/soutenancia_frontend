import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MessageSquareText } from "lucide-react";

function HoverTextCell({ text }) {
  return (
    <HoverCard>
      <HoverCardTrigger className=" flex items-center gap-2">
        <MessageSquareText className="text-muted-foreground" />
        <p className="max-w-[200px] truncate  border-2 rounded-md p-1 text-sm text-muted-foreground cursor-pointer">
          {text}
        </p>
      </HoverCardTrigger>
      <HoverCardContent>{text}</HoverCardContent>
    </HoverCard>
  );
}

export default HoverTextCell;
