---
title: "Radar Chart Visualizing Yearly Activities"
source: "https://www.amcharts.com/demos/radar-chart-visualizing-yearly-activities/"
category: "radar-polar"
scraped: "2026-10-08"
---

A year of bike rides in one circle: weekly distances as columns, every ride as a bubble sized by its length, and the year’s total in the middle.

A year at a glance: Laid around a circle, a year reads like a clock face: the months follow each other, and busy and quiet seasons show as fuller and emptier parts of the ring. Combining weekly totals with every single ride shows both the big picture and the detail in one chart.

Good for:
- Personal records: training, running, cycling
- Activity that follows the seasons
- Infographics and year-in-review pages

Think twice when:
- Comparing several years: lines or small multiples are clearer
- Exact weekly figures: a column chart lines them up
- Small screens: the week labels get crowded

Prompt: Create a radar chart of a year of bicycle rides: weekly distance totals as columns colored by distance, and every ride as a bubble on its weekday ring, sized by its length. Month bands around the outside zoom to a month when clicked, and the year’s total sits in the middle. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Create custom theme
// https://www.amcharts.com/docs/v5/concepts/themes/#Quick_custom_theme
const myTheme = am5.Theme.new(root);
myTheme.rule("Label").set("fontSize", 10);       // all labels 10px
myTheme.rule("Grid").set("strokeOpacity", 0.06); // very faint grid lines

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), myTheme, am5themes_Responsive.new(root)]);

// tell that valueX should be formatted as a date (show week number)
root.dateFormatter.setAll({
  dateFormat: "w",
  dateFields: ["valueX"]
});

// weeks start on Sunday
root.locale.firstDayOfWeek = 0;

// data
var data = [
  {
    "Activity Date": "2025-04-06",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 16901.30078125,
    "Moving Time": 4731
  },
  {
    "Activity Date": "2025-04-07",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 10051.400390625,
    "Moving Time": 2123
  },
  {
    "Activity Date": "2025-04-24",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 31012,
    "Moving Time": 7902
  },
  {
    "Activity Date": "2025-04-29",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 8279,
    "Moving Time": 2401
  },
  {
    "Activity Date": "2025-04-30",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 65781,
    "Moving Time": 11690
  },
  {
    "Activity Date": "2025-05-08",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 18331.599609375,
    "Moving Time": 4706
  },
  {
    "Activity Date": "2025-05-04",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 23213,
    "Moving Time": 9471
  },
  {
    "Activity Date": "2025-05-09",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 55106,
    "Moving Time": 12755
  },
  {
    "Activity Date": "2025-05-10",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 67423,
    "Moving Time": 15667
  },
  {
    "Activity Date": "2025-05-11",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 31127,
    "Moving Time": 6157
  },
  {
    "Activity Date": "2025-05-11",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 16067,
    "Moving Time": 4087
  },
  {
    "Activity Date": "2025-05-13",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 38208,
    "Moving Time": 8931
  },
  {
    "Activity Date": "2025-05-14",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 115606,
    "Moving Time": 26471
  },
  {
    "Activity Date": "2025-05-15",
    "Activity Name": "Palma de Mallorca day 3",
    "Activity Type": "Ride",
    "Distance": 110470,
    "Moving Time": 22967
  },
  {
    "Activity Date": "2025-05-16",
    "Activity Name": "Sa Colabra epic ride",
    "Activity Type": "Ride",
    "Distance": 67143,
    "Moving Time": 18009
  },
  {
    "Activity Date": "2025-05-17",
    "Activity Name": "Mallorka last day",
    "Activity Type": "Ride",
    "Distance": 87590,
    "Moving Time": 18553
  },
  {
    "Activity Date": "2025-05-23",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 21088,
    "Moving Time": 2555
  },
  {
    "Activity Date": "2025-05-24",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 53361,
    "Moving Time": 8473
  },
  {
    "Activity Date": "2025-05-25",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 13463.7001953125,
    "Moving Time": 3768
  },
  {
    "Activity Date": "2025-05-25",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 14177.2001953125,
    "Moving Time": 3642
  },
  {
    "Activity Date": "2025-05-31",
    "Activity Name": "3.5 karto Juodkrantė - Klaipėda",
    "Activity Type": "Ride",
    "Distance": 75997,
    "Moving Time": 14452
  },
  {
    "Activity Date": "2025-06-26",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 44062,
    "Moving Time": 6016
  },
  {
    "Activity Date": "2025-06-29",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 8756,
    "Moving Time": 3242
  },
  {
    "Activity Date": "2025-06-30",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 27867,
    "Moving Time": 6479
  },
  {
    "Activity Date": "2025-07-01",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 21775,
    "Moving Time": 5256
  },
  {
    "Activity Date": "2025-07-01",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 7343,
    "Moving Time": 2064
  },
  {
    "Activity Date": "2025-07-02",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 26956,
    "Moving Time": 6879
  },
  {
    "Activity Date": "2025-07-03",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 14175,
    "Moving Time": 3617
  },
  {
    "Activity Date": "2025-07-06",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 45489,
    "Moving Time": 11656
  },
  {
    "Activity Date": "2025-07-08",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 10049,
    "Moving Time": 1767
  },
  {
    "Activity Date": "2025-07-09",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 10000,
    "Moving Time": 1805
  },
  {
    "Activity Date": "2025-07-12",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 11603,
    "Moving Time": 3127
  },
  {
    "Activity Date": "2025-07-13",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 8701,
    "Moving Time": 2369
  },
  {
    "Activity Date": "2025-07-14",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 13021,
    "Moving Time": 2728
  },
  {
    "Activity Date": "2025-07-15",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 10094,
    "Moving Time": 1823
  },
  {
    "Activity Date": "2025-07-16",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 10075,
    "Moving Time": 1783
  },
  {
    "Activity Date": "2025-07-17",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 10170,
    "Moving Time": 2006
  },
  {
    "Activity Date": "2025-07-18",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 13796,
    "Moving Time": 2487
  },
  {
    "Activity Date": "2025-07-20",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 9837,
    "Moving Time": 1761
  },
  {
    "Activity Date": "2025-07-22",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 20292,
    "Moving Time": 4581
  },
  {
    "Activity Date": "2025-07-23",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 43681,
    "Moving Time": 12542
  },
  {
    "Activity Date": "2025-07-26",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 21879,
    "Moving Time": 3556
  },
  {
    "Activity Date": "2025-07-25",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 42881,
    "Moving Time": 7302
  },
  {
    "Activity Date": "2025-08-12",
    "Activity Name": "Evening Ride",
    "Activity Type": "Ride",
    "Distance": 11756.5,
    "Moving Time": 2433
  },
  {
    "Activity Date": "2025-08-25",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 5596,
    "Moving Time": 1505
  },
  {
    "Activity Date": "2025-07-24",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 10639.2001953125,
    "Moving Time": 2615
  },
  {
    "Activity Date": "2025-07-25",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 41150.6015625,
    "Moving Time": 6795
  },
  {
    "Activity Date": "2025-07-26",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 43459.80078125,
    "Moving Time": 6986
  },
  {
    "Activity Date": "2025-08-25",
    "Activity Name": "Norvegija su Jurgiu!",
    "Activity Type": "Ride",
    "Distance": 83720,
    "Moving Time": 21811
  },
  {
    "Activity Date": "2025-08-26",
    "Activity Name": "Norvegija su Jurgiu! Day 2",
    "Activity Type": "Ride",
    "Distance": 27739.400390625,
    "Moving Time": 8280
  },
  {
    "Activity Date": "2025-08-27",
    "Activity Name": "Norvegija su Jurgiu! day 3",
    "Activity Type": "Ride",
    "Distance": 25866.599609375,
    "Moving Time": 6333
  },
  {
    "Activity Date": "2025-09-10",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 4512.2998046875,
    "Moving Time": 1250
  },
  {
    "Activity Date": "2025-09-11",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 8641.400390625,
    "Moving Time": 3404
  },
  {
    "Activity Date": "2025-09-14",
    "Activity Name": "Nuo Pisos iki Florencijos",
    "Activity Type": "Ride",
    "Distance": 103813.6015625,
    "Moving Time": 23376
  },
  {
    "Activity Date": "2025-09-15",
    "Activity Name": "Toskana, antra diena",
    "Activity Type": "Ride",
    "Distance": 55542.6015625,
    "Moving Time": 15264
  },
  {
    "Activity Date": "2025-09-16",
    "Activity Name": "Toskana, 3 diena",
    "Activity Type": "Ride",
    "Distance": 70001.3984375,
    "Moving Time": 15377
  },
  {
    "Activity Date": "2025-09-17",
    "Activity Name": "Toskana, 4 diena",
    "Activity Type": "Ride",
    "Distance": 82216.703125,
    "Moving Time": 18648
  },
  {
    "Activity Date": "2025-09-18",
    "Activity Name": "Toskana, 5 diena",
    "Activity Type": "Ride",
    "Distance": 82086.203125,
    "Moving Time": 20213
  },
  {
    "Activity Date": "2025-09-19",
    "Activity Name": "Toskana, 6 diena, važiuojam namo.",
    "Activity Type": "Ride",
    "Distance": 61489.8984375,
    "Moving Time": 11320
  },
  {
    "Activity Date": "2025-09-26",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 4236.2001953125,
    "Moving Time": 1030
  },
  {
    "Activity Date": "2025-09-26",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 4303.60009765625,
    "Moving Time": 1142
  },
  {
    "Activity Date": "2025-10-12",
    "Activity Name": "Lunch Ride",
    "Activity Type": "Ride",
    "Distance": 14578,
    "Moving Time": 3591
  },
  {
    "Activity Date": "2025-09-30",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 7996.2998046875,
    "Moving Time": 2219
  },
  {
    "Activity Date": "2025-10-01",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 4265.2998046875,
    "Moving Time": 1131
  },
  {
    "Activity Date": "2025-10-01",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 4353.10009765625,
    "Moving Time": 1219
  },
  {
    "Activity Date": "2025-10-02",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 17238.80078125,
    "Moving Time": 4641
  },
  {
    "Activity Date": "2025-10-03",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 4259.7998046875,
    "Moving Time": 1054
  },
  {
    "Activity Date": "2025-10-15",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 14651.5,
    "Moving Time": 3184
  },
  {
    "Activity Date": "2025-10-17",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 4194,
    "Moving Time": 1029
  },
  {
    "Activity Date": "2025-10-21",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 4102.7998046875,
    "Moving Time": 1063
  },
  {
    "Activity Date": "2025-11-03",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 8456.2998046875,
    "Moving Time": 2157
  },
  {
    "Activity Date": "2025-11-04",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 8816.400390625,
    "Moving Time": 2353
  },
  {
    "Activity Date": "2025-11-05",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 8090.7001953125,
    "Moving Time": 1911
  },
  {
    "Activity Date": "2025-11-06",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 1382.699951171875,
    "Moving Time": 336
  },
  {
    "Activity Date": "2025-11-07",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 4856.2001953125,
    "Moving Time": 1351
  },
  {
    "Activity Date": "2025-11-11",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 5141.10009765625,
    "Moving Time": 1526
  },
  {
    "Activity Date": "2025-11-12",
    "Activity Name": "Afternoon Ride",
    "Activity Type": "Ride",
    "Distance": 4582.60009765625,
    "Moving Time": 1237
  },
  {
    "Activity Date": "2025-11-13",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 15022,
    "Moving Time": 3742
  },
  {
    "Activity Date": "2025-09-15",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 57270.3984375,
    "Moving Time": 14393
  },
  {
    "Activity Date": "2025-09-19",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 66988.1015625,
    "Moving Time": 12096
  },
  {
    "Activity Date": "2025-09-14",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 103671.1015625,
    "Moving Time": 22042
  },
  {
    "Activity Date": "2025-09-18",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 81357.5,
    "Moving Time": 18880
  },
  {
    "Activity Date": "2025-09-16",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 74034.796875,
    "Moving Time": 16013
  },
  {
    "Activity Date": "2025-09-17",
    "Activity Name": "Morning Ride",
    "Activity Type": "Ride",
    "Distance": 82354.3984375,
    "Moving Time": 16583
  },
  {
    "Activity Date": "2025-11-19",
    "Activity Name": "Taiwan, day 1",
    "Activity Type": "Ride",
    "Distance": 94371.203125,
    "Moving Time": 18130
  },
  {
    "Activity Date": "2025-11-20",
    "Activity Name": "Taiwan, day 2, Sun Moon lake",
    "Activity Type": "Ride",
    "Distance": 115457.203125,
    "Moving Time": 21181
  },
  {
    "Activity Date": "2025-11-21",
    "Activity Name": "Taiwan day 3",
    "Activity Type": "Ride",
    "Distance": 80677.8984375,
    "Moving Time": 12403
  },
  {
    "Activity Date": "2025-11-22",
    "Activity Name": "Taiwan day 4",
    "Activity Type": "Ride",
    "Distance": 121866.796875,
    "Moving Time": 26665
  },
  {
    "Activity Date": "2025-11-23",
    "Activity Name": "Taiwan day 5",
    "Activity Type": "Ride",
    "Distance": 107690.703125,
    "Moving Time": 23386
  },
  {
    "Activity Date": "2025-11-24",
    "Activity Name": "Taiwan day 6",
    "Activity Type": "Ride",
    "Distance": 90308.203125,
    "Moving Time": 18331
  }
];

var weeklyData = [];
var dailyData = [];

var firstDay = am5.time.round(new Date(data[0]["Activity Date"]), "year", 1); // January 1 of the rides' year
var total = 0;
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

var colorSet = am5.ColorSet.new(root, {}); // colors for the month bands

// PREPARE DATA
function prepareDistanceData(data) {
  // 53 empty weeks, each with its start date
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

  // add each ride's distance to its week, and keep the ride as a bubble on its weekday row
  am5.array.each(data, function (di) {
    var date = new Date(di["Activity Date"]);
    var weekDay = date.getDay();
    var weekNumber = am5.utils.getWeek(date);

    // late December days that fall in week 1 of the next year count as week 53
    if (weekNumber == 1 && date.getMonth() == 11) {
      weekNumber = 53;
    }

    var distance = am5.math.round(di["Distance"] / 1000, 1); // meters to km, one decimal

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


// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,                  // no dragging the plot around
    panY: false,
    wheelX: "panX",               // a horizontal wheel or trackpad swipe moves a zoomed view around...
    wheelY: "zoomX",              // ...and the vertical wheel zooms in on some weeks
    innerRadius: am5.percent(20), // a hole in the middle, for the yearly total
    // leaves room for the week dates around the ring, also on a short chart
    radius: am5.percent(80),
    // a 340-degree ring with a gap at the bottom, where the two radial axes show their labels
    startAngle: 270 - 170,
    endAngle: 270 + 170
  })
);

// add label in the center
chart.radarContainer.children.push(
  am5.Label.new(root, {
    text:
      "[fontSize:0.8em]In 2025 I cycled:[/]\n[fontSize:1.5em]" + // small first line, then the big total
      Math.round(total) +
      " km[/]",
    textAlign: "center",      // both lines centered
    centerX: am5.percent(50), // the label's middle...
    centerY: am5.percent(50)  // ...at the center of the ring
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set(
  "cursor",
  am5radar.RadarCursor.new(root, {
    behavior: "zoomX" // drag around the ring to zoom in on some weeks
  })
);
cursor.lineY.set("visible", false); // no circle through the pointer, only the line from the center

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes

// date axis
var dateAxisRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 20 // at least 20px between the week labels
});

dateAxisRenderer.labels.template.setAll({
  radius: 30,         // the week labels sit 30px outside the ring, past the month bands
  textType: "radial", // labels point out from the center
  centerY: am5.p50    // each label centered on its grid line
});

var dateAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "week", count: 1 }, // one column per week
    renderer: dateAxisRenderer,
    min: new Date(2025, 0, 1, 0, 0, 0).getTime(), // the ring runs from January 1, 2025...
    max: new Date(2026, 0, 1, 0, 0, 0).getTime()  // ...to January 1, 2026
  })
);

// distance axis
var distanceAxisRenderer = am5radar.AxisRendererRadial.new(root, {
  axisAngle: 90,                // the distance labels run straight down, into the gap at the bottom
  radius: am5.percent(60),      // the inner ring, out to 60% of the radius...
  innerRadius: am5.percent(20), // ...from the 20% hole
  // zero at the outer edge of this ring, so the weekly columns grow toward the middle
  inversed: true,
  minGridDistance: 20 // at least 20px between the distance labels
});

distanceAxisRenderer.labels.template.setAll({
  centerX: am5.p50,  // labels centered on the axis line
  minPosition: 0.05, // no label right at either end...
  maxPosition: 0.95  // ...where they would crowd the other axis
});

var distanceAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: distanceAxisRenderer
  })
);

distanceAxis.set("numberFormat", "# ' km'"); // distances shown as "100 km"

// week axis
var weekAxisRenderer = am5radar.AxisRendererRadial.new(root, {
  axisAngle: 90, // these labels go in the gap at the bottom too
  // the outer ring, from 60% to 100% of the radius: one row of ride bubbles per weekday
  innerRadius: am5.percent(60),
  radius: am5.percent(100),
  minGridDistance: 20 // at least 20px between the weekday labels
});

weekAxisRenderer.labels.template.setAll({
  centerX: am5.p50 // labels centered on the axis line
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
    calculateAggregates: true, // works out the lowest and highest values, which the heat rules need
    xAxis: dateAxis,
    yAxis: distanceAxis,
    valueYField: "distance",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "Week {valueX}: {valueY} km" // {valueX} shows as a week number, see the date formatter
    })
  })
);

distanceSeries.columns.template.set("strokeOpacity", 0); // no column outlines

// Set up heat rules
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
distanceSeries.set("heatRules", [{
  target: distanceSeries.columns.template,
  key: "fill",
  min: am5.color(0x673ab7), // the shortest weeks purple...
  max: am5.color(0xf44336), // ...the longest red
  dataField: "valueY"
}]);

// bubble series is a line series with strokes hidden
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var bubbleSeries = chart.series.push(
  am5radar.RadarLineSeries.new(root, {
    calculateAggregates: true, // works out the lowest and highest values, which the heat rule needs
    xAxis: dateAxis,
    yAxis: weekAxis,
    baseAxis: dateAxis,
    categoryYField: "day",
    valueXField: "date",
    valueField: "Distance",
    maskBullets: false // bubbles at the edge aren't cut off
  })
);

// only bullets are visible, hide stroke
bubbleSeries.strokes.template.set("forceHidden", true);

// add bullet
var circleTemplate = am5.Template.new({});
bubbleSeries.bullets.push(function () {
  var graphics = am5.Circle.new(root, {
    fill: distanceSeries.get("fill"),  // the series color of the weekly columns
    tooltipText: "{title}: {value} km" // the ride's name and distance
  }, circleTemplate);
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add heat rule (sizes the bubbles by the distance of each ride)
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
bubbleSeries.set("heatRules", [{
  target: circleTemplate,
  min: 3,  // the shortest ride a 3px bubble...
  max: 15, // ...the longest one 15px
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

// a month band around the ring: a colored arc with the month's name that zooms in on a click
function createRange(name, index) {
  var axisRange = dateAxis.createAxisRange(
    dateAxis.makeDataItem({ above: true }) // drawn above the series
  );
  axisRange.get("label").setAll({ text: name });

  var fromTime = new Date(firstDay.getFullYear(), index, 1, 0, 0, 0).getTime();
  var toTime = am5.time.add(new Date(fromTime), "month", 1).getTime();

  axisRange.set("value", fromTime);
  axisRange.set("endValue", toTime);

  // every 2nd color for a bigger contrast
  var fill = axisRange.get("axisFill");
  fill.setAll({
    toggleKey: "active",        // a click toggles the band's active state
    cursorOverStyle: "pointer", // a hand cursor over the band
    fill: colorSet.getIndex(index * 2),
    visible: true,              // an axis range's fill is hidden until set visible
    dRadius: 25,                // the band reaches 25px past the ring's edge...
    innerRadius: -25            // ...and is 25px thick, so it sits just outside the ring
  });
  axisRange.get("grid").set("visible", false); // no grid line at the start of the month

  var label = axisRange.get("label");
  label.setAll({
    fill: am5.color(0xffffff), // white text on the colored band
    textType: "circular",      // the name bends along the band
    radius: 8,                 // 8px out from the ring, inside the band
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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
