import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"
import {rcString} from "src/types/primitive"

/** object-map is an object used as a map */
export function rcObjectMap<V extends RC.Unknown, K extends RC.ObjectMapKeyType = RC.String>(value: V, def: RC.ObjectMapDefinition<V, K> = emptyObject): RC.ObjectMap<K, V> {
	const key = def.key ?? rcString() as K
	return {
		...def,
		value,
		key,
		type: "object_map",
		getValue: def.getDefault ?? (() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const result: any = {}
			if(key.type === "string"){
				return result
			} else if(key.type === "constant"){
				const keyValue = key.getValue()
				if(typeof(keyValue) !== "string"){
					throw new Error("Unexpected key of object map (non-string): " + keyValue)
				}
				result[keyValue] = value.getValue()
			} else if(key.type === "union"){
				const stringType = key.components.find(x => x.type === "string")
				if(stringType){
					return result
				}
				for(const item of key.components){
					const keyValue = item.getValue()
					if(typeof(keyValue) !== "string"){
						throw new Error("Unexpected key of object map (non-string): " + keyValue)
					}
					result[keyValue] = value.getValue()
				}
			}
			return result
		})
	}
}