import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

const knownConstantTypes = new Map<RC.Constantable, RC.Constant>()

// TODO: const T here
export function rcConstant<T extends RC.Constantable>(value: T, def: RC.ConstantDefinition<T> = emptyObject): RC.Constant<T> {
	if(def === emptyObject){
		let type = knownConstantTypes.get(value) as RC.Constant<T> | undefined
		if(!type){
			type = rcConstant(value, {})
			knownConstantTypes.set(value, type)
		}
		return type
	}

	return {
		...def,
		type: "constant",
		value,
		getValue: () => value
	}
}