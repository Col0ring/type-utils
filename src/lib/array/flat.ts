import {
  ArrayAndReadonlyArrayByPassArray,
  FlattedArrayItem,
  IsEmptyTypeArray,
  IsTuple,
} from './type'

// notice: distributed condition type
export type Flat<T extends ArrayAndReadonlyArrayByPassArray> = T extends T
  ? true extends IsTuple<T>
    ? T extends ArrayAndReadonlyArrayByPassArray<[infer A, ...infer B]>
      ? A extends ArrayAndReadonlyArrayByPassArray
        ? [...Flat<A>, ...Flat<B>]
        : [A, ...Flat<B>]
      : T extends ArrayAndReadonlyArrayByPassArray<[...infer A, infer B]>
      ? B extends ArrayAndReadonlyArrayByPassArray
        ? [...Flat<A>, ...Flat<B>]
        : [...Flat<A>, B]
      : never
    : // array or empty array
    true extends IsEmptyTypeArray<T>
    ? []
    : FlattedArrayItem<T>[]
  : never
