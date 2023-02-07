import { container } from 'tsyringe'

// repositories
import { type UsersRepository } from '@application/repositories/users-repository'
import { PrismaUsersRepository } from '@infra/database/prisma/repositories/prisma-users-repository'

import { type BooksRepository } from '@application/repositories/books-repository'
import { PrismaBooksRepository } from '@infra/database/prisma/repositories/prisma-books-repository'

// providers
import { type MailProvider } from '../providers/mail/mail-provider'
import { EtherealMailProvider } from '../providers/mail/ethereal/ethereal-mail-provider'

// repositories
container.registerSingleton<UsersRepository>(
  'UsersRepository',
  PrismaUsersRepository
)

container.registerSingleton<BooksRepository>(
  'BooksRepository',
  PrismaBooksRepository
)

// providers
container.registerInstance<MailProvider>(
  'MailProvider',
  new EtherealMailProvider()
)
