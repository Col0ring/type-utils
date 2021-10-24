import { ArrayAndReadonlyArrayByPassArray, IsTuple } from './type'

// notice: distributed condition type
export type Reverse<T extends ArrayAndReadonlyArrayByPassArray> = T extends T
  ? true extends IsTuple<T>
    ? T extends [infer F, ...infer R]
      ? [...Reverse<R>, F]
      : T extends [...infer R, infer L]
      ? [L, ...Reverse<R>]
      : never
    : T
  : never
