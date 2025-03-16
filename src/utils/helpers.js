export function splitRouteIntoElements(route) {
  return route.split("/").filter(Boolean);
}
