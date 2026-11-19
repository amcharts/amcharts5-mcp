---
title: "VerticalLayout"
type: "class"
source: "https://docs.amcharts.com/v5/reference/verticallayout/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Stacks a `Container`'s children from top to bottom. Children with a percent height share the height the others leave, in proportion to their percents. With the container's `direction: "rtl"`, children with no `x` of their own line up on the right.

Docs: https://docs.amcharts.com/v5/concepts/common-elements/containers/#layout

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.VerticalLayout.new(root, { /* settings */ });
```

## Inheritance

Extends: Layout → Entity → Settings

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
