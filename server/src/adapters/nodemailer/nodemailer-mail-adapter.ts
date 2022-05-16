import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer"
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ae71baa14eb6de",
    pass: "bc8daff7a0bc57"
  }
})

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail ({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe feedget <oi@feedget.com>',
            to: 'Henrique Vilanova <henriquevc93@gmail.com>',
            subject,
            html: body
        })
    }
}