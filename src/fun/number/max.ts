import {
  ArrayAndReadonlyArrayByPassArray,
  IsEmptyTypeArray,
  Tuple,
} from '../array'
import { IsGreaterThan, If } from '../control-flow'
import { IsConstNumber } from './type'

// notice: distributed condition type
export type Max<A extends Tuple<number>> =
  A extends ArrayAndReadonlyArrayByPassArray<[infer Current, ...infer Rest]>
    ? Current extends number
      ? Rest extends Tuple<number>
        ? // true or boolean
          true extends IsGreaterThan<Current, Max<Rest>>
          ? IsGreaterThan<Current, Max<Rest>> extends true
            ? // true
              Current
            : // boolean
              number
          : Max<Rest>
        : If<
            IsEmptyTypeArray<Rest>,
            Current,
            Rest extends (infer V)[]
              ? V extends number
                ? If<
                    IsConstNumber<V>,
                    If<IsGreaterThan<Current, V>, Current, V>,
                    number
                  >
                : never
              : never
          >
      : never
    : A extends ArrayAndReadonlyArrayByPassArray<[...infer Rest, infer Current]>
    ? Current extends number
      ? Rest extends Tuple<number>
        ? true extends IsGreaterThan<Current, Max<Rest>>
          ? IsGreaterThan<Current, Max<Rest>> extends true
            ? Current
            : number
          : Max<Rest>
        : If<
            IsEmptyTypeArray<Rest>,
            Current,
            Rest extends (infer V)[]
              ? V extends number
                ? If<
                    IsConstNumber<V>,
                    If<IsGreaterThan<Current, V>, Current, V>,
                    number
                  >
                : never
              : never
          >
      : never
    : never

type A = Max<[1, 2, ...number[], 5, 4]>
