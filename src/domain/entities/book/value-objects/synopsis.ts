export class Synopsis {
  private readonly synopsis: string

  public get value(): string {
    return this.synopsis
  }

  private validateSynopsisLength(synopsis: string): boolean {
    return synopsis.length <= 500
  }

  constructor(synopsis: string) {
    const isSynopsisLengthValid = this.validateSynopsisLength(synopsis)

    if (!isSynopsisLengthValid) {
      throw new Error('Synopsis length error.')
    }

    this.synopsis = synopsis
  }
}
