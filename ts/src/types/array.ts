import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

export function rcArray<V extends RC.Unknown>(valueType: V, def: RC.ArrayDefinition<V> = emptyObject): RC.Array<V> {

	return {
		...def,
		valueType,
		type: "array",
		getValue: def.getDefault ?? (() => [])
	}
}

export const rcRoArray: (<V extends RC.Unknown>(valueType: V, def?: RC.ArrayDefinition<V>) => RC.RoArray<V>) = rcArray