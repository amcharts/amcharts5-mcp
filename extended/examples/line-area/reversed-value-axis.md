---
title: "Reversed Value Axis"
source: "https://www.amcharts.com/demos/reversed-value-axis/"
category: "line-area"
scraped: "2026-10-08"
---

A ranking chart: the value axis is flipped so first place sits at the top, where people look for the winner. Here, where three teams finished in a league each year (sample data).

When to flip the axis: In a ranking, a smaller number is better, so a normal axis puts the winner at the bottom. Flipping it puts first place on top, and a line that climbs means a team that climbs.

Good for:
- League tables and race positions over time
- Search rankings or chart positions
- Any measure where lower is better, like golf scores

Think twice when:
- Ordinary values, where up should mean more
- More than five or six lines: the crossings become a tangle
- Close races: a rank hides how near the scores were

Prompt: Create a ranking line chart of where three teams finished in a league table each year from 2015 to 2025, on an inverted value axis so rank 1 is at the top. Give each team its own bullet shape, and thicken a team’s line when its legend item is hovered. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
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
    panX: true,                  // drag the plot to pan sideways...
    panY: true,                  // ...and up and down
    wheelX: "panX",              // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX",             // ...and the vertical wheel zooms in on the years
    layout: root.verticalLayout, // the legend goes under the chart
    pinchZoomX: true             // pinch on a touch screen to zoom in on the years
  })
);

// The data: where each team finished in the league table each year (sample data)
var data = [
  {
    year: "2015",
    teamA: 1,
    teamB: 5,
    teamC: 3
  },
  {
    year: "2016",
    teamA: 1,
    teamB: 2,
    teamC: 6
  },
  {
    year: "2017",
    teamA: 2,
    teamB: 3,
    teamC: 1
  },
  {
    year: "2018",
    teamA: 3,
    teamB: 4,
    teamC: 1
  },
  {
    year: "2019",
    teamA: 5,
    teamB: 1,
    teamC: 2
  },
  {
    year: "2020",
    teamA: 3,
    teamB: 2,
    teamC: 1
  },
  {
    year: "2021",
    teamA: 1,
    teamB: 2,
    teamC: 3
  },
  {
    year: "2022",
    teamA: 2,
    teamB: 1,
    teamC: 5
  },
  {
    year: "2023",
    teamA: 3,
    teamB: 5,
    teamC: 2
  },
  {
    year: "2024",
    teamA: 4,
    teamB: 3,
    teamC: 6
  },
  {
    year: "2025",
    teamA: 1,
    teamB: 2,
    teamC: 4
  }
];

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minorGridEnabled: true // years whose label is skipped still get a faint grid line
});
// grid lines through the middle of each year, where the points sit
xRenderer.grid.template.set("location", 0.5);
xRenderer.labels.template.setAll({
  location: 0.5, // labels in the middle of each year, under the points
  multiLocation: 0.5
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {}), // shows the year under the cursor on the axis
    snapTooltip: true                   // the tooltip snaps to the year instead of following the pointer
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxPrecision: 0,    // whole numbers only: places, not fractions
    // half a place of room around the 6 places, so the labels run 1 to 6, with no 0 or 7
    min: 0.5,
    max: 6.5,
    strictMinMax: true, // exactly that range, not rounded out
    renderer: am5xy.AxisRendererY.new(root, {
      // upside down: 1 at the top, as in a ranking
      inversed: true
    })
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // always visible, starting at the right end (positionX 1) on the last year
  alwaysShow: true,
  xAxis: xAxis,
  positionX: 1
}));

cursor.lineY.set("visible", false);  // only the vertical cursor line, no horizontal one
cursor.lineX.set("focusable", true); // Tab to the cursor line, then move it with the arrow keys

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// each series has its own bullet shape, so the lines can be told apart where they cross
function createSeries(name, field, Shape, shapeSettings) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      categoryXField: "year",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",                   // the tooltip sits beside the point, not above it
        labelText: "[bold]{name}[/]\n{categoryX}: {valueY}" // team in bold, then year and place
      })
    })
  );

  // a bullet on every point, in the shape passed in
  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: Shape.new(root, Object.assign({
        fill: series.get("fill") // the series color
      }, shapeSettings))
    });
  });

  // create hover state for series and for mainContainer, so that when series is hovered,
  // the state would be passed down to the strokes which are in mainContainer.
  series.set("setStateOnChildren", true);
  series.states.create("hover", {});

  series.mainContainer.set("setStateOnChildren", true);
  series.mainContainer.states.create("hover", {});

  series.strokes.template.states.create("hover", {
    strokeWidth: 4 // a hovered line gets thicker
  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("Team A", "teamA", am5.Circle, { radius: 5 }); // 5px circles
// rectangles and triangles are drawn from their corner: center them on the point
createSeries("Team B", "teamB", am5.Rectangle, { width: 9, height: 9, centerX: am5.p50, centerY: am5.p50 });
createSeries("Team C", "teamC", am5.Triangle, { width: 12, height: 11, centerX: am5.p50, centerY: am5.p50 });


var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50, // the legend's middle...
    x: am5.p50        // ...at the middle of the chart
  })
);

// Make series change state when legend item is hovered
legend.itemContainers.template.states.create("hover", {});

legend.itemContainers.template.events.on("pointerover", function (e) {
  e.target.dataItem.dataContext.hover();
});
legend.itemContainers.template.events.on("pointerout", function (e) {
  e.target.dataItem.dataContext.unhover();
});

legend.data.setAll(chart.series.values);

// park the cursor on the last year when the pointer leaves the plot, and let it follow when it's back
chart.plotContainer.events.on("pointerout", function(){
    cursor.set("positionX", 1)
})

chart.plotContainer.events.on("pointerover", function(){
  cursor.set("positionX", undefined)
})

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
