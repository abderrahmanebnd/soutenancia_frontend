import {
  BookUser,
  FileCheck2,
  UserRoundCheck,
  Users,
  UserSearch,
} from "lucide-react";

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
          ],
        },
        {
          title: "Team Management",
          items: [
            {
              title: "Team Applications",
              icon: UserRoundCheck,
              url: "/student/team-applications",
            },
            {
              title: "Team Details",
              icon: BookUser,
              url: "/student/team-details",
            },
          ],
        },
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
          title: "project management",
          items: [
            {
              title: "Project Offers",
              icon: UserSearch,
              url: "/teacher/project-offers",
            },
            {
              title: "Submit Project",
              icon: FileCheck2,
              url: "/teacher/submit-project-offer",
            },
            {
              title: "Project Applications",
              icon: UserRoundCheck,
              url: "/teacher/project-applications",
            },
          ],
        },
        {
          title: "Team Management",
          items: [
            {
              title: "Manage My Teams",
              icon: Users,
              url: "/teacher/manage-my-teams",
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
