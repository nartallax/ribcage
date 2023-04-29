import {rcArray, rcRoArray} from "src/types/array"
import {rcBinary} from "src/types/binary"
import {rcClassInstance} from "src/types/class_instance"
import {rcConstant} from "src/types/constant"
import {rcDate} from "src/types/date"
import {DefUnionToTypeIntersection, rcIntersection} from "src/types/intersection"
import {rcMap} from "src/types/map"
import {rcObjectMap} from "src/types/object_map"
import {rcBool, rcInt, rcNumber, rcString} from "src/types/primitive"
import {rcSet} from "src/types/set"
import {rcStruct} from "src/types/struct"
import {rcStructFields} from "src/types/struct_fields"
import {rcTuple} from "src/types/tuple"
import {rcUnion} from "src/types/union"

type NativeDate = Date
type NativeMap<K, V> = Map<K, V>
type NativeSet<V> = Set<V>

export namespace RC {
	/** This interface is base type for all the types that this library may define
	 * This library is supposed to be extensible;
	 * so, if any other library want to add custom properties to all the types - this interface should be used */
	export interface BaseTypeDefinition {
		/** This is really just to help the typings. This field does nothing. */
		readonly thisHelpsTypings?: true
	}

	/** A structure that describes some value */
	export type Type<T extends string, D, V> = Readonly<D> & {
		readonly type: T
		readonly getValue: () => V
	}

	/** Type of value that some type structure is describing */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export type Value<T extends Unknown> = T extends Type<any, any, infer V> ? V : never

	/** Some type that is not known.
	 * Exists to serve as type parameter constraint */
	export type Unknown = Type<string, BaseTypeDefinition, unknown>


	export interface ArrayDefinition<V extends Unknown> extends BaseTypeDefinition {
		getDefault?: () => Value<V>[]
	}
	export type Array<V extends Unknown> = Type<"array", ArrayDefinition<V> & {valueType: V}, Value<V>[]>
	export type RoArray<V extends Unknown> = Type<"array", ArrayDefinition<V> & {valueType: V}, readonly Value<V>[]>
	export const array = rcArray
	export const roArray = rcRoArray


	export interface BinaryDefinition extends BaseTypeDefinition {
		getDefault?: () => Uint8Array
	}
	export type Binary = Type<"binary", BinaryDefinition, Uint8Array>
	export const binary = rcBinary


	export interface ClassInstanceDefinition<C> extends BaseTypeDefinition {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		cls: {new(...args: any[]): C}
		getDefault?: () => C
	}
	export type ClassInstance<C> = Type<"class_instance", ClassInstanceDefinition<C>, C>
	export const classInstance = rcClassInstance


	/** A type of value that can be a constant */
	export type Constantable = string | number | boolean | null | undefined
	// TODO: const T here..?
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface ConstantDefinition extends BaseTypeDefinition {
	}
	export type Constant<T extends Constantable> = Type<"constant", ConstantDefinition & {value: T}, T>
	export const constant = rcConstant


	export interface DateDefinition extends BaseTypeDefinition {
		getDefault?: () => NativeDate
	}
	export type Date = Type<"date", DateDefinition, NativeDate>
	export const date = rcDate


	export interface IntersectionDefinition<T extends Unknown> extends BaseTypeDefinition {
		getDefault?: () => DefUnionToTypeIntersection<T>
	}
	export type Intersection<T extends Unknown> = Type<"intersection", IntersectionDefinition<T> & {components: T[]}, DefUnionToTypeIntersection<T>>
	export const intersection = rcIntersection


	export interface MapDefinition<K extends Unknown, V extends Unknown> extends BaseTypeDefinition {
		key: K
		value: V
		getDefault?: () => NativeMap<Value<K>, Value<V>>
	}
	export type Map<K extends Unknown, V extends Unknown> = Type<"map", MapDefinition<K, V>, NativeMap<Value<K>, Value<V>>>
	export const map = rcMap

	// eslint-disable-next-line @typescript-eslint/ban-types
	export type ObjectMapKeyType = String | Constant<string> | Union<String | Constant<string>>
	export type ObjectMapValue<K extends ObjectMapKeyType, V extends Unknown> = Record<Value<K>, Value<V>>
	export interface ObjectMapDefinition<V extends Unknown, K extends ObjectMapKeyType> extends BaseTypeDefinition {
		key?: K
		value: V
		getDefault?: () => ObjectMapValue<K, V>
	}
	export type ObjectMap<K extends ObjectMapKeyType, V extends Unknown> = Type<"object_map", ObjectMapDefinition<V, K> & {key: K}, ObjectMapValue<K, V>>
	export const objectMap = rcObjectMap


	export interface StringDefiniton extends BaseTypeDefinition {
		default?: string
	}
	export type String = Type<"string", StringDefiniton & {default: string}, string>
	export const string = rcString


	export interface NumberDefinition extends BaseTypeDefinition {
		default?: number
	}
	export type Number = Type<"number", NumberDefinition & {default: number}, number>
	export const number = rcNumber


	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IntDefinition extends NumberDefinition {}
	export type Int = Type<"int", IntDefinition & {default: number}, number>
	export const int = rcInt


	export interface BoolDefinition extends BaseTypeDefinition {
		default?: boolean
	}
	export type Bool = Type<"bool", BoolDefinition & {default: boolean}, boolean>
	export const bool = rcBool


	export interface SetDefinition<T extends Unknown> extends BaseTypeDefinition {
		getDefault?: () => NativeSet<Value<T>>
	}
	export type Set<T extends Unknown> = Type<"set", SetDefinition<T> & {value: T}, NativeSet<Value<T>>>
	export const set = rcSet


	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface StructDefinition extends BaseTypeDefinition {}
	export type StructFields = {readonly [k: string]: Unknown}
	export type Struct<F extends StructFields> = Type<"struct", StructDefinition & {fields: Readonly<F>}, {
		[k in keyof F]: Value<F[k]>
	}>
	export const struct = rcStruct
	export const structFields = rcStructFields


	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface TupleDefinition extends BaseTypeDefinition {}
	export type TupleValue<T extends readonly Unknown[]> = T extends readonly [infer V extends Unknown, ...(infer R extends readonly Unknown[])]
		? [Value<V>, ...TupleValue<R>]
		: []
	export type Tuple<T extends readonly Unknown[]> = Type<"tuple", TupleDefinition & {components: T}, TupleValue<T>>
	export const tuple = rcTuple


	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface UnionDefinition extends BaseTypeDefinition {}
	export type Union<T extends Unknown> = Type<"union", UnionDefinition & {components: T[]}, Value<T>>
	export const union = rcUnion

	/** A type union of all the types defined by this library */
	// eslint-disable-next-line @typescript-eslint/ban-types
	export type Any = RC.Array<Unknown> | RoArray<Unknown> | Binary | ClassInstance<unknown> | Date | Constant<Constantable> | Intersection<Unknown> | Map<Unknown, Unknown> | ObjectMap<ObjectMapKeyType, Unknown> | String | Number | Int | Bool | Set<Unknown> | Struct<StructFields> | Tuple<Unknown[]> | Union<Unknown>


	export type OptionalDefaultValueVariant = "none" | "value"
	export type OptField<V extends Unknown> = Type<"optional", {defaultVariant: OptionalDefaultValueVariant}, Value<V> | undefined>
	export type RoField<V extends Unknown> = Type<"readonly", {type: "readonly"}, Value<V>>
	export type RoOptField<V extends Unknown> = Type<"readonly_optional", {defaultVariant: OptionalDefaultValueVariant}, Value<V> | undefined>
	export type ObjectFieldType = Any | OptField<Unknown> | RoField<Unknown> | RoOptField<Unknown>
}