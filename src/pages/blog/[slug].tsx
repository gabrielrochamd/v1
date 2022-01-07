import { GetStaticPaths } from "next"
import matter from 'gray-matter'
import ReactMarkdown from "react-markdown"
import { api } from "../../services/api"
import styles from '../../styles/pages/blogPost.module.scss'
import Head from "next/head"

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
  return (
    <div className={`${styles.root} container`}>
      <Head>
        <title>{blogPost.title}</title>
      </Head>
      <h1>{blogPost.title}</h1>
      <ReactMarkdown>{blogPost.content}</ReactMarkdown>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('blogPosts', {
    params: {
      _limit: 2,
      _sort: 'date',
      _order: 'desc'
    }
  })

  const paths = data.map((blogPost: BlogPost) => {
    return {
      params: {
        slug: blogPost.id
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
  const { data } = await api.get(`/blogPosts/${slug}`)
  
  const content = await import(`../../../public/blog/posts/${slug}.md`)

  const blogPost = {
    content: matter(content.default).content,
    date: data.date,
    description: data.description,
    id: data.id,
    tags: data.tags,
    title: data.title
  }

  return {
    props: {
      blogPost
    },
    revalidate: 60 * 60 * 24
  }
}