import type {RC} from "src/ribcage"
import {resolveTwoArguments} from "src/types/base"

export function rcArray<V extends RC.Unknown>(base: RC.ArrayDefinition<V>, valueType: V): RC.Array<V>
export function rcArray<V extends RC.Unknown>(valueType: V): RC.Array<V>
export function rcArray<V extends RC.Unknown>(a: RC.ArrayDefinition<V> | V, b?: V): RC.Array<V> {
	const [def, valueType] = resolveTwoArguments<RC.ArrayDefinition<V>, V>(a, b, {})

	return {
		...def,
		valueType,
		type: "array",
		getValue: def.getDefault ?? (() => [])
	}
}

export const rcRoArray: (<V extends RC.Unknown>(base: RC.ArrayDefinition<V>, valueType: V) => RC.RoArray<V>) & (<V extends RC.Unknown>(valueType: V) => RC.RoArray<V>) = rcArray