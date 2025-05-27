import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { GraduationCap, Users, Award } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-teal-600 to-cyan-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-900 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-transparent"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 hidden lg:block">
        <div
          className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="absolute bottom-20 right-20 hidden lg:block">
        <div
          className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          <Users className="w-10 h-10 text-white" />
        </div>
      </div>

      <div className="absolute top-1/2 right-32 hidden xl:block">
        <div
          className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <Award className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur text-white rounded-full text-sm font-semibold mb-6">
              🚀 Ready to Get Started?
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Transform Your
            <span className="block text-blue-200">PFE Experience Today</span>
          </h2>

          <p className="text-2xl md:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join hundreds of ESI SBA students and faculty who are already
            experiencing seamless project management and collaboration.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/auth/login">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105"
              >
                Access Your Account
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-12 py-4 text-xl font-bold rounded-2xl backdrop-blur transition-all duration-300"
            >
              Contact Support
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="text-blue-200 text-lg mb-2">
                ✓ Secure Authentication
              </div>
              <div className="text-white/80">
                ESI SBA student & faculty login
              </div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="text-blue-200 text-lg mb-2">
                ✓ Real-time Collaboration
              </div>
              <div className="text-white/80">
                Instant messaging & notifications
              </div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
              <div className="text-blue-200 text-lg mb-2">
                ✓ Complete Management
              </div>
              <div className="text-white/80">
                From team formation to defense
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
