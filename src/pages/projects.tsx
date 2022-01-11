import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { api } from '../services/api'
import styles from '../styles/pages/projects.module.scss'

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
  projects: Project[]
}

export default function Projects({ projects }: Props) {
  const imageContainers = Array.from({ length: projects.length }, () => useRef<HTMLAnchorElement>(null))

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
      <div className="container">
        <Head>
          <title>Projects | Gabriel Rocha</title>
        </Head>
        <h3>Projects</h3>
        {
          projects.map((project, index) => {
            const date = new Date(project.dateTime)
            return (
              <>
                { index !== 0 && <div className={styles.divider}></div> }
                <div className={styles.project} key={index}>
                  <a
                    className={styles.imageContainer}
                    href={project.url}
                    ref={imageContainers[index]}
                    rel="noopener noreferrer"
                    target="_blank">
                    <Image layout="fill" objectFit="cover" src={project.image} />
                  </a>
                  <div className={styles.dataContainer}>
                    <a href={project.url}>
                      <h5>{project.title}</h5>
                    </a>
                    <div className={styles.info}>
                      <a href="" className={styles.year} title={date.toString()}>{date.getFullYear()}</a>
                      <a href="">{project.type}</a>
                    </div>
                    <p>{project.description}</p>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const { data } = await api.get('projects', {
    params: {
      _sort: 'dateTime',
      _order: 'desc'
    }
  })

  const projects = data.map((project: Project) => {
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
      projects
    },
    revalidate: 60 * 60 * 24
  }
}