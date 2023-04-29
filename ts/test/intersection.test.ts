import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {RCTypeOfType} from "src/types/base"
import {rcConstant} from "src/types/constant"
import {rcIntersection} from "src/types/intersection"
import {rcInt, rcString} from "src/types/primitive"
import {rcStruct} from "src/types/struct"

type IfEquals<A, B, T, F> = A extends B ? B extends A ? T : F : F

describe("intersection type", () => {
	test("declares simple object intersection type", () => {
		const def = rcIntersection([
			rcStruct({x: rcInt({default: -1})}),
			rcStruct({y: rcInt({default: 3})})
		])
		const value = def.getValue()
		expect(value).to.eql({x: -1, y: 3})
		const check: IfEquals<{x: number, y: number}, typeof value, 5, 6> = 5
		expect(check).to.be(5)
	})

	test("can declare intersections of strings", () => {
		const def = rcIntersection([
			rcConstant("owo" as const),
			rcString()
		])
		expect(def.getValue).throwError(/Cannot form value/)
		const check: IfEquals<RCTypeOfType<typeof def>, "owo", true, false> = true
		expect(check).to.be(true)
	})

	test("can declare intersections of strings with default", () => {
		// doesn't make much sense, but should work anyway
		const def = rcIntersection({getDefault: () => "owo" as const}, [
			rcConstant("owo" as const),
			rcString()
		])
		expect(def.getValue()).to.be("owo")
	})

})