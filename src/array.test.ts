import { ArrayUtils } from './array'

import Pop = ArrayUtils.Pop
import Push = ArrayUtils.Push
import UnShift = ArrayUtils.UnShift
import Shift = ArrayUtils.Shift

type InitType1 = [number, string]
type InitType2 = readonly [number, string]
type InitType3 = number[]
type InitType4 = readonly number[]
type InitType5 = (number | string)[]
type InitType6 = readonly (number | string)[]

type Result1 = Pop<Push<UnShift<Shift<Push<InitType1, 1>>, '2'>, 2>>
type Result2 = Pop<Push<UnShift<Shift<Push<InitType2, 1>>, '2'>, 2>>
type Result3 = Pop<Push<UnShift<Shift<Push<InitType3, 1>>, '2'>, 2>>
type Result4 = Pop<Push<UnShift<Shift<Push<InitType4, 1>>, '2'>, 2>>
type Result5 = Pop<Push<UnShift<Shift<Push<InitType5, 1>>, '2'>, 2>>
type Result6 = Pop<Push<UnShift<Shift<Push<InitType6, 1>>, '2'>, 2>>
