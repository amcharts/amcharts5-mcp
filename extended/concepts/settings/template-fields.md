---
title: "Template fields"
source: "https://docs.amcharts.com/v5/concepts/settings/template-fields/"
scraped: "2026-11-16"
---

Template fields is a way to bind element's settings to data. Any element that has a data item can bind its settings to values in it.

## Setting up

Template fields are similar to series data fields (see "[XY chart series: Data fields](https://docs.amcharts.com/v5/charts/xy-chart/series/#data-fields)"). In a nutshell it means this: "this field in data holds an object with setting values to be used for the element".

It is set via setting `templateField`.

It can be set directly on an object or objects template, like for example `columns.template` on a column series, or `slices.template` on a pie series.

In fact, the most common usage of template fields is in series (because they are primary users of data), so we'll be using series as example in this tutorial.

TypeScript:

```ts
series.columns.template.setAll({
  fillOpacity: 0.5,
  strokeWidth: 2,
  templateField: "columnSettings"
});
```

JavaScript:

```js
series.columns.template.setAll({
  fillOpacity: 0.5,
  strokeWidth: 2,
  templateField: "columnSettings"
});
```

Now, we can add objects with key `"columnSettings"` and setting values in it. Those settings will be applied to relevant columns.

```json
[{
  date: new Date(2021, 0, 1).getTime(),
  value: 1000,
  columnSettings: {
    fill: am5.color(0xd6e681)
  }
}, {
  date: new Date(2021, 0, 2).getTime(),
  value: 800,
  columnSettings: {
    fill: am5.color(0xbabf95)
  }
}, {
  date: new Date(2021, 0, 3).getTime(),
  value: 700,
  columnSettings: {
    fill: am5.color(0xc4ad83)
  }
}, {
  date: new Date(2021, 0, 4).getTime(),
  value: 1200,
  columnSettings: {
    fill: am5.color(0xc6b677)
  }
}, {
  date: new Date(2021, 0, 5).getTime(),
  value: 740,
  columnSettings: {
    fill: am5.color(0xdbb957)
  }
}]
```

Example: [Using templateField with ColumnSeries](https://docs.amcharts.com/embeds/v5/using-templatefield-with-columnseries/)

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
    columnSettings: {
      fill: am5.color(0xd6e681),
      stroke: am5.color(0xd6e681)
    }
  },

  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    columnSettings: {
      fill: am5.color(0xbabf95),
      stroke: am5.color(0xbabf95)
    }
  },

  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    columnSettings: {
      fill: am5.color(0xc4ad83),
      stroke: am5.color(0xc4ad83)
    }
  },

  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    columnSettings: {
      fill: am5.color(0xc6b677),
      stroke: am5.color(0xc6b677)
    }
  },

  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    columnSettings: {
      fill: am5.color(0xdbb957),
      stroke: am5.color(0xdbb957)
    }
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
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
      valueXField: "date"
    })
  );

  series.columns.template.setAll({
    fillOpacity: 0.5,
    strokeWidth: 2,
    templateField: "columnSettings"
  });

  series.data.setAll(data);
}

createSeries("Series with breaks", "value");
```

Another example using `PieSeries`:

TypeScript:

```ts
series.slices.template.setAll({
  templateField: "sliceSettings"
});
```

JavaScript:

```js
series.slices.template.setAll({
  templateField: "sliceSettings"
});
```

And the data:

```json
[{
  country: "France",
  sales: 100000,
  sliceSettings: {
    fill: am5.color(0xd6e681),
    stroke: am5.color(0xd6e681)
  }
}, {
  country: "Spain",
  sales: 160000,
  sliceSettings: {
    fill: am5.color(0xbabf95),
    stroke: am5.color(0xbabf95)
  }
}, {
  country: "United Kingdom",
  sales: 80000,
  sliceSettings: {
    fill: am5.color(0xc4ad83),
    stroke: am5.color(0xc4ad83)
  }
}];
```

Example: [PieSeries slice colors via data](https://docs.amcharts.com/embeds/v5/pieseries-slice-colors-via-data/)

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    country: "France",
    sales: 100000,
    sliceSettings: {
      fill: am5.color(0xd6e681),
      stroke: am5.color(0xd6e681)
    }
  },

  {
    country: "Spain",
    sales: 160000,
    sliceSettings: {
      fill: am5.color(0xbabf95),
      stroke: am5.color(0xbabf95)
    }
  },

  {
    country: "United Kingdom",
    sales: 80000,
    sliceSettings: {
      fill: am5.color(0xc4ad83),
      stroke: am5.color(0xc4ad83)
    }
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

series.slices.template.setAll({
  templateField: "sliceSettings"
});

series.data.setAll(data);

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: root.horizontalLayout
  })
);

legend.data.setAll(series.dataItems);
```

## Bullets

There are some caveats involved when using template fields with bullets.

For more information, please visit "Bullets: [Template fields](https://docs.amcharts.com/v5/concepts/common-elements/bullets/#template-fields)" tutorial.
