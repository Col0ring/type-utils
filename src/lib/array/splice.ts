import {
  ArrayAndReadonlyArrayByPassArray,
  IsReadonlyArray,
  IsTuple,
} from './type'
import { Add, And, IsGreaterThan, IsLessThan } from '../control-flow'
import { ArrayHelperTag } from '../helper'
import { IsConstNumber } from '../number'
import { Filter } from './filter'

// TODO: Insert New Value
// notice: distributed condition type
export type Splice<
  T extends ArrayAndReadonlyArrayByPassArray,
  S extends number,
  N extends number = 0,
  // array tool, don't pass in parameters
  HelperArray extends any[] = [],
  // count of N
  C extends number = 0
> = T extends T
  ? S extends S
    ? N extends N
      ? true extends And<[IsTuple<T>, IsConstNumber<S>, IsConstNumber<N>]>
        ? T extends ArrayAndReadonlyArrayByPassArray<[infer U, ...infer R]>
          ? true extends And<
              [IsTuple<R>, IsGreaterThan<C, N> extends true ? false : true]
            >
            ? Splice<
                R,
                S,
                N,
                [
                  ...HelperArray,
                  IsLessThan<HelperArray['length'], S> extends true
                    ? U
                    : IsLessThan<C, N> extends true
                    ? ArrayHelperTag
                    : U
                ],
                IsLessThan<HelperArray['length'], S> extends true
                  ? C
                  : Add<C, 1>
              >
            : // R like number[] or C > N
            true extends IsReadonlyArray<T>
            ? // is Readonly
              Readonly<
                Filter<
                  [
                    ...HelperArray,
                    IsLessThan<C, N> extends true ? ArrayHelperTag : U,
                    ...R
                  ],
                  ArrayHelperTag,
                  false
                >
              >
            : Filter<
                [
                  ...HelperArray,
                  IsLessThan<C, N> extends true ? ArrayHelperTag : U,
                  ...R
                ],
                ArrayHelperTag,
                false
              >
          : // [...number[], 1, 2]
            T
        : T
      : never
    : never
  : never
