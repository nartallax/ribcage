import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcDate} from "src/types/date"

type CheckEquals<A, B> = A extends B ? B extends A ? true : false : false

describe("date type", () => {
	test("can describe date type", () => {
		const def = rcDate()
		const value = def.getValue()
		expect(value).to.eql(new Date(0))
		expect(value).to.be.a(Date)
		const check: CheckEquals<typeof value, Date> = true
		expect(check).to.be(true)

		expect(rcDate()).to.be(def)
	})

	test("can describe date type with default", () => {
		const def = rcDate({getDefault: () => new Date(12345)})
		const value = def.getValue()
		expect(value).to.eql(new Date(12345))
		expect(value).to.be.a(Date)
		const check: CheckEquals<typeof value, Date> = true
		expect(check).to.be(true)

		expect(rcDate()).not.to.be(def)
	})
})