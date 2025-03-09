import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function Unauthorized() {
  const navigate = useNavigate();
  function handleBack() {
    // i didn't use the navigate(-1) because sometimes it doesn't work
    navigate("/");
  }
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-2">
      <h1 className="text-4xl font-bold text-primary">Unauthorized</h1>
      <p className="text-muted-foreground">
        You are not authorized to access this page.
      </p>
      <Button variant="link" onClick={handleBack}>
        &larr; Come Back To The Previous Page
      </Button>
    </div>
  );
}

export default Unauthorized;
