/* eslint-disable @typescript-eslint/indent */
import { Entity } from '@core/domain/entity'

import { type Synopsis } from './value-objects/synopsis'

import { type Replace } from '@core/logic/replace'

import { Slugify } from '@helpers/slugify'

export interface BookProps {
  title: string
  slug: string
  author: string
  cover: string
  publishingCompany: string
  publishingYear: number
  numberOfPages: number
  synopsis: Synopsis
  createdAt: Date
  updatedAt: Date
}

export class Book extends Entity<BookProps> {
  constructor(
    props: Replace<
      BookProps,
      {
        slug?: string
        createdAt?: Date
        updatedAt?: Date
      }
    >,
    id?: string
  ) {
    super(
      {
        ...props,
        slug: props.slug ?? Slugify(props.title),
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date()
      },
      id
    )
  }

  public get title(): string {
    return this.props.title
  }

  public get slug(): string {
    return this.props.slug
  }

  // title setter?

  public get author(): string {
    return this.props.author
  }

  public set author(author: string) {
    this.props.author = author
  }

  public get cover(): string {
    return this.props.cover
  }

  public set cover(cover: string) {
    this.props.cover = cover
  }

  public get publishingCompany(): string {
    return this.props.publishingCompany
  }

  public set publishingCompany(publishingCompany: string) {
    this.props.publishingCompany = publishingCompany
  }

  public get publishingYear(): number {
    return this.props.publishingYear
  }

  public set publishingYear(publishingYear: number) {
    this.props.publishingYear = publishingYear
  }

  public get numberOfPages(): number {
    return this.props.numberOfPages
  }

  public set numberOfPages(numberOfPages: number) {
    this.props.numberOfPages = numberOfPages
  }

  public get synopsis(): Synopsis {
    return this.props.synopsis
  }

  public set synopsis(synopsis: Synopsis) {
    this.props.synopsis = synopsis
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date {
    return this.props.updatedAt
  }
}
