---
title: "Basic stock chart"
source: "https://docs.amcharts.com/embeds/v5/basic-stock-chart/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/stock"]
---

A demo from the docs page "Stock chart" (get_doc(path: "charts/stock")).

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

// Define source data
var data = [
  {
    Date: 1636495200000,
    Open: 106.75,
    High: 119.459999,
    Low: 95.199997,
    Close: 100.730003,
    Volume: 103679500
  },
  {
    Date: 1636581600000,
    Open: 114.625,
    High: 125,
    Low: 108.010002,
    Close: 122.989998,
    Volume: 83668200
  },
  {
    Date: 1636668000000,
    Open: 128.645004,
    High: 135.199997,
    Low: 125.25,
    Close: 129.949997,
    Volume: 50437500
  },
  {
    Date: 1636927200000,
    Open: 130.800003,
    High: 152.529999,
    Low: 127.510002,
    Close: 149.360001,
    Volume: 64982300
  },
  {
    Date: 1637013600000,
    Open: 163.800003,
    High: 179.470001,
    Low: 153.779999,
    Close: 172.009995,
    Volume: 94036600
  },
  {
    Date: 1637100000000,
    Open: 160.880005,
    High: 163,
    Low: 140.350006,
    Close: 146.070007,
    Volume: 71765600
  },
  {
    Date: 1637186400000,
    Open: 136.809998,
    High: 138.779999,
    Low: 120.150002,
    Close: 123.379997,
    Volume: 63603600
  },
  {
    Date: 1637272800000,
    Open: 129.979996,
    High: 139.899994,
    Low: 125.599998,
    Close: 128.600006,
    Volume: 49479400
  },
  {
    Date: 1637532000000,
    Open: 123.879997,
    High: 124.93,
    Low: 106.910004,
    Close: 118.110001,
    Volume: 40993900
  },
  {
    Date: 1637618400000,
    Open: 117.830002,
    High: 124,
    Low: 113,
    Close: 119.849998,
    Volume: 24967900
  },
  {
    Date: 1637704800000,
    Open: 119.379997,
    High: 120,
    Low: 113.449997,
    Close: 114.849998,
    Volume: 11539200
  },
  {
    Date: 1637877600000,
    Open: 111,
    High: 114.5,
    Low: 106.139999,
    Close: 112.129997,
    Volume: 9871200
  },
  {
    Date: 1638136800000,
    Open: 115.849998,
    High: 122.25,
    Low: 113.599998,
    Close: 119.769997,
    Volume: 13923900
  },
  {
    Date: 1638223200000,
    Open: 119.900002,
    High: 121.489998,
    Low: 114.099998,
    Close: 119.760002,
    Volume: 20204900
  },
  {
    Date: 1638309600000,
    Open: 120.540001,
    High: 126.75,
    Low: 113.099998,
    Close: 115.690002,
    Volume: 13289700
  },
  {
    Date: 1638396000000,
    Open: 114.169998,
    High: 118.449997,
    Low: 107.75,
    Close: 110.769997,
    Volume: 10835500
  },
  {
    Date: 1638482400000,
    Open: 110.489998,
    High: 111.870003,
    Low: 100,
    Close: 104.669998,
    Volume: 13802500
  },
  {
    Date: 1638741600000,
    Open: 106.360001,
    High: 117.480003,
    Low: 100.32,
    Close: 116.779999,
    Volume: 19725400
  },
  {
    Date: 1638828000000,
    Open: 119.519997,
    High: 120.209999,
    Low: 112.400002,
    Close: 116.18,
    Volume: 12173300
  },
  {
    Date: 1638914400000,
    Open: 116.220001,
    High: 123.400002,
    Low: 112.82,
    Close: 122.120003,
    Volume: 12816000
  },
  {
    Date: 1639000800000,
    Open: 119.949997,
    High: 121.32,
    Low: 114.400002,
    Close: 115.400002,
    Volume: 8474800
  },
  {
    Date: 1639087200000,
    Open: 115.709999,
    High: 118.010002,
    Low: 110.801003,
    Close: 114.660004,
    Volume: 8336800
  },
  {
    Date: 1639346400000,
    Open: 118.139999,
    High: 121.639999,
    Low: 113.949997,
    Close: 118.900002,
    Volume: 14737500
  },
  {
    Date: 1639432800000,
    Open: 114.769997,
    High: 117.900002,
    Low: 112.709999,
    Close: 117.139999,
    Volume: 8057700
  },
  {
    Date: 1639519200000,
    Open: 115.470001,
    High: 116.738998,
    Low: 109.209999,
    Close: 115,
    Volume: 10828600
  },
  {
    Date: 1639605600000,
    Open: 116.760002,
    High: 117,
    Low: 107.059998,
    Close: 108.870003,
    Volume: 13627600
  },
  {
    Date: 1639692000000,
    Open: 99.919998,
    High: 100.599998,
    Low: 92.620003,
    Close: 97.699997,
    Volume: 44454800
  },
  {
    Date: 1639951200000,
    Open: 94.800003,
    High: 96.400002,
    Low: 88.400002,
    Close: 89.980003,
    Volume: 16072700
  },
  {
    Date: 1640037600000,
    Open: 92.190002,
    High: 98.419998,
    Low: 92.050003,
    Close: 96.82,
    Volume: 12915100
  },
  {
    Date: 1640124000000,
    Open: 96.388,
    High: 98.900002,
    Low: 93.391998,
    Close: 96.339996,
    Volume: 8644100
  },
  {
    Date: 1640210400000,
    Open: 96.350998,
    High: 97.821999,
    Low: 93.814003,
    Close: 96.839996,
    Volume: 5670100
  },
  {
    Date: 1640556000000,
    Open: 96.900002,
    High: 107.489998,
    Low: 96.800003,
    Close: 107.089996,
    Volume: 15497000
  },
  {
    Date: 1640642400000,
    Open: 105.040001,
    High: 106,
    Low: 101,
    Close: 102.870003,
    Volume: 8821300
  },
  {
    Date: 1640728800000,
    Open: 101.190002,
    High: 102.580002,
    Low: 96.620003,
    Close: 99.339996,
    Volume: 8754900
  },
  {
    Date: 1640815200000,
    Open: 98.851997,
    High: 105.290001,
    Low: 98.660004,
    Close: 103.419998,
    Volume: 10874700
  },
  {
    Date: 1640901600000,
    Open: 102.440002,
    High: 106.120003,
    Low: 102.279999,
    Close: 103.690002,
    Volume: 5814900
  },
  {
    Date: 1641160800000,
    Open: 106.139999,
    High: 106.550003,
    Low: 100.25,
    Close: 102.720001,
    Volume: 8346800
  },
  {
    Date: 1641247200000,
    Open: 102.989998,
    High: 106.800003,
    Low: 99.014,
    Close: 101.389999,
    Volume: 12152200
  },
  {
    Date: 1641333600000,
    Open: 98.32,
    High: 99.214996,
    Low: 89.279999,
    Close: 90.010002,
    Volume: 18645100
  },
  {
    Date: 1641420000000,
    Open: 91.879997,
    High: 92.029999,
    Low: 75.129997,
    Close: 87.330002,
    Volume: 39827100
  },
  {
    Date: 1641506400000,
    Open: 87.019997,
    High: 89.269997,
    Low: 81.621002,
    Close: 86.279999,
    Volume: 17497700
  },
  {
    Date: 1641765600000,
    Open: 83.519997,
    High: 83.75,
    Low: 77.650002,
    Close: 81.440002,
    Volume: 17289800
  },
  {
    Date: 1641852000000,
    Open: 78.940002,
    High: 86.580002,
    Low: 78.120003,
    Close: 83.550003,
    Volume: 19970600
  },
  {
    Date: 1641938400000,
    Open: 84.900002,
    High: 88.07,
    Low: 82.629997,
    Close: 86.480003,
    Volume: 14422800
  },
  {
    Date: 1642024800000,
    Open: 86.940002,
    High: 86.940002,
    Low: 79.889999,
    Close: 80.309998,
    Volume: 13677500
  },
  {
    Date: 1642111200000,
    Open: 79.57,
    High: 81.690002,
    Low: 77.010002,
    Close: 79.949997,
    Volume: 15792300
  },
  {
    Date: 1642456800000,
    Open: 77.525002,
    High: 77.839996,
    Low: 72.855003,
    Close: 73.160004,
    Volume: 16803700
  },
  {
    Date: 1642543200000,
    Open: 74.82,
    High: 76.32,
    Low: 68.949997,
    Close: 69.400002,
    Volume: 15068400
  },
  {
    Date: 1642629600000,
    Open: 70.858002,
    High: 72.080002,
    Low: 64.809998,
    Close: 65.019997,
    Volume: 18642700
  },
  {
    Date: 1642716000000,
    Open: 63.865002,
    High: 67.160004,
    Low: 60.509998,
    Close: 64.510002,
    Volume: 19323400
  },
  {
    Date: 1642975200000,
    Open: 60.110001,
    High: 64.300003,
    Low: 55.099998,
    Close: 63.900002,
    Volume: 24134800
  },
  { Date: 1643061600000, Open: 61.105, High: 61.93, Low: 58, Close: 59.610001, Volume: 16557200 },
  {
    Date: 1643148000000,
    Open: 62.349998,
    High: 68.07,
    Low: 59.009998,
    Close: 60.27,
    Volume: 23694100
  },
  {
    Date: 1643234400000,
    Open: 61.330002,
    High: 61.700001,
    Low: 53.331001,
    Close: 53.939999,
    Volume: 23385500
  },
  {
    Date: 1643320800000,
    Open: 53.599998,
    High: 57.299999,
    Low: 50,
    Close: 57.119999,
    Volume: 23942400
  }
];

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create a stock chart
// https://docs.amcharts.com/v5/charts/stock/#instantiating-the-chart
var stockChart = root.container.children.push(
  am5stock.StockChart.new(root, {
    paddingLeft: 22
  })
);

// Set global number format
// https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00");

//
//  Main (value) panel
//

// Create a main stock panel (chart)
// https://docs.amcharts.com/v5/charts/stock/panels/#adding-panels
var mainPanel = stockChart.panels.push(
  am5stock.StockPanel.new(root, {
    wheelY: "zoomX",
    panX: true,
    panY: true,
    height: am5.percent(70)
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom"
    }),

    tooltip: am5.Tooltip.new(root, {
      animationDuration: 200
    }),

    numberFormat: "#,###.00",
    extraTooltipPrecision: 2
  })
);

var dateAxis = mainPanel.xAxes.push(
  am5xy.GaplessDateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {
      animationDuration: 200
    })
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(
  am5xy.LineSeries.new(root, {
    name: "STCK",
    valueXField: "Date",
    valueYField: "Close",
    xAxis: dateAxis,
    yAxis: valueAxis,
    legendValueText: "{valueY}"
  })
);

valueSeries.data.setAll(data);

// Set main value series
// https://docs.amcharts.com/v5/charts/stock/#setting-main-series
stockChart.set("stockSeries", valueSeries);

// Add a stock legend
// https://docs.amcharts.com/v5/charts/stock/stock-legend/
var valueLegend = mainPanel.topPlotContainer.children.push(
  am5stock.StockLegend.new(root, {
    stockChart: stockChart
  })
);

valueLegend.data.setAll([valueSeries]);

/**
 * Secondary (volume) panel
 */

// Create a main stock panel (chart)
// https://docs.amcharts.com/v5/charts/stock/panels/#adding-panels
var volumePanel = stockChart.panels.push(
  am5stock.StockPanel.new(root, {
    wheelY: "zoomX",
    panX: true,
    panY: true,
    height: am5.percent(30)
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var volumeValueAxis = volumePanel.yAxes.push(
  am5xy.ValueAxis.new(root, {
    numberFormat: "#.#a",
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom"
    })
  })
);

var volumeAxisRenderer = am5xy.AxisRendererX.new(root, {});
var volumeDateAxis = volumePanel.xAxes.push(
  am5xy.GaplessDateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: volumeAxisRenderer,
    tooltip: am5.Tooltip.new(root, {
      forceHidden: true,
      animationDuration: 200
    })
  })
);

// hide labels
// volumeAxisRenderer.labels.template.set("forceHidden", true);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var volumeSeries = volumePanel.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "STCK",
    valueXField: "Date",
    valueYField: "Volume",
    xAxis: volumeDateAxis,
    yAxis: volumeValueAxis,
    legendValueText: "{valueY.formatNumber('#,###')}"
  })
);

volumeSeries.data.setAll(data);

// Set main value series
// https://docs.amcharts.com/v5/charts/stock/#setting-main-series
stockChart.set("volumeSeries", volumeSeries);

// Add a stock legend
// https://docs.amcharts.com/v5/charts/stock/stock-legend/
var volumeLegend = volumePanel.topPlotContainer.children.push(
  am5stock.StockLegend.new(root, {
    stockChart: stockChart
  })
);

volumeLegend.data.setAll([volumeSeries]);

// Add cursor(s)
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
mainPanel.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    yAxis: valueAxis,
    xAxis: dateAxis,
    snapToSeries: [valueSeries],
    snapToSeriesBy: "y!"
  })
);

var volumeCursor = volumePanel.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    yAxis: volumeValueAxis,
    xAxis: volumeDateAxis,
    snapToSeries: [volumeSeries],
    snapToSeriesBy: "y!"
  })
);

// hide y line on volume panel
volumeCursor.lineY.set("forceHidden", true);

// Add scrollbar
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
var scrollbar = mainPanel.set(
  "scrollbarX",
  am5xy.XYChartScrollbar.new(root, {
    orientation: "horizontal",
    height: 50
  })
);

stockChart.toolsContainer.children.push(scrollbar);

var sbDateAxis = scrollbar.chart.xAxes.push(
  am5xy.GaplessDateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var sbValueAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbSeries = scrollbar.chart.series.push(
  am5xy.LineSeries.new(root, {
    valueYField: "Close",
    valueXField: "Date",
    xAxis: sbDateAxis,
    yAxis: sbValueAxis
  })
);

sbSeries.fills.template.setAll({
  visible: true,
  fillOpacity: 0.3
});

sbSeries.data.setAll(data);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 98vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/stock.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
