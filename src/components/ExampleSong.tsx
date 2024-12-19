import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Play, Pause } from "lucide-react";

interface ExampleSongProps {
  name: string;
  genre: string;
  theme: string;
  audioSrc: string;
}

export function ExampleSong({ name, genre, theme, audioSrc }: ExampleSongProps) {
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
            <audio ref={audioRef} src={audioSrc}></audio>
            <button
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
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
