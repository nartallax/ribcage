import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

export function rcTuple<const T extends readonly RC.Unknown[]>(components: T, def: RC.TupleDefinition<T> = emptyObject): RC.Tuple<T> {
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