---
title: "Stacked Bar Chart with Negative Values"
source: "https://www.amcharts.com/demos/stacked-bar-chart-with-negative-values/"
category: "column-bar"
scraped: "2026-10-08"
---

A population pyramid: men to the left, women to the right, one pair of bars for each age group, from 0–4 at the bottom to 85+ at the top. The men’s values are negative in the data, and the labels show them without the minus sign.

When a population pyramid works: Putting two groups back to back on one axis compares them row by row and shows the shape of the whole at a glance: a wide base for a young population, a column for an aging one. It needs two groups that split the same categories, like men and women.

Good for:
- Population by age and sex
- Survey answers from two groups
- Two sides of one breakdown, like imports and exports

Think twice when:
- More than two groups: stack or cluster the bars
- Comparing the two sides exactly: a dumbbell plot puts them on one baseline
- Agree and disagree answers: diverging stacked bars suit them better

Prompt: Create a population pyramid: a horizontal bar chart of age groups, the oldest on top, with men’s shares to the left of zero and women’s to the right, both shown as positive numbers. Mark the two sides Male and Female, and add value labels and tooltips. Use the amCharts 5 library with its Responsive theme.

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
    panX: false,            // a drag doesn't pan: the cursor zooms with it
    panY: false,
    wheelX: "panX",         // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX",        // ...and the vertical wheel zooms the value axis
    layout: root.verticalLayout,
    arrangeTooltips: false, // overlapping tooltips aren't moved apart
    paddingLeft: 0,         // no gap at the left edge...
    paddingRight: 10        // ...and 10px at the right
  })
);

// Use only absolute numbers
chart.getNumberFormatter().set("numberFormat", "#.#s");

// Data
var data = [
  {
    age: "85+",
    male: -0.1,
    female: 0.3
  },
  {
    age: "80-84",
    male: -0.2,
    female: 0.3
  },
  {
    age: "75-79",
    male: -0.3,
    female: 0.6
  },
  {
    age: "70-74",
    male: -0.5,
    female: 0.8
  },
  {
    age: "65-69",
    male: -0.8,
    female: 1.0
  },
  {
    age: "60-64",
    male: -1.1,
    female: 1.3
  },
  {
    age: "55-59",
    male: -1.7,
    female: 1.9
  },
  {
    age: "50-54",
    male: -2.2,
    female: 2.5
  },
  {
    age: "45-49",
    male: -2.8,
    female: 3.0
  },
  {
    age: "40-44",
    male: -3.4,
    female: 3.6
  },
  {
    age: "35-39",
    male: -4.2,
    female: 4.1
  },
  {
    age: "30-34",
    male: -5.2,
    female: 4.8
  },
  {
    age: "25-29",
    male: -5.6,
    female: 5.1
  },
  {
    age: "20-24",
    male: -5.1,
    female: 5.1
  },
  {
    age: "15-19",
    male: -3.8,
    female: 3.8
  },
  {
    age: "10-14",
    male: -3.2,
    female: 3.4
  },
  {
    age: "5-9",
    male: -4.4,
    female: 4.1
  },
  {
    age: "0-4",
    male: -5.0,
    female: 4.8
  }
];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "age",
    renderer: am5xy.AxisRendererY.new(root, {
      // the first age group in the data, 85+, goes at the top
      inversed: true,
      // each row's bars take the middle 80% of it, leaving a gap between rows
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minorGridEnabled: true, // fainter grid lines between the labeled rows
      minGridDistance: 20     // at least 20px between the age labels
    })
  })
);

yAxis.data.setAll(data);

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    // some room past the longest bars for their value labels
    extraMin: 0.1,
    extraMax: 0.1,
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 60, // at least 60px between the labels
      strokeOpacity: 0.1   // a faint axis line
    })
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// adds one side of the pyramid: its bars, their value labels and a line with the side's name
function createSeries(field, labelCenterX, pointerOrientation, rangeValue) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: field,
      categoryYField: "age",
      sequencedInterpolation: true, // the bars grow in one after another on load
      // both series share each row instead of sitting side by side
      clustered: false,
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: pointerOrientation, // the tooltip sits on the outer side of the bar's end
        labelText: "{categoryY}: {valueX}"      // the age group and its value
      })
    })
  );

  series.columns.template.setAll({
    height: am5.p100, // each bar fills its row's band
    strokeOpacity: 0, // no outline
    fillOpacity: 0.8  // a little see-through
  });

  series.bullets.push(function() {
    return am5.Bullet.new(root, {
      locationX: 1,   // at the bar's end...
      locationY: 0.5, // ...in the middle of its height
      sprite: am5.Label.new(root, {
        centerY: am5.p50,     // centered on the bar's middle
        text: "{valueX}",
        populateText: true,   // fill in {valueX} from the data
        centerX: labelCenterX // outside the bar: right-aligned on the left side, left-aligned on the right
      })
    });
  });

  series.data.setAll(data);
  series.appear();

  var rangeDataItem = xAxis.makeDataItem({
    value: rangeValue // -4 on the left side, 4 on the right
  });
  xAxis.createAxisRange(rangeDataItem);
  rangeDataItem.get("grid").setAll({
    strokeOpacity: 1,            // a solid line...
    stroke: series.get("stroke") // ...in the series' color
  });

  var label = rangeDataItem.get("label");
  label.setAll({
    text: field.toUpperCase(), // the side's name in capitals
    fontSize: "1.1em",         // a little bigger than the other text
    fill: series.get("stroke"),
    paddingTop: 10,            // a little below the plot's top
    isMeasured: false,         // doesn't make the axis taller
    centerX: labelCenterX      // on the outer side of the line
  });
  // lift the label from the axis to the top of the plot, whatever the plot's height
  label.adapters.add("dy", function() {
    return -chart.plotContainer.height();
  });

  return series;
}

createSeries("male", am5.p100, "right", -4); // left side: labels end at the bars, line at -4
createSeries("female", 0, "left", 4);        // right side: labels start at the bars, line at 4

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomY" // a drag up or down zooms in on those age groups
}));
cursor.lineY.set("forceHidden", true); // no cursor lines...
cursor.lineX.set("forceHidden", true); // ...only the tooltips

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
