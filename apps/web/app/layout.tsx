import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OpenToolkit — OSS AI Tool Directory",
    template: "%s | OpenToolkit",
  },
  description:
    "Discover, upvote, and track the best open-source AI tools. Star history charts, AI-generated summaries, and weekly trending digests.",
  openGraph: {
    title: "OpenToolkit — OSS AI Tool Directory",
    description:
      "Discover, upvote, and track the best open-source AI tools.",
    url: "https://opentoolkit.dev",
    siteName: "OpenToolkit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenToolkit — OSS AI Tool Directory",
    description: "Discover, upvote, and track the best open-source AI tools.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignInUrl={undefined}>
      <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <body className="font-sans bg-white text-gray-900 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}