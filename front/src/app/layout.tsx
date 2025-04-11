import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Argentina Rock - Festival",
  description: "Festival de Rock Abril 2024.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased mt-14`}
      >
        <main className="flex-grow">
          <AuthProvider>
            <Toaster
              position="top-right"
              containerStyle={{
                marginTop: "64px",
              }}
              toastOptions={{
                duration: 2000,
              }}
            />

            <NavBar />
            {children}
            <Footer />
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
