import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Sparkles, Target, Users, TrendingUp, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Mentorship Platform
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Transform Your Mentorship <br/>
              <span className="text-blue-600">Program with AI</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Streamline mentor-mentee matching, track engagement health, and automate session management with our enterprise-grade AI platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg shadow-sm">
                Start Free Trial
              </Link>
              <Link href="/about" className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-lg border border-gray-300 transition-colors text-lg">
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-12 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-6">Trusted by leading organizations</p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
                <div className="text-2xl font-bold text-gray-400">TechCorp</div>
                <div className="text-2xl font-bold text-gray-400">EduLearn</div>
                <div className="text-2xl font-bold text-gray-400">GrowthHub</div>
                <div className="text-2xl font-bold text-gray-400">SkillUp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Successful Mentorship
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines AI intelligence with human connection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                title: "Smart AI Matching",
                description: "Advanced algorithms match mentors and mentees based on skills, goals, availability, and preferences for optimal partnerships."
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Health Tracking",
                description: "Real-time monitoring of relationship quality with automated alerts and intervention recommendations."
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Session Assistant",
                description: "AI-powered note taking that converts unstructured conversations into actionable insights and follow-ups."
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Gamification",
                description: "Drive engagement with leaderboards, badges, and streaks that motivate consistent participation."
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Enterprise Security",
                description: "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards."
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Smart Automation",
                description: "Automated reminders, nudges, and interventions keep relationships healthy and productive."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1,200+", label: "Active Users" },
              { value: "850+", label: "Successful Matches" },
              { value: "94%", label: "Success Rate" },
              { value: "15+", label: "Languages" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Mentorship Program?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join hundreds of organizations already using Mentora to build stronger mentor relationships.
          </p>
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg shadow-sm inline-block">
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </main>
  );
}
