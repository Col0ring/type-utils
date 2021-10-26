import { IsEqual, If, IfExtends, IsExtends } from '../control-flow'
import { EqualTag, ExtendsTag } from '../helper'
import { ArrayAndReadonlyArrayByPassArray, ArrayItem, IsTuple } from './type'

// notice: distributed condition type
export type Filter<
  T extends ArrayAndReadonlyArrayByPassArray,
  V,
  Extends extends boolean = true,
  Type extends EqualTag | ExtendsTag = ExtendsTag
> = T extends T
  ? If<
      IsTuple<T>,
      T extends ArrayAndReadonlyArrayByPassArray<[infer Current, ...infer Rest]>
        ? [
            ...IfExtends<
              [Type, EqualTag],
              IfExtends<[IsEqual<V, Current>, Extends], [Current], []>,
              IfExtends<[IsExtends<V, Current>, Extends], [Current], []>
            >,
            ...Filter<Rest, V, Extends, Type>
          ]
        : T extends ArrayAndReadonlyArrayByPassArray<
            [...infer Rest, infer Current]
          >
        ? [
            ...Filter<Rest, V, Extends, Type>,
            ...IfExtends<
              [Type, EqualTag],
              IfExtends<[IsEqual<V, Current>, Extends], [Current], []>,
              IfExtends<[IsExtends<V, Current>, Extends], [Current], []>
            >
          ]
        : never,
      IfExtends<[IsExtends<ArrayItem<T>, V>, Extends], T, []>
    >
  : never
