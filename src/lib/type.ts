export type Falsy = 0 | false | '' | undefined | null | void | never | unknown
export type FalsyWithoutUnknown =
  | 0
  | false
  | ''
  | undefined
  | null
  | void
  | never

export type IsAny<T> = number extends 0 & T ? true : false

export type IsUnknown<T> = unknown extends T
  ? // IsAny
    number extends 0 & T
    ? false
    : true
  : false

export type IsNever<T> = [T] extends [never] ? true : false

export type IsFalsy<T> =
  // IsNever
  [T] extends [never]
    ? true
    : T extends FalsyWithoutUnknown
    ? // IsAny
      number extends 0 & T
      ? false
      : true
    : IsUnknown<T> extends true
    ? true
    : false

export type IsTruthy<T> = IsFalsy<T> extends true ? false : true
