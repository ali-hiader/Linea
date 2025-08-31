import React, { SVGProps } from "react";

function UserIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M9 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-7.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM9 10.5a6.76 6.76 0 0 0-6.75 6.75.75.75 0 1 0 1.5 0 5.25 5.25 0 1 1 10.5 0 .75.75 0 1 0 1.5 0A6.76 6.76 0 0 0 9 10.5Z"
      />
    </svg>
  );
}

export default UserIcon;
