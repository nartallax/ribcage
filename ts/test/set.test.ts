import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcInt} from "src/types/primitive"
import {rcSet} from "src/types/set"

type CheckEquals<A, B> = A extends B ? B extends A ? true : false : false

describe("set type", () => {
	test("can declare simple set", () => {
		const def = rcSet(rcInt())
		const value = def.getValue()
		expect(value).to.eql(new Set())
		expect(value).to.be.a(Set)
		const check: CheckEquals<typeof value, Set<number>> = true
		expect(check).to.be(true)
		expect(value).to.not.be(def.getValue())
	})

	test("can declare simple set with default", () => {
		const def = rcSet(rcInt(), {getDefault: () => new Set([1, 2, 5])})
		const value = def.getValue()
		expect(value).to.eql(new Set([1, 2, 5]))
		expect(value).to.be.a(Set)
		const check: CheckEquals<typeof value, Set<number>> = true
		expect(check).to.be(true)
		expect(value).to.not.be(def.getValue())
	})
})