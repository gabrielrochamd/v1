import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsList } from 'react-icons/bs'
import styles from '../styles/components/header.module.scss'
import { Navbar } from './navbar'

export function Header() {
  const router = useRouter()
  const [darkTheme, setDarkTheme] = useState(false)
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

  useEffect(() => {
    // TODO: Use state to manage dark theme
    if (darkTheme) {
      document.querySelector(':root')!.classList.add('darkTheme')
    } else {
      document.querySelector(':root')!.classList.remove('darkTheme')
    }
  }, [darkTheme])
  
  return (
    <div className={styles.root}>
      <div className="container">
        <button className={styles.menuTrigger} onClick={() => toggleMenu()}>
          <BsList />
        </button>
        <input onChange={e => setDarkTheme(e.target.checked)} type="checkbox" name="theme" id="theme" />
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