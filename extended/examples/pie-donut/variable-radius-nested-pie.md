---
title: "Variable-Radius Nested Pie"
source: "https://www.amcharts.com/demos/variable-radius-nested-pie/"
category: "pie-donut"
scraped: "2026-10-08"
---

How the EU grew: the inner ring is each enlargement, from the founding members in 1957 to 2007, and the outer ring the countries that joined, sized by their population today.

When a nested pie fits: When data has two levels, totals and the items inside them, a nested pie shows both: each inner slice is the sum of the outer slices around it. Here that is each round of EU enlargement and the countries it brought in.

Good for:
- Totals and their parts in one picture
- Time periods and what happened in each
- Regions and their countries

Think twice when:
- Dozens of thin outer slices: labels stop fitting
- Comparing parts across groups: a grouped bar chart is clearer
- More than two levels: use a sunburst chart

Prompt: Create a nested pie chart of EU enlargement: the inner ring shows the population that joined in each year, and the outer ring splits each year into its countries, in lighter shades of that year’s color, with tooltips showing the populations. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
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
// start and end angle must be set both for chart and series
var chart = root.container.children.push(am5percent.PieChart.new(root, {
  layout: root.verticalLayout,
  radius: am5.percent(85), // the pie takes 85% of the space it has
  // start at three o'clock, so the many small slices of the later years end up on the right, where their labels have room
  startAngle: 0,
  endAngle: 360 // a full circle
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
// start and end angle must be set both for chart and series
var series0 = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "population",
  categoryField: "year",
  alignLabels: false, // each year stays inside its slice
  startAngle: 0,
  endAngle: 360,
  radius: am5.percent(80),     // the inner pie, from 25% to 80% of the radius...
  innerRadius: am5.percent(25) // ...with a hole in the middle
}));

// the theme's background color, for the gaps between slices
var bgColor = root.interfaceColors.get("background");

series0.ticks.template.setAll({ forceHidden: true }); // no ticks: the years sit inside their slices

// years inside their slices, along the radius, ending 10px in from the outer edge
series0.labels.template.setAll({
  radius: -10,
  text: "{category}",
  textType: "radial",
  centerX: am5.percent(100)
});

// each year takes the next color of the theme
series0.slices.template.setAll({
  stroke: bgColor, // 2px gaps in the background color
  strokeWidth: 2,
  tooltipText: "Joined in {category}: {value.formatNumber('#.0a')} people today"
});
// a hovered year shrinks a little instead of growing into the outer ring
series0.slices.template.states.create("hover", { scale: 0.95 });

var series1 = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "population",
  categoryField: "country",
  alignLabels: true, // the country names line up in columns at the sides
  startAngle: 0,
  endAngle: 360,
  innerRadius: am5.percent(80), // the outer ring, from 80% out to the full radius
  radius: am5.percent(100)
}));

series1.slices.template.setAll({
  stroke: bgColor,
  strokeWidth: 2,
  templateField: "settings" // each country takes its fill from the data: its year's color, set below
});

series1.labels.template.setAll({
  text: "{category}" // just the country's name, no percent
});

series1.slices.template.set("tooltipText", "{category}: {value.formatNumber('#.0a')} people");

var data = {
  "1957": [
    { country: "Belgium", population: 11589623 },
    { country: "France", population: 67413000 },
    { country: "Germany", population: 83190556 },
    { country: "Italy", population: 60359546 },
    { country: "Luxembourg", population: 626108 },
    { country: "Netherlands", population: 17479000 }
  ],
  "1973": [
    { country: "Denmark", population: 5806081 },
    { country: "Ireland", population: 4948200 },
    { country: "United Kingdom", population: 66647112 }
  ],
  "1981": [
    { country: "Greece", population: 10724599 }
  ],
  "1986": [
    { country: "Portugal", population: 10196707 },
    { country: "Spain", population: 46722980 }
  ],
  "1995": [
    { country: "Austria", population: 8902600 },
    { country: "Finland", population: 5523231 },
    { country: "Sweden", population: 10379295 }
  ],
  "2004": [
    { country: "Cyprus", population: 1207359 },
    { country: "Czech Republic", population: 10708981 },
    { country: "Estonia", population: 1328976 },
    { country: "Hungary", population: 9771000 },
    { country: "Latvia", population: 1901548 },
    { country: "Lithuania", population: 2790844 },
    { country: "Malta", population: 514564 },
    { country: "Poland", population: 37846755 },
    { country: "Slovakia", population: 5459642 },
    { country: "Slovenia", population: 2073894 }
  ],
  "2007": [
    { country: "Bulgaria", population: 6971487 },
    { country: "Romania", population: 19286123 }
  ]
};

// Generate series data
var innerData = [];
var outerData = [];
var yearIndex = 0;
am5.object.each(data, function(year, countries) {
  // the year's color, as the inner ring gets it from the theme, a little lighter for its countries
  var countryColor = am5.Color.lighten(series0.get("colors").getIndex(yearIndex++), 0.3);
  var population = 0;
  am5.array.each(countries, function(country) {
    population += country.population;
    country.settings = { fill: countryColor };
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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
