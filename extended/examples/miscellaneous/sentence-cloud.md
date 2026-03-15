---
title: "Sentence cloud"
source: "https://www.amcharts.com/demos/sentence-cloud/"
category: "miscellaneous"
scraped: "2026-03-15"
---

A sentence cloud, also referred to as a sentence visualization or sentence collage, is a textual representation that visualizes sentences or short phrases from a body of text. Instead of focusing on individual words like a word cloud, a sentence cloud emphasizes complete sentences or meaningful sentence fragments.
Word cloud

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


// Add series
// https://www.amcharts.com/docs/v5/charts/word-cloud/
var series = root.container.children.push(am5wc.WordCloud.new(root, {
  maxCount: 100,
  minWordLength: 2,
  minFontSize: am5.percent(6),
  maxFontSize: am5.percent(8),
  angles: [0]
}));

var colorSet = am5.ColorSet.new(root, { step: 1 });

// Configure labels
series.labels.template.setAll({
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 5,
  fontFamily: "Courier New"
});

series.labels.template.setup = function(label) {
  label.set("background", am5.RoundedRectangle.new(root, { fillOpacity: 1, fill: colorSet.next() }))
}



series.data.setAll([
  { category: "Lorem ipsum
dolorsit amet,
consectetur", value: 2.1 },
  { category: "Sed do eiusmod
tempor incididunt
ut labore et", value: 2.2 },
  { category: "Duis aute irure
dolor in
reprehenderit", value: 2.3 },
  { category: "Voluptate velit
esse cillum dolore
eu fugiat nulla", value: 2.1 },
  { category: "Excepteur sint
occaecat cupidatat
non proident", value: 2.2 },
  { category: "Nupidatat non proident", value: 2 },
  { category: "Incididunt ut labore et", value: 2.5 },
  { category: "Voluptate velit
cillum dolore eu nulla", value: 2.1 }])
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
- https://cdn.amcharts.com/lib/5/wc.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
