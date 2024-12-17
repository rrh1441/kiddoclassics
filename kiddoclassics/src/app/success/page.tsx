"use client";
import React, { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [songUrl, setSongUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (sessionId) {
      fetch(`/api/get-song-url?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSongUrl(data.songUrl || null);
          setStatus(data.status || "pending");
        });
    } else {
      setStatus("error");
    }
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Thank You for Your Purchase!</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "pending" && <p>Your song is being prepared. Please check back later.</p>}
      {songUrl && (
        <>
          <p>Your personalized song is ready:</p>
          <audio controls>
            <source src={songUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </>
      )}
      {status === "error" && <p>Something went wrong. Please contact support.</p>}
    </main>
  );
}
