import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Users,
  BookOpen,
  Target,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 overflow-hidden pt-20 font-inter">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 left-20 hidden lg:block animate-float">
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center shadow-2xl border-4 border-white/50 backdrop-blur-sm">
          <Users className="w-14 h-14 text-white" />
        </div>
      </div>

      <div
        className="absolute bottom-32 right-20 hidden lg:block animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl border-4 border-white/50 backdrop-blur-sm">
          <BookOpen className="w-12 h-12 text-white" />
        </div>
      </div>

      <div
        className="absolute top-1/3 right-32 hidden xl:block animate-float"
        style={{ animationDelay: "3s" }}
      >
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-xl border-4 border-white/50 backdrop-blur-sm">
          <Target className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Floating Sparkles */}
      <div
        className="absolute top-1/4 left-1/4 hidden lg:block animate-float"
        style={{ animationDelay: "5s" }}
      >
        <Sparkles className="w-8 h-8 text-blue-400" />
      </div>
      <div
        className="absolute bottom-1/4 left-1/3 hidden lg:block animate-float"
        style={{ animationDelay: "7s" }}
      >
        <Zap className="w-6 h-6 text-teal-500" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 animate-slide-up">
            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-800 rounded-full text-sm font-bold mb-4 shadow-lg border border-blue-200/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              🎓 For ESI SBA Students & Faculty
            </span>
          </div>

          <h1
            className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-[0.85] animate-slide-up tracking-tight"
            style={{ animationDelay: "0.2s" }}
          >
            Revolutionize Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 mt-2">
              Final Year Projects
            </span>
          </h1>

          <p
            className="text-xl md:text-3xl text-gray-700 mb-12 max-w-5xl mx-auto leading-relaxed font-medium animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            The ultimate PFE management platform for ESI SBA. From intelligent
            team formation to seamless project defense,
            <span className="text-blue-600 font-semibold">
              {" "}
              experience academic excellence like never before.
            </span>
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Link to="/auth/login">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-500 via-teal-600 to-cyan-600 hover:from-blue-600 hover:via-teal-700 hover:to-cyan-700 text-white px-12 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-2 border-white/20"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Start Your PFE Journey
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats with better typography */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-slide-up text-"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 group-hover:scale-110 border-4 border-white/30">
                <span className="text-3xl">👥</span>
              </div>
              <div className="text-5xl font-black text-blue-600 mb-3 font-inter">
                2,500+
              </div>
              <div className="text-gray-700 font-semibold text-lg">
                Active Students
              </div>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl group-hover:shadow-teal-500/30 transition-all duration-500 group-hover:scale-110 border-4 border-white/30">
                <span className="text-3xl">🏫</span>
              </div>
              <div className="text-5xl font-black text-teal-600 mb-3 font-inter">
                150+
              </div>
              <div className="text-gray-700 font-semibold text-lg">
                Faculty Members
              </div>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl group-hover:shadow-cyan-500/30 transition-all duration-500 group-hover:scale-110 border-4 border-white/30">
                <span className="text-3xl">🚀</span>
              </div>
              <div className="text-5xl font-black text-cyan-600 mb-3 font-inter">
                800+
              </div>
              <div className="text-gray-700 font-semibold text-lg">
                Projects Completed
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-14 h-14 bg-white/90 rounded-full shadow-xl flex items-center justify-center backdrop-blur-sm border border-blue-100">
          <ArrowDown className="w-7 h-7 text-blue-600" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
