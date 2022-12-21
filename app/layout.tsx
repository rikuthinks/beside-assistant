import "../styles/globals.css";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-zinc-800 from-gray-700 via-gray-900 to-black">
        {/* @ts-expect-error: Async Server Component */}
        <Header />
        {children}
      </body>
    </html>
  );
}
