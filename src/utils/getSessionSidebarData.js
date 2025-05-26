import {
  BookUser,
  FileBox,
  FileCheck2,
  FileSearch,
  UserRoundCheck,
  UserSearch,
  BookOpen,
  Award,
  Clock,
  ClipboardList,
  UserCircle,
} from "lucide-react";

export function getSessionSidebarData(role) {
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
      title: "Settings",
      items: [
        {
          title: "Profile",
          icon: UserCircle,
          url: "/student/profile", // Changed from /teacher/profile to /student/profile
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
        {
          title: "System Configuration",
          items: [
            {
              title: "Manage Specialties",
              icon: BookOpen,
              url: "/admin/manage-specialties",
            },
            {
              title: "Manage Skills",
              icon: Award,
              url: "/admin/manage-skills",
            },
            {
              title: "Assignment Modes",
              icon: ClipboardList,
              url: "/admin/assignment-modes",
            },
            {
              title: "Manage Durations",
              icon: Clock,
              url: "/admin/team-compositions",
            },
          ],
        },
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
      ],
    };
  }
}
