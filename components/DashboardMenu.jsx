"use client";

import { signOut as NextAuthSignOut } from "next-auth/react";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";

const handleSignOut = () => {
  NextAuthSignOut();
  auth.signOut();
};

const menu = [
  {
    name: "Edit Website",
    description: "",
    imageSrc: "/website.png",
    imageAlt: "Edit Website option.",
    href: "dashboard/websites",
    height: 50,
    width: 50,
  },
  {
    name: "Edit Team",
    description: "",
    imageSrc: "/team.png",
    imageAlt: "Edit Team option.",
    href: "dashboard/team",
    height: 50,
    width: 50,
  },
  {
    name: "File Manager",
    description: "",
    imageSrc: "/file.png",
    imageAlt: "File Manager option.",
    href: "dashboard/file-manager",
    height: 50,
    width: 50,
  },
  {
    name: "Settings",
    description: "",
    imageSrc: "/settings.png",
    imageAlt: "Settings option.",
    href: "dashboard/settings",
    height: 50,
    width: 50,
  },
  {
    name: "Contact Support",
    description: "",
    imageSrc: "/support.png",
    imageAlt: "Contact Support option.",
    href: "dashboard/support",
    height: 50,
    width: 50,
  },
  {
    name: "Sign Out",
    description: "",
    imageSrc: "/LogoutPNG.png",
    imageAlt: "Sign Out option.",
    href: `#`,
    height: 50,
    width: 50,
    function: handleSignOut,
  },
];

export default function DashboardMenu() {
  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main className="mt-0.5">
        <div className="bg-gray-100 h-fit">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-4 sm:py-4 lg:max-w-none lg:py-11">
              <div className="lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 menu-pos">
                {menu.map((menuItem, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <div className="relative w-full rounded-lg  sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 h-64">
                      <Link href={menuItem.href}>
                        <Image
                          className="imageMenu hover:opacity-75"
                          src={menuItem.imageSrc}
                          width={menuItem.width}
                          height={menuItem.height}
                          unoptimized={true}
                          onClick={menuItem.function ? menuItem.function : null}
                          alt={menuItem.imageAlt}
                        />
                        <div className="centeredMenu">
                          <h1 className="">{menuItem.name}</h1>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
