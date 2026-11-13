import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ShaderBackground } from "@/components/ui/shader-background";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AOTMS Global — Business Software & Automation Products",
    template: "%s | AOTMS Global",
  },
  description:
    "AOTMS Global builds business software for learning, sales, communication and operations — LMS, CRM, WhatsApp Automation, AI Calling, PitchBid auction platform and ERP solutions.",
  applicationName: "AOTMS Global",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="isolate flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        {/* Site-wide mesh drift background: cream, gold and peach washes.
            Sits above the flat body colour and below all content; hidden for
            reduced motion. */}
        <ShaderBackground className="pointer-events-none fixed inset-0 -z-10 h-full w-full motion-reduce:hidden" />
        {children}
      </body>
    </html>
  );
}
