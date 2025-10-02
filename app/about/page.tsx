"use client";

import { Logo } from "@/components/Logo";
import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <div className="md:hidden">
        <header className="flex items-center justify-between p-4">
          <Logo />
          <Link href="/" className="text-blue-400 text-sm">
            ← Back to Home
          </Link>
        </header>
        <div className="px-6 py-6">
          <AboutContent />
        </div>
      </div>
      <div className="hidden md:flex gap-0">
        <nav className="h-screen bg-[rgba(0,0,0,.1)] border-e border-e-[#2e2e38] min-w-[15em] px-6 py-6">
          <div className="mb-7">
            <Logo />
          </div>
          <ul className="text-white flex flex-col gap-2">
            <li>
              <Link href="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>Discover</li>
            <li className="text-blue-400">About Us</li>
          </ul>
        </nav>
        <main className="w-full p-8 overflow-auto">
          <AboutContent />
        </main>
      </div>
    </>
  );
}

function AboutContent() {
  return (
    <div className="text-white max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">
          Our Mission
        </h2>
        <p className="text-gray-300 leading-relaxed">
          We're passionate about bringing the world of podcasts to your
          fingertips. Our platform makes it easy to discover, explore, and enjoy
          the best podcast content from around the globe. Whether you're looking
          for the latest tech news, inspiring stories, or educational content,
          we've got you covered.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[rgba(0,0,0,.3)] p-5 rounded-lg border border-[#2e2e38]">
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-gray-300 text-sm">
              Find exactly what you're looking for with our powerful search
              engine that indexes thousands of podcasts and episodes.
            </p>
          </div>
          <div className="bg-[rgba(0,0,0,.3)] p-5 rounded-lg border border-[#2e2e38]">
            <h3 className="text-xl font-semibold mb-2">Top Episodes</h3>
            <p className="text-gray-300 text-sm">
              Stay up-to-date with trending episodes and discover what's popular
              in the podcast community.
            </p>
          </div>
          <div className="bg-[rgba(0,0,0,.3)] p-5 rounded-lg border border-[#2e2e38]">
            <h3 className="text-xl font-semibold mb-2">Easy Discovery</h3>
            <p className="text-gray-300 text-sm">
              Browse through curated collections and find new podcasts that match
              your interests.
            </p>
          </div>
          <div className="bg-[rgba(0,0,0,.3)] p-5 rounded-lg border border-[#2e2e38]">
            <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
            <p className="text-gray-300 text-sm">
              Enjoy a clean, intuitive interface designed to make your podcast
              listening experience seamless.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">Our Story</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Founded with a vision to revolutionize podcast discovery, we believe
          that everyone deserves access to quality audio content. Our team of
          developers and podcast enthusiasts work tirelessly to create the best
          possible experience for listeners worldwide.
        </p>
        <p className="text-gray-300 leading-relaxed">
          We're constantly improving our platform, adding new features, and
          expanding our database to ensure you have access to the most
          comprehensive podcast library available.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">
          Get in Touch
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-950 rounded-lg py-2 px-4 text-white text-sm hover:bg-blue-900 transition">
            Contact Us
          </button>
          <button className="bg-blue-950 rounded-lg py-2 px-4 text-white text-sm hover:bg-blue-900 transition">
            Join Our Community
          </button>
        </div>
      </section>
    </div>
  );
}
