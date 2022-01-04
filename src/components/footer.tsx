import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import styles from '../styles/components/footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.root}>
      <main>
        <a href="https://facebook.com/gabrielrochamd" rel="noopener noreferrer" target="_blank"><BsFacebook /></a>
        <a href="https://instagram.com/gabrielrochamd" rel="noopener noreferrer" target="_blank"><BsInstagram /></a>
        <a href="https://www.linkedin.com/in/gabrielrochamd" rel="noopener noreferrer" target="_blank"><BsLinkedin /></a>
        <a href="https://twitter.com/gabrielrochamd" rel="noopener noreferrer" target="_blank"><BsTwitter /></a>
      </main>
      <footer>Built by Gabriel Rocha</footer>
    </footer>
  )
}