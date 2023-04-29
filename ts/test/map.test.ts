import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcMap} from "src/types/map"
import {rcInt, rcString} from "src/types/primitive"

type CheckEquals<A, B> = A extends B ? B extends A ? true : false : false

describe("map type", () => {
	test("can declare simple map", () => {
		const def = rcMap({key: rcString(), value: rcInt()})
		const value = def.getValue()
		expect(value).to.eql(new Map())
		const check: CheckEquals<typeof value, Map<string, number>> = true
		expect(check).to.be(true)
		expect(value).to.not.be(def.getValue())
	})

	test("can declare simple map with default", () => {
		const def = rcMap({
			getDefault: () => new Map([["owo", 1], ["uwu", 5]]),
			key: rcString(),
			value: rcInt()
		})
		const value = def.getValue()
		expect(value).to.eql(new Map([["owo", 1], ["uwu", 5]]))
		const check: CheckEquals<typeof value, Map<string, number>> = true
		expect(check).to.be(true)
		expect(value).to.not.be(def.getValue())
	})
})