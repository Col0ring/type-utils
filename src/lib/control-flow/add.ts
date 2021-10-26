// TODO:
type DigitRangeMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
type StrDigitRangeMap = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
type RoundMap = {
  10: 0
  11: 1
  12: 2
  13: 3
  14: 4
  15: 5
  16: 6
  17: 7
  18: 8
  19: 9
}
type AdditionMap = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
]
type IncMap = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19
]

type Digit = DigitRangeMap[number]

type ToDigit<T extends string> = T extends keyof DigitRangeMap
  ? DigitRangeMap[T]
  : never

type ToDigitList<
  T,
  R extends any[] = []
> = T extends `${infer First}${infer Rest}`
  ? ToDigitList<Rest, [ToDigit<First>, ...R]>
  : R

type Shift<T extends any[]> = T extends [infer First, ...infer Rest]
  ? Rest
  : never

type Carry<T extends number, R extends number[] = []> = T extends keyof RoundMap
  ? [1, [RoundMap[T], ...R]]
  : [0, [T, ...R]]

type AddOneDigit<A extends Digit, B extends Digit> = AdditionMap[A][B]

type AddDigitList<
  A extends any[],
  B extends any[],
  ACC extends [0 | 1, number[]] = [0, []]
> = A['length'] extends 0
  ? B['length'] extends 0
    ? ACC[0] extends 1
      ? AddDigitList<[1], [], [0, ACC[1]]>
      : ACC[1]
    : AddDigitList<A, Shift<B>, Carry<AddOneDigit<B[0], ACC[0]>, ACC[1]>>
  : B['length'] extends 0
  ? AddDigitList<Shift<A>, B, Carry<AddOneDigit<A[0], ACC[0]>, ACC[1]>>
  : AddDigitList<
      Shift<A>,
      Shift<B>,
      Carry<
        ACC[0] extends 0
          ? AddOneDigit<A[0], B[0]>
          : IncMap[AddOneDigit<A[0], B[0]>],
        ACC[1]
      >
    >

type DigitListToString<T extends any[], R extends string = ''> = T extends [
  infer First,
  ...infer Rest
]
  ? DigitListToString<
      Rest,
      `${R}${First extends number ? StrDigitRangeMap[First] : 'n'}`
    >
  : R

type Reserve<T extends string> = T extends `${infer U}${infer R}`
  ? `${Reserve<R>}${U}`
  : T

// for bigint
export type Add<
  A extends `${number}` | `${number}.${number}`,
  B extends `${number}` | `${number}.${number}`
> = A extends `${infer IntA}.${infer DecimalA}`
  ? B extends `${infer IntB}.${infer DecimalB}`
    ? `${DigitListToString<
        AddDigitList<ToDigitList<IntA>, ToDigitList<IntB>>
      >}.${Reserve<
        DigitListToString<
          AddDigitList<
            ToDigitList<Reserve<DecimalA>>,
            ToDigitList<Reserve<DecimalB>>
          >
        >
      >}`
    : `${DigitListToString<
        AddDigitList<ToDigitList<IntA>, ToDigitList<B>>
      >}.${DigitListToString<
        AddDigitList<ToDigitList<DecimalA>, ToDigitList<''>>
      >}`
  : B extends `${infer IntB}.${infer DecimalB}`
  ? `${DigitListToString<
      AddDigitList<ToDigitList<A>, ToDigitList<IntB>>
    >}.${DigitListToString<
      AddDigitList<ToDigitList<''>, ToDigitList<DecimalB>>
    >}`
  : DigitListToString<AddDigitList<ToDigitList<A>, ToDigitList<B>>>
