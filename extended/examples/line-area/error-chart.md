---
title: "Error Chart"
source: "https://www.amcharts.com/demos/error-chart/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart with error bars: each country’s value comes with a bar showing how far off it could be. Where two bars overlap, the two values could be the same.

When to show error bars: Every estimate has some uncertainty: a survey’s margin of error, the spread of repeated tests. Error bars put it on the chart, so readers don’t see meaning in differences smaller than the margin.

Good for:
- Survey results with a margin of error
- Lab or test results averaged over several runs
- Estimates or forecasts side by side

Think twice when:
- Categories with no order, like countries: drop the connecting line
- Readers who don’t know what the bars mean: say it in a note
- Errors bigger on one side: draw low and high ends separately, or use a range area

Prompt: Create a line chart of values for seven countries where each point has a vertical error bar with caps at both ends and a circle marker on top. The tooltips show the value plus or minus the error. Add a cursor. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
var data = [
  {
    country: "USA",
    visits: 3025,
    error: 100
  },
  {
    country: "China",
    visits: 1882,
    error: 180
  },
  {
    country: "Japan",
    visits: 1809,
    error: 130
  },
  {
    country: "Germany",
    visits: 1322,
    error: 200
  },
  {
    country: "UK",
    visits: 1122,
    error: 150
  },
  {
    country: "France",
    visits: 1114,
    error: 110
  },
  {
    country: "India",
    visits: 984,
    error: 120
  }
];

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,       // drag the plot to pan...
    panY: true,       // ...in any direction
    wheelY: "zoomXY", // the wheel zooms both ways
    pinchZoomX: true  // pinch with two fingers to zoom on touch screens
  })
);

chart.get("colors").set("step", 2);

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 50 // at least 50px between labels; on narrow screens some are skipped
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "country",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {}) // shows the hovered country on the axis
  })
);

// grid lines at the end of each category's cell instead of at its start
xRenderer.grid.template.setAll({
  location: 1
})

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    // 10% room above and below the values, so the error bars at either end fit
    extraMax: 0.1,
    extraMin: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1 // a faint line along the value axis
    }),
    tooltip: am5.Tooltip.new(root, {}) // shows the value at the cursor's height
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    calculateAggregates: true, // computes totals, averages and the like, for use in labels
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "visits",
    categoryXField: "country",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{categoryX}: {valueY} ± {error}" // as "USA: 3025 ± 100"
    })
  })
);

// add error bullet: a vertical bar from value - error to value + error,
// with a cap at each end
series.bullets.push(function() {
  var graphics = am5.Graphics.new(root, {
    strokeWidth: 2,                   // 2px lines...
    stroke: series.get("stroke"),     // ...in the series' color
    draw: function(display, target) { // a custom draw function: the bar and its two caps
      var dataItem = target.dataItem;

      var error = dataItem.dataContext.error;

      // the error in pixels, at the current zoom
      var yPosition0 = yAxis.valueToPosition(0);
      var yPosition1 = yAxis.valueToPosition(error);

      var height =
        yAxis.get("renderer").positionToCoordinate(yPosition1) - yAxis.get("renderer").positionToCoordinate(yPosition0);

      display.moveTo(0, -height); // the bar, reaching the error above and below the point
      display.lineTo(0, height);

      display.moveTo(-10, -height); // a 20px cap at one end...
      display.lineTo(10, -height);

      display.moveTo(-10, height); // ...and one at the other
      display.lineTo(10, height);
    }
  });

  return am5.Bullet.new(root, {
    // redrawn whenever the series changes, so the bar's height follows the zoom
    dynamic: true,
    sprite: graphics
  });
});

// Add circle bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series.bullets.push(function() {
  var graphics = am5.Circle.new(root, {
    strokeWidth: 2,               // a 2px outline
    radius: 5,                    // 5px radius
    stroke: series.get("stroke"), // in the line's color
    fill: root.interfaceColors.get("background") // filled with the background color
  });
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  snapToSeries: [series] // the cursor jumps to the nearest point of the series
}));

series.data.setAll(data);
xAxis.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
