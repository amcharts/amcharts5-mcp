---
title: "Scrollbars"
source: "https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/"
scraped: "2026-10-08"
---

Scrollbars are useful controls that allow zooming chart's axis.

## Adding scrollbars

We create a scrollbar like everything else in amCharts 5: by calling `new()` [method](https://www.amcharts.com/docs/v5/getting-started/#New_element_syntax) of its class - `Scrollbar`.

Please note that scrollbar requires at least one setting to be present during instantiation: `orientation`.

Newly created Scrollbar object needs to be set on chart's `scrollbarX` setting (if we are adding a horizontal scrollbar), or `scrollbarY` (for vertical scrolling).

chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical" }));

chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical" }));

Horizontal scrollbar will zoom/pan all horizontal axes, whereas vertical one will affect all vertical axes.

### Scrollbar elements

Scrollbar has three properties to access its three elements: `startGrip`, `endGrip`, and `thumb`.

The first two are elements of type `[Button](https://www.amcharts.com/docs/v5/reference/button/)`, whereas `thumb` is a `[RoundedRectangle](https://www.amcharts.com/docs/v5/reference/roundedrectangle/)`.

All three are fully customizable as we can override their default settings with our own.

let scrollbarX = chart.get("scrollbarX");

scrollbarX.thumb.setAll({
  fill: am5.color(0x550000),
  fillOpacity: 0.1
});

scrollbarX.startGrip.setAll({
  visible: false
});

scrollbarX.endGrip.setAll({
  visible: false
});

let scrollbarX = chart.get("scrollbarX");

scrollbarX.thumb.setAll({
  fill: am5.color(0x550000),
  fillOpacity: 0.1
});

scrollbarX.startGrip.setAll({
  visible: false
});

scrollbarX.endGrip.setAll({
  visible: false
});

The above will make thumb semi-transparent red, while disabling both grips.

### Scrollbar background

When created, scrollbar will have its setting `background` set to an element of type `RoundedRectangle`.

We can modify any of its [settings](https://www.amcharts.com/docs/v5/reference/roundedrectangle/#Settings) to configure scrollbar's background.

let scrollbarX = chart.get("scrollbarX");

scrollbarX.get("background").setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.2,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusTL: 0,
  cornerRadiusBL: 0
});

var scrollbarX = chart.get("scrollbarX");

scrollbarX.get("background").setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.2,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusTL: 0,
  cornerRadiusBL: 0
});

## Sizing scrollbar

### Width or height

To set scrollbar's height (or width for the vertical scrollbar) we can use its `height` (or `width`) setting.

let scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
});

var scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
});

There's a caveat, though. By default, each scrollbar has its `minHeight` (or `minWidth`) set to `12`. If we need our scrollbar smaller than that, we'll need to use `minHeight` (or `minWidth`) instead:

let scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  minHeight: 3
});

var scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  minHeight: 3
});

### Size of the grips

The easiest way to size scrollbar grips is to use their `scale` setting:

scrollbarX.startGrip.set("scale", 0.7);
scrollbarX.endGrip.set("scale", 0.7);

scrollbarX.startGrip.set("scale", 0.7);
scrollbarX.endGrip.set("scale", 0.7);


## Scrollbar with chart preview

The scrollbar with chart preview acts like a regular one, except it can also display actual XY series in it.

To create a scrollbar like that, we need to use a class `XYChartScrollbar` instead of `Scrollbar`. We will also want to set its `height` setting to something bigger than default to accommodate chart preview in it.

let scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
});

chart.set("scrollbarX", scrollbarX);

var scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
});

chart.set("scrollbarX", scrollbarX);

That creates a scrollbar with a standalone instance of an XY chart in it, accessible via scrollbar's `[chart](https://www.amcharts.com/docs/v5/reference/xychartscrollbar/#chart_property)` property.

It's full on `XYChart` instance, which means that we'll need to configure it like any other XY chart:

-   Add axes.
-   Add series and their data.

var sbxAxis = scrollbarX.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: \[{ timeUnit: "year", count: 1 }\],
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      opposite: false,
      strokeOpacity: 0
    })
  })
);

var sbyAxis = scrollbarX.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbseries = scrollbarX.chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: sbxAxis,
    yAxis: sbyAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
sbseries.data.setAll(data);

let sbxAxis = scrollbarX.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: \[{ timeUnit: "year", count: 1 }\],
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      opposite: false,
      strokeOpacity: 0
    })
  })
);

let sbyAxis = scrollbarX.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

let sbseries = scrollbarX.chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: sbxAxis,
    yAxis: sbyAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
sbseries.data.setAll(data);

The nice thing about this approach is that we can configure the output down to last bit, including [dynamic data point grouping](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Dynamic_data_item_grouping) of the preview series, to control its granularity.


## Repositioning scrollbars

Normally, vertical scrollbar will be placed on chart's right, while horizontal one will be positioned on the top.

### Opposite side

To move a scrollbar to the other side of the chart, set its `opposite` setting to `true`. A horizontal scrollbar will go below the plot, and a vertical one to the left of it:

chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical",
  opposite: true
}));

chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical",
  opposite: true
}));

### Inside or outside the axes

If there are axes on the same side as the scrollbar, `outsideAxes` sets where the scrollbar goes relative to them:

-   `true` - beyond the axes, at the outer edge of the chart.
-   `false` - between the axes and the plot area.

If not set, the chart picks the position itself.

chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true,
  outsideAxes: true
}));

chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true,
  outsideAxes: true
}));

The above puts the horizontal scrollbar at the very bottom of the chart, below the X axis labels.

Both `opposite` and `outsideAxes` can be changed at any time, and the scrollbar will move. They also work in [JSON configs](https://www.amcharts.com/docs/v5/concepts/serializing/).

NOTE`opposite` is available since version 5.20.2, and `outsideAxes` since 5.21.0.

### Other containers

When you assign a `Scrollbar` instance to chart's `scrollbarY` setting, it is automatically assigned as a child of chart's `rightAxesContainer` (or `leftAxesContainer` if `opposite` is set), whereas assigning it to `scrollbarX` will put it into `topAxesContainer` (or `bottomAxesContainer`).

Read more about build in XY chart containers in "[Containers of an XY chart](https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/)" tutorial.

For a placement the settings above don't cover, we can move the scrollbar to some other container ourselves. `opposite` and `outsideAxes` do not apply to a scrollbar moved this way.

let scrollbarX = am5.Scrollbar.new(root, {
  orientation: "horizontal"
});

chart.set("scrollbarX", scrollbarX);
chart.plotContainer.children.push(scrollbarX);

var scrollbarX = am5.Scrollbar.new(root, {
  orientation: "horizontal"
});

chart.set("scrollbarX", scrollbarX);
chart.plotContainer.children.push(scrollbarX);


## Related tutorials

-   [Start/end labels on scrollbar grips](https://www.amcharts.com/docs/v5/tutorials/start-end-labels-on-scrollbar-grips/)
-   [Start/end labels on a scrollbar](https://www.amcharts.com/docs/v5/tutorials/adding-start-and-end-labels-to-a-scrollbar/)
-   [Containers of an XY chart](https://www.amcharts.com/docs/v5/tutorials/xy-chart-containers/)
