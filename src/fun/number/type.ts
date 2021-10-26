import { If, IfExtends } from '../control-flow'

export type IsConstNumber<T extends number> = IfExtends<
  [number, T],
  false,
  true
>

// notice: distributed condition type
export type IsNegativeNumber<T extends number> = T extends T
  ? IfExtends<[`${T}`, `-${number}`], true, false>
  : never

// notice: distributed condition type
export type IsPositiveNumber<T extends number> = T extends T
  ? If<
      IsConstNumber<T>,
      IfExtends<[T, 0], false, If<IsNegativeNumber<T>, false, true>>,
      false
    >
  : never
