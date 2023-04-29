import {RCTypeOfType, resolveTwoArguments} from "src/types/base"
import {RCBaseTypeDefinition} from "src/types/base"
import {RCType, RCUnknown} from "src/types/base"
import {RCConstant} from "src/types/constant"
import {RCBool, RCInt, RCNull, RCNumber, RCString, RCUndefined} from "src/types/primitive"

export interface RCIntersectionDefinition<T extends RCUnknown> extends RCBaseTypeDefinition {
	getDefault?: () => DefUnionToTypeIntersection<T>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

type PackedTypeUnion<T> = T extends RCUnknown ? [RCTypeOfType<T>] : never
type UnpackUnion<T> = T extends [infer X] ? X : never
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RCPrimitive = RCString | RCInt | RCNumber | RCBool | RCNull | RCUndefined | RCConstant<any>
type DefUnionToTypeIntersection<T extends RCUnknown> = [T] extends [RCPrimitive]
	? UnpackUnion<UnionToIntersection<PackedTypeUnion<T>>>
	: UnionToIntersection<RCTypeOfType<T>>


export type RCIntersection<T extends RCUnknown> = RCType<"intersection", RCBaseTypeDefinition, DefUnionToTypeIntersection<T>>

export function rcIntersection<T extends RCUnknown>(base: RCIntersectionDefinition<T>, components: T[]): RCIntersection<T>
export function rcIntersection<T extends RCUnknown>(components: T[]): RCIntersection<T>
export function rcIntersection<T extends RCUnknown>(a: RCIntersectionDefinition<T> | T[], b?: T[]): RCIntersection<T> {
	const [def, components] = resolveTwoArguments<RCIntersectionDefinition<T>, T[]>(a, b, {})

	if(components.length < 1){
		throw new Error("Cannot create intersection type of zero components.")
	}

	return {
		...def,
		type: "intersection",
		getValue: def.getDefault ? def.getDefault : () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let result: any = {}
			for(const component of components){
				const value = component.getValue()
				if(typeof(value) !== "object" || value === null){
					throw new Error("Cannot form value of intersection: a component of an intersection is not an object. You should provide a getDefault function to avoid this problem.")
				}
				result = {...result, ...value}
			}
			return result
		}
	}
}