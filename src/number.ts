export namespace NumberUtils {
  export type IsConstNumber<T extends number> = number extends T ? never : T
}
