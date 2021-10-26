import { IfExtends } from '../control-flow'
import { ArrayAndReadonlyArrayByPassArray, IsReadonlyArray } from './type'

// notice: distributed condition type
export type Pop<T extends ArrayAndReadonlyArrayByPassArray> =
  T extends ArrayAndReadonlyArrayByPassArray<[...infer U, any]>
    ? IfExtends<[IsReadonlyArray<T>, true], readonly [...U], [...U]>
    : // like [1,...number[]] or []
      T
