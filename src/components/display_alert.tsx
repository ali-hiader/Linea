import React, { type PropsWithChildren } from "react";

function DisplayAlert({ children }: PropsWithChildren) {
  return (
    <h3 className="mt-12 w-full text-xl italic font-medium text-gray-500 text-center">
      {children}
    </h3>
  );
}

export default DisplayAlert;
