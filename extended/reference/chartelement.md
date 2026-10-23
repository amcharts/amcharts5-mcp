---
title: "ChartElement"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/chartelement/"
generatedFrom: "@amcharts/amcharts5@5.21.4"
---

A chart as an HTML element: `<am5-chart>`, built from a JSON config.

```html
<am5-chart themes="Animated" style="height: 400px" config='{ "type": "PieChart", ... }'></am5-chart>
```

The config is given with the `config` attribute or property (an object or a JSON string), or loaded from a URL with `src`. Themes are not part of a config: set them with the `themes` property (theme classes, or a class with its settings: `[am5themes_Adaptive, { baseColor: "#4150a0" }]`), or with the `themes` attribute (names, for the script version, where each theme is a global: `themes="Animated"`, or as JSON with settings: `themes='["Animated", ["Adaptive", { "baseColor": "#4150a0" }]]'`). `renderer="svg"` draws the chart as SVG.

A config names geodata and locales instead of carrying them (`"geoJSON": "am5geodata_worldLow"`). The script version defines them as globals; with npm imports, give them in the `resources` property: `element.resources = { am5geodata_worldLow }`.

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
- **resources** (`{ [name: string]: unknown; }`) — Objects the config names instead of carrying them: geodata packs and locales, by the names the config uses, e.g. `{ am5geodata_worldLow, am5locales_de_DE }`. Needed with npm imports; the script version defines them as globals. Setting them builds the chart again. _Since 5.21.4._
- **root** (`Root`) — The chart's root element, once it is built.
- **themes** (`ChartElementTheme[]`) — Themes for the chart: theme classes, e.g. `[am5themes_Animated]`, or a class with its settings, e.g. `[am5themes_Animated, [am5themes_Adaptive, { baseColor: "#4150a0" }]]`. Setting them builds the chart again.
