import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { getTimeRemaining, getTotalDays } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useTeamCompositionCountdown } from "@/modules/student/features/team-management/useTeamCompositionCountdown";
import InlineSpinner from "./InlineSpinner";

export function TeamCompositionCountdown() {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    daysRemaining: 0,
    hoursRemaining: 0,
    minutesRemaining: 0,
  });
  const {
    teamComposition,
    isLoadingTeamComposition,
    isErrorGettingTeamCompositionCountdown,
  } = useTeamCompositionCountdown();

  const startDate = teamComposition?.at(0).startDate;
  const endDate = teamComposition?.at(0)?.endDate;

  const totalDays = getTotalDays(startDate, endDate);

  useEffect(() => {
    if (!endDate) {
      return;
    }
    function updateRemainingTime() {
      const updatedDate = getTimeRemaining(endDate);
      setTimeRemaining(updatedDate);
      const totalMinutes = totalDays * 1440;
      const minutesLeft =
        updatedDate.daysRemaining * 1440 +
        updatedDate.hoursRemaining * 60 +
        updatedDate.minutesRemaining;
      const minutePassed = totalMinutes - minutesLeft;
      setProgress(Math.round((minutePassed * 100) / totalMinutes));
    }

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 60000);
    return () => clearInterval(interval);
  }, [endDate, totalDays]);

  if (isLoadingTeamComposition) {
    return (
      <div className="w-full rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md">
        <InlineSpinner />
      </div>
    );
  }
  if (isErrorGettingTeamCompositionCountdown) {
    return (
      <div className="w-full rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md">
        <p className="text-red-500">Error loading countdown</p>
      </div>
    );
  }
  return (
    <div className="w-full space-y-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">
            Team Composition Deadline
          </h3>
        </div>
        <div className=" p-5  bg-section rounded-xl relative shadow-lg">
          {timeRemaining.daysRemaining === 0 &&
          timeRemaining.hoursRemaining === 0 &&
          timeRemaining.minutesRemaining === 0 ? (
            <Badge variant="destructive" className="min-h-7 text-sm">
              Team composition phase close
            </Badge>
          ) : (
            <>
              <p className="font-bold text-xl text-primary/40 absolute top-0 left-1/2 -translate-x-1/2 text-nowrap z-0">
                Time left
              </p>
              <p className="font-bold text-xl text-primary/40 absolute bottom-0 left-1/2 -translate-x-1/2 text-nowrap z-0">
                Before closing
              </p>
              <Badge className=" rounded-lg text-sm flex gap-2 shadow-lg relative  z-10 ">
                {timeRemaining.daysRemaining > 0 && (
                  <p className="flex flex-col items-center">
                    {timeRemaining.daysRemaining}
                    <span className="text-xs font-light">Days</span>
                  </p>
                )}
                <p className="flex flex-col items-center">
                  {timeRemaining.hoursRemaining}
                  <span className="text-xs font-light">Hours</span>
                </p>
                <p className="flex flex-col items-center">
                  {timeRemaining.minutesRemaining}
                  <span className="text-xs font-light">Minutes</span>
                </p>
              </Badge>
            </>
          )}
        </div>
      </div>

      <div className="relative h-10 w-full overflow-hidden rounded-lg bg-blue-200">
        <div
          className="absolute inset-y-0 left-0 flex items-center justify-end bg-gradient-to-r from-blue-400 to-primary px-3 text-sm font-medium text-white transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        >
          {progress > 30 && `${progress}%`}
        </div>
        {progress <= 30 && (
          <div className="absolute inset-0 flex items-center justify-start px-3 text-sm font-medium text-slate-100">
            {progress}%
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <div className="text-sm text-primary">
          <span className="font-bold">
            {totalDays < 0 ? 0 : totalDays - timeRemaining.daysRemaining}
          </span>{" "}
          days passed
        </div>
        <div className="text-sm text-primary">
          <span className="font-bold">{totalDays < 0 ? 0 : totalDays} </span>
          total days
        </div>
      </div>
    </div>
  );
}
