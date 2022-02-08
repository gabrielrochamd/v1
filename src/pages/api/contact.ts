import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from 'nodemailer'

export default async function contact(req: NextApiRequest, res: NextApiResponse) {
  let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })

  let info = await transporter.sendMail({
    from: `"${req.body.name}" <${req.body.email}>`,
    to: 'gabrielmrocha@outlook.com.br',
    subject: `[gabrielrochav1] ${req.body.name} - Vercel`,
    text: req.body.message
  })

  console.log(`Message sent: ${info.messageId}`)
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
  
  res.status(200).json(`Message sent: ${info.messageId}`)
}