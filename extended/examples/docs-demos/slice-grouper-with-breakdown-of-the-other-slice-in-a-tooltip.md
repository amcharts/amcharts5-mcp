---
title: "Slice grouper with breakdown of the \"Other\" slice in a tooltip"
source: "https://docs.amcharts.com/embeds/v5/slice-grouper-with-breakdown-of-the-other-slice-in-a-tooltip/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/percent-charts/grouping-slices"]
---

A demo from the docs page "Grouping slices" (get_doc(path: "charts/percent-charts/grouping-slices")).

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
    country: "United States",
    sales: 350
  },
  {
    country: "Canada",
    sales: 301
  },
  {
    country: "Mexico",
    sales: 201
  },
  {
    country: "Germany",
    sales: 165
  },
  {
    country: "Australia",
    sales: 139
  },
  {
    country: "Austria",
    sales: 128
  },
  {
    country: "United Kingdom",
    sales: 99
  },
  {
    country: "Belgium",
    sales: 60
  },
  {
    country: "The Netherlands",
    sales: 50
  },
  {
    country: "France",
    sales: 30
  },
  {
    country: "Spain",
    sales: 20
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "sales",
    categoryField: "country"
  })
);

series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

series.getTooltip().label.adapters.add("text", function (text, target) {
  if (target.dataItem && target.dataItem.get("category") == grouper.get("groupName")) {
    text = "[bold underline]" + text + "[/]\n";
    am5.array.each(grouper.getPrivate("smallDataItems"), function (dataItem) {
      var percent =
        target.dataItem.get("valuePercentTotal") *
        (dataItem.get("value") / target.dataItem.get("value"));
      text +=
        "\n[width: 130px]" +
        dataItem.get("category") +
        ":[/] " +
        root.numberFormatter.format(percent, "#.##") +
        "%";
    });
  }
  return text;
});

series.data.setAll(data);

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: root.gridLayout
  })
);

legend.data.setAll(series.dataItems);

var grouper = am5plugins_sliceGrouper.SliceGrouper.new(root, {
  series: series,
  legend: legend,
  clickBehavior: "break"
});
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/plugins/sliceGrouper.js
