export type IsConstNumber<T extends number> = number extends T ? false : true

// notice: distributed condition type
export type IsNegativeNumber<T extends number> = T extends T
  ? `${T}` extends `-${number}`
    ? true
    : false
  : never

// notice: distributed condition type
export type IsPositiveNumber<T extends number> =
  // not 0
  T extends 0
    ? false
    : // not negativeNumber
    IsNegativeNumber<T> extends true
    ? false
    : // not number
    number extends T
    ? false
    : true
