import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { BsList } from 'react-icons/bs'
import { DarkThemeContext } from '../contexts/DarkThemeContext'
import styles from '../styles/components/header.module.scss'
import { Navbar } from './navbar'

export function Header() {
  const { setActive } = useContext(DarkThemeContext)
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)

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
        <input onChange={e => setActive(e.target.checked)} type="checkbox" name="theme" id="theme" />
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