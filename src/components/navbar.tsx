import Link from 'next/link'
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter, BsX } from 'react-icons/bs'
import styles from '../styles/components/navbar.module.scss'

type Props = {
  onClose: () => void,
  show: boolean
}

export function Navbar({ onClose, show }: Props) {
  return (
    <div className={styles.root} style={{ left: show ? 0 : '100%' }}>
      <header>
        <button onClick={onClose}>
          <BsX />
        </button>
      </header>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <footer>
        <main>
          <a href="https://facebook.com/gabrielrochamd" rel="noopener noreferrer" target="_blank"><BsFacebook /></a>
          <a href="https://github.com/gabrielrochamd" rel="noopener noreferrer" target="_blank"><BsGithub /></a>
          <a href="https://instagram.com/gabrielrochamd" rel="noopener noreferrer" target="_blank"><BsInstagram /></a>
          <a href="https://www.linkedin.com/in/gabrielrochamd" rel="noopener noreferrer" target="_blank"><BsLinkedin /></a>
          <a href="https://twitter.com/gabrielrochamd" rel="noopener noreferrer" target="_blank"><BsTwitter /></a>
        </main>
        <footer>Built by Gabriel Rocha</footer>
      </footer>
    </div>
  )
}