import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

export function rcRecursiveType(getType: () => RC.Unknown, def: RC.RecursiveTypeDefinition = emptyObject): RC.Recursive {
	return {
		...def,
		type: "recursive",
		getType,
		getValue: () => getType().getValue()
	}
}