import type {RC} from "src/ribcage"
import {resolveTwoArguments} from "src/types/base"

// TODO: const F here..?
/** Struct is an object with fixed set of fields
 * (as opposed to object-map which fields can be determined at runtime) */
export function rcStruct<F extends RC.StructFields>(base: RC.StructDefinition<F>, fields: F): RC.Struct<F>
export function rcStruct<F extends RC.StructFields>(fields: F): RC.Struct<F>
export function rcStruct<F extends RC.StructFields>(a: RC.StructDefinition<F> | F, b?: F): RC.Struct<F> {
	const [def, fields] = resolveTwoArguments<RC.StructDefinition<F>, F>(a, b, {})

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