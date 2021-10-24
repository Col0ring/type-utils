import { Shift } from './shift'
import { ArrayAndReadonlyArrayByPassArray, ArrayItem, IsTuple } from './type'

// notice: distributed condition type
export type Tail<T extends ArrayAndReadonlyArrayByPassArray> = T extends T
  ? true extends IsTuple<T>
    ? T extends ArrayAndReadonlyArrayByPassArray<[...any[], infer U]>
      ? U
      : // like [1, string, ...number[]]
        // we need to clear other types
        Tail<Shift<T>>
    : // like number[]
      ArrayItem<T>
  : never
