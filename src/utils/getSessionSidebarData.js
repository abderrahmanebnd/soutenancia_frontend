import { FileCheck2, Users, UserSearch } from "lucide-react";

export function getSessionSidebarData(role) {
  //this function is called in every session layout (student,admin,techer,enterprise) to get dynamic Links for every specefic session
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
              url: "/student/submit-team-offer",
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
  if (role === "admin") {
    return {
      navMain: [
        {
          title: "admin management",
          items: [
            {
              title: "add users",
              icon: UserSearch,
              url: "/admin/add-users",
            },
          ],
        },
        /* here you can add another section of links related to admin  */
      ],
    };
  }
  if (role === "teacher") {
    return {
      navMain: [
        {
          title: "teacher management",
          items: [
            {
              title: "add projects",
              icon: UserSearch,
              url: "/teacher/add-project",
            },
          ],
        },
        /* here you can add another section of links related to teacher  */
      ],
    };
  }
  if (role === "enterprise") {
    return {
      navMain: [
        {
          title: "enterprise management",
          items: [
            {
              title: "add projects",
              icon: UserSearch,
              url: "/enterprise/add-project",
            },
          ],
        },
        /* here you can add another section of links related to admin  */
      ],
    };
  }
}
