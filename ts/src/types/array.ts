import {RCBaseTypeDefinition, RCType, RCTypeOfType, RCUnknown, resolveTwoArguments} from "src/types/base"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RCArrayDefinition<V extends RCUnknown> extends RCBaseTypeDefinition {
	getDefault?: () => RCTypeOfType<V>[]
}

export type RCArray<V extends RCUnknown> = RCType<"array", RCArrayDefinition<V> & {valueType: V}, RCTypeOfType<V>[]>
export type RCRoArray<V extends RCUnknown> = RCType<"array", RCArrayDefinition<V> & {valueType: V}, readonly RCTypeOfType<V>[]>

export function rcArray<V extends RCUnknown>(base: RCArrayDefinition<V>, valueType: V): RCArray<V>
export function rcArray<V extends RCUnknown>(valueType: V): RCArray<V>
export function rcArray<V extends RCUnknown>(a: RCArrayDefinition<V> | V, b?: V): RCArray<V> {
	const [def, valueType] = resolveTwoArguments<RCArrayDefinition<V>, V>(a, b, {})

	return {
		...def,
		valueType,
		type: "array",
		getValue: () => def.getDefault ? def.getDefault() : []
	}
}

export const rcRoArray: (<V extends RCUnknown>(base: RCArrayDefinition<V>, valueType: V) => RCRoArray<V>) & (<V extends RCUnknown>(valueType: V) => RCRoArray<V>) = rcArray