---
title: "PatternSet"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/patternset/"
scraped: "2026-03-15"
---

An object which holds list of Pattern objects and can serve them up in an interative way.

## Import

```javascript
// Import PatternSet
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Entity

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **color** (`Color`) — A base color to use for all patterns. Click here for more info
- **patterns** (`Pattern[]`) — List of colors in the set.
- **startIndex** (`undefined | number`) — Start iterating patterns from specific index.
- **step** (`undefined | number`) — Default 1 A step size when using next(). E.g. setting to 2 will make it return every second pattern in the list.
