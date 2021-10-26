import { ArrayAndReadonlyArrayByPassArray, Tuple } from '../array'
import { IsGreaterThan } from '../control-flow'
import { IsConstNumber } from './type'

// notice: distributed condition type
export type Max<A extends Tuple<number>> =
  A extends ArrayAndReadonlyArrayByPassArray<[infer Current, ...infer Rest]>
    ? Current extends number
      ? Rest extends Tuple<number>
        ? true extends IsGreaterThan<Current, Max<Rest>>
          ? IsGreaterThan<Current, Max<Rest>> extends true
            ? Current
            : number
          : Max<Rest>
        : Rest['length'] extends 0
        ? Current
        : // Rest['length'] !== 0
        Rest extends (infer V)[]
        ? V extends number
          ? IsConstNumber<V> extends true
            ? IsGreaterThan<Current, V> extends true
              ? Current
              : V
            : number
          : never
        : never
      : never
    : A extends ArrayAndReadonlyArrayByPassArray<[...infer Rest, infer Current]>
    ? Current extends number
      ? Rest extends Tuple<number>
        ? true extends IsGreaterThan<Current, Max<Rest>>
          ? IsGreaterThan<Current, Max<Rest>> extends true
            ? Current
            : number
          : Max<Rest>
        : Rest['length'] extends 0
        ? Current
        : Rest extends (infer V)[]
        ? V extends number
          ? IsConstNumber<V> extends true
            ? IsGreaterThan<Current, V> extends true
              ? Current
              : V
            : number
          : never
        : never
      : never
    : never
