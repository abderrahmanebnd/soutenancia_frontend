import { differenceInCalendarDays, parseISO } from "date-fns";
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

export function getDaysRemaining(isoDateString) {
  const today = new Date();
  const endDate = parseISO(isoDateString);
  return differenceInCalendarDays(endDate, today);
}
export function getTotalDays(isoDateStringStart, isoDateStringEnd) {
  const startDate = parseISO(isoDateStringStart);
  const endDate = parseISO(isoDateStringEnd);
  return differenceInCalendarDays(endDate, startDate);
}
