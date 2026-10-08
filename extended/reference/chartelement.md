---
title: "ChartElement"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/chartelement/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A chart as an HTML element: `<am5-chart>`, built from a JSON config.

```html
<am5-chart themes="Animated" style="height: 400px" config='{ "type": "PieChart", ... }'></am5-chart>
```

The config is given with the `config` attribute or property (an object or a JSON string), or loaded from a URL with `src`. Themes are not part of a config: set them with the `themes` property (theme classes), or with the `themes` attribute (names, for the script version, where each theme is a global). `renderer="svg"` draws the chart as SVG.

With script tags, load `index.js`, `plugins/json.js` and `element.js`, and then the chart types the config uses, e.g. `percent.js`.

The element dispatches `ready` when the chart is built, with `root` and `chart` in its `detail`, and `error` when it could not be. A config given in the page can be built before a script adds its listener: `whenReady()` works whenever it is called.

Without a height of its own, from CSS or its parent, the element is 400 pixels high.

_Since 5.21.0._ Docs: https://www.amcharts.com/docs/v5/getting-started/integrations/am5-chart-element/, https://www.amcharts.com/docs/v5/concepts/serializing/

## Import

```js
import * as am5element from "@amcharts/amcharts5/element";
```

## Inheritance

Extends: BaseElement

## Properties

Public properties (not settings):

- **chart** (`Entity`) — What the config built, usually the chart, once it is built.
- **config** (`string | object`) — The chart's JSON config: an object, or a JSON string. Setting it builds the chart again.
- **root** (`Root`) — The chart's root element, once it is built.
- **themes** (`(typeof Theme)[]`) — Themes for the chart, as theme classes, e.g. `[am5themes_Animated]`. Setting them builds the chart again.
