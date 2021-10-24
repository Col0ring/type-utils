import { ArrayAndReadonlyArrayByPassArray, IsReadonlyArray } from './type'

// notice: distributed condition type
export type Push<
  T extends ArrayAndReadonlyArrayByPassArray,
  V
> = T extends IsReadonlyArray<T> ? readonly [...T, V] : [...T, V]
