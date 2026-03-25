"use client";

import Navbar from "@/components/Navbar";
import {
  Sparkles,
  Target,
  Users,
  Activity,
  MessageCircle,
  Trophy,
  Globe,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Smart Matching",
      description: "Hybrid scoring algorithm combines deterministic logic with Gemini AI to match mentors and mentees based on skills, location, language, and availability.",
      color: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Health Tracker",
      description: "Real-time monitoring of relationship quality using session frequency, streak counts, and missed sessions to identify at-risk matches.",
      color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "AI Session Assistant",
      description: "Transforms unstructured session notes into actionable summaries and next steps using Gemini 1.5 Flash natural language processing.",
      color: "from-purple-500/20 to-purple-500/5 border-purple-500/20"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Leaderboard & Gamification",
      description: "Behavioral engineering through rankings, badges, and streaks to drive consistency and celebrate excellence in mentorship.",
      color: "from-amber-500/20 to-amber-500/5 border-amber-500/20"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Language Bridge",
      description: "Breaking down language barriers with real-time translation, enabling rural mentees to connect with global experts seamlessly.",
      color: "from-blue-500/20 to-blue-500/5 border-blue-500/20"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Admin Dashboard",
      description: "System-wide metrics and engagement analytics with intervention triggers for at-risk relationships and platform health monitoring.",
      color: "from-pink-500/20 to-pink-500/5 border-pink-500/20"
    }
  ];

  const stats = [
    { label: "Active Users", value: "1,200+", icon: <Users className="w-5 h-5" /> },
    { label: "Successful Matches", value: "850+", icon: <Zap className="w-5 h-5" /> },
    { label: "Session Success Rate", value: "94%", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Languages Supported", value: "15+", icon: <Globe className="w-5 h-5" /> }
  ];

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Trusted by mentors and mentees worldwide</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none">
            The Future of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              AI-Driven Mentorship
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-white/60 mb-10 leading-relaxed font-light">
            Mentora combines cutting-edge AI technology with human connection to create
            meaningful, lasting mentorship relationships that drive real growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-indigo-500/20"
            >
              Get Started
            </a>
            <a
              href="/matching"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              View Demo
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl text-center hover:bg-white/10 transition-all group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-white/5 rounded-2xl group-hover:bg-indigo-500/20 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black mb-2">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Powerful Features
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Everything you need to build and maintain successful mentorship relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`p-8 bg-gradient-to-br ${feature.color} rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-transform group`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-6 bg-black/20 rounded-2xl group-hover:bg-black/30 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="p-12 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-[40px] backdrop-blur-xl">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
                Our Vision
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                To create a scalable, rural-accessible, and AI-driven mentorship platform
                that ensures meaningful connections and long-term engagement. We believe
                that everyone deserves access to quality mentorship, regardless of location
                or language barriers.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">
                  Automation
                </span>
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">
                  Transparency
                </span>
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">
                  Accessibility
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
              Built with Modern Tech
            </h2>
            <p className="text-white/60">
              Powered by industry-leading tools and frameworks
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Next.js",
              "TypeScript",
              "Firebase",
              "Gemini AI",
              "Tailwind CSS",
              "Firestore",
              "Cloud Functions",
              "React"
            ].map((tech, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl text-center hover:bg-white/10 transition-all"
              >
                <span className="font-bold text-white/90">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Ready to Transform Mentorship?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of mentors and mentees who are already building
            meaningful connections with Mentora.
          </p>
          <a
            href="/dashboard"
            className="inline-block px-12 py-5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-bold text-lg transition-all shadow-2xl shadow-indigo-500/30 hover:scale-105"
          >
            Start Your Journey Today
          </a>
        </div>
      </section>
    </main>
  );
}
