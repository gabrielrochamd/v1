import axios from 'axios'
import matter from 'gray-matter'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import clientPromise from '../services/mongodb'
import styles from '../styles/home.module.scss'

type Post = {
  content: string,
  date: number,
  description: string,
  id: string,
  tags: string[],
  title: string
}

type Project = {
  dateTime: number,
  description: string | { en: string, pt: string },
  _id: string,
  image: string,
  title: string | { en: string, pt: string },
  type: string | { en: string, pt: string },
  url: string
}

type Props = {
  posts: Post[],
  projects: Project[]
}

export default function Home({ posts, projects }: Props) {
  const imageContainers = useRef<Array<HTMLAnchorElement | null>>([])
  const [imageLayout, setImageLayout] = useState<'fill' | 'responsive'>('fill')

  function resizeImages() {
    setImageLayout(window.innerWidth >= 576 ? 'fill' : 'responsive')
    for (const el of imageContainers.current) {
      if (el) {
        if (window.innerWidth >= 1200) {
          el.style.height = `${el.clientWidth * 10 / 16}px`
        } else if (window.innerWidth >= 576) {
          el.style.height = `${el.clientWidth * 30 / 41}px`
        } else {
          el.style.height = 'unset'
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', () => resizeImages())
  }, [])

  useEffect(() => {
    resizeImages()
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
            <p>Computer scientist since 2020, frontend developer with React, Next and Android developer in my free time. I automate repetitive tasks and help people and companies get their business online.</p>
          </div>
          <div className={styles.picture}>
            <Image alt="Gabriel Rocha" height={320} layout="responsive" priority={true} src="/images/profile-picture.jfif" width={320} />
          </div>
        </main>
        <div className={styles.actionContainer}>
          <a href="/documents/resume.pdf" rel="noopener noreferrer" target="_blank">Download Resume</a>
        </div>
      </section>
      <section className={styles.blog}>
        <div className="container">
          <header>
            <h5>Recent posts</h5>
            <Link href="/blog">View all</Link>
          </header>
          <main>
            {
              posts.map((post, index) => (
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
            projects.map((project, index) => {
              const date = new Date(project.dateTime)
              const description = typeof project.description === 'string' ? project.description : project.description.en
              const title = typeof project.title === 'string' ? project.title : project.title.en
              const type = typeof project.type === 'string' ? project.type : project.type.en
              return (
                <div className={styles.project} key={index}>
                  <a
                    className={styles.imageContainer}
                    href={project.url}
                    ref={el => imageContainers.current[index] = el}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image alt={title} height={360} layout={imageLayout} objectFit="cover" src={project.image} width={640} />
                  </a>
                  <div className={styles.dataContainer}>
                    <a href={project.url}>
                      <h5>{title}</h5>
                    </a>
                    <div className={styles.info}>
                      <a href="" className={styles.year}>{(new Date(project.dateTime)).getFullYear()}</a>
                      <a href="" className={styles.type}>{type}</a>
                    </div>
                    <p>{description}</p>
                  </div>
                </div>
              )
            })
          }
        </main>
      </section>
    </div>
  )
}

export const getStaticProps = async () => {
  let posts: Post[]
  let projects: Project[]
  
  const postsRequest = await axios.get('https://api.github.com/repos/gabrielrochamd/posts/contents/en')

  posts = await Promise.all(postsRequest.data.map(async (post: any) => {
    const response = await axios.get(post.download_url)
    const content = response.data
    const parsed = matter(content)
    return {
      date: parsed.data.date,
      description: parsed.data.description,
      id: post.name.substring(0, post.name.length - 3),
      tags: parsed.data.tags,
      title: parsed.data.title
    }
  }))

  posts = posts.sort((a, b) => b.date - a.date).slice(0, 2)
  
  const client = await clientPromise
  const v1DB = client?.db('v1')
  const projectsResults = (await v1DB?.collection('projects').find({}).sort({ dateTime: -1 }).limit(3).toArray()) as Project[] | undefined
  projects = projectsResults ? (
    projectsResults.map(projectResult => ({
      ...projectResult,
      _id: projectResult._id.toString()
    }))
  ) : []

  return {
    props: {
      posts,
      projects
    },
    revalidate: 60 * 60 * 24
  }
}