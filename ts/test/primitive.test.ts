import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcBool, rcInt, rcNumber, rcString} from "src/types/primitive"

type CheckEquals<A, B> = A extends B ? B extends A ? true : false : false

describe("primitive types", () => {
	test("can define string", () => {
		const def = rcString()
		const value = def.getValue()
		expect(value).to.be("")
		const check: CheckEquals<typeof value, string> = true
		expect(check).to.be(true)
	})

	test("can define string with default", () => {
		const def = rcString({default: "nya"})
		const value = def.getValue()
		expect(value).to.be("nya")
		const check: CheckEquals<typeof value, string> = true
		expect(check).to.be(true)
	})

	test("can define number", () => {
		const def = rcNumber()
		const value = def.getValue()
		expect(value).to.be(0)
		const check: CheckEquals<typeof value, number> = true
		expect(check).to.be(true)
	})

	test("can define number with default", () => {
		const def = rcNumber({default: 0.5})
		const value = def.getValue()
		expect(value).to.be(0.5)
		const check: CheckEquals<typeof value, number> = true
		expect(check).to.be(true)
	})

	test("can define int", () => {
		const def = rcInt()
		const value = def.getValue()
		expect(value).to.be(0)
		const check: CheckEquals<typeof value, number> = true
		expect(check).to.be(true)
	})

	test("can define int with default", () => {
		const def = rcInt({default: 10})
		const value = def.getValue()
		expect(value).to.be(10)
		const check: CheckEquals<typeof value, number> = true
		expect(check).to.be(true)
	})

	test("cannot define int with fractional default", () => {
		expect(() => rcInt({default: 3.5})).throwError(/non-integer default/)
	})

	test("can define boolean", () => {
		const def = rcBool()
		const value = def.getValue()
		expect(value).to.be(false)
		const check: CheckEquals<typeof value, boolean> = true
		expect(check).to.be(true)
	})

	test("can define boolean with default", () => {
		const def = rcBool({default: true})
		const value = def.getValue()
		expect(value).to.be(true)
		const check: CheckEquals<typeof value, boolean> = true
		expect(check).to.be(true)
	})
})