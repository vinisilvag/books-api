import { type MailProvider } from '../mail-provider'

import nodemailer, { type Transporter } from 'nodemailer'

export class EtherealMailProvider implements MailProvider {
  private client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter
      })
      .catch(err => {
        console.error(err)
      })
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Books API <noreply@booksapi.com.br>',
      subject,
      text: body,
      html: body
    })

    console.log('mail preview', nodemailer.getTestMessageUrl(message))
  }
}
