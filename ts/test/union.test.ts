import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcConstant} from "src/types/constant"
import {rcInt} from "src/types/primitive"
import {rcStruct} from "src/types/struct"
import {rcUnion} from "src/types/union"

type CheckEquals<A, B> = A extends B ? B extends A ? true : false : false

describe("union type", () => {
	test("can declare union type of object", () => {
		const def = rcUnion([
			rcStruct({x: rcInt({default: 5})}),
			rcStruct({y: rcInt({default: 10})})
		])
		const value = def.getValue()
		expect(value).to.eql({x: 5})
		const check: CheckEquals<typeof value, {x: number} | {y: number}> = true
		expect(check).to.be(true)
	})

	test("can declare union type of constants", () => {
		const def = rcUnion([
			rcConstant("owo" as const),
			rcConstant("uwu" as const)
		])
		const value = def.getValue()
		expect(value).to.be("owo")
		const check: CheckEquals<typeof value, "owo" | "uwu"> = true
		expect(check).to.be(true)
	})

	test("can declare union type of single element", () => {
		// this doesn't make much sense
		// but for extensibility purposes I'm not simplifying this to just that single type
		// it should behave the same anyway
		const def = rcUnion([rcConstant(5 as const)])
		const value = def.getValue()
		expect(value).to.be(5)
		const check: CheckEquals<typeof value, 5> = true
		expect(check).to.be(true)
	})

	test("cannot declare union type of zero elements", () => {
		expect(() => rcUnion([])).throwError(/zero components/)
	})
})