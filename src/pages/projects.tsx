import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import clientPromise from '../services/mongodb'
import styles from '../styles/pages/projects.module.scss'

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
  projects: Project[]
}

export default function Projects({ projects }: Props) {
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
      <div className="container">
        <Head>
          <title>Projects - Gabriel Rocha</title>
        </Head>
        <h3>Projects</h3>
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
                  {
                    imageLayout === 'fill' ? (
                      <Image alt={title} layout={imageLayout} objectFit="cover" src={project.image} />
                    ) : (
                      <Image alt={title} height={360} layout={imageLayout} objectFit="cover" src={project.image} width={640} />
                    )
                  }
                </a>
                <div className={styles.dataContainer}>
                  <a href={project.url}>
                    <h5>{title}</h5>
                  </a>
                  <div className={styles.info}>
                    <a href="" className={styles.year} title={date.toString()}>{date.getFullYear()}</a>
                    <a href="" className={styles.type}>{type}</a>
                  </div>
                  <p>{description}</p>
                </div>
                <div className={styles.divider} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    const client = await clientPromise
    const v1DB = client?.db('v1')
    const projectsResults = await v1DB?.collection('projects').find({}).sort({ dateTime: -1 }).toArray()
    const projects = projectsResults?.map(projectResult => ({
      ...projectResult,
      _id: projectResult._id.toString()
    }))
    return {
      props: { projects },
      revalidate: 60 * 60 * 24
    }
  } catch (e) {
    console.error(e)
    return {
      props: { projects: [] },
    }
  }
}