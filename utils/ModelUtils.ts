import firebase from 'firebase-admin'

import { Document, FirebaseDocument } from '../types/Model.type'

export function modelFromDocument<T extends Document>(doc: firebase.firestore.DocumentData): T {
  const id = doc.id.toString()

  return {
    ...doc.data(),
    id,
  }
}

export function getObjectFromModel<T extends Document>(
  t: T
): Pick<T, Exclude<keyof T, 'document'>> {
  const properties = Object.getOwnPropertyNames(t)
  const target = { ...t }
  // eslint-disable-next-line no-restricted-syntax
  for (const key of properties) {
    if (t[key as keyof T] && t[key as keyof T] instanceof Array) {
      const arr = target[key as keyof T] as unknown as Array<unknown>
      const newArray = new Array<unknown>()
      arr.forEach((element: unknown) => {
        newArray.push({ ...(element as object) })
      })
      ;(target as unknown)[key] = newArray
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { document, ...newTarget } = target

  return newTarget
}

export function modelFromObject<T extends Document>(doc: unknown, t: { new (): T }): T {
  // eslint-disable-next-line new-cap
  const model: T = new t()
  const properties = Object.getOwnPropertyNames(doc)
  // eslint-disable-next-line no-restricted-syntax
  for (const key of properties) {
    model[key as keyof T] = doc[key]
  }
  model.document = doc

  return model
}

export function convertDocumentToModel<T extends Document>(
  array: firebase.firestore.QuerySnapshot<FirebaseDocument>
): T[] {
  const result = new Array<Document>()
  array.forEach((doc) => {
    result.push(modelFromDocument<T>(doc))
  })

  return result as T[]
}
