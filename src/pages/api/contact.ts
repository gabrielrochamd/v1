import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from 'nodemailer'

export default async function contact(req: NextApiRequest, res: NextApiResponse) {
  const sender = {
    pass: process.env.SENDER_PASS,
    user: process.env.SENDER_USER
  }

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: sender.user,
      pass: sender.pass
    }
  })

  let info = await transporter.sendMail({
    from: `"${req.body.name}" <${req.body.email}>`,
    to: process.env.RECIPIENT,
    replyTo: req.body.email,
    subject: `[Vercel][v1] ${req.body.name}`,
    text: req.body.message
  })

  console.log(`Message sent: ${info.messageId}`)
  
  res.status(200).json(`Message sent: ${info.messageId}`)
}