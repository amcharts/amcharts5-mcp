---
title: "Force-Directed Tree with Animated Bullets"
source: "https://www.amcharts.com/demos/force-directed-tree-with-animated-bullets/"
category: "hierarchy"
scraped: "2026-10-08"
---

A force-directed tree with arrows running along every link, from parent to child, to show that something flows. Here, power flows from a plant through four substations to the city’s districts, sized by their demand.

When moving arrows help: Arrows that keep moving show direction better than any arrowhead: the eye follows them from the source outward. They suit networks where something travels, like power, goods, money or data, and they make a diagram feel alive on a screen.

Good for:
- Power, water or data networks
- Supply chains and deliveries
- Explaining how a system works, on a screen

Think twice when:
- Printed pages: the motion is lost
- Large trees: dozens of arrows turn into noise
- Flows whose size matters: a Sankey diagram shows how much goes where

Prompt: Create a force-directed tree of a city’s power network: a power plant feeds four substations, which feed districts sized by their demand in megawatts. Arrows travel along every link from parent to child, over and over, and clicking a substation folds or unfolds its districts. Use the amCharts 5 library with its Responsive theme.

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

var chart = root.container.children.push(
  am5.SerialChartContainer.new(root, {
    width: am5.p100, // fills the whole chart area
    height: am5.p100
  })
);

// the mouse wheel and a pinch zoom the tree; ZoomTools adds zoom buttons
chart.zoomableContainer.setAll({
  wheelable: true,
  pinchZoom: true
});

var zoomTools = chart.set("zoomTools", am5.ZoomTools.new(root, {}));

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = chart.series.push(am5hierarchy.ForceDirected.new(root, {
  singleBranchOnly: false,
  downDepth: 1,    // a click opens one more level
  // open every level on load (10 is more levels than the data has)
  initialDepth: 10,
  nodePadding: 20, // 20px of room around each circle, so neighbors stay about 40px apart
  // node sizes, as a share of the chart's size: the smallest district and the power plant
  minRadius: am5.percent(3),
  maxRadius: am5.percent(10),
  valueField: "value",
  categoryField: "name",
  childDataField: "children"
}));

// The links are drawn opaque
series.links.template.set("strokeOpacity", 1);

// Arrows that run along each link, from parent to child
// https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-link-bullets/
series.linkBullets.push(function(root, source, target) {
  const bullet = am5.Bullet.new(root, {
    locationX: 0.5,   // halfway along the link, until the animation below moves it
    autoRotate: true, // the arrow turns to follow the link's direction
    sprite: am5.Graphics.new(root, {
      fill: source.get("fill"), // in the parent's color
      centerY: am5.percent(50), // centered on its spot on the link
      centerX: am5.percent(50),
      draw: function(display) { // an arrowhead pointing along the link
        display.moveTo(0, -6);
        display.lineTo(16, 0);
        display.lineTo(0, 6);
        display.lineTo(3, 0);
        display.lineTo(0, -6);
      }
    })
  });

  // Location 0 is the parent's end of the link, 1 the child's
  bullet.animate({
    key: "locationX",
    // from a little before one end of the link to a little past the other
    from: -0.1,
    to: 1.1,
    // each arrow keeps its own pace, 1 to 1.5 seconds per trip
    duration: Math.random() * 500 + 1000,
    loops: Infinity,      // over and over
    easing: am5.ease.quad // speeding up along the way
  });

  return bullet;
});

series.labels.template.set("minScale", 0); // labels shrink to fit small circles instead of hiding

// A soft shadow under each circle
series.circles.template.setAll({
  shadowColor: am5.color(0x000000),
  shadowOpacity: 0.3,
  shadowBlur: 6,
  shadowOffsetX: 2,
  shadowOffsetY: 2
});

// Show the demand in tooltips
series.nodes.template.set("tooltipText", "{category}: [bold]{sum} MW[/]");

// Set data: a power plant feeds four substations, which feed the city's districts.
// Values are each district's demand in megawatts.
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
var data = {
  name: "Power plant",
  children: [{
    name: "North",
    children: [
      { name: "Downtown", value: 120 },
      { name: "University", value: 60 },
      { name: "Old Town", value: 45 }
    ]
  }, {
    name: "East",
    children: [
      { name: "Factories", value: 140 },
      { name: "Harbor", value: 80 }
    ]
  }, {
    name: "South",
    children: [
      { name: "Suburbs", value: 90 },
      { name: "Airport", value: 70 },
      { name: "Hospital", value: 35 }
    ]
  }, {
    name: "West",
    children: [
      { name: "Mall", value: 55 },
      { name: "Riverside", value: 50 },
      { name: "Stadium", value: 40 }
    ]
  }]
};

series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]); // start with the root selected, so the whole tree shows

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
