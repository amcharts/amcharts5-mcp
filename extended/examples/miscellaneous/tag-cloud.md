---
title: "Tag Cloud"
source: "https://www.amcharts.com/demos/tag-cloud/"
category: "miscellaneous"
scraped: "2026-10-08"
---

Tags sized and colored by weight, each one a link: the languages most used in the 2021 Stack Overflow survey. Click one to open its questions.

When to make a tag cloud: A tag cloud works as a menu as much as a chart: the size and color show what is popular, and a click takes people to it. Color carries the weight a second time, which helps the small words that are hard to compare by size.

Good for:
- Blog tags and topic pages
- Keyword overviews that lead somewhere
- Popularity at a glance

Think twice when:
- Precise shares: a sorted bar chart shows them
- Tags of very similar weight: the cloud looks flat
- Phones: small words are hard to tap

Prompt: Create a tag cloud of the most used programming languages in the 2021 Stack Overflow survey, with a title above it and the words colored by weight so the most used stand out most. Clicking a word opens Stack Overflow’s questions with that tag. Use the amCharts 5 library with its Responsive theme.

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

// Add wrapper container
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {
  width: am5.percent(100), // the container fills the whole chart div
  height: am5.percent(100),
  layout: root.verticalLayout
}));

// Add chart title
var title = chart.children.push(am5.Label.new(root, {
  text: "Most popular languages, Stack Overflow survey 2021",
  fontSize: 20,            // in pixels
  x: am5.percent(50),      // centered across the top...
  centerX: am5.percent(50) // ...measured from the title's own center
}));
// put the title first in the container, above the word cloud
chart.children.moveValue(title, 0);

// Add series
// https://www.amcharts.com/docs/v5/charts/word-cloud/
var series = chart.series.push(am5wc.WordCloud.new(root, {
  categoryField: "tag",
  valueField: "weight", // the share of developers, which sets each word's size
  calculateAggregates: true // this is needed for heat rules to work
}));

// Set up heat rules: shades of the theme's first color, the more used a language, the more it stands out
// https://www.amcharts.com/docs/v5/charts/word-cloud/#Via_heat_rules
var color = am5.ColorSet.new(root, {}).getIndex(0); // the theme's first color
series.set("heatRules", [{
  target: series.labels.template,
  dataField: "value", // colored by the word's value, the weight
  min: color, // the least used language in the theme's first color...
  // ...the most used halfway from it to the text color: darker on a light background, lighter on a dark one
  max: am5.Color.interpolate(0.5, color, root.interfaceColors.get("text")),
  key: "fill" // the setting the rule changes: the text color
}]);

// Configure labels
series.labels.template.setAll({
  paddingTop: 5, // a little space around each word, so they don't touch
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 5,
  fontFamily: "Courier New", // a monospace font, like code
  cursorOverStyle: "pointer" // a hand cursor shows the words are links
});

// Add click event on words
// https://www.amcharts.com/docs/v5/charts/word-cloud/#Events
series.labels.template.events.on("click", function(ev) {
  const dataContext = ev.target.dataItem.dataContext;
  // the word's Stack Overflow tag: its own "link" where the name isn't one, the name otherwise
  const tag = dataContext.link || ev.target.dataItem.get("category");
  window.open("https://stackoverflow.com/questions/tagged/" + encodeURIComponent(tag));
});

// Data from:
// https://insights.stackoverflow.com/survey/2021#section-most-popular-technologies-programming-scripting-and-markup-languages
// "link" is the Stack Overflow tag for the words whose name isn't one
series.data.setAll([
  { tag: "JavaScript", weight: 64.96 },
  { tag: "HTML/CSS", weight: 56.07, link: "html" },
  { tag: "Python", weight: 48.24 },
  { tag: "SQL", weight: 47.08 },
  { tag: "Java", weight: 35.35 },
  { tag: "Node.js", weight: 33.91 },
  { tag: "TypeScript", weight: 30.19 },
  { tag: "C#", weight: 27.86 },
  { tag: "Bash/Shell", weight: 27.13, link: "bash" },
  { tag: "C++", weight: 24.31 },
  { tag: "PHP", weight: 21.98 },
  { tag: "C", weight: 21.01 },
  { tag: "PowerShell", weight: 10.75 },
  { tag: "Go", weight: 9.55 },
  { tag: "Kotlin", weight: 8.32 },
  { tag: "Rust", weight: 7.03 },
  { tag: "Ruby", weight: 6.75 },
  { tag: "Dart", weight: 6.02 },
  { tag: "Assembly", weight: 5.61 },
  { tag: "Swift", weight: 5.1 },
  { tag: "R", weight: 5.07 },
  { tag: "VBA", weight: 4.66 },
  { tag: "Matlab", weight: 4.66 },
  { tag: "Groovy", weight: 3.01 },
  { tag: "Objective-C", weight: 2.8 },
  { tag: "Scala", weight: 2.6 },
  { tag: "Perl", weight: 2.46 },
  { tag: "Haskell", weight: 2.12 },
  { tag: "Delphi", weight: 2.1 },
  { tag: "Clojure", weight: 1.88 },
  { tag: "Elixir", weight: 1.74 },
  { tag: "LISP", weight: 1.33 },
  { tag: "Julia", weight: 1.29 },
  { tag: "F#", weight: 0.97 },
  { tag: "Erlang", weight: 0.79 },
  { tag: "APL", weight: 0.65 },
  { tag: "Crystal", weight: 0.56, link: "crystal-lang" },
  { tag: "COBOL", weight: 0.53 },
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
