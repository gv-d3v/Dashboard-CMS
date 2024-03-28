import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import NavBar from "@/components/NavBar";
import Space from "@/components/Space";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Content Management System for websites",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          <Space space={"4rem"}/>
          {children}
         
        </AuthProvider>
      </body>
    </html>
  );
}
