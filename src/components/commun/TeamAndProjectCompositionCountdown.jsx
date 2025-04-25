import { AlertCircle, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { getTimeRemaining, getTotalDays } from "@/utils/helpers";
import { useEffect, useState } from "react";

import InlineSpinner from "./InlineSpinner";

export function TeamAndProjectCompositionCountdown({
  dataTeamAndProjectCountdown,
  isLoadingTeamAndProjectCountdown,
  isErrorTeamAndProjectCountdown,
  title,
}) {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    daysRemaining: 0,
    hoursRemaining: 0,
    minutesRemaining: 0,
  });

  const startDate = dataTeamAndProjectCountdown?.at(0)?.startDate;
  const endDate = dataTeamAndProjectCountdown?.at(0)?.endDate;

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

  if (isLoadingTeamAndProjectCountdown) {
    return (
      <div className="w-full rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md">
        <InlineSpinner />
      </div>
    );
  }
  if (isErrorTeamAndProjectCountdown) {
    return (
      <div className="w-full rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md">
        <p className="text-red-500">Error loading countdown</p>
      </div>
    );
  }
  if (
    !isLoadingTeamAndProjectCountdown &&
    dataTeamAndProjectCountdown.length === 0
  ) {
    return (
      <div className="w-full space-y-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md overflow-x-auto ">
        <div className="flex gap-2 justify-between">
          <div className="flex  gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-primary">
              {title} Deadline
            </h3>
          </div>
          <div className=" p-4 rounded-2xl border bg-red-50 text-red-700 shadow-sm flex items-start gap-4">
            <AlertCircle className="w-6 h-6 mt-1 text-destructive" />
            <div>
              <h2 className="text-lg font-semibold">
                {title} Phase Not Started
              </h2>
              <p className="text-sm">
                Please wait until the administration opens this phase for your
                speciality
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full space-y-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">
            {title} Deadline
          </h3>
        </div>
        <div className=" p-3  bg-section rounded-xl shadow-lg">
          {timeRemaining.daysRemaining === 0 &&
          timeRemaining.hoursRemaining === 0 &&
          timeRemaining.minutesRemaining === 0 ? (
            <Badge variant="destructive" className="min-h-7 text-sm">
              {title} phase close
            </Badge>
          ) : (
            <Badge className=" rounded-lg text-sm flex gap-2 shadow-lg  ">
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
