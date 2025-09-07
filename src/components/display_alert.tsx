import Link from "next/link";
import React, { type PropsWithChildren } from "react";

function DisplayAlert({ children }: PropsWithChildren) {
  return (
    <hgroup className="flex flex-col items-center gap-4 mt-16">
      <h3 className="w-full text-xl italic font-medium text-gray-500 text-center">
        {children}
      </h3>
      <Link
        href={"/"}
        className="min-w-72 mx-auto py-2 px-4 outline outline-primary rounded-full text-center hover:outline-transparent hover:bg-secondary hover:text-white transition-all"
      >
        Continue Exploring
      </Link>
    </hgroup>
  );
}

export default DisplayAlert;
