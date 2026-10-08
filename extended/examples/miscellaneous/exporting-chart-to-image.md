---
title: "Exporting Chart to Image"
source: "https://www.amcharts.com/demos/exporting-chart-to-image/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A column chart with an export menu: the icon at the top right saves the chart as an image or a PDF, saves its data as a spreadsheet, or prints it. Change the chart with the controls first, and the export shows it as changed.

When to offer an export menu: People copy charts into reports, slides and emails, and a screenshot loses quality and the data behind it. An export menu gives them a sharp image or PDF of exactly what they see, and the numbers as CSV or Excel, without a trip back to whoever made the chart.

Good for:
- Dashboards and reports people share
- Charts that end up in slides or print
- Handing over the data behind a chart

Think twice when:
- Charts that load images from other sites: they can block the export
- Very large data: export the data from its source instead
- Kiosk or embedded screens with no use for files

Prompt: Create a column chart of visits from 16 countries, each column in its own color, with an export menu that saves the chart as an image or PDF, prints it, or saves its data as JSON, CSV, Excel, PDF or HTML. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,     // no dragging the plot
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the countries
  layout: root.verticalLayout
}));

// each column takes the next palette color, through columnSettings and the templateField below
var data = [{
  country: "USA",
  visits: 4025,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "China",
  visits: 1882,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Japan",
  visits: 1809,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Germany",
  visits: 1322,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "UK",
  visits: 1122,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "France",
  visits: 1114,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "India",
  visits: 984,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Spain",
  visits: 711,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Netherlands",
  visits: 665,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Korea",
  visits: 443,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Canada",
  visits: 441,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Brazil",
  visits: 395,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Italy",
  visits: 386,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Australia",
  visits: 384,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Taiwan",
  visits: 338,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  country: "Poland",
  visits: 328,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}]

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  // columns use the middle 80% of their category's width, leaving gaps between them
  cellStartLocation: 0.1,
  cellEndLocation: 0.9,
  // turned labels need little room, so every country gets one
  minGridDistance: 20
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "country",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}) // shows the hovered country on the axis
}));

xRenderer.grid.template.setAll({
  location: 1 // grid lines at the end of each country's cell, between the columns
});

// Labels turned at an angle, so long names like Netherlands don't run into their neighbors
xRenderer.labels.template.setAll({
  multiLocation: 0.5, // a label covering several countries sits in the middle of them
  rotation: -45,      // 45 degrees, reading upward
  centerX: am5.p100,  // each name ends under its column...
  centerY: am5.p50,   // ...centered on that point...
  paddingRight: 10    // ...with a 10px gap
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
  categoryXField: "country"
}));

series.columns.template.setAll({
  tooltipText: "{categoryX}: {valueY}", // as "USA: 4025"
  width: am5.percent(90),               // 90% of the cell space set on the renderer
  // the tooltip points at the top of the column
  tooltipY: 0,
  strokeOpacity: 0,                     // no outline
  templateField: "columnSettings"
});

series.data.setAll(data);

// Add export menu: the icon in the top right corner saves the chart as an
// image or PDF, the data as JSON, CSV, Excel, PDF or HTML, or prints it
// https://www.amcharts.com/docs/v5/concepts/exporting/
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  // The data part of the menu exports these two fields, with these column names
  dataSource: data,
  dataFields: {
    country: "Country",
    visits: "Visits"
  }
});

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
- https://cdn.amcharts.com/lib/5/plugins/exporting.js
