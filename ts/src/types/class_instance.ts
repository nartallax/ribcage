import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

const knownClassTypes = new Map<RC.AnyConstructor<unknown>, RC.ClassInstance>()

export function rcClassInstance<C>(cls: RC.AnyConstructor<C>, def: RC.ClassInstanceDefinition<C> = emptyObject): RC.ClassInstance<C> {
	if(def === emptyObject){
		let type = knownClassTypes.get(cls) as RC.ClassInstance<C> | undefined
		if(!type){
			type = rcClassInstance(cls, {})
			knownClassTypes.set(cls, type)
		}
		return type
	}

	return {
		...def,
		cls,
		type: "class_instance",
		getValue: def.getDefault ?? (() => {
			if(cls.length === 0){
				return new cls()
			}
			throw new Error("Cannot create class instance: constructor expects more than zero arguments")
		})
	}
}