import crypto from 'node:crypto'

export abstract class Entity<T> {
  protected readonly _id: string
  public readonly props: T

  constructor(props: T, id?: string) {
    this._id = id ?? crypto.randomUUID()
    this.props = props
  }

  public get id(): string {
    return this._id
  }
}
