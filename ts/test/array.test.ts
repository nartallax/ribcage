import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcArray, rcRoArray} from "src/types/array"
import {rcInt, rcString} from "src/types/primitive"

type IsRoArray<T, IfTrue, IfFalse> = readonly any[] extends T ? IfTrue : IfFalse

describe("array type", () => {

	test("array type describes simple type", () => {
		const arr = rcArray(rcInt())
		const instance: number[] = arr.getValue()
		expect(instance).to.eql([])
	})

	test("array type can take default", () => {
		const arr = rcArray(rcInt(), {getDefault: () => [1, 2, 3]})
		const instance: number[] = arr.getValue()
		expect(instance).to.eql([1, 2, 3])
	})

	test("array can be readonly", () => {
		const arr = rcRoArray(rcString())
		const instance = arr.getValue()
		expect(instance).to.eql([])
		const checkValue: IsRoArray<typeof instance, string, number> = "uwu"
		expect(checkValue).to.be("uwu")
	})

	test("readonly array can take default", () => {
		const arr = rcRoArray(rcString(), {getDefault: () => ["uwu", "owo"]})
		const instance = arr.getValue()
		expect(instance).to.eql(["uwu", "owo"])
		const checkValue: IsRoArray<typeof instance, string, number> = "uwu"
		expect(checkValue).to.be("uwu")
	})

})