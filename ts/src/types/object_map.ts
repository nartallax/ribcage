import type {RC} from "src/ribcage"
import {rcString} from "src/types/primitive"

/** object-map is an object used as a map */
export function rcObjectMap<V extends RC.Unknown, K extends RC.ObjectMapKeyType = RC.String>(def: RC.ObjectMapDefinition<V, K>): RC.ObjectMap<K, V> {
	const key = def.key ?? rcString() as K
	return {
		...def,
		key,
		type: "object_map",
		getValue: def.getDefault ?? (() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const result: any = {}
			if(key.type === "string"){
				return result
			} else if(key.type === "constant"){
				const value = key.getValue()
				if(typeof(value) !== "string"){
					throw new Error("Unexpected key of object map (non-string): " + value)
				}
				result[value] = def.value.getValue()
			} else if(key.type === "union"){
				const stringType = key.components.find(x => x.type === "string")
				if(stringType){
					return result
				}
				for(const item of key.components){
					const value = item.getValue()
					if(typeof(value) !== "string"){
						throw new Error("Unexpected key of object map (non-string): " + value)
					}
					result[value] = def.value.getValue()
				}
			}
			return result
		})
	}
}