import {RCBaseTypeDefinition, RCType, RCTypeOfType, RCUnknown, resolveTwoArguments} from "src/types/base"

export interface RCSetDefinition<T extends RCUnknown> extends RCBaseTypeDefinition {
	getDefault?: () => Set<RCTypeOfType<T>>
}

export type RCSet<T extends RCUnknown> = RCType<"set", RCSetDefinition<T> & {value: T}, Set<RCTypeOfType<T>>>

export function rcSet<T extends RCUnknown>(value: T): RCSet<T>
export function rcSet<T extends RCUnknown>(def: RCSetDefinition<T>, value: T): RCSet<T>
export function rcSet<T extends RCUnknown>(a: RCSetDefinition<T> | T, b?: T): RCSet<T> {
	const [def, value] = resolveTwoArguments<RCSetDefinition<T>, T>(a, b, {})

	return {
		...def,
		type: "set",
		value,
		getValue: def.getDefault ?? (() => new Set())
	}
}