import { IsEqual } from '../control-flow'
import { EqualTag, ExtendsTag } from '../helper'
import { ArrayAndReadonlyArrayByPassArray, ArrayItem, IsTuple } from './type'

// notice: distributed condition type
export type Includes<
  T extends ArrayAndReadonlyArrayByPassArray,
  V,
  Type extends EqualTag | ExtendsTag = ExtendsTag
> = T extends T
  ? true extends IsTuple<T>
    ? T extends [infer Current, ...infer Rest]
      ? [Type] extends [EqualTag]
        ? true extends IsEqual<V, Current>
          ? true
          : Includes<Rest, V, Type>
        : [V] extends [Current]
        ? true
        : Includes<Rest, V, Type>
      : T extends [...infer Rest, infer Current]
      ? [Type] extends [EqualTag]
        ? true extends IsEqual<V, Current>
          ? true
          : Includes<Rest, V, Type>
        : [V] extends [Current]
        ? true
        : Includes<Rest, V, Type>
      : never
    : IsEqual<ArrayItem<T>, V>
  : never
