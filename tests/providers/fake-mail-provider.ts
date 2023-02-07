import { type MailProvider } from '@shared/providers/mail/mail-provider'

export class FakeMailProvider implements MailProvider {
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    console.log(
      `mail sended to "${to}" with subject: "${subject}" and body: "${body}"`
    )
  }
}
