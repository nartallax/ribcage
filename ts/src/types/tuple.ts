import {RCBaseTypeDefinition, RCType, RCTypeOfType, RCUnknown, resolveTwoArguments} from "src/types/base"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RCTupleDefinition extends RCBaseTypeDefinition {}

type RCTypeOfTupleType<T extends readonly RCUnknown[]> = T extends readonly [infer V extends RCUnknown, ...(infer R extends RCUnknown[])]
	? [RCTypeOfType<V>, ...RCTypeOfTupleType<R>]
	: []

export type RCTuple<T extends readonly RCUnknown[]> = RCType<"tuple", RCTupleDefinition & {components: T}, RCTypeOfTupleType<T>>

// TODO: const T here...?
export function rcTuple<T extends readonly RCUnknown[]>(base: RCTupleDefinition, components: T[]): RCTuple<T>
export function rcTuple<T extends readonly RCUnknown[]>(components: T): RCTuple<T>
export function rcTuple<T extends readonly RCUnknown[]>(a: RCTupleDefinition | T, b?: T): RCTuple<T> {
	const [def, components] = resolveTwoArguments<RCTupleDefinition, T>(a, b, {})

	return {
		...def,
		type: "tuple",
		components,
		getValue: () => {
			const result = new Array(components.length)
			for(let i = 0; i < result.length; i++){
				result[i] = components[i]!.getValue()
			}
			return result as RCTypeOfTupleType<T>
		}
	}
}