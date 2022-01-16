import Head from 'next/head'
import styles from '../styles/pages/contact.module.scss'

export default function Contact() {
  return (
    <div className={styles.root}>
      <Head>
        <title>Contact - Gabriel Rocha</title>
      </Head>
      <div className="container">
        <h3>Contact</h3>
        <form action="">
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} />
          </div>
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  )
}