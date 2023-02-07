/* eslint-disable @typescript-eslint/indent */
import { Entity } from '@core/domain/entity'

import { type Email } from './value-objects/email'

import { type Replace } from '@core/logic/replace'

export interface UserProps {
  name: string
  email: Email
  password: string
  avatar: string | null
  admin: boolean
  createdAt: Date
  updatedAt: Date
}

export class User extends Entity<UserProps> {
  constructor(
    props: Replace<
      UserProps,
      { createdAt?: Date; updatedAt?: Date; admin?: boolean }
    >,
    id?: string
  ) {
    super(
      {
        ...props,
        admin: props.admin ?? false,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date()
      },
      id
    )
  }

  public update(): void {
    this.props.updatedAt = new Date()
  }

  public get name(): string {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get email(): Email {
    return this.props.email
  }

  public set email(email: Email) {
    this.props.email = email
  }

  public get password(): string {
    return this.props.password
  }

  public set password(password: string) {
    this.props.password = password
  }

  public get avatar(): string | null {
    return this.props.avatar
  }

  public set avatar(avatar: string | null) {
    this.props.avatar = avatar
  }

  public get admin(): boolean {
    return this.props.admin
  }

  public set admin(admin: boolean) {
    this.props.admin = admin
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date {
    return this.props.updatedAt
  }
}
