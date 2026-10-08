---
title: "object"
type: "namespace"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Helpers exported as `am5.object`.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.object.…
```

## Functions

- `copy<O>(object: O): O` — Returns a shallow copy of the object.
- `each<O>(object: O, f: <K extends keyof O>(key: K, value: Exclude<O[K], undefined>) => void): void` — Iterates through all properties of the object calling `f` for each of them.
- `eachContinue<Object>(object: Object, fn: <Key extends Keyof<Object>>(key: Key, value: Object[Key]) => boolean): void` — Iterates through all properties of the object calling `fn` for each of them.
- `eachOrdered<Object>(object: Object, fn: <Key extends Keyof<Object>>(key: Key, value: Object[Key]) => void, ord: (a: Keyof<Object>, b: Keyof<Object>) => number): void` — Orders object properties using custom `ord` function and iterates through them calling `fn` for each of them.
- `entries<O>(object: O): Array<[Keyof<O>, O[Keyof<O>]]>` — Returns an array of object's own enumerable [key, value] pairs.
- `hasKey<Object, Key extends keyof Object>(object: Object, key: Key): boolean` — Checks if `object` has a specific `key`.
- `keys<O>(object: O): Array<Keyof<O>>` — Returns an array of object's own enumerable property names.
- `keysOrdered<Object>(object: Object, order: (a: Keyof<Object>, b: Keyof<Object>) => number): Array<Keyof<Object>>` — Returns an array of object's property names ordered using specific ordering function.
- `softCopyProperties(source: Object, target: Object): Object` — Copies each property of `source` that is not `null` or `undefined` to `target`, where `target` has no value for it yet.
