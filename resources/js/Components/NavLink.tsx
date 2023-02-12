import { Link } from "@inertiajs/react"

interface Props {
  href: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}

export default function NavLink({ href, setUrl, children } : Props) {
  return (
    <Link style={{ textDecoration: 'none' }} href={href} onClick={() => setUrl(href)}>
      {children}
    </Link>
  )
}
