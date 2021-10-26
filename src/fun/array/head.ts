import { If } from '../control-flow'
import { ArrayAndReadonlyArrayByPassArray, IsEmptyTypeArray } from './type'

// notice: distributed condition type
export type Head<T extends ArrayAndReadonlyArrayByPassArray> = T extends T
  ? If<IsEmptyTypeArray<T>, never, T[0]>
  : never
