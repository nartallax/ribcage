import type {RC} from "src/ribcage"
import {resolveTwoArguments} from "src/types/base"

export function rcRecursiveType(base: RC.RecursiveTypeDefinition, getType: () => RC.Unknown): RC.Recursive
export function rcRecursiveType(getType: () => RC.Unknown): RC.Recursive
export function rcRecursiveType(a: RC.RecursiveTypeDefinition | (() => RC.Unknown), b?: () => RC.Unknown): RC.Recursive {
	const [def, getType] = resolveTwoArguments<RC.RecursiveTypeDefinition, () => RC.Unknown>(a, b, {})

	return {
		...def,
		type: "recursive",
		getType,
		getValue: () => getType().getValue()
	}
}