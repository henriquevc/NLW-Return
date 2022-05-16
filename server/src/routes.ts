import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'

export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ae71baa14eb6de",
    pass: "bc8daff7a0bc57"
  }
})

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository
    )

    submitFeedbackUseCase.execute({ type, comment, screenshot })

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
    return res.status(201).send()
})