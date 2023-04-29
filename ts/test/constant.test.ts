import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcConstant} from "src/types/constant"

type IfEquals<A, B, T, F> = A extends B ? B extends A ? T : F : F

describe("constant type", () => {
	test("declares simple constant type", () => {
		const def = rcConstant(5 as const)
		const v = def.getValue()
		expect(v).to.be(5)
		const check: IfEquals<typeof v, 5, string, number> = "owo"
		expect(check).to.be("owo")
	})
})