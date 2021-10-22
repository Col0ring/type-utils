import { ArrayUtils, ArrayAndReadonlyArrayByArray } from './array'
import { ComputedUtils } from './computed'
import Tuple = ArrayUtils.Tuple
import IsEqual = ComputedUtils.IsEqual
import IsExtends = ComputedUtils.IsExtends

export namespace ControlFlowUtils {
  export type AllExtends<A extends Tuple<[any, any]>> =
    A extends ArrayAndReadonlyArrayByArray<[infer C, ...infer R]>
      ? C extends [any?, any?]
        ? IsExtends<C[0], C[1]> extends true
          ? R extends ArrayAndReadonlyArrayByArray<
              [[any, any], ...[any, any][]]
            >
            ? AllExtends<R>
            : IsEqual<R['length'], 0>
          : false
        : false
      : false

  export type OneExtends<A extends Tuple<[any, any]>> =
    A extends ArrayAndReadonlyArrayByArray<[infer C, ...infer R]>
      ? C extends [any?, any?]
        ? IsExtends<C[0], C[1]> extends true
          ? true
          : R extends Tuple<[any, any]>
          ? OneExtends<R>
          : false
        : false
      : false

  export type One<A extends Tuple<boolean>> =
    A extends ArrayAndReadonlyArrayByArray<[infer C, ...infer R]>
      ? C extends true
        ? true
        : R extends Tuple<boolean>
        ? One<R>
        : false
      : false

  export type All<A extends Tuple<boolean>> =
    A extends ArrayAndReadonlyArrayByArray<[infer C, ...infer R]>
      ? C extends true
        ? R extends Tuple<boolean>
          ? All<R>
          : IsEqual<R['length'], 0>
        : false
      : false
}
