import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

const emptyArr: readonly any[] = []

/** Struct is an object with fixed set of fields
 * (as opposed to object-map which fields can be determined at runtime) */
export function rcStruct<F extends RC.StructFields, E extends RC.Struct = RC.Struct<{}>>(fields: F, def: RC.StructDefinition<F & RC.UnionToIntersection<RC.FieldsOf<E>>> = emptyObject, extnds: E | readonly E[] = emptyArr): RC.Struct<F & RC.UnionToIntersection<RC.FieldsOf<E>>> {
	// this function has this weird signature to allow for proper type inferrence
	// it's not possible to make extend-list be a part of definition
	// (it is possible in case of only one extend, but that's not what I go for)

	let allFields: any = {}
	const extArr = Array.isArray(extnds) ? extnds : [extnds]
	for(const ext of extArr){
		allFields = {...allFields, ...ext.fields}
	}
	allFields = {...allFields, ...fields}

	return {
		...def,
		type: "struct",
		fields: allFields,
		extends: extArr,
		getValue: def.getDefault ?? (() => {
			const result: any = {}
			for(const key in allFields){
				const field = allFields[key]!
				if((field.type === "optional" || field.type === "readonly_optional") && field.defaultVariant === "none"){
					continue // no field
				}
				result[key] = field.getValue() as any
			}
			return result
		})
	}
}

export const rcRoStruct: <F extends RC.StructFields, E extends RC.Struct = RC.Struct<{}>>(fields: F, def?: RC.StructDefinition<F & RC.UnionToIntersection<RC.FieldsOf<E>>>, extnds?: E | readonly E[]) => RC.Struct<F & RC.UnionToIntersection<RC.FieldsOf<E>>> = rcStruct
