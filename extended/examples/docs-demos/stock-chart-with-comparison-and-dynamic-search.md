---
title: "Stock chart with comparison and dynamic search"
source: "https://docs.amcharts.com/embeds/v5/stock-chart-with-comparison-and-dynamic-search/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/stock/toolbar/comparison-control"]
---

A demo from the docs page "Comparison control" (get_doc(path: "charts/stock/toolbar/comparison-control")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create a stock chart
// https://docs.amcharts.com/v5/charts/stock/#instantiating-the-chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {}));

// Set global number format
// https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00");

//
// Main (value) panel
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

    tooltip: am5.Tooltip.new(root, {}),
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

    groupData: true,
    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(
  am5xy.CandlestickSeries.new(root, {
    name: "MSFT",
    valueXField: "Date",
    valueYField: "Close",
    highValueYField: "High",
    lowValueYField: "Low",
    openValueYField: "Open",
    calculateAggregates: true,
    xAxis: dateAxis,
    yAxis: valueAxis,
    legendValueText: "{valueY}"
  })
);

// Set main value series
// https://docs.amcharts.com/v5/charts/stock/#setting-main-series
stockChart.set("stockSeries", valueSeries);

// Add a stock legend
// https://docs.amcharts.com/v5/charts/stock/stock-legend/
var valueLegend = mainPanel.plotContainer.children.push(
  am5stock.StockLegend.new(root, {
    stockChart: stockChart
  })
);

valueLegend.data.setAll([valueSeries]);

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

// Function that dynamically loads data
function loadData(ticker, series) {
  // Load external data
  // https://docs.amcharts.com/v5/charts/xy-chart/series/#setting-data
  am5.net
    .load("https://www.amcharts.com/wp-content/uploads/assets/docs/stock/" + ticker + ".csv")
    .then(function (result) {
      // Parse loaded data
      var data = am5.CSVParser.parse(result.response, {
        delimiter: ",",
        skipEmpty: true,
        useColumnNames: true
      });

      // Process data (convert dates and values)
      var processor = am5.DataProcessor.new(root, {
        dateFields: ["Date"],
        dateFormat: "yyyy-MM-dd",
        numericFields: ["Open", "High", "Low", "Close", "Adj Close", "Volume"]
      });

      processor.processMany(data);

      // Set data
      am5.array.each(series, function (item) {
        item.data.setAll(data);
      });
    });
}

// Load initial data for the first series
loadData("MSFT", [valueSeries, sbSeries]);

// Add comparison control
var comparisonControl = am5stock.ComparisonControl.new(root, {
  stockChart: stockChart,
  searchable: true,
  searchCallback: function (query) {
    return getTicker(query);
  }
});

comparisonControl.events.on("selected", function (ev) {
  var item = ev.item;
  var series = am5xy.LineSeries.new(root, {
    name: item.subLabel,
    valueYField: "Close",
    calculateAggregates: true,
    valueXField: "Date",
    xAxis: dateAxis,
    yAxis: valueAxis,
    legendValueText: "{valueY.formatNumber('#.00')}"
  });

  var comparingSeries = stockChart.addComparingSeries(series);
  loadData(item.subLabel, [comparingSeries]);
});

// Add toolbar
// https://docs.amcharts.com/v5/charts/stock/toolbar/
const toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    comparisonControl,
    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    }),

    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  ]
});

function getTicker(search) {
  search = search.toLowerCase();
  var tickers = [
    { label: "Apple", subLabel: "AAPL", id: "AAPL" },
    { label: "Saudi Aramco", subLabel: "2222.SR", id: "2222.SR" },
    { label: "Microsoft", subLabel: "MSFT", id: "MSFT" },
    { label: "Alphabet (Google)", subLabel: "GOOG", id: "GOOG" },
    { label: "Amazon", subLabel: "AMZN", id: "AMZN" },
    { label: "Tesla", subLabel: "TSLA", id: "TSLA" },
    { label: "Berkshire Hathaway ", subLabel: "BRK-A", id: "BRK-A" },
    { label: "NVIDIA", subLabel: "NVDA", id: "NVDA" },
    { label: "Tencent", subLabel: "TCEHY", id: "TCEHY" },
    { label: "Meta (Facebook)", subLabel: "FB", id: "FB" },
    { label: "TSMC", subLabel: "TSM", id: "TSM" },
    { label: "UnitedHealth", subLabel: "UNH", id: "UNH" },
    { label: "Johnson &amp; Johnson", subLabel: "JNJ", id: "JNJ" },
    { label: "Visa", subLabel: "V", id: "V" },
    { label: "JPMorgan Chase", subLabel: "JPM", id: "JPM" },
    { label: "Walmart", subLabel: "WMT", id: "WMT" },
    { label: "Samsung", subLabel: "005930.KS", id: "005930.KS" },
    { label: "Kweichow Moutai", subLabel: "600519.SS", id: "600519.SS" },
    { label: "Procter &amp; Gamble", subLabel: "PG", id: "PG" },
    { label: "Exxon Mobil", subLabel: "XOM", id: "XOM" },
    { label: "LVMH", subLabel: "LVMUY", id: "LVMUY" },
    { label: "Home Depot", subLabel: "HD", id: "HD" },
    { label: "Bank of America ", subLabel: "BAC", id: "BAC" },
    { label: "Alibaba", subLabel: "BABA", id: "BABA" },
    { label: "Nestlé", subLabel: "NSRGY", id: "NSRGY" },
    { label: "Mastercard", subLabel: "MA", id: "MA" },
    { label: "Chevron", subLabel: "CVX", id: "CVX" },
    { label: "Roche", subLabel: "RHHBY", id: "RHHBY" },
    { label: "Pfizer", subLabel: "PFE", id: "PFE" },
    { label: "AbbVie", subLabel: "ABBV", id: "ABBV" },
    { label: "Eli Lilly", subLabel: "LLY", id: "LLY" },
    { label: "ASML", subLabel: "ASML", id: "ASML" },
    { label: "BHP Group", subLabel: "BHP", id: "BHP" },
    { label: "Coca-Cola", subLabel: "KO", id: "KO" },
    { label: "ICBC", subLabel: "1398.HK", id: "1398.HK" },
    { label: "Walt Disney", subLabel: "DIS", id: "DIS" },
    { label: "Broadcom", subLabel: "AVGO", id: "AVGO" },
    { label: "Novo Nordisk", subLabel: "NVO", id: "NVO" },
    { label: "Costco", subLabel: "COST", id: "COST" },
    { label: "Toyota", subLabel: "TM", id: "TM" },
    { label: "Cisco", subLabel: "CSCO", id: "CSCO" },
    { label: "Reliance Industries", subLabel: "RELIANCE.NS", id: "RELIANCE.NS" },
    { label: "Verizon", subLabel: "VZ", id: "VZ" },
    { label: "Pepsico", subLabel: "PEP", id: "PEP" },
    { label: "Thermo Fisher Scientific", subLabel: "TMO", id: "TMO" },
    { label: "Prosus", subLabel: "PRX.AS", id: "PRX.AS" },
    { label: "Oracle", subLabel: "ORCL", id: "ORCL" },
    { label: "L'Oréal", subLabel: "OR.PA", id: "OR.PA" },
    { label: "Abbott Laboratories", subLabel: "ABT", id: "ABT" },
    { label: "Comcast", subLabel: "CMCSA", id: "CMCSA" },
    { label: "Adobe", subLabel: "ADBE", id: "ADBE" },
    { label: "CM Bank", subLabel: "3968.HK", id: "3968.HK" },
    { label: "Accenture", subLabel: "ACN", id: "ACN" },
    { label: "Salesforce", subLabel: "CRM", id: "CRM" },
    { label: "CATL", subLabel: "300750.SZ", id: "300750.SZ" },
    { label: "Nike", subLabel: "NKE", id: "NKE" },
    { label: "Danaher", subLabel: "DHR", id: "DHR" },
    { label: "Merck", subLabel: "MRK", id: "MRK" },
    { label: "Wells Fargo", subLabel: "WFC", id: "WFC" },
    { label: "Intel", subLabel: "INTC", id: "INTC" },
    { label: "Shell", subLabel: "RYDAF", id: "RYDAF" },
    { label: "Astrazeneca", subLabel: "AZN", id: "AZN" },
    { label: "Novartis", subLabel: "NVS", id: "NVS" },
    { label: "AMD", subLabel: "AMD", id: "AMD" },
    { label: "China Construction Bank", subLabel: "CICHY", id: "CICHY" },
    { label: "United Parcel Service", subLabel: "UPS", id: "UPS" },
    { label: "QUALCOMM", subLabel: "QCOM", id: "QCOM" },
    { label: "Tata Consultancy Services", subLabel: "TCS.NS", id: "TCS.NS" },
    { label: "McDonald", subLabel: "MCD", id: "MCD" },
    { label: "Union Pacific Corporation", subLabel: "UNP", id: "UNP" },
    { label: "Agricultural Bank of China", subLabel: "ACGBY", id: "ACGBY" },
    { label: "Meituan", subLabel: "MPNGF", id: "MPNGF" },
    { label: "AT&amp;T", subLabel: "T", id: "T" },
    { label: "Morgan Stanley", subLabel: "MS", id: "MS" },
    { label: "Texas Instruments", subLabel: "TXN", id: "TXN" },
    { label: "Charles Schwab", subLabel: "SCHW", id: "SCHW" },
    { label: "Nextera Energy", subLabel: "NEE", id: "NEE" },
    { label: "T-Mobile US", subLabel: "TMUS", id: "TMUS" },
    { label: "PetroChina", subLabel: "PTR", id: "PTR" },
    { label: "Netflix", subLabel: "NFLX", id: "NFLX" },
    { label: "Royal Bank Of Canada", subLabel: "RY", id: "RY" },
    { label: "Lowe's Companies", subLabel: "LOW", id: "LOW" },
    { label: "Linde", subLabel: "LIN", id: "LIN" },
    { label: "Ping An Insurance", subLabel: "PNGAY", id: "PNGAY" },
    { label: "Bristol-Myers Squibb", subLabel: "BMY", id: "BMY" },
    { label: "China Mobile", subLabel: "0941.HK", id: "0941.HK" },
    { label: "Bank of China", subLabel: "BACHF", id: "BACHF" },
    { label: "Philip Morris", subLabel: "PM", id: "PM" },
    { label: "Toronto Dominion Bank", subLabel: "TD", id: "TD" },
    { label: "Medtronic", subLabel: "MDT", id: "MDT" },
    { label: "Raytheon Technologies", subLabel: "RTX", id: "RTX" },
    { label: "CVS Health", subLabel: "CVS", id: "CVS" },
    { label: "S&amp;P Global", subLabel: "SPGI", id: "SPGI" },
    { label: "American Express", subLabel: "AXP", id: "AXP" },
    { label: "Hermès", subLabel: "HESAF", id: "HESAF" },
    { label: "SAP", subLabel: "SAP", id: "SAP" },
    { label: "HSBC", subLabel: "HSBC", id: "HSBC" },
    { label: "TotalEnergies", subLabel: "TTE", id: "TTE" },
    { label: "Honeywell", subLabel: "HON", id: "HON" },
    { label: "Commonwealth Bank", subLabel: "CBA.AX", id: "CBA.AX" }
  ];

  return tickers.filter(function (item) {
    return item.label.toLowerCase().match(search) || item.subLabel.toLowerCase().match(search);
  });
}

function generateData() {
  var newdata = [];
  for (var i = 0; i < data.length; i++) {
    const row = {
      Date: data[i].Date,
      Close: data[i].Close + data[i].Close * (0.5 - Math.random())
    };

    newdata.push(row);
  }
  return newdata;
}
```

## HTML

```html
<div id="chartcontrols"></div>
<div id="chartdiv"></div>
```

## CSS

```css
#chartcontrols {
  height: auto;
  padding: 5px 45px 0 15px;
}

#chartdiv {
  width: 100%;
  height: 85vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/stock.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
