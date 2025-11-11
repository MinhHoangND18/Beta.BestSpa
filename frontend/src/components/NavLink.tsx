import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`tw-font-medium hover:tw-text-[#c42e87] ${
        isActive ? "tw-text-[#c42e87]" : "tw-text-gray-800"
      }`}
    >
      {label}
    </Link>
  );
}
