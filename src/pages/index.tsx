import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
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

type Project = {
  dateTime: number,
  description: string,
  id: number,
  image: string,
  title: string,
  type: string,
  url: string
}

type Props = {
  blogPosts: BlogPost[],
  projects: Project[]
}

export default function Home({ blogPosts, projects }: Props) {
  const imageContainers = Array.from({ length: projects.length }, (v, k) => useRef<HTMLAnchorElement>(null))

  function resizeImageContainers() {
    for (const el of imageContainers) {
      const ct = el.current
      if (ct) {
        ct.style.height = `${ct.clientWidth * 10 / 16}px` // Change aspect ratio for smaller screen sizes
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', () => resizeImageContainers())
  }, [])

  useEffect(() => {
    resizeImageContainers()
  }, [imageContainers])
  
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
            <h5>Recent posts</h5>
            <a href="/blog">View all</a>
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
          <h5>Featured projects</h5>
        </header>
        <main>
          {
            projects.map((project, index) => (
              <div className={styles.project} key={index}>
                <a
                  className={styles.imageContainer}
                  href={project.url}
                  ref={imageContainers[index]}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image layout="fill" objectFit="cover" src={project.image} />
                </a>
                <div className={styles.dataContainer}>
                  <a href={project.url}>
                    <h5>{project.title}</h5>
                  </a>
                  <div className={styles.info}>
                    <a href="" className={styles.year}>{(new Date(project.dateTime)).getFullYear()}</a>
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
  const blogPostsRequest = await api.get('blogPosts', {
    params: {
      _limit: 2,
      _sort: 'date',
      _order: 'desc'
    }
  })

  const blogPosts = blogPostsRequest.data.map((blogPost: BlogPost) => {
    return {
      date: blogPost.date,
      description: blogPost.description,
      id: blogPost.id,
      tags: blogPost.tags,
      title: blogPost.title
    }
  })
  
  const projectsRequest = await api.get('projects', {
    params: {
      _limit: 3,
      _sort: 'dateTime',
      _order: 'desc'
    }
  })

  const projects = projectsRequest.data.map((project: Project) => {
    return {
      dateTime: project.dateTime,
      description: project.description,
      id: project.id,
      image: project.image,
      title: project.title,
      tags: project.type,
      url: project.url
    }
  })

  return {
    props: {
      blogPosts,
      projects
    },
    revalidate: 60 * 60 * 24
  }
}