"use client";

import React, { useEffect, useState } from "react";

export default function SuccessPage() {
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "pending" | "ready">("loading");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (sessionId) {
      fetch(`/api/get-song-url?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.songUrl) {
            setSongUrl(data.songUrl);
            setStatus("ready");
          } else {
            setStatus("pending");
          }
        })
        .catch(() => {
          // If an error occurs, fall back to "pending"
          setStatus("pending");
        });
    } else {
      setStatus("pending");
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold text-purple-600">Thank You for Your Purchase!</h1>
        {status === "loading" && (
          <p className="text-gray-600">We’re preparing your order. Please hold on...</p>
        )}
        {status === "pending" && (
          <p className="text-gray-600">
            Your song is being composed. You’ll receive an email once it’s ready!
          </p>
        )}
        {status === "ready" && songUrl && (
          <div className="space-y-4">
            <p className="text-gray-600">Your personalized song is ready. Enjoy!</p>
            <audio controls className="w-full">
              <source src={songUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        <div className="pt-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </main>
  );
}
