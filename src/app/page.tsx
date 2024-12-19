"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateSongPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const childName = formData.get("childName") as string;
    const genre = formData.get("genre") as string;
    const theme = formData.get("theme") as string;
    const email = formData.get("email") as string;

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childName, genre, theme, email }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        setError(data.error || "Failed to create Stripe Checkout session.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Compose Your Child's Classic
          </h1>
          <p className="text-lg text-gray-600">
            Let’s create a timeless musical masterpiece starring your little one!
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-white/80 shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Child's Name Field */}
              <div className="space-y-2">
                <Label htmlFor="childName" className="text-lg font-medium text-gray-700">
                  Child's Name
                </Label>
                <Input
                  id="childName"
                  name="childName"
                  required
                  placeholder="Enter your child's name"
                  className="py-3 rounded-lg"
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
          </CardContent>
        </Card>

        {error && (
          <div className="text-center text-red-500 font-semibold">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
