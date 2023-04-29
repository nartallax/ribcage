export function resolveTwoArguments<A, B>(a: A | B, b: B | undefined, defaultA: A): [A, B] {
	if(b === undefined){
		return [defaultA, a as B]
	} else {
		return [a as A, b]
	}
}