import { IsLessThan } from '../control-flow'
import { ArrayHelperTag } from '../helper'
import { IsConstNumber } from '../number'
import { Min } from '../number/min'
import { Filter } from './filter'
import { Splice } from './splice'
import {
  ArrayAndReadonlyArrayByPassArray,
  IsReadonlyArray,
  IsTuple,
} from './type'

// TODO
export type Slice<
  T extends ArrayAndReadonlyArrayByPassArray,
  S extends number = 0,
  E extends number = T['length'],
  // array tool, don't pass in parameters
  HelperArray extends any[] = []
> = S extends S
  ? E extends E
    ? E extends IsConstNumber<E>
      ? T extends IsTuple<T>
        ? IsLessThan<S, E> extends true
          ? // the end
            HelperArray['length'] extends (
              T['length'] extends IsConstNumber<T['length']>
                ? Min<[T['length'], E]>
                : E
            )
            ? T extends IsReadonlyArray<T>
              ? Readonly<Filter<HelperArray, ArrayHelperTag, false>>
              : Filter<HelperArray, ArrayHelperTag, false>
            : Slice<
                T,
                S,
                E,
                [
                  ...HelperArray,
                  // add tag to increase array length
                  IsLessThan<HelperArray['length'], S> extends true
                    ? ArrayHelperTag
                    : T[HelperArray['length']]
                ]
              >
          : // start >= end
            []
        : // array or empty array
          T
      : S extends IsConstNumber<S>
      ? // Splice
        Splice<T, 0, S>
      : T
    : T
  : T
