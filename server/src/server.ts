import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ae71baa14eb6de",
    pass: "bc8daff7a0bc57"
  }
});

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body
    const feedback = await prisma.feedback.create({
        data: { 
            type, 
            comment, 
            screenshot
        } 
    })

    await transport.sendMail({
        from: 'Equipe feedget <oi@feedget.com>',
        to: 'Henrique Vilanova <henriquevc93@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Novo feedback de ${type}</p>`,
            `<p>Comentario: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })
    return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
    console.log('http://localhost:3333 server is running')
})