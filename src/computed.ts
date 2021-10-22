import { ArrayAndReadonlyArrayByArray, ArrayUtils } from './array'
import { ControlFlowUtils } from './control-flow'
import { NumberUtils } from './number'

import Tuple = ArrayUtils.Tuple
import ArrayTuple = ArrayUtils.ArrayTuple
import IsConstNumber = NumberUtils.IsConstNumber
import All = ControlFlowUtils.All

type BothConstNumber<A extends number, B extends number> = All<
  [
    A extends IsConstNumber<A> ? true : false,
    B extends IsConstNumber<B> ? true : false
  ]
>

// all the number must >= 0
export namespace ComputedUtils {
  // notice: any
  export type IsExtends<A, B> = [A] extends [B] ? true : false

  export type IsEqual<A, B> = A extends B
    ? // any
      [B] extends [A]
      ? true
      : false
    : false

  // notice: distributed condition type
  export type IsSmallerThan<
    A extends number,
    B extends number,
    // helper
    HelperArray extends Tuple | [] = []
  > = BothConstNumber<A, B> extends true
    ? HelperArray['length'] extends B
      ? false
      : HelperArray['length'] extends A
      ? true
      : IsSmallerThan<A, B, [...HelperArray, any]>
    : false

  export type IsBiggerThan<
    A extends number,
    B extends number,
    // helper
    HelperArray extends Tuple | [] = []
  > = BothConstNumber<A, B> extends true
    ? A extends A
      ? B extends B
        ? HelperArray['length'] extends A
          ? false
          : HelperArray['length'] extends B
          ? true
          : IsBiggerThan<A, B, [...HelperArray, any]>
        : false
      : false
    : false

  export type Min<A extends number, B extends number> = BothConstNumber<
    A,
    B
  > extends true
    ? A extends A
      ? B extends B
        ? IsSmallerThan<A, B> extends true
          ? A
          : B
        : number
      : number
    : number

  export type MinByArray<A extends Tuple<number>> =
    A extends ArrayAndReadonlyArrayByArray<[infer R1, ...infer R2]>
      ? R1 extends number
        ? R2 extends Tuple<number>
          ? Min<R1, MinByArray<R2>>
          : IsEqual<R2['length'], 0> extends true
          ? R1
          : number
        : number
      : A extends ArrayAndReadonlyArrayByArray<[...infer R1, infer R2]>
      ? R2 extends number
        ? R1 extends Tuple<number>
          ? Min<R2, MinByArray<R1>>
          : IsEqual<R1['length'], 0> extends true
          ? R2
          : number
        : number
      : number

  export type Max<A extends number, B extends number> = BothConstNumber<
    A,
    B
  > extends true
    ? A extends A
      ? B extends B
        ? IsBiggerThan<A, B> extends true
          ? A
          : B
        : number
      : number
    : number

  export type MaxByArray<A extends Tuple<number>> =
    A extends ArrayAndReadonlyArrayByArray<[infer R1, ...infer R2]>
      ? R1 extends number
        ? R2 extends Tuple<number>
          ? Max<R1, MaxByArray<R2>>
          : IsEqual<R2['length'], 0> extends true
          ? R1
          : number
        : number
      : A extends ArrayAndReadonlyArrayByArray<[...infer R1, infer R2]>
      ? R2 extends number
        ? R1 extends Tuple<number>
          ? Max<R2, MaxByArray<R1>>
          : IsEqual<R1['length'], 0> extends true
          ? R2
          : number
        : number
      : number

  export type Add<A extends number, B extends number> = A extends A
    ? B extends B
      ? [...ArrayTuple<A>, ...ArrayTuple<B>]['length']
      : number
    : number

  // export type Subtract<A extends number, B extends number> = A extends A
  //   ? B extends B
  //     ? [...ArrayTuple<A>, ...ArrayTuple<B>]['length']
  //     : number
  //   : number
}
