import type {RC} from "src/ribcage"
import {resolveTwoArguments} from "src/types/base"

// TODO: const T here
export function rcConstant<T extends RC.Constantable>(base: RC.ConstantDefinition<T>): RC.Constant<T>
export function rcConstant<T extends RC.Constantable>(base: RC.ConstantDefinition<T>, valueType: T): RC.Constant<T>
export function rcConstant<T extends RC.Constantable>(valueType: T): RC.Constant<T>
export function rcConstant<T extends RC.Constantable>(a: RC.ConstantDefinition<T> | T, b?: T): RC.Constant<T> {
	let [def, value] = resolveTwoArguments<RC.ConstantDefinition<T>, T>(a, b, {})
	if("value" in def){
		value = def.value!
	}
	return {
		...def,
		type: "constant",
		value,
		getValue: () => value
	}
}