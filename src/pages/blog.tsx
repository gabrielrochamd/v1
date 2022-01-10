import Head from 'next/head'
import { api } from '../services/api'
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
        <title>Blog | Gabriel Rocha</title>
      </Head>
      <div className="container">
        <h3>Blog</h3>
        {
          posts.map((post, index) => {
            const date = new Date(post.date)
            return (
              <>
                { index !== 0 && <div className={styles.divider}></div> }
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
  const { data } = await api.get('blogPosts', {
    params: {
      _sort: 'date',
      _order: 'desc'
    }
  })

  const posts = data.map((post: Post) => ({
    date: post.date,
    description: post.description,
    id: post.id,
    tags: post.tags,
    title: post.title
  }))

  return {
    props: {
      posts
    },
    revalidate: 60 * 60 * 24
  }
}