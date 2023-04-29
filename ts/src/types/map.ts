import type {RC} from "src/ribcage"

export function rcMap<K extends RC.Unknown, V extends RC.Unknown>(def: RC.MapDefinition<K, V>): RC.Map<K, V> {
	return {
		...def,
		type: "map",
		getValue: def.getDefault ?? (() => new Map())
	}
}