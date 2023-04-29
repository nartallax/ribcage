import {describe, test} from "@nartallax/clamsensor"
import expect from "expect.js"
import {RC} from "src/ribcage"
import {rcInt} from "src/types/primitive"
import {rcRecursiveType} from "src/types/recursive"
import {rcStruct} from "src/types/struct"
import {rcStructFields} from "src/types/struct_fields"

describe("recursive type definition", () => {
	test("can describe simple recursive type", () => {
		// linked list
		const def: RC.Struct<{value: RC.Int, next?: RC.Unknown}> = rcStruct(rcStructFields({
			normal: {
				value: rcInt()
			},
			opt: {
				next: rcRecursiveType(() => def)
			}
		}))
		const value = def.getValue()
		expect(value).to.eql({value: 0})
		value.next = {value: 5, next: {value: 10}}
		expect(value).to.eql({value: 0, next: {value: 5, next: {value: 10}}})
	})
})