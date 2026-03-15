---
title: "Radar Chart Visualizing Yearly Activities"
source: "https://www.amcharts.com/demos/radar-chart-visualizing-yearly-activities/"
category: "radar-polar"
scraped: "2026-03-15"
---

Radar charts are great for creating stunning multi-level visualizations in a fairly compact space. This demo shows a year's worth of daily bicycle ride data together with weekly totals, and a grand total in the same colorful interactive radial diagram.
Key implementation details
We create a date axis for the whole year as our X axis (circular outer axis), then add a couple of Y axes: the inner one for weekly distances and the outer one for weekdays. Weekly distances are represented by column series bound to the the inner distances axis. Finally, we add line series where bullet sizes represent distances cycled on specific weekdays and "attach" it to the weekday Y-axis. 
Radar chart
Radar axes
Radar series

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Create custom theme
// https://www.amcharts.com/docs/v5/concepts/themes/#Quick_custom_theme
const myTheme = am5.Theme.new(root);
myTheme.rule("Label").set("fontSize", 10);
myTheme.rule("Grid").set("strokeOpacity", 0.06);

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), myTheme]);

// tell that valueX should be formatted as a date (show week number)
root.dateFormatter.setAll({  
  dateFormat: "w",
  dateFields: ["valueX"]
});

root.locale.firstDayOfWeek = 0;

// data
var data = [
  {
    "Activity Date": "2019-04-07",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 16901.30078125,
    "Moving Time": 4731
  },
  {
    "Activity Date": "2019-04-08",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 10051.400390625,
    "Moving Time": 2123
  },
  {
    "Activity Date": "2019-04-25",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 31012,
    "Moving Time": 7902
  },
  {
    "Activity Date": "2019-04-30",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 8279,
    "Moving Time": 2401
  },
  {
    "Activity Date": "2019-05-01",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 65781,
    "Moving Time": 11690
  },
  {
    "Activity Date": "2019-05-09",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 18331.599609375,
    "Moving Time": 4706
  },
  {
    "Activity Date": "2019-05-05",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 23213,
    "Moving Time": 9471
  },
  {
    "Activity Date": "2019-05-10",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 55106,
    "Moving Time": 12755
  },
  {
    "Activity Date": "2019-05-11",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 67423,
    "Moving Time": 15667
  },
  {
    "Activity Date": "2019-05-12",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 31127,
    "Moving Time": 6157
  },
  {
    "Activity Date": "2019-05-12",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 16067,
    "Moving Time": 4087
  },
  {
    "Activity Date": "2019-05-14",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 38208,
    "Moving Time": 8931
  },
  {
    "Activity Date": "2019-05-15",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 115606,
    "Moving Time": 26471
  },
  {
    "Activity Date": "2019-05-16",
    "Activity Name": "Palma de Mallorca day 3",
    "Activity Type": "Ride",
    "Distance": 110470,
    "Moving Time": 22967
  },
  {
    "Activity Date": "2019-05-17",
    "Activity Name": "Sa Colabra epic ride",
    "Activity Type": "Ride",
    "Distance": 67143,
    "Moving Time": 18009
  },
  {
    "Activity Date": "2019-05-18",
    "Activity Name": "Mallorka last day",
    "Activity Type": "Ride",
    "Distance": 87590,
    "Moving Time": 18553
  },
  {
    "Activity Date": "2019-05-24",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 21088,
    "Moving Time": 2555
  },
  {
    "Activity Date": "2019-05-25",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 53361,
    "Moving Time": 8473
  },
  {
    "Activity Date": "2019-05-26",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 13463.7001953125,
    "Moving Time": 3768
  },
  {
    "Activity Date": "2019-05-26",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 14177.2001953125,
    "Moving Time": 3642
  },
  {
    "Activity Date": "2019-06-01",
    "Activity Name": "3.5 karto Juodkrantė - Klaipėda",
    "Activity Type": "Ride",
    "Distance": 75997,
    "Moving Time": 14452
  },
  {
    "Activity Date": "2019-06-27",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 44062,
    "Moving Time": 6016
  },
  {
    "Activity Date": "2019-06-30",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 8756,
    "Moving Time": 3242
  },
  {
    "Activity Date": "2019-07-01",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 27867,
    "Moving Time": 6479
  },
  {
    "Activity Date": "2019-07-02",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 21775,
    "Moving Time": 5256
  },
  {
    "Activity Date": "2019-07-02",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 7343,
    "Moving Time": 2064
  },
  {
    "Activity Date": "2019-07-03",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 26956,
    "Moving Time": 6879
  },
  {
    "Activity Date": "2019-07-04",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 14175,
    "Moving Time": 3617
  },
  {
    "Activity Date": "2019-07-07",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 45489,
    "Moving Time": 11656
  },
  {
    "Activity Date": "2019-07-09",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 10049,
    "Moving Time": 1767
  },
  {
    "Activity Date": "2019-07-10",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 10000,
    "Moving Time": 1805
  },
  {
    "Activity Date": "2019-07-13",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 11603,
    "Moving Time": 3127
  },
  {
    "Activity Date": "2019-07-14",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 8701,
    "Moving Time": 2369
  },
  {
    "Activity Date": "2019-07-15",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 13021,
    "Moving Time": 2728
  },
  {
    "Activity Date": "2019-07-16",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 10094,
    "Moving Time": 1823
  },
  {
    "Activity Date": "2019-07-17",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 10075,
    "Moving Time": 1783
  },
  {
    "Activity Date": "2019-07-18",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 10170,
    "Moving Time": 2006
  },
  {
    "Activity Date": "2019-07-19",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 13796,
    "Moving Time": 2487
  },
  {
    "Activity Date": "2019-07-21",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 9837,
    "Moving Time": 1761
  },
  {
    "Activity Date": "2019-07-23",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 20292,
    "Moving Time": 4581
  },
  {
    "Activity Date": "2019-07-24",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 43681,
    "Moving Time": 12542
  },
  {
    "Activity Date": "2019-07-27",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 21879,
    "Moving Time": 3556
  },
  {
    "Activity Date": "2019-07-26",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 42881,
    "Moving Time": 7302
  },
  {
    "Activity Date": "2019-08-13",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 11756.5,
    "Moving Time": 2433
  },
  {
    "Activity Date": "2019-08-26",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 5596,
    "Moving Time": 1505
  },
  {
    "Activity Date": "2019-07-25",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 10639.2001953125,
    "Moving Time": 2615
  },
  {
    "Activity Date": "2019-07-26",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 41150.6015625,
    "Moving Time": 6795
  },
  {
    "Activity Date": "2019-07-27",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 43459.80078125,
    "Moving Time": 6986
  },
  {
    "Activity Date": "2019-08-26",
    "Activity Name": "Norvegija su Jurgiu!",
    "Activity Type": "Ride",
    "Distance": 83720,
    "Moving Time": 21811
  },
  {
    "Activity Date": "2019-08-27",
    "Activity Name": "Norvegija su Jurgiu! Day 2",
    "Activity Type": "Ride",
    "Distance": 27739.400390625,
    "Moving Time": 8280
  },
  {
    "Activity Date": "2019-08-28",
    "Activity Name": "Norvegija su Jurgiu! day 3",
    "Activity Type": "Ride",
    "Distance": 25866.599609375,
    "Moving Time": 6333
  },
  {
    "Activity Date": "2019-09-11",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 4512.2998046875,
    "Moving Time": 1250
  },
  {
    "Activity Date": "2019-09-12",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 8641.400390625,
    "Moving Time": 3404
  },
  {
    "Activity Date": "2019-09-15",
    "Activity Name": "Nuo Pisos iki Florencijos",
    "Activity Type": "Ride",
    "Distance": 103813.6015625,
    "Moving Time": 23376
  },
  {
    "Activity Date": "2019-09-16",
    "Activity Name": "Toskana, antra diena",
    "Activity Type": "Ride",
    "Distance": 55542.6015625,
    "Moving Time": 15264
  },
  {
    "Activity Date": "2019-09-17",
    "Activity Name": "Toskana, 3 diena",
    "Activity Type": "Ride",
    "Distance": 70001.3984375,
    "Moving Time": 15377
  },
  {
    "Activity Date": "2019-09-18",
    "Activity Name": "Toskana, 4 diena",
    "Activity Type": "Ride",
    "Distance": 82216.703125,
    "Moving Time": 18648
  },
  {
    "Activity Date": "2019-09-19",
    "Activity Name": "Toskana, 5 diena",
    "Activity Type": "Ride",
    "Distance": 82086.203125,
    "Moving Time": 20213
  },
  {
    "Activity Date": "2019-09-20",
    "Activity Name": "Toskana, 6 diena, važiuojam namo.",
    "Activity Type": "Ride",
    "Distance": 61489.8984375,
    "Moving Time": 11320
  },
  {
    "Activity Date": "2019-09-27",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 4236.2001953125,
    "Moving Time": 1030
  },
  {
    "Activity Date": "2019-09-27",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 4303.60009765625,
    "Moving Time": 1142
  },
  {
    "Activity Date": "2019-10-13",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 14578,
    "Moving Time": 3591
  },
  {
    "Activity Date": "2019-10-01",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 7996.2998046875,
    "Moving Time": 2219
  },
  {
    "Activity Date": "2019-10-02",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 4265.2998046875,
    "Moving Time": 1131
  },
  {
    "Activity Date": "2019-10-02",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 4353.10009765625,
    "Moving Time": 1219
  },
  {
    "Activity Date": "2019-10-03",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 17238.80078125,
    "Moving Time": 4641
  },
  {
    "Activity Date": "2019-10-04",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 4259.7998046875,
    "Moving Time": 1054
  },
  {
    "Activity Date": "2019-10-16",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 14651.5,
    "Moving Time": 3184
  },
  {
    "Activity Date": "2019-10-18",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 4194,
    "Moving Time": 1029
  },
  {
    "Activity Date": "2019-10-22",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 4102.7998046875,
    "Moving Time": 1063
  },
  {
    "Activity Date": "2019-11-04",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 8456.2998046875,
    "Moving Time": 2157
  },
  {
    "Activity Date": "2019-11-05",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 8816.400390625,
    "Moving Time": 2353
  },
  {
    "Activity Date": "2019-11-06",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 8090.7001953125,
    "Moving Time": 1911
  },
  {
    "Activity Date": "2019-11-07",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 1382.699951171875,
    "Moving Time": 336
  },
  {
    "Activity Date": "2019-11-08",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 4856.2001953125,
    "Moving Time": 1351
  },
  {
    "Activity Date": "2019-11-12",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 5141.10009765625,
    "Moving Time": 1526
  },
  {
    "Activity Date": "2019-11-13",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 4582.60009765625,
    "Moving Time": 1237
  },
  {
    "Activity Date": "2019-11-14",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 15022,
    "Moving Time": 3742
  },
  {
    "Activity Date": "2019-09-16",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 57270.3984375,
    "Moving Time": 14393
  },
  {
    "Activity Date": "2019-09-20",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 66988.1015625,
    "Moving Time": 12096
  },
  {
    "Activity Date": "2019-09-15",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 103671.1015625,
    "Moving Time": 22042
  },
  {
    "Activity Date": "2019-09-19",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 81357.5,
    "Moving Time": 18880
  },
  {
    "Activity Date": "2019-09-17",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 74034.796875,
    "Moving Time": 16013
  },
  {
    "Activity Date": "2019-09-18",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 82354.3984375,
    "Moving Time": 16583
  },
  {
    "Activity Date": "2019-11-20",
    "Activity Name": "Taiwan, day 1",
    "Activity Type": "Ride",
    "Distance": 94371.203125,
    "Moving Time": 18130
  },
  {
    "Activity Date": "2019-11-21",
    "Activity Name": "Taiwan, day 2, Sun Moon lake",
    "Activity Type": "Ride",
    "Distance": 115457.203125,
    "Moving Time": 21181
  },
  {
    "Activity Date": "2019-11-22",
    "Activity Name": "Taiwan day 3",
    "Activity Type": "Ride",
    "Distance": 80677.8984375,
    "Moving Time": 12403
  },
  {
    "Activity Date": "2019-11-23",
    "Activity Name": "Taiwan day 4",
    "Activity Type": "Ride",
    "Distance": 121866.796875,
    "Moving Time": 26665
  },
  {
    "Activity Date": "2019-11-24",
    "Activity Name": "Taiwan day 5",
    "Activity Type": "Ride",
    "Distance": 107690.703125,
    "Moving Time": 23386
  },
  {
    "Activity Date": "2019-11-25",
    "Activity Name": "Taiwan day 6",
    "Activity Type": "Ride",
    "Distance": 90308.203125,
    "Moving Time": 18331
  }
];


var weeklyData = [];
var dailyData = [];

var firstDay = am5.time.round(new Date(data[0]["Activity Date"]), "year", 1);
var total = 0;
var dateFormatter = am5.DateFormatter.new(root, {});
var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var weekAxisData = [
  { day: "Sun" },
  { day: "Mon" },
  { day: "Tue" },
  { day: "Wed" },
  { day: "Thu" },
  { day: "Fri" },
  { day: "Sat" }
];

var colorSet = am5.ColorSet.new(root, {});

// PREPARE DATA
function prepareDistanceData(data) {
  for (var i = 0; i < 53; i++) {
    weeklyData[i] = {};
    weeklyData[i].distance = 0;
    var date = new Date(firstDay);
    date.setDate(i * 7);
    am5.time.round(date, "week", 1);
    var endDate = am5.time.round(new Date(date), "week", 1);

    weeklyData[i].date = date.getTime();
    weeklyData[i].endDate = endDate.getTime();
  }

  am5.array.each(data, function (di) {
    var date = new Date(di["Activity Date"]);
    var weekDay = date.getDay();
    var weekNumber = am5.utils.getWeek(date);

    if (weekNumber == 1 && date.getMonth() == 11) {
      weekNumber = 53;
    }

    var distance = am5.math.round(di["Distance"] / 1000, 1);

    weeklyData[weekNumber - 1].distance += distance;
    weeklyData[weekNumber - 1].distance = am5.math.round(
      weeklyData[weekNumber - 1].distance,
      1
    );
    total += distance;

    dailyData.push({
      date: date.getTime(),
      day: weekdays[weekDay],
      "Distance": distance,
      title: di["Activity Name"]
    });
  });
}

prepareDistanceData(data);

var div = document.getElementById("chartdiv");

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    innerRadius: am5.percent(20),
    radius: am5.percent(85),
    startAngle: 270 - 170,
    endAngle: 270 + 170
  })
);

// add label in the center
chart.radarContainer.children.push(
  am5.Label.new(root, {
    text:
      "[fontSize:0.8em]In 2019 I cycled:[/]
[fontSize:1.5em]" +
      Math.round(total) +
      " km[/]",
    textAlign: "center",
    centerX: am5.percent(50),
    centerY: am5.percent(50)
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set(
  "cursor",
  am5radar.RadarCursor.new(root, {
    behavior: "zoomX"
  })
);
cursor.lineY.set("visible", false);

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes

// date axis
var dateAxisRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 20
});

dateAxisRenderer.labels.template.setAll({
  radius: 30,
  textType: "radial",
  centerY: am5.p50
});

var dateAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "week", count: 1 },
    renderer: dateAxisRenderer,
    min: new Date(2019, 0, 1, 0, 0, 0).getTime(),
    max: new Date(2020, 0, 1, 0, 0, 0).getTime()
  })
);

// distance axis
var distanceAxisRenderer = am5radar.AxisRendererRadial.new(root, {
  axisAngle: 90,
  radius: am5.percent(60),
  innerRadius: am5.percent(20),
  inversed: true,
  minGridDistance: 20
});

distanceAxisRenderer.labels.template.setAll({
  centerX: am5.p50,
  minPosition: 0.05,
  maxPosition: 0.95
});

var distanceAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: distanceAxisRenderer
  })
);

distanceAxis.set("numberFormat", "# ' km'");

// week axis
var weekAxisRenderer = am5radar.AxisRendererRadial.new(root, {
  axisAngle: 90,
  innerRadius: am5.percent(60),
  radius: am5.percent(100),
  minGridDistance: 20
});

weekAxisRenderer.labels.template.setAll({
  centerX: am5.p50
});

var weekAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "day",
    renderer: weekAxisRenderer
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var distanceSeries = chart.series.push(
  am5radar.RadarColumnSeries.new(root, {
    calculateAggregates: true,
    xAxis: dateAxis,
    yAxis: distanceAxis,
    valueYField: "distance",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "week {valueX}: {valueY}"
    })
  })
);

distanceSeries.columns.template.set("strokeOpacity", 0);

// Set up heat rules
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
distanceSeries.set("heatRules", [{
  target: distanceSeries.columns.template,
  key: "fill",
  min: am5.color(0x673ab7),
  max: am5.color(0xf44336),
  dataField: "valueY"
}]);

// bubble series is a line series with stroeks hiddden
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var bubbleSeries = chart.series.push(
  am5radar.RadarLineSeries.new(root, {
    calculateAggregates: true,
    xAxis: dateAxis,
    yAxis: weekAxis,
    baseAxis: dateAxis,
    categoryYField: "day",
    valueXField: "date",
    valueField: "Distance",
    maskBullets: false
  })
);

// only bullets are visible, hide stroke
bubbleSeries.strokes.template.set("forceHidden", true);

// add bullet
var circleTemplate = am5.Template.new({});
bubbleSeries.bullets.push(function () {
  var graphics = am5.Circle.new(root, {
    fill: distanceSeries.get("fill"),
    tooltipText: "{title}: {value} km"
  }, circleTemplate);
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add heat rule (makes bubbles to be of a various size, depending on a value)
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
bubbleSeries.set("heatRules", [{
  target: circleTemplate,
  min: 3,
  max: 15,
  dataField: "value",
  key: "radius"
}]);

// set data
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data

distanceSeries.data.setAll(weeklyData);
weekAxis.data.setAll(weekAxisData);
bubbleSeries.data.setAll(dailyData);

bubbleSeries.appear(1000);
distanceSeries.appear(1000);
chart.appear(1000, 100);

// create axis ranges
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
for (var i = 0; i < 12; i++) {
  createRange(months[i], i);
}

function createRange(name, index) {
  var axisRange = dateAxis.createAxisRange(
    dateAxis.makeDataItem({ above: true })
  );
  axisRange.get("label").setAll({ text: name });

  var fromTime = new Date(firstDay.getFullYear(), i, 1, 0, 0, 0).getTime();
  var toTime = am5.time.add(new Date(fromTime), "month", 1).getTime();

  axisRange.set("value", fromTime);
  axisRange.set("endValue", toTime);

  // every 2nd color for a bigger contrast
  var fill = axisRange.get("axisFill");
  fill.setAll({
    toggleKey: "active",
    cursorOverStyle: "pointer",
    fill: colorSet.getIndex(index * 2),
    visible: true,
    dRadius: 25,
    innerRadius: -25
  });
  axisRange.get("grid").set("visible", false);

  var label = axisRange.get("label");
  label.setAll({
    fill: am5.color(0xffffff),
    textType: "circular",
    radius: 8,
    text: months[index]
  });

  // clicking on a range zooms in
  fill.events.on("click", function (event) {
    var dataItem = event.target.dataItem;
    if (event.target.get("active")) {
      dateAxis.zoom(0, 1);
    } else {
      dateAxis.zoomToValues(dataItem.get("value"), dataItem.get("endValue"));
    }
  });
}
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 700px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
