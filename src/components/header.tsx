import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsList } from 'react-icons/bs'
import styles from '../styles/components/header.module.scss'
import { Navbar } from './navbar'

export function Header() {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  const DarkThemeSwitch = dynamic(async () => (await import('./dark-theme-switch')).DarkThemeSwitch, { ssr: false })

  function toggleMenu() {
    document.body.style.overflowY = showMenu ? 'unset' : 'hidden'
    window.scroll(0, 0)
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    const handler = () => {
      document.body.style.overflowY = 'unset'
      setShowMenu(false)
    }
    router.events.on('routeChangeComplete', handler)
    return () => {
      router.events.off('routeChangeComplete', handler)
    }
  }, [router.events])
  
  return (
    <div className={styles.root}>
      <div className="container">
        <button className={styles.menuTrigger} onClick={() => toggleMenu()}>
          <BsList />
        </button>
        <DarkThemeSwitch />
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
      <Navbar onClose={() => {toggleMenu()}} show={showMenu} />
    </div>
  )
}