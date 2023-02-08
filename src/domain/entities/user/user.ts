/* eslint-disable @typescript-eslint/indent */
import { Entity } from '@core/domain/entity'

import { type Email } from './value-objects/email'

import { type Replace } from '@core/logic/replace'

import { UserRoles } from '@core/enums/user-roles'

export interface UserProps {
  name: string
  email: Email
  password: string
  avatar: string | null
  role: UserRoles
  createdAt: Date
  updatedAt: Date
}

export class User extends Entity<UserProps> {
  constructor(
    props: Replace<
      UserProps,
      { createdAt?: Date; updatedAt?: Date; role?: UserRoles }
    >,
    id?: string
  ) {
    super(
      {
        ...props,
        role: props.role ?? UserRoles.USER,
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

  public get role(): UserRoles {
    return this.props.role
  }

  public set role(role: UserRoles) {
    this.props.role = role
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date {
    return this.props.updatedAt
  }
}
