declare namespace Express {
  export interface Request {
    user: {
      uid: string
      admin: boolean
    }
  }
}
