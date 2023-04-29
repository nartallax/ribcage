import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcBool, rcInt, rcString} from "src/types/primitive"
import {rcTuple} from "src/types/tuple"

type CheckEquals<A, B> = A extends B ? B extends A ? true : false : false

describe("tuple type", () => {
	test("can declare simple union type", () => {
		const def = rcTuple([rcInt({default: 7}), rcString(), rcBool()] as const)
		const value = def.getValue()
		expect(value).to.eql([7, "", false])
		const check: CheckEquals<typeof value, [number, string, boolean]> = true
		expect(check).to.be(true)
	})
})