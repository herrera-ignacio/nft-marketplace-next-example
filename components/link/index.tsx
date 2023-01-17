import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface LinkProps {
  href: string;
  children: ReactNode;
  activeClass: string;
  className: string;
}

const ActiveLink: React.FC<LinkProps> = ({children, ...props}) => {
  const { pathname } = useRouter();
  let className = props.className;

  if (pathname === props.href) {
    console.log(props.href);
    console.log(pathname);
    className = `${className} text-indigo-400 ${props.activeClass}`;
  } else {
    className = `${className} text-gray-100`;
  }

  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
};

export default ActiveLink;
