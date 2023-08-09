import axios from "axios"
import matter from "gray-matter"
import Head from "next/head"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

import styles from '../../styles/pages/privacyPolicy.module.scss'

type Context = {
  params: {
    appId: string
  }
}

type Policy = {
  content: string,
  id: string
}

type Props = {
  policy: Policy
}

export default function PrivacyPolicy({ policy }: Props) {
  return (
    <div className={`${styles.root} container`}>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <ReactMarkdown>{policy.content}</ReactMarkdown>
    </div>
  )
}

export async function getStaticPaths() {
  const { data } = await axios.get('https://api.github.com/repos/gabrielrochamd/privacy-policies/contents/en')

  const paths = data.map((app: { name: string }) => ({
    params: {
      appId: app.name.substring(0, app.name.length - 3)
    }
  }))

  console.log(paths)

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context: Context) {
  const { appId } = context.params
  const { data } = await axios.get(`https://api.github.com/repos/gabrielrochamd/privacy-policies/contents/en/${appId}.md`)
  const parsed = matter(Buffer.from(data.content, 'base64').toString('utf8'))

  const policy = {
    content: parsed.content,
    id: appId
  }

  return {
    props: {
      policy
    },
    revalidate: 60 * 60 * 24
  }
}