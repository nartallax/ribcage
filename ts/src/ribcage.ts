/* eslint-disable @typescript-eslint/no-empty-interface */
import {rcArray, rcRoArray} from "src/types/array"
import {rcBinary} from "src/types/binary"
import {rcClassInstance} from "src/types/class_instance"
import {rcConstant} from "src/types/constant"
import {rcDate} from "src/types/date"
import {rcEnum} from "src/types/enum"
import {DefUnionToTypeIntersection, rcIntersection} from "src/types/intersection"
import {rcMap} from "src/types/map"
import {rcObjectMap} from "src/types/object_map"
import {rcBool, rcInt, rcNumber, rcString} from "src/types/primitive"
import {rcRecursiveType} from "src/types/recursive"
import {rcSet} from "src/types/set"
import {rcRoStruct, rcStruct} from "src/types/struct"
import {rcStructFields} from "src/types/struct_fields"
import {rcTuple} from "src/types/tuple"
import {rcConstUnion, rcKeyOf, rcUnion} from "src/types/union"

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


	export interface AnyConstructor<C>{
		new(...args: any[]): C
	}
	export interface ClassInstanceDefinition<C> extends BaseTypeDefinition {
		getDefault?: () => C
	}
	export interface ClassInstance<C = any> extends Type<"class_instance", ClassInstanceDefinition<C> & {cls: AnyConstructor<C>}, C> {}
	export const instance = rcClassInstance


	/** A type of value that can be a constant */
	export type Constantable = string | number | boolean | null | undefined
	// TODO: const T here..?
	export interface ConstantDefinition<T extends Constantable> extends BaseTypeDefinition {
		// this property doesn't make much sense on its own, and passing it won't do much
		// this property mostly exists to add generic type to the interface, for other libraries to use
		value?: T
	}
	export interface Constant<T extends Constantable = Constantable> extends Type<"constant", ConstantDefinition<T> & {value: T}, T> {}
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
		getDefault?: () => ObjectMapValue<K, V>
	}
	export interface ObjectMap<K extends ObjectMapKeyType = ObjectMapKeyType, V extends Unknown = Any> extends Type<"object_map", ObjectMapDefinition<V, K> & {key: K, value: V}, ObjectMapValue<K, V>> {}
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

	export type FieldsOf<T extends Struct> = T extends Struct<infer F> ? F : never
	export type KeyOf<T extends Struct> = keyof FieldsOf<T>
	export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

	export interface StructDefinition<F extends StructFields> extends BaseTypeDefinition {
		getDefault?: () => {[k in keyof F]: Value<F[k]>}
		extends?: readonly RC.Struct[]
	}
	export type StructFields<T extends ObjectFieldType = ObjectFieldType> = {readonly [k: string]: T}
	// it may be very tempting to just extract value of struct into its own type
	// but, by doing that, we'll break some of delicate parts of typescript devserver
	// which will lead to less elegant display of resulting type in hint
	// (like `{x: number}` vs `RC.StructType<{x: RC.Number}>`)
	export interface Struct<F extends StructFields = any> extends Type<"struct", StructDefinition<F> & {
		fields: Readonly<F>
	}, {[k in keyof F]: Value<F[k]>}>{}
	export interface RoStruct<F extends StructFields = any> extends Type<"struct", StructDefinition<F> & {
		fields: Readonly<F>
	}, {readonly [k in keyof F]: Value<F[k]>}>{}
	export const struct = rcStruct
	export const structFields = rcStructFields
	export const roStruct = rcRoStruct


	export interface TupleDefinition<T extends readonly Unknown[]> extends BaseTypeDefinition {
		getDefault?: () => TupleValue<T>
	}
	export type TupleValue<T extends readonly Unknown[]> = T extends readonly [infer V extends Unknown, ...(infer R extends readonly Unknown[])]
		? [Value<V>, ...TupleValue<R>]
		: []
	export interface Tuple<T extends readonly Unknown[] = readonly Any[]> extends Type<"tuple", TupleDefinition<T> & {components: T}, TupleValue<T>>{}
	export const tuple = rcTuple


	export interface UnionDefinition<T extends Unknown> extends BaseTypeDefinition {
		getDefault?: () => Value<T>
	}
	export interface Union<T extends Unknown = Any> extends Type<"union", UnionDefinition<T> & {components: T[]}, Value<T>>{}
	export const union = rcUnion
	export const constUnion = rcConstUnion
	export const enm = rcEnum
	export const keyOf = rcKeyOf

	export interface RecursiveTypeDefinition extends BaseTypeDefinition {}
	export interface Recursive extends Type<"recursive", RecursiveTypeDefinition & {getType: () => Unknown}, unknown>{}
	export const recursive = rcRecursiveType


	/** A type union of all the types defined by this library */
	export type Any = Array | RoArray | Binary | ClassInstance | Date | Constant | Intersection | Map | ObjectMap | String | Number | Int | Bool | Set | Struct | RoStruct | Tuple | Union | Recursive


	export type OptionalDefaultValueVariant = "none" | "value"
	export interface OptField<V extends Unknown = Any> extends Type<"optional", {defaultVariant: OptionalDefaultValueVariant, value: V}, Value<V> | undefined>{}
	export interface RoField<V extends Unknown = Any> extends Type<"readonly", {value: V}, Value<V>>{}
	export interface RoOptField<V extends Unknown = Any> extends Type<"readonly_optional", {defaultVariant: OptionalDefaultValueVariant, value: V}, Value<V> | undefined>{}
	export type ObjectFieldType<V extends Unknown = Any> = V | OptField<V> | RoField<V> | RoOptField<V>
}