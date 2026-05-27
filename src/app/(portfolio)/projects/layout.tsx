import type { Metadata } from "next";

// Updated metadata to match your portfolio context
export const metadata: Metadata = {
  title: "MD Jaber Hossain Chowdhury / Projects",
  description: "Personal projects of MD Jaber Hossain Chowdhury.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
