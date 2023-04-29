import {RCBaseTypeDefinition, RCType} from "src/types/base"

export interface RCDateDefinition extends RCBaseTypeDefinition {
	getDefault?: () => Date
}

export type RCDate = RCType<"date", RCDateDefinition, Date>

export function rcDate(def: RCDateDefinition = {}): RCDate {
	return {
		...def,
		type: "date",
		getValue: def.getDefault ?? (() => new Date(0))
	}
}