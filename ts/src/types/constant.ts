import {RCBaseTypeDefinition, RCType, resolveTwoArguments} from "src/types/base"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RCConstantDefinition extends RCBaseTypeDefinition {
}

type ConstantableType = string | number | boolean
export type RCConstant<T extends ConstantableType> = RCType<"constant", RCConstantDefinition, T>

// TODO: const T here
export function rcConstant<T extends ConstantableType>(base: RCConstantDefinition, valueType: T): RCConstant<T>
export function rcConstant<T extends ConstantableType>(valueType: T): RCConstant<T>
export function rcConstant<T extends ConstantableType>(a: RCConstantDefinition | T, b?: T): RCConstant<T> {
	const [def, value] = resolveTwoArguments<RCConstantDefinition, T>(a, b, {})
	return {
		...def,
		type: "constant",
		getValue: () => value
	}
}