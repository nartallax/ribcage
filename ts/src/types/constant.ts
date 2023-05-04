import type {RC} from "src/ribcage"

const noOpt = {}
const knownConstantTypes = new Map<RC.Constantable, RC.Constant>()

// TODO: const T here
export function rcConstant<T extends RC.Constantable>(base: RC.ConstantDefinition<T>, valueType: T): RC.Constant<T>
export function rcConstant<T extends RC.Constantable>(valueType: T): RC.Constant<T>
export function rcConstant<T extends RC.Constantable>(...args: (RC.ConstantDefinition<T> | T)[]): RC.Constant<T> {
	// cannot use `resolveTwoArguments` here because value can be undefined and that's legit value
	let def: RC.ConstantDefinition<T>
	let _value: T
	if(args.length === 2){
		def = args[0] as RC.ConstantDefinition<T>
		_value = args[1] as T
	} else {
		def = noOpt
		_value = args[0] as T
	}
	const value = "value" in def ? def.value! : _value

	if(def === noOpt){
		let type = knownConstantTypes.get(value) as RC.Constant<T> | undefined
		if(!type){
			type = rcConstant({}, value)
			knownConstantTypes.set(value, type)
		}
		return type
	}

	return {
		...def,
		type: "constant",
		value,
		getValue: () => value
	}
}