import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

let defaultBinary: RC.Binary | null = null

export function rcBinary(def: RC.BinaryDefinition = emptyObject): RC.Binary {
	if(def === emptyObject){
		return defaultBinary ??= rcBinary({})
	}

	return {
		...def,
		type: "binary",
		getValue: def.getDefault ? def.getDefault : () => new Uint8Array()
	}
}