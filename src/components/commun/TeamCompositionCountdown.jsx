import * as React from "react";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { getDaysRemaining, getTotalDays } from "@/utils/helpers";

const END_DATE_TEST = "2025-04-14T00:00:00.000Z"; // Example ISO date string
const START_DATE_TEST = "2025-04-07T00:00:00.000Z"; // Example ISO date string
export function TeamCompositionCountdown() {
  const [progress, setProgress] = React.useState(13);

  const daysRemaining = getDaysRemaining(END_DATE_TEST);
  const totalDays = getTotalDays(START_DATE_TEST, END_DATE_TEST);
  const daysPassed = totalDays - daysRemaining;
  React.useEffect(() => {
    const timer = setTimeout(
      () => setProgress(Math.round((daysPassed * 100) / totalDays)),
      500
    );
    return () => clearTimeout(timer);
  }, [daysPassed, totalDays]);

  // Calculate days passed

  return (
    <div className="w-full space-y-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">
            Team Composition Deadline
          </h3>
        </div>
        <Badge className="space-x-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{daysRemaining} days left</span>
        </Badge>
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
          <span className="font-bold">{daysPassed}</span> days completed
        </div>
        <div className="text-sm text-primary">
          <span className="font-bold">{totalDays}</span> total days
        </div>
      </div>
    </div>
  );
}
