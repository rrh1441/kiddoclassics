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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center p-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Timeless, Personalized Songs for Your Little Ones
        </h1>
        <p className="text-lg text-gray-600">
          Create magical melodies that feature your child&#39;s name, weaving
          unforgettable musical stories that will become their lifelong
          favorites.
        </p>
        <Button
          onClick={toggleModal}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md"
        >
          Create Your Child&#39;s Classic
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {/* Card 1 */}
        <Card className="text-center bg-white shadow-lg p-6">
          <div className="text-yellow-500 mb-4 text-4xl">⭐</div>
          <h3 className="text-xl font-bold text-gray-800">Perfectly Personalized</h3>
          <p className="text-gray-600 mt-2">
            Each song is a unique creation, starring your child as the hero of
            their own musical adventure.
          </p>
        </Card>
        {/* Card 2 */}
        <Card className="text-center bg-white shadow-lg p-6">
          <div className="text-blue-500 mb-4 text-4xl">🎵</div>
          <h3 className="text-xl font-bold text-gray-800">Diverse Melodies</h3>
          <p className="text-gray-600 mt-2">
            From soothing lullabies to educational tunes, find the perfect song
            for every moment.
          </p>
        </Card>
        {/* Card 3 */}
        <Card className="text-center bg-white shadow-lg p-6">
          <div className="text-red-500 mb-4 text-4xl">❤️</div>
          <h3 className="text-xl font-bold text-gray-800">Cherished Memories</h3>
          <p className="text-gray-600 mt-2">
            Create lasting bonds and precious moments with songs your child will
            treasure for years to come.
          </p>
        </Card>
      </div>

      {/* Modal for Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
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
              {/* Child's Name Field */}
              <div className="space-y-2">
                <Label htmlFor="childName" className="text-lg font-medium text-gray-700">
                  Child&#39;s Name
                </Label>
                <Input
                  id="childName"
                  name="childName"
                  required
                  placeholder="Enter your child&#39;s name"
                  className="py-3 rounded-lg"
                  value={formData.childName}
                  onChange={handleInputChange}
                />
              </div>

              {/* Genre Field */}
              <div className="space-y-2">
                <Label htmlFor="genre" className="text-lg font-medium text-gray-700">
                  Song Style
                </Label>
                <Input
                  id="genre"
                  name="genre"
                  required
                  placeholder="Enter song style (e.g., Lullaby, Upbeat)"
                  className="py-3 rounded-lg"
                  value={formData.genre}
                  onChange={handleInputChange}
                />
              </div>

              {/* Theme Field */}
              <div className="space-y-2">
                <Label htmlFor="theme" className="text-lg font-medium text-gray-700">
                  Special Theme
                </Label>
                <Input
                  id="theme"
                  name="theme"
                  required
                  placeholder="e.g., Bedtime, Adventure, Friendship"
                  className="py-3 rounded-lg"
                  value={formData.theme}
                  onChange={handleInputChange}
                />
              </div>

              {/* Delivery Email Address Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-medium text-gray-700">
                  Delivery Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter the email address where you want to send the song"
                  className="py-3 rounded-lg"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition-transform transform hover:scale-105"
              >
                {loading ? "Creating Session..." : "Create Your Classic"}
              </Button>
            </form>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
