import type {RC} from "src/ribcage"

export function rcString(def: RC.StringDefiniton = {}): RC.String {
	const dflt = def.default ?? ""
	return {
		...def,
		default: dflt,
		type: "string",
		getValue: () => dflt
	}
}

export function rcNumber(def: RC.NumberDefinition = {}): RC.Number {
	const dflt = def.default ?? 0
	return {
		...def,
		default: dflt,
		type: "number",
		getValue: () => dflt
	}
}

export function rcInt(def: RC.IntDefinition = {}): RC.Int {
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

export function rcBool(def: RC.BoolDefinition = {}): RC.Bool {
	const dflt = def.default ?? false
	return {
		...def,
		default: dflt,
		type: "bool",
		getValue: () => dflt
	}
}