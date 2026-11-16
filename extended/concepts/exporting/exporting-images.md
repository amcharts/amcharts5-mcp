---
title: "Exporting to image formats"
source: "https://docs.amcharts.com/v5/concepts/exporting/exporting-images/"
scraped: "2026-11-16"
---

> This tutorial looks at configuration options for chart snapshot export with Exporting plugin.

This tutorial looks at configuration options for chart snapshot export with [Exporting](https://docs.amcharts.com/v5/concepts/exporting/) plugin.

> **Note:** Charts can also be exported as SVG vector images. Quality, pixel ratio, and size options below do not apply to SVG, while combining images and modifying the export do. For more, see "[Exporting to SVG](https://docs.amcharts.com/v5/concepts/exporting/exporting-svg/)".

## Image quality

PNG or JPEG formats support `quality` option.

It's a numeric value between `0` (zero) and `1` (one), where zero means worst quality, and one - the highest possible quality.

For very large images, we might want to reduce quality so that export does not result in huge files.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    quality: 0.7
  },
  jpgOptions: {
    quality: 0.7
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    quality: 0.7
  },
  jpgOptions: {
    quality: 0.7
  }
});
```

## Pixel ratio

Most of the computer screen nowadays have a pixel ratio.

That means that actual screen resolution is times higher than the OS resolution.

For example the screen matrix might support 4800 pixels, but the screen is set to show only 2400 pixels - two hardware pixels per one virtual pixels.

This results in super sharp images on screen.

When exporting, the image will have actual resolution - like it would be without pixel ratio applied - 4800 pixels as per example above.

If we'd rather export an image down-sampled to the view pixels (2400), we can set `maintainPixelRatio` option for image formats to `true`:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    maintainPixelRatio: true
  },
  jpgOptions: {
    maintainPixelRatio: true
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    maintainPixelRatio: true
  },
  jpgOptions: {
    maintainPixelRatio: true
  }
});
```

## Sizing exported image

Image formats (`pngOptions` and `jpgOptions`) have four options that can modify size of the exported image:

| Option      | Comment                                                     |
| ----------- | ----------------------------------------------------------- |
| `minWidth`  | Exported image will not be smaller than X pixels in width.  |
| `maxWidth`  | Exported image will not be bigger than X pixels in width.   |
| `minHeight` | Exported image will not be smaller than X pixels in height. |
| `maxHeight` | Exported image will not be bigger than X pixels in height.  |

When exporting an image, plugin will size the image to fit into all of these constraints that are set in options.

The image will still maintain its width/height ratio.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    minWidth: 1000,
    maxWidth: 2000
  },
  jpgOptions: {
    minWidth: 1000,
    maxWidth: 2000
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    minWidth: 1000,
    maxWidth: 2000
  },
  jpgOptions: {
    minWidth: 1000,
    maxWidth: 2000
  }
});
```

The above will ensure that exported image is within 1000 and 2000 pixels in width.

If the source chart is narrower than 1000 pixels, export will re-render it to be exactly 1000 pixels wide.

Similarly, if it is wider than 2000 pixels, export will re-render it to 2000 pixels.

## Combining multiple images

It's possible to include additional root elements into exported images, by including it into exporting's `extraImages` setting.

The following code will add an external legend to the bottom of the exported image:

TypeScript:

```ts
var exporting = am5plugins_exporting.Exporting.new(chartRoot, {
  menu: am5plugins_exporting.ExportingMenu.new(chartRoot, {}),
  extraImages: [legendRoot]
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(chartRoot, {
  menu: am5plugins_exporting.ExportingMenu.new(chartRoot, {}),
  extraImages: [legendRoot]
});
```

The items in `extraImages` can either be root elements (they will be added to the bottom of the exported image), or an object that implements `IExportingImageSource` interface.

Using a wrapper objects allows specifying a number of additional options, such as position and margins of the extra images:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(chartRoot, {
  menu: am5plugins_exporting.ExportingMenu.new(chartRoot, {}),
  extraImages: [{
    source: legendRoot,
    marginTop: 20
  }]
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(chartRoot, {
  menu: am5plugins_exporting.ExportingMenu.new(chartRoot, {}),
  extraImages: [{
    source: legendRoot,
    marginTop: 20
  }]
});
```

Extra images are included in SVG export, too.

Here's a working example:

Example: [Including legend from external container into export](https://docs.amcharts.com/embeds/v5/including-legend-from-external-container-into-export/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/percent.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

HTML:

```html
<h2>Chart</h2>
<div id="chartdiv"></div>

<h2>Legend</h2>
<div id="legenddiv"></div>
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
  border: 1px dotted #888;
}

#legenddiv {
  width: 100%;
  height: 100px;
  border: 1px dotted #888;
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

/**
 * Chart
 */

// Create chartRoot and chart
var chartRoot = am5.Root.new("chartdiv");

chartRoot.setThemes([am5themes_Animated.new(chartRoot)]);

var chart = chartRoot.container.children.push(
  am5percent.PieChart.new(chartRoot, {
    layout: chartRoot.horizontalLayout
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
  },
  {
    country: "Netherlands",
    sales: 90000
  },
  {
    country: "Portugal",
    sales: 25000
  },
  {
    country: "Germany",
    sales: 70000
  },
  {
    country: "Austria",
    sales: 75000
  },
  {
    country: "Belgium",
    sales: 40000
  },
  {
    country: "Poland",
    sales: 60000
  },
  {
    country: "Switzerland",
    sales: 90000
  },
  {
    country: "Italy",
    sales: 70000
  },
  {
    country: "Greece",
    sales: 45000
  },
  {
    country: "Czechia",
    sales: 40000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(chartRoot, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.data.setAll(data);
series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

/**
 * Legend
 */

// Create chartRoot and chart
var legendRoot = am5.Root.new("legenddiv");

legendRoot.setThemes([am5themes_Animated.new(chartRoot)]);

var legend = legendRoot.container.children.push(
  am5.Legend.new(legendRoot, {
    width: am5.percent(100),
    centerX: am5.percent(50),
    x: am5.percent(50)
    //layout: legendRoot.grid
  })
);

legend.data.setAll(series.dataItems);

/**
 * Exporting
 */
var exporting = am5plugins_exporting.Exporting.new(chartRoot, {
  menu: am5plugins_exporting.ExportingMenu.new(chartRoot, {}),
  extraImages: [
    {
      source: legendRoot,
      marginTop: 20
    }
  ]
});
```

## Modifying exported image

### Hiding/showing elements

It's also possible to modify exported image using exporting plugin's events: `exportstarted` and `exportfinished`.

All we need to do is to make any necessary modifications to our chart when `exportstarted` kicks in, then revert those back on `exportfinished`.

The following code will add a hidden title to the chart, which will be revealed briefly only for export.

TypeScript:

```ts
let title = chart.children.unshift(am5.Label.new(root, {
  text: "Sales by country ($M)",
  fontSize: 24,
  textAlign: "center",
  width: am5.p100,
  visible: false
}));

let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

exporting.events.on("exportstarted", function() {
  title.show(0);
});

exporting.events.on("exportfinished", function() {
  title.hide(0);
});
```

JavaScript:

```js
var title = chart.children.unshift(am5.Label.new(root, {
  text: "Sales by country ($M)",
  fontSize: 24,
  textAlign: "center",
  width: am5.p100,
  visible: false
}));

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

exporting.events.on("exportstarted", function() {
  title.show(0);
});

exporting.events.on("exportfinished", function() {
  title.hide(0);
});
```

Example: [Modifying chart for export](https://docs.amcharts.com/embeds/v5/modifying-chart-for-export/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

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
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50,
  centerX: am5.p100,
  paddingRight: 15
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "country",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "country",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  })
);

// Set data
var data = [
  {
    country: "USA",
    value: 2025
  },
  {
    country: "China",
    value: 1882
  },
  {
    country: "Japan",
    value: 1809
  },
  {
    country: "Germany",
    value: 1322
  },
  {
    country: "UK",
    value: 1122
  },
  {
    country: "France",
    value: 1114
  },
  {
    country: "India",
    value: 984
  },
  {
    country: "Spain",
    value: 711
  },
  {
    country: "Netherlands",
    value: 665
  },
  {
    country: "South Korea",
    value: 443
  },
  {
    country: "Canada",
    value: 441
  }
];

xAxis.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);

// Add chart title
// Hide it by default, but make it show on export
var title = chart.children.unshift(
  am5.Label.new(root, {
    text: "Sales by country ($M)",
    fontSize: 24,
    textAlign: "center",
    width: am5.p100,
    visible: false
  })
);

// Add export
// https://docs.amcharts.com/v5/concepts/exporting/
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

exporting.events.on("exportstarted", function () {
  title.show(0);
});

exporting.events.on("exportfinished", function () {
  title.hide(0);
});
```

### Resizing the whole chart

The same approach would work for resizing the export, too.

We can temporarily change the width/height of the chart's container `<div>` when `exportstarted` kicks in, then reset it back when `exportfinished` triggers.

To ensure that chart takes in the new sizing, we will also need to call `resize()` method of the root element.

TypeScript:

```ts
exporting.events.on("exportstarted", function() {
  root.dom.style.width = "200px";
  root.dom.style.height = "300px";
  root.resize();
});

exporting.events.on("exportfinished", function() {
  root.dom.style.width = "";
  root.dom.style.height = "";
});
```

JavaScript:

```js
exporting.events.on("exportstarted", function() {
  root.dom.style.width = "200px";
  root.dom.style.height = "300px";
  root.resize();
});

exporting.events.on("exportfinished", function() {
  root.dom.style.width = "";
  root.dom.style.height = "";
});
```

Example: [Resizing exported chart](https://docs.amcharts.com/embeds/v5/resizing-exported-chart/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

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
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50,
  centerX: am5.p100,
  paddingRight: 15
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "country",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "country",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  })
);

// Set data
var data = [
  {
    country: "USA",
    value: 2025
  },
  {
    country: "China",
    value: 1882
  },
  {
    country: "Japan",
    value: 1809
  },
  {
    country: "Germany",
    value: 1322
  },
  {
    country: "UK",
    value: 1122
  },
  {
    country: "France",
    value: 1114
  },
  {
    country: "India",
    value: 984
  },
  {
    country: "Spain",
    value: 711
  },
  {
    country: "Netherlands",
    value: 665
  },
  {
    country: "South Korea",
    value: 443
  },
  {
    country: "Canada",
    value: 441
  }
];

xAxis.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);

// Add chart title
// Hide it by default, but make it show on export
var title = chart.children.unshift(
  am5.Label.new(root, {
    text: "Sales by country ($M)",
    fontSize: 24,
    textAlign: "center",
    width: am5.p100,
    visible: false
  })
);

// Add export
// https://docs.amcharts.com/v5/concepts/exporting/
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

exporting.events.on("exportstarted", function () {
  root.dom.style.width = "200px";
  root.dom.style.height = "300px";
  root.resize();
});

exporting.events.on("exportfinished", function () {
  root.dom.style.width = "";
  root.dom.style.height = "";
});
```
