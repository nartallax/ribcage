import {RCBaseTypeDefinition, RCType} from "src/types/base"

export interface RCBinaryDefinition extends RCBaseTypeDefinition {
	getDefault?: () => Uint8Array
}

export type RCBinary = RCType<"binary", RCBinaryDefinition, Uint8Array>

export function rcBinary(def: RCBinaryDefinition = {}): RCBinary {
	return {
		...def,
		type: "binary",
		getValue: def.getDefault ? def.getDefault : () => new Uint8Array()
	}
}