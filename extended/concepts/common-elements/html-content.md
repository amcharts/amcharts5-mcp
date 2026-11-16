---
title: "HTML content"
source: "https://docs.amcharts.com/v5/concepts/common-elements/html-content/"
scraped: "2026-11-16"
---

> amCharts 5 using HTML as content for its Container elements. This tutorial will show various ways this can be used.

amCharts 5 using HTML as content for its `Container` elements. This tutorial will show various ways this can be used.

## Common elements

To make a container (or any other element that extends `Container`) display HTML content, simply use its `html` setting.

The below code adds an HTML-enabled title to the chart:

TypeScript:

```ts
chart.children.unshift(am5.Label.new(root, {
  html: "<h2>Chart title</h2><h4>And a smaller sub-title</h4>",
  x: am5.percent(50),
  centerX: am5.percent(50),
  paddingTop: 0,
  paddingBottom: 0
}));
```

JavaScript:

```js
chart.children.unshift(am5.Label.new(root, {
  html: "<h2>Chart title</h2><h4>And a smaller sub-title</h4>",
  x: am5.percent(50),
  centerX: am5.percent(50),
  paddingTop: 0,
  paddingBottom: 0
}));
```

Example: [Chart with an HTML title](https://docs.amcharts.com/embeds/v5/chart-with-an-html-title/). Its code: get_example(path: "examples/docs-demos/chart-with-an-html-title").

## Tooltips

### Tooltip contents

There are couple of ways to set HTML content for tooltips:

* Via `tooltipHTML` setting of an element.
* Via `labelHTML` setting of a `Tooltip` object.

If we'd like some HTML content to be shown in a tooltip when hovered over an element, e.g. a column, we can use its `tooltipHTML` setting:

TypeScript:

```ts
series.columns.template.setAll({
  tooltipHTML: "<strong>{categoryX}</strong>: {valueY}"
});
```

JavaScript:

```js
series.columns.template.setAll({
  tooltipHTML: "<strong>{categoryX}</strong>: {valueY}"
});
```

Example: [HTML tooltips](https://docs.amcharts.com/embeds/v5/html-tooltips/). Its code: get_example(path: "examples/docs-demos/html-tooltips").

If we do have a `Tooltip` instance, e.g. on a series, we can use its `labelHTML` setting instead:

TypeScript:

```ts
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
```

JavaScript:

```js
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
```

Example: [HTML tooltips](https://docs.amcharts.com/embeds/v5/html-tooltips-2/). Its code: get_example(path: "examples/docs-demos/html-tooltips-2").

### Interactive elements

If you have interactive elements in tooltip, like buttons or links, you will need to explicitly enable tooltip interactivity by setting `interactive: true` on its label.

It's also recommended to use `keepTargetHover: true` on the tooltip, so that tooltip does not go away until the pointer goes outside its area.

TypeScript:

```ts
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
```

JavaScript:

```js
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
```

## Axis labels

We will need to use an adapter to dynamically override content for an axis label:

TypeScript:

```ts
xAxis.get("renderer").labels.template.adapters.add("html", function(html, target) {
  return "<div style=\"text-align: center; font-weight: bold;\">{value.formatDate('d MMM')}</div><div style=\"text-align: center;\">{value.formatDate('EEE')}</div>";
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.adapters.add("html", function(html, target) {
  return "<div style=\"text-align: center; font-weight: bold;\">{value.formatDate('d MMM')}</div><div style=\"text-align: center;\">{value.formatDate('EEE')}</div>";
});
```

Example: [HTML labels on a DateAxis](https://docs.amcharts.com/embeds/v5/html-labels-on-a-dateaxis/). Its code: get_example(path: "examples/docs-demos/html-labels-on-a-dateaxis").

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

TypeScript:

```ts
// Incorrect!
label.set("html", "<img src=\"flag.png\">");

// Correct
label.set("html", "<img src=\"flag.png\" width=\"32\" width=\"32\">");

// Also correct
label.set("html", "<img src=\"flag.png\" style=\"width: 32px; height: 32px\">");
```

JavaScript:

```js
// Incorrect!
label.set("html", "<img src=\"flag.png\">");

// Correct
label.set("html", "<img src=\"flag.png\" width=\"32\" width=\"32\">");

// Also correct
label.set("html", "<img src=\"flag.png\" style=\"width: 32px; height: 32px\">");
```
