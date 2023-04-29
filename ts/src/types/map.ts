import {RCBaseTypeDefinition, RCType, RCTypeOfType, RCUnknown} from "src/types/base"

export interface RCMapDefinition<K extends RCUnknown, V extends RCUnknown> extends RCBaseTypeDefinition {
	key: K
	value: V
	getDefault?: () => Map<RCTypeOfType<K>, RCTypeOfType<V>>
}

export type RCMap<K extends RCUnknown, V extends RCUnknown> = RCType<"map", RCMapDefinition<K, V>, Map<RCTypeOfType<K>, RCTypeOfType<V>>>

export function rcMap<K extends RCUnknown, V extends RCUnknown>(def: RCMapDefinition<K, V>): RCMap<K, V> {
	return {
		...def,
		type: "map",
		getValue: def.getDefault ?? (() => new Map())
	}
}