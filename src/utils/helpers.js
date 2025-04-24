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

export function addSpacesBeforeCapitals(text) {
  return text.replace(/(?!^)([A-Z])/g, " $1");
}

export function getEsiAllYears() {
  return [2, 3, 4, 5];
}
export function getMaxTeamsApplying() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

export function getYearsFromLastYearTo2014() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 1; year >= 2014; year--) {
    years.push(year);
  }
  return years;
}
