import {emptyObject} from "src/empty_object"
import type {RC} from "src/ribcage"

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
	? UnpackUnion<RC.UnionToIntersection<PackedTypeUnion<T>>>
	: RC.UnionToIntersection<RC.Value<T>>

export function rcIntersection<T extends RC.Unknown>(components: T[], def: RC.IntersectionDefinition<T> = emptyObject): RC.Intersection<T> {
	if(components.length < 1){
		throw new Error("Cannot create intersection type of zero components.")
	}

	return {
		...def,
		type: "intersection",
		components,
		getValue: def.getDefault ? def.getDefault : () => {
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