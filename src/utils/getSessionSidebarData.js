import { FileCheck2, Users, UserSearch } from "lucide-react";

export function getSessionSidebarData(role) {
  //this function is called in every session layout (student,admin,techer) to get dynamic Links for every specefic session
  if (role === "student") {
    return {
      navMain: [
        {
          title: "Project Management",
          items: [
            {
              title: "Team Offers",
              icon: UserSearch,
              url: "/student/team-offers",
            },
            {
              title: "Submit Offer",
              icon: FileCheck2,
              url: "/student/submit-offer",
            },
            {
              title: "Team Management",
              icon: Users,
              url: "/student/team-management",
            },
          ],
        },
        /* here you can add another section of links related to student  */
      ],
    };
  }
  // add the specefic links for the other roles (admin, teacher,enterprise) here
}
