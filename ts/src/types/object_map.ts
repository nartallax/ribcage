import {RCBaseTypeDefinition, RCType, RCTypeOfType, RCUnknown} from "src/types/base"
import {RCConstant} from "src/types/constant"
import {RCString, rcString} from "src/types/primitive"
import {RCUnion} from "src/types/union"

type RCMapKey = RCString | RCConstant<string> | RCUnion<RCString | RCConstant<string>>

export interface RCObjectMapDefinition<V extends RCUnknown, K extends RCMapKey> extends RCBaseTypeDefinition {
	key?: K
	value: V
	getDefault?: () => RCObjectMapValue<K, V>
}

type RCObjectMapValue<K extends RCMapKey, V extends RCUnknown> = Record<RCTypeOfType<K>, RCTypeOfType<V>>
export type RCObjectMap<K extends RCMapKey, V extends RCUnknown> = RCType<"object_map", RCObjectMapDefinition<V, K> & {key: K}, RCObjectMapValue<K, V>>

/** object-map is an object used as a map */
export function rcObjectMap<V extends RCUnknown, K extends RCMapKey = RCString>(def: RCObjectMapDefinition<V, K>): RCObjectMap<K, V> {
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