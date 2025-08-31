import React, { SVGProps } from "react";

function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.75 4.5H13.5a4.5 4.5 0 1 0-9 0H2.25A2.25 2.25 0 0 0 0 6.75v7.5A3.754 3.754 0 0 0 3.75 18h10.5A3.754 3.754 0 0 0 18 14.25v-7.5a2.25 2.25 0 0 0-2.25-2.25ZM9 1.5a3 3 0 0 1 3 3H6a3 3 0 0 1 3-3Zm7.5 12.75a2.25 2.25 0 0 1-2.25 2.25H3.75a2.25 2.25 0 0 1-2.25-2.25v-7.5A.75.75 0 0 1 2.25 6H4.5v1.5a.75.75 0 0 0 1.5 0V6h6v1.5a.75.75 0 1 0 1.5 0V6h2.25a.75.75 0 0 1 .75.75z"
      />
    </svg>
  );
}

export default CartIcon;
