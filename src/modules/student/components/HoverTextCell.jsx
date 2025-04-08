import {

    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  
  function HoverTextCell({ text }) {
    return (
      <HoverCard>
        <HoverCardTrigger>
          <p className="max-w-[200px] truncate  border-2 rounded-md p-1 text-sm text-muted-foreground cursor-pointer">
            {text}
          </p>
        </HoverCardTrigger>
        <HoverCardContent>{text}</HoverCardContent>
      </HoverCard>
    );
  }
  
  export default HoverTextCell;

