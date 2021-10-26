import { IsFalsy } from '../type'
import { If } from './if'

export type Not<T> = If<IsFalsy<T>, true, false>
