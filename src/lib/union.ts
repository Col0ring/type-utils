export type UnionToIntersection<U> = (
  U extends U ? (arg: U) => any : never
) extends (arg: infer T) => any
  ? T
  : never
