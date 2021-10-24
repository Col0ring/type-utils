import { IsEqual, IsExtends } from '../control-flow'
import { EqualTag, ExtendsTag } from '../helper'
import { ArrayAndReadonlyArrayByPassArray, ArrayItem, IsTuple } from './type'

// notice: distributed condition type
export type Filter<
  T extends ArrayAndReadonlyArrayByPassArray,
  V,
  Extends extends boolean = true,
  Type extends EqualTag | ExtendsTag = ExtendsTag
> = T extends T
  ? true extends IsTuple<T>
    ? T extends ArrayAndReadonlyArrayByPassArray<[infer Current, ...infer Rest]>
      ? [
          ...([Type] extends [EqualTag]
            ? IsEqual<V, Current> extends Extends
              ? [Current]
              : []
            : IsExtends<V, Current> extends Extends
            ? [Current]
            : []),
          ...Filter<Rest, V, Extends, Type>
        ]
      : T extends ArrayAndReadonlyArrayByPassArray<
          [...infer Rest, infer Current]
        >
      ? [
          ...Filter<Rest, V, Extends, Type>,
          ...([Type] extends [EqualTag]
            ? IsEqual<V, Current> extends Extends
              ? [Current]
              : []
            : IsExtends<V, Current> extends Extends
            ? [Current]
            : [])
        ]
      : never
    : IsExtends<ArrayItem<T>, V> extends Extends
    ? T
    : []
  : never
