---
title: "The <am5-chart> Element"
source: "https://docs.amcharts.com/v5/getting-started/integrations/am5-chart-element/"
scraped: "2026-11-16"
---

> <am5-chart> is an HTML element that builds a chart from a JSON config. There is no root element to create and no chart code to write: put the element on the page and give it a config.

`<am5-chart>` is an HTML element that builds a chart from a [JSON config](https://docs.amcharts.com/v5/concepts/serializing/). There is no root element to create and no chart code to write: put the element on the page and give it a config.

> **Note:** The `<am5-chart>` element is available since version 5.21.0.

## Loading

With script tags, load `index.js`, `plugins/json.js` and `element.js`, in that order. Then load the files for the chart types the config uses, and any themes:

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/plugins/json.js"></script>
<script src="https://cdn.amcharts.com/lib/5/element.js"></script>
<script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
```

With npm, import `defineChartElement()` from the element module and call it once. The chart types a config uses are loaded automatically when the chart is built.

TypeScript:

```ts
import { defineChartElement } from "@amcharts/amcharts5/element";

defineChartElement();
```

JavaScript:

```js
import { defineChartElement } from "@amcharts/amcharts5/element";

defineChartElement();
```

> **Note:** In version 5.21.4 and earlier, apps bundled with esbuild drop a plain `import "@amcharts/amcharts5/element";` as unused, so `<am5-chart>` is never defined. Calling `defineChartElement()` works in every version.

## Adding a chart

The config can be given right in the `config` attribute, as a JSON string:

```html
<am5-chart config='{
  "type": "PieChart",
  "properties": {
    "series": [{
      "type": "PieSeries",
      "settings": { "valueField": "value", "categoryField": "category" },
      "properties": {
        "data": [
          { "category": "One", "value": 10 },
          { "category": "Two", "value": 9 },
          { "category": "Three", "value": 6 }
        ]
      }
    }]
  }
}'></am5-chart>
```

Or loaded from a file, with `src`:

```html
<am5-chart src="chart.json"></am5-chart>
```

In code, the `config` property takes an object or a JSON string:

TypeScript:

```ts
let element = document.createElement("am5-chart");

element.config = {
  type: "PieChart",
  properties: {
    series: [{
      type: "PieSeries",
      settings: { valueField: "value", categoryField: "category" },
      properties: {
        data: [
          { category: "One", value: 10 },
          { category: "Two", value: 9 },
          { category: "Three", value: 6 }
        ]
      }
    }]
  }
};

document.getElementById("chartdiv").appendChild(element);
```

JavaScript:

```js
var element = document.createElement("am5-chart");

element.config = {
  type: "PieChart",
  properties: {
    series: [{
      type: "PieSeries",
      settings: { valueField: "value", categoryField: "category" },
      properties: {
        data: [
          { category: "One", value: 10 },
          { category: "Two", value: 9 },
          { category: "Three", value: 6 }
        ]
      }
    }]
  }
};

document.getElementById("chartdiv").appendChild(element);
```

Changing the config, by attribute or property, builds the chart again. Removing the element from the page disposes the chart. Moving the element keeps it.

> **More info:** For the config format, see "[Serializing / JSON config](https://docs.amcharts.com/v5/concepts/serializing/)". To have the chart animate in when it loads, use the `autoAppear` setting in the config (more about it in "[Animations](https://docs.amcharts.com/v5/concepts/animations/)").

Example: [Chart as an HTML element](https://docs.amcharts.com/embeds/v5/chart-as-an-html-element/)

NOTE Complete configs to copy into the element are in the amCharts skill's JSON guide (`skill/json` in the amCharts MCP server, `references/json.md` in the skill): section "Complete configs" for XY, pie, flow and hierarchy charts, and section "Maps" for a world map colored by value or with a few countries highlighted.

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/plugins/json.js, https://cdn.amcharts.com/lib/5/element.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/percent.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// The <am5-chart> element builds a chart from a JSON config, with no root and
// no chart code. element.js defines it.
// https://docs.amcharts.com/v5/getting-started/integrations/am5-chart-element/
var element = document.createElement("am5-chart");

// Themes are not part of a config: give the element theme classes. The
// attribute themes="Animated" does the same.
element.themes = [am5themes_Animated];

// The chart as a JSON config. It can also be an attribute
// (<am5-chart config='{ ... }'>) or come from a file (<am5-chart src="chart.json">).
element.config = {
  type: "PieChart", // the class to create, by its name
  settings: {
    layout: { type: "VerticalLayout" }, // as root.verticalLayout: parts stacked top to bottom
    innerRadius: { type: "Percent", value: 50 } // am5.percent(50): a hole half the pie's radius, a donut
  },
  properties: {
    series: [
      {
        // created, then pushed into chart.series
        type: "PieSeries",
        // autoAppear animates the series in on load, as series.appear(1000, 100) would in code
        settings: {
          valueField: "value",
          categoryField: "category",
          autoAppear: true,
          appearDuration: 1000,
          appearDelay: 100
        },
        properties: {
          data: [
            // the slices, as series.data.setAll() would set them
            { value: 10, category: "One" },
            { value: 9, category: "Two" },
            { value: 6, category: "Three" },
            { value: 5, category: "Four" },
            { value: 4, category: "Five" },
            { value: 3, category: "Six" },
            { value: 1, category: "Seven" }
          ]
        }
      }
    ]
  }
};

// Once the chart is built, the element dispatches "ready", and element.chart
// and element.root hold it; element.whenReady() is a promise of both.

// Put it on the page: it fills its box, which needs a height
element.style.height = "100%";
document.getElementById("chartdiv").appendChild(element);
```

## Themes

Themes are not part of a config. With script tags, list theme names in the `themes` attribute, separated by spaces or commas. Each theme's file must be loaded first.

```html
<am5-chart src="chart.json" themes="Animated Dark"></am5-chart>
```

With npm, set theme classes on the `themes` property:

TypeScript:

```ts
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

element.themes = [am5themes_Animated];
```

JavaScript:

```js
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

element.themes = [am5themes_Animated];
```

A theme with settings, such as `Adaptive`, goes in as a pair: the theme and its settings.

TypeScript:

```ts
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Adaptive from "@amcharts/amcharts5/themes/Adaptive";

element.themes = [
  am5themes_Animated,
  [am5themes_Adaptive, { baseColor: "#4150a0" }]
];
```

JavaScript:

```js
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Adaptive from "@amcharts/amcharts5/themes/Adaptive";

element.themes = [
  am5themes_Animated,
  [am5themes_Adaptive, { baseColor: "#4150a0" }]
];
```

In the `themes` attribute, write such a list as JSON, with theme names:

```html
<am5-chart src="chart.json" themes='["Animated", ["Adaptive", { "baseColor": "#4150a0" }]]'></am5-chart>
```

> **Note:** Themes with settings are available since version 5.21.4. For the settings of `Adaptive` and `Monochrome`, see "[Themes](https://docs.amcharts.com/v5/concepts/themes/)".

## Maps and locales

A map's config names its geodata, e.g. `"geoJSON": "am5geodata_worldLow"`, and a config's `root` section can name a locale, e.g. `"locale": "am5locales_de_DE"`, instead of carrying them. With script tags, load their files, and the element finds them as globals:

```html
<script src="https://cdn.amcharts.com/lib/5/map.js"></script>
<script src="https://cdn.amcharts.com/lib/5/geodata/worldLow.js"></script>
<script src="https://cdn.amcharts.com/lib/5/locales/de_DE.js"></script>
```

With npm they are not globals. Import them and pass them in the `resources` property, under the names the config uses:

TypeScript:

```ts
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5locales_de_DE from "@amcharts/amcharts5/locales/de_DE";

element.resources = { am5geodata_worldLow, am5locales_de_DE };
```

JavaScript:

```js
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5locales_de_DE from "@amcharts/amcharts5/locales/de_DE";

element.resources = { am5geodata_worldLow, am5locales_de_DE };
```

> **Note:** `resources` is available since version 5.21.4. A name that can't be found logs a warning in the browser console.

## Size

The chart fills the element. Size it with CSS like any other block element. If nothing gives it a height, it is 400 pixels high.

```html
<am5-chart src="chart.json" style="height: 600px"></am5-chart>
```

## SVG renderer

Charts are drawn on canvas. To draw the chart as SVG instead, set `renderer="svg"`:

```html
<am5-chart src="chart.json" renderer="svg"></am5-chart>
```

> **More info:** For differences between the two, see "[Root element](https://docs.amcharts.com/v5/getting-started/root-element/)".

## Accessing the chart

Once the chart is built, the element's `root` and `chart` properties hold its root element and the chart. From there, it can be changed with regular code, e.g. to add plugins.

The chart is built asynchronously. `whenReady()` returns a promise that resolves once it is built, or right away if it already is:

TypeScript:

```ts
let element = document.querySelector("am5-chart");

element.whenReady().then(function(ev) {
  am5plugins_exporting.Exporting.new(ev.root, {
    menu: am5plugins_exporting.ExportingMenu.new(ev.root, {})
  });
});
```

JavaScript:

```js
var element = document.querySelector("am5-chart");

element.whenReady().then(function(ev) {
  am5plugins_exporting.Exporting.new(ev.root, {
    menu: am5plugins_exporting.ExportingMenu.new(ev.root, {})
  });
});
```

The element also fires DOM events: `ready` when the chart is built (with `root` and `chart` in `event.detail`), and `error` if it could not be built (with the error in `event.detail`):

TypeScript:

```ts
element.addEventListener("ready", function(ev) {
  console.log("Chart is ready", ev.detail.chart);
});

element.addEventListener("error", function(ev) {
  console.log("Chart could not be built", ev.detail);
});
```

JavaScript:

```js
element.addEventListener("ready", function(ev) {
  console.log("Chart is ready", ev.detail.chart);
});

element.addEventListener("error", function(ev) {
  console.log("Chart could not be built", ev.detail);
});
```

> **Note:** A chart with a config right in the page can be built before a script gets to add its `ready` listener. `whenReady()` works no matter when it is called, so prefer it.

## In frameworks

Our packages for React, Vue, Angular and Svelte wrap the element: they load its code in the browser only, so pages can be rendered on a server, and take the config, themes, resources and renderer as props or inputs. See [Integrations](https://docs.amcharts.com/v5/getting-started/integrations/).

## Custom element name

To use the element under another name, register it with `defineChartElement()`. The name must contain a hyphen.

TypeScript:

```ts
import { defineChartElement } from "@amcharts/amcharts5/element";

defineChartElement("my-chart");
```

JavaScript:

```js
import { defineChartElement } from "@amcharts/amcharts5/element";

defineChartElement("my-chart");
```

`<am5-chart>` stays registered too.
