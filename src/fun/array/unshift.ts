import { ArrayAndReadonlyArrayByPassArray, IsReadonlyArray } from './type'

// notice: distributed condition type
export type UnShift<
  T extends ArrayAndReadonlyArrayByPassArray,
  V
> = T extends IsReadonlyArray<T> ? readonly [V, ...T] : [V, ...T]
