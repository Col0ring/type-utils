import { If } from '../control-flow'
import { ArrayAndReadonlyArrayByPassArray, IsReadonlyArray } from './type'

// notice: distributed condition type
export type Shift<T extends ArrayAndReadonlyArrayByPassArray> =
  T extends ArrayAndReadonlyArrayByPassArray<[any, ...infer U]>
    ? If<IsReadonlyArray<T>, readonly [...U], [...U]>
    : // like [...number[], 1] | []
      T
