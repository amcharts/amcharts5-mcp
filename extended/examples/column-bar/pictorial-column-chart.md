---
title: "Pictorial Column Chart"
source: "https://www.amcharts.com/demos/pictorial-column-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A column chart where each column is a picture of what it measures: five famous skyscrapers, each drawn to its height against a sunset sky.

When pictures replace columns: A silhouette tells the reader what is measured before they read a label, and a picture drawn to scale makes the comparison feel real. It suits a handful of well-known things with a clear shape, like buildings, bottles or animals, where the height of the picture is the value.

Good for:
- Infographics and posters
- A handful of things with a shape people know
- Heights and lengths, where the picture is the measure

Think twice when:
- Values that aren’t heights: a picture grows in width too, and its area overstates the difference
- Many items or close values: plain columns compare better
- Dashboards read every day: the pictures get in the way

Prompt: Create a pictorial column chart of the heights of five famous skyscrapers, from the Burj Khalifa to the Empire State Building, each drawn as a silhouette that grows to its height, with its height in meters above it, over a vertical gradient. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Define icons
var icon1 = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTc2IiBoZWlnaHQ9Ijg4OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNODcuODIuMDY2djc2LjQzNmwtNC4wNjUgMi45ODR2NjUuNDE4bC0yLjkwNCAzLjQ0My0uNzc0IDYzLjEyMy01LjIyOCA1LjczOHY2MS45NzVsLTIuMzIzIDQuODItLjc3NCAxNzguNTgtOS42OCAyLjI5Ni0uNzc1IDEyOC41NC05LjEgMy4yMTR2MTE5LjU4OWwtNS42MTQgMS4xNDgtLjc3NCA4NC4wMS03LjU1IDEuMTQ4djQ5LjM1aC04LjMyNnYxMS4wMThoLTYuOTd2OC4yNjRILjd2MjAuNjU4aDE3NC40MzdWODcxLjE2aC0xNy40MjR2LTguMjY0aC0xMS4yM3YtOS42NGwtNy4zNTYtLjIzLS45NjgtNzMuNjgxLTcuNTUtLjkxOC45NjctOTguOTMtNy45MzgtMS44MzctLjc3NC0xMjIuMTE0LTYuOTctMS44MzYtMS4zNTUtMTM4LjE4Mi01LjYxNC03LjU3NFYzMDcuMTg3bC02LjAwMi05LjQxMXYuMjMtMzkuOTRsLTQuMjYtMy42NzMtLjc3NC0zNi45NTVoLS45Njh2LTQ2LjU5NmwtMy44NzItNi44ODZ2LTYwLjEzOWwtMy42NzgtMi45ODQtLjM4OC0yMS4xMTdWLjA2NmgtMS4xNjF6IiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=";

var icon2 = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTAzIiBoZWlnaHQ9IjU3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAzIDU3Ny45VjI4OC41YzAtMS4xLTEuMi0yLjEtMi4yLTIuMWgtOFYxODIuMWMwLTEtMS4xLTIuMS0yLjEtMi4xSDc0LjRWOTguNWMwLTEtMS0yLTIuMS0ySDU5LjJzLjEtMS45LjEtMy0xLjEtMS4xLTEuMS0xLjFWNDIuN2gtMi4xVjhoLTN2ODQuNGgtMlY0Ni44aC0xLjl2NDUuOEgzNC45di00N2gtMS4ydjQ2LjloLTIuOVYuNWgtNC4ydjkyaC01LjF2NGgtOC4xYy0xLjEgMC0yIDEtMiAydjE4OEgyLjJjLTEuMSAwLTIuMSAxLTIuMSAydjI4OS40SDEwM3oiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==";

var icon3 = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iODMiIGhlaWdodD0iNTU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zOS44Ljh2NTYuNWwtNS4xIDEuM3Y1aDN2M2gxLjh2MmgtMy44Yy0uOSAwLTIuMSAxLTIuMSAydjE2LjloLTRzLjkgMTUuOS45IDE2LjljMCAxIDEuMSAyIDIuMSAyaDF2MTYuOWgtNy4xYy0xIDAtMiAxLTIgMnY5aC04LjFjLTEuMSAwLTIgMS0yIDJ2MS45aC0ybDQuMSAzOC43aC0zbDMuOSAzNy45aC0zLjlsMy43IDM3LjdoLTMuOWw0LjQgMzcuN2gtNC4zbDMuOSAzNi44aC00bDQuMiAzNi45aC00LjNsNC40IDM4LjdoLTQuM2w0IDM5LjhzLTEuNy0uMS0yLjUgMGMtLjggMC0xLjEgMS4xLTEuMyAxLjgtLjIuNy0xMy4xIDExNS0xMy4xIDExNWw0MS0uMmguN2w0MSAuMlM3MC4yIDQ0NC45IDcwIDQ0NC4yYy0uMi0uNy0uNS0xLjgtMS4zLTEuOC0uOC0uMS0yLjUgMC0yLjUgMGw0LTM5LjhoLTQuM2w0LjQtMzguN0g2Nmw0LjItMzYuOWgtNGwzLjktMzYuOGgtNC4zbDQuNC0zNy43aC0zLjlsMy43LTM3LjdoLTMuOWwzLjktMzcuOWgtM2w0LjEtMzguN2gtMnYtMS45YzAtMS4xLS45LTItMi0ySDU5di05YzAtMS0xLTItMi0yaC03LjF2LTE2LjloMWMxIDAgMi4xLTEgMi4xLTJzLjktMTYuOS45LTE2LjloLTRWNzAuNmMwLTEtMS4xLTItMi4xLTJINDR2LTJoMS44di0zaDN2LTVsLTUuMS0xLjNWLjhoLTMuOXoiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==";

var icon4 = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjQ5MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAuNy40djQwLjhoLTJ2NmgydjIuNWwtMSAzLjVoLTFjLTEgMC0yIDEtMiAydjJoLTFjLS45IDAtMiAxLTIgMnY1LjloLTFjLTEuMSAwLTIuMSAxLTIuMSAydjhoLTFjLTEgMC0yIDEtMiAyVjg2aC0xYy0xIDAtMi4xIDEtMi4xIDJ2MTYuOWgtMi4xYy0xIDAtMiAuOS0yIDJ2MjMuOWgtMmMtMSAwLTIgMS0yIDJ2NDAuN2gtMmMtMSAwLTIgMS0yIDJ2NTEuN2MwIC45LTIuMSAxLjItMi4xIDJ2MjY2LjJsMzEuOCAxaDFsMjguOC0uOWg1Ni4ybDI4LjguOWgxbDMxLjgtMVYyMjkuMmMwLS44LTIuMS0xLjEtMi4xLTJ2LTUxLjdjMC0xLTEtMi0yLTJoLTJ2LTQwLjdjMC0uOS0xLjEtMi0yLjEtMmgtMnYtMjMuOWMwLTEtMS4xLTItMi0yaC0yLjFWODhjMC0xLTEtMi0yLjEtMmgtMXYtOC45YzAtMS0xLTItMi0yaC0xdi04YzAtMS0xLTItMi0yaC0xLjF2LTUuOWMwLTEtMS4xLTItMi0yaC0xdi0yYzAtMS0xLTItMi0yaC0xbC0xLTMuNXYtMi41aDJ2LTZoLTJWLjRoLTMuOHY0MC44aC0ydjZoMnYyLjVsLTEgMy41aC0xYy0xIDAtMiAxLTIgMnYyaC0xYy0uOSAwLTIgMS0yIDJ2NS45aC0xYy0xLjEgMC0yLjEgMS0yLjEgMnY4aC0xYy0xIDAtMiAxLTIgMlY4NmgtMWMtMSAwLTIuMSAxLTIuMSAydjE2LjloLTIuMWMtMSAwLTIgLjktMiAydjIzLjloLTJjLTEgMC0yIDEtMiAydjQwLjdoLTJjLTEgMC0yIDEtMiAydjUxLjdjMCAuOS0yLjEgMS4yLTIuMSAydjczLjVINjV2LTczLjVjMC0uOC0yLjEtMS4xLTIuMS0ydi01MS43YzAtMS0xLTItMi0yaC0ydi00MC43YzAtLjktMS4xLTItMi4xLTJoLTJ2LTIzLjljMC0xLTEuMS0yLTItMmgtMi4xVjg4YzAtMS0xLTItMi4xLTJoLTF2LTguOWMwLTEtMS0yLTItMmgtMXYtOGMwLTEtMS0yLTItMmgtMS4xdi01LjljMC0xLTEuMS0yLTItMmgtMXYtMmMwLTEtMS0yLTItMmgtMWwtMS0zLjV2LTIuNWgydi02aC0yVi40aC0zLjh6TTY1IDMxMy42aDIzLjRsLjEuMUw2NSAzNTkuMXYtNDUuNXptMjYuNyAwaDIzLjZ2NDUuOGwtMjMuNi00NS44em0tMS43IDMuM2wyNS4yIDQ5Ljd2MTA2LjNINjVWMzY2LjJsMjUtNDkuM3oiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==";

var icon5 = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTQ0IiBoZWlnaHQ9IjQ4NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjkuOS4zdjQwSDY5Yy0uOCAwLTIuMSAxLjEtMi4xIDIuMXYyOC43YzAgMS4xLTEuMi45LTEuMiAyLjF2MjUuOWMwIC45LTEgMS4xLTEgMnY5LjRsLTcuMiAxOS40aC00Yy0xIDAtMi4xIDEtMi4xIDJ2NWgtM2MtMSAwLTIuMSAxLTIuMSAydjI3LjhoLTNjLTEgMC0yLjEuOS0yLjEgMnYzMy44YzAgMS40LTMgMi4xLTMgM3YxNjIuMWgtNWMtMSAwLTIuMSAxLTIuMSAydjM1LjhIMjBjLTEgMC0yLjEgMS0yLjEgMnY1My43SDIuN2MtMSAwLTIgMS0yIDJ2MjQuNWw3MS4xLjdoLjZsNzEuMS0uN3YtMjQuNWMwLTEtMS0yLTItMmgtMTUuMnYtNTMuN2MwLTEtMS0yLTIuMS0yaC0xMS4xdi0zNS44YzAtMS0xLTItMi4xLTJoLTVWMjA1LjVjMC0xLTMuMS0xLjYtMy4xLTN2LTMzLjhjMC0xLTEtMi0yLTJoLTN2LTI3LjhjMC0uOS0xLTItMi4xLTJoLTN2LTVjMC0xLTEtMi0yLTJoLTRsLTcuMi0xOS40di05LjRjMC0uOS0xLTEuMS0xLTJWNzMuMmMwLTEuMi0xLjItMS0xLjItMi4xVjQyLjRjMC0xLTEuMi0yLjEtMi4xLTIuMWgtLjlWLjNoLTQuNXoiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==";

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
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,    // no dragging to pan...
  panY: false,    // ...in either direction...
  wheelX: "none", // ...and no wheel zooming...
  wheelY: "none"  // ...at all
}));

// A sky behind the plot in the theme's colors: its first color at the top, through its fourth, to a deep shade of
// its seventh at the bottom. The axis labels outside it stay on the page background, so they read in light and dark
// mode alike.
var colors = chart.get("colors");
chart.plotContainer.set("background", am5.Rectangle.new(root, {
  fillGradient: am5.LinearGradient.new(root, {
    stops: [
      { color: colors.getIndex(0) },
      { color: colors.getIndex(3) },
      { color: am5.Color.brighten(colors.getIndex(6), -0.7) } // darkened by 70%
    ]
  })
}));

var data = [{
  category: "Burj Khalifa",
  height: 828,
  pictureSettings: {
    src: icon1
  }
}, {
  category: "Willis Tower",
  height: 527,
  pictureSettings: {
    src: icon2
  }
}, {
  category: "Taipei 101",
  height: 508,
  pictureSettings: {
    src: icon3
  }
}, {
  category: "Petronas Towers",
  height: 452,
  pictureSettings: {
    src: icon4
  }
}, {
  category: "Empire State Building",
  height: 449,
  pictureSettings: {
    src: icon5
  }
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {
    // the names sit inside the plot, on the sky at the foot of the towers
    inside: true
  }),
  tooltip: am5.Tooltip.new(root, {}) // a name label follows the cursor along the axis
}));

var xRenderer = xAxis.get("renderer");

xRenderer.labels.template.setAll({
  fill: am5.color(0xffffff), // white...
  fillOpacity: 0.5,          // ...half see-through...
  // long names wrap onto a second line instead of running into the next one
  oversizedBehavior: "wrap-no-break",
  textAlign: "center" // ...with wrapped lines centered
});

// each label may be as wide as its category's cell
xAxis.onPrivate("cellWidth", function (cellWidth) {
  xRenderer.labels.template.set("maxWidth", cellWidth);
});

xRenderer.grid.template.set("forceHidden", true); // no grid lines between the towers

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,    // the scale runs from 0...
  max: 1000, // ...to 1000 meters
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var yRenderer = yAxis.get("renderer");

yRenderer.grid.template.setAll({
  strokeDasharray: [4, 4] // dashed: 4px dashes, 4px gaps
});

// the vertical grid lines get the same dash, for when they are shown
xRenderer.grid.template.set("strokeDasharray", [4, 4]);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// The tooltip gets the theme's text color as its background: the invisible columns have no color to lend it
var tooltip = am5.Tooltip.new(root, {
  getFillFromSprite: false,
  autoTextColor: false
});
tooltip.get("background").setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // dark on light, light on dark...
  fillOpacity: 0.9                                         // ...almost solid
});
tooltip.label.set("fill", root.interfaceColors.get("background")); // text in the background color

var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "height",
  categoryXField: "category",
  tooltip: tooltip
}));

// The columns are invisible: the tower pictures stand in for them.
// They still catch the pointer, so each tower shows its height on hover.
series.columns.template.setAll({
  width: am5.percent(100),
  strokeOpacity: 0,
  fillOpacity: 0,
  tooltipText: "{categoryX}: {valueY} meters" // the tower's name and height
});

// the tower picture, standing on the axis
series.bullets.push(function(root, series, dataItem) {
  var tower = am5.Picture.new(root, {
    height: 100,                     // a starting height; the adapter below sets the real one
    centerX: am5.p50,                // centered on the column...
    centerY: am5.p100,               // ...and standing on its bottom edge
    opacity: 0.5,                    // half see-through
    templateField: "pictureSettings" // the picture's src from the data
  });

  // each picture is as tall as its column, from the axis up to the tower's height
  tower.adapters.add("height", function(height, target) {
    if (dataItem) {
      height = dataItem.get("bottom") - dataItem.get("top");
    }
    return height;
  });

  return am5.Bullet.new(root, {
    locationY: 0, // at the bottom of the column
    sprite: tower,
    dynamic:true  // redrawn when the series changes, so the height keeps up
  });
});

// the height above each tower
series.bullets.push(function() {
  return am5.Bullet.new(root, {
    locationY: 1, // at the top of the column
    sprite: am5.Label.new(root, {
      centerX: am5.p50,        // centered over it...
      centerY: am5.p100,       // ...and resting on it
      text: "{height} meters", // the height from the data...
      // the sky behind the label is a mid-tone theme color in light and dark mode, so the label is always dark
      fill: am5.color(0x000000),
      populateText: true // ...filled in from the data item
    })
  })
})

series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
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
  overflow: hidden;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
