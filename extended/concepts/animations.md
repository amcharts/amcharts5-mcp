---
title: "Animations"
source: "https://docs.amcharts.com/v5/concepts/animations/"
scraped: "2026-11-14"
---

## Animated theme

The easiest way to enable all kinds of polished animations on charts is to use "Animated" theme.

Like all themes it needs to be loaded first:

TypeScript:

```ts
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
```

JavaScript:

```js
<script src="//cdn.amcharts.com/lib/5/themes/Animated.js"></script>
```

Then applied to the root element:

TypeScript:

```ts
root.setThemes([
  am5themes_Animated.new(root)
]);
```

JavaScript:

```js
root.setThemes([
  am5themes_Animated.new(root)
]);
```

For more information about themes, refer to our "[Themes](https://docs.amcharts.com/v5/concepts/themes/)" tutorial.

## Turning off animations

Without the Animated theme, most animation durations are `0`, so changes happen at once.

To keep the theme but turn off one kind of animation, set its duration to `0`. For example, axis zoom: see "[Zoom animation](https://docs.amcharts.com/v5/charts/xy-chart/zoom-and-pan/#zoom-animation)".

## Animating settings

A value of a setting of an element or a data item can be animated using its `animate()` method.

This applies to settings that use quantifiable values, like numbers, colors, or percent.

`animate()` method takes one parameter - an object that implements `AnimationOptions` interface:

| Option     | Comment                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `duration` | Animation duration in milliseconds.                                                                           |
| `easing`   | An [easing function](#easing-functions) to use.                                                               |
| `from`     | Starting value. Will use current value if not set.                                                            |
| `key`      | Setting key to animate values for.                                                                            |
| `loops`    | Number of times to play animation. Will play only once if not set, or will loop forever if set to `Infinity`. |
| `to`       | End value to animate to.                                                                                      |

As an example let's create a repeating animation of a `startAngle` setting of a pie series:

TypeScript:

```ts
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});
```

JavaScript:

```js
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});
```

We have used `am5.ease.yoyo` easing function which animates setting to target value, then returns back to original one.

Read more about it in "[Easing functions](#easing-functions)" section.

Example: [Easing](https://docs.amcharts.com/embeds/v5/easing/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/percent.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 300px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    radius: am5.percent(90),
    innerRadius: am5.percent(50)
  })
);

// Define data
var data = [
  {
    country: "France",
    sales: 100000
  },
  {
    country: "Spain",
    sales: 160000
  },
  {
    country: "United Kingdom",
    sales: 80000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.data.setAll(data);

// Disabling labels and ticks
series.labels.template.set("visible", false);
series.ticks.template.set("visible", false);

series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});
```

It works exactly the same for data item settings:

TypeScript:

```ts
handDataItem.animate({
  key: "value",
  to: 20,
  duration: 800,
  easing: am5.ease.out(am5.ease.cubic)
});
```

JavaScript:

```js
handDataItem.animate({
  key: "value",
  to: 20,
  duration: 800,
  easing: am5.ease.out(am5.ease.cubic)
});
```

Example: [Gauge chart with hand](https://docs.amcharts.com/embeds/v5/gauge-chart-with-hand/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 300px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,
    panY: false,
    startAngle: -180,
    endAngle: 0,
    innerRadius: -26
  })
);

var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  strokeOpacity: 0.1,
  minGridDistance: 30
});

axisRenderer.ticks.template.setAll({
  visible: true,
  strokeOpacity: 0.5
});

axisRenderer.grid.template.setAll({
  visible: false
});

var axis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    max: 100,
    strictMinMax: true,
    renderer: axisRenderer
  })
);

function createRange(start, end, color, label) {
  var rangeDataItem = axis.makeDataItem({
    value: start,
    endValue: end
  });

  var range = axis.createAxisRange(rangeDataItem);

  rangeDataItem.get("axisFill").setAll({
    visible: true,
    fill: color,
    fillOpacity: 0.8
  });

  rangeDataItem.get("tick").setAll({
    visible: false
  });

  rangeDataItem.get("label").setAll({
    text: label,
    inside: true,
    radius: 8,
    fontSize: "0.9em",
    fill: am5.color(0xffffff)
  });
}

createRange(0, 70, am5.color(0x297373), "Safe");
createRange(70, 90, am5.color(0x946b49), "Warning");
createRange(90, 100, am5.color(0xff621f), "Danger");

// Add clock hand
var handDataItem = axis.makeDataItem({
  value: 0
});

var hand = handDataItem.set(
  "bullet",
  am5xy.AxisBullet.new(root, {
    sprite: am5radar.ClockHand.new(root, {
      radius: am5.percent(99)
    })
  })
);

axis.createAxisRange(handDataItem);

handDataItem.get("grid").set("visible", false);
handDataItem.get("tick").set("visible", false);

setInterval(() => {
  handDataItem.animate({
    key: "value",
    to: Math.round(Math.random() * 100),
    duration: 800,
    easing: am5.ease.out(am5.ease.cubic)
  });
}, 2000);
```

## Animations as settings

Animations can also be set as part of element's configuration, using its `animations` setting. This is handy for animations that should simply always run, such as a spinning globe or a pulsing marker. And since it's a regular setting, it also works in [JSON configs](https://docs.amcharts.com/v5/concepts/serializing/).

The setting takes an array of animations, each with these options:

| Option     | Default       | Comment                                                                                                              |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `key`      |               | Setting to animate.                                                                                                  |
| `from`     | Current value | Value to start from.                                                                                                 |
| `to`       |               | Value to animate to.                                                                                                 |
| `duration` |               | Duration in milliseconds. With `yoyo`, one way.                                                                      |
| `delay`    | `0`           | Milliseconds to wait before starting.                                                                                |
| `loops`    | `1`           | How many times to play the animation. `0` plays it forever.                                                          |
| `yoyo`     | `false`       | Go back to `from` after reaching `to`, instead of jumping back.                                                      |
| `easing`   | `"linear"`    | Easing function by name: `"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"`, or `"elastic"`. |
| `ease`     | `"in"`        | Which way easing applies: `"in"`, `"out"`, or `"inOut"`.                                                             |
| `target`   | `"self"`      | `"self"` animates a setting of the element, `"dataItem"` a value of its data item.                                   |

The following makes a globe spin forever, one full turn every two minutes:

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    projection: am5map.geoOrthographic(),
    animations: [
      { key: "rotationX", from: 0, to: 360, duration: 120000, loops: 0 }
    ]
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    projection: am5map.geoOrthographic(),
    animations: [
      { key: "rotationX", from: 0, to: 360, duration: 120000, loops: 0 }
    ]
  })
);
```

With `target: "dataItem"`, an animation can change a value of element's data item. The following moves a map point along its line, back and forth:

TypeScript:

```ts
pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000),
      animations: [{
        key: "positionOnLine",
        target: "dataItem",
        from: 0,
        to: 1,
        duration: 5000,
        loops: 0,
        yoyo: true,
        easing: "sine",
        ease: "inOut"
      }]
    })
  });
});
```

JavaScript:

```js
pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000),
      animations: [{
        key: "positionOnLine",
        target: "dataItem",
        from: 0,
        to: 1,
        duration: 5000,
        loops: 0,
        yoyo: true,
        easing: "sine",
        ease: "inOut"
      }]
    })
  });
});
```

Animations start when the setting is applied, restart when it changes, and stop when the element is disposed. When the chart is [serialized](https://docs.amcharts.com/v5/concepts/serializing/chart-serializer/), the configured values are saved, not whatever value the animation was at.

> **Note:** Unlike `animate()`, where `loops: Infinity` means forever, here it's `loops: 0`. The `animations` setting is available since version 5.20.8.

Example: [Marker moving along a route](https://docs.amcharts.com/embeds/v5/marker-moving-along-a-route/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/worldLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create the map chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1()
  })
);

// Create polygon series for countries
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);

// Create the route: New York > London > Beijing
// https://docs.amcharts.com/v5/charts/map-chart/map-line-series/
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

lineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0.6,
  strokeDasharray: [3, 3]
});

lineSeries.data.setAll([
  {
    id: "route",
    geometry: {
      type: "LineString",
      coordinates: [
        [-73.778137, 40.641312],
        [-0.454296, 51.47002],
        [116.597504, 40.072498]
      ]
    }
  }
]);

// Create a point that sits on the route
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/#points-on-a-line
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 7,
      fill: am5.color(0xff5500),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2,

      // Animate positionOnLine of the point's data item, from start to end
      // and back, forever
      // https://docs.amcharts.com/v5/concepts/animations/#animations-as-settings
      animations: [
        {
          key: "positionOnLine",
          target: "dataItem",
          from: 0,
          to: 1,
          duration: 6000,
          loops: 0,
          yoyo: true,
          easing: "sine",
          ease: "inOut"
        }
      ]
    })
  });
});

pointSeries.data.setAll([
  {
    lineId: "route",
    positionOnLine: 0
  }
]);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

## Animating between states

When element [state](https://docs.amcharts.com/v5/concepts/settings/states/) is applied, its values will replace current setting values.

Normally, element would go directly to new setting values.

However, if we enable animated theme, or if we set required settings, the quantifiable values (numbers, colors, percent) will animate to new values.

These animations are controlled by two settings:

* `stateAnimationDuration` - duration of animation in seconds (default: `0`, or `600` if animated theme is enabled).
* `stateAnimationEasing` - an easing function for animation (default: `am5.ease.out($ease.cubic)`).

We can use these two settings to control how long transition of setting values takes, as well as what process easing function it uses:

TypeScript:

```ts
columnSeries.columns.template.setAll({
  interactive: true,
  stateAnimationDuration: 2000,
  stateAnimationEasing: am5.ease.out(am5.ease.cubic)
});
```

JavaScript:

```js
columnSeries.columns.template.setAll({
  interactive: true,
  stateAnimationDuration: 2000,
  stateAnimationEasing: am5.ease.out(am5.ease.cubic)
});
```

The following demo adds a custom state ("off") which is applied to the column when it's clicked.

The state application animation will use `stateAnimationDuration` and `stateAnimationEasing` settings.

Example: [Modifying state animation options](https://docs.amcharts.com/embeds/v5/modifying-state-animation-options/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 250px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    category: "Research",
    value: 690
  },
  {
    category: "Marketing",
    value: 1000
  },
  {
    category: "Sales",
    value: 850
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 400,
    max: 1400,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    interpolationDuration: 2000,
    interpolationEasing: am5.ease.inOut(am5.ease.elastic)
  })
);

series.data.setAll(data);

// Create custoim state on columns
series.columns.template.states.create("off", {
  fillOpacity: 0.1,
  strokeOpacity: 0.1
});

series.columns.template.setAll({
  interactive: true,
  stateAnimationDuration: 2000,
  stateAnimationEasing: am5.ease.out(am5.ease.cubic)
});

series.columns.template.events.on("click", function (ev) {
  if (ev.target.get("fillOpacity") !== 1) {
    ev.target.states.applyAnimate("default");
  } else {
    ev.target.states.applyAnimate("off");
  }
});
```

## Animating data values

Updating data values is done via `setIndex()` method of series data, as per "[Data](https://docs.amcharts.com/v5/concepts/data/#updating-existing-data)" tutorial:

TypeScript:

```ts
series.data.setIndex(1, {
  category: "Marketing",
  value: 1000
});
```

JavaScript:

```js
series.data.setIndex(1, {
  category: "Marketing",
  value: 1000
});
```

Once called, series will animate its data item (e.g. column) to new value.

The speed and style of such animation is controlled using two settings:

* `interpolationDuration` - duration of animation in milliseconds (default: `0`, or `600` if animated theme is enabled).
* `interpolationEasing` - an easing function for animation (default: `am5.ease.out($ease.cubic)`).

Using these two settings, we can control how long animation to new value takes, and how it progresses:

TypeScript:

```ts
var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series", 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    categoryXField: "category",
    interpolationDuration: 2000,
    interpolationEasing: am5.ease.inOut(am5.ease.elastic)
  }) 
);
```

JavaScript:

```js
var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series", 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    categoryXField: "category",
    interpolationDuration: 2000,
    interpolationEasing: am5.ease.inOut(am5.ease.elastic)
  }) 
);
```

Example: [Updating series values](https://docs.amcharts.com/embeds/v5/updating-series-values/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 250px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    category: "Research",
    value: 690
  },
  {
    category: "Marketing",
    value: 1000
  },
  {
    category: "Sales",
    value: 850
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 400,
    max: 1400,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    interpolationDuration: 2000,
    interpolationEasing: am5.ease.inOut(am5.ease.elastic)
  })
);

series.data.setAll(data);

// Update data
setInterval(function () {
  series.data.setIndex(1, {
    category: "Marketing",
    value: Math.round(Math.random() * 800 + 400)
  });
}, 3000);
```

## Forcing appearance animation

### Triggering appearance

Normally, elements that are not hidden would be shown on in chart immediately.

We can force it to "appear" using their `appear()` method.

The actual "appearance" animation may take multiple forms, but most commonly it will make element fade in.

Calling `appear()` method does two things:

1. Hides the element and applies hidden state.
2. Unhides the elements and animates to default state.

It can be used on any element from simple button to series to a whole chart:

TypeScript:

```ts
chart.appear();
```

JavaScript:

```js
chart.appear();
```

### Timing appearance

When called without parameters, appearance will take place immediately, and will take number of milliseconds specified in theme (most commonly enabled by using Animated theme).

We can control that using two parameters to `appear()`:

1. Duration in milliseconds.
2. Delay in milliseconds.

TypeScript:

```ts
chart.appear(2000, 500);
```

JavaScript:

```js
chart.appear(2000, 500);
```

The above will make chart fade-in animation take 2 seconds, and will be delayed by half a second.

### Automatic appearance

Instead of calling `appear()`, we can set element's `autoAppear` setting to `true`. The element will then play its appearance animation by itself, when it is first drawn.

Duration and delay are set with `appearDuration` and `appearDelay` settings, both in milliseconds. If `appearDuration` is not set, element's `stateAnimationDuration` is used.

TypeScript:

```ts
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    autoAppear: true,
    appearDuration: 1000,
    appearDelay: 100
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    autoAppear: true,
    appearDuration: 1000,
    appearDelay: 100
  })
);
```

Since these are regular settings, this is how a [JSON config](https://docs.amcharts.com/v5/concepts/serializing/) or a [\<am5-chart> element](https://docs.amcharts.com/v5/getting-started/integrations/am5-chart-element/) gets its opening animation.

A few things to know:

* The animation plays once. Data updates do not play it again. Turning the setting off and back on does.
* Elements created from a template, e.g. columns, play it as each one is created.
* An element that starts hidden stays hidden.

> **Note:** `autoAppear`, `appearDuration`, and `appearDelay` are available since version 5.21.0.

Example: [Opening animation with autoAppear](https://docs.amcharts.com/embeds/v5/opening-animation-with-autoappear/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// autoAppear plays the opening animation when the chart is first drawn,
// the same as calling chart.appear(1000, 100)
// https://docs.amcharts.com/v5/concepts/animations/#automatic-appearance
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    autoAppear: true,
    appearDuration: 1000,
    appearDelay: 100
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create series
// A series with autoAppear waits for its data, then grows its columns
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    sequencedInterpolation: true,
    autoAppear: true,
    appearDuration: 1000
  })
);

// Set data
var data = [
  { category: "Research", value: 1000 },
  { category: "Marketing", value: 1200 },
  { category: "Sales", value: 850 },
  { category: "Support", value: 600 },
  { category: "Legal", value: 300 }
];

xAxis.data.setAll(data);
series.data.setAll(data);

// No appear() calls needed
```

## Animation of series

### Initial animation

Created series will appear on chart right away. Should we want to make it play out initial animation, we can call it's `appear()` method right after creating its object:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
series.appear();
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
series.appear();
```

Alternatively, set `autoAppear: true` on the series (see "[Automatic appearance](#automatic-appearance)"). A series with it waits for its data before animating, so it works even if data is loaded later.

### Sequenced animations

When series animation is playing, all of its data items will be animating into place at the same time.

We can make them appear in sequence, one by one, by setting `sequencedInterpolation` to `true`.

We can also control the delay by which each subsequent data item starts animating by `sequencedDelay` setting, which indicates number of milliseconds.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    sequencedInterpolation: true,
    sequencedDelay: 100
  })
);
series.appear();
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    sequencedInterpolation: true,
    sequencedDelay: 100
  })
);
series.appear();
```

## Easing functions

### Basic easing functions

Easing functions are used by animations to control the effect of progress of the animation.

Different easing functions create different feeling, e.g. "out" function will gradually slow down animation at the end, creating effect of the "braking".

TypeScript:

```ts
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.elastic
});
```

JavaScript:

```js
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.elastic
});
```

There is a number of easing functions:

| Function           | Comment                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------- |
| `am5.ease.bounce`  | Will "bounce" at the end.                                                               |
| `am5.ease.circle`  |                                                                                         |
| `am5.ease.cubic`   |                                                                                         |
| `am5.ease.elastic` | Will overshoot end value, then bounce back a few times before settling down at the end. |
| `am5.ease.exp`     |                                                                                         |
| `am5.ease.linear`  | Constant speed during all duration.                                                     |
| `am5.ease.pow`     |                                                                                         |
| `am5.ease.quad`    |                                                                                         |
| `am5.ease.sine`    |                                                                                         |

Below demo shows the behavior of various basic easing functions:

Example: [Easing functions](https://docs.amcharts.com/embeds/v5/easing-functions/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/percent.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  width: 400px;
  height: 200px;
  margin: auto;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100,
    layout: root.gridLayout
  })
);

function createAnimation(easing, title) {
  var animationContainer = container.children.push(
    am5.Container.new(root, {
      width: 100,
      height: 100
    })
  );

  var circle = animationContainer.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0xff621f),
      x: 50,
      y: 60
    })
  );

  var label = animationContainer.children.push(
    am5.Label.new(root, {
      text: title,
      fontSize: 12,
      x: 50,
      y: 100,
      centerX: am5.p50,
      centerY: am5.p100
    })
  );

  circle.animate({
    key: "y",
    to: 10,
    loops: Infinity,
    duration: 2000,
    easing: am5.ease.yoyo(easing)
  });
}

createAnimation(am5.ease.bounce, "am5.ease.bounce");
createAnimation(am5.ease.circle, "am5.ease.circle");
createAnimation(am5.ease.cubic, "am5.ease.cubic");
createAnimation(am5.ease.elastic, "am5.ease.elastic");
createAnimation(am5.ease.exp, "am5.ease.exp");
createAnimation(am5.ease.linear, "am5.ease.linear");
createAnimation(am5.ease.quad, "am5.ease.quad");
createAnimation(am5.ease.sine, "am5.ease.sine");
```

### Modifier functions

Besides basic easing functions, amCharts 5 comes with several "modifier" functions.

These functions take basic easing function as a parameter and modifies their output in some way.

TypeScript:

```ts
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});
```

JavaScript:

```js
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});
```

| Function         | Comment                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `am5.ease.inOut` | The basic easing function is applied when starting and ending animation.                                  |
| `am5.ease.out`   | The basic easing function is applied at the end animation.                                                |
| `am5.ease.yoyo`  | Plays animation to the end value, then returns back to the starting value, using supplied basic function. |

Example: [Easing functions](https://docs.amcharts.com/embeds/v5/easing-functions-2/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/percent.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  width: 550px;
  height: 450px;
  margin: auto;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100,
    layout: root.gridLayout
  })
);

function createAnimation(easing, title) {
  var animationContainer = container.children.push(
    am5.Container.new(root, {
      width: 130,
      height: 130
    })
  );

  var circle = animationContainer.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0xff621f),
      x: am5.p50,
      y: 60
    })
  );

  var label = animationContainer.children.push(
    am5.Label.new(root, {
      text: title,
      fontSize: 12,
      x: am5.p50,
      y: 130,
      centerX: am5.p50,
      centerY: am5.p100
    })
  );

  circle.animate({
    key: "y",
    from: 60,
    to: 10,
    loops: Infinity,
    duration: 4000,
    easing: am5.ease.yoyo(easing)
  });
}

createAnimation(am5.ease.inOut(am5.ease.bounce), "am5.ease.inOut(\n  am5.ease.bounce\n)");
createAnimation(am5.ease.inOut(am5.ease.cubic), "am5.ease.inOut(\n  am5.ease.cubic\n)");
createAnimation(am5.ease.inOut(am5.ease.elastic), "am5.ease.inOut(\n  am5.ease.elastic\n)");
createAnimation(am5.ease.inOut(am5.ease.linear), "am5.ease.inOut(\n  am5.ease.linear\n)");

createAnimation(am5.ease.out(am5.ease.bounce), "am5.ease.out(\n  am5.ease.bounce\n)");
createAnimation(am5.ease.out(am5.ease.cubic), "am5.ease.out(\n  am5.ease.cubic\n)");
createAnimation(am5.ease.out(am5.ease.elastic), "am5.ease.out(\n  am5.ease.elastic\n)");
createAnimation(am5.ease.out(am5.ease.linear), "am5.ease.out(\n  am5.ease.linear\n)");

createAnimation(am5.ease.yoyo(am5.ease.bounce), "am5.ease.yoyo(\n  am5.ease.bounce\n)");
createAnimation(am5.ease.yoyo(am5.ease.cubic), "am5.ease.yoyo(\n  am5.ease.cubic\n)");
createAnimation(am5.ease.yoyo(am5.ease.elastic), "am5.ease.yoyo(\n  am5.ease.elastic\n)");
createAnimation(am5.ease.yoyo(am5.ease.linear), "am5.ease.yoyo(\n  am5.ease.linear\n)");
```

### Easing by name

`am5.ease.byName(name, mode)` returns an easing function by its name — `"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"` or `"elastic"` — optionally wrapped by `mode`: `"in"` (default), `"out"` or `"inOut"`. An unknown name gives `linear`.

`am5.ease.easingInfo(easing)` does the opposite: it returns `{ easing, ease?, yoyo? }` describing a function, or `undefined` for one that cannot be named. Functions made with `out()`, `inOut()` and `yoyo()` keep the name of the function they wrap; a function of your own, a wrapped `pow`, or a combination like `out(yoyo(...))` has none.

```javascript
am5.ease.byName("cubic", "out");                     // same as am5.ease.out(am5.ease.cubic)
am5.ease.easingInfo(am5.ease.yoyo(am5.ease.sine));   // { easing: "sine", yoyo: true }
am5.ease.easingInfo(function(t) { return t * t; });  // undefined
```
