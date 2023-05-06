import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

// TODO: const F here..?
/** Struct is an object with fixed set of fields
 * (as opposed to object-map which fields can be determined at runtime) */
export function rcStruct<F extends RC.StructFields>(fields: F, def: RC.StructDefinition<F> = emptyObject): RC.Struct<F> {
	return {
		...def,
		type: "struct",
		fields,
		getValue: def.getDefault ?? (() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const result: any = {}
			for(const key in fields){
				const field = fields[key]!
				if((field.type === "optional" || field.type === "readonly_optional") && field.defaultVariant === "none"){
					continue // no field
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				result[key] = field.getValue() as any
			}
			return result
		})
	}
}

export const rcRoStruct: <F extends RC.StructFields>(fields: F, def?: RC.StructDefinition<F>) => RC.RoStruct<F> = rcStruct