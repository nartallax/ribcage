import {RCType, RCTypeOfType, RCUnknown} from "src/types/base"

type C = {readonly [k: string]: RCUnknown}

type NS<F> = {normal: F}
type NR<F> = {[k in keyof F]: F[k]}
type RS<F> = {ro: F}
type RR<F> = {readonly [k in keyof F]: F[k]}
type OS<F> = {opt: F}
type ODS<F> = {optDefault: F}
type OR<F extends C> = {[k in keyof F]?: F[k]}
type ROS<F> = {roOpt: F}
type RODS<F> = {roOptDefault: F}
type ROR<F extends C> = {readonly [k in keyof F]?: F[k]}

// yup, this is madness
// I can't just have one overload that accepts object with all-optional fields
// because then types of fields that are not present in actual call will be inferred as Record<string, undefined>
// (or something like that)
// and that will break result type, adding index signature where it shouldn't be
// (generation script below)

export function rcStructFields<N extends C>(fields: NS<N>): NR<N>
export function rcStructFields<O extends C>(fields: OS<O>): OR<O>
export function rcStructFields<OD extends C>(fields: ODS<OD>): OR<OD>
export function rcStructFields<R extends C>(fields: RS<R>): RR<R>
export function rcStructFields<RO extends C>(fields: ROS<RO>): ROR<RO>
export function rcStructFields<ROD extends C>(fields: RODS<ROD>): ROR<ROD>
export function rcStructFields<N extends C, ROD extends C>(fields: NS<N> & RODS<ROD>): NR<N> & ROR<ROD>
export function rcStructFields<N extends C, RO extends C>(fields: NS<N> & ROS<RO>): NR<N> & ROR<RO>
export function rcStructFields<N extends C, OD extends C>(fields: NS<N> & ODS<OD>): NR<N> & OR<OD>
export function rcStructFields<N extends C, O extends C>(fields: NS<N> & OS<O>): NR<N> & OR<O>
export function rcStructFields<N extends C, R extends C>(fields: NS<N> & RS<R>): NR<N> & RR<R>
export function rcStructFields<O extends C, ROD extends C>(fields: OS<O> & RODS<ROD>): OR<O> & ROR<ROD>
export function rcStructFields<O extends C, RO extends C>(fields: OS<O> & ROS<RO>): OR<O> & ROR<RO>
export function rcStructFields<O extends C, OD extends C>(fields: OS<O> & ODS<OD>): OR<O> & OR<OD>
export function rcStructFields<OD extends C, ROD extends C>(fields: ODS<OD> & RODS<ROD>): OR<OD> & ROR<ROD>
export function rcStructFields<OD extends C, RO extends C>(fields: ODS<OD> & ROS<RO>): OR<OD> & ROR<RO>
export function rcStructFields<R extends C, ROD extends C>(fields: RS<R> & RODS<ROD>): RR<R> & ROR<ROD>
export function rcStructFields<R extends C, RO extends C>(fields: RS<R> & ROS<RO>): RR<R> & ROR<RO>
export function rcStructFields<R extends C, OD extends C>(fields: RS<R> & ODS<OD>): RR<R> & OR<OD>
export function rcStructFields<R extends C, O extends C>(fields: RS<R> & OS<O>): RR<R> & OR<O>
export function rcStructFields<RO extends C, ROD extends C>(fields: ROS<RO> & RODS<ROD>): ROR<RO> & ROR<ROD>
export function rcStructFields<N extends C, RO extends C, ROD extends C>(fields: NS<N> & ROS<RO> & RODS<ROD>): NR<N> & ROR<RO> & ROR<ROD>
export function rcStructFields<N extends C, OD extends C, ROD extends C>(fields: NS<N> & ODS<OD> & RODS<ROD>): NR<N> & OR<OD> & ROR<ROD>
export function rcStructFields<N extends C, O extends C, ROD extends C>(fields: NS<N> & OS<O> & RODS<ROD>): NR<N> & OR<O> & ROR<ROD>
export function rcStructFields<N extends C, R extends C, ROD extends C>(fields: NS<N> & RS<R> & RODS<ROD>): NR<N> & RR<R> & ROR<ROD>
export function rcStructFields<N extends C, OD extends C, RO extends C>(fields: NS<N> & ODS<OD> & ROS<RO>): NR<N> & OR<OD> & ROR<RO>
export function rcStructFields<N extends C, O extends C, RO extends C>(fields: NS<N> & OS<O> & ROS<RO>): NR<N> & OR<O> & ROR<RO>
export function rcStructFields<N extends C, R extends C, RO extends C>(fields: NS<N> & RS<R> & ROS<RO>): NR<N> & RR<R> & ROR<RO>
export function rcStructFields<N extends C, O extends C, OD extends C>(fields: NS<N> & OS<O> & ODS<OD>): NR<N> & OR<O> & OR<OD>
export function rcStructFields<N extends C, R extends C, OD extends C>(fields: NS<N> & RS<R> & ODS<OD>): NR<N> & RR<R> & OR<OD>
export function rcStructFields<N extends C, R extends C, O extends C>(fields: NS<N> & RS<R> & OS<O>): NR<N> & RR<R> & OR<O>
export function rcStructFields<O extends C, RO extends C, ROD extends C>(fields: OS<O> & ROS<RO> & RODS<ROD>): OR<O> & ROR<RO> & ROR<ROD>
export function rcStructFields<O extends C, OD extends C, ROD extends C>(fields: OS<O> & ODS<OD> & RODS<ROD>): OR<O> & OR<OD> & ROR<ROD>
export function rcStructFields<O extends C, OD extends C, RO extends C>(fields: OS<O> & ODS<OD> & ROS<RO>): OR<O> & OR<OD> & ROR<RO>
export function rcStructFields<OD extends C, RO extends C, ROD extends C>(fields: ODS<OD> & ROS<RO> & RODS<ROD>): OR<OD> & ROR<RO> & ROR<ROD>
export function rcStructFields<R extends C, RO extends C, ROD extends C>(fields: RS<R> & ROS<RO> & RODS<ROD>): RR<R> & ROR<RO> & ROR<ROD>
export function rcStructFields<R extends C, OD extends C, ROD extends C>(fields: RS<R> & ODS<OD> & RODS<ROD>): RR<R> & OR<OD> & ROR<ROD>
export function rcStructFields<R extends C, O extends C, ROD extends C>(fields: RS<R> & OS<O> & RODS<ROD>): RR<R> & OR<O> & ROR<ROD>
export function rcStructFields<R extends C, OD extends C, RO extends C>(fields: RS<R> & ODS<OD> & ROS<RO>): RR<R> & OR<OD> & ROR<RO>
export function rcStructFields<R extends C, O extends C, RO extends C>(fields: RS<R> & OS<O> & ROS<RO>): RR<R> & OR<O> & ROR<RO>
export function rcStructFields<R extends C, O extends C, OD extends C>(fields: RS<R> & OS<O> & ODS<OD>): RR<R> & OR<O> & OR<OD>
export function rcStructFields<N extends C, OD extends C, RO extends C, ROD extends C>(fields: NS<N> & ODS<OD> & ROS<RO> & RODS<ROD>): NR<N> & OR<OD> & ROR<RO> & ROR<ROD>
export function rcStructFields<N extends C, O extends C, RO extends C, ROD extends C>(fields: NS<N> & OS<O> & ROS<RO> & RODS<ROD>): NR<N> & OR<O> & ROR<RO> & ROR<ROD>
export function rcStructFields<N extends C, R extends C, RO extends C, ROD extends C>(fields: NS<N> & RS<R> & ROS<RO> & RODS<ROD>): NR<N> & RR<R> & ROR<RO> & ROR<ROD>
export function rcStructFields<N extends C, O extends C, OD extends C, ROD extends C>(fields: NS<N> & OS<O> & ODS<OD> & RODS<ROD>): NR<N> & OR<O> & OR<OD> & ROR<ROD>
export function rcStructFields<N extends C, R extends C, OD extends C, ROD extends C>(fields: NS<N> & RS<R> & ODS<OD> & RODS<ROD>): NR<N> & RR<R> & OR<OD> & ROR<ROD>
export function rcStructFields<N extends C, R extends C, O extends C, ROD extends C>(fields: NS<N> & RS<R> & OS<O> & RODS<ROD>): NR<N> & RR<R> & OR<O> & ROR<ROD>
export function rcStructFields<N extends C, O extends C, OD extends C, RO extends C>(fields: NS<N> & OS<O> & ODS<OD> & ROS<RO>): NR<N> & OR<O> & OR<OD> & ROR<RO>
export function rcStructFields<N extends C, R extends C, OD extends C, RO extends C>(fields: NS<N> & RS<R> & ODS<OD> & ROS<RO>): NR<N> & RR<R> & OR<OD> & ROR<RO>
export function rcStructFields<N extends C, R extends C, O extends C, RO extends C>(fields: NS<N> & RS<R> & OS<O> & ROS<RO>): NR<N> & RR<R> & OR<O> & ROR<RO>
export function rcStructFields<N extends C, R extends C, O extends C, OD extends C>(fields: NS<N> & RS<R> & OS<O> & ODS<OD>): NR<N> & RR<R> & OR<O> & OR<OD>
export function rcStructFields<O extends C, OD extends C, RO extends C, ROD extends C>(fields: OS<O> & ODS<OD> & ROS<RO> & RODS<ROD>): OR<O> & OR<OD> & ROR<RO> & ROR<ROD>
export function rcStructFields<R extends C, OD extends C, RO extends C, ROD extends C>(fields: RS<R> & ODS<OD> & ROS<RO> & RODS<ROD>): RR<R> & OR<OD> & ROR<RO> & ROR<ROD>
export function rcStructFields<R extends C, O extends C, RO extends C, ROD extends C>(fields: RS<R> & OS<O> & ROS<RO> & RODS<ROD>): RR<R> & OR<O> & ROR<RO> & ROR<ROD>
export function rcStructFields<R extends C, O extends C, OD extends C, ROD extends C>(fields: RS<R> & OS<O> & ODS<OD> & RODS<ROD>): RR<R> & OR<O> & OR<OD> & ROR<ROD>
export function rcStructFields<R extends C, O extends C, OD extends C, RO extends C>(fields: RS<R> & OS<O> & ODS<OD> & ROS<RO>): RR<R> & OR<O> & OR<OD> & ROR<RO>
export function rcStructFields<N extends C, O extends C, OD extends C, RO extends C, ROD extends C>(fields: NS<N> & OS<O> & ODS<OD> & ROS<RO> & RODS<ROD>): NR<N> & OR<O> & OR<OD> & ROR<RO> & ROR<ROD>
export function rcStructFields<N extends C, R extends C, OD extends C, RO extends C, ROD extends C>(fields: NS<N> & RS<R> & ODS<OD> & ROS<RO> & RODS<ROD>): NR<N> & RR<R> & OR<OD> & ROR<RO> & ROR<ROD>
export function rcStructFields<N extends C, R extends C, O extends C, RO extends C, ROD extends C>(fields: NS<N> & RS<R> & OS<O> & ROS<RO> & RODS<ROD>): NR<N> & RR<R> & OR<O> & ROR<RO> & ROR<ROD>
export function rcStructFields<N extends C, R extends C, O extends C, OD extends C, ROD extends C>(fields: NS<N> & RS<R> & OS<O> & ODS<OD> & RODS<ROD>): NR<N> & RR<R> & OR<O> & OR<OD> & ROR<ROD>
export function rcStructFields<N extends C, R extends C, O extends C, OD extends C, RO extends C>(fields: NS<N> & RS<R> & OS<O> & ODS<OD> & ROS<RO>): NR<N> & RR<R> & OR<O> & OR<OD> & ROR<RO>
export function rcStructFields<R extends C, O extends C, OD extends C, RO extends C, ROD extends C>(fields: RS<R> & OS<O> & ODS<OD> & ROS<RO> & RODS<ROD>): RR<R> & OR<O> & OR<OD> & ROR<RO> & ROR<ROD>
export function rcStructFields<N extends C, R extends C, O extends C, OD extends C, RO extends C, ROD extends C>(fields: NS<N> & RS<R> & OS<O> & ODS<OD> & ROS<RO> & RODS<ROD>): NR<N> & RR<R> & OR<O> & OR<OD> & ROR<RO> & ROR<ROD>
export function rcStructFields<N extends C, R extends C, O extends C, OD extends C, RO extends C, ROD extends C>(fields: Partial<NS<N> & RS<R> & OS<O> & ODS<OD> & ROS<RO> & RODS<ROD>>): NR<N> & RR<R> & OR<O> & OR<OD> & ROR<RO> & ROR<ROD> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result: any = {}
	for(const key in fields.normal ?? {}){
		result[key] = fields.normal![key]
	}
	for(const key in fields.opt ?? {}){
		result[key] = rcOpt("none", fields.opt![key]!)
	}
	for(const key in fields.optDefault ?? {}){
		result[key] = rcOpt("value", fields.optDefault![key]!)
	}
	for(const key in fields.ro ?? {}){
		result[key] = rcRo(fields.ro![key]!)
	}
	for(const key in fields.roOpt ?? {}){
		result[key] = rcRoOpt("none", fields.roOpt![key]!)
	}
	for(const key in fields.roOptDefault ?? {}){
		result[key] = rcRoOpt("value", fields.roOptDefault![key]!)
	}
	return result
}

type DefaultValueVariant = "none" | "value"

export type RCOptField<V extends RCUnknown> = RCType<"optional", {defaultVariant: DefaultValueVariant}, RCTypeOfType<V> | undefined>

function rcOpt<V extends RCUnknown>(defaultVariant: DefaultValueVariant, nestedType: V): RCOptField<V> {
	return {
		type: "optional",
		defaultVariant: defaultVariant,
		getValue: defaultVariant === "none" ? () => undefined : nestedType.getValue as () => RCTypeOfType<V>
	}
}

export type RCRoField<V extends RCUnknown> = RCType<"readonly", {type: "readonly"}, RCTypeOfType<V> | undefined>

function rcRo<T extends RCUnknown>(nestedType: T): RCRoField<T> {
	return {
		type: "readonly",
		getValue: nestedType.getValue as () => RCTypeOfType<T>
	}
}

export type RCRoOptField<V extends RCUnknown> = RCType<"readonly_optional", {defaultVariant: DefaultValueVariant}, RCTypeOfType<V> | undefined>

function rcRoOpt<V extends RCUnknown>(defaultVariant: DefaultValueVariant, nestedType: V): RCRoOptField<V> {
	return {
		defaultVariant,
		type: "readonly_optional",
		getValue: defaultVariant === "none" ? () => undefined : nestedType.getValue as () => RCTypeOfType<V>
	}
}

/*
// generation script:

const items = [
	{arg: "N", in: "NS", out: "NR"},
	{arg: "R", in: "RS", out: "RR"},
	{arg: "O", in: "OS", out: "OR"},
	{arg: "OD", in: "ODS", out: "OR"},
	{arg: "RO", in: "ROS", out: "ROR"},
	{arg: "ROD", in: "RODS", out: "ROR"}
]

function outputLine(pick) {
	const typeArgs = pick.map(x => `${x.arg} extends C`).join(", ")
	const paramType = pick.map(x => `${x.in}<${x.arg}>`).join(" & ")
	const resType = pick.map(x => `${x.out}<${x.arg}>`).join(" & ")
	console.log(`export function rcStructFields<${typeArgs}>(fields: ${paramType}): ${resType}`)
}

const picks = []
for(let combinationMask = 1; combinationMask < 2 << (items.length - 1); combinationMask++){
	const pick = []
	let rem = combinationMask
	for(let i = 0; rem > 0; i++){
		if(rem & 1){
			pick.push(items[i])
		}
		rem >>= 1
	}
	picks.push(pick)
}
picks.sort((a, b) => {
	if(a.length !== b.length){
		return a.length - b.length
	}
	return a[0].arg > b[0].arg ? 1 : -1
}).forEach(outputLine)
*/