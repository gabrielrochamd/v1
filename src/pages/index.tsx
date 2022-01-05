import Head from 'next/head'
import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <div className={styles.root}>
      <Head>
        <title>Gabriel Rocha</title>
      </Head>
      <div className={`${styles.presentation} container`}>
        <main>
          <div className={styles.text}>
            <h3>Hi, I am Gabriel, <br /> Software Developer</h3>
            <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
          </div>
          <div className={styles.picture}>
            <img src="/images/profile-picture.jfif" alt="Gabriel Rocha" />
          </div>
        </main>
        <div className={styles.actionContainer}>
          <button>Download Resume</button>
        </div>
      </div>
    </div>
  )
}