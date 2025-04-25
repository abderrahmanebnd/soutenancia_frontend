import { Button } from "@/components/ui/button";

function TeamCompositionUnauthorized() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 lg:p-10 flex flex-col items-center gap-y-4 h-[calc(100vh-)]">
      <img
        src="/assets/unauthorized-image.png"
        alt="Unauthorized"
        className="w-1/2"
      />
      <div className="space-y-2">
        <h2 className="text-center text-3xl lg:text-4xl  font-bold text-primary  ">
          We are sorry ...
        </h2>
        <p className="text-center text-muted-foreground max-w-xl">
          This page is not accessible because the team composition setup phase
          has ended or not started yet .
        </p>
      </div>
      <Button>Go to project selection</Button>
    </div>
  );
}

export default TeamCompositionUnauthorized;
