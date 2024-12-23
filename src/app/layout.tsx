import "../globals.css"; // Import Tailwind styles

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
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
