import { WhereFilterOp } from '@google-cloud/firestore'

export type Filter = {
  fieldPath: string
  optStr: WhereFilterOp
  value: unknown
}
