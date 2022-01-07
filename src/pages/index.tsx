import Head from 'next/head'
import Image from 'next/image'
import projects from '../../data/projects.json'
import { api } from '../services/api'
import styles from '../styles/home.module.scss'

type BlogPost = {
  content: string,
  date: number,
  description: string,
  id: string,
  tags: string[],
  title: string
}

type Props = {
  blogPosts: BlogPost[]
}

export default function Home({ blogPosts }: Props) {
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
        <div className="container">
          <header>
            <h6>Recent posts</h6>
            <a href="">View all</a>
          </header>
          <main>
            {
              blogPosts.map((post, index) => (
                <a className={styles.post} href={`blog/${post.id}`} key={index}>
                  <h5>{post.title}</h5>
                  <div className={styles.info}>
                    <span>{(new Date(post.date)).toLocaleDateString()}</span>
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
      <section className={`${styles.projects} container`}>
        <header>
          <h6>Featured projects</h6>
        </header>
        <main>
          {
            projects.map((project, index) => (
              <div className={styles.project} key={index}>
                <a className={styles.imageContainer} href="">
                  <Image height={180} layout="responsive" src={project.image} width={246} />
                </a>
                <div className={styles.dataContainer}>
                  <a href="">
                    <h5>{project.title}</h5>
                  </a>
                  <div className={styles.info}>
                    <a href="" className={styles.year}>{project.year}</a>
                    <a href="">{project.type}</a>
                  </div>
                  <p>{project.description}</p>
                </div>
              </div>
            ))
          }
        </main>
      </section>
    </div>
  )
}

export const getStaticProps = async () => {
  const { data } = await api.get('blogPosts', {
    params: {
      _limit: 2,
      _sort: 'date',
      _order: 'desc'
    }
  })

  const blogPosts = data.map((blogPost: BlogPost) => {
    return {
      date: blogPost.date,
      description: blogPost.description,
      id: blogPost.id,
      tags: blogPost.tags,
      title: blogPost.title
    }
  })

  return {
    props: {
      blogPosts
    },
    revalidate: 60 * 60 * 24
  }
}