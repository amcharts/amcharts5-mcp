---
title: "Animated Time-Line Pie Chart"
source: "https://www.amcharts.com/demos/animated-time-line-pie-chart/"
category: "pie-donut"
scraped: "2026-10-08"
---

A donut that plays through 1995 to 2014: every four seconds it moves on a year, and each slice grows or shrinks with its sector’s share of the economy.

When to animate a pie: Animation shows how a split changes over time without a second chart. It catches the eye and tells a story, but people remember the motion more than the numbers. For a careful comparison of years, a stacked column chart works better.

Good for:
- Telling how an economy or a market shifted
- Screens and presentations that run on their own
- One big change over many years

Think twice when:
- Comparing two exact years: use stacked columns or lines
- Readers who need to stop and look: show a still chart too
- Small shifts from year to year: the motion hides them

Prompt: Create a donut chart of an economy’s sectors that plays through twenty years of data on its own, changing to the next year every 4 seconds and looping, with the year in large text in the hole. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Define data for each year
var chartData = {
  "1995": [
    { sector: "Agriculture", size: 6.6 },
    { sector: "Mining and Quarrying", size: 0.6 },
    { sector: "Manufacturing", size: 23.2 },
    { sector: "Electricity and Water", size: 2.2 },
    { sector: "Construction", size: 4.5 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 14.6 },
    { sector: "Transport and Communication", size: 9.3 },
    { sector: "Finance, real estate and business services", size: 22.5 } ],
  "1996": [
    { sector: "Agriculture", size: 6.4 },
    { sector: "Mining and Quarrying", size: 0.5 },
    { sector: "Manufacturing", size: 22.4 },
    { sector: "Electricity and Water", size: 2 },
    { sector: "Construction", size: 4.2 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 14.8 },
    { sector: "Transport and Communication", size: 9.7 },
    { sector: "Finance, real estate and business services", size: 22 } ],
  "1997": [
    { sector: "Agriculture", size: 6.1 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 20.9 },
    { sector: "Electricity and Water", size: 1.8 },
    { sector: "Construction", size: 4.2 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 13.7 },
    { sector: "Transport and Communication", size: 9.4 },
    { sector: "Finance, real estate and business services", size: 22.1 } ],
  "1998": [
    { sector: "Agriculture", size: 6.2 },
    { sector: "Mining and Quarrying", size: 0.3 },
    { sector: "Manufacturing", size: 21.4 },
    { sector: "Electricity and Water", size: 1.9 },
    { sector: "Construction", size: 4.2 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 14.5 },
    { sector: "Transport and Communication", size: 10.6 },
    { sector: "Finance, real estate and business services", size: 23 } ],
  "1999": [
    { sector: "Agriculture", size: 5.7 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 20 },
    { sector: "Electricity and Water", size: 1.8 },
    { sector: "Construction", size: 4.4 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 15.2 },
    { sector: "Transport and Communication", size: 10.5 },
    { sector: "Finance, real estate and business services", size: 24.7 } ],
  "2000": [
    { sector: "Agriculture", size: 5.1 },
    { sector: "Mining and Quarrying", size: 0.3 },
    { sector: "Manufacturing", size: 20.4 },
    { sector: "Electricity and Water", size: 1.7 },
    { sector: "Construction", size: 4 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 16.3 },
    { sector: "Transport and Communication", size: 10.7 },
    { sector: "Finance, real estate and business services", size: 24.6 } ],
  "2001": [
    { sector: "Agriculture", size: 5.5 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 20.3 },
    { sector: "Electricity and Water", size: 1.6 },
    { sector: "Construction", size: 3.1 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 16.3 },
    { sector: "Transport and Communication", size: 10.7 },
    { sector: "Finance, real estate and business services", size: 25.8 } ],
  "2002": [
    { sector: "Agriculture", size: 5.7 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 20.5 },
    { sector: "Electricity and Water", size: 1.6 },
    { sector: "Construction", size: 3.6 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 16.1 },
    { sector: "Transport and Communication", size: 10.7 },
    { sector: "Finance, real estate and business services", size: 26 } ],
  "2003": [
    { sector: "Agriculture", size: 4.9 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 19.4 },
    { sector: "Electricity and Water", size: 1.5 },
    { sector: "Construction", size: 3.3 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 16.2 },
    { sector: "Transport and Communication", size: 11 },
    { sector: "Finance, real estate and business services", size: 27.5 } ],
  "2004": [
    { sector: "Agriculture", size: 4.7 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 18.4 },
    { sector: "Electricity and Water", size: 1.4 },
    { sector: "Construction", size: 3.3 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 16.9 },
    { sector: "Transport and Communication", size: 10.6 },
    { sector: "Finance, real estate and business services", size: 28.1 } ],
  "2005": [
    { sector: "Agriculture", size: 4.3 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 18.1 },
    { sector: "Electricity and Water", size: 1.4 },
    { sector: "Construction", size: 3.9 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 15.7 },
    { sector: "Transport and Communication", size: 10.6 },
    { sector: "Finance, real estate and business services", size: 29.1 } ],
  "2006": [
    { sector: "Agriculture", size: 4 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 16.5 },
    { sector: "Electricity and Water", size: 1.3 },
    { sector: "Construction", size: 3.7 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 14.2 },
    { sector: "Transport and Communication", size: 12.1 },
    { sector: "Finance, real estate and business services", size: 29.1 } ],
  "2007": [
    { sector: "Agriculture", size: 4.7 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 16.2 },
    { sector: "Electricity and Water", size: 1.2 },
    { sector: "Construction", size: 4.1 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 15.6 },
    { sector: "Transport and Communication", size: 11.2 },
    { sector: "Finance, real estate and business services", size: 30.4 } ],
  "2008": [
    { sector: "Agriculture", size: 4.9 },
    { sector: "Mining and Quarrying", size: 0.3 },
    { sector: "Manufacturing", size: 17.2 },
    { sector: "Electricity and Water", size: 1.4 },
    { sector: "Construction", size: 5.1 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 15.4 },
    { sector: "Transport and Communication", size: 11.1 },
    { sector: "Finance, real estate and business services", size: 28.4 } ],
  "2009": [
    { sector: "Agriculture", size: 4.7 },
    { sector: "Mining and Quarrying", size: 0.3 },
    { sector: "Manufacturing", size: 16.4 },
    { sector: "Electricity and Water", size: 1.9 },
    { sector: "Construction", size: 4.9 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 15.5 },
    { sector: "Transport and Communication", size: 10.9 },
    { sector: "Finance, real estate and business services", size: 27.9 } ],
  "2010": [
    { sector: "Agriculture", size: 4.2 },
    { sector: "Mining and Quarrying", size: 0.3 },
    { sector: "Manufacturing", size: 16.2 },
    { sector: "Electricity and Water", size: 2.2 },
    { sector: "Construction", size: 4.3 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 15.7 },
    { sector: "Transport and Communication", size: 10.2 },
    { sector: "Finance, real estate and business services", size: 28.8 } ],
  "2011": [
    { sector: "Agriculture", size: 4.1 },
    { sector: "Mining and Quarrying", size: 0.3 },
    { sector: "Manufacturing", size: 14.9 },
    { sector: "Electricity and Water", size: 2.3 },
    { sector: "Construction", size: 5 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 17.3 },
    { sector: "Transport and Communication", size: 10.2 },
    { sector: "Finance, real estate and business services", size: 27.2 } ],
  "2012": [
    { sector: "Agriculture", size: 3.8 },
    { sector: "Mining and Quarrying", size: 0.3 },
    { sector: "Manufacturing", size: 14.9 },
    { sector: "Electricity and Water", size: 2.6 },
    { sector: "Construction", size: 5.1 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 15.8 },
    { sector: "Transport and Communication", size: 10.7 },
    { sector: "Finance, real estate and business services", size: 28 } ],
  "2013": [
    { sector: "Agriculture", size: 3.7 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 14.9 },
    { sector: "Electricity and Water", size: 2.7 },
    { sector: "Construction", size: 5.7 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 16.5 },
    { sector: "Transport and Communication", size: 10.5 },
    { sector: "Finance, real estate and business services", size: 26.6 } ],
  "2014": [
    { sector: "Agriculture", size: 3.9 },
    { sector: "Mining and Quarrying", size: 0.2 },
    { sector: "Manufacturing", size: 14.5 },
    { sector: "Electricity and Water", size: 2.7 },
    { sector: "Construction", size: 5.6 },
    { sector: "Trade (Wholesale, Retail, Motor)", size: 16.6 },
    { sector: "Transport and Communication", size: 10.5 },
    { sector: "Finance, real estate and business services", size: 26.5 } ]
};

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart = root.container.children.push(am5percent.PieChart.new(root, {
  innerRadius: am5.percent(50) // a donut: the hole is half the radius
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "size",
  categoryField: "sector"
}));

series.labels.template.setAll({
  maxWidth: 150,            // labels at most 150px wide...
  oversizedBehavior: "wrap" // ...longer names wrap onto more lines
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([
  { sector: "Agriculture", size: 6.6 },
  { sector: "Mining and Quarrying", size: 0.6 },
  { sector: "Manufacturing", size: 23.2 },
  { sector: "Electricity and Water", size: 2.2 },
  { sector: "Construction", size: 4.5 },
  { sector: "Trade (Wholesale, Retail, Motor)", size: 14.6 },
  { sector: "Transport and Communication", size: 9.3 },
  { sector: "Finance, real estate and business services", size: 22.5 }
]);

// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series.appear(1000, 100);

// Add label
// in the series, so the year stays centered in the donut's hole when the angles move the donut
var label = series.children.push(am5.Label.new(root, {
  centerX: am5.p50, // the label's own middle on the pie's center
  centerY: am5.p50,
  fontSize: 50      // 50px digits
}));

// Animate chart data
var currentYear = 1995; // the year whose data comes next
// returns that year's data and moves on, back to 1995 after 2014
function getCurrentData() {
  var data = chartData[currentYear];
  currentYear++;
  if (currentYear > 2014)
    currentYear = 1995;
  return data;
}

// show the year and its data, then again 4 seconds later
function loop() {
  label.set("text", currentYear);
  var data = getCurrentData();
  // replace each slice's data in place, so the slices animate to their new sizes
  for(var i = 0; i < data.length; i++) {
    series.data.setIndex(i, data[i]);
  }
  // the chart's own timer stops when the chart is disposed
  chart.setTimeout( loop, 4000 );
}

loop();
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
