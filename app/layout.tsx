import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Typing Speed Test - Check Your WPM & Accuracy",
    template: "%s | Typing Speed Test",
  },
  description:
    "Test your typing speed with our fast and accurate typing test tool. Measure WPM, CPM, and accuracy in real-time.",

  keywords: [
    "typing test",
    "typing speed test",
    "wpm test",
    "keyboard speed",
    "typing practice",
    "typing accuracy",
  ],

  authors: [{ name: "Jahid Hasan", url: "https://jahid.pro" }],
  creator: "Jahid Hasan",

  metadataBase: new URL("https://typefun-liard.vercel.app"),

  openGraph: {
    title: "Typing Speed Test - Check Your WPM",
    description:
      "Improve your typing speed and accuracy with a real-time typing test app.",
    url: "https://typefun-liard.vercel.app",
    siteName: "Typing Speed Test",
    images: [
      {
        url: "/type-fun.png",
        width: 1200,
        height: 630,
        alt: "Typing Speed Test App",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Typing Speed Test - Measure Your WPM",
    description:
      "Take a typing test and track your typing performance instantly.",
    images: ["/type-fun.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", inter.variable, "font-sans", "dark")}
    >
      <body className="">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
