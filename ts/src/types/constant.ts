import type {RC} from "src/ribcage"
import {resolveTwoArguments} from "src/types/base"

// TODO: const T here
export function rcConstant<T extends RC.Constantable>(base: RC.ConstantDefinition, valueType: T): RC.Constant<T>
export function rcConstant<T extends RC.Constantable>(valueType: T): RC.Constant<T>
export function rcConstant<T extends RC.Constantable>(a: RC.ConstantDefinition | T, b?: T): RC.Constant<T> {
	const [def, value] = resolveTwoArguments<RC.ConstantDefinition, T>(a, b, {})
	return {
		...def,
		type: "constant",
		value,
		getValue: () => value
	}
}