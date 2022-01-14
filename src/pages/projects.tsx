import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
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
  const [imageLayout, setImageLayout] = useState<'fill' | 'responsive'>('fill')

  function resizeImages() {
    setImageLayout(window.innerWidth >= 576 ? 'fill' : 'responsive')
    for (const el of imageContainers) {
      const ct = el.current
      if (ct) {
        if (window.innerWidth >= 1200) {
          ct.style.height = `${ct.clientWidth * 10 / 16}px`
        } else if (window.innerWidth >= 576) {
          ct.style.height = `${ct.clientWidth * 30 / 41}px`
        } else {
          ct.style.height = 'unset'
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
                    <Image height={360} layout={imageLayout} objectFit="cover" src={project.image} width={640} />
                  </a>
                  <div className={styles.dataContainer}>
                    <a href={project.url}>
                      <h5>{project.title}</h5>
                    </a>
                    <div className={styles.info}>
                      <a href="" className={styles.year} title={date.toString()}>{date.getFullYear()}</a>
                      <a href="" className={styles.type}>{project.type}</a>
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
      type: project.type,
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