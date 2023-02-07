export abstract class MailProvider {
  abstract sendMail(to: string, subject: string, body: string): Promise<void>
}
