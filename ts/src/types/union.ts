import {RCTypeOfType, resolveTwoArguments} from "src/types/base"
import {RCBaseTypeDefinition} from "src/types/base"
import {RCType, RCUnknown} from "src/types/base"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RCUnionDefinition extends RCBaseTypeDefinition {}

export type RCUnion<T extends RCUnknown> = RCType<"union", RCUnionDefinition & {components: T[]}, RCTypeOfType<T>>

export function rcUnion<T extends RCUnknown>(base: RCUnionDefinition, components: T[]): RCUnion<T>
export function rcUnion<T extends RCUnknown>(components: T[]): RCUnion<T>
export function rcUnion<T extends RCUnknown>(a: RCUnionDefinition | T[], b?: T[]): RCUnion<T> {
	const [def, components] = resolveTwoArguments<RCUnionDefinition, T[]>(a, b, {})

	if(components.length < 1){
		throw new Error("Cannot create union type of zero components.")
	}

	return {
		...def,
		components,
		type: "union",
		getValue: () => components[0]!.getValue() as RCTypeOfType<T>
	}
}