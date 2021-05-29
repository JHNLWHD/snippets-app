import firestore from '../lib/firebase'
import { Filter } from '../types/Filter.type'
import { Document } from '../types/Model.type'
import * as ModelUtils from '../utils/ModelUtils'

export async function save<T extends Document>(data: T, path: string): Promise<unknown> {
  const target = ModelUtils.getObjectFromModel(data)

  if (data.document) {
    return firestore.collection(path).doc(data.document.id).set(target)
  }

  return firestore.collection(path).add(target)
}

export async function read<T extends Document>(path: string, filters?: Filter[]): Promise<T[]> {
  let collection

  if (filters) {
    let ref: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = firestore.collection(path)

    ref.where('deletedAt', '==', null)
    filters.forEach((filter) => {
      ref = ref.where(filter.fieldPath, filter.optStr, filter.value)
    })

    collection = await ref.get()
  } else {
    collection = await firestore.collection(path).where('deletedAt', '==', null).get()
  }

  return ModelUtils.convertDocumentToModel<T>(collection)
}

export async function update(key: string, data: Document, path: string): Promise<unknown> {
  const target = ModelUtils.getObjectFromModel(data)

  return firestore.collection(path).doc(key).update(target)
}

export async function get<T extends Document>(key: string, path: string): Promise<T> {
  const collection = await firestore.collection(path).doc(key).get()

  return ModelUtils.modelFromDocument<T>(collection) as T
}

export async function remove<T extends Document>(key: string, path: string): Promise<unknown> {
  const value = { deletedAt: new Date() }
  const data = await get<T>(key, path)
  const target = Object.assign(data, value)

  return update(key, target, path)
}
