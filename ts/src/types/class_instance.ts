import type {RC} from "src/ribcage"

export function rcClassInstance<C>(def: RC.ClassInstanceDefinition<C>): RC.ClassInstance<C> {
	return {
		...def,
		type: "class_instance",
		getValue: def.getDefault ?? (() => {
			if(def.cls.length === 0){
				return new def.cls()
			}
			throw new Error("Cannot create class instance: constructor expects more than zero arguments")
		})
	}
}