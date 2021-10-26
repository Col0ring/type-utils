import { ArrayTuple, Tuple } from '../array'
import { IsConstNumber } from '../number'
import { IsAny } from '../type'
import { And } from './and'
import { If } from './if'
import { Or } from './or'

export type IsExtends<A, B> = [A] extends [B] ? true : false

export type IsEqual<A, B> = If<
  And<[IsAny<A>, IsAny<B>]>,
  true,
  If<Or<[IsAny<A>, IsAny<B>]>, false, And<[IsExtends<A, B>, IsExtends<B, A>]>>
>

// notice: distributed condition type
export type IsLessThan<
  A extends number,
  B extends number,
  // array tool, don't pass in parameters
  HelperArray extends Tuple | [] = []
> = A extends A
  ? B extends B
    ? true extends And<[IsConstNumber<A>, IsConstNumber<B>]>
      ? HelperArray['length'] extends B
        ? false
        : HelperArray['length'] extends A
        ? true
        : IsLessThan<A, B, [...HelperArray, any]>
      : boolean
    : never
  : never
// notice: distributed condition type
export type IsGreaterThan<
  A extends number,
  B extends number,
  // array tool, don't pass in parameters
  HelperArray extends Tuple | [] = []
> = A extends A
  ? B extends B
    ? true extends And<[IsConstNumber<A>, IsConstNumber<B>]>
      ? HelperArray['length'] extends A
        ? false
        : HelperArray['length'] extends B
        ? true
        : IsGreaterThan<A, B, [...HelperArray, any]>
      : boolean
    : never
  : never

export type Add<A extends number, B extends number> = A extends A
  ? B extends B
    ? [...ArrayTuple<A>, ...ArrayTuple<B>]['length']
    : never
  : never

export type Sub<
  A extends number,
  B extends number,
  // array tool, don't pass in parameters
  HelperArray extends Tuple | [] = []
> = A extends A
  ? B extends B
    ? Add<B, HelperArray['length']> extends A
      ? HelperArray['length']
      : Sub<A, B, [...HelperArray, any]>
    : never
  : never
