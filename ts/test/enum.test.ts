import {describe, test} from "@nartallax/clamsensor"
import {rcEnum} from "src/types/enum"
import expect from "expect.js"

type CheckEquals<A, B> = A extends B ? B extends A ? true : false : false

describe("enums", () => {
	test("can declare enum property", () => {
		enum MyEnum {
			a = 5,
			b = "uwu",
			c = 10
		}
		const def = rcEnum(MyEnum)
		const value = def.getValue()
		expect(value).to.be(5) // not important probably...?
		// string enums don't have great typing it seems
		const check: CheckEquals<typeof value, 5 | 10 | string> = true
		expect(check).to.be(true)
		expect(rcEnum(MyEnum)).to.be(def)
	})
})