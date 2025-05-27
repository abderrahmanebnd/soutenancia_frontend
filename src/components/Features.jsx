import {
  Users,
  BookOpen,
  Target,
  MessageSquare,
  Award,
  Clock,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Team Formation",
      description:
        "AI-powered matching system that connects students based on skills, preferences, and project requirements for optimal collaboration.",
      color: "from-blue-500 to-teal-600",
    },
    {
      icon: Target,
      title: "Project Assignment",
      description:
        "Browse and apply for industry and research projects with intelligent filtering and automated approval workflows.",
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description:
        "Integrated messaging system connecting students, supervisors, and administrators throughout the project lifecycle.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Clock,
      title: "Progress Tracking",
      description:
        "Monitor deliverables, deadlines, and milestones with visual progress indicators and automated notifications.",
      color: "from-blue-400 to-teal-500",
    },
    {
      icon: Award,
      title: "Defense Management",
      description:
        "Streamlined defense scheduling, jury assignment, and evaluation process with digital documentation.",
      color: "from-teal-400 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: "Document Management",
      description:
        "Centralized repository for proposals, deliverables, and documentation with version control and easy sharing.",
      color: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <section
      id="features"
      className="py-32 bg-white relative overflow-hidden font-inter"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-24">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-800 rounded-full text-sm font-bold mb-8 shadow-lg border border-blue-200/50">
            ✨ Comprehensive PFE Management
          </div>
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight">
            Everything You Need for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 mt-2">
              Academic Excellence
            </span>
          </h2>
          <p className="text-2xl text-gray-600 leading-relaxed font-medium max-w-4xl mx-auto">
            From initial team formation to final defense, our platform provides
            comprehensive tools designed specifically for ESI SBA's PFE
            requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-10 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 hover:border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105"
            >
              <div
                className={`w-24 h-24 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl border-4 border-white/50`}
              >
                <feature.icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced collaboration illustration */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-blue-100 via-teal-100 to-cyan-100 px-10 py-6 rounded-3xl shadow-lg border border-blue-200/50 backdrop-blur-sm">
            <div className="flex -space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center text-white font-black text-xl border-4 border-white shadow-lg">
                S
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-black text-xl border-4 border-white shadow-lg">
                T
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl border-4 border-white shadow-lg">
                A
              </div>
            </div>
            <span className="text-gray-800 font-bold text-xl">
              Students • Teachers • Administrators
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
