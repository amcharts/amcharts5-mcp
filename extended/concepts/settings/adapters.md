---
title: "Adapters"
source: "https://docs.amcharts.com/v5/concepts/settings/adapters/"
scraped: "2026-11-16"
---

Adapters are custom functions that can be used to dynamically alter value of an element's setting.

## Adding

And adapter can be added directly to an object or to template using its `adapters.add()` method.

This method requires two parameters:

* Key of the setting the adapter will be used to modify value for.
* Function that will be run every time setting value is requested, which can modify the value.

The following code can be used to modify fill color of the column series columns based on their value:

TypeScript:

```ts
series.columns.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("valueY") < 1000) {
    return am5.color(0xff621f);
  }
  else {
    return fill;
  }
});
```

JavaScript:

```js
series.columns.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("valueY") < 1000) {
    return am5.color(0xff621f);
  }
  else {
    return fill;
  }
});
```

The above means that before column is drawn, its default fill color will be ran through our custom function. It will check related data item value and if it's less than 1000, it will use reddish color instead of default series color.

Example: [Column series with adapters](https://docs.amcharts.com/embeds/v5/column-series-with-adapters/)

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

// Craete Y-axis
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

  series.columns.template.adapters.add("fill", function (fill, target) {
    if (target.dataItem.get("valueY") < 1000) {
      return am5.color(0xff621f);
    } else {
      return fill;
    }
  });

  series.data.setAll(data);
}

createSeries("Series", "value");
```

## Removing

There are two ways to remove an adapter: dispose it or use `remove()` method.

### Disposing

The `add()` method used to add an adapter will return a `Disposer` object.

It means that you can use its `dispose()` method to destroy it:

TypeScript:

```ts
let myAdapter = series.columns.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("valueY") < 1000) {
    return am5.color(0xff621f);
  }
  else {
    return fill;
  }
});

// ...

myAdapter.dispose(); // destroy the adapter
```

JavaScript:

```js
var myAdapter = series.columns.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("valueY") < 1000) {
    return am5.color(0xff621f);
  }
  else {
    return fill;
  }
});

// ...

myAdapter.dispose(); // destroy the adapter
```

### Using remove() method

Another way to remove an adapter is using `remove()` method:

TypeScript:

```ts
series.columns.template.adapters.remove("fill");
```

JavaScript:

```js
series.columns.template.adapters.remove("fill");
```

This method is easier, because you don't need to maintain reference to actual adapter.

However, it will disable all adapters for the same key. If the target object has multiple adapters added for the same key, they will all be removed.

## Disabling

If we don't need to remove the adapter, but just want to temporarily disable it, we can use `disable()` method:

TypeScript:

```ts
series.columns.template.adapters.disable("fill");
```

JavaScript:

```js
series.columns.template.adapters.disable("fill");
```

If adapter for certain key is disabled, it will not kick in when settings value is requested.

To re-enable the adapter, use `enable()` method:

TypeScript:

```ts
series.columns.template.adapters.enable("fill");
```

JavaScript:

```js
series.columns.template.adapters.enable("fill");
```

## Mutating target element

Adapters can also be used permanently update target element's settings. Those can be other settings, not necessarily ones that the adapter is for.

The following adapter will modify `fill` setting of a tooltip, but will also modify related `tooltipY` setting so that tooltips appear at the bottom of the negative-value columns:

TypeScript:

```ts
series.columns.template.adapters.add("fill", function(fill, target) {
  let dataItem = target.dataItem;
  if (dataItem.get("valueY") < 0) {
    target.set("tooltipY", am5.p100);
    return am5.color(0xff0000);
  }
  return fill;
});
```

JavaScript:

```js
series.columns.template.adapters.add("fill", function(fill, target) {
  var dataItem = target.dataItem;
  if (dataItem.get("valueY") < 0) {
    target.set("tooltipY", am5.p100);
    return am5.color(0xff0000);
  }
  return fill;
});
```

Example: [Column chart with adapters for the tooltips](https://docs.amcharts.com/embeds/v5/column-chart-with-adapters-for-the-tooltips/)

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
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX"
  })
);

cursor.lineY.set("visible", false);

var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 0;

function generateData() {
  value = Math.round(Math.random() * 10 - 5 + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  })
);

series.columns.template.set("strokeOpacity", 0);

series.columns.template.adapters.add("fill", function (fill, target) {
  var dataItem = target.dataItem;
  if (dataItem.get("valueY") < 0) {
    target.set("tooltipY", am5.p100);
    return am5.color(0xff0000);
  }
  return fill;
});

// Add scrollbar
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

var data = generateDatas(50);
series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
```

## Related tutorials

* [Using adapters on category axis labels](https://docs.amcharts.com/v5/tutorials/using-adapters-on-category-axis-labels/)
* [Labels on negative columns](https://docs.amcharts.com/v5/tutorials/labels-on-negative-columns/) (dynamic placement of bullets using an adapter)
