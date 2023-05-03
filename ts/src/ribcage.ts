/* eslint-disable @typescript-eslint/no-empty-interface */
import {rcArray, rcRoArray} from "src/types/array"
import {rcBinary} from "src/types/binary"
import {rcClassInstance} from "src/types/class_instance"
import {rcConstant} from "src/types/constant"
import {rcDate} from "src/types/date"
import {DefUnionToTypeIntersection, rcIntersection} from "src/types/intersection"
import {rcMap} from "src/types/map"
import {rcObjectMap} from "src/types/object_map"
import {rcBool, rcInt, rcNumber, rcString} from "src/types/primitive"
import {rcRecursiveType} from "src/types/recursive"
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
	export type Unknown = Type<string, unknown, unknown>


	export interface ArrayDefinition<V extends Unknown> extends BaseTypeDefinition {
		getDefault?: () => Value<V>[]
	}
	// terminal shape types NEEDS to be interfaces
	// because with interface you can do `type Any = Array<Any>`
	// if Array is type expression - you cannot do that because of recursive type definition
	export interface Array<V extends Unknown = Any> extends Type<"array", ArrayDefinition<V> & {valueType: V}, Value<V>[]> {}
	export interface RoArray<V extends Unknown = Any> extends Type<"array", ArrayDefinition<V> & {valueType: V}, readonly Value<V>[]> {}
	export const array = rcArray
	export const roArray = rcRoArray


	export interface BinaryDefinition extends BaseTypeDefinition {
		getDefault?: () => Uint8Array
	}
	export interface Binary extends Type<"binary", BinaryDefinition, Uint8Array> {}
	export const binary = rcBinary


	export interface ClassInstanceDefinition<C> extends BaseTypeDefinition {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		cls: {new(...args: any[]): C}
		getDefault?: () => C
	}
	export interface ClassInstance<C = unknown> extends Type<"class_instance", ClassInstanceDefinition<C>, C> {}
	export const classInstance = rcClassInstance


	/** A type of value that can be a constant */
	export type Constantable = string | number | boolean | null | undefined
	// TODO: const T here..?
	export interface ConstantDefinition extends BaseTypeDefinition {}
	export interface Constant<T extends Constantable = Constantable> extends Type<"constant", ConstantDefinition & {value: T}, T> {}
	export const constant = rcConstant


	export interface DateDefinition extends BaseTypeDefinition {
		getDefault?: () => NativeDate
	}
	export interface Date extends Type<"date", DateDefinition, NativeDate> {}
	export const date = rcDate


	export interface IntersectionDefinition<T extends Unknown> extends BaseTypeDefinition {
		getDefault?: () => DefUnionToTypeIntersection<T>
	}
	export interface Intersection<T extends Unknown = Any> extends Type<"intersection", IntersectionDefinition<T> & {components: T[]}, DefUnionToTypeIntersection<T>>{}
	export const intersection = rcIntersection


	export interface MapDefinition<K extends Unknown, V extends Unknown> extends BaseTypeDefinition {
		key: K
		value: V
		getDefault?: () => NativeMap<Value<K>, Value<V>>
	}
	export interface Map<K extends Unknown = Any, V extends Unknown = Any> extends Type<"map", MapDefinition<K, V>, NativeMap<Value<K>, Value<V>>>{}
	export const map = rcMap

	// eslint-disable-next-line @typescript-eslint/ban-types
	export type ObjectMapKeyType = String | Constant<string> | Union<String | Constant<string>>
	export type ObjectMapValue<K extends ObjectMapKeyType, V extends Unknown> = Record<Value<K>, Value<V>>
	export interface ObjectMapDefinition<V extends Unknown, K extends ObjectMapKeyType> extends BaseTypeDefinition {
		key?: K
		value: V
		getDefault?: () => ObjectMapValue<K, V>
	}
	export interface ObjectMap<K extends ObjectMapKeyType = ObjectMapKeyType, V extends Unknown = Any> extends Type<"object_map", ObjectMapDefinition<V, K> & {key: K}, ObjectMapValue<K, V>> {}
	export const objectMap = rcObjectMap


	export interface StringDefiniton extends BaseTypeDefinition {
		default?: string
	}
	export interface String extends Type<"string", StringDefiniton & {default: string}, string> {}
	export const string = rcString


	export interface NumberDefinition extends BaseTypeDefinition {
		default?: number
	}
	export interface Number extends Type<"number", NumberDefinition & {default: number}, number> {}
	export const number = rcNumber


	export interface IntDefinition extends NumberDefinition {}
	export interface Int extends Type<"int", IntDefinition & {default: number}, number>{}
	export const int = rcInt


	export interface BoolDefinition extends BaseTypeDefinition {
		default?: boolean
	}
	export interface Bool extends Type<"bool", BoolDefinition & {default: boolean}, boolean>{}
	export const bool = rcBool


	export interface SetDefinition<T extends Unknown> extends BaseTypeDefinition {
		getDefault?: () => NativeSet<Value<T>>
	}
	export interface Set<T extends Unknown = Any> extends Type<"set", SetDefinition<T> & {value: T}, NativeSet<Value<T>>>{}
	export const set = rcSet


	export interface StructDefinition extends BaseTypeDefinition {}
	export interface StructFields<T extends Unknown = ObjectFieldType>{readonly [k: string]: T}
	export interface Struct<F extends StructFields = StructFields> extends Type<"struct", StructDefinition & {fields: Readonly<F>}, {
		[k in keyof F]: Value<F[k]>
	}>{}
	export const struct = rcStruct
	export const structFields = rcStructFields


	export interface TupleDefinition extends BaseTypeDefinition {}
	export type TupleValue<T extends readonly Unknown[]> = T extends readonly [infer V extends Unknown, ...(infer R extends readonly Unknown[])]
		? [Value<V>, ...TupleValue<R>]
		: []
	export interface Tuple<T extends readonly Unknown[] = readonly Any[]> extends Type<"tuple", TupleDefinition & {components: T}, TupleValue<T>>{}
	export const tuple = rcTuple


	export interface UnionDefinition extends BaseTypeDefinition {}
	export interface Union<T extends Unknown = Any> extends Type<"union", UnionDefinition & {components: T[]}, Value<T>>{}
	export const union = rcUnion


	export interface RecursiveTypeDefinition extends BaseTypeDefinition {}
	export interface Recursive extends Type<"recursive", RecursiveTypeDefinition & {getType: () => Unknown}, unknown>{}
	export const recursive = rcRecursiveType


	/** A type union of all the types defined by this library */
	// eslint-disable-next-line @typescript-eslint/ban-types
	export type Any = Array | RoArray | Binary | ClassInstance | Date | Constant | Intersection | Map | ObjectMap | String | Number | Int | Bool | Set | Struct | Tuple | Union | Recursive


	export type OptionalDefaultValueVariant = "none" | "value"
	export interface OptField<V extends Unknown = Any> extends Type<"optional", {defaultVariant: OptionalDefaultValueVariant, value: V}, Value<V> | undefined>{}
	export interface RoField<V extends Unknown = Any> extends Type<"readonly", {value: V}, Value<V>>{}
	export interface RoOptField<V extends Unknown = Any> extends Type<"readonly_optional", {defaultVariant: OptionalDefaultValueVariant, value: V}, Value<V> | undefined>{}
	export type ObjectFieldType<V extends Unknown = Any> = V | OptField<V> | RoField<V> | RoOptField<V>
}