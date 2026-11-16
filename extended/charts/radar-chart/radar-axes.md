---
title: "Radar axes"
source: "https://docs.amcharts.com/v5/charts/radar-chart/radar-axes/"
scraped: "2026-11-16"
---

Radar chart reuses same axes types as XY chart. However it uses different axis renderers. While those are very similar to XY renderers in configuration, there some differences. This tutorial will address those.

## Labels on a circular axis

Configuration of labels on an axis is done via axis renderer's `labels.template` property. For more information about it, please refer to "[Axes: Labels](https://docs.amcharts.com/v5/charts/xy-chart/axes/#labels)" tutorial

### Label type

Circular axis renderer positions its labels neatly curved along the axis line by default.

This can be configured via label template's `textType` setting.

Available options for use on a radar chart are: `"circular"` (default), `"radial"`, and `"adjusted"`.

TypeScript:

```ts
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial"
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial"
});
```

![](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-axes/radar_labels_circular.png "`textType: 'circular'` (default)")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-axes/radar_labels_adjusted-2.png "`textType: 'radial'`")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-axes/radar_labels_adjusted.png "`textType: 'adjusted'`")

Example: [Radar chart axis labels](https://docs.amcharts.com/embeds/v5/radar-chart-axis-labels/)

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
  height: 400px;
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
    wheelY: "zoomX",
    layout: root.horizontalLayout,
    radius: am5.percent(70),
    innerRadius: am5.percent(50)
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250,
    value2: 200
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110,
    value2: 210
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185,
    value2: 85
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105,
    value2: 244
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20
    })
  })
);

yAxis.get("renderer").labels.template.setAll({
  visible: false
});

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial"
});

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5radar.RadarColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Add cursor
chart.set(
  "cursor",
  am5radar.RadarCursor.new(root, {
    behavior: "zoomX",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);
```

### Label radius

Label setting `radius` that can be set via its template controls distance from the axis line.

It's a number in pixels. The higher the radius, the further from the slice edge the label will be:

TypeScript:

```ts
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial",
  radius: 10
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial",
  radius: 10
});
```

### Labels inside plot area

We can set `inside` setting to `true` on the label template, if we want the labels to appear inside charts plot area.

If we do so, the `radius` setting will revert: it will mean radius in pixels inwards, rather than outwards from the axis line.

TypeScript:

```ts
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial",
  radius: 10,
  inside: true
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial",
  radius: 10,
  inside: true
});
```

## Axis radii and angles

Just like radar chart itself can have `radius`, `innerRadius`, `startAngle`, and `endAngle` settings, so can circular axis renderer.

Percent value on `radius` and `innerRadius` work in relation to the radar chart itself, not chart container.

We can also use negative values in `innerRadius`. Those will mean pixel distance from the outer radius. This allows creating fixed-width axis.

`startAngle` and `endAngle` work just like for radar chart: we can specify where each axis starts and where it ends precisely, even if it is not the same values as the chart itself.

Here's an example of a radar chart using two circular axes with different angle settings:

![](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-axes/dual_radar_axis.png)

The above chart has following setup:

TypeScript:

```ts
let chart = root.container.children.push( 
  am5radar.RadarChart.new(root, {
    radius: am5.percent(70),
    innerRadius: am5.percent(50),
    startAngle: -160,
    endAngle: -20
  }) 
);

let xAxis1 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      startAngle: -160,
      endAngle: -95
    })
  })
);

let xAxis2 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      startAngle: -85,
      endAngle: -20
    })
  })
);
```

JavaScript:

```js
var chart = root.container.children.push( 
  am5radar.RadarChart.new(root, {
    radius: am5.percent(70),
    innerRadius: am5.percent(50),
    startAngle: -160,
    endAngle: -20
  }) 
);

var xAxis1 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      startAngle: -160,
      endAngle: -95
    })
  })
);

var xAxis2 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      startAngle: -85,
      endAngle: -20
    })
  })
);
```

Example: [Radar chart axis labels](https://docs.amcharts.com/embeds/v5/radar-chart-axis-labels-2/)

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
  height: 400px;
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
    wheelY: "zoomX",
    layout: root.horizontalLayout,
    radius: am5.percent(70),
    innerRadius: am5.percent(50),
    startAngle: -160,
    endAngle: -20
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250,
    value2: 200
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110,
    value2: 210
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185,
    value2: 85
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105,
    value2: 244
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20
    })
  })
);

yAxis.get("renderer").labels.template.setAll({
  visible: false
});

// Create X-Axis
let xAxis1 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      minGridDistance: 20,
      startAngle: -160,
      endAngle: -95
    })
  })
);

xAxis1.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial"
});

let xAxis2 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      minGridDistance: 20,
      startAngle: -85,
      endAngle: -20
    })
  })
);

xAxis2.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial"
});

// Create series
function createSeries(name, field, xAxis) {
  var series = chart.series.push(
    am5radar.RadarColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value", xAxis1);
createSeries("Series #2", "value2", xAxis2);
```
