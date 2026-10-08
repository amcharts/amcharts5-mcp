---
title: "Vertical Sankey Diagram"
source: "https://www.amcharts.com/demos/vertical-sankey-diagram/"
category: "flow"
scraped: "2026-10-08"
---

A Sankey diagram that runs from top to bottom instead of left to right. Here, an example of how $1.77 trillion of company cash splits by industry, and how much of it is held overseas.

When to go vertical: A vertical Sankey reads like a page: the total at the top, splitting step by step into smaller parts below. It suits reports and infographics, and the wide bands have room for labels inside them, so the chart needs no legend.

Good for:
- Infographics and reports that read top down
- A total broken down step by step
- Labels that sit right on the bands

Think twice when:
- Many stages: each row gets shorter and the labels stop fitting
- Wide, short spaces like a dashboard row: go horizontal
- Exact comparisons between the end values: add a bar chart

Prompt: Create a vertical Sankey diagram of an example breakdown of company cash, from all non-financial companies down to the five biggest tech companies, ending as cash in the U.S. or overseas. Hide the nodes, give the bands a gradient, and put the labels on the bands. Use the Animated and Responsive themes and the amCharts 5 library.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

// Create a container for the series
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {}));

// Create series
// https://www.amcharts.com/docs/v5/charts/flow-charts/
var series = chart.series.push(
  am5flow.Sankey.new(root, {
    orientation: "vertical", // the money flows from top to bottom
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    // narrow gaps keep the bands of the five companies straight enough for their labels
    nodePadding: 5,
    // room for the labels above the first node and below the last ones
    paddingTop: 30,
    paddingBottom: 45
  })
);

// Nodes are hidden: the bands themselves make the picture
series.nodes.nodes.template.setAll({
  // clicking a node doesn't hide its bands
  toggleKey: "none",
  cursorOverStyle: "default" // a plain arrow cursor, as the nodes do nothing
});

series.nodes.rectangles.template.setAll({
  fillOpacity: 0,
  strokeOpacity: 0
});

series.links.template.setAll({
  tooltipText: "{sourceId} > {targetId}: [bold]${value}B",
  fillOpacity: 1, // solid bands
  strokeOpacity: 1,
  interactive: true // the bands react to the mouse
});
// a band under the mouse turns slightly see-through
series.links.template.states.create("hover", { fillOpacity: 0.8 });

// Only the first and the last nodes get a label: their own text from the node data
series.nodes.labels.template.setAll({
  forceHidden: true,   // hidden unless the node's labelSettings show it
  textAlign: "center", // each line centered
  templateField: "labelSettings"
});

// Colors from the theme: one for the companies, two more for where the cash is held
var colors = am5.ColorSet.new(root, {});
var companyColor = colors.getIndex(0);

series.nodes.data.setAll([
  {
    id: "Non-financial companies",
    fill: companyColor,
    labelSettings: {
      text: "NON-FINANCIAL COMPANIES: [bold]$1.77 TRILLION[/] IN CASH",
      forceHidden: false,
      centerY: am5.p100, // above the top node...
      paddingBottom: 6   // ...6px clear of it
    }
  },
  { id: "Non-tech companies", fill: companyColor },
  { id: "Tech companies", fill: companyColor },
  {
    id: "Cash in the U.S.",
    fill: colors.getIndex(4), // the bands into it fade to the theme's fifth color
    labelSettings: {
      text: "CASH IN THE U.S.\n[bold]$459 BILLION",
      forceHidden: false,
      centerY: 0,   // below the node...
      paddingTop: 6 // ...6px clear of it
    }
  },
  {
    id: "Cash overseas",
    fill: colors.getIndex(8), // and these to its ninth
    labelSettings: {
      text: "CASH OVERSEAS\n[bold]$1.31 TRILLION",
      forceHidden: false,
      centerY: 0,
      paddingTop: 6
    }
  },
  { id: "Rest of tech", fill: companyColor },
  { id: "Top 5 tech companies", fill: companyColor },
  { id: "Joytechs", fill: companyColor },
  { id: "Fireex", fill: companyColor },
  { id: "Globalworld", fill: companyColor },
  { id: "Betagate", fill: companyColor },
  { id: "Apexi", fill: companyColor }
]);

// the labels on the bands: black or white, whichever stands out on the companies' color
var bandTextColor = am5.Color.alternative(companyColor, am5.color(0xffffff), am5.color(0x000000));

// Labels on the bands, from each link's labelSettings
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 0.5, // halfway along the band
    sprite: am5.Label.new(root, {
      templateField: "labelSettings",
      fill: bandTextColor,
      fontSize: "0.85em",  // 85% of the chart's text size
      textAlign: "center", // each line centered...
      centerX: am5.p50,    // ...on the middle of the band
      centerY: am5.p50,
      paddingTop: 0, // no padding above or below, so the label fits a thin band
      paddingBottom: 0
    })
  });
});

// The five companies' bands are narrow, so their labels are turned to run up the band from each company's node,
// where the band is straight, with the amount on a second line
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 1, // at the end of the band, the company's node
    sprite: am5.Label.new(root, {
      templateField: "companyLabel",
      fill: bandTextColor,
      fontSize: "0.75em", // 75% of the chart's text size
      rotation: -90,      // turned to read upward
      centerX: 0,         // starting at the node, running up the band
      centerY: am5.p50,
      paddingLeft: 5, // 5px from the node
      paddingTop: 0,
      paddingBottom: 0
    })
  });
});

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
  {
    from: "Non-financial companies",
    to: "Non-tech companies",
    value: 907,
    labelSettings: { text: "NON-TECH COMPANIES\n[bold]$907 BILLION" }
  },
  {
    from: "Non-financial companies",
    to: "Tech companies",
    value: 861,
    labelSettings: { text: "TECH COMPANIES\n[bold]$861 BILLION" }
  },

  { from: "Non-tech companies", to: "Cash in the U.S.", value: 324 },
  { from: "Non-tech companies", to: "Cash overseas", value: 583 },

  {
    from: "Tech companies",
    to: "Rest of tech",
    value: 274,
    labelSettings: { text: "REST OF TECH\n[bold]$274 BILLION" }
  },
  {
    from: "Tech companies",
    to: "Top 5 tech companies",
    value: 587,
    labelSettings: { text: "TOP 5 TECH COMPANIES\n[bold]$587 BILLION" }
  },

  { from: "Rest of tech", to: "Cash in the U.S.", value: 74 },
  { from: "Rest of tech", to: "Cash overseas", value: 200 },

  {
    from: "Top 5 tech companies",
    to: "Joytechs",
    value: 67,
    companyLabel: { text: "JOYTECHS\n[bold]$67B" }
  },
  { from: "Joytechs", to: "Cash in the U.S.", value: 10 },
  { from: "Joytechs", to: "Cash overseas", value: 57 },

  {
    from: "Top 5 tech companies",
    to: "Fireex",
    value: 68,
    companyLabel: { text: "FIREEX\n[bold]$68B" }
  },
  { from: "Fireex", to: "Cash in the U.S.", value: 8 },
  { from: "Fireex", to: "Cash overseas", value: 60 },

  {
    from: "Top 5 tech companies",
    to: "Globalworld",
    value: 85,
    companyLabel: { text: "GLOBALWORLD\n[bold]$85B" }
  },
  { from: "Globalworld", to: "Cash in the U.S.", value: 10 },
  { from: "Globalworld", to: "Cash overseas", value: 75 },

  {
    from: "Top 5 tech companies",
    to: "Betagate",
    value: 115,
    companyLabel: { text: "BETAGATE\n[bold]$115B" }
  },
  { from: "Betagate", to: "Cash in the U.S.", value: 10 },
  { from: "Betagate", to: "Cash overseas", value: 105 },

  {
    from: "Top 5 tech companies",
    to: "Apexi",
    value: 252,
    companyLabel: { text: "APEXI\n[bold]$252B" }
  },
  { from: "Apexi", to: "Cash in the U.S.", value: 23 },
  { from: "Apexi", to: "Cash overseas", value: 229 }
]);

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
  height: 700px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
