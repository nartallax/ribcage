import type {RC} from "src/ribcage"

const noOpt = {}
let defaultBinary: RC.Binary | null = null

export function rcBinary(def: RC.BinaryDefinition = noOpt): RC.Binary {
	if(def === noOpt){
		return defaultBinary ??= rcBinary({})
	}

	return {
		...def,
		type: "binary",
		getValue: def.getDefault ? def.getDefault : () => new Uint8Array()
	}
}