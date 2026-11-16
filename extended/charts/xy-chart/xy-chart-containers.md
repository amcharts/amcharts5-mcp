---
title: "Containers of an XY chart"
source: "https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/"
scraped: "2026-11-16"
---

This tutorial looks at the container elements comprising internal structure of an XY chart, and how we can configure them.

## Built-in chart containers

An XY chart comes with a predefined list of container hierarchy, accessible via chart's properties:

| Property               | Default layout | Comment                                                                |
| ---------------------- | -------------- | ---------------------------------------------------------------------- |
| N/A (chart itself)     | `none`         | Main chart container.                                                  |
| `topAxesContainer`     | `vertical`     | X axes with `renderer.opposite: true` set are put into this container. |
| `bottomAxesContainer`  | `vertical`     | X axes are put into this container                                     |
| `yAxesAndPotContainer` | `horizontal`   | Houses sub-containers for Y axes and plots (series).                   |
| `leftAxesContainer`    | `horizontal`   | Y axes are put into this container.                                    |
| `rightAxesContainer`   | `horizontal`   | Y axes with `renderer.opposite: true` set are put into this container. |
| `plotContainer`        | `none`         | Series are plot in this container.                                     |

## Container structure

![](https://docs.amcharts.com/v5/images/charts/xy-chart/xy-chart-containers/V5_-Containter-structure.png)

## Configuring containers

All XY chart containers are elements of type `Container`.

We can use to configure them as we see fit.

### Adding outline/background

Configuring outlines or background is done like with any other container: but adding a `Rectangle` element into its [`background` setting](https://docs.amcharts.com/v5/concepts/common-elements/containers/#background).

The following code will add a fill and an outline for the whole chart's area:

TypeScript:

```ts
chart.set("background", am5.Rectangle.new(root, {
  stroke: am5.color(0x297373),
  strokeOpacity: 0.5,
  fill: am5.color(0x297373),
  fillOpacity: 0.2
}));
```

JavaScript:

```js
chart.set("background", am5.Rectangle.new(root, {
  stroke: am5.color(0x297373),
  strokeOpacity: 0.5,
  fill: am5.color(0x297373),
  fillOpacity: 0.2
}));
```

`plotContainer` already has background created for it for internal reasons, so we can just re-use it instead of creating a new one:

TypeScript:

```ts
chart.plotContainer.get("background").setAll({
  stroke: am5.color(0x297373),
  strokeOpacity: 0.5,
  fill: am5.color(0x297373),
  fillOpacity: 0.2
});
```

JavaScript:

```js
chart.plotContainer.get("background").setAll({
  stroke: am5.color(0x297373),
  strokeOpacity: 0.5,
  fill: am5.color(0x297373),
  fillOpacity: 0.2
});
```

Example: [Fill on a plot container](https://docs.amcharts.com/embeds/v5/fill-on-a-plot-container/)

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

chart.plotContainer.get("background").setAll({
  stroke: am5.color(0x297373),
  strokeOpacity: 0.5,
  fill: am5.color(0x297373),
  fillOpacity: 0.2
});

// Add legend
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

var data = [
  {
    year: "2021",
    europe: 2.5,
    namerica: 2.5,
    asia: 2.1,
    lamerica: 1,
    meast: 0.8,
    africa: 0.4
  },
  {
    year: "2022",
    europe: 2.6,
    namerica: 2.7,
    asia: 2.2,
    lamerica: 0.5,
    meast: 0.4,
    africa: 0.3
  },
  {
    year: "2023",
    europe: 2.8,
    namerica: 2.9,
    asia: 2.4,
    lamerica: 0.3,
    meast: 0.9,
    africa: 0.5
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),

    tooltip: am5.Tooltip.new(root, {
      themeTags: ["axis"],
      animationDuration: 200
    })
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function makeSeries(name, fieldName) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: fieldName,
      categoryXField: "year"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}:{valueY}",
    width: am5.percent(90),
    tooltipY: 0
  });

  series.data.setAll(data);

  // Make stuff animate on load
  // https://docs.amcharts.com/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationY: 0,
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: 0,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);
}

makeSeries("Europe", "europe");
makeSeries("North America", "namerica");
makeSeries("Asia", "asia");
makeSeries("Latin America", "lamerica");
makeSeries("Middle East", "meast");
makeSeries("Africa", "africa");

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

### Changing layout

Changing layout of the container may alter the way and order chart elements are laid out.

For example, if we push the legend into chart's children list, setting its `layout` to vertical will put legend below everything else, while setting it to horizontal, will put legend to the right of the chart.

For more information, visit "Legend: [Positioning](https://docs.amcharts.com/v5/concepts/legend/#positioning)".

## Adding custom elements

We can use any chart container to add elements to it.

The following code will add a chart title to the top of the chart by pushing a `Label` element into `topAxesContainer` which is always on top:

TypeScript:

```ts
chart.topAxesContainer.children.push(am5.Label.new(root, {
  text: "Sales breakdown by region",
  fontSize: 20,
  fontWeight: "400",
  x: am5.p50,
  centerX: am5.p50
}));
```

JavaScript:

```js
chart.topAxesContainer.children.push(am5.Label.new(root, {
  text: "Sales breakdown by region",
  fontSize: 20,
  fontWeight: "400",
  x: am5.p50,
  centerX: am5.p50
}));
```

Example: [Chart title](https://docs.amcharts.com/embeds/v5/chart-title/)

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

chart.topAxesContainer.children.push(
  am5.Label.new(root, {
    text: "Sales breakdown by region",
    fontSize: 20,
    fontWeight: "400",
    x: am5.p50,
    centerX: am5.p50
  })
);

// Add legend
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

var data = [
  {
    year: "2021",
    europe: 2.5,
    namerica: 2.5,
    asia: 2.1,
    lamerica: 1,
    meast: 0.8,
    africa: 0.4
  },
  {
    year: "2022",
    europe: 2.6,
    namerica: 2.7,
    asia: 2.2,
    lamerica: 0.5,
    meast: 0.4,
    africa: 0.3
  },
  {
    year: "2023",
    europe: 2.8,
    namerica: 2.9,
    asia: 2.4,
    lamerica: 0.3,
    meast: 0.9,
    africa: 0.5
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),

    tooltip: am5.Tooltip.new(root, {
      themeTags: ["axis"],
      animationDuration: 200
    })
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function makeSeries(name, fieldName) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: fieldName,
      categoryXField: "year"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}:{valueY}",
    width: am5.percent(90),
    tooltipY: 0
  });

  series.data.setAll(data);

  // Make stuff animate on load
  // https://docs.amcharts.com/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationY: 0,
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: 0,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);
}

makeSeries("Europe", "europe");
makeSeries("North America", "namerica");
makeSeries("Asia", "asia");
makeSeries("Latin America", "lamerica");
makeSeries("Middle East", "meast");
makeSeries("Africa", "africa");

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```
