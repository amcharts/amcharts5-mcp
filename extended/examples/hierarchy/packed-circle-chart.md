---
title: "Packed Circle Chart"
source: "https://www.amcharts.com/demos/packed-circle-chart/"
category: "hierarchy"
scraped: "2026-10-08"
---

A packed circle chart nests circles inside circles, each sized by its value. Here, one listener’s year of music: 1,000 hours, grouped by genre and style.

When packed circles work: Packed circles show sizes and groups at the same time: the big circles stand out, and the nesting shows what belongs together. People judge areas less precisely than lengths, so they make a striking overview rather than a ranking.

Good for:
- Time, money or votes split by group and item
- An overview where the biggest items should stand out
- Groups of very different size

Think twice when:
- Exact comparisons: a bar chart ranks values better
- Using all the space: a treemap fills the rectangle
- Values close in size: the circles look alike

Prompt: Create a packed circle chart of one listener’s year of music in hours, with each genre holding its styles, and a legend of the genres that can hide them. Clicking a genre zooms into it, and clicking it again zooms back out. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Only the styles are labeled: a genre's name would sit behind its styles,
// so the genres are named in the legend instead
var myTheme = am5.Theme.new(root);

myTheme.rule("Label", ["pack", "node", "depth0"]).set("forceHidden", true);
myTheme.rule("Label", ["pack", "node", "depth1"]).set("forceHidden", true);

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);

// Create wrapper container
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {
  width: am5.percent(100),    // full width...
  height: am5.percent(100),   // ...and height
  layout: root.verticalLayout // the circles and the legend stacked top to bottom
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = chart.series.push(am5hierarchy.Pack.new(root, {
  singleBranchOnly: false, // other branches stay open when one opens
  // every level opens at once: 10 is more levels than the data has
  downDepth: 10,
  initialDepth: 10,
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  legendValueText: "{sum} h" // the legend shows each genre's total hours
}));

// Hours; {sum} adds up a genre's styles
series.nodes.template.set("tooltipText", "{category}: [bold]{sum} hours[/]");

// Set data: one listener's year of music, 1,000 hours by genre and style
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
series.data.setAll([{
  name: "Music",
  children: [{
    name: "Rock",
    children: [
      { name: "Indie", value: 120 },
      { name: "Classic rock", value: 80 },
      { name: "Punk", value: 35 },
      { name: "Metal", value: 25 }
    ]
  }, {
    name: "Pop",
    children: [
      { name: "Synth-pop", value: 90 },
      { name: "Dance", value: 70 },
      { name: "K-pop", value: 40 }
    ]
  }, {
    name: "Electronic",
    children: [
      { name: "House", value: 85 },
      { name: "Ambient", value: 60 },
      { name: "Techno", value: 45 }
    ]
  }, {
    name: "Hip-hop",
    children: [
      { name: "Lo-fi", value: 60 },
      { name: "Trap", value: 50 },
      { name: "Boom bap", value: 40 }
    ]
  }, {
    name: "Jazz",
    children: [
      { name: "Swing", value: 30 },
      { name: "Bebop", value: 25 },
      { name: "Fusion", value: 20 }
    ]
  }, {
    name: "Classical",
    children: [
      { name: "Baroque", value: 40 },
      { name: "Romantic", value: 35 }
    ]
  }, {
    name: "Folk",
    children: [
      { name: "Americana", value: 30 },
      { name: "Celtic", value: 20 }
    ]
  }]
}]);

series.set("selectedDataItem", series.dataItems[0]); // start with the root selected, so everything shows

// Legend of the genres: click one to hide it
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Legend
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50), // the legend's middle...
  x: am5.percent(50)        // ...at the middle of the chart's width
}));

legend.data.setAll(series.dataItems[0].get("children")); // one legend item per genre

// Make stuff animate on load
series.appear(1000, 100);
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
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
