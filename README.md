# Ribcage

When you need your types to stay in runtime.  

Ribcage is a library that allows you to describe shapes of values just like you would in TypeScript. The only difference is that this description will stay in runtime, allowing for (more elegant) implementation of stuff like validation, serialization, DB interfaces, and any other purpose for which you may need to know the structure of the type.  

This library on its own doesn't do much. It allows to define the shape, produce the type this shape describes, and obtain "default" value; that's it. But this library meant to be extensible; that means that other libraries are encouraged to extend its interfaces, allowing to attach custom properties and using shape data structures.  

## Install

```bash
npm install @nartallax/ribcage
```

## Use

Most of the types this library provides are directly mapped to TypeScript types, so you will find a lot of familiar stuff.  
Short usage example:  

```typescript
import {RC} from "@nartallax/ribcage"

// here we define a structure.
// structure is an object with known set of fields
const CoordsDef = RC.struct({
	// next we define two fields of the structure that are numbers, `x` and `y`
	x: RC.number(),
	y: RC.number(),
	// we have more primitive types, for example, string
	name: RC.string(),
	// by default all fields of the structure is non-readonly and non-optional
	// we can change that by using `RC.structFields`
	// here we declare a structure all fields of which are optional
	geodata: RC.struct(RC.structFields({
		opt: {
			city: RC.string(),
			// this library have union/intersection types
			// for example, here we declare field of type `string | null`
			// (keep in mind that this field is also optional, so it will be `string | null | undefined`)
			district: RC.union([RC.constant(null), RC.string()])
		}
	})),
	// we can declare array of string like this
	addressParts: RC.array(RC.string())
})

// by using type inferrence and `RC.Value` type expression, 
// we can get type of value that is described by that type shape
// it will be something like `{x: number, y: number, name: string, ...etc... }`
type Coords = RC.Value<typeof CoordsDef>

function makeCoords(): Coords {
	// every type shape has `.getValue()` method
	// this method creates the value which structure is described by the shape
	return CoordsDef.getValue()

	// it's not always obvious what the default value will be.
	// sometimes you can control that by passing another parameter into shape-creating function
	// in case of optional parameters of structures, there are `optDefault` and `roOptDefault` fields
	// that will return value of the nested type instead of undefined
}
```

There are other types not listed here, like `RC.set` or `RC.Date`. I think they are self-explanatory; feel free to discover typings to find out more.  

## Recursive types

Support of recursive types is kinda bad. You can still have them, but you'll need to type stuff explicitly.  
In following example a structure of simple linked list is defined; as you can see, for that you need to type `def` explicitly; this also means that `RC.Value` won't be as effective:  

```typescript
import {RC} from "@nartallax/ribcage"

// linked list
const def: RC.Struct<{value: RC.Int, next?: RC.Unknown}> = RC.Struct(RC.StructFields({
	normal: { value: RC.Int() },
	opt: { next: RC.RecursiveType(() => def) }
}))
```

## Generic types

Right now there's no way to define proper generic type.  
However, you can create a function that will create a type for you, which is, in a way, a generic type:  

```typescript
import {RC} from "@nartallax/ribcage"

function tupleOfTwo<T extends RC.Unknown>(type: T): RC.Tuple<readonly [T, T]>{
	return RC.Tuple([type, type])
}
```

## Naming

This library is just a skeleton; not very useful on its own, but allows more of the "meat" to be attached to its parts.  
