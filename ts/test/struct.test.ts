import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {rcInt, rcNumber} from "src/types/primitive"
import {rcStruct} from "src/types/struct"
import {rcStructFields} from "src/types/struct_fields"

type IsOptFields<T, IfTrue, IfFalse> = Partial<T> extends T ? IfTrue : IfFalse

describe("struct type", () => {
	test("can declare simple struct", () => {
		const struct = rcStruct({
			x: rcInt(),
			y: rcNumber({default: 5})
		})
		const instance: {x: number, y: number} = struct.getValue()
		expect(instance).to.eql({x: 0, y: 5})
		instance.x = 10
		expect(instance).to.eql({x: 10, y: 5})
	})

	test("can declare optional fields", () => {
		const struct = rcStruct(rcStructFields({
			normal: {y: rcNumber({default: 5})},
			opt: {x: rcInt()},
			optDefault: {z: rcInt()}
		}))
		const instance = struct.getValue()
		expect(instance).to.eql({x: undefined, y: 5, z: 0})
		instance.z = undefined
		const check: IsOptFields<typeof instance, string, number> = 321
		expect(check).to.be(321)

		const struct2 = rcStruct(rcStructFields({opt: {x: rcInt()}}))
		const instance2 = struct2.getValue()
		const check2: IsOptFields<typeof instance2, string, number> = "uwu"
		expect(check2).to.be("uwu")
	})

	test("can declare readonly fields", () => {
		const struct = rcStruct(rcStructFields({
			normal: {x: rcInt()},
			ro: {y: rcInt()}
		}))
		const instance = struct.getValue()
		expect(instance).to.eql({x: 0, y: 0})
		instance.x = 10
		// unfortunately, I failed to create a type that will help me check actual readonliness
		// so let's just hope that I won't break that lol
	})

	test("can declare optional readonly fields", () => {
		const struct = rcStruct(rcStructFields({
			roOpt: {x: rcInt()},
			roOptDefault: {y: rcInt()}
		}))
		const instance = struct.getValue()
		expect(instance).to.eql({x: undefined, y: 0})
		const check: IsOptFields<typeof instance, string, number> = "owo"
		expect(check).to.be("owo")
	})

	test("two instances of the struct are referencially different", () => {
		const def = rcStruct({
			x: rcInt(),
			y: rcInt()
		})

		const instanceA = def.getValue()
		const instanceB = def.getValue()

		expect(instanceA).to.eql(instanceB)
		expect(instanceA).to.not.be(instanceB)
	})

})