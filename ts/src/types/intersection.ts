import type {RC} from "src/ribcage"
import {resolveTwoArguments} from "src/types/base"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

// this type exists to avoid collapsing types like `"uwu" | string` into just `string`
// because that would lead to incorrect conversion to intersection type (`string` instead of `"uwu"`)
type PackedTypeUnion<T> = T extends RC.Unknown ? [RC.Value<T>] : never
type UnpackUnion<T> = T extends [infer X] ? X : never
type RCPrimitive = RC.String | RC.Int | RC.Number | RC.Bool | RC.Constant<RC.Constantable>
/** This type is weird, but it needs to be this way.
 * Intersection of primitives work kinda different from intersection of objects
 * Intersection of primitives = most narrow type of them
 * Intersection of objects = object with all the fields */
export type DefUnionToTypeIntersection<T extends RC.Unknown> = [T] extends [RCPrimitive]
	? UnpackUnion<UnionToIntersection<PackedTypeUnion<T>>>
	: UnionToIntersection<RC.Value<T>>

export function rcIntersection<T extends RC.Unknown>(base: RC.IntersectionDefinition<T>, components: T[]): RC.Intersection<T>
export function rcIntersection<T extends RC.Unknown>(components: T[]): RC.Intersection<T>
export function rcIntersection<T extends RC.Unknown>(a: RC.IntersectionDefinition<T> | T[], b?: T[]): RC.Intersection<T> {
	const [def, components] = resolveTwoArguments<RC.IntersectionDefinition<T>, T[]>(a, b, {})

	if(components.length < 1){
		throw new Error("Cannot create intersection type of zero components.")
	}

	return {
		...def,
		type: "intersection",
		components,
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