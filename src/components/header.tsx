import styles from '../styles/components/header.module.scss'

export function Header() {
  return (
    <div className={styles.root}>
      <ul>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="">Contact</a></li>
      </ul>
    </div>
  )
}