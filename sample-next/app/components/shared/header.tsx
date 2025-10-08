"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/app/types";

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/product", label: "Product" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 py-4 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link
          href="/"
          className="text-gray-800 dark:text-white text-xl font-bold mb-4 sm:mb-0 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        >
          SampleSite
        </Link>

        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6 sm:space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-medium transition-colors duration-300 pb-1 ${
                    pathname === item.href
                      ? "text-primary-500 dark:text-primary-400 border-b-2 border-primary-500 dark:border-primary-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
