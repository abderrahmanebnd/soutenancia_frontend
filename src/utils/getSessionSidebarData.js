import {
  BookUser,
  FileBox,
  FileCheck2,
  FileSearch,
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
          title: "Team Offers",
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
        {
          title: "Project Management",
          items: [
            {
              title: "Project Offers",
              icon: FileSearch,
              url: "/student/project-offers",
            },
            {
              title: "Project Applications",
              icon: FileCheck2,
              url: "/student/project-applications",
            },
            {
              title: "Project Details",
              icon: FileBox,
              url: "/student/project-description",
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
              title: "Manage Users",
              icon: UserSearch,
              url: "/admin/manage-students",
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
              title: "My Project",
              icon: FileCheck2,
              url: "/teacher/my-project-offers",
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
