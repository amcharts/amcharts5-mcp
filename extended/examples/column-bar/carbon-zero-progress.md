---
title: "Carbon-Zero Progress"
source: "https://www.amcharts.com/demos/carbon-zero-progress/"
category: "column-bar"
scraped: "2026-10-08"
---

A progress bar toward net zero, built from a column chart: fifteen cells from red at 20+ through yellow to green, a pin on the current level, 10, and a GOAL ZERO badge at the end.

Charts beyond the usual shapes: Underneath, this is an ordinary column chart: equal columns colored from the data, with bullets on just two of them. So the progress bar updates from data like any chart, a moved pin is one changed field, and it scales with the page. The same trick builds ratings, scales and step trackers.

Good for:
- Net-zero and sustainability targets
- Progress toward a goal in steps
- Dashboards and reports with one key figure

Think twice when:
- Several targets at once: a bullet chart for each
- Precise values: the steps round them off
- Readers who can’t tell red from green: keep the labels

Prompt: Create a progress bar toward net zero: a row of segments counting down from 15 to 0 in red, yellow and green, with a map pin over the current level, a round GOAL ZERO badge at the end and a few scale labels under the bar. Use the amCharts 5 library with its Responsive theme.

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
// The bar needs little height, so the chart takes half of the space, in the middle
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,      // the chart doesn't pan or zoom
  panY: false,
  wheelX: "none",   // the mouse wheel scrolls the page
  wheelY: "none",
  paddingRight: 30, // room for the goal badge past the last cell
  height: am5.percent(50),
  y: am5.p50,
  centerY: am5.p50
}));

var data = [{
  category: "15",
  value: 100,
  columnSettings: {
    fill: am5.color(0xc6251a)
  }
}, {
  category: "14",
  value: 100,
  columnSettings: {
    fill: am5.color(0xc6251a)
  }
}, {
  category: "13",
  value: 100,
  columnSettings: {
    fill: am5.color(0xc6251a)
  }
}, {
  category: "12",
  value: 100,
  columnSettings: {
    fill: am5.color(0xc6251a)
  }
}, {
  category: "11",
  value: 100,
  columnSettings: {
    fill: am5.color(0xc6251a)
  }
}, {
  category: "10",
  value: 100,
  currentBullet: true,
  columnSettings: {
    fill: am5.color(0xfcc034)
  }
}, {
  category: "9",
  value: 100,
  columnSettings: {
    fill: am5.color(0xfcc034)
  }
}, {
  category: "8",
  value: 100,
  columnSettings: {
    fill: am5.color(0xfcc034)
  }
}, {
  category: "7",
  value: 100,
  columnSettings: {
    fill: am5.color(0xfcc034)
  }
}, {
  category: "6",
  value: 100,
  columnSettings: {
    fill: am5.color(0xfcc034)
  }
}, {
  category: "5",
  value: 100,
  columnSettings: {
    fill: am5.color(0x6bc352)
  }
}, {
  category: "4",
  value: 100,
  columnSettings: {
    fill: am5.color(0x6bc352)
  }
}, {
  category: "3",
  value: 100,
  columnSettings: {
    fill: am5.color(0x6bc352)
  }
}, {
  category: "2",
  value: 100,
  columnSettings: {
    fill: am5.color(0x6bc352)
  }
}, {
  category: "1",
  value: 100,
  columnSettings: {
    fill: am5.color(0x6bc352)
  }
}, {
  category: "0",
  value: 100,
  targetBullet: true,
  columnSettings: {
    // an empty cell in the background color, where the goal badge sits
    fill: root.interfaceColors.get("background")
  }
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {

  })
}));

var xRenderer = xAxis.get("renderer");

xRenderer.grid.template.set("forceHidden", true);   // no grid lines...
xRenderer.labels.template.set("forceHidden", true); // ...and no labels: addAxisLabel below adds three

xAxis.data.setAll(data);

// The columns fill the bottom third of the plot, leaving room for the pin above them
var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 300,
  strictMinMax: true, // exactly 0 to 300, so a column of 100 is a third
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var yRenderer = yAxis.get("renderer");

yRenderer.grid.template.set("forceHidden", true); // no grid lines or labels on this axis either
yRenderer.labels.template.set("forceHidden", true);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "category",
  // let the pin and the goal badge stick out past the plot area
  maskBullets: false
}));

// A stroke in the background color leaves a gap between the cells
series.columns.template.setAll({
  width: am5.p100,                // the cells touch; the stroke makes the gaps
  strokeOpacity: 1,               // a solid stroke...
  strokeWidth: 2,                 // ...2px wide
  stroke: root.interfaceColors.get("background"),
  templateField: "columnSettings" // each cell's fill from its columnSettings
});

// only two cells get a bullet: the pin over the current one, the goal badge on the last one
series.bullets.push(function(root, target, dataItem) {
  if (dataItem.dataContext.currentBullet) {
    var container = am5.Container.new(root, {});

    var pin = container.children.push(am5.Graphics.new(root, {
      fill: dataItem.dataContext.columnSettings.fill, // the pin in its cell's color
      dy: -5, // 5px above the bar
      centerY: am5.p100, // standing on its point
      centerX: am5.p50, // centered on the cell
      // a map pin
      svgPath: "M66.9 41.8c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4 0 11.3 20.4 32.4 20.4 32.4s20.4-21.1 20.4-32.4zM37 41.4c0-5.2 4.3-9.5 9.5-9.5s9.5 4.2 9.5 9.5c0 5.2-4.2 9.5-9.5 9.5-5.2 0-9.5-4.3-9.5-9.5z"
    }));

    var label = container.children.push(am5.Label.new(root, {
      text: dataItem.get("categoryX"), // the cell's number
      // up into the pin's round head
      dy: -38,
      centerY: am5.p50,
      centerX: am5.p50,
      populateText: true,
      paddingTop: 5,                               // room around the number inside its badge
      paddingRight: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      background: am5.RoundedRectangle.new(root, { // a round badge in the background color
        fill: root.interfaceColors.get("background"),
        cornerRadiusTL: 20, // corners rounded into a circle
        cornerRadiusTR: 20,
        cornerRadiusBR: 20,
        cornerRadiusBL: 20,
      })
    }));

    return am5.Bullet.new(root, {
      locationY: 1, // at the top of the cell
      sprite: container
    });
  }
  else if (dataItem.dataContext.targetBullet) {
    var container = am5.Container.new(root, {
      dx: 15 // 15px right of the cell's middle
    });

    var circle = container.children.push(am5.Circle.new(root, {
      radius: 34,                // a 34px radius
      fill: am5.color(0x11326d), // dark blue
    }));

    var label = container.children.push(am5.Label.new(root, {
      text: "GOAL\n[bold]ZERO[/]", // two lines, the second in bold
      textAlign: "center",         // both lines centered
      fill: am5.color(0xffffff),   // white text
      centerY: am5.p50,
      centerX: am5.p50,
      populateText: true,
    }));
    return am5.Bullet.new(root, {
      locationY: 0.5, // in the middle of the cell
      sprite: container
    });
  }
  return false; // no bullet for the other cells
});

series.data.setAll(data);

// Add labels
// an axis range adds a label under the given cell only, and a grid line at the cell's end
function addAxisLabel(category, text) {
  var rangeDataItem = xAxis.makeDataItem({
    category: category
  });

  var range = xAxis.createAxisRange(rangeDataItem);

  range.get("label").setAll({
    text: text,
    forceHidden: false // show this one, though the axis labels are hidden
  });

  range.get("grid").setAll({
    strokeOpacity: 1, // a solid grid line...
    location: 1       // ...at the end of the cell
  });
}

addAxisLabel("15", "20+"); // under the first cell, which stands for 20 and more
addAxisLabel("10", "10");
addAxisLabel("5", "5");

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000, 100);
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
