import type {RC} from "src/ribcage"

const noOpt = {}

let defaultDate: RC.Date | null = null
export function rcDate(def: RC.DateDefinition = noOpt): RC.Date {
	if(def === noOpt){
		return defaultDate ??= rcDate({})
	}

	return {
		...def,
		type: "date",
		getValue: def.getDefault ?? (() => new Date(0))
	}
}