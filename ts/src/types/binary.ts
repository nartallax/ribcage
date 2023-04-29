import type {RC} from "src/ribcage"

export function rcBinary(def: RC.BinaryDefinition = {}): RC.Binary {
	return {
		...def,
		type: "binary",
		getValue: def.getDefault ? def.getDefault : () => new Uint8Array()
	}
}