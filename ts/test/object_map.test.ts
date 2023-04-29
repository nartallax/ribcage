import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcConstant} from "src/types/constant"
import {rcObjectMap} from "src/types/object_map"
import {rcInt} from "src/types/primitive"
import {rcUnion} from "src/types/union"

type CheckEquals<A, B> = A extends B ? B extends A ? true : false : false

describe("object_map type", () => {
	test("defines object map", () => {
		const def = rcObjectMap({
			value: rcInt()
		})
		const value = def.getValue()
		expect(value).to.eql({})
		const check: CheckEquals<typeof value, Record<string, number>> = true
		expect(check).to.be(true)
	})

	test("defines object map with default", () => {
		const def = rcObjectMap({
			value: rcInt(),
			getDefault: () => ({ayaya: 15})
		})
		const value = def.getValue()
		expect(value).to.eql({ayaya: 15})
		const check: CheckEquals<typeof value, Record<string, number>> = true
		expect(check).to.be(true)
	})

	test("defines mapped type", () => {
		const def = rcObjectMap({
			key: rcUnion([rcConstant("uwu" as const), rcConstant("owo" as const)]),
			value: rcInt({default: 5})
		})
		const value = def.getValue()
		expect(value).to.eql({uwu: 5, owo: 5})
		const check: CheckEquals<typeof value, {uwu: number, owo: number}> = true
		expect(check).to.be(true)
	})

	test("defines mapped type with single key", () => {
		// why would anyone do that lol, that's just a struct
		const def = rcObjectMap({
			key: rcConstant("uwu" as const),
			value: rcInt({default: 6})
		})
		const value = def.getValue()
		expect(value).to.eql({uwu: 6})
		const check: CheckEquals<typeof value, {uwu: number}> = true
		expect(check).to.be(true)
	})
})