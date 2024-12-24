import "../globals.css"; // Import Tailwind styles
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Kiddo Classics",
  description: "Create timeless, personalized songs for your child",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Optionally, you can still set <title> here,
            or rely on metadata if you're using Next.js app router's conventions */}
        <title>Kiddo Classics</title>
      </head>
      <body className="bg-white text-gray-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
