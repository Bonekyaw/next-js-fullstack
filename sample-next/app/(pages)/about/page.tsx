import { Award, Globe, Target } from "lucide-react";

import { TeamMember } from "@/app/types";

const teamMembers: TeamMember[] = [
  { id: 1, name: "John Doe", role: "CEO & Founder", photo: "JD" },
  { id: 2, name: "Jane Smith", role: "CTO", photo: "JS" },
  { id: 3, name: "Mike Johnson", role: "Lead Developer", photo: "MJ" },
  { id: 4, name: "Sarah Wilson", role: "Designer", photo: "SW" },
];

export default function About() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              About{" "}
              <span className="text-primary-500 dark:text-primary-400">Us</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-balance">
              We are a sample company dedicated to creating amazing web
              experiences using modern technologies like Next.js and Tailwind
              CSS with full dark mode support.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Our mission is to provide high-quality web solutions that help
                  businesses grow and succeed in the digital world. We believe
                  in creating user-friendly, responsive, and scalable
                  applications that deliver exceptional user experiences.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <Target className="w-5 h-5 text-primary-500" />
                  <span>Innovation Driven</span>
                  <Globe className="w-5 h-5 text-primary-500" />
                  <span>Global Reach</span>
                  <Award className="w-5 h-5 text-primary-500" />
                  <span>Award Winning</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="opacity-90">
                  To be the leading provider of innovative web solutions that
                  transform businesses and create exceptional digital
                  experiences for users worldwide.
                </p>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Founded in 2020, we have worked with numerous clients to
                    create beautiful, functional websites that meet their unique
                    needs. Our journey began with a small team of passionate
                    developers.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Today, we&apos;ve grown into a full-service web development
                    agency committed to excellence and innovation, serving
                    clients across the globe.
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-500 mb-2">
                      50+
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Projects Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Meet Our{" "}
                <span className="text-primary-500 dark:text-primary-400">
                  Team
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-balance">
                Our team consists of experienced developers, designers, and
                project managers who are passionate about what they do and
                committed to delivering excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="text-center card p-6 animate-fade-in"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 text-lg">
                    {member.photo}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.role}
                  </p>
                  <div className="mt-4 flex justify-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
