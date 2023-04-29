/** This interface is base type for all the types that this library may define
 * This library is supposed to be extensible;
 * so, if any other library want to add custom properties - this interface should be used */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RCBaseTypeDefinition {
}

export type RCUnknown = RCType<string, RCBaseTypeDefinition, unknown>

export type RCType<T extends string, D extends RCBaseTypeDefinition, V> = Readonly<D> & {
	readonly type: T
	readonly getValue: () => V
}

export function resolveTwoArguments<A, B>(a: A | B, b: B | undefined, defaultA: A): [A, B] {
	if(b === undefined){
		return [defaultA, a as B]
	} else {
		return [a as A, b]
	}
}

// TODO: const type here, parcel don't support it yet
// and then we maybe could avoid explicitly declaring them
export function makeTypeDefiner<T extends string, D extends RCBaseTypeDefinition, R extends D, V>(
	type: T,
	updater: (base: D) => R,
	getValue: (definition: R) => V
): RCTypeDefiner<D, RCType<T, R, V>> {
	return ((def?: D) => {
		if(def === undefined){
			def = {} as D
		}
		const result: RCType<T, R, V> = {
			...updater(def),
			getValue: () => getValue(result),
			type
		}
		return result
	})
}

export type RCTypeDefiner<D extends RCBaseTypeDefinition, R extends RCUnknown> = Record<string, never> extends D
	? (def?: D) => R
	: (def: D) => R

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RCTypeOfType<T extends RCType<string, RCBaseTypeDefinition, any>> = T extends RCType<string, RCBaseTypeDefinition, infer V> ? V : never