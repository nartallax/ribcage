import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {RC} from "src/ribcage"
import {rcClassInstance} from "src/types/class_instance"

type CheckEquals<A, B> = A extends B ? B extends A ? true : false : false

describe("class instance type", () => {
	class ZeroArgClass {
		count = 5
		logCount() {
			console.log(this.count)
		}
	}

	class OneArgClass {
		constructor(readonly height: number) {}
		logHeight() {
			console.log(this.height)
		}
	}

	test("can define simple class instance type", () => {
		const def = rcClassInstance(ZeroArgClass)
		const value = def.getValue()
		expect(value).to.eql(new ZeroArgClass())
		expect(value).to.be.a(ZeroArgClass)
		const check: CheckEquals<typeof value, ZeroArgClass> = true
		expect(check).to.be(true)
		expect(value).to.not.be(def.getValue())
	})

	test("can define class instance type when class constructor has parameters", () => {
		const def = rcClassInstance(OneArgClass)
		expect(def.getValue).throwError(/constructor expects more than zero arguments/)
		const check: CheckEquals<RC.Value<typeof def>, OneArgClass> = true
		expect(check).to.be(true)
	})

	test("can define class instance type when class constructor has parameters with default value", () => {
		const def = rcClassInstance(OneArgClass, {getDefault: () => new OneArgClass(10)})
		const value = def.getValue()
		expect(value).to.eql(new OneArgClass(10))
		expect(value).to.be.a(OneArgClass)
		const check: CheckEquals<typeof value, OneArgClass> = true
		expect(check).to.be(true)
		expect(value).to.not.be(def.getValue())
	})

	// test: class is not contravariant
	// if it is - this will be a type error
	const someClass: RC.Any = rcClassInstance(OneArgClass)
	void someClass
})