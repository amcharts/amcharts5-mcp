---
title: "Complex Venn Diagram"
source: "https://www.amcharts.com/demos/complex-venn-diagram/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A Venn diagram with four circles for coffee’s ingredients, and the drinks where they overlap: espresso and milk make a flat white, espresso and water an Americano, espresso, milk and foam a cappuccino or a latte.

When to draw a bigger Venn diagram: A Venn diagram with several circles shows which combinations exist, not just how two groups overlap: here, which ingredients make which drink. Up to four circles stay readable; beyond that, some overlaps can’t be drawn with circles at all.

Good for:
- Recipes, skills or features and their combinations
- Showing which overlaps exist and which don’t
- Explaining a classification

Think twice when:
- Five or more groups: an UpSet-style bar chart works better
- Exact overlap sizes: circles only approximate them
- Long names: the small areas have no room for them

Prompt: Create a Venn diagram of coffee drinks and their ingredients: circles for milk, milk foam, espresso and water, whose overlaps are drinks such as flat white, macchiato, cappuccino and americano. Color the areas in coffee tones and outline the area under the pointer. Use the Animated and Responsive themes and the amCharts 5 library.

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create wrapper container
var chart = root.container.children.push(
  am5.SerialChartContainer.new(root, {
    width: am5.p100, // the container fills the whole chart area
    height: am5.p100,
    layout: root.verticalLayout
  })
);

// Create venn series
var series = chart.series.push(
  am5venn.Venn.new(root, {
    categoryField: "name",
    valueField: "value",
    // a row with a "sets" list is the overlap of the circles it names
    intersectionsField: "sets",
    paddingTop: 40, // 40px of room around the circles
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40
  })
);

// Set tooltip content. The outlines are in the background color, but hidden: the areas meet edge to edge
series.slices.template.setAll({
  tooltipText: "{category}",     // the area's name
  stroke: root.interfaceColors.get("background"),
  strokeWidth: 3,
  strokeOpacity: 0,
  templateField: "sliceSettings" // each area's fill from its sliceSettings
});

// Dark labels on the light areas, white on espresso (in labelSettings), whatever the theme
series.labels.template.setAll({
  textAlign: "center",           // two-line names centered
  fill: am5.color(0x2b1a10),
  templateField: "labelSettings" // a label color from labelSettings, where a row has one
});

// Set up hover appearance: a dashed outline in a color that shows on the light areas and on espresso
series.hoverGraphics.setAll({
  strokeDasharray: [3, 3],
  stroke: am5.color(0xe8743b),
  strokeWidth: 3
});

// Set data
series.data.setAll([
  { name: "Milk", value: 10, sliceSettings: { fill: am5.color(0xcecbc6) }  },
  { name: "Milk foam", value: 10, sliceSettings: { fill: am5.color(0xd1d0ce) }  },
  { name: "Espresso", value: 20, sliceSettings: { fill: am5.color(0x441702) }, labelSettings: { fill: am5.color(0xffffff) } },
  { name: "Water", value: 8, sliceSettings: { fill: am5.color(0xbbcdd7) }  },
  // milk and foam alone make no drink: no label and no tooltip for their overlap
  { name: "", value: 2, sets: ["Milk", "Milk foam"], sliceSettings: { fill: am5.color(0xd2d2d2), tooltipText: "" }  },
  { name: "Flat white", value: 4, sets: ["Milk", "Espresso"], sliceSettings: { fill: am5.color(0xa18b80) }  },
  { name: "Macchiato", value: 4, sets: ["Milk foam", "Espresso"], sliceSettings: { fill: am5.color(0xaba09c) }  },
  { name: "Cappuccino\nLatte", value: 2, sets: ["Milk", "Milk foam", "Espresso"], sliceSettings: { fill: am5.color(0xd1d0ce) }  },
  { name: "Americano", value: 4, sets: ["Water", "Espresso"], sliceSettings: { fill: am5.color(0xa2a19f) }  }
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
- https://cdn.amcharts.com/lib/5/venn.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
