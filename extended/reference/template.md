---
title: "Template"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/template/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Settings, states, adapters and events shared by many objects, such as all columns of a series. A setting on the template reaches every object that uses it, unless the object has its own value.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **adapters** (`TemplateAdapters<E>`) — Adapters added to the objects that use the template.
- **entities** (`E[]`) — The objects that use the template.
- **events** (`EventDispatcher<Events<E, E["_events"]>>`) — Event listeners added to the objects that use the template.
- **setup** (`<O extends E>(entity: O) => void`) — A function called once for each object that uses the template, when the template is first applied to it.
- **states** (`TemplateStates<E>`) — States passed on to the objects that use the template.
