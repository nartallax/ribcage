import type {RC} from "src/ribcage"
import {resolveTwoArguments} from "src/types/base"

export function rcSet<T extends RC.Unknown>(value: T): RC.Set<T>
export function rcSet<T extends RC.Unknown>(def: RC.SetDefinition<T>, value: T): RC.Set<T>
export function rcSet<T extends RC.Unknown>(a: RC.SetDefinition<T> | T, b?: T): RC.Set<T> {
	const [def, value] = resolveTwoArguments<RC.SetDefinition<T>, T>(a, b, {})

	return {
		...def,
		type: "set",
		value,
		getValue: def.getDefault ?? (() => new Set())
	}
}