import multer from 'fastify-multer'

import { resolve } from 'node:path'
import { randomBytes } from 'node:crypto'

import { Slugify } from '@helpers/slugify'

export const uploadConfig = {
  upload(folder: string = 'uploads') {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const hash = randomBytes(16).toString('hex')
          const fileName = `${hash}-${Slugify(file.originalname)}`

          callback(null, fileName)
        }
      })
    }
  }
}
