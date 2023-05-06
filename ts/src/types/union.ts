import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

export function rcUnion<T extends RC.Unknown>(components: T[], def: RC.UnionDefinition<T> = emptyObject): RC.Union<T> {
	if(components.length < 1){
		throw new Error("Cannot create union type of zero components.")
	}

	return {
		...def,
		components,
		type: "union",
		getValue: def.getDefault ?? (() => components[0]!.getValue() as RC.Value<T>)
	}
}