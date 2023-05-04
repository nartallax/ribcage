import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcBinary} from "src/types/binary"

describe("binary type", () => {
	test("describes simple byte array", () => {
		const def = rcBinary()
		const value = def.getValue()
		expect(value.length).to.be(0)
		expect(value).to.be.an(Uint8Array)

		expect(rcBinary()).to.be(def)
	})

	test("describes simple byte array with default", () => {
		const def = rcBinary({getDefault: () => new Uint8Array([1, 2, 3])})
		const valueA = def.getValue()
		expect(valueA.length).to.be(3)
		expect(valueA).to.be.an(Uint8Array)
		const valueB = def.getValue()
		expect(valueA).to.eql(valueB)
		expect(valueA).to.not.be(valueB)

		expect(rcBinary({getDefault: () => new Uint8Array()})).to.not.be(def)
	})
})