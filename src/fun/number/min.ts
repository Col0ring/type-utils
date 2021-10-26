import {
  ArrayAndReadonlyArrayByPassArray,
  IsEmptyTypeArray,
  Tuple,
} from '../array'
import { If, IsLessThan } from '../control-flow'
import { IsConstNumber } from './type'

// notice: distributed condition type
export type Min<A extends Tuple<number>> =
  A extends ArrayAndReadonlyArrayByPassArray<[infer Current, ...infer Rest]>
    ? Current extends number
      ? Rest extends Tuple<number>
        ? true extends IsLessThan<Current, Min<Rest>>
          ? IsLessThan<Current, Min<Rest>> extends true
            ? Current
            : number
          : Min<Rest>
        : If<
            IsEmptyTypeArray<Rest>,
            Current,
            Rest extends (infer V)[]
              ? V extends number
                ? If<
                    IsConstNumber<V>,
                    If<IsLessThan<Current, V>, Current, V>,
                    number
                  >
                : never
              : never
          >
      : never
    : A extends ArrayAndReadonlyArrayByPassArray<[...infer Rest, infer Current]>
    ? Current extends number
      ? Rest extends Tuple<number>
        ? true extends IsLessThan<Current, Min<Rest>>
          ? IsLessThan<Current, Min<Rest>> extends true
            ? Current
            : number
          : Min<Rest>
        : If<
            IsEmptyTypeArray<Rest>,
            Current,
            Rest extends (infer V)[]
              ? V extends number
                ? If<
                    IsConstNumber<V>,
                    If<IsLessThan<Current, V>, Current, V>,
                    number
                  >
                : never
              : never
          >
      : never
    : never
