import axios from 'axios'
import matter from 'gray-matter'
import Head from 'next/head'
import styles from '../styles/pages/blog.module.scss'

type Post = {
  content: string,
  date: number,
  description: string,
  id: string,
  tags: string[],
  title: string
}

type Props = {
  posts: Post[]
}

export default function Blog({ posts }: Props) {
  return (
    <div className={styles.root}>
      <Head>
        <title>Blog - Gabriel Rocha</title>
      </Head>
      <div className="container">
        <h3>Blog</h3>
        {
          posts.map((post, index) => {
            const date = new Date(post.date)
            return (
              <div className={styles.post} key={index}>
                <a href={`blog/${post.id}`}>
                  <h5>{post.title}</h5>
                </a>
                <div className={styles.info}>
                  <span className={styles.dateTime} title={date.toString()}>{date.toLocaleDateString()}</span>
                  <div className={styles.divider}></div>
                  <span>{post.tags.join(', ')}</span>
                </div>
                <p>{post.description}</p>
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
  const { data } = await axios.get('https://api.github.com/repos/gabrielrochamd/posts/contents/en')

  const posts = await Promise.all(data.map(async (post: any) => {
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

  posts.sort((a, b) => b.date - a.date)

  return {
    props: {
      posts
    },
    revalidate: 60 * 60 * 24
  }
}