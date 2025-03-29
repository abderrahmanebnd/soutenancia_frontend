import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

function ButtonWithSpinner({ disabled, className, variant }) {
  return (
    <Button
      type="button"
      className={cn("w-full", className)}
      disabled={disabled}
      variant={variant}
    >
      <Loader2 className="animate-spin" />
      Please wait...
    </Button>
  );
}

export default ButtonWithSpinner;
