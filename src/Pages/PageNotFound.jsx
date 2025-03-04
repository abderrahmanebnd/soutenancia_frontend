import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className=" h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-4xl text-primary font-bold">
        404 <span className="text-5xl font-light">|</span> This Page Could Not
        Be Found
      </h1>
      <Button variant="outline" onClick={() => navigate(-1)}>
        &larr; Move Back
      </Button>
    </div>
  );
}

export default PageNotFound;
