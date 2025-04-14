import {
  differenceInCalendarDays,
  differenceInMilliseconds,
  parseISO,
} from "date-fns";
export function splitRouteIntoElements(route) {
  return route.split("/").filter(Boolean);
}

export function viewLessText(text) {
  return text.length > 150 ? text.slice(0, 150) + "..." : text;
}

export function getAllSkills(generalSkills, specificSkills) {
  return [...generalSkills.map((skill) => skill.name), ...specificSkills];
}
export function getGeneralSkillsWithNameOnly(generalSkills) {
  return generalSkills.map((skill) => skill.name);
}

export function getTimeRemaining(isoDateString) {
  if (!isoDateString) {
    return { daysRemaining: 0, hoursRemaining: 0, minutesRemaining: 0 };
  }

  const now = new Date();
  const endDate = parseISO(isoDateString);
  const diffMs = differenceInMilliseconds(endDate, now);

  if (diffMs <= 0) {
    return { daysRemaining: 0, hoursRemaining: 0, minutesRemaining: 0 };
  }

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const daysRemaining = Math.floor(totalMinutes / (60 * 24));
  const hoursRemaining = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutesRemaining = totalMinutes % 60;

  return { daysRemaining, hoursRemaining, minutesRemaining };
}

export function getTotalDays(isoDateStringStart, isoDateStringEnd) {
  if (isoDateStringStart === undefined || isoDateStringEnd === undefined) {
    return 0;
  }
  const startDate = parseISO(isoDateStringStart);
  const endDate = parseISO(isoDateStringEnd);
  return differenceInCalendarDays(endDate, startDate);
}
