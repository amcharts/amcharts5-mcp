---
title: "Serializing / JSON config"
source: "https://www.amcharts.com/docs/v5/concepts/serializing/"
scraped: "2026-03-15"
---

amCharts 5 charts or individual objects can be serialized into and parsed back from simple JavaScript objects or JSON-compatible strings. This tutorial explains how those features can be used.

(To serialize charts, use the [ChartSerializer](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/) class. [More info](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/).)

## Requirements

Serialization features have been introduced in version 5.3.0. This is the earliest version we will need in order to serialize and/or parse configs.

## Limitations

At this time, serialization and parsing of chart/object configs is limited to just their properties and settings.

Supported features:

-   Object type (e.g. "XYChart")
-   Properties
-   Settings
-   Adapters

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

### Gradients

Same goes for gradients:

{
  type: "LinearGradient",
  settings: {
    stops: \[{
      color: am5.color(0xFF621F)
    }, {
      color: am5.color(0x946B49)
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

## Serializing

To serialize charts, use the [ChartSerializer](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/) class. [More info](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/).

## Examples

### XY chart


### Pie chart


### Fill/stroke settings


### XY chart with legend and bullets


### XY chart with axis ranges


### XY Chart with axis bullets


