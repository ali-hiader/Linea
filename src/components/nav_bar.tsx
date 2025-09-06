"use client";

import CartIcon from "@/icons/cart";
import SearchIcon from "@/icons/search";
import UserIcon from "@/icons/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/",
    name: "Shop",
  },
  {
    href: "/about",
    name: "About",
  },
];
export default function NavBar() {
  const pathName = usePathname();
  return (
    <nav className="flex justify-between items-start mt-10 mb-20 px-4 sm:px-[5%]">
      <hgroup className="space-y-1 ">
        <Link
          href={"/"}
          className="headingFont text-4xl font-extrabold cursor-pointer"
        >
          linea
        </Link>
        <p className="text-gray-600">Timeless / Elegant</p>
      </hgroup>
      <section className="flex h-11 flex-row items-center justify-between rounded-full bg-primary text-white px-6 lg:h-16 lg:min-w-fit lg:gap-16 lg:px-12">
        {/* Desktop Nav */}
        <ul className="desktop-body-l hidden list-none flex-row items-center gap-8 lg:flex">
          {navLinks.map(({ href, name }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${
                  pathName === href ? "text-secondary " : "text-white "
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div className="hidden h-full items-center justify-center lg:flex">
          <ul className="flex list-none flex-row gap-7 leading-none lg:gap-8">
            {/* Search */}
            <li>
              <button className="text-[10px]">
                <SearchIcon />
              </button>
            </li>

            {/* Account */}
            <li>
              <Link href={"/account"} aria-label="Go to account">
                <UserIcon className="size-6" />
              </Link>
            </li>

            {/* Cart */}
            <li>
              <Link href={"/cart"} className="relative" aria-label="Open cart">
                <CartIcon className="size-6" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Nav */}
        <section className="lg:hidden">
          <ul className="flex list-none gap-6">
            {/* Mobile Search */}
            <li className="flex items-center">
              <button className="relative" aria-label="Open search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="size-[var(--mobile-icon-size)]"
                >
                  <path
                    fill="currentColor"
                    d="m23.707 22.294-5.97-5.97a10.016 10.016 0 1 0-1.413 1.415l5.969 5.969a1 1 0 0 0 1.414-1.414ZM10 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8Z"
                  />
                </svg>
              </button>
            </li>

            {/* Mobile Cart */}
            <li className="flex items-center">
              <button className="relative" aria-label="Open cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 18 18"
                  className="size-[var(--mobile-icon-size)]"
                >
                  <path
                    fill="currentColor"
                    d="M15.75 4.5H13.5a4.5 4.5 0 1 0-9 0H2.25A2.25 2.25 0 0 0 0 6.75v7.5A3.754 3.754 0 0 0 3.75 18h10.5A3.754 3.754 0 0 0 18 14.25v-7.5a2.25 2.25 0 0 0-2.25-2.25ZM9 1.5a3 3 0 0 1 3 3H6a3 3 0 0 1 3-3Zm7.5 12.75a2.25 2.25 0 0 1-2.25 2.25H3.75a2.25 2.25 0 0 1-2.25-2.25v-7.5A.75.75 0 0 1 2.25 6H4.5v1.5a.75.75 0 0 0 1.5 0V6h6v1.5a.75.75 0 1 0 1.5 0V6h2.25a.75.75 0 0 1 .75.75z"
                  />
                </svg>
              </button>
            </li>

            {/* Mobile Menu */}
            <li className="flex items-center">
              <button className="relative" aria-label="Open menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 18 18"
                  className="size-[var(--mobile-icon-size)]"
                >
                  <path
                    fill="currentColor"
                    d="M17.25 8.25H.75a.75.75 0 1 0 0 1.5h16.5a.75.75 0 0 0 0-1.5ZM17.25 3H.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5ZM17.25 13.5H.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5Z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </section>
      </section>
    </nav>
  );
}
