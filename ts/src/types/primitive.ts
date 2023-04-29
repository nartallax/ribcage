import {RCType, RCTypeDefiner} from "src/types/base"
import {RCBaseTypeDefinition, makeTypeDefiner} from "./base"

export interface RCStringDefiniton extends RCBaseTypeDefinition {
	default?: string
}
export type RCString = RCType<"string", RCStringDefiniton & {default: string}, string>
export const rcString: RCTypeDefiner<RCStringDefiniton, RCString> = makeTypeDefiner(
	"string" as const,
	(base: RCStringDefiniton) => ({
		...base,
		default: base.default ?? ""
	}),
	d => d.default
)

export interface RCNumberDefinition extends RCBaseTypeDefinition {
	default?: number
}
export type RCNumber = RCType<"number", RCNumberDefinition & {default: number}, number>
export const rcNumber: RCTypeDefiner<RCNumberDefinition, RCNumber> = makeTypeDefiner(
	"number" as const,
	(base: RCNumberDefinition) => ({
		...base,
		default: base.default ?? 0
	}),
	d => d.default
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RCIntDefinition extends RCNumberDefinition {}
export type RCInt = RCType<"int", RCIntDefinition & {default: number}, number>
export const rcInt: RCTypeDefiner<RCIntDefinition, RCInt> = makeTypeDefiner(
	"int" as const,
	(base: RCIntDefinition) => {
		if(typeof(base.default) === "number" && (base.default % 1) !== 0){
			throw new Error("Cannot define int type with non-integer default: " + base.default)
		}
		return {...base, default: base.default ?? 0}
	},
	d => d.default
)

export interface RCBoolDefinition extends RCBaseTypeDefinition {
	default?: boolean
}
export type RCBool = RCType<"bool", RCBoolDefinition & {default: boolean}, boolean>
export const rcBool: RCTypeDefiner<RCBoolDefinition, RCBool> = makeTypeDefiner(
	"bool" as const,
	(base: RCBoolDefinition) => ({
		...base,
		default: base.default ?? false
	}),
	d => d.default
)