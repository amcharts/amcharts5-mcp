---
title: "Images as Categories"
source: "https://www.amcharts.com/demos/images-as-categories/"
category: "column-bar"
scraped: "2026-10-08"
---

A column chart with a flag above each country name on the axis. Any picture can go there, like logos, product shots or faces: here, visits from eleven countries.

When to use pictures as labels: A flag, logo or face is recognized faster than a name, especially by people scanning in a hurry or reading in another language. Keep the names too: not everyone knows every flag, and a picture alone can be ambiguous.

Good for:
- Countries with flags, brands with logos
- Team rankings with player photos
- Charts for an international audience

Think twice when:
- Dozens of categories: the pictures get too small to tell apart
- Pictures that look alike, like many similar flags
- Black-and-white print

Prompt: Create a column chart of website visits from eleven countries, each column in its own color, with each country’s flag under its column and the country name below the flag. Label every column with its value, and add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,     // no panning: a drag over the plot zooms instead
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the countries
  paddingLeft: 0,  // the value labels sit at the chart's left edge
  layout: root.verticalLayout
}));

// Add cursor: drag across the plot to zoom in on a few countries
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// Data
var colors = chart.get("colors");

var data = [{
  country: "US",
  visits: 725,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/us.svg" },
  columnSettings: { fill: colors.next() }
}, {
  country: "UK",
  visits: 625,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/gb.svg" },
  columnSettings: { fill: colors.next() }
}, {
  country: "China",
  visits: 602,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/cn.svg" },
  columnSettings: { fill: colors.next() }
}, {
  country: "Japan",
  visits: 509,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/jp.svg" },
  columnSettings: { fill: colors.next() }
}, {
  country: "Germany",
  visits: 322,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/de.svg" },
  columnSettings: { fill: colors.next() }
}, {
  country: "France",
  visits: 214,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/fr.svg" },
  columnSettings: { fill: colors.next() }
}, {
  country: "India",
  visits: 204,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/in.svg" },
  columnSettings: { fill: colors.next() }
}, {
  country: "Spain",
  visits: 198,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/es.svg" },
  columnSettings: { fill: colors.next() }
}, {
  country: "Netherlands",
  visits: 165,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/nl.svg" },
  columnSettings: { fill: colors.next() }
}, {
  country: "South Korea",
  visits: 93,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/kr.svg" },
  columnSettings: { fill: colors.next() }
}, {
  country: "Canada",
  visits: 41,
  iconSettings: { src: "https://www.amcharts.com/wp-content/uploads/assets/flags/ca.svg" },
  columnSettings: { fill: colors.next() }
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 30,   // at least 30px between countries; on narrow screens some are skipped
  minorGridEnabled: true // a skipped country still gets a faint grid line
})

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "country",
  renderer: xRenderer,
  // a flag under each category, its picture taken from iconSettings in the data
  bullet: function (root, axis, dataItem) {
    return am5xy.AxisBullet.new(root, {
      location: 0.5, // in the middle of the category
      sprite: am5.Picture.new(root, {
        // only the height is set, so each flag keeps its own proportions
        height: 18,
        // a soft shadow, so the white in a flag stands out from the background
        shadowColor: am5.color(0x000000),
        shadowOpacity: 0.35,
        shadowBlur: 4,
        shadowOffsetY: 1,
        // about 8px under the axis line, the same gap as down to the name
        centerY: am5.percent(-45),
        centerX: am5.p50, // centered under the column
        templateField: "iconSettings"
      })
    });
  }
}));

xRenderer.grid.template.setAll({
  location: 1 // grid lines at the end of each country's cell, between the columns
})

xRenderer.labels.template.setAll({
  paddingTop: 31, // room for the flag above the name
  // long names wrap onto a second line instead of running into the next one
  oversizedBehavior: "wrap-no-break",
  textAlign: "center" // wrapped lines centered
});

// each label may be as wide as its category's cell
xAxis.onPrivate("cellWidth", function (cellWidth) {
  xRenderer.labels.template.set("maxWidth", cellWidth);
});

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1 // a faint line along the value axis
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "visits",
  categoryXField: "country",
  // the label on the tallest column may stand above the plot, so it is not cut off at its edge
  maskBullets: false
}));

series.columns.template.setAll({
  tooltipText: "{categoryX}: {valueY}", // as "US: 725"
  tooltipY: 0,                          // the tooltip points at the top of the column
  strokeOpacity: 0,                     // no outline
  // each column's color comes from columnSettings in its data
  templateField: "columnSettings"
});

// Value labels: where they sit on the columns (0 at the bottom, 0.5 in the middle, 1 at the top), all from one template,
// so a change to it reaches every label at once
var labelLocation = 1;

var labelTemplate = am5.Template.new({
  text: "{valueY}",  // the column's value
  // above the column, in the color of text on the background
  fill: root.interfaceColors.get("alternativeBackground"),
  centerY: am5.p100, // the label's bottom on the spot...
  centerX: am5.p50,  // ...centered over it
  populateText: true // fills in {valueY} from the column's data
});

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: labelLocation,
    sprite: am5.Label.new(root, {}, labelTemplate)
  });
});

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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
