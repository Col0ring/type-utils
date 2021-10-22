import { ComputedUtils } from './computed'

import Min = ComputedUtils.Min
import IsSmallerThan = ComputedUtils.IsSmallerThan
import IsExtends = ComputedUtils.IsExtends
import Add = ComputedUtils.Add
// utils
export type ArrayAndReadonlyArrayByArray<
  T extends any[] | readonly any[] = any[]
> = T | Readonly<T>
export type ArrayAndReadonlyArrayByItem<T = any> = T[] | readonly T[]

const arrayHelperTagSymbol = Symbol('ArrayHelperTag')
type ArrayHelperTag = typeof arrayHelperTagSymbol

// exports
export namespace ArrayUtils {
  export type IsReadonlyArray<T extends ArrayAndReadonlyArrayByArray> =
    T extends any[] ? never : T

  export type Tuple<T = any, R = T> = ArrayAndReadonlyArrayByArray<
    [T, ...R[]] | [...R[], T]
  >

  export type ArrayTuple<
    N extends number,
    V = any,
    // array tool, don't pass in parameters
    HelperArray extends any[] = []
  > = HelperArray['length'] extends N
    ? HelperArray
    : ArrayTuple<N, V, [...HelperArray, V]>

  export type isTuple<T extends ArrayAndReadonlyArrayByArray> = T extends Tuple
    ? T
    : never

  export type ArrayItem<T extends ArrayAndReadonlyArrayByItem> =
    T extends ArrayAndReadonlyArrayByItem<infer U> ? U : never

  export type FlattedArrayItem<T extends ArrayAndReadonlyArrayByItem> =
    T extends ArrayAndReadonlyArrayByItem<infer U>
      ? U extends ArrayAndReadonlyArrayByItem
        ? FlattedArrayItem<U>
        : U
      : never

  export type Push<
    T extends ArrayAndReadonlyArrayByArray,
    V
  > = T extends IsReadonlyArray<T> ? readonly [...T, V] : [...T, V]

  export type Pop<T extends ArrayAndReadonlyArrayByArray> = T extends isTuple<T>
    ? T extends ArrayAndReadonlyArrayByArray<[...infer U, any]>
      ? T extends IsReadonlyArray<T>
        ? readonly [...U]
        : [...U]
      : // like [1,...number[]]
        T
    : // like number[]
      T

  export type Shift<T extends ArrayAndReadonlyArrayByArray> =
    T extends isTuple<T>
      ? T extends ArrayAndReadonlyArrayByArray<[any, ...infer U]>
        ? T extends IsReadonlyArray<T>
          ? readonly [...U]
          : [...U]
        : // like [...number[], 1]
          T
      : // like number[]
        T

  export type UnShift<
    T extends ArrayAndReadonlyArrayByArray,
    V
  > = T extends IsReadonlyArray<T> ? readonly [V, ...T] : [V, ...T]

  export type Includes<
    T extends ArrayAndReadonlyArrayByArray,
    V
  > = V extends T[number] ? T : never

  export type isEmptyTypeArray<T extends ArrayAndReadonlyArrayByArray> =
    T['length'] extends 0 ? T : never

  export type Head<T extends ArrayAndReadonlyArrayByArray> =
    T extends isEmptyTypeArray<T> ? never : T[0]

  export type Tail<T extends ArrayAndReadonlyArrayByArray> =
    T extends isTuple<T>
      ? T extends ArrayAndReadonlyArrayByArray<[...any[], infer U]>
        ? U
        : // like [1,...number[]]
          Tail<Shift<T>>
      : // like number[]
        ArrayItem<T>

  export type Flat<T extends ArrayAndReadonlyArrayByArray> =
    T extends isTuple<T>
      ? T extends ArrayAndReadonlyArrayByArray<[infer A, ...infer B]>
        ? A extends ArrayAndReadonlyArrayByArray
          ? [...Flat<A>, ...Flat<B>]
          : [A, ...Flat<B>]
        : T extends ArrayAndReadonlyArrayByArray<[...infer A, infer B]>
        ? B extends ArrayAndReadonlyArrayByArray
          ? [...Flat<A>, ...Flat<B>]
          : [...Flat<A>, B]
        : never
      : // array or empty array
      T extends isEmptyTypeArray<T>
      ? []
      : FlattedArrayItem<T>[]

  export type Reverse<T extends ArrayAndReadonlyArrayByArray> =
    T extends isTuple<T>
      ? T extends [infer F, ...infer R]
        ? [...Reverse<R>, F]
        : T extends [...infer R, infer L]
        ? [L, ...Reverse<R>]
        : never
      : T

  export type Filter<
    T extends ArrayAndReadonlyArrayByArray,
    V,
    Extends extends boolean = true
  > = T extends isTuple<T>
    ? T extends ArrayAndReadonlyArrayByArray<[infer R1, ...infer R2]>
      ? [
          ...(IsExtends<R1, V> extends Extends ? [R1] : []),
          ...Filter<R2, V, Extends>
        ]
      : T extends ArrayAndReadonlyArrayByArray<[...infer R1, infer R2]>
      ? [
          ...Filter<R1, V, Extends>,
          ...(IsExtends<R2, V> extends Extends ? [R2] : [])
        ]
      : // like [...number[]]
        T
    : [ArrayItem<T>] extends [V]
    ? T
    : []

  export type Slice<
    T extends ArrayAndReadonlyArrayByArray,
    S extends number = 0,
    E extends number = T['length'],
    // array tool, don't pass in parameters
    HelperArray extends any[] = []
  > = T extends isTuple<T>
    ? IsSmallerThan<S, E> extends true
      ? // the end
        HelperArray['length'] extends Min<T['length'], E>
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
              IsSmallerThan<HelperArray['length'], S> extends true
                ? ArrayHelperTag
                : T[HelperArray['length']]
            ]
          >
      : // start >= end
        []
    : // array or empty array
      T

  export type Insert<
    T extends ArrayAndReadonlyArrayByArray,
    I extends number,
    V
  > = T extends IsReadonlyArray<T>
    ? readonly [...Slice<T, 0, I>, V, ...Slice<T, I>]
    : [...Slice<T, 0, I>, V, ...Slice<T, I>]

  export type Delete<
    T extends ArrayAndReadonlyArrayByArray,
    I extends number
  > = T extends IsReadonlyArray<T>
    ? readonly [...Slice<T, 0, I>, ...Slice<T, Add<I, 1>>]
    : [...Slice<T, 0, I>, ...Slice<T, Add<I, 1>>]
}
