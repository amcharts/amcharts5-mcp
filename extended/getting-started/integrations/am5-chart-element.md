---
title: "The <am5-chart> Element"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/am5-chart-element/"
scraped: "2026-10-22"
---

`<am5-chart>` is an HTML element that builds a chart from a [JSON config](https://www.amcharts.com/docs/v5/concepts/serializing/). There is no root element to create and no chart code to write: put the element on the page and give it a config.

NOTE The `<am5-chart>` element is available since version 5.21.0.

## Loading

With script tags, load `index.js`, `plugins/json.js` and `element.js`, in that order. Then load the files for the chart types the config uses, and any themes:

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/plugins/json.js"></script>
<script src="https://cdn.amcharts.com/lib/5/element.js"></script>
<script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
```

With npm, import the element module. The chart types a config uses are loaded automatically when the chart is built.

```typescript
import "@amcharts/amcharts5/element";
```

```javascript
import "@amcharts/amcharts5/element";
```

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

```typescript
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

```javascript
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

MORE INFO For the config format, see "[Serializing / JSON config](https://www.amcharts.com/docs/v5/concepts/serializing/)". To have the chart animate in when it loads, use the `autoAppear` setting in the config (more about it in "[Animations](https://www.amcharts.com/docs/v5/concepts/animations/)").


## Themes

Themes are not part of a config. With script tags, list theme names in the `themes` attribute, separated by spaces or commas. Each theme's file must be loaded first.

```html
<am5-chart src="chart.json" themes="Animated Dark"></am5-chart>
```

With npm, set theme classes on the `themes` property:

```typescript
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

element.themes = [am5themes_Animated];
```

```javascript
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

element.themes = [am5themes_Animated];
```

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

MORE INFO For differences between the two, see "[Root element](https://www.amcharts.com/docs/v5/getting-started/root-element/)".

## Accessing the chart

Once the chart is built, the element's `root` and `chart` properties hold its root element and the chart. From there, it can be changed with regular code, e.g. to add plugins.

The chart is built asynchronously. `whenReady()` returns a promise that resolves once it is built, or right away if it already is:

```typescript
let element = document.querySelector("am5-chart");

element.whenReady().then(function(ev) {
  am5plugins_exporting.Exporting.new(ev.root, {
    menu: am5plugins_exporting.ExportingMenu.new(ev.root, {})
  });
});
```

```javascript
var element = document.querySelector("am5-chart");

element.whenReady().then(function(ev) {
  am5plugins_exporting.Exporting.new(ev.root, {
    menu: am5plugins_exporting.ExportingMenu.new(ev.root, {})
  });
});
```

The element also fires DOM events: `ready` when the chart is built (with `root` and `chart` in `event.detail`), and `error` if it could not be built (with the error in `event.detail`):

```typescript
element.addEventListener("ready", function(ev) {
  console.log("Chart is ready", ev.detail.chart);
});

element.addEventListener("error", function(ev) {
  console.log("Chart could not be built", ev.detail);
});
```

```javascript
element.addEventListener("ready", function(ev) {
  console.log("Chart is ready", ev.detail.chart);
});

element.addEventListener("error", function(ev) {
  console.log("Chart could not be built", ev.detail);
});
```

NOTE A chart with a config right in the page can be built before a script gets to add its `ready` listener. `whenReady()` works no matter when it is called, so prefer it.

## In frameworks

Our packages for React, Vue, Angular and Svelte wrap the element: they load its code in the browser only, so pages can be rendered on a server, and take the config, themes and renderer as props or inputs. See [Integrations](https://www.amcharts.com/docs/v5/getting-started/integrations/).

## Custom element name

To use the element under another name, register it with `defineChartElement()`. The name must contain a hyphen.

```typescript
import { defineChartElement } from "@amcharts/amcharts5/element";

defineChartElement("my-chart");
```

```javascript
import { defineChartElement } from "@amcharts/amcharts5/element";

defineChartElement("my-chart");
```

`<am5-chart>` stays registered too.
