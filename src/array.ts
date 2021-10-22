// utils
type ArrayAndReadonlyArrayByArray<T extends any[] | readonly any[] = any[]> =
  | T
  | Readonly<T>
type ArrayAndReadonlyArrayByItem<T = any> = T[] | readonly T[]
type IsReadonlyArray<T extends ArrayAndReadonlyArrayByArray> = T extends any[]
  ? never
  : T
type isTuple<T extends ArrayAndReadonlyArrayByArray> =
  T extends ArrayAndReadonlyArrayByArray<[any, ...any[]] | [...any[], any]>
    ? T
    : never

// exports
export namespace ArrayUtils {
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

  export type Insert<
    T extends ArrayAndReadonlyArrayByArray,
    I extends number,
    V
  > = T extends IsReadonlyArray<T> ? readonly [T, V] : [...T, V]

  export type Remove<
    T extends ArrayAndReadonlyArrayByArray,
    I extends number
  > = T extends IsReadonlyArray<T> ? readonly [T] : [...T]

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
      ? T extends [infer First, ...infer Rest]
        ? [...Reverse<Rest>, First]
        : T extends [...infer Rest, infer Last]
        ? [Last, ...Reverse<Rest>]
        : never
      : T
  type Min<
    N extends number,
    M extends number,
    A extends any[] = []
  > = A['length'] extends M
    ? M
    : A['length'] extends N
    ? N
    : Min<N, M, [...A, '']>

  type Slice<
    T extends ArrayAndReadonlyArrayByArray,
    C extends number,
    // helper
    A extends any[] = [],
    M extends Min<T['length'], C> = Min<T['length'], C>
  > = A['length'] extends M ? A : Slice<T, C, [...A, T[A['length']]], M>

  type CC = Slice<[1, 2, 5, 6, undefined], 8>
}
