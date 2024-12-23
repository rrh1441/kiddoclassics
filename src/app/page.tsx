"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    childName: "",
    genre: "",
    theme: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        setError(data.error || "Failed to create Stripe Checkout session.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto px-4">
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              KiddoClassics: Where Your Family&#39;s Stories Come to Life
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Transform your child&#39;s special moments into a one-of-a-kind musical experience they&#39;ll cherish forever.
            </p>
            {/* Single Testimonial Near the Top */}
            <blockquote className="italic text-gray-800 text-base md:text-lg">
              “My daughter lit up when she heard her name in the song—priceless!”
            </blockquote>
            <Button
              onClick={toggleModal}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Create Your KiddoClassic Now
            </Button>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/hero-image.jpg"
              alt="A happy family enjoying music"
              className="w-full h-auto max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-12 max-w-3xl mx-auto px-4">
        <ul className="list-disc list-inside text-gray-700 text-base md:text-lg space-y-2">
          <li>Capture your child’s unique personality in a custom tune</li>
          <li>Written &amp; recorded, just for your family</li>
          <li>A keepsake your child will cherish for a lifetime</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            How It Works
          </h2>
          <ol className="list-decimal list-inside text-gray-700 text-base md:text-lg space-y-2 text-left md:text-center mx-auto">
            <li>Tell Us Your Child’s Story (funny anecdotes, favorite activities, unique characteristics)</li>
            <li>Pick a Musical Style (lullaby, folk, pop—whatever fits your child’s vibe)</li>
            <li>We Craft the Custom Song and deliver a professionally recorded masterpiece</li>
          </ol>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center shadow-lg rounded-lg bg-white">
            <h3 className="text-xl font-semibold text-indigo-600">
              Your Story, Your Way
            </h3>
            <p className="text-gray-700 mt-2 text-base md:text-lg">
              Write a unique tale inspired by your child&#39;s quirks, dreams, and adventures—then let us transform it into a beautifully crafted song.
            </p>
          </Card>
          <Card className="p-6 text-center shadow-lg rounded-lg bg-white">
            <h3 className="text-xl font-semibold text-indigo-600">
              Melodies for Every Imagination
            </h3>
            <p className="text-gray-700 mt-2 text-base md:text-lg">
              From lullabies to energetic folk tunes, pick a style that matches your little one&#39;s personality.
            </p>
          </Card>
          <Card className="p-6 text-center shadow-lg rounded-lg bg-white">
            <h3 className="text-xl font-semibold text-indigo-600">
              Bond &amp; Build Memories
            </h3>
            <p className="text-gray-700 mt-2 text-base md:text-lg">
              Each KiddoClassic turns everyday moments into treasured keepsakes, fostering a deeper connection between you and your child.
            </p>
          </Card>
        </div>
      </section>

      {/* Penelope Testimonial Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="overflow-hidden shadow-lg rounded-lg">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                <blockquote className="text-xl italic mb-2">
                  “I wanted to create a song for my adventurous two-year-old Penelope and she&#39;s obsessed with bluegrass right now.”
                </blockquote>
              </div>
              <div className="bg-white p-6 flex flex-col items-center justify-center space-y-4">
                <img
                  src="/thumbnail.png"
                  alt="Thumbnail"
                  className="w-24 h-24 rounded-full shadow-lg"
                />
                <audio controls className="w-full">
                  <source src="/example-song.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </Card>

          {/* Additional CTA */}
          <div className="text-center mt-8">
            <Button
              onClick={toggleModal}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Create Your KiddoClassic Now
            </Button>
          </div>
        </div>
      </section>

      {/* Hear From Our Happy Parents */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Hear From Our Happy Parents
          </h2>
          <div className="space-y-6 text-base md:text-lg text-gray-700">
            <blockquote>
              Finding gifts that feel truly special is so hard. When I heard my daughter’s song for the first time, I actually teared up. She dances to it every morning.
              <br />
              <span className="block mt-2 font-bold text-gray-900">
                — Sarah, mom of a 4-year-old
              </span>
            </blockquote>
            <blockquote>
              As a busy mom, I’m always looking for ways to connect. This isn’t just a song; it’s part of our story. My son lights up every time he hears it.
              <br />
              <span className="block mt-2 font-bold text-gray-900">
                — Emily, mom of two
              </span>
            </blockquote>
            <blockquote>
              We’ve tried all the ‘cool toys,’ but they never last. The song we created is part of our bedtime routine—my daughter looks forward to it every night.
              <br />
              <span className="block mt-2 font-bold text-gray-900">
                — Amanda, mom of a 5-year-old
              </span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8 text-base md:text-lg text-gray-700">
            <div>
              <h3 className="font-semibold">How long does it take to create?</h3>
              <p>
                Most of our songs are ready for download within 10 minutes but they take no longer than an hour.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">How long are the songs?</h3>
              <p>
                They&#39;re about two minutes long.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Can I download the song and keep it forever?</h3>
              <p>
                Yes, you&#39;ll receive a digital download once it&#39;s ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heartfelt Nudge */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-base md:text-lg text-gray-800">
            Imagine the look on your child’s face the first time they hear their own story set to music.
            Let’s make that memory together!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-600 text-sm">
        <p>
          <a
            href="/privacy-policy"
            className="text-blue-500 hover:underline"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms-of-service"
            className="text-blue-500 hover:underline"
          >
            Terms of Service
          </a>
        </p>
      </footer>

      {/* Modal for Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Create Your Song
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label
                  htmlFor="childName"
                  className="text-base md:text-lg font-medium text-gray-700"
                >
                  Child&#39;s Name
                </Label>
                <Input
                  id="childName"
                  name="childName"
                  required
                  placeholder="Enter your child&#39;s name"
                  value={formData.childName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="genre"
                  className="text-base md:text-lg font-medium text-gray-700"
                >
                  Song Style
                </Label>
                <Input
                  id="genre"
                  name="genre"
                  required
                  placeholder="e.g., Lullaby, Upbeat"
                  value={formData.genre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="theme"
                  className="text-base md:text-lg font-medium text-gray-700"
                >
                  Special Theme
                </Label>
                <Input
                  id="theme"
                  name="theme"
                  required
                  placeholder="e.g., Bedtime, Adventure"
                  value={formData.theme}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="email"
                  className="text-base md:text-lg font-medium text-gray-700"
                >
                  Delivery Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address where we send the song"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg py-3 rounded-lg shadow hover:opacity-90"
              >
                {loading ? "Creating Session..." : "Create Your KiddoClassic Now"}
              </Button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
