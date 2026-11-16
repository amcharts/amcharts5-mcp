---
title: "Heat rules"
source: "https://docs.amcharts.com/v5/concepts/settings/heat-rules/"
scraped: "2026-11-16"
---

Heat rules is a way to apply value-dependent setting values on series elements.

## Prerequisites

In order for heat rules to function properly on series, it needs aggregate values (high and low) to be calculated for the series.

Normally, series does not do that in order not to waste resources.

To enable, we just need to set `calculateAggregates` setting to `true`:

TypeScript:

```ts
let series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series",
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    valueXField: "date",
    calculateAggregates: true
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
    valueXField: "date",
    calculateAggregates: true
  })
);
```

## Creating

A heat rule is a generic object that corresponds to `IHeatRule` interface.

It has the following required properties:

| Property    | Comment                                                                                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`    | A template for target element that heat rules will be applied to. E.g. column series' `columns.template`.                                                        |
| `key`       | A settings key to apply heat value to on actual elements.                                                                                                        |
| `min`       | Lower end value of the spectrum, corresponding to the lowest value in all elements affected by the heat rule. Not needed if [`stops`](#multiple-stops) is set.   |
| `max`       | Higher end value of the spectrum, corresponding to the highest value in all elements affected by the heat rule. Not needed if [`stops`](#multiple-stops) is set. |
| `dataField` | A data field to look for element's "value".                                                                                                                      |

## Series elements

To apply heat rules to series elements, like a column, we can use its template as a `target` for the heat rule.

Here's an example of a heat rule that applies color to column series columns based on their `valueY` data field (same data field that is used to determine column height).

TypeScript:

```ts
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "valueY",
  min: am5.color(0xff621f),
  max: am5.color(0x661F00),
  key: "fill"
}])
```

JavaScript:

```js
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "valueY",
  min: am5.color(0xff621f),
  max: am5.color(0x661F00),
  key: "fill"
}])
```

Example: [Heat rules on ColumnSeries](https://docs.amcharts.com/embeds/v5/heat-rules-on-columnseries/)

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
    date: new Date(2021, 0, 1).getTime(),
    value: 1000
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    calculateTotals: true,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      calculateAggregates: true
    })
  );

  series.columns.template.setAll({
    strokeOpacity: 0
  });

  series.set("heatRules", [
    {
      target: series.columns.template,
      dataField: "valueY",
      min: am5.color(0xff621f),
      max: am5.color(0x661f00),
      key: "fill"
    }
  ]);

  series.data.setAll(data);
}

createSeries("Series with breaks", "value");
```

## Arbitrary value

We're not limited to binding to a data field that is used for actually plotting the series.

Each series also defines a generic `"value"` data field, which can be used for heat rules.

TypeScript:

```ts
var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: name,
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueField: "heatValue",
    valueYField: field, 
    valueXField: "date",
    calculateAggregates: true
  }) 
);

series.setAll({
  heatRules: [{
    target: series.columns.template,
    dataField: "value",
    min: am5.color(0xff621f),
    max: am5.color(0x661F00),
    key: "fill"
  }]
});
```

JavaScript:

```js
var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: name,
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueField: "heatValue",
    valueYField: field, 
    valueXField: "date",
    calculateAggregates: true
  }) 
);

series.setAll({
  heatRules: [{
    target: series.columns.template,
    dataField: "value",
    min: am5.color(0xff621f),
    max: am5.color(0x661F00),
    key: "fill"
  }]
});
```

Example: [Heat rules on ColumnSeries](https://docs.amcharts.com/embeds/v5/heat-rules-on-columnseries-2/)

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
    date: new Date(2021, 0, 1).getTime(),
    value: 1000,
    heatValue: 10
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    heatValue: 15
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    heatValue: 3
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    heatValue: 12
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    heatValue: 8
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    calculateTotals: true,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueField: "heatValue",
      valueYField: field,
      valueXField: "date",
      calculateAggregates: true
    })
  );

  series.columns.template.setAll({
    strokeOpacity: 0
  });

  series.setAll({
    heatRules: [
      {
        target: series.columns.template,
        dataField: "value",
        min: am5.color(0xff621f),
        max: am5.color(0x661f00),
        key: "fill"
      }
    ]
  });

  series.data.setAll(data);
}

createSeries("Series with breaks", "value");
```

## Bullets

Bullets do not have a dedicated template in series, so they need their template (for use in a heat rule) to be created explicitly:

TypeScript:

```ts
let circleTemplate: am5.Template<am5.Circle> = am5.Template.new({});

series.bullets.push(function() {
  const bulletCircle = am5.Circle.new(root, {
    radius: 5,
    fill: series.get("fill"),
    fillOpacity: 0.8
  }, circleTemplate);
  
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rules
series.set("heatRules", [{
  target: circleTemplate,
  min: 3,
  max: 60,
  dataField: "value",
  key: "radius"
}]);
```

ES6:

```ts
let circleTemplate = am5.Template.new({});

series.bullets.push(function() {
  const bulletCircle = am5.Circle.new(root, {
    radius: 5,
    fill: series.get("fill"),
    fillOpacity: 0.8
  }, circleTemplate);
  
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rules
series.set("heatRules", [{
  target: circleTemplate,
  min: 3,
  max: 60,
  dataField: "value",
  key: "radius"
}]);
```

JavaScript:

```js
var circleTemplate = am5.Template.new({});

series.bullets.push(function() {
  var bulletCircle = am5.Circle.new(root, {
    radius: 5,
    fill: series.get("fill"),
    fillOpacity: 0.8
  }, circleTemplate);
  
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rules
series.set("heatRules", [{
  target: circleTemplate,
  min: 3,
  max: 60,
  dataField: "value",
  key: "radius"
}]);
```

The above creates a `Template` object, which is then passed in as a second parameter to `new()` method of a `Circle` class, so it is tied to a template.

We can then use that template in a heat rule to use on circle's `radius` setting.

Example: [XY scatter chart with heat rules on bullets](https://docs.amcharts.com/embeds/v5/xy-scatter-chart-with-heat-rules-on-bullets/)

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
  height: 500px;
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
    panX: true,
    panY: true,
    wheelY: "zoomXY"
  })
);

// X-axis
var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    tooltip: am5.Tooltip.new(root, {}),
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

xAxis.children.push(
  am5.Label.new(root, {
    text: "GDP per Capita, USD",
    x: am5.p50,
    centerX: am5.p50
  })
);

// Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    tooltip: am5.Tooltip.new(root, {}),
    renderer: am5xy.AxisRendererY.new(root, {
      inversed: false
    })
  })
);

yAxis.children.unshift(
  am5.Label.new(root, {
    rotation: -90,
    text: "Life expectancy, years",
    y: am5.p50,
    centerX: am5.p50
  })
);

// Create series
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    calculateAggregates: true,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "y",
    valueXField: "x",
    valueField: "value"
  })
);

series.strokes.template.set("visible", false);

var circleTemplate = am5.Template.new({});

series.bullets.push(function () {
  var bulletCircle = am5.Circle.new(
    root,
    {
      radius: 5,
      fill: series.get("fill"),
      fillOpacity: 0.8,
      tooltipText:
        "[bold]{title}[/]\nLife expectancy: {valueY.formatNumber('#.0')}\nGDP: {valueX.formatNumber('#,###.')}\nPopulation: {value.formatNumber('#,###.')}"
    },
    circleTemplate
  );

  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rules
series.set("heatRules", [
  {
    target: circleTemplate,
    min: 3,
    max: 60,
    dataField: "value",
    key: "radius"
  }
]);

// Cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, { xAxis: xAxis, yAxis: yAxis, snapToSeries: [series] })
);

// Scrollbars
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical" }));

// Initial animations
series.appear(1500);
chart.appear(1500);

// Data
series.data.setAll([
  { title: "Afghanistan", x: 1349, y: 60.524, value: 33397058 },
  { title: "Albania", x: 6969, y: 77.185, value: 3227373 },
  { title: "Algeria", x: 6419, y: 70.874, value: 36485828 },
  { title: "Angola", x: 5838, y: 51.498, value: 20162517 },
  { title: "Argentina", x: 15714, y: 76.128, value: 41118986 },
  { title: "Armenia", x: 5059, y: 74.469, value: 3108972 },
  { title: "Australia", x: 36064, y: 82.364, value: 22918688 },
  { title: "Austria", x: 36731, y: 80.965, value: 8428915 },
  { title: "Azerbaijan", x: 9291, y: 70.686, value: 9421233 },
  { title: "Bahrain", x: 24472, y: 76.474, value: 1359485 },
  { title: "Bangladesh", x: 1792, y: 70.258, value: 152408774 },
  { title: "Belarus", x: 13515, y: 69.829, value: 9527498 },
  { title: "Belgium", x: 32585, y: 80.373, value: 10787788 },
  { title: "Benin", x: 1464, y: 59.165, value: 9351838 },
  { title: "Bhutan", x: 6130, y: 67.888, value: 750443 },
  { title: "Bolivia", x: 4363, y: 66.969, value: 10248042 },
  { title: "Bosnia and Herzegovina", x: 7664, y: 76.211, value: 3744235 },
  { title: "Botswana", x: 14045, y: 47.152, value: 2053237 },
  { title: "Brazil", x: 10383, y: 73.667, value: 198360943 },
  { title: "Brunei", x: 45658, y: 78.35, value: 412892 },
  { title: "Bulgaria", x: 11669, y: 73.448, value: 7397873 },
  { title: "Burkina Faso", x: 1363, y: 55.932, value: 17481984 },
  { title: "Burundi", x: 484, y: 53.637, value: 8749387 },
  { title: "Cambodia", x: 2076, y: 71.577, value: 14478320 },
  { title: "Cameroon", x: 2094, y: 54.61, value: 20468943 },
  { title: "Canada", x: 35992, y: 81.323, value: 34674708 },
  { title: "Cape Verde", x: 3896, y: 74.771, value: 505335 },
  { title: "Central African Rep.", x: 718, y: 49.517, value: 4575586 },
  { title: "Chad", x: 1768, y: 50.724, value: 11830573 },
  { title: "Chile", x: 15403, y: 79.691, value: 17423214 },
  { title: "China", x: 9501, y: 75.178, value: 1353600687 },
  { title: "Colombia", x: 8035, y: 73.835, value: 47550708 },
  { title: "Comoros", x: 1027, y: 60.661, value: 773344 },
  { title: "Congo, Dem. Rep.", x: 403, y: 49.643, value: 69575394 },
  { title: "Congo, Rep.", x: 4106, y: 58.32, value: 4233063 },
  { title: "Costa Rica", x: 10827, y: 79.712, value: 4793725 },
  { title: "Cote d'Ivoire", x: 1491, y: 50.367, value: 20594615 },
  { title: "Croatia", x: 13388, y: 76.881, value: 4387376 },
  { title: "Cuba", x: 10197, y: 79.088, value: 11249266 },
  { title: "Cyprus", x: 23092, y: 79.674, value: 1129166 },
  { title: "Czech Rep.", x: 22565, y: 77.552, value: 10565678 },
  { title: "Denmark", x: 32731, y: 79.251, value: 5592738 },
  { title: "Djibouti", x: 2244, y: 61.319, value: 922708 },
  { title: "Dominican Rep.", x: 6978, y: 73.181, value: 10183339 },
  { title: "Ecuador", x: 7903, y: 76.195, value: 14864987 },
  { title: "Egypt", x: 6013, y: 70.933, value: 83958369 },
  { title: "El Salvador", x: 5833, y: 72.361, value: 6264129 },
  { title: "Equatorial Guinea", x: 13499, y: 52.562, value: 740471 },
  { title: "Eritrea", x: 613, y: 62.329, value: 5580862 },
  { title: "Estonia", x: 18858, y: 74.335, value: 1339762 },
  { title: "Ethiopia", x: 958, y: 62.983, value: 86538534 },
  { title: "Fiji", x: 4195, y: 69.626, value: 875822 },
  { title: "Finland", x: 31551, y: 80.362, value: 5402627 },
  { title: "France", x: 29896, y: 81.663, value: 63457777 },
  { title: "Gabon", x: 13853, y: 63.115, value: 1563873 },
  { title: "Gambia", x: 747, y: 58.59, value: 1824777 },
  { title: "Georgia", x: 4943, y: 74.162, value: 4304363 },
  { title: "Germany", x: 34131, y: 80.578, value: 81990837 },
  { title: "Ghana", x: 1728, y: 60.979, value: 25545939 },
  { title: "Greece", x: 21811, y: 80.593, value: 11418878 },
  { title: "Guatemala", x: 5290, y: 71.77, value: 15137569 },
  { title: "Guinea", x: 965, y: 55.865, value: 10480710 },
  { title: "Guinea-Bissau", x: 593, y: 54.054, value: 1579632 },
  { title: "Guyana", x: 4265, y: 66.134, value: 757623 },
  { title: "Haiti", x: 1180, y: 62.746, value: 10255644 },
  { title: "Honduras", x: 3615, y: 73.503, value: 7912032 },
  { title: "Hong Kong, China", x: 43854, y: 83.199, value: 7196450 },
  { title: "Hungary", x: 17065, y: 74.491, value: 9949589 },
  { title: "Iceland", x: 34371, y: 81.96, value: 328290 },
  { title: "India", x: 3229, y: 66.168, value: 1258350971 },
  { title: "Indonesia", x: 4379, y: 70.624, value: 244769110 },
  { title: "Iran", x: 12325, y: 73.736, value: 75611798 },
  { title: "Iraq", x: 4160, y: 69.181, value: 33703068 },
  { title: "Ireland", x: 35856, y: 80.531, value: 4579498 },
  { title: "Israel", x: 27321, y: 81.641, value: 7694670 },
  { title: "Italy", x: 25811, y: 82.235, value: 60964145 },
  { title: "Jamaica", x: 6945, y: 73.338, value: 2761331 },
  { title: "Japan", x: 31273, y: 83.418, value: 126434653 },
  { title: "Jordan", x: 5242, y: 73.7, value: 6457260 },
  { title: "Kazakhstan", x: 11982, y: 66.394, value: 16381297 },
  { title: "Kenya", x: 1517, y: 61.115, value: 42749418 },
  { title: "Korea, Dem. Rep.", x: 1540, y: 69.701, value: 24553672 },
  { title: "Korea, Rep.", x: 26199, y: 81.294, value: 48588326 },
  { title: "Kuwait", x: 42045, y: 74.186, value: 2891553 },
  { title: "Kyrgyzstan", x: 2078, y: 67.37, value: 5448085 },
  { title: "Laos", x: 2807, y: 67.865, value: 6373934 },
  { title: "Latvia", x: 15575, y: 72.045, value: 2234572 },
  { title: "Lebanon", x: 13711, y: 79.716, value: 4291719 },
  { title: "Lesotho", x: 1970, y: 48.947, value: 2216850 },
  { title: "Liberia", x: 499, y: 60.23, value: 4244684 },
  { title: "Libya", x: 9136, y: 75.13, value: 6469497 },
  { title: "Lithuania", x: 18469, y: 71.942, value: 3292454 },
  { title: "Macedonia, FYR", x: 8918, y: 75.041, value: 2066785 },
  { title: "Madagascar", x: 981, y: 64.28, value: 21928518 },
  { title: "Malawi", x: 848, y: 54.798, value: 15882815 },
  { title: "Malaysia", x: 14202, y: 74.836, value: 29321798 },
  { title: "Mali", x: 1070, y: 54.622, value: 16318897 },
  { title: "Mauritania", x: 1898, y: 61.39, value: 3622961 },
  { title: "Mauritius", x: 13082, y: 73.453, value: 1313803 },
  { title: "Mexico", x: 12030, y: 77.281, value: 116146768 },
  { title: "Moldova", x: 2963, y: 68.779, value: 3519266 },
  { title: "Mongolia", x: 4300, y: 67.286, value: 2844081 },
  { title: "Montenegro", x: 10064, y: 74.715, value: 632796 },
  { title: "Morocco", x: 4514, y: 70.714, value: 32598536 },
  { title: "Mozambique", x: 1058, y: 49.91, value: 24475186 },
  { title: "Myanmar", x: 1657, y: 65.009, value: 48724387 },
  { title: "Namibia", x: 5535, y: 64.014, value: 2364433 },
  { title: "Nepal", x: 1264, y: 67.989, value: 31011137 },
  { title: "Netherlands", x: 36257, y: 80.906, value: 16714228 },
  { title: "New Zealand", x: 25223, y: 80.982, value: 4461257 },
  { title: "Nicaragua", x: 3098, y: 74.515, value: 5954898 },
  { title: "Niger", x: 706, y: 57.934, value: 16644339 },
  { title: "Nigeria", x: 2483, y: 52.116, value: 166629383 },
  { title: "Norway", x: 47383, y: 81.367, value: 4960482 },
  { title: "Oman", x: 26292, y: 76.287, value: 2904037 },
  { title: "Pakistan", x: 2681, y: 66.42, value: 179951140 },
  { title: "Panama", x: 13607, y: 77.342, value: 3624991 },
  { title: "Papua New Guinea", x: 2391, y: 62.288, value: 7170112 },
  { title: "Paraguay", x: 4467, y: 72.181, value: 6682943 },
  { title: "Peru", x: 9277, y: 74.525, value: 29733829 },
  { title: "Philippines", x: 3677, y: 68.538, value: 96471461 },
  { title: "Poland", x: 17851, y: 76.239, value: 38317090 },
  { title: "Portugal", x: 19576, y: 79.732, value: 10699333 },
  { title: "Romania", x: 11058, y: 73.718, value: 21387517 },
  { title: "Russia", x: 15427, y: 67.874, value: 142703181 },
  { title: "Rwanda", x: 1223, y: 63.563, value: 11271786 },
  { title: "Saudi Arabia", x: 26259, y: 75.264, value: 28705133 },
  { title: "Senegal", x: 1753, y: 63.3, value: 13107945 },
  { title: "Serbia", x: 9335, y: 73.934, value: 9846582 },
  { title: "Sierra Leone", x: 1072, y: 45.338, value: 6126450 },
  { title: "Singapore", x: 49381, y: 82.155, value: 5256278 },
  { title: "Slovak Republic", x: 20780, y: 75.272, value: 5480332 },
  { title: "Slovenia", x: 23986, y: 79.444, value: 2040057 },
  { title: "Solomon Islands", x: 2024, y: 67.465, value: 566481 },
  { title: "Somalia", x: 953, y: 54, value: 9797445 },
  { title: "South Africa", x: 9657, y: 56.271, value: 50738255 },
  { title: "South Sudan", x: 1433, y: 54.666, value: 10386101 },
  { title: "Spain", x: 26457, y: 81.958, value: 46771596 },
  { title: "Sri Lanka", x: 5182, y: 74.116, value: 21223550 },
  { title: "Sudan", x: 2917, y: 61.875, value: 35335982 },
  { title: "Suriname", x: 8979, y: 70.794, value: 534175 },
  { title: "Swaziland", x: 4979, y: 48.91, value: 1220408 },
  { title: "Sweden", x: 34530, y: 81.69, value: 9495392 },
  { title: "Switzerland", x: 37678, y: 82.471, value: 7733709 },
  { title: "Syria", x: 4432, y: 71, value: 21117690 },
  { title: "Taiwan", x: 32840, y: 79.45, value: 23114000 },
  { title: "Tajikistan", x: 1952, y: 67.118, value: 7078755 },
  { title: "Tanzania", x: 1330, y: 60.885, value: 47656367 },
  { title: "Thailand", x: 8451, y: 74.225, value: 69892142 },
  { title: "Timor-Leste", x: 3466, y: 67.033, value: 1187194 },
  { title: "Togo", x: 975, y: 56.198, value: 6283092 },
  { title: "Trinidad and Tobago", x: 17182, y: 69.761, value: 1350999 },
  { title: "Tunisia", x: 7620, y: 75.632, value: 10704948 },
  { title: "Turkey", x: 9287, y: 74.938, value: 74508771 },
  { title: "Turkmenistan", x: 7921, y: 65.299, value: 5169660 },
  { title: "Uganda", x: 1251, y: 58.668, value: 35620977 },
  { title: "Ukraine", x: 6389, y: 68.414, value: 44940268 },
  { title: "United Arab Emirates", x: 31980, y: 76.671, value: 8105873 },
  { title: "United Kingdom", x: 31295, y: 80.396, value: 62798099 },
  { title: "United States", x: 42296, y: 78.797, value: 315791284 },
  { title: "Uruguay", x: 13179, y: 77.084, value: 3391428 },
  { title: "Uzbekistan", x: 3117, y: 68.117, value: 28077486 },
  { title: "Venezuela", x: 11685, y: 74.477, value: 29890694 },
  { title: "West Bank and Gaza", x: 4328, y: 73.018, value: 4270791 },
  { title: "Vietnam", x: 3073, y: 75.793, value: 89730274 },
  { title: "Yemen, Rep.", x: 2043, y: 62.923, value: 25569263 },
  { title: "Zambia", x: 1550, y: 57.037, value: 13883577 },
  { title: "Zimbabwe", x: 545, y: 58.142, value: 13013678 }
]);
```

## Custom value range

Heat rules will use aggregated high and low values from the data items of involved elements.

We can override that with absolutely custom values using heat rules `minValue` and `maxValue` settings.

TypeScript:

```ts
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "valueY",
  min: am5.color(0xff621f),
  max: am5.color(0x661F00),
  minValue: 0,
  maxValue: 1000,
  key: "fill"
}])
```

JavaScript:

```js
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "valueY",
  min: am5.color(0xff621f),
  max: am5.color(0x661F00),
  minValue: 0,
  maxValue: 1000,
  key: "fill"
}])
```

> **Note:** If we set `minValue` and `maxValue` we don't need series to aggregate values, so the `calculateAggregates` does not need to be set.

## Multiple stops

`min` and `max` make a scale between two values. For a scale through more than two, e.g. red to yellow to green, use `stops` instead: an array of values, from the lowest to the highest.

TypeScript:

```ts
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "valueY",
  stops: [
    root.interfaceColors.get("negative"),
    root.interfaceColors.get("warning"),
    root.interfaceColors.get("positive")
  ],
  key: "fill"
}])
```

JavaScript:

```js
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "valueY",
  stops: [
    root.interfaceColors.get("negative"),
    root.interfaceColors.get("warning"),
    root.interfaceColors.get("positive")
  ],
  key: "fill"
}])
```

The element with the lowest value gets the first stop, and the one with the highest value gets the last. The stops are spread evenly across the range, so in the above, the middle value gets yellow, and the values in between blend from one stop to the next.

Stops can be numbers, percents, or colors, but all of one kind. If `minValue` and `maxValue` are set, values outside that range get the first or last stop.

> **Note:** `stops` is available since version 5.21.2. To show the same scale in a [heat legend](https://docs.amcharts.com/v5/concepts/legend/heat-legend/), pass the same colors to its `colors` setting.

## Logarithmic scale

By default, values are spread between `min` and `max` (or across `stops`) on a linear scale.

If values differ by orders of magnitude, e.g. populations of countries, a few very large values would get the far end of the scale, while all the others would end up close together near its start. Setting `logarithmic: true` spreads them on a logarithmic scale instead, so the differences between smaller values show too:

TypeScript:

```ts
polygonSeries.set("heatRules", [{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  logarithmic: true,
  key: "fill"
}])
```

JavaScript:

```js
polygonSeries.set("heatRules", [{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  logarithmic: true,
  key: "fill"
}])
```

> **Note:** A logarithmic scale works with values above zero only.

## Elements without a value

Elements whose data item has no value in `dataField` are not affected by the heat rule, and keep the setting value from their template. E.g. countries on a map that are not in data.

To give such elements a specific value instead, use the `neutral` setting:

TypeScript:

```ts
polygonSeries.set("heatRules", [{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  neutral: am5.color(0xdddddd),
  key: "fill"
}])
```

JavaScript:

```js
polygonSeries.set("heatRules", [{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  neutral: am5.color(0xdddddd),
  key: "fill"
}])
```

The above will make countries with no data light gray. To give them a "no data" tooltip, see "[Tooltips for polygons without data](https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/#tooltips-for-polygons-without-data)".

## Custom functions

If we need to do something fancier than just set value of a setting, we can use heat rule's `customFunction` property.

If set, instead of setting value of the setting directly on an element, this function will be called passing in the following parameters:

* Target element (not a template, but an actual live element).
* Min value
* Max value
* Value of the target element

It'll be up to the custom function to determine what settings and to what values to set.

The function is also called for elements without a value, with the value parameter `undefined`.

ES6:

```ts
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "value",
  customFunction: function(sprite, min, max, value) {
    if (value === undefined) {
      // No value: leave the element as it is
      return;
    }
    if (value < 100) {
      sprite.set("fill", am5.color(0xff0000));
    }
    else {
      sprite.set("fill", am5.color(0x00ff00));
    }
  }
}])
```

TypeScript_:

```ts
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "value",
  customFunction: function(sprite: am5.Sprite, min, max, value) {
    if (value === undefined) {
      // No value: leave the element as it is
      return;
    }
    if (value < 100) {
      (sprite as am5.Graphics).set("fill", am5.color(0xff0000));
    }
    else {
      (sprite as am5.Graphics).set("fill", am5.color(0x00ff00));
    }
  }
}])
```

JavaScript:

```js
series.set("heatRules", [{
  target: series.columns.template,
  dataField: "value",
  customFunction: function(sprite, min, max, value) {
    if (value === undefined) {
      // No value: leave the element as it is
      return;
    }
    if (value < 100) {
      sprite.set("fill", am5.color(0xff0000));
    }
    else {
      sprite.set("fill", am5.color(0x00ff00));
    }
  }
}])
```

## Examples

### Map chart

Example: [Map chart heat map](https://docs.amcharts.com/embeds/v5/map-chart-heat-map/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/usaLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
    projection: am5map.geoAlbersUsa()
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_usaLow,
    valueField: "value",
    calculateAggregates: true
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}: {value}"
});

polygonSeries.set("heatRules", [
  {
    target: polygonSeries.mapPolygons.template,
    dataField: "value",
    min: am5.color(0xff621f),
    max: am5.color(0x661f00),
    key: "fill"
  }
]);

polygonSeries.data.setAll([
  { id: "US-AL", value: 4447100 },
  { id: "US-AK", value: 626932 },
  { id: "US-AZ", value: 5130632 },
  { id: "US-AR", value: 2673400 },
  { id: "US-CA", value: 33871648 },
  { id: "US-CO", value: 4301261 },
  { id: "US-CT", value: 3405565 },
  { id: "US-DE", value: 783600 },
  { id: "US-FL", value: 15982378 },
  { id: "US-GA", value: 8186453 },
  { id: "US-HI", value: 1211537 },
  { id: "US-ID", value: 1293953 },
  { id: "US-IL", value: 12419293 },
  { id: "US-IN", value: 6080485 },
  { id: "US-IA", value: 2926324 },
  { id: "US-KS", value: 2688418 },
  { id: "US-KY", value: 4041769 },
  { id: "US-LA", value: 4468976 },
  { id: "US-ME", value: 1274923 },
  { id: "US-MD", value: 5296486 },
  { id: "US-MA", value: 6349097 },
  { id: "US-MI", value: 9938444 },
  { id: "US-MN", value: 4919479 },
  { id: "US-MS", value: 2844658 },
  { id: "US-MO", value: 5595211 },
  { id: "US-MT", value: 902195 },
  { id: "US-NE", value: 1711263 },
  { id: "US-NV", value: 1998257 },
  { id: "US-NH", value: 1235786 },
  { id: "US-NJ", value: 8414350 },
  { id: "US-NM", value: 1819046 },
  { id: "US-NY", value: 18976457 },
  { id: "US-NC", value: 8049313 },
  { id: "US-ND", value: 642200 },
  { id: "US-OH", value: 11353140 },
  { id: "US-OK", value: 3450654 },
  { id: "US-OR", value: 3421399 },
  { id: "US-PA", value: 12281054 },
  { id: "US-RI", value: 1048319 },
  { id: "US-SC", value: 4012012 },
  { id: "US-SD", value: 754844 },
  { id: "US-TN", value: 5689283 },
  { id: "US-TX", value: 20851820 },
  { id: "US-UT", value: 2233169 },
  { id: "US-VT", value: 608827 },
  { id: "US-VA", value: 7078515 },
  { id: "US-WA", value: 5894121 },
  { id: "US-WV", value: 1808344 },
  { id: "US-WI", value: 5363675 },
  { id: "US-WY", value: 493782 }
]);
```
