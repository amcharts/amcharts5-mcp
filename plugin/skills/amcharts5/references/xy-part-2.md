# xy (part 2)

## Bar chart race (bars re-sorted as values change)

No setting sorts a category axis by value. Re-sort it on a timer, as the "Bar Chart Race" demo does (`column-bar/bar-chart-race`):

```js
var stepDuration = 2000;   // one data step
var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 20, inversed: true });   // the leader on top
yRenderer.grid.template.set("visible", false);
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, { categoryField: "name", maxDeviation: 0, renderer: yRenderer }));
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, strictMinMax: true, extraMax: 0.1, maxDeviation: 0, renderer: am5xy.AxisRendererX.new(root, {})
}));
xAxis.setAll({ interpolationDuration: stepDuration / 10, interpolationEasing: am5.ease.linear });   // the scale follows the bars
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis, yAxis: yAxis, valueXField: "value", categoryYField: "name", colorByDataItem: true
}));
series.bullets.push(function (root, series, dataItem) {
  return am5.Bullet.new(root, { locationX: 1, sprite: am5.Label.new(root, {
    text: "{valueXWorking.formatNumber('#,###.')}", fill: root.interfaceColors.get("alternativeText"),
    centerX: am5.p100, centerY: am5.p50, populateText: true    // inside the end of the bar: never clipped
  }) });
});

function sortCategoryAxis() {
  series.dataItems.sort(function (a, b) { return b.get("valueX") - a.get("valueX"); });   // biggest first
  am5.array.each(yAxis.dataItems, function (axisItem) {
    var seriesItem = series.dataItems.find(function (d) { return d.get("categoryY") === axisItem.get("category"); });
    var index = series.dataItems.indexOf(seriesItem);
    if (axisItem.get("index") !== index) {
      var delta = (index - axisItem.get("index", 0)) / series.dataItems.length;
      axisItem.set("index", index);
      axisItem.set("deltaPosition", -delta);   // stay in place for now...
      axisItem.animate({ key: "deltaPosition", to: 0, duration: stepDuration / 2, easing: am5.ease.out(am5.ease.cubic) });   // ...then slide to the new row
    }
  });
  yAxis.dataItems.sort(function (a, b) { return a.get("index") - b.get("index"); });
}
function showStep(values) {   // values: { name: value }
  am5.array.each(series.dataItems, function (dataItem) {
    var v = values[dataItem.get("categoryY")];
    dataItem.animate({ key: "valueX", to: v, duration: stepDuration, easing: am5.ease.linear });         // what the sort reads
    dataItem.animate({ key: "valueXWorking", to: v, duration: stepDuration, easing: am5.ease.linear });  // what the bar and label show
  });
}
yAxis.data.setAll(rows);   // rows: [{ name, value }] for the first step
series.data.setAll(rows);
setInterval(sortCategoryAxis, 100);   // re-sort ten times a second, so overtakes show as they happen
// then call showStep(values) every stepDuration
```

Rows that swap cross each other while they slide; a shorter slide (e.g. 400 ms instead of `stepDuration / 2`) roughly halves the time their labels overlap. A value label outside the bar (`centerX: am5.p0`) needs the `extraMax` room.

---

# amCharts 5 XY Charts — Working Examples

Complete, tested examples ready to use. Each example is self-contained.

## Example 1: Column chart with categories

A basic vertical bar chart with category axis.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Column Chart</title>
  <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>
  <style>
    #chartdiv { width: 100%; height: 500px; }
  </style>
</head>
<body>
  <div id="chartdiv"></div>
  <script>
    // Create root
    var root = am5.Root.new("chartdiv");

    // Set theme
    root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

    // Create chart
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));

    // Data
    var data = [
      { category: "Research", value: 1000 },
      { category: "Marketing", value: 1200 },
      { category: "Sales", value: 850 },
      { category: "Support", value: 600 },
      { category: "Development", value: 1500 }
    ];

    // Create axes
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    xAxis.data.setAll(data); // CategoryAxis MUST receive data

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Create series
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Revenue",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryXField: "category",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{categoryX}: ${valueY}"
      })
    }));

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0
    });

    // Assign individual colors from chart's color set
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    // Set data LAST
    series.data.setAll(data);

    // Animate
    series.appear(1000);
    chart.appear(1000, 100);
  </script>
</body>
</html>
```

## Example 2: Multi-series line chart with date axis

A time-series line chart with two series, cursor, scrollbar, and legend.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Multi-Series Line Chart</title>
  <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>
  <style>
    #chartdiv { width: 100%; height: 500px; }
  </style>
</head>
<body>
  <div id="chartdiv"></div>
  <script>
    var root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));

    // Generate sample date-based data
    var data = [];
    var date = new Date(2024, 0, 1);
    var revenue = 100;
    var expenses = 80;

    for (var i = 0; i < 90; i++) {
      revenue += Math.round((Math.random() - 0.48) * 10);
      expenses += Math.round((Math.random() - 0.5) * 8);
      data.push({
        date: date.getTime(),  // Must be timestamp!
        revenue: revenue,
        expenses: expenses
      });
      date.setDate(date.getDate() + 1);
    }

    // Axes
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: { timeUnit: "day", count: 1 },
      renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Helper function to create series
    function createSeries(name, field) {
      var series = chart.series.push(am5xy.LineSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: field,
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{name}: {valueY}"
        })
      }));

      series.strokes.template.setAll({ strokeWidth: 2 });
      series.data.setAll(data);
      series.appear(1000);
      return series;
    }

    createSeries("Revenue", "revenue");
    createSeries("Expenses", "expenses");

    // Cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));

    // Scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    // Legend
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50)
    }));
    legend.data.setAll(chart.series.values);

    chart.appear(1000, 100);
  </script>
</body>
</html>
```

## Example 3: Stacked area chart

Area chart with three stacked series.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Stacked Area Chart</title>
  <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>
  <style>
    #chartdiv { width: 100%; height: 500px; }
  </style>
</head>
<body>
  <div id="chartdiv"></div>
  <script>
    var root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));

    var data = [
      { year: "2019", mobile: 250, desktop: 580, tablet: 120 },
      { year: "2020", mobile: 300, desktop: 550, tablet: 150 },
      { year: "2021", mobile: 380, desktop: 500, tablet: 170 },
      { year: "2022", mobile: 450, desktop: 460, tablet: 190 },
      { year: "2023", mobile: 520, desktop: 420, tablet: 200 },
      { year: "2024", mobile: 600, desktop: 380, tablet: 210 }
    ];

    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "year",
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));
    xAxis.data.setAll(data);

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    function createSeries(name, field) {
      var series = chart.series.push(am5xy.LineSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        stacked: true,
        valueYField: field,
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{name}: {valueY}"
        })
      }));

      // Enable area fill
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.5
      });

      series.strokes.template.setAll({ strokeWidth: 2 });
      series.data.setAll(data);
      series.appear(1000);
      return series;
    }

    createSeries("Mobile", "mobile");
    createSeries("Desktop", "desktop");
    createSeries("Tablet", "tablet");

    // Cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    // Legend
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50)
    }));
    legend.data.setAll(chart.series.values);

    chart.appear(1000, 100);
  </script>
</body>
</html>
```

## Example 4: Horizontal bar chart

Bars extending horizontally — swap category to Y axis.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Horizontal Bar Chart</title>
  <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
  <script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>
  <style>
    #chartdiv { width: 100%; height: 500px; }
  </style>
</head>
<body>
  <div id="chartdiv"></div>
  <script>
    var root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: true,
      wheelX: "none",
      wheelY: "panY",
      layout: root.verticalLayout
    }));

    var data = [
      { country: "United States", visits: 4025 },
      { country: "China", visits: 1882 },
      { country: "Japan", visits: 1809 },
      { country: "Germany", visits: 1322 },
      { country: "United Kingdom", visits: 1122 },
      { country: "France", visits: 1114 },
      { country: "India", visits: 984 },
      { country: "Spain", visits: 711 }
    ];

    // Note: CategoryAxis on Y, ValueAxis on X
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "country",
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,  // top-to-bottom order
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
      })
    }));
    yAxis.data.setAll(data);

    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      min: 0
    }));

    // Note: categoryYField + valueXField (swapped from vertical)
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Visits",
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "visits",
      categoryYField: "country",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{categoryY}: {valueX}"
      })
    }));

    series.columns.template.setAll({
      cornerRadiusBR: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0
    });

    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.data.setAll(data);
    series.appear(1000);
    chart.appear(1000, 100);
  </script>
</body>
</html>
```

## Example 5: TypeScript + ES modules (framework-ready)

Suitable for React, Angular, Vue, or any bundled project.

```ts
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_ResponsiveMax from "@amcharts/amcharts5/themes/ResponsiveMax";

export function createChart(elementId: string): am5.Root {
  const root = am5.Root.new(elementId);
  root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout,
    })
  );

  const xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      baseInterval: { timeUnit: "month", count: 1 },
      renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  const series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
    })
  );

  series.fills.template.setAll({ visible: true, fillOpacity: 0.2 });

  chart.set("cursor", am5xy.XYCursor.new(root, { behavior: "none" }));
  chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

  const legend = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
    })
  );
  legend.data.setAll(chart.series.values);

  // Set data
  const data: Array<{ date: number; value: number }> = [];
  let value = 100;
  for (let i = 0; i < 24; i++) {
    value += Math.round((Math.random() - 0.45) * 20);
    data.push({
      date: new Date(2023, i, 1).getTime(),
      value: value,
    });
  }

  series.data.setAll(data);
  series.appear(1000);
  chart.appear(1000, 100);

  // Return root so caller can dispose: root.dispose()
  return root;
}
```

**React usage:**
```tsx
import { useLayoutEffect, useRef } from "react";
import { createChart } from "./chart";

export function ChartComponent() {
  const chartRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    chartRef.current = createChart("chartdiv");
    return () => {
      chartRef.current?.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }} />;
}
```
