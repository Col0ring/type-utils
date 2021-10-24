import { IsFalsy } from '../type'
import { If } from './if'

// notice: distributed condition type
export type Not<T> = T extends T ? If<IsFalsy<T>, true, false> : never
