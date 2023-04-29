import {RCBaseTypeDefinition, RCType} from "src/types/base"

export interface RCClassInstanceDefinition<C> extends RCBaseTypeDefinition {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	cls: {new(...args: any[]): C}
	getDefault?: () => C
}

export type RCClassInstance<C> = RCType<"class_instance", RCClassInstanceDefinition<C>, C>

export function rcClassInstance<C>(def: RCClassInstanceDefinition<C>): RCClassInstance<C> {
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