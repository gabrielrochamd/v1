import axios from 'axios'
import Head from 'next/head'
import { FormEvent } from 'react'
import styles from '../styles/pages/contact.module.scss'

export default function Contact() {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const formData = (event.currentTarget as HTMLFormElement).elements
    const body = {
      email: (formData.namedItem('email') as HTMLInputElement).value,
      name: (formData.namedItem('name') as HTMLInputElement).value,
      message: (formData.namedItem('message') as HTMLInputElement).value
    }
    try {
      const { data } = await axios.post('api/contact', body)
      console.log(data)
      alert('Message sent!')
    } catch (error) {
      console.error(error)
      alert('Error sending message!')
    }
  }
  
  return (
    <div className={styles.root}>
      <Head>
        <title>Contact - Gabriel Rocha</title>
      </Head>
      <div className="container">
        <h3>Contact</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} />
          </div>
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  )
}