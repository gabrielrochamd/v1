import { GetStaticPaths } from "next"
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import styles from '../../styles/pages/blogPost.module.scss'
import Head from 'next/head'
import axios from 'axios'

type BlogPost = {
  content: string,
  date: number,
  description: string,
  id: string,
  tags: string[],
  title: string
}

type Props = {
  blogPost: BlogPost
}

type Context = {
  params: {
    slug: string
  }
}

export default function BlogPost({ blogPost }: Props) {
  const date = new Date(blogPost.date);
  
  return (
    <div className={`${styles.root} container`}>
      <Head>
        <title>{blogPost.title}</title>
      </Head>
      <h1 className={styles.title}>{blogPost.title}</h1>
      <div className={styles.info}>
        <span className={styles.date} title={date.toString()}>{date.toLocaleDateString()}</span>
        <div className={styles.divider} />
        <div className={styles.tags}>
          { blogPost.tags.map((tag, index) => <a href="" key={index}>{tag}</a>) }
        </div>
      </div>
      <ReactMarkdown>{blogPost.content}</ReactMarkdown>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get('https://api.github.com/repos/gabrielrochamd/posts/contents/en')

  const paths = data.map((post: { name: string }) => {
    return {
      params: {
        slug: post.name.substring(0, post.name.length - 3)
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async (context: Context) => {
  const { slug } = context.params
  const { data } = await axios.get(`https://api.github.com/repos/gabrielrochamd/posts/contents/en/${slug}.md`)
  const parsed = matter(Buffer.from(data.content, 'base64').toString('utf8'))

  const blogPost = {
    content: parsed.content,
    date: parsed.data.date,
    description: parsed.data.description,
    id: slug,
    tags: parsed.data.tags,
    title: parsed.data.title
  }

  return {
    props: {
      blogPost
    },
    revalidate: 60 * 60 * 24
  }
}