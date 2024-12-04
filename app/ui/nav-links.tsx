'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavLinks() {
  const pathname = usePathname();

  const baseClass = 'bg-white inline-block py-2 px-4 font-semibold';
  const active = 'border-l border-t border-r rounded-t text-blue-700';
  const inactive = 'text-blue-500 hover:text-blue-800';

  const determineClassName = (link: string) => link === pathname ? active : inactive;

  return (
    <nav>
      <ul className="flex border-b mt-4">
        {
          [
            ['/', 'Home'],
            ['/dashboard', 'Dashboard'],
            ['/catalogue', 'Catalogue'],
          ].map(([route, value], index) => 
            <li key={index} className="-mb-px mr-1">
              <Link
                className={ `${baseClass} ${determineClassName(route)}` }
                href={route}>{value}
              </Link>
            </li>
          )
        }
      </ul>
    </nav>
  );
}
