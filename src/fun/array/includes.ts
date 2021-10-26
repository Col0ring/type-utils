import { IsEqual, IfExtends, IsExtends, If } from '../control-flow'
import { EqualTag, ExtendsTag } from '../helper'
import { ArrayAndReadonlyArrayByPassArray, ArrayItem, IsTuple } from './type'

// notice: distributed condition type
export type Includes<
  T extends ArrayAndReadonlyArrayByPassArray,
  V,
  Type extends EqualTag | ExtendsTag = ExtendsTag
> = T extends T
  ? If<
      IsTuple<T>,
      T extends [infer Current, ...infer Rest]
        ? IfExtends<
            [Type, EqualTag],
            true extends IsEqual<V, Current> ? true : Includes<Rest, V, Type>,
            true extends IsExtends<V, Current> ? true : Includes<Rest, V, Type>
          >
        : T extends [...infer Rest, infer Current]
        ? IfExtends<
            [Type, EqualTag],
            true extends IsEqual<V, Current> ? true : Includes<Rest, V, Type>,
            true extends IsExtends<V, Current> ? true : Includes<Rest, V, Type>
          >
        : never,
      IsEqual<ArrayItem<T>, V>
    >
  : never
