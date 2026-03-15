---
title: "HTML content"
source: "https://www.amcharts.com/docs/v5/concepts/common-elements/html-content/"
scraped: "2026-03-15"
---

amCharts 5 using HTML as content for its `Container` elements. This tutorial will show various ways this can be used.

## Common elements

To make a container (or any other element that extends `Container`) display HTML content, simply use its `html` setting.

The below code adds an HTML-enabled title to the chart:

chart.children.unshift(am5.Label.new(root, {
  html: "<h2>Chart title</h2><h4>And a smaller sub-title</h4>",
  x: am5.percent(50),
  centerX: am5.percent(50),
  paddingTop: 0,
  paddingBottom: 0
}));

chart.children.unshift(am5.Label.new(root, {
  html: "<h2>Chart title</h2><h4>And a smaller sub-title</h4>",
  x: am5.percent(50),
  centerX: am5.percent(50),
  paddingTop: 0,
  paddingBottom: 0
}));


## Tooltips

### Tooltip contents

There are couple of ways to set HTML content for tooltips:

-   Via `tooltipHTML` setting of an element.
-   Via `labelHTML` setting of a `Tooltip` object.

If we'd like some HTML content to be shown in a tooltip when hovered over an element, e.g. a column, we can use its `tooltipHTML` setting:

series.columns.template.setAll({
  tooltipHTML: "<strong>{categoryX}</strong>: {valueY}"
});

series.columns.template.setAll({
  tooltipHTML: "<strong>{categoryX}</strong>: {valueY}"
});


If we do have a `Tooltip` instance, e.g. on a series, we can use its `labelHTML` setting instead:

let series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true,
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelHTML: "<strong>{categoryX}</strong>: {valueY}"
  })
}));

var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true,
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelHTML: "<strong>{categoryX}</strong>: {valueY}"
  })
}));


### Interactive elements

If you have interactive elements in tooltip, like buttons or links, you will need to explicitly enable tooltip interactivity by setting `interactive: true` on its label.

It's also recommended to use `keepTargetHover: true` on the tooltip, so that tooltip does not go away until the pointer goes outside its area.

let series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true,
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelHTML: "<strong>{categoryX}</strong>: {valueY}",
    keepTargetHover: true
  })
}));

series.get("tooltip").label.set("interactive", true);

var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true,
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelHTML: "<strong>{categoryX}</strong>: {valueY}",
    keepTargetHover: true
  })
}));

series.get("tooltip").label.set("interactive", true);

## Axis labels

We will need to use an adapter to dynamically override content for an axis label:

xAxis.get("renderer").labels.template.adapters.add("html", function(html, target) {
  return "<div style=\\"text-align: center; font-weight: bold;\\">{value.formatDate('d MMM')}</div><div style=\\"text-align: center;\\">{value.formatDate('EEE')}</div>";
});

xAxis.get("renderer").labels.template.adapters.add("html", function(html, target) {
  return "<div style=\\"text-align: center; font-weight: bold;\\">{value.formatDate('d MMM')}</div><div style=\\"text-align: center;\\">{value.formatDate('EEE')}</div>";
});


## Limitations

### Exporting

HTML content will not be included when exporting chart snapshot to images or PDF.

### Layer order

HTML content does not follow regular "z-index" order in regards to other elements - it will always be in front.

### Tooltips on HTML elements

There's currently no way to set rollover tooltip to be displayed on HTML-enabled elements, e.g. via `tooltipText` settings.

### Images

All images included in HTML content need to be sized via either `width` and `height` attributes, or CSS.

If un-sized images are used, the element will not be sized properly, which will be especially prominent if used in tooltips.

// Incorrect!
label.set("html", "<img src=\\"flag.png\\">");

// Correct
label.set("html", "<img src=\\"flag.png\\" width=\\"32\\" width=\\"32\\">");

// Also correct
label.set("html", "<img src=\\"flag.png\\" style=\\"width: 32px; height: 32px\\">");

// Incorrect!
label.set("html", "<img src=\\"flag.png\\">");

// Correct
label.set("html", "<img src=\\"flag.png\\" width=\\"32\\" width=\\"32\\">");

// Also correct
label.set("html", "<img src=\\"flag.png\\" style=\\"width: 32px; height: 32px\\">");
