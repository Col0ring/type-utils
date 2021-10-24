import { ArrayAndReadonlyArrayByPassArray, Tuple } from '../array'
import { IsLessThan } from '../control-flow'
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
        : Rest['length'] extends 0
        ? Current
        : // Rest['length'] !== 0
        Rest extends (infer V)[]
        ? V extends number
          ? IsConstNumber<V> extends true
            ? IsLessThan<Current, V> extends true
              ? Current
              : V
            : number
          : never
        : never
      : never
    : A extends ArrayAndReadonlyArrayByPassArray<[...infer Rest, infer Current]>
    ? Current extends number
      ? Rest extends Tuple<number>
        ? true extends IsLessThan<Current, Min<Rest>>
          ? IsLessThan<Current, Min<Rest>> extends true
            ? Current
            : number
          : Min<Rest>
        : Rest extends (infer V)[]
        ? V extends number
          ? IsConstNumber<V> extends true
            ? IsLessThan<Current, V> extends true
              ? Current
              : V
            : number
          : never
        : never
      : never
    : never
