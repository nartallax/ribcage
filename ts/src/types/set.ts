import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

export function rcSet<T extends RC.Unknown>(value: T, def: RC.SetDefinition<T> = emptyObject): RC.Set<T> {
	return {
		...def,
		type: "set",
		value,
		getValue: def.getDefault ?? (() => new Set())
	}
}