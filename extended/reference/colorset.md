---
title: "ColorSet"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/colorset/"
scraped: "2026-03-15"
---

An object which holds list of colors and can generate new ones.

## Import

```javascript
// Import ColorSet
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Entity

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **baseColor** (`Color`) — A base color to generate new colors from if colors is not specified.
- **colors** (`Color[]`) — List of colors in the set.
- **passOptions** (`IColorSetStepOptions`) — A set of tranformation to apply to base list of colors when the set runs out of colors and generates additional ones.
- **reuse** (`undefined | false | true`) — Default false If set to true, color set will reuse existing colors from the list inestead of generating new ones.
- **saturation** (`undefined | number`) — If set, each returned color will be applied saturation.
- **startIndex** (`undefined | number`) — Start iterating colors from specific index.
- **step** (`undefined | number`) — Default 1 A step size when using next(). E.g. setting to 2 will make it return every second color in the list.
