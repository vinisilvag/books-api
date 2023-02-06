export class Email {
  private readonly email: string

  public get value(): string {
    return this.email
  }

  private validateEmailFormat(email: string): boolean {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return emailRegex.test(email)
  }

  constructor(email: string) {
    const isEmailFormatValid = this.validateEmailFormat(email)

    if (!isEmailFormatValid) {
      throw new Error('Email format error.')
    }

    this.email = email
  }
}
