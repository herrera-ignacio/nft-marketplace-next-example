import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface LinkProps {
  href: string;
  children: ReactNode;
  activeClass: string;
  className: string;
}

const ActiveLink: React.FC<LinkProps> = ({children, activeClass, ...props}) => {
  const { pathname } = useRouter();
  let className = props.className;

  if (pathname === props.href) {
    className = `${className} text-indigo-400 ${activeClass}`;
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
