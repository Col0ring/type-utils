import { IsEqual } from '../control-flow'
import { EqualTag, ExtendsTag } from '../helper'
import { ArrayAndReadonlyArrayByPassArray, ArrayItem, IsTuple } from './type'

// notice: distributed condition type
export type Includes<
  T extends ArrayAndReadonlyArrayByPassArray,
  V,
  Type extends EqualTag | ExtendsTag = ExtendsTag
> = T extends T
  ? [Type] extends [EqualTag]
    ? true extends IsTuple<T>
      ? T extends [infer Current, ...infer Rest]
        ? true extends IsEqual<V, Current>
          ? true
          : Includes<Rest, V, Type>
        : T extends [...infer Rest, infer Current]
        ? true extends IsEqual<V, Current>
          ? true
          : Includes<Rest, V, Type>
        : never
      : IsEqual<ArrayItem<T>, V>
    : V extends T[number]
    ? true
    : false
  : never
