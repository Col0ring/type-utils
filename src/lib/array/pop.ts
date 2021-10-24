import { ArrayAndReadonlyArrayByPassArray, IsReadonlyArray } from './type'

// notice: distributed condition type
export type Pop<T extends ArrayAndReadonlyArrayByPassArray> =
  T extends ArrayAndReadonlyArrayByPassArray<[...infer U, any]>
    ? true extends IsReadonlyArray<T>
      ? readonly [...U]
      : [...U]
    : // like [1,...number[]] or []
      T
