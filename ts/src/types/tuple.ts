import type {RC} from "src/ribcage"
import {resolveTwoArguments} from "src/types/base"

// TODO: const T here...?
export function rcTuple<T extends readonly RC.Unknown[]>(base: RC.TupleDefinition<T>, components: T[]): RC.Tuple<T>
export function rcTuple<T extends readonly RC.Unknown[]>(components: T): RC.Tuple<T>
export function rcTuple<T extends readonly RC.Unknown[]>(a: RC.TupleDefinition<T> | T, b?: T): RC.Tuple<T> {
	const [def, components] = resolveTwoArguments<RC.TupleDefinition<T>, T>(a, b, {})

	return {
		...def,
		type: "tuple",
		components,
		getValue: def.getDefault ?? (() => {
			const result = new Array(components.length)
			for(let i = 0; i < result.length; i++){
				result[i] = components[i]!.getValue()
			}
			return result as RC.TupleValue<T>
		})
	}
}