---
title: "Maps and Charts Dashboard"
source: "https://www.amcharts.com/demos/maps-and-charts-dashboard/"
category: "dashboards"
scraped: "2026-03-15"
---

## JavaScript

```javascript
var mainColor = am5.color(0xc83830);
var secondaryColor = am5.color(0xd9cec8);

makeMapChart();
makeColumnChart();
makePieChart();
makeRadarGauge();
makeLineSeriesChart();

function makeLineSeriesChart() {
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("linediv");

  var myTheme = am5.Theme.new(root);

  myTheme.rule("Label").setAll({
    fontSize: "0.8em"
  });

  root.setThemes([am5themes_Animated.new(root), myTheme]);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      paddingLeft: 0,
      layout: root.verticalLayout
    })
  );

  var data = [
    {
      year: "2021",
      income: 18.5,
      expenses: 12.1
    },
    {
      year: "2022",
      income: 22.2,
      expenses: 30.5
    },
    {
      year: "2023",
      income: 39.1,
      expenses: 34.9
    },
    {
      year: "2024",
      income: 45.5,
      expenses: 31.1
    },
    {
      year: "2025",
      income: 30.6,
      expenses: 22.2,
      strokeSettings: {
        strokeWidth: 3,
        strokeDasharray: [5, 5]
      }
    },
    {
      year: "2026",
      income: 34.1,
      expenses: 32.9,
      info: "(projection)"
    }
  ];

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xRenderer = am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true,
    minGridDistance: 60
  });
  var xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "year",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    })
  );
  xRenderer.grid.template.setAll({
    location: 1
  })

  xAxis.data.setAll(data);

  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      min: 0,
      extraMax: 0.1,
      renderer: am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1
      })
    })
  );


  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

  var series1 = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: "Income",
      xAxis: xAxis,
      yAxis: yAxis,
      stroke: secondaryColor,
      fill: secondaryColor,
      valueYField: "income",
      categoryXField: "year",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{name}: {valueY} {info}"
      })
    })
  );

  series1.data.setAll(data);

  series1.strokes.template.setAll({
    strokeWidth: 3,
    templateField: "strokeSettings"
  });

  var series2 = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: "Expenses",
      xAxis: xAxis,
      yAxis: yAxis,
      stroke: mainColor,
      fill: mainColor,
      valueYField: "expenses",
      categoryXField: "year",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{name}: {valueY} {info}"
      })
    })
  );

  series2.strokes.template.setAll({
    strokeWidth: 3,
    templateField: "strokeSettings"
  });


  series2.data.setAll(data);

  chart.set("cursor", am5xy.XYCursor.new(root, {}));

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  chart.appear(1000, 100);
  series1.appear(1000, 500);
  series2.appear(1000, 1500);

}


function makeRadarGauge() {

  var continents = ["europe", "asia", "northAmerica", "southAmerica", "oceania", "africa"];
  var continentNames = { europe: "Europe", asia: "Asia", northAmerica: "North America", southAmerica: "South America", oceania: "Oceania", africa: "Africa" };

  var root = am5.Root.new("gaugediv");

  var myTheme = am5.Theme.new(root);
  myTheme.rule("Label").setAll({
    fontSize: "0.8em"
  });

  root.setThemes([
    am5themes_Animated.new(root), myTheme
  ]);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/radar-chart/
  var radarGauge = root.container.children.push(am5radar.RadarChart.new(root, {
    radius: am5.percent(90),
    panX: false,
    panY: false,
    wheelX: "none",
    wheelY: "none",
    innerRadius: am5.percent(20),
    startAngle: -90,
    endAngle: 180
  }));

  radarGauge.states.create("hidden", {
    width: 1,
    opacity: 0,
    visible: false
  })

  // Data
  var data = [];

  am5.array.each(continents, function (id) {
    data.push({
      category: continentNames[id],
      value: Math.round(Math.random() * 70) + 20,
      full: 100,
      id: id
    })
  })


  // Create axes and their renderers
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
  var xRenderer = am5radar.AxisRendererCircular.new(root, {
    minGridDistance: 30
  });

  xRenderer.labels.template.setAll({
    radius: 10
  });

  xRenderer.grid.template.setAll({
    forceHidden: true
  });

  var xAxis = radarGauge.xAxes.push(am5xy.ValueAxis.new(root, {
    renderer: xRenderer,
    min: 0,
    max: 100,
    strictMinMax: true,
    numberFormat: "#'%'"
  }));

  //xRenderer.labels.template.set("forceHidden", true)


  var yRenderer = am5radar.AxisRendererRadial.new(root, {
    minGridDistance: 20
  });

  yRenderer.labels.template.setAll({
    forceHidden: true
  });

  yRenderer.grid.template.setAll({
    forceHidden: true
  });

  var yAxis = radarGauge.yAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: yRenderer
  }));

  yAxis.data.setAll(data);

  // Create series
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
  var series1 = radarGauge.series.push(am5radar.RadarColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    clustered: false,
    valueXField: "full",
    categoryYField: "category",
    fill: root.interfaceColors.get("alternativeBackground")
  }));

  series1.columns.template.setAll({
    width: am5.p100,
    fillOpacity: 0.1,
    strokeOpacity: 0,
    cornerRadius: 20
  });

  series1.data.setAll(data);

  var gaugeSeries = radarGauge.series.push(am5radar.RadarColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    clustered: false,
    valueXField: "value",
    fill: mainColor,
    stroke: mainColor,
    categoryYField: "category"
  }));

  gaugeSeries.columns.template.setAll({
    width: am5.p100,
    strokeOpacity: 0,
    cornerRadius: 20,
    cursorOverStyle: "pointer",
    tooltipText: "{category}: {valueX}"
  });

  gaugeSeries.columns.template.states.create("dimm", {
    opacity: 0.4
  })

  gaugeSeries.data.setAll(data);

  // Animate chart and series in
  // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
  gaugeSeries.appear(2000);
}



function makePieChart() {

  var root = am5.Root.new("piediv");

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  var startAngle = Math.random() * 360;
  var chart = root.container.children.push(am5percent.PieChart.new(root, {
    innerRadius: am5.percent(70),
    radius: am5.percent(90)    
  }));
 

  // Create series
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  var series = chart.series.push(am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    startAngle: startAngle,
    endAngle: startAngle + 360
  }));

  series.ticks.template.setAll({
    forceHidden: true
  })

  series.slices.template.setAll({
    templateField: "settings",
    cornerRadius: 10,
    strokeOpacity: 0,
    tooltipText: undefined,
    interactive: false
  });

  series.labels.template.setAll({
    forceHidden: true
  });

  var value1 = Math.random();
  var value2 = Math.random();

  value2 = Math.max(Math.min(value1 * 4, value2), value1 / 4)

  // Set data
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
  series.data.setAll([
    { value: value1, category: "One", settings: { fill: mainColor } },
    { value: value2, category: "Two", settings: { fill: am5.color(0x000000), fillOpacity: 0.1 } }
  ]);


  // Play initial series animation
  // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
  series.appear(2000);

  var label = chart.seriesContainer.children.push(am5.Label.new(root, {
    text: "My Title",
    fontSize: 12,
    centerX: am5.p50,
    centerY: am5.p50
  }))
}


function makeColumnChart() {
  var root = am5.Root.new("columndiv");

  const myTheme = am5.Theme.new(root);

  myTheme.rule("InterfaceColors").setAll({
    primaryButton: am5.color(0xc83830),
    primaryButtonHover: am5.Color.lighten(am5.color(0xc83830), 0.2),
    primaryButtonDown: am5.Color.lighten(am5.color(0xc83830), -0.2),
    primaryButtonActive: am5.color(0xd9cec8),
  });

  myTheme.rule("Label").setAll({
    fontSize: "0.8em"
  });

  myTheme.rule("AxisLabel", ["minor"]).setAll({
    dy: 1
  });

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root),
    myTheme
  ]);


  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    paddingLeft: 0
  }));


  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "zoomX"
  }));
  cursor.lineY.set("visible", false);

  var date = new Date();
  date.setHours(0, 0, 0, 0);
  var value = 100;

  function generateData() {
    value = Math.round((Math.random() * 10 - 5) + value);
    am5.time.add(date, "day", 1);
    return {
      date: date.getTime(),
      value: value
    };
  }

  function generateDatas(count) {
    var data = [];
    for (var i = 0; i < count; ++i) {
      data.push(generateData());
    }
    return data;
  }


  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    maxDeviation: 0,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
      minorLabelsEnabled: true
    }),
    tooltip: am5.Tooltip.new(root, {})
  }));

  xAxis.set("minorDateFormats", {
    "day": "dd",
    "month": "MM"
  });


  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));


  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    fill: mainColor,
    stroke: mainColor,
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  }));

  series.columns.template.setAll({
    strokeOpacity: 0,
    cornerRadiusTL: 10,
    cornerRadiusTR: 10,
    width: am5.percent(40)
  })


  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  var scrollbar = chart.set("scrollbarX", am5.Scrollbar.new(root, {
    orientation: "horizontal"
  }));

  chart.bottomAxesContainer.children.push(scrollbar);


  var data = generateDatas(30);
  series.data.setAll(data);


  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);

  xAxis.set("start", 0.5);
}



function makeMapChart() {

  var data = [
    {
      "id": "CN",
      "initial": 34,
      "adjusted": 125
    },
    {
      "id": "AT",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "BE",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "BG",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "HR",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "CY",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "CZ",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "DK",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "EE",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "FI",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "FR",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "DE",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "GR",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "HU",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "IE",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "IT",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "LV",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "LT",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "LU",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "MT",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "NL",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "PL",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "PT",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "RO",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "SK",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "SI",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "ES",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "SE",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "VN",
      "initial": 46,
      "adjusted": 10
    },
    {
      "id": "TW",
      "initial": 32,
      "adjusted": 10
    },
    {
      "id": "JP",
      "initial": 24,
      "adjusted": 10
    },
    {
      "id": "IN",
      "initial": 26,
      "adjusted": 10
    },
    {
      "id": "TH",
      "initial": 36,
      "adjusted": 10
    },
    {
      "id": "CH",
      "initial": 31,
      "adjusted": 10
    },
    {
      "id": "ID",
      "initial": 32,
      "adjusted": 10
    },
    {
      "id": "MY",
      "initial": 24,
      "adjusted": 10
    },
    {
      "id": "KH",
      "initial": 49,
      "adjusted": 10
    },
    {
      "id": "GB",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "ZA",
      "initial": 30,
      "adjusted": 10
    },
    {
      "id": "BR",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BD",
      "initial": 37,
      "adjusted": 10
    },
    {
      "id": "SG",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "IL",
      "initial": 17,
      "adjusted": 10
    },
    {
      "id": "PH",
      "initial": 17,
      "adjusted": 10
    },
    {
      "id": "CL",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AU",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "PK",
      "initial": 29,
      "adjusted": 10
    },
    {
      "id": "TR",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "LK",
      "initial": 44,
      "adjusted": 10
    },
    {
      "id": "CO",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "PE",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "NI",
      "initial": 18,
      "adjusted": 10
    },
    {
      "id": "NO",
      "initial": 15,
      "adjusted": 10
    },
    {
      "id": "CR",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "JO",
      "initial": 20,
      "adjusted": 10
    },
    {
      "id": "DO",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AE",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "NZ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AR",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "EC",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "GT",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "HN",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MG",
      "initial": 47,
      "adjusted": 10
    },
    {
      "id": "MM",
      "initial": 44,
      "adjusted": 10
    },
    {
      "id": "TN",
      "initial": 28,
      "adjusted": 10
    },
    {
      "id": "KZ",
      "initial": 27,
      "adjusted": 10
    },
    {
      "id": "RS",
      "initial": 37,
      "adjusted": 10
    },
    {
      "id": "EG",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SA",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SV",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BW",
      "initial": 37,
      "adjusted": 10
    },
    {
      "id": "TT",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MA",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "DZ",
      "initial": 30,
      "adjusted": 10
    },
    {
      "id": "OM",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "UY",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BS",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "LS",
      "initial": 50,
      "adjusted": 10
    },
    {
      "id": "UA",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BH",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "QA",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MU",
      "initial": 40,
      "adjusted": 10
    },
    {
      "id": "FJ",
      "initial": 32,
      "adjusted": 10
    },
    {
      "id": "IS",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "KE",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "LI",
      "initial": 37,
      "adjusted": 10
    },
    {
      "id": "GY",
      "initial": 38,
      "adjusted": 10
    },
    {
      "id": "HT",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BA",
      "initial": 35,
      "adjusted": 10
    },
    {
      "id": "NG",
      "initial": 14,
      "adjusted": 10
    },
    {
      "id": "NA",
      "initial": 21,
      "adjusted": 10
    },
    {
      "id": "BO",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "PA",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "VE",
      "initial": 15,
      "adjusted": 10
    },
    {
      "id": "MK",
      "initial": 33,
      "adjusted": 10
    },
    {
      "id": "ET",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "GH",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MD",
      "initial": 31,
      "adjusted": 10
    },
    {
      "id": "AO",
      "initial": 32,
      "adjusted": 10
    },
    {
      "id": "JM",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MZ",
      "initial": 16,
      "adjusted": 10
    },
    {
      "id": "PY",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "ZM",
      "initial": 17,
      "adjusted": 10
    },
    {
      "id": "LB",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "CD",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BF",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BF",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "CI",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "TZ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "IQ",
      "initial": 39,
      "adjusted": 10
    },
    {
      "id": "GE",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SN",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AZ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "CM",
      "initial": 11,
      "adjusted": 10
    },
    {
      "id": "UG",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AL",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AM",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "NP",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "GA",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "KW",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "TG",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SR",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BZ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "PG",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MW",
      "initial": 17,
      "adjusted": 10
    },
    {
      "id": "LR",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "VG",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AF",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "ZW",
      "initial": 18,
      "adjusted": 10
    },
    {
      "id": "BJ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BB",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MC",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "UZ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "CG",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "DJ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "PF",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "KY",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "CW",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "VU",
      "initial": 22,
      "adjusted": 10
    },
    {
      "id": "RW",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SL",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MN",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SM",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AG",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BM",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SZ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MH",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "PM",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "KN",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "TM",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "GD",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SD",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "TC",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AW",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "ME",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "KG",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "YE",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "VC",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "NE",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "LC",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "NR",
      "initial": 30,
      "adjusted": 10
    },
    {
      "id": "GQ",
      "initial": 13,
      "adjusted": 10
    },
    {
      "id": "LY",
      "initial": 31,
      "adjusted": 10
    },
    {
      "id": "WS",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "GN",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "TL",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MS",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "TD",
      "initial": 13,
      "adjusted": 10
    },
    {
      "id": "ML",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MV",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "TJ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "CV",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BI",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "GP",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "BT",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MQ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "TO",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "MR",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "DM",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "GM",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "GF",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "CX",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AD",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "CF",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SB",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "YT",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "AI",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "CC",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "ER",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "CK",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SS",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "KM",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "KI",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "NF",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "GI",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "TV",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "IO",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "TK",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "GW",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "SJ",
      "initial": 10,
      "adjusted": 10
    },
    {
      "id": "RE",
      "initial": 10,
      "adjusted": 10
    }
  ]


  var root = am5.Root.new("mapdiv");

  var myTheme = am5.Theme.new(root);

  myTheme.rule("InterfaceColors").setAll({
    primaryButton: am5.color(0xc83830),
    primaryButtonHover: am5.Color.lighten(am5.color(0xc83830), 0.2),
    primaryButtonDown: am5.Color.lighten(am5.color(0xc83830), -0.2),
    primaryButtonActive: am5.color(0xd9cec8),
  });


  myTheme.rule("Label").setAll({
    fontSize: "0.8em"
  });

  root.setThemes([am5themes_Animated.new(root), myTheme]);
  
  var chart = root.container.children.push(am5map.MapChart.new(root, {
    projection: am5map.geoNaturalEarth1()
  }));

  var graticuleSeries = chart.series.unshift(
    am5map.GraticuleSeries.new(root, {
      step: 10
    })
  );

  graticuleSeries.mapLines.template.setAll({
    strokeOpacity: 0.05
  });

  var cont = chart.children.push(am5.Container.new(root, {
    layout: root.horizontalLayout,
    centerX: 0,
    y: am5.percent(100),
    dy: -40
  }));

  // Add labels and controls
  cont.children.push(am5.Label.new(root, {
    centerY: am5.p50,
    text: "Map"
  }));

  var switchButton = cont.children.push(am5.Button.new(root, {
    themeTags: ["switch"],
    centerY: am5.p50,
    icon: am5.Circle.new(root, {
      themeTags: ["icon"]
    })
  }));

  switchButton.on("active", function () {
    if (!switchButton.get("active")) {
      chart.set("projection", am5map.geoNaturalEarth1());
      chart.set("panY", "translateY");
      chart.set("rotationY", 0);
      polygonSeries.set("exclude", ["AQ"]);

    } else {
      chart.set("projection", am5map.geoOrthographic());
      chart.set("panY", "rotateY")
      chart.set("panX", "rotateX");
      polygonSeries.set("exclude", []);
      chart.animate({ key: "rotationX", to: chart.get("rotationX") + 360, duration: 15000, easing: am5.ease.inOut(am5.ease.cubic) });
    }
  });

  cont.children.push(
    am5.Label.new(root, {
      centerY: am5.p50,
      text: "Globe"
    })
  );


  // proposed switch button


  var cont2 = chart.children.push(am5.Container.new(root, {
    layout: root.horizontalLayout,
    y: 40
  }));

  // Add labels and controls
  cont2.children.push(am5.Label.new(root, {
    centerY: am5.p50,
    text: "Initial"
  }));

  var switchButton2 = cont2.children.push(am5.Button.new(root, {
    themeTags: ["switch"],
    centerY: am5.p50,
    icon: am5.Circle.new(root, {
      themeTags: ["icon"]
    })
  }));

  switchButton2.on("active", function () {
    if (!switchButton2.get("active")) {
      polygonSeries.set("valueField", "initial");
      polygonSeries.data.setAll(data);

    } else {
      polygonSeries.set("valueField", "adjusted");
      polygonSeries.data.setAll(data);
    }
  });

  cont2.children.push(
    am5.Label.new(root, {
      centerY: am5.p50,
      text: "adjusted"
    })
  );

  var polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      valueField: "initial",
      calculateAggregates: true,
      exclude: ["AQ"]
    })
  );

  polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
    heatLegend.showValue(ev.target.dataItem.get("value"));
  });

  polygonSeries.set("heatRules", [{
    target: polygonSeries.mapPolygons.template,
    dataField: "value",
    min: am5.color(0xd3a29f),
    max: am5.color(0x6f0600),
    key: "fill"
  }]);

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name} {value}%",
    fill: secondaryColor,
    stroke: am5.color(0xffffff)
  });

  polygonSeries.data.setAll(data);


  var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
    orientation: "vertical",
    startColor: am5.color(0xd3a29f),
    endColor: am5.color(0x6f0600),
    startText: "Lowest",
    endText: "Highest",
    stepCount: 8,
    x: am5.p100,
    centerX: am5.p100,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  }));

  heatLegend.startLabel.setAll({
    fontSize: 12,
    fill: heatLegend.get("startColor")
  });

  heatLegend.endLabel.setAll({
    fontSize: 12,
    fill: heatLegend.get("endColor")
  });

  // change this to template when possible
  polygonSeries.events.on("datavalidated", function () {
    heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
    heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
  });

  chart.appear(2000);
}
```

## HTML

```html
<div id="chartdiv">
  <div id="piediv"></div>
  <div id="linediv"></div>
  <div id="gaugediv"></div>    
  <div id="mapdiv"></div>
  <div id="columndiv"></div>
</div>
```

## CSS

```css
#mapdiv {
  width: 100%;
  height: 400px;
  clear: left;
}
#columndiv {
  width: 100%;
  height: 300px;
  clear: left;
}
#piediv {
  width: 25%;
  height: 220px;
  float: left;
}      
#gaugediv {
  width: 25%;
  height: 220px;
  float: left
}
#linediv {
  width: 50%;
  height: 220px;
  float: left
}   
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
