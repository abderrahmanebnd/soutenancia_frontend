import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

function ButtonWithSpinner({ disabled }) {
  return (
    <Button type="submit" className="w-full" disabled={disabled}>
      <Loader2 className="animate-spin" />
      Please wait...
    </Button>
  );
}

export default ButtonWithSpinner;
