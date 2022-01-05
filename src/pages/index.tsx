import Head from 'next/head'
import posts from '../../data/posts.json'
import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <div className={styles.root}>
      <Head>
        <title>Gabriel Rocha</title>
      </Head>
      <section className={`${styles.presentation} container`}>
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
      </section>
      <section className={styles.blog}>
        <div className={`${styles.highlightPosts} container`}>
          <header>
            <h6>Recent posts</h6>
            <a href="">View all</a>
          </header>
          <main>
            {
              posts.map((post, index) => (
                <a className={styles.post} href="" key={index}>
                  <h5>{post.title}</h5>
                  <div className={styles.info}>
                    <span>{post.date}</span>
                    <div className={styles.divider}></div>
                    <span>{post.tags.join(', ')}</span>
                  </div>
                  <p>{post.description}</p>
                </a>
              ))
            }
          </main>
        </div>
      </section>
    </div>
  )
}