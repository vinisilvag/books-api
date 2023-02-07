import { Router } from 'express'

import { userRoutes } from './user-routes'
import { sessionRoutes } from './session-routes'
import { bookRoutes } from './book-routes'

const appRoutes = Router()

appRoutes.use('/users', userRoutes)
appRoutes.use('/sessions', sessionRoutes)
appRoutes.use('/books', bookRoutes)

export { appRoutes }
