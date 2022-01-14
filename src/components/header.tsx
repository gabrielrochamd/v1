import { useState } from 'react'
import { BsList } from 'react-icons/bs'
import styles from '../styles/components/header.module.scss'

export function Header() {
  const [showMenu, setShowMenu] = useState(false)

  function toggleMenu() {
    document.body.style.overflowY = showMenu ? 'unset' : 'hidden'
    window.scroll(0, 0)
    setShowMenu(!showMenu)
  }
  
  return (
    <div className={styles.root}>
      <div className="container">
        <button className={styles.menuTrigger} onClick={() => toggleMenu()}>
          <BsList />
        </button>
        <ul className={showMenu ? styles.active : ''}>
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </div>
  )
}