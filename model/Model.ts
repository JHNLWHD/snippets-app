import { firestore } from 'firebase-admin'

import { Document } from '../types/Model.type'

export type Model = Document & {
  id?: string
  createdAt: firestore.Timestamp
  deletedAt: firestore.Timestamp | null
  document?: Document
  updatedAt: firestore.Timestamp
}
