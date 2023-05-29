import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"
import {rcConstant} from "src/types/constant"

export function rcUnion<T extends RC.Unknown>(components: readonly T[], def: RC.UnionDefinition<T> = emptyObject): RC.Union<T> {
	if(components.length < 1){
		throw new Error("Cannot create union type of zero components.")
	}

	return {
		...def,
		components: [...components],
		type: "union",
		getValue: def.getDefault ?? (() => components[0]!.getValue() as RC.Value<T>)
	}
}

export function rcConstUnion<const T extends RC.Constantable>(components: readonly T[], def: RC.UnionDefinition<RC.Constant<T>> = emptyObject): RC.Union<RC.Constant<T>> {
	return rcUnion(components.map(x => rcConstant(x)), def)
}

export function rcKeyOf<F extends RC.StructFields>(struct: RC.Struct<F>, def: RC.UnionDefinition<RC.Constant<keyof F & string>> = emptyObject): RC.Union<RC.Constant<keyof F & string>> {
	return rcConstUnion<keyof F & string>(Object.keys(struct.fields), def)
}