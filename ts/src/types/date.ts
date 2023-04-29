import type {RC} from "src/ribcage"

export function rcDate(def: RC.DateDefinition = {}): RC.Date {
	return {
		...def,
		type: "date",
		getValue: def.getDefault ?? (() => new Date(0))
	}
}