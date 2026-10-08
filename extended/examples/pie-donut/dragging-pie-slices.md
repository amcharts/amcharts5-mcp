---
title: "Dragging Pie Slices"
source: "https://www.amcharts.com/demos/dragging-pie-slices/"
category: "pie-donut"
scraped: "2026-10-08"
---

Two donuts with a line between them. Drag a slice across the line and it moves to the other donut; let go too early and it snaps back.

When people move the data: Most charts are for reading; this one is for sorting. Dragging slices between two groups lets people try out a split themselves, like dividing a budget or a team, and watch both donuts rebalance as they go.

Good for:
- Planning tools: dividing a budget or resources
- Teaching: sorting items into two groups
- Letting people build their own comparison

Think twice when:
- Phones: dragging small slices with a finger is fiddly
- More than two groups
- Results that need saving: the chart keeps no record of its own

Prompt: Create two donut charts side by side, separated by a dashed line, with six countries split between them. Each slice can be dragged across the line to move it to the other donut; dropped short of the line, it snaps back. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Create custom theme
// https://www.amcharts.com/docs/v5/concepts/themes/#Quick_custom_theme
var myTheme = am5.Theme.new(root);
myTheme.rule("Label").set("fontSize", "0.8em"); // all labels a little smaller

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);

// Create wrapper container
var container = root.container.children.push(am5.Container.new(root, {
  width: am5.p100,              // fills the whole chart area
  height: am5.p100,
  layout: root.horizontalLayout // the two donuts side by side
}));

// Create first chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart0 = container.children.push(am5percent.PieChart.new(root, {
  innerRadius: am5.p50, // a hole half the radius turns the pie into a donut
  tooltip: am5.Tooltip.new(root, {})
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series0 = chart0.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "category",
  alignLabels: false // labels stay on their slices, not lined up in columns at the sides
}));

series0.labels.template.setAll({
  textType: "circular",               // the labels curve along the ring
  templateField: "dummyLabelSettings" // the dummy slice's data hides its label
});

series0.ticks.template.set("forceHidden", true); // no tick lines from the slices to their labels

var sliceTemplate0 = series0.slices.template;
sliceTemplate0.setAll({
  draggable: true, // slices can be dragged to the other donut (see the pointerup handlers)
  // a data item's "settings" field restyles its slice (the gray, dashed dummy slice)
  templateField: "settings",
  cornerRadius: 5  // rounded slice corners
});

// Separator line
container.children.push(am5.Line.new(root, {
  layer: 1,                // drawn on a canvas layer above the charts
  height: am5.percent(60), // 60% of the chart's height
  y: am5.p50,              // halfway down the chart...
  centerY: am5.p50,        // ...measured from the line's middle
  strokeDasharray: [4, 4], // dashed: 4px dashes, 4px gaps
  stroke: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  strokeOpacity: 0.5 // half transparent
}));

// Create second chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart1 = container.children.push(am5percent.PieChart.new(root, {
  innerRadius: am5.p50,
  tooltip: am5.Tooltip.new(root, {})
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series1 = chart1.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "category",
  alignLabels: false
}));

series1.labels.template.setAll({
  textType: "circular",
  radius: 20, // the labels 20px out from the ring (10 by default, as on the left)
  templateField: "dummyLabelSettings"
});

series1.ticks.template.set("forceHidden", true);

var sliceTemplate1 = series1.slices.template;
sliceTemplate1.setAll({
  draggable: true, // slices can be dragged back to the left donut
  templateField: "settings",
  cornerRadius: 5
});

// change layers when down
sliceTemplate0.events.on("pointerdown", function (e) {
  e.target.set("layer", 1); // the dragged slice goes over the other chart
});

sliceTemplate1.events.on("pointerdown", function (e) {
  e.target.set("layer", 1);
});

// when released, do all the magic
sliceTemplate0.events.on("pointerup", function (e) {
  series0.hideTooltip();
  series1.hideTooltip();

  var slice = e.target;
  // dropped past halfway to the other donut: the slice moves there, otherwise it springs back
  if (slice.x() > container.width() / 4) {
    var index = series0.slices.indexOf(slice);
    slice.dataItem.hide(); // the slice hides in this donut...

    var series1DataItem = series1.dataItems[index];
    series1DataItem.show(); // ...and its twin in the other donut shows
    series1DataItem.get("slice").setAll({ x: 0, y: 0 }); // back in the ring, wherever it was dropped before

    handleDummy(series0);
    handleDummy(series1);
  } else {
    slice.animate({ // not dropped far enough: glide back into place
      key: "x",
      to: 0,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic) // fast start, slow finish
    });
    slice.animate({
      key: "y",
      to: 0,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic)
    });
  }
});

// the same for slices dragged from the right donut to the left one
sliceTemplate1.events.on("pointerup", function (e) {
  var slice = e.target;

  series0.hideTooltip();
  series1.hideTooltip();

  if (slice.x() < container.width() / 4) {
    var index = series1.slices.indexOf(slice);
    slice.dataItem.hide();

    var series0DataItem = series0.dataItems[index];
    series0DataItem.show();
    series0DataItem.get("slice").setAll({ x: 0, y: 0 });

    handleDummy(series0);
    handleDummy(series1);
  } else {
    slice.animate({
      key: "x",
      to: 0,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic)
    });
    slice.animate({
      key: "y",
      to: 0,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic)
    });
  }
});

// data
var data = [
  // a gray placeholder slice that keeps an empty donut visible
  {
    category: "Dummy",
    value: 1000,
    settings: {
      fill: am5.color(0xdadada),
      stroke: am5.color(0xdadada),
      fillOpacity: 0.3,
      strokeDasharray: [4, 4],
      tooltipText: null, // no tooltip
      draggable: false   // can't be dragged
    },
    dummyLabelSettings: {
      forceHidden: true // no label
    }
  },
  {
    category: "Lithuania",
    value: 501.9
  },
  {
    category: "Estonia",
    value: 301.9
  },
  {
    category: "Ireland",
    value: 201.1
  },
  {
    category: "Germany",
    value: 165.8
  },
  {
    category: "Australia",
    value: 139.9
  },
  {
    category: "Austria",
    value: 128.3
  }
];

// show/hide dummy slice depending if there are other visible slices
function handleDummy(series) {
  // count visible data items
  var visibleCount = 0;
  am5.array.each(series.dataItems, function (dataItem) {
    if (!dataItem.isHidden()) {
      visibleCount++;
    }
  });
  // if all hidden, show dummy
  if (visibleCount == 0) {
    series.dataItems[0].show();
  } else {
    series.dataItems[0].hide();
  }
}
// set data
series0.data.setAll(data);
series1.data.setAll(data);

// start with three countries in each donut: hide the rest, and the dummies
var startRight = ["Germany", "Australia", "Austria"];
am5.array.each(series0.dataItems, function (dataItem) {
  var category = dataItem.get("category");
  if (category == "Dummy" || startRight.indexOf(category) != -1) {
    dataItem.hide(0); // at once, without animation
  }
});
am5.array.each(series1.dataItems, function (dataItem) {
  if (startRight.indexOf(dataItem.get("category")) == -1) {
    dataItem.hide(0);
  }
});

// reveal container
container.appear(1000, 100);
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
