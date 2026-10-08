---
title: "Serializing / JSON config"
source: "https://www.amcharts.com/docs/v5/concepts/serializing/"
scraped: "2026-10-08"
---

amCharts 5 charts or individual objects can be serialized into and parsed back from simple JavaScript objects or JSON-compatible strings. This tutorial explains how those features can be used.

(To serialize charts, use the [ChartSerializer](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/) class. [More info](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/).)

## Requirements

Serialization features have been introduced in version 5.3.0. This is the earliest version we will need in order to serialize and/or parse configs.

## Limitations

At this time, serialization and parsing of chart/object configs covers their settings and properties, along with a few related aspects listed below.

Supported features:

-   Object type (e.g. "XYChart")
-   Properties
-   Settings
-   Adapters
-   States
-   Declared animations — the `animations` setting *(5.20.8)*, see "[Animations](https://www.amcharts.com/docs/v5/concepts/animations/)". In a JSON config, colors and percents in an entry's `from`/`to` use the object form (`{ "type": "Color", "value": "#f00" }`, `{ "type": "Percent", "value": 50 }`).

Unsupported features:

-   Events
-   Data processors

## Enabling

The serialization and parsing functionality is part of the JSON plugin, which needs to be loaded.

You can import those in your TypeScript / ES6 application as JavaScript modules:

import \* as am5plugins\_json from "@amcharts/amcharts5/plugins/json";

For vanilla JavaScript applications and web pages, you can use "script" version:

<script src="https://cdn.amcharts.com/lib/5/plugins/json.js"></script>

MORE INFOFor more information on installing amCharts 5 as well as loading modules refer to our "[Getting started](https://www.amcharts.com/docs/v5/getting-started/)" tutorial.

## Object structure

### Generic structure

The goal of the serialized chart config is to have a simple JavaScript object structure, which can be stored in a text format.

Any amCharts object can be serialized into such simple format.

A resulting object must at least contain `type` key, which should have object's class name as a value, e.g.:

{
  type: "XYChart"
}

### Settings

To pass in object's [settings](https://www.amcharts.com/docs/v5/concepts/settings/), we need to use `settings` key, which is an object, where key is a setting key, while value is a setting value.

Let's add some settings to the config above:

{
  type: "XYChart",
  settings: {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX"
  }
}

### Layout

A `layout` setting is special in that it allows special string based values, that will be replaced when config is parsed:

Config value

Replaced with

`"horizontal"`

`` `root.horizontalLayout` ``

`"vertical"`

`root.verticalLayout`

`"grid"`

`root.gridLayout`

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

### Nesting

Objects, can contain other serialized objects as their settings or properties.

The following adds a scrollbar:

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

### Properties

Similarly, we can set object properties, using an object in `properties` key:

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
    series: \[
      {
        type: "LineSeries",
        // ...
      }
    \]
  }
}

### Templates

JSON plugin parser also supports `Template` and `ListTemplate` type elements.

The following sets settings for axis' grid:

{
  type: "XYChart",
  // ...
  refs: {
    data: \[
      // ...
    \],
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

### Colors

Colors in JSON configs can be defined like any other object:

{
  type: "Color",
  value: 0xff0000
}

To use one of the theme's interface colors instead of a fixed one, refer to it via `@root`. The color will then come from whatever theme the chart is parsed with:

{
  type: "Label",
  settings: {
    text: "Hello",
    fill: "@root.interfaceColors.get('alternativeText')"
  }
}

MORE INFO[ChartSerializer](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/#Theme_colors) saves such colors this way, too.

NOTE `@root` can be used in any config since 5.21.0: `JsonParser` makes it available as a global ref (a ref of the config's own named `@root` takes precedence). Earlier versions do not know `@root`.

### Gradients

Same goes for gradients:

{
  type: "LinearGradient",
  settings: {
    stops: \[{
      color: { type: "Color", value: 0xFF621F }
    }, {
      color: { type: "Color", value: 0x946B49 }
    }\],
    rotation: 0
  }
}

### Percent values

Percent objects in JSON configs can be defined like any other object:

{
  type: "Percent",
  value: 50
}

### References

#### Referenced objects

If an object needs to be referred to somewhere else in config (e.g. an axis needs to be referred in a config of series), it needs to go into config object's `refs` section.

`refs` is an object where key is object's identifier, and the value is a serialized object.

Such "referenced" object can be referred to by its identifier prefixed with a hash tag.

Let's add X and Y axes, as well as data to the `refs` section, so that we can finish configuring our series and the chart itself:

{
  type: "XYChart",
  refs: {
    data: \[
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
    \],
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
    xAxes: \[
      "#xAxis",
    \],
    yAxes: \[
      "#yAxis",
    \],
    series: \[
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
    \]
  }
}

#### Grouping referenced objects

Normally, referenced objects cannot refer to one another.

If we need that functionality, we can assign them to groups.

To do that, instead of assigning one object to `refs` we assign an array of objects.

The items in the array will be processed one by one, so that references from the first item, are ensured to be fully processed when the next one starts processing.

This way, a value can reference to any object from previous items.

Since 5.20.7, a setting or property value that names a ref defined further down the config (later in the same `refs` object, or in a later group) no longer fails with "Could not find ref" — it is resolved after the rest of the config has been parsed. This is what makes e.g. a legend inside an axis header that lists a series defined later work. Groups are still the way to make sure an object is fully built before something uses it, and they are still required for [axis range](#Axis_ranges) definitions: a range's `axis` and `series` are looked up immediately, so the referenced axis and series need to come first, in an earlier group.

{
  type: "XYChart",
  refs: \[{
    data: \[
      // ...
    \],
    xAxis: {
      // ...
    },
    yAxis: {
      // ...
    },
  }, {
    series: \[{
      type: "LineSeries",
      settings: {
        xAxis: "#xAxis",
        yAxis: "#yAxis",
        // ...
      },
      properties: {
        data: "#data"
      }
    }\]
  }\],
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
    xAxes: \[
      "#xAxis",
    \],
    yAxes: \[
      "#yAxis",
    \],
    series: "#series"
  }
}

#### Accessing referenced object's properties and settings

It's possible to access any property of a referenced object using dot notation, e.g.:

{
  type: "Label",
  settings: {
    text: "#series.id"
  }
}

To access object's setting, use `get()` syntax:

{
  type: "Label",
  settings: {
    text: "#series.get('name')"
  }
}

A `@self` reference points to the object being configured, and is resolved after it is built — handy for a setting that needs to refer back to its own object.

### Child elements

If we want to push some elements in to `children` of the chart (or any other element for that matter), we will need to use `children` key in the serialized object.

Optional `index` key can be used to specify specific place to insert child at, with `0` (zero) being the first child.

Omitting `index` would push the element as the last child of a target container.

{
  type: "XYChart",
  // ...
  children: \[{
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
  }\]
}

### Root settings

A top-level `root` section applies settings and properties to the chart's `Root` object, such as formatters or a named locale. It is applied before the rest of the config is parsed, and is what [ChartSerializer](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/)'s `includeRoot` option produces.

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

### Opening animation

In code, a chart's opening animation is played by calling `appear()` on the chart and its series. A config can't call methods, so it uses the `autoAppear` setting instead: the element plays the same animation when it is first drawn.

{
  type: "XYChart",
  settings: {
    autoAppear: true,
    appearDuration: 1000,
    appearDelay: 100
  },
  properties: {
    series: \[{
      type: "LineSeries",
      settings: {
        autoAppear: true,
        appearDuration: 1000
        // ...
      }
    }\]
  }
}

A series waits for its data before playing the animation.

MORE INFOFor more details, see "[Animations](https://www.amcharts.com/docs/v5/concepts/animations/)".

### Map chart projection

In a `MapChart`, the `projection` setting is a function, which means it's not compatible with JSON format.

Use `projectionName` setting instead, e.g.:

{
  type: "MapChart",
  projectionName: "geoEquirectangular",
  // ...
}

The following built-in projections are available:

Regular use

`projectionName` equivalent

`am5map.geoMercator`

`"geoMercator"`

`am5map.geoOrthographic`

`"geoOrthographic"`

`am5map.geoEquirectangular`

`"geoEquirectangular"`

`am5map.geoAlbersUsa`

`"geoAlbersUsa"`

`am5map.geoEqualEarth`

`"geoEqualEarth"`

`am5map.geoNaturalEarth1`

`"geoNaturalEarth1"`

For non-bundled projections, you will need to register your own projection name / projection factory function:

import { geoConicConformal } from "d3-geo";
am5map.registerProjection("geoConicConformal", geoConicConformal);

am5map.registerProjection("geoConicConformal", d3.geoConicConformal);

## Series

This section will present a few examples of series' configuration.

### Strokes and fills

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
            strokeDasharray: \[3\]
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
                stops: \[{
                  opacity: 1
                }, {
                  opacity: 0.5
                }\],
                rotation: 0
              }
            }
          }
        }
      }
    }
  }
}

### Bullets

Series' bullets have special support in amCharts' JSON implementation, and can be used in a regular structure.

It will be automatically converted to a bullet function by JSON parser.

series: \[{
  type: "LineSeries",
  settings: {
    // ...
  },
  properties: {
    data: "#data",
    bullets: \[{
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
    }\]
  },
}\]

The above will create `Circle` bullets on a `LineSeries`.

Items within bullet's scope can also refer to series, and pull its properties or settings, by using `@series` reference.

The following will apply the same fill color to the bullet circle as a series itself:

series: \[{
  type: "LineSeries",
  settings: {
    // ...
  },
  properties: {
    data: "#data",
    bullets: \[{
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
    }\]
  },
}\]

## Axes

### Axis ranges

JSON configs support axis ranges (both standalone and series-related), with certain caveats:

-   Axis range definitions should go into a separate [`refs` section](https://www.amcharts.com/docs/v5/concepts/serializing/#Referenced_objects) group.
-   Axes need to be defined in their own `refs` group that comes before axis ranges. This is needed so that axis range can reference the axis via hash-tags.
-   For series-related axis ranges, the series needs to be in `refs` section, too.
-   Axis range needs a special directive `__parseLogic: "axisRange"`.

Here's an example:

refs: \[{
  data: \[
    // ...
  \],
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
    \_\_parseLogic: "axisRange"
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
    \_\_parseLogic: "axisRange"
  }
}\]

[Scroll to the example](#XY_chart_with_axis_ranges).

### Axis bullets

Axis bullets can also be added via axis' `bullet` property:

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

Within the bullet, the axis can be referenced via `@axis`, the same way `@series` works for series bullets.

[Scroll to the example](#XY_Chart_with_axis_bullets).

## Adapters

Since adapters are functions, they can't technically be part of a serialized JSON, but you can add references to them anyway:

{
  type: "Label",
  settings: {
    text: "Hello"
  },
  adapters: \[{
    key: "text",
    callback: function(text, target) {
      return text + " world";
    }
  }\]
}

**Adapters and JSON round-trips:** a function reference works only when the config is a JavaScript object in the same scope. Once the config has been through `JSON.stringify` (or `ChartSerializer` with `functionsAs: "string"`), the callback is a string — `JsonParser` does not evaluate it, and since 5.20.4 such an adapter is skipped (before that it was registered as-is and crashed the chart with `i[s] is not a function`). Effects that must survive a round-trip need a declarative equivalent: `colorByDataItem` on column series (5.20.4), a per-item `fill` field with `templateField`, or `heatRules`.

## States

Element [states](https://www.amcharts.com/docs/v5/concepts/states/) can be defined via a `states` array, where each item has a `key` and its `settings`:

{
  type: "Circle",
  settings: {
    radius: 5
  },
  states: \[{
    key: "hover",
    settings: {
      radius: 8
    }
  }\]
}

## Parsing

To parse serialized configs, we'll need:

-   Create a `Root` object.
-   Create a `JsonParser` object.
-   Use `JsonParser` method `parse()` to create the actual chart object.

const parser = am5plugins\_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
});

var parser = am5plugins\_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
});

### Parse options (`IParseSettings`)

The second argument of `parse()` is an options object — these are **not** settings of the parser itself:

-   `parent` — a `Container` to place the parsed chart into.
-   `updateTargets` *(5.20.3)* — `"strict"` (default): when the source object has a `type`, a new object of that type is created and replaces the existing one. `"soft"`: if source and target are the same type, only settings are applied onto the existing object (as if `type` had not been specified); objects are replaced only when the types differ. Use `"soft"` to update a live chart from a modified config without rebuilding it.

var parser = am5plugins\_json.JsonParser.new(root);
parser.parse(config, { parent: root.container, updateTargets: "soft" });

A config may also carry a top-level `root` section *(5.20.2)* whose `settings`/`properties` are applied to the `Root` object before the chart is parsed (`ChartSerializer` writes one when `includeRoot: true`).

### Post-parse handler

The `parse()` method is asynchronous and returns a `Promise`.

This means that when it returns, the actual chart object is not yet ready.

We either need to use `await` or `then()` if we need a reference to a finished chart object, push it to root element's `children` and do any other post-processing if needed

const parser = am5plugins\_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}).then(function(chart) {
  // Chart is ready
  root.container.children.push(chart);
  chart.appear(1000, 100);
});

var parser = am5plugins\_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}).then(function(chart) {
  // Chart is ready
  root.container.children.push(chart);
  chart.appear(1000, 100);
});

We can also automate pushing of a parsed object to some parent container, including `root.container` via parse options object (second parameter in the `parse()` method call):

const parser = am5plugins\_json.JsonParser.new(root);
parser.parse({
  // Chart config
  // ...
}, {
  parent: root.container
}).then(function(chart) {
  // Chart is ready
  chart.appear(1000, 100);
});

var parser = am5plugins\_json.JsonParser.new(root);
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

### Updating existing objects

By default, a config that specifies a `type` replaces the existing object in its place. With `updateTargets: "soft"` in parse options, if the existing object is already of that same type, the config is merged into it (only settings and properties are applied) instead of replacing it:

parser.parse(config, {
  parent: root.container,
  updateTargets: "soft"
});

parser.parse(config, {
  parent: root.container,
  updateTargets: "soft"
});

### Adding events

The `then()` callback will kick in when the chart and related objects are created, which means that we can use it to add events to chart's elements.

The following code shows how we can add `click` handlers to Pie chart's slices:

const parser = am5plugins\_json.JsonParser.new(root);
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

var parser = am5plugins\_json.JsonParser.new(root);
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

On an XY chart, bullets are created asynchronously, which means they are not still available when `then()` kicks in. We'll take a different approach to add `click` on its bullets:

const parser = am5plugins\_json.JsonParser.new(root);
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

var parser = am5plugins\_json.JsonParser.new(root);
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

### Without code

To put a chart from a config on a page without writing any code, use the `<am5-chart>` HTML element. It creates the root element, parses the config, and builds the chart:

<am5-chart src="chart.json"></am5-chart>

MORE INFOFor more details, see "[The <am5-chart> element](https://www.amcharts.com/docs/v5/getting-started/integrations/am5-chart-element/)".

## Serializing

To serialize charts, use the [ChartSerializer](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/) class. [More info](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/).

## Visual JSON config editor

You can create and edit JSON configs using [amCharts Editor](https://live.amcharts.com/).

For more info, refer to "[JSON Editor](https://www.amcharts.com/docs/v5/concepts/serializing/json-editor/)".

## Examples

### XY chart


### Pie chart


### Fill/stroke settings


### XY chart with legend and bullets


### XY chart with axis ranges


### XY Chart with axis bullets


