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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center p-4">
      {/* Hero Section with Slightly Increased Top Margin */}
      <div className="text-center space-y-4 max-w-3xl mt-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Write a Love Song to Your Little One
        </h1>
        <p className="text-base text-gray-700">
          Turn your favorite stories into unforgettable songs
        </p>
        <Button
          onClick={toggleModal}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md"
        >
          Create Your Child&#39;s Classic
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="p-4 text-center shadow-sm rounded-lg">
          <h3 className="text-lg font-bold text-blue-600">Perfectly Personalized</h3>
          <p className="text-gray-700 mt-2 text-sm">
            Each song is a unique creation, starring your child as the hero of their own musical adventure.
          </p>
        </Card>
        <Card className="p-4 text-center shadow-sm rounded-lg">
          <h3 className="text-lg font-bold text-blue-600">Diverse Melodies</h3>
          <p className="text-gray-700 mt-2 text-sm">
            From quiet lullabies to rock ballads, find the perfect song for every moment.
          </p>
        </Card>
        <Card className="p-4 text-center shadow-sm rounded-lg">
          <h3 className="text-lg font-bold text-blue-600">Cherished Memories</h3>
          <p className="text-gray-700 mt-2 text-sm">
            Create lasting bonds and precious moments with songs your child will treasure for years to come.
          </p>
        </Card>
      </div>

      {/* Example Song */}
      <div className="mt-8 max-w-4xl w-full">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white">
              <h3 className="text-xl font-bold mb-2">Demo - Penelope&#39;s Wild Ride</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">Name:</span> Penelope</p>
                <p><span className="font-semibold">Genre:</span> Bluegrass</p>
                <p><span className="font-semibold">Theme:</span> My Toddler Loves Adventure</p>
              </div>
            </div>
            <div className="bg-white p-4 flex flex-col items-center justify-center space-y-4">
              <img
                src="/thumbnail.png"
                alt="Thumbnail"
                className="w-24 h-24 rounded-full shadow-md"
              />
              <audio controls className="w-full">
                <source src="/example-song.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </Card>

        {/* Additional CTA */}
        <div className="text-center mt-4">
          <Button
            onClick={toggleModal}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md"
          >
            Create Your Song Now
          </Button>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="mt-8 bg-gray-100 py-6">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
            Hear From Our Happy Parents
          </h2>
          <div className="space-y-4">
            <blockquote className="text-gray-700 text-sm">
              Finding gifts that feel truly special is so hard. When I heard my daughter’s song for the first time, I actually
              teared up. She dances to it every morning, and I know this memory will stay with her forever.
              <br />
              <span className="block mt-2 font-bold text-gray-900 text-base">
                — Sarah, mom of a 4-year-old
              </span>
            </blockquote>
            <blockquote className="text-gray-700 text-sm">
              As a busy mom, I’m always looking for ways to connect with my kids in meaningful ways. This isn’t just a song; it’s
              part of our story. My son lights up every time he hears it—it’s like our little family anthem.
              <br />
              <span className="block mt-2 font-bold text-gray-900 text-base">
                — Emily, mom of two
              </span>
            </blockquote>
            <blockquote className="text-gray-700 text-sm">
              We’ve tried all the ‘cool toys,’ but they never last. The song we created has become a part of our bedtime
              routine—it’s the one thing my daughter looks forward to every night. It’s the best gift I’ve ever given her.
              <br />
              <span className="block mt-2 font-bold text-gray-900 text-base">
                — Amanda, mom of a 5-year-old
              </span>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-600 text-xs">
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
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-sm"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Create Your Song
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="childName" className="text-sm font-medium text-gray-700">
                  Child&#39;s Name
                </Label>
                <Input
                  id="childName"
                  name="childName"
                  required
                  placeholder="Enter your child&#39;s name"
                  value={formData.childName}
                  onChange={handleInputChange}
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="genre" className="text-sm font-medium text-gray-700">
                  Song Style
                </Label>
                <Input
                  id="genre"
                  name="genre"
                  required
                  placeholder="Enter song style (e.g., Lullaby, Upbeat)"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="theme" className="text-sm font-medium text-gray-700">
                  Special Theme
                </Label>
                <Input
                  id="theme"
                  name="theme"
                  required
                  placeholder="e.g., Bedtime, Adventure, Friendship"
                  value={formData.theme}
                  onChange={handleInputChange}
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
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
                  className="text-sm"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm py-2 rounded-lg"
              >
                {loading ? "Creating Session..." : "Create Your Classic"}
              </Button>
            </form>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
