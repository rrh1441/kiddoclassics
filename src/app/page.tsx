"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Play, Pause } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ExampleSong Component
function ExampleSong({ name, genre, theme, audioSrc }: { name: string; genre: string; theme: string; audioSrc: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Sample Song</h3>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Child&apos;s Name:</span> {name}
              </p>
              <p>
                <span className="font-semibold">Genre:</span> {genre}
              </p>
              <p>
                <span className="font-semibold">Theme:</span> {theme}
              </p>
            </div>
          </div>
          <div className="bg-white p-8 flex flex-col items-center justify-center space-y-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
              <Music className="w-16 h-16 text-blue-600" />
            </div>
            <audio ref={audioRef} src={audioSrc} />
            <Button
              onClick={togglePlayPause}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full flex items-center space-x-2 shadow-md transition-all duration-300 transform hover:scale-105"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Play Song</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
        window.location.href = data.url;
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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Kiddoclassics
        </h1>
        <p className="text-lg text-gray-600">Create a timeless musical masterpiece for your little one!</p>
        <Button
          onClick={toggleModal}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md"
        >
          Get Started
        </Button>
      </div>

      <div className="mt-12">
        <ExampleSong name="Penelope" genre="Lullaby" theme="Adventure" audioSrc="/example-song.mp3" />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button onClick={toggleModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Create Your Song</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Child&apos;s Name</Label>
                <Input id="childName" name="childName" value={formData.childName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Song Style</Label>
                <Input id="genre" name="genre" value={formData.genre} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme">Special Theme</Label>
                <Input id="theme" name="theme" value={formData.theme} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Delivery Email Address</Label>
                <Input id="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <Button type="submit" className="w-full">
                {loading ? "Creating Session..." : "Create Your Classic"}
              </Button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
