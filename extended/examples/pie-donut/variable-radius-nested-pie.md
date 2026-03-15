---
title: "Variable-radius Nested Pie"
source: "https://www.amcharts.com/demos/variable-radius-nested-pie/"
category: "pie-donut"
scraped: "2026-03-15"
---

In this demo we create a nested pie chart where the inner slices represent totals for the year and outer slices represent the detailed values comprising these totals.
Key implementation details
To create the inner and outer slices we add two PieSeries to the chart and set radius and innerRadius on both accordingly so they take up the portions of the pie we have designated for them. Our data is in a hierarchical format. We "flatten" it so that all the outer slices are in one array dataset and we create an inner dataset with calculated total values.
Pie chart
Pie series
Data

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
// start and end angle must be set both for chart and series
var chart = root.container.children.push(am5percent.PieChart.new(root, {
  layout: root.verticalLayout,
  radius: am5.percent(100)
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
// start and end angle must be set both for chart and series
var series0 = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "population",
  categoryField: "year",
  alignLabels: false,
  radius: am5.percent(80),
  innerRadius: am5.percent(25)
}));

var bgColor = root.interfaceColors.get("background");

series0.ticks.template.setAll({ forceHidden: true });

series0.labels.template.setAll({
  radius: -10,
  text: "{category}",
  textType: "radial",
  centerX: am5.percent(100)
});

series0.slices.template.setAll({
  stroke: bgColor,
  strokeWidth: 2,
  fill: am5.color(0xaaaaaa),
  tooltipText:
    "{category}: {valuePercentTotal.formatNumber('0.00')}% ({value} bottles)"
});
series0.slices.template.states.create("hover", { scale: 0.95 });

var series1 = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "population",
  categoryField: "country",
  alignLabels: true,
  innerRadius: am5.percent(80),
  radius: am5.percent(100)
}));

series1.slices.template.setAll({
  stroke: bgColor,
  strokeWidth: 2,
  templateField: "settings"
});

series1.labels.template.setAll({
  text: "{category}"
});

var data = {
  "1957": [
    { country: "Belgium", population: 11589623, settings: { fill: am5.color(0x1E3888) } },
    { country: "France", population: 67413000, settings: { fill: am5.color(0xaaaaaa) } },
    { country: "Germany", population: 83190556, settings: { fill: am5.color(0x9C3848) } },
    { country: "Italy", population: 60359546, settings: { fill: am5.color(0xaaaaaa) } },
    { country: "Luxembourg", population: 626108, settings: { fill: am5.color(0xaaaaaa) } },
    { country: "Netherlands", population: 17479000, settings: { fill: am5.color(0xaaaaaa) } }
  ],
  "1973": [
    { country: "Denmark", population: 5806081, settings: { fill: am5.color(0x1E3888) } },
    { country: "Ireland", population: 4948200, settings: { fill: am5.color(0xaaaaaa) } },
    { country: "United Kingdom", population: 66647112, settings: { fill: am5.color(0x47A8BD) } }
  ],
  "1981": [
    { country: "Greece", population: 10724599, settings: { fill: am5.color(0x1E3888) } }
  ],
  "1986": [
    { country: "Portugal", population: 10196707, settings: { fill: am5.color(0x1E3888) } },
    { country: "Spain", population: 46722980, settings: { fill: am5.color(0x1E3888) } }
  ],
  "1995": [
    { country: "Austria", population: 8902600, settings: { fill: am5.color(0x1E3888) } },
    { country: "Finland", population: 5523231, settings: { fill: am5.color(0x47A8BD) } },
    { country: "Sweden", population: 10379295, settings: { fill: am5.color(0x1E3888) } }
  ],
  "2004": [
    { country: "Cyprus", population: 1207359, settings: { fill: am5.color(0x1E3888) } },
    { country: "Czech Republic", population: 10708981, settings: { fill: am5.color(0x1E3888) } },
    { country: "Estonia", population: 1328976, settings: { fill: am5.color(0xaaaaaa) } },
    { country: "Hungary", population: 9771000, settings: { fill: am5.color(0xaaaaaa) } },
    { country: "Latvia", population: 1901548, settings: { fill: am5.color(0x47A8BD) } },
    { country: "Lithuania", population: 2790844, settings: { fill: am5.color(0xaaaaaa) } },
    { country: "Malta", population: 514564, settings: { fill: am5.color(0xaaaaaa) } },
    { country: "Poland", population: 37846755, settings: { fill: am5.color(0x1E3888) } },
    { country: "Slovakia", population: 5459642, settings: { fill: am5.color(0x47A8BD) } },
    { country: "Slovenia", population: 2073894, settings: { fill: am5.color(0xaaaaaa) } }
  ],
  "2007": [
    { country: "Bulgaria", population: 6971487, settings: { fill: am5.color(0x1E3888) } },
    { country: "Romania", population: 19286123, settings: { fill: am5.color(0x9C3848) } }
  ]
};

// Generate series data
var innerData = [];
var outerData = [];
am5.object.each(data, function(year, countries) {
  var population = 0;
  am5.array.each(countries, function(country) {
    population += country.population;
    outerData.push(country);
  });
  innerData.push({
    year: year,
    population: population
  });
});


// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series0.data.setAll(innerData);
series1.data.setAll(outerData);

// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series0.appear(1000, 100);
series1.appear(1000, 100);
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
