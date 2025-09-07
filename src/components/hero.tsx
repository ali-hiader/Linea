"use client";

import { useState } from "react";
import Heading from "./heading";

const filters = ["All", "Dress shirts", "Casual shirts", "White shirts"];

interface Props {
  itemsOnPage: number;
}

export default function Hero({ itemsOnPage }: Props) {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <header className="mb-7 lg:mb-11 px-4 sm:px-[5%]">
      <Heading title="Shirts Collection" itemsOnPage={itemsOnPage} />
      {/* Description */}
      <div className="mt-6 prose prose-sm light:prose-light sm:prose lg:prose-lg xl:prose-xl light:[&_a]:prose-light prose-h1:mb-4 prose-h1:text-5xl prose-h2:mb-4 prose-h2:text-4xl prose-h3:font-neutraface prose-h3:text-3xl max-w-3xl">
        <div className=" text-xl leading-8 transition-all duration-500 overflow-hidden line-clamp-3 max-h-48 lg:max-h-32">
          <p>
            Discover our curated selection of premium shirts designed for every
            occasion. From crisp dress shirts to relaxed casual styles, each
            piece is crafted with attention to detail and timeless style.
          </p>
        </div>
      </div>
      <div className="mb-7 mt-14 flex flex-col gap-7 lg:mb-11 lg:flex-row lg:justify-between">
        {/* Left Section: Filters */}
        <div className="flex gap-2 overflow-x-auto px-5 lg:flex-wrap lg:px-0">
          {filters.map((label) => (
            <button
              onClick={() => setSelectedFilter(label)}
              key={label}
              className={`${
                selectedFilter === label
                  ? "bg-secondary text-white"
                  : "bg-secondary-foreground"
              } shrink-0 h-11 min-w-max items-center justify-center rounded-full px-6 inline-flex cursor-pointer`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right Section: View Toggle */}
        <div className="mr-4 flex flex-row justify-end gap-5 lg:mr-0">
          <button aria-label="Overview view">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="h-4 w-4"
            >
              <path fill="currentColor" d="M3 14.767h.1V12.9H1.233v1.867..." />
            </svg>
          </button>
          <button aria-label="Detail view">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="h-4 w-4"
            >
              <path fill="currentColor" d="M3.333.1h9.334A3.233 3.233..." />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
