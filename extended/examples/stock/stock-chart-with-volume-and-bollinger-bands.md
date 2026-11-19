---
title: "Stock chart with volume panel and Bollinger Bands indicator"
source: "amcharts5-mcp: written for the skill, checked in a browser"
category: "stock"
---

Demonstrates: a `StockChart` with a candlestick panel and a separate volume panel (`CandlestickSeries`, `ColumnSeries`), a `BollingerBands` indicator, `StockLegend`s, and a `StockToolbar` with indicator, drawing, series-type, period-selector and reset controls.

## JavaScript

```javascript
var root = am5.Root.new("chartdiv");
root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

var stockChart = root.container.children.push(
  am5stock.StockChart.new(root, {})
);

// === Main panel ===
var mainPanel = stockChart.panels.push(
  am5stock.StockPanel.new(root, {
    wheelY: "zoomX",
    panX: true,
    panY: true
  })
);

var dateAxis = mainPanel.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "day", count: 1 },
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
  name: "TECH",
  xAxis: dateAxis,
  yAxis: valueAxis,
  valueXField: "Date",
  valueYField: "Close",
  highValueYField: "High",
  lowValueYField: "Low",
  openValueYField: "Open",
  calculateAggregates: true,
  legendValueText: "O:{openValueY} H:{highValueY} L:{lowValueY} C:{valueY}"
}));

stockChart.set("stockSeries", valueSeries);

var legend = mainPanel.plotContainer.children.push(
  am5stock.StockLegend.new(root, { stockChart: stockChart })
);

mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis,
  behavior: "none",
  snapToSeries: [valueSeries]
}));

// Scrollbar
mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
}));

// === Volume panel ===
var volumePanel = stockChart.panels.push(
  am5stock.StockPanel.new(root, {
    wheelY: "zoomX",
    panX: true,
    panY: true,
    height: am5.percent(30)
  })
);

var volDateAxis = volumePanel.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "day", count: 1 },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

var volValueAxis = volumePanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  numberFormat: "#.#a"
}));

var volumeSeries = volumePanel.series.push(am5xy.ColumnSeries.new(root, {
  name: "Volume",
  xAxis: volDateAxis,
  yAxis: volValueAxis,
  valueXField: "Date",
  valueYField: "Volume",
  tooltip: am5.Tooltip.new(root, { labelText: "Vol: {valueY}" })
}));

// Color volume bars by price direction
volumeSeries.columns.template.adapters.add("fill", function(fill, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    var dc = dataItem.dataContext;
    return dc.Close >= dc.Open
      ? am5.color(0x26a69a)
      : am5.color(0xef5350);
  }
  return fill;
});
volumeSeries.columns.template.adapters.add("stroke", function(stroke, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    var dc = dataItem.dataContext;
    return dc.Close >= dc.Open
      ? am5.color(0x26a69a)
      : am5.color(0xef5350);
  }
  return stroke;
});

stockChart.set("volumeSeries", volumeSeries);

var volLegend = volumePanel.plotContainer.children.push(
  am5stock.StockLegend.new(root, { stockChart: stockChart })
);

// === Toolbar ===
am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.IndicatorControl.new(root, { stockChart: stockChart }),
    am5stock.DrawingControl.new(root, { stockChart: stockChart }),
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      periods: [
        { timeUnit: "month", count: 1, name: "1M" },
        { timeUnit: "month", count: 3, name: "3M" },
        { timeUnit: "year", count: 1, name: "1Y" },
        { timeUnit: "max", name: "Max" }
      ]
    }),
    am5stock.SeriesTypeControl.new(root, { stockChart: stockChart }),
    am5stock.ResetControl.new(root, { stockChart: stockChart })
  ]
});

// Generate sample data
var data = [];
var open = 280;
var date = new Date(2023, 6, 3);
for (var i = 0; i < 200; i++) {
  if (date.getDay() === 0) date.setDate(date.getDate() + 1);
  if (date.getDay() === 6) date.setDate(date.getDate() + 2);
  var change = (Math.random() - 0.47) * 6;
  var high = open + Math.random() * 4 + 1;
  var low = open - Math.random() * 4 - 1;
  var close = Math.max(low, Math.min(high, open + change));
  data.push({
    Date: date.getTime(),
    Open: Math.round(open * 100) / 100,
    High: Math.round(high * 100) / 100,
    Low: Math.round(low * 100) / 100,
    Close: Math.round(close * 100) / 100,
    Volume: Math.round(500000 + Math.random() * 2000000)
  });
  open = close;
  date = new Date(date);
  date.setDate(date.getDate() + 1);
}

// Set data LAST
valueSeries.data.setAll(data);
volumeSeries.data.setAll(data);

// Add Bollinger Bands indicator programmatically
stockChart.indicators.push(am5stock.BollingerBands.new(root, {
  stockChart: stockChart,
  stockSeries: valueSeries,
  legend: legend
}));

stockChart.appear(1000, 100);
```

## HTML

```html
<div id="chartcontrols"></div>
<div id="chartdiv"></div>
```

## CSS

```css
body { font-family: -apple-system, sans-serif; margin: 0; padding: 20px; }
#chartcontrols { height: auto; padding: 5px 0; }
#chartdiv { width: 100%; height: 600px; }
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/stock.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
