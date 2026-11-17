import { socials } from '@/app/lib/site'
import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon } from './icons'

const links = [
  { href: socials.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: socials.email, label: 'Email', Icon: MailIcon },
  { href: socials.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: socials.instagram, label: 'Instagram', Icon: InstagramIcon },
]

export default function SocialLinks({ vertical = false }: { vertical?: boolean }) {
  return (
    <ul
      className={`flex gap-4 rounded-full bg-white text-black ${
        vertical ? 'flex-col px-3 py-4' : 'px-6 py-3'
      }`}
    >
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="block transition hover:text-[color:var(--site-teal)]"
          >
            <Icon className="h-6 w-6" />
          </a>
        </li>
      ))}
    </ul>
  )
}