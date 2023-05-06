import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

let defaultString: RC.String | null = null
export function rcString(def: RC.StringDefiniton = emptyObject): RC.String {
	if(def === emptyObject){
		return defaultString ??= rcString({})
	}

	const dflt = def.default ?? ""
	return {
		...def,
		default: dflt,
		type: "string",
		getValue: () => dflt
	}
}

let defaultNumber: RC.Number | null = null
export function rcNumber(def: RC.NumberDefinition = emptyObject): RC.Number {
	if(def === emptyObject){
		return defaultNumber ??= rcNumber({})
	}

	const dflt = def.default ?? 0
	return {
		...def,
		default: dflt,
		type: "number",
		getValue: () => dflt
	}
}

let defaultInt: RC.Int | null = null
export function rcInt(def: RC.IntDefinition = emptyObject): RC.Int {
	if(def === emptyObject){
		return defaultInt ??= rcInt({})
	}

	const dflt = def.default ?? 0
	if((dflt % 1) !== 0){
		throw new Error("Cannot define int type with non-integer default: " + def.default)
	}
	return {
		...def,
		default: dflt,
		type: "int",
		getValue: () => dflt
	}
}

let defaultBool: RC.Bool | null = null
export function rcBool(def: RC.BoolDefinition = emptyObject): RC.Bool {
	if(def === emptyObject){
		return defaultBool ??= rcBool({})
	}

	const dflt = def.default ?? false
	return {
		...def,
		default: dflt,
		type: "bool",
		getValue: () => dflt
	}
}