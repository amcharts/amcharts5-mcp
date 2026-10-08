---
title: "Venn Diagram with Patterns"
source: "https://www.amcharts.com/demos/venn-diagram-with-patterns/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A Venn diagram draws each group as a circle, and the overlap holds what belongs to both. Here, a joke in black and white: a polar bear and a black bear overlap in a panda, filled with a dot pattern.

When to fill with patterns: Patterns tell areas apart without color: they survive black-and-white printing, help people who can’t tell some colors apart, and can carry meaning of their own, like the panda’s spots. Keep them few and simple, so they don’t buzz.

Good for:
- Print and photocopies
- Readers with color vision deficiency
- Overlaps that should look like a mix of both groups

Think twice when:
- Many areas: too many patterns get busy
- Small areas: the pattern has no room to show
- Exact sizes: a Venn diagram only approximates the overlaps

Prompt: Create a black and white Venn diagram joke: a white "Polar bear" circle and a black "Black bear" circle overlap in "Panda", filled with a pattern of white dots on black. Outline the area under the pointer with a dashed line. Use the Animated and Responsive themes and the amCharts 5 library.

## JavaScript

```javascript
// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create wrapper container
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {
  width: am5.p100, // the container fills the whole chart div
  height: am5.p100,
  layout: root.verticalLayout
}));

// Create venn series
var series = chart.series.push(am5venn.Venn.new(root, {
  categoryField: "name",
  valueField: "value",
  intersectionsField: "sets", // an overlap lists, in "sets", the circles it belongs to
  paddingTop: 40,             // 40px of room on every side
  paddingBottom: 40,
  paddingLeft: 40,
  paddingRight: 40
}));

// the panda overlap's fill: white dots on black, every second dot left out for a checkered look
var pattern = am5.CirclePattern.new(root, {
  fill: am5.color(0x000000),  // black background...
  color: am5.color(0xffffff), // ...with white dots
  radius: 10,                 // dots with a 10px radius...
  gap: 10,                    // ...10px apart
  checkered: true
})

// Outlines in the theme's text color: black on a white page, white on a dark one, so the black circle never
// disappears into the background
series.slices.template.setAll({
  templateField: "sliceSettings", // each circle takes its fill from the data
  stroke: root.interfaceColors.get("text"),
  strokeWidth: 1 // 1px outlines
});
series.labels.template.set("fill", am5.color(0xffffff)); // white text, on the black boxes below
// setup runs for each new label: here it gives every label its own black rounded box
series.labels.template.setup = function(target) {
  target.set("background", am5.RoundedRectangle.new(root, {
    stroke: am5.color(0xffffff), // a white outline, so the box shows on the black circle
    fill: am5.color(0x000000),
    cornerRadiusTL: 5, // rounded corners
    cornerRadiusTR: 5,
    cornerRadiusBL: 5,
    cornerRadiusBR: 5,
    fillOpacity: 1 // solid
  }));
}

// Set data
series.data.setAll([{
	name: "Polar bear",
	value: 100,
	sliceSettings: {
		fill: am5.color(0xFFFFFF)
	}
}, {
	name: "Black bear",
	value: 100,
	sliceSettings: {
		fill: am5.color(0x000000)
	}
}, {
	name: "Panda",
	value: 30,
	sets: ["Polar bear", "Black bear"],
	sliceSettings: {
		fillPattern: pattern
	}
}]);

// Set up hover appearance: a dashed outline in a color that shows on white, black and the dots
series.hoverGraphics.setAll({
  strokeDasharray: [3, 3], // 3px dashes with 3px gaps
  stroke: am5.color(0xe8743b),
  strokeWidth: 3 // 3px wide
});
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
