import { Shield, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 text-balance">
              Welcome to Our{" "}
              <span className="text-primary-500 dark:text-primary-400">
                Website
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto text-balance">
              This is the home page of our sample Next.js website with Tailwind
              CSS and full dark mode support. We&apos;re glad you&apos;re here!
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Introduction Section */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 animate-fade-in">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-balance">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-primary-100 dark:border-gray-600">
                <Zap className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized performance with Next.js 15 and modern web
                  technologies.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-primary-100 dark:border-gray-600">
                <Shield className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Secure & Reliable
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enterprise-grade security and 99.9% uptime guarantee.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-primary-100 dark:border-gray-600">
                <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  User Focused
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Designed with user experience and accessibility in mind.
                </p>
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                Why Choose Us?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    All our products undergo rigorous quality testing to ensure
                    they meet the highest standards of excellence and
                    reliability.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    Expert Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our team of experts is always ready to help you find the
                    perfect solution for your needs with 24/7 customer support.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
