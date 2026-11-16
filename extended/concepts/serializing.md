---
title: "Serializing / JSON config"
source: "https://docs.amcharts.com/v5/concepts/serializing/"
scraped: "2026-11-16"
---

amCharts 5 charts or individual objects can be serialized into and parsed back from simple JavaScript objects or JSON-compatible strings. This tutorial explains how those features can be used.

(To serialize charts, use the [ChartSerializer](https://docs.amcharts.com/v5/concepts/serializing/chart-serializer/) class. [More info](https://docs.amcharts.com/v5/concepts/serializing/chart-serializer/).)

## Requirements

Serialization features have been introduced in version 5.3.0. This is the earliest version we will need in order to serialize and/or parse configs.

## Limitations

At this time, serialization and parsing of chart/object configs covers their settings and properties, along with a few related aspects listed below.

Supported features:

* Object type (e.g. "XYChart")
* Properties
* Settings
* Adapters
* States

Unsupported features:

* Events
* Data processors

## Enabling

The serialization and parsing functionality is part of the JSON plugin, which needs to be loaded.

You can import those in your TypeScript / ES6 application as JavaScript modules:

```ts
import * as am5plugins_json from "@amcharts/amcharts5/plugins/json";
```

For vanilla JavaScript applications and web pages, you can use "script" version:

```html
<script src="https://cdn.amcharts.com/lib/5/plugins/json.js"></script>
```

> **More info:** For more information on installing amCharts 5 as well as loading modules refer to our "[Getting started](https://docs.amcharts.com/v5/getting-started/)" tutorial.

## Object structure

### Generic structure

The goal of the serialized chart config is to have a simple JavaScript object structure, which can be stored in a text format.

Any amCharts object can be serialized into such simple format.

A resulting object must at least contain `type` key, which should have object's class name as a value, e.g.:

```json
{
  type: "XYChart"
}
```

### Settings

To pass in object's [settings](https://docs.amcharts.com/v5/concepts/settings/), we need to use `settings` key, which is an object, where key is a setting key, while value is a setting value.

Let's add some settings to the config above:

```json
{
  type: "XYChart",
  settings: {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX"
  }
}
```

### Layout

A `layout` setting is special in that it allows special string based values, that will be replaced when config is parsed:

| Config value   | Replaced with           |
| -------------- | ----------------------- |
| `"horizontal"` | `root.horizontalLayout` |
| `"vertical"`   | `root.verticalLayout`   |
| `"grid"`       | `root.gridLayout`       |

```json
{
  type: "XYChart",
  settings: {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: "vertical"
  }
}
```

### Nesting

Objects, can contain other serialized objects as their settings or properties.

The following adds a scrollbar:

```json
{
  type: "XYChart",
  settings: {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    scrollbarX: {
      type: "Scrollbar",
      settings: {
        orientation: "horizontal"
      }
    }
  }
}
```

### Properties

Similarly, we can set object properties, using an object in `properties` key:

```json
{
  type: "XYChart",
  settings: {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    scrollbarX: {
      type: "Scrollbar",
      settings: {
        orientation: "horizontal"
      }
    }
  },
  properties: {
    series: [
      {
        type: "LineSeries",
        // ...
      }
    ]
  }
}
```

### Templates

JSON plugin parser also supports `Template` and `ListTemplate` type elements.

The following sets settings for axis' grid:

```json
{
  type: "XYChart",
  // ...
  refs: {
    data: [
      // ...
    ],
    xAxis: {
      // ...
    },
    yAxis: {
      type: "ValueAxis",
      settings: {
        maxDeviation: 1,
        renderer: {
          type: "AxisRendererY",
          settings: {
            pan: "zoom"
          },
          properties: {
            grid: {
              properties: {
                template: {
                  settings: {
                    forceHidden: true
                  }
                }
              }
            }
          }
        },
      }
    },
  },
  // ...
}
```

### Colors

Colors in JSON configs can be defined like any other object:

```json
{
  type: "Color",
  value: 0xff0000
}
```

To use one of the theme's interface colors instead of a fixed one, refer to it via `@root`. The color will then come from whatever theme the chart is parsed with:

```json
{
  type: "Label",
  settings: {
    text: "Hello",
    fill: "@root.interfaceColors.get('alternativeText')"
  }
}
```

> **More info:** [ChartSerializer](https://docs.amcharts.com/v5/concepts/serializing/chart-serializer/#theme-colors) saves such colors this way, too.

A color from the theme's series palette is referred to via `@colors`. `getIndex()` takes the palette's color at that position, counting from 0:

```json
{
  type: "Label",
  settings: {
    text: "Hello",
    fill: "@colors.getIndex(2)"
  }
}
```

> **Note:** `@colors` is available since version 5.21.3.

### Gradients

Same goes for gradients:

```json
{
  type: "LinearGradient",
  settings: {
    stops: [{
      color: { type: "Color", value: 0xFF621F }
    }, {
      color: { type: "Color", value: 0x946B49 }
    }],
    rotation: 0
  }
}
```

### Percent values

Percent objects in JSON configs can be defined like any other object:

```json
{
  type: "Percent",
  value: 50
}
```

### References

#### Referenced objects

If an object needs to be referred to somewhere else in config (e.g. an axis needs to be referred in a config of series), it needs to go into config object's `refs` section.

`refs` is an object where key is object's identifier, and the value is a serialized object.

Such "referenced" object can be referred to by its identifier prefixed with a hash tag.

Let's add X and Y axes, as well as data to the `refs` section, so that we can finish configuring our series and the chart itself:

```json
{
  type: "XYChart",
  refs: {
    data: [
      { date: 1652425200000, value: 92 },
      { date: 1652511600000, value: 95 },
      { date: 1652598000000, value: 100 },
      { date: 1652684400000, value: 100 },
      { date: 1652770800000, value: 96 },
      { date: 1652857200000, value: 97 },
      { date: 1652943600000, value: 94 },
      { date: 1653030000000, value: 89 },
      { date: 1653116400000, value: 89 },
      { date: 1653202800000, value: 87 },
      { date: 1653289200000, value: 84 },
      { date: 1653375600000, value: 81 },
      { date: 1653462000000, value: 85 },
      { date: 1653548400000, value: 89 },
      { date: 1653634800000, value: 86 },
      { date: 1653721200000, value: 90 },
      { date: 1653807600000, value: 93 },
      { date: 1653894000000, value: 94 },
      { date: 1653980400000, value: 94 },
      { date: 1654066800000, value: 96 }
    ],
    xAxis: {
      type: "DateAxis",
      settings: {
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        renderer: {
          type: "AxisRendererX"
        }
      }
    },
    yAxis: {
      type: "ValueAxis",
      settings: {
        renderer: {
          type: "AxisRendererY"
        }
      }
    },
  },
  settings: {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    scrollbarX: {
      type: "Scrollbar",
      settings: {
        orientation: "horizontal"
      }
    }
  },
  properties: {
    xAxes: [
      "#xAxis",
    ],
    yAxes: [
      "#yAxis",
    ],
    series: [
      {
        type: "LineSeries",
        settings: {
          name: "Series",
          xAxis: "#xAxis",
          yAxis: "#yAxis",
          valueYField: "value",
          valueXField: "date",
          tooltip: {
            type: "Tooltip",
            settings: {
              labelText: "{valueX}: {valueY}"
            }
          },
        },
        properties: {
          data: "#data"
        }
      }
    ]
  }
}
```

#### Grouping referenced objects

Normally, referenced objects cannot refer to one another.

If we need that functionality, we can assign them to groups.

To do that, instead of assigning one object to `refs` we assign an array of objects.

The items in the array will be processed one by one, so that references from the first item, are ensured to be fully processed when the next one starts processing.

This way, a value can reference to any object from previous items.

```json
{
  type: "XYChart",
  refs: [{
    data: [
      // ...
    ],
    xAxis: {
      // ...
    },
    yAxis: {
      // ...
    },
  }, {
    series: [{
      type: "LineSeries",
      settings: {
        xAxis: "#xAxis",
        yAxis: "#yAxis",
        // ...
      },
      properties: {
        data: "#data"
      }
    }]
  }],
  settings: {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    scrollbarX: {
      type: "Scrollbar",
      settings: {
        orientation: "horizontal"
      }
    }
  },
  properties: {
    xAxes: [
      "#xAxis",
    ],
    yAxes: [
      "#yAxis",
    ],
    series: "#series"
  }
}
```

#### Accessing referenced object's properties and settings

It's possible to access any property of a referenced object using dot notation, e.g.:

```json
{
  type: "Label",
  settings: {
    text: "#series.id"
  }
}
```

To access object's setting, use `get()` syntax:

```json
{
  type: "Label",
  settings: {
    text: "#series.get('name')"
  }
}
```

A `@self` reference points to the object being configured, and is resolved after it is built — handy for a setting that needs to refer back to its own object.

### Child elements

If we want to push some elements in to `children` of the chart (or any other element for that matter), we will need to use `children` key in the serialized object.

Optional `index` key can be used to specify specific place to insert child at, with `0` (zero) being the first child.

Omitting `index` would push the element as the last child of a target container.

```json
{
  type: "XYChart",
  // ...
  children: [{
    index: 0,
    type: "Label",
    settings: {
      text: "This will go at the top of the chart"
    }
  }, {
    type: "Label",
    settings: {
      text: "And this one will be shown at the bottom"
    }
  }]
}
```

### Root settings

A top-level `root` section applies settings and properties to the chart's `Root` object, such as formatters or a named locale. It is applied before the rest of the config is parsed, and is what [ChartSerializer](https://docs.amcharts.com/v5/concepts/serializing/chart-serializer/)'s `includeRoot` option produces.

```json
{
  type: "XYChart",
  root: {
    settings: {
      // Root settings
    },
    properties: {
      // e.g. numberFormatter, dateFormatter, or a named locale
    }
  },
  // ...
}
```

### Opening animation

In code, a chart's opening animation is played by calling `appear()` on the chart and its series. A config can't call methods, so it uses the `autoAppear` setting instead: the element plays the same animation when it is first drawn.

```json
{
  type: "XYChart",
  settings: {
    autoAppear: true,
    appearDuration: 1000,
    appearDelay: 100
  },
  properties: {
    series: [{
      type: "LineSeries",
      settings: {
        autoAppear: true,
        appearDuration: 1000
        // ...
      }
    }]
  }
}
```

A series waits for its data before playing the animation.

> **More info:** For more details, see "[Animations](https://docs.amcharts.com/v5/concepts/animations/)".

Example: [JSON config with an opening animation](https://docs.amcharts.com/embeds/v5/json-config-with-an-opening-animation/). Its code: get_example(path: "examples/docs-demos/json-config-with-an-opening-animation").

### Map chart projection

In a `MapChart`, the `projection` setting is a function, which means it's not compatible with JSON format.

Use `projectionName` setting instead, e.g.:

```json
{
  type: "MapChart",
  settings: {
    projectionName: "geoEquirectangular"
  },
  // ...
}
```

The following built-in projections are available:

| Regular use                 | `projectionName` equivalent |
| --------------------------- | --------------------------- |
| `am5map.geoMercator`        | `"geoMercator"`             |
| `am5map.geoOrthographic`    | `"geoOrthographic"`         |
| `am5map.geoEquirectangular` | `"geoEquirectangular"`      |
| `am5map.geoAlbersUsa`       | `"geoAlbersUsa"`            |
| `am5map.geoEqualEarth`      | `"geoEqualEarth"`           |
| `am5map.geoNaturalEarth1`   | `"geoNaturalEarth1"`        |

For non-bundled projections, you will need to register your own projection name / projection factory function:

TypeScript:

```ts
import { geoConicConformal } from "d3-geo";
am5map.registerProjection("geoConicConformal", geoConicConformal);
```

JavaScript:

```js
am5map.registerProjection("geoConicConformal", d3.geoConicConformal);
```

## Series

This section will present a few examples of series' configuration.

### Strokes and fills

```json
{
  type: "LineSeries",
  // ...
  properties: {
    data: "#data",
    strokes: {
      properties: {
        template: {
          settings: {
            strokeWidth: 2,
            strokeDasharray: [3]
          }
        }
      }
    },
    fills: {
      properties: {
        template: {
          settings: {
            fillOpacity: 0.5,
            fillGradient: {
              type: "LinearGradient",
              settings: {
                stops: [{
                  opacity: 1
                }, {
                  opacity: 0.5
                }],
                rotation: 0
              }
            }
          }
        }
      }
    }
  }
}
```

### Bullets

Series' bullets have special support in amCharts' JSON implementation, and can be used in a regular structure.

It will be automatically converted to a bullet function by JSON parser.

```json
series: [{
  type: "LineSeries",
  settings: {
    // ...
  },
  properties: {
    data: "#data",
    bullets: [{
      type: "Bullet",
      settings: {
        sprite: {
          type: "Circle",
          settings: {
            radius: 5,
            fill: {
              type: "Color",
              value: 0xff0000
            }
          }
        }
      }
    }]
  },
}]
```

The above will create `Circle` bullets on a `LineSeries`.

Items within bullet's scope can also refer to series, and pull its properties or settings, by using `@series` reference.

The following will apply the same fill color to the bullet circle as a series itself:

```json
series: [{
  type: "LineSeries",
  settings: {
    // ...
  },
  properties: {
    data: "#data",
    bullets: [{
      type: "Bullet",
      settings: {
        sprite: {
          type: "Circle",
          settings: {
            radius: 5,
            fill: "@series.get('fill')"
          }
        }
      }
    }]
  },
}]
```

## Axes

### Axis ranges

JSON configs support axis ranges (both standalone and series-related), with certain caveats:

* Axis range definitions should go into a separate [`refs` section](https://docs.amcharts.com/v5/concepts/serializing/#referenced-objects) group.
* Axes need to be defined in their own `refs` group that comes before axis ranges. This is needed so that axis range can reference the axis via hash-tags.
* For series-related axis ranges, the series needs to be in `refs` section, too.
* Axis range needs a special directive `__parseLogic: "axisRange"`.

Here's an example:

```json
refs: [{
  data: [
    // ...
  ],
  xAxis: {
    type: "DateAxis",
    // ...
  },
  yAxis: {
    type: "ValueAxis",
    // ...
  },
}, {
  series: {
    type: "LineSeries",
    // ...
}, {
  range1: {
    axis: "#yAxis",
    settings: {
      value: 90,
      grid: {
        type: "Grid",
        settings: {
          strokeWidth: 3,
          stroke: {
            type: "Color",
            value: 0xff0000
          }
        }
      }
    },
    __parseLogic: "axisRange"
  }, 
  range2: {
    axis: "#xAxis",
    series: "#series",
    settings: {
      value: 1653030000000,
      endValue: 1653548400000,
    },
    strokes: {
      stroke: {
        type: "Color",
        value: 0xff0000
      }
    },
    fills: {
      visible: true,
      fillOpacity: 0.1,
      fill: {
        type: "Color",
        value: 0xff0000
      }
    },
    __parseLogic: "axisRange"
  }
}]
```

[Scroll to the example](#xy-chart-with-axis-ranges).

### Axis bullets

Axis bullets can also be added via axis' `bullet` property:

```json
{
  type: "DateAxis",
  // ...
  properties: {
    bullet: {
      type: "AxisBullet",
      settings: {
        location: 0,
        sprite: {
          type: "Circle",
          settings: {
            radius: 5,
            fill: {
              type: "Color",
              value: 0xff0000
            }
          }
        }
      }
    }
  }
}
```

Within the bullet, the axis can be referenced via `@axis`, the same way `@series` works for series bullets.

[Scroll to the example](#xy-chart-with-axis-bullets).

## Adapters

Since adapters are functions, they can't technically be part of a serialized JSON, but you can add references to them anyway:

```json
{
  type: "Label",
  settings: {
    text: "Hello"
  },
  adapters: [{
    key: "text",
    callback: function(text, target) {
      return text + " world";
    }
  }]
}
```

## States

Element [states](https://docs.amcharts.com/v5/concepts/settings/states/) can be defined via a `states` array, where each item has a `key` and its `settings`:

```json
{
  type: "Circle",
  settings: {
    radius: 5
  },
  states: [{
    key: "hover",
    settings: {
      radius: 8
    }
  }]
}
```

## Parsing

To parse serialized configs, we'll need:

* Create a `Root` object.
* Create a `JsonParser` object.
* Use `JsonParser` method `parse()` to create the actual chart object.

TypeScript:

```ts
const parser = am5plugins_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
});
```

JavaScript:

```js
var parser = am5plugins_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
});
```

### Maps and locales

A map's config names its geodata (`"geoJSON": "am5geodata_worldLow"`), and the `root` section can name a locale (`"locale": "am5locales_de_DE"`), instead of carrying them. The parser looks the names up in the `resources` parse setting first, and then as globals, which the script version defines. With npm imports, pass them in `resources`:

TypeScript:

```ts
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const parser = am5plugins_json.JsonParser.new(root);
parser.parse(config, {
  parent: root.container,
  resources: { am5geodata_worldLow }
});
```

JavaScript:

```js
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

var parser = am5plugins_json.JsonParser.new(root);
parser.parse(config, {
  parent: root.container,
  resources: { am5geodata_worldLow }
});
```

> **Note:** `resources` is available since version 5.21.4. A name that can't be found logs a warning in the browser console.

### Post-parse handler

The `parse()` method is asynchronous and returns a `Promise`.

This means that when it returns, the actual chart object is not yet ready.

We either need to use `await` or `then()` if we need a reference to a finished chart object, push it to root element's `children` and do any other post-processing if needed

TypeScript:

```ts
const parser = am5plugins_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}).then(function(chart) {
  // Chart is ready
  root.container.children.push(chart);
  chart.appear(1000, 100);
});
```

JavaScript:

```js
var parser = am5plugins_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}).then(function(chart) {
  // Chart is ready
  root.container.children.push(chart);
  chart.appear(1000, 100);
});
```

We can also automate pushing of a parsed object to some parent container, including `root.container` via parse options object (second parameter in the `parse()` method call):

TypeScript:

```ts
const parser = am5plugins_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}, {
  parent: root.container
}).then(function(chart) {
  // Chart is ready
  chart.appear(1000, 100);
});
```

JavaScript:

```js
var parser = am5plugins_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}, {
  parent: root.container
}).then(function(chart) {
  // Chart is ready
  root.container.children.push(chart);
  chart.appear(1000, 100);
});
```

### Updating existing objects

By default, a config that specifies a `type` replaces the existing object in its place. With `updateTargets: "soft"` in parse options, if the existing object is already of that same type, the config is merged into it (only settings and properties are applied) instead of replacing it:

TypeScript:

```ts
parser.parse(config, {
  parent: root.container,
  updateTargets: "soft"
});
```

JavaScript:

```js
parser.parse(config, {
  parent: root.container,
  updateTargets: "soft"
});
```

### Adding events

The `then()` callback will kick in when the chart and related objects are created, which means that we can use it to add events to chart's elements.

The following code shows how we can add `click` handlers to Pie chart's slices:

TypeScript:

```ts
const parser = am5plugins_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}, {
  parent: root.container
}).then(function(chart) {
  // Chart is ready
  // Add click handlers on slices
  var series = chart.series.getIndex(0);
  series.slices.each(function(slice) {
    slice.events.on("click", handleClick);
  });
});

function handleClick(ev) {
  console.log(ev.target.dataItem.get("category"));
}
```

JavaScript:

```js
var parser = am5plugins_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}, {
  parent: root.container
}).then(function(chart) {
  // Chart is ready
  // Add click handlers on slices
  var series = chart.series.getIndex(0);
  series.slices.each(function(slice) {
    slice.events.on("click", handleClick);
  });
});

function handleClick(ev) {
  console.log(ev.target.dataItem.get("category"));
}
```

On an XY chart, bullets are created asynchronously, which means they are not still available when `then()` kicks in. We'll take a different approach to add `click` on its bullets:

TypeScript:

```ts
const parser = am5plugins_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}, {
  parent: root.container
}).then(function(chart) {
  // Chart is ready
  // Add click handlers on bullets
  var series = chart.series.getIndex(0)
  series.bulletsContainer.children.events.on("push", function(ev) {
    ev.newValue.events.on("click", handleClick);
  });
});

function handleClick(ev) {
  console.log(new Date(ev.target.dataItem.get("valueX")));
}
```

JavaScript:

```js
var parser = am5plugins_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}, {
  parent: root.container
}).then(function(chart) {
  // Chart is ready
  // Add click handlers on bullets
  var series = chart.series.getIndex(0)
  series.bulletsContainer.children.events.on("push", function(ev) {
    ev.newValue.events.on("click", handleClick);
  });
});

function handleClick(ev) {
  console.log(new Date(ev.target.dataItem.get("valueX")));
}
```

### Without code

To put a chart from a config on a page without writing any code, use the `<am5-chart>` HTML element. It creates the root element, parses the config, and builds the chart:

```html
<am5-chart src="chart.json"></am5-chart>
```

> **More info:** For more details, see "[The \<am5-chart> element](https://docs.amcharts.com/v5/getting-started/integrations/am5-chart-element/)".

## Serializing

To serialize charts, use the [ChartSerializer](https://docs.amcharts.com/v5/concepts/serializing/chart-serializer/) class. [More info](https://docs.amcharts.com/v5/concepts/serializing/chart-serializer/).

## Visual JSON config editor

You can create and edit JSON configs using [Chart Maker](https://live.amcharts.com/).

For more info, refer to "[JSON Editor](https://docs.amcharts.com/v5/concepts/serializing/json-editor/)".

## Examples

### XY chart

Example: [XYChart from JSON config](https://docs.amcharts.com/embeds/v5/xychart-from-json-config/). Its code: get_example(path: "examples/docs-demos/xychart-from-json-config").

### Pie chart

Example: [PieChart from JSON config](https://docs.amcharts.com/embeds/v5/piechart-from-json-config/). Its code: get_example(path: "examples/docs-demos/piechart-from-json-config").

### Fill/stroke settings

Example: [LineSeries stroke/fill settings via JSON config](https://docs.amcharts.com/embeds/v5/lineseries-strokefill-settings-via-json-config/). Its code: get_example(path: "examples/docs-demos/lineseries-strokefill-settings-via-json-config").

### XY chart with legend and bullets

Example: [XYChart with legend via JSON config](https://docs.amcharts.com/embeds/v5/xychart-with-legend-via-json-config/). Its code: get_example(path: "examples/docs-demos/xychart-with-legend-via-json-config").

### XY chart with axis ranges

Example: [XYChart from JSON config (with axis ranges)](https://docs.amcharts.com/embeds/v5/xychart-from-json-config-with-axis-ranges/). Its code: get_example(path: "examples/docs-demos/xychart-from-json-config-with-axis-ranges").

### XY Chart with axis bullets

Example: [XYChart from JSON config (with axis bullets)](https://docs.amcharts.com/embeds/v5/xychart-from-json-config-with-axis-bullets/). Its code: get_example(path: "examples/docs-demos/xychart-from-json-config-with-axis-bullets").
