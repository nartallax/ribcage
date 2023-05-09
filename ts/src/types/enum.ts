import {emptyObject} from "src/empty_object"
import {RC} from "src/ribcage"
import {rcConstUnion} from "src/types/union"

function getNames<T extends Record<string, unknown>>(enm: T): (keyof T)[] {
	const members = Object.keys(enm)
	return members.filter(x => Number.isNaN(parseInt(x, 10)))
}

function getValues<V>(enm: Record<string, V>): V[] {
	return getNames(enm).map(key => enm[key]!)
}

const knownEnumTypes = new Map<Record<string, unknown>, RC.Union>()

export function rcEnum<V extends RC.Constantable>(enm: Record<string, V>, def: RC.UnionDefinition<RC.Constant<V>> = emptyObject): RC.Union<RC.Constant<V>> {
	if(def === emptyObject){
		let res = knownEnumTypes.get(enm)
		if(!res){
			res = rcEnum(enm, {})
			knownEnumTypes.set(enm, res)
		}
		return res as RC.Union<RC.Constant<V>>
	}

	return rcConstUnion(getValues(enm), def)
}