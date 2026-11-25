---
title: "Images as legend markers"
source: "https://docs.amcharts.com/embeds/v5/images-as-legend-markers-2/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["concepts/legend"]
---

A demo from the docs page "Legend" (get_doc(path: "concepts/legend")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
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
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Add scrollbar
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

var data = [
  {
    year: "2021",
    canada: 2.5,
    germany: 2.5,
    india: 2.1
  },
  {
    year: "2022",
    canada: 2.6,
    germany: 2.7,
    india: 2.2
  },
  {
    year: "2023",
    canada: 2.8,
    germany: 2.9,
    india: 2.4
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    max: 100,
    numberFormat: "#'%'",
    strictMinMax: true,
    calculateTotals: true,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add legend
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

legend.markers.template.setup = function (marker) {
  marker.events.on("dataitemchanged", function () {
    var dataItem = marker._dataItem;
    var series = dataItem.dataContext;
    marker.children.push(
      am5.Picture.new(root, {
        width: 20,
        height: 20,
        src:
          "https://www.amcharts.com/static/flags/" +
          series.get("name").toLowerCase() +
          ".svg"
      })
    );

    dataItem.on("markerRectangle", function (rectangle) {
      rectangle.set("forceHidden", true);
    });
  });
};

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function makeSeries(name, fieldName, icon) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      stacked: true,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: fieldName,
      valueYShow: "valueYTotalPercent",
      categoryXField: "year"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%",
    tooltipY: am5.percent(10)
  });

  series.data.setAll(data);

  // Make stuff animate on load
  // https://docs.amcharts.com/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueYTotalPercent.formatNumber('#.#')}%",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);

  var tooltip = series.set("tooltip", am5.Tooltip.new(root, { layout: root.horizontalLayout }));
  tooltip.children.unshift(
    am5.Picture.new(root, {
      width: 20,
      height: 20,
      marginRight: 5,
      src: icon
    })
  );

  tooltip.label.set("paddingTop", 2);
}

makeSeries("Canada", "canada", "https://www.amcharts.com/static/flags/canada.svg");
makeSeries("Germany", "germany", "https://www.amcharts.com/static/flags/germany.svg");
makeSeries("India", "india", "https://www.amcharts.com/static/flags/india.svg");

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
