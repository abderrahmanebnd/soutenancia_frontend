export function splitRouteIntoElements(route) {
  return route.split("/").filter(Boolean);
}

export function viewLessText(text) {
  return text.length > 150 ? text.slice(0, 150) + "..." : text;
}

export function getAllSkills(generalSkills, specificSkills) {
  return [...generalSkills.map((skill) => skill.name), ...specificSkills];
}
