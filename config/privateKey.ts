const isProd = process.env.NODE_ENV === 'production'

// eslint-disable-next-line import/prefer-default-export
export const privateKey = isProd
  ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
  : process.env.FIREBASE_PRIVATE_KEY
