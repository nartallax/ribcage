import type {RC} from "src/ribcage"

import {resolveTwoArguments} from "src/types/base"

export function rcUnion<T extends RC.Unknown>(base: RC.UnionDefinition, components: T[]): RC.Union<T>
export function rcUnion<T extends RC.Unknown>(components: T[]): RC.Union<T>
export function rcUnion<T extends RC.Unknown>(a: RC.UnionDefinition | T[], b?: T[]): RC.Union<T> {
	const [def, components] = resolveTwoArguments<RC.UnionDefinition, T[]>(a, b, {})

	if(components.length < 1){
		throw new Error("Cannot create union type of zero components.")
	}

	return {
		...def,
		components,
		type: "union",
		getValue: () => components[0]!.getValue() as RC.Value<T>
	}
}