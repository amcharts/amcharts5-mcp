---
title: "Sentence Cloud"
source: "https://www.amcharts.com/demos/sentence-cloud/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A word cloud of whole phrases, each in its own colored box and sized by how often it comes up. Here, what a café’s customers say most in their reviews.

When to cloud whole sentences: Single words lose their meaning out of context: "line" or "loud" say little alone. Short phrases keep it, and their boxes make each one easy to pick out. It works for a handful of phrases, such as the themes found in reviews or a survey.

Good for:
- Themes from reviews or surveys
- Quotes for a slide or poster
- A handful of short phrases

Think twice when:
- Dozens of phrases: a list sorted by count reads faster
- Long sentences: they turn into blocks of text
- Exact counts: show them in a bar chart

Prompt: Create a sentence cloud of what a café’s customers say in their reviews: eight short phrases sized by how many reviews mention each, all level, on rounded boxes in different colors that never overlap. Use the Animated and Responsive themes and the amCharts 5 library.

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

// Add series
// https://www.amcharts.com/docs/v5/charts/word-cloud/
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {}));

var series = chart.series.push(am5wc.WordCloud.new(root, {
  minFontSize: am5.percent(6), // the smallest text: 6% of the chart's shorter side...
  maxFontSize: am5.percent(8), // ...the biggest 8%, so even the longest sentences fit
  // every sentence stays horizontal
  angles: [0],
  // pack whole boxes, so a sentence's colored box never slides into the gaps of another
  allowNesting: false
}));

var colorSet = am5.ColorSet.new(root, { step: 1 }); // a color set that hands out its colors one by one

// Configure labels
series.labels.template.setAll({
  paddingTop: 5,             // 5px of colored box around the text on each side
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 5,
  fontFamily: "Courier New", // a typewriter font
  tooltipText: "Said in {value} reviews" // hover a sentence for how many reviews said it
});

// setup runs once for each new label: it gets a box in the next color of the set
series.labels.template.setup = function(label) {
  label.set("background", am5.RoundedRectangle.new(root, { fillOpacity: 1, fill: colorSet.next() }))
}

// What a café's customers say in their reviews, and in how many: the more often, the bigger
series.data.setAll([
  { category: "Best flat white\nin town", value: 64 },
  { category: "Friendly staff\nwho remember\nyour order", value: 52 },
  { category: "Long line on\nweekend mornings", value: 47 },
  { category: "Pastries sell out\nby noon", value: 45 },
  { category: "Cozy corner\nto work in", value: 38 },
  { category: "Great place\nto meet friends", value: 36 },
  { category: "Fair prices", value: 31 },
  { category: "Music a bit\ntoo loud", value: 27 }
]);
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
- https://cdn.amcharts.com/lib/5/wc.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
