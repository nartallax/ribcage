import {RCBaseTypeDefinition, RCType, RCTypeOfType, RCUnknown, resolveTwoArguments} from "src/types/base"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RCStructDefinition extends RCBaseTypeDefinition {}

type StructFieldsCap = {readonly [k: string]: RCUnknown}

// FIXME: remove this shit
// type IsOpt<T extends RCUnknown, IfTrue, IfFalse> = T extends {type: "optional"} ? IfTrue : IfFalse
// type IsRo<T extends RCUnknown, IfTrue, IfFalse> = T extends {type: "readonly"} ? IfTrue : IfFalse
// type IsRoOpt<T extends RCUnknown, IfTrue, IfFalse> = T extends {type: "readonly_optional"} ? IfTrue : IfFalse
// type IsNoMod<T extends RCUnknown, IfTrue, IfFalse> = IsOpt<T, IfFalse, IsRo<T, IfFalse, IsRoOpt<T, IfFalse, IfTrue>>>

// type RoKeys<T extends StructFieldsCap, K extends keyof T = keyof T> = K extends string ? IsRo<T[K], K, never> : never
// type OptKeys<T extends StructFieldsCap, K extends keyof T = keyof T> = K extends string ? IsOpt<T[K], K, never> : never
// type RoOptKeys<T extends StructFieldsCap, K extends keyof T = keyof T> = K extends string ? IsRoOpt<T[K], K, never> : never
// type NoModKeys<T extends StructFieldsCap> = Exclude<keyof T, RoKeys<T> | OptKeys<T> | RoOptKeys<T>>

// type StructByFields<F extends StructFieldsCap> = {
// 	[k in NoModKeys<F>]: RCTypeOfType<F[k]>
// } & {
// 	[k in OptKeys<F>]?: RCTypeOfType<F[k]>
// } & {
// 	readonly [k in RoKeys<F>]: RCTypeOfType<F[k]>
// } & {
// 	readonly [k in RoOptKeys<F>]?: RCTypeOfType<F[k]>
// }

// type StructByFields<F extends StructFieldsCap> = {
// 	[k in keyof F]?: IsOpt<F[k], RCTypeOfType<F[k]>, unknown>
// } & {
// 	readonly [k in keyof F]: IsRo<F[k], RCTypeOfType<F[k]>, unknown>
// } & {
// 	readonly [k in keyof F]?: IsRoOpt<F[k], RCTypeOfType<F[k]>, unknown>
// } & {
// 	[k in keyof F]: IsNoMod<F[k], RCTypeOfType<F[k]>, unknown>
// }

// type Repack<T> = {[k in keyof T]: T[k]}

export type RCStruct<F extends StructFieldsCap> = RCType<"struct", RCStructDefinition & {fields: Readonly<F>}, {
	// [k in keyof F]: k extends string ? F[k] extends RCUnknown ? RCTypeOfType<F[k]> : never : never
	[k in keyof F]: RCTypeOfType<F[k]>
}>

/** Struct is an object with fixed set of fields
 * (as opposed to object-map which fields can be determined at runtime) */
export function rcStruct<F extends StructFieldsCap>(base: RCStructDefinition, fields: F): RCStruct<F>
export function rcStruct<F extends StructFieldsCap>(fields: F): RCStruct<F>
export function rcStruct<F extends StructFieldsCap>(a: RCStructDefinition | F, b?: F): RCStruct<F> {
	const [def, fields] = resolveTwoArguments(a, b, {})

	return {
		...def,
		type: "struct",
		fields,
		getValue: () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const result: any = {}
			for(const key in fields){
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				result[key] = fields[key]!.getValue() as any
			}
			return result
		}
	}
}