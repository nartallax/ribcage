import type {RC} from "src/ribcage"
import {resolveTwoArguments} from "src/types/base"

const noOpt = {}
const knownConstantTypes = new Map<RC.Constantable, RC.Constant>()

// TODO: const T here
export function rcConstant<T extends RC.Constantable>(base: RC.ConstantDefinition<T>): RC.Constant<T>
export function rcConstant<T extends RC.Constantable>(base: RC.ConstantDefinition<T>, valueType: T): RC.Constant<T>
export function rcConstant<T extends RC.Constantable>(valueType: T): RC.Constant<T>
export function rcConstant<T extends RC.Constantable>(a: RC.ConstantDefinition<T> | T, b?: T): RC.Constant<T> {
	const [def, _value] = resolveTwoArguments<RC.ConstantDefinition<T>, T>(a, b, noOpt)
	const value = "value" in def ? def.value! : _value

	if(def === noOpt){
		let type = knownConstantTypes.get(value) as RC.Constant<T> | undefined
		if(!type){
			type = rcConstant({}, value)
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