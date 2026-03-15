---
title: "Vertical Sankey Diagram"
source: "https://www.amcharts.com/demos/vertical-sankey-diagram/"
category: "flow"
scraped: "2026-03-15"
---

Sankey diagram is a perfect chart to show the flow and relation between stages of a process. Horizontal orientation is more common for Sankey diagrams but with amCharts you can create vertical diagrams just as easily.
Key implementation details
Sankey diagram is included in the flow amCharts module. To make the diagram vertical you just need to set its orientation property to "vertical".
Flow charts
Sankey diagram

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create series
// https://www.amcharts.com/docs/v5/charts/flow-charts/
var series = root.container.children.push(
  am5flow.Sankey.new(root, {
    orientation: "vertical",
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    maxWidth: 800
  })
);

series.nodes.nodes.template.setAll({
  toggleKey:"none",
  cursorOverStyle:"default"
})

series.nodes.rectangles.template.setAll({
  fillOpacity: 0,
  strokeOpacity: 0
});

series.links.template.setAll({
  tooltipText: null,
  templateField: "linkSettings",
  fillOpacity: 1,
  strokeOpacity: 1,
  interactive: true
});
series.links.template.states.create("hover", { fillOpacity: 1 });
series.nodes.labels.template.setAll({
  forceHidden: true,
  templateField: "labelSettings"
});

series.nodes.data.setAll([
  { id: "Source", fill: am5.color(0x5ea9e1) },
  { id: "Total non financial companies", fill: am5.color(0x5ea9e1) },
  { id: "Non-tech companies", fill: am5.color(0x5ea9e1) },
  { id: "Tech companies", fill: am5.color(0x5ea9e1) },
  {
    id: "Cash in the U.S.",
    fill: am5.color(0x00aea0),
    labelSettings: {
      text: "CASH IN THE U.S.
[bold]$460 BILLION",
      forceHidden: false,
      centerY: am5.p100
    }
  },
  {
    id: "Cash Overseas",
    fill: am5.color(0x000000),
    labelSettings: {
      text:
        "[#5ea9e1 fontSize:1.5em]CASH OVERSEAS
[bold #5ea9e1 fontSize:1.5em]$1,31 TRILLION",
      fill: am5.color(0xffffff),
      forceHidden: false,
      centerY: am5.p100
    }
  },
  { id: "Rest of tech", fill: am5.color(0x5ea9e1) },
  { id: "Top 5 tech companies", fill: am5.color(0x5ea9e1) },
  { id: "Joytechs", fill: am5.color(0x5ea9e1) },
  { id: "Fireex", fill: am5.color(0x5ea9e1) },
  { id: "Globalworld", fill: am5.color(0x5ea9e1) },
  { id: "Betagate", fill: am5.color(0x5ea9e1) },
  { id: "Apexi", fill: am5.color(0x5ea9e1) }
]);

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 0.5,
    sprite: am5.Label.new(root, {
      templateField: "labelSettings",
      textAlign: "center",
      centerY: am5.p50,
      paddingTop: 0,
      paddingBottom: 0
    })
  });
});

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 1,
    sprite: am5.Label.new(root, {
      templateField: "labelSettings2",
      textAlign: "left",
      centerY: am5.p50,
      paddingTop: 0,
      paddingBottom: 0
    })
  });
});

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
  {
    from: "Source",
    to: "Total non financial companies",
    value: 1768,
    labelSettings: {
      text:
        "[fontSize:1.5em]2016 BREAKDOWN OF
THE U.S.CORPORATE CASH PILE
 
[/]NON-FINANCIAL COMPANIES 
 [bold]$1,768 Trillion[/]",
      rotation: 0
    }
  },

  {
    from: "Total non financial companies",
    to: "Non-tech companies",
    value: 907,
    labelSettings: { text: "NON-TECH COMPANIES
 [bold]$907 Billion[/]" }
  },
  {
    from: "Total non financial companies",
    to: "Tech companies",
    value: 861,
    labelSettings: { text: "TECH COMPANIES
 [bold]861 Billion[/]" }
  },

  { from: "Non-tech companies", to: "Cash in the U.S.", value: 324 },
  { from: "Non-tech companies", to: "Cash Overseas", value: 584 },

  {
    from: "Tech companies",
    to: "Rest of tech",
    value: 274,
    labelSettings: { text: "REST OF TECH
[bold]$274 Billion[/]" }
  },
  {
    from: "Tech companies",
    to: "Top 5 tech companies",
    value: 587,
    labelSettings: { text: "TOP 5 TECH COMPANIES
[bold]$587 Billion[/]" }
  },

  { from: "Rest of tech", to: "Cash in the U.S.", value: 74 },
  { from: "Rest of tech", to: "Cash Overseas", value: 200 },

  {
    from: "Top 5 tech companies",
    to: "Joytechs",
    value: 67,
    labelSettings2: {
      dy: -70,
      centerX: am5.p100,
      rotation: -90,
      text: "JOYTECHS [bold]$67[/]B"
    }
  },
  { from: "Joytechs", to: "Cash in the U.S.", value: 10 },
  { from: "Joytechs", to: "Cash Overseas", value: 57 },

  {
    from: "Top 5 tech companies",
    to: "Fireex",
    value: 68,
    labelSettings2: {
      dy: -70,
      centerX: am5.p100,
      rotation: -90,
      text: "FIREEX [bold]$68[/]B"
    }
  },
  { from: "Fireex", to: "Cash in the U.S.", value: 8 },
  { from: "Fireex", to: "Cash Overseas", value: 60 },

  {
    from: "Top 5 tech companies",
    to: "Globalworld",
    value: 85,
    labelSettings2: {
      dy: -70,
      centerX: am5.p100,
      rotation: -90,
      text: "GLOBALWORLD [bold]$85[/]B"
    }
  },
  { from: "Globalworld", to: "Cash in the U.S.", value: 10 },
  { from: "Globalworld", to: "Cash Overseas", value: 75 },

  {
    from: "Top 5 tech companies",
    to: "Betagate",
    value: 115,
    labelSettings2: {
      dy: -70,
      centerX: am5.p100,
      rotation: -90,
      text: "BETAGATE [bold]$115[/]B"
    }
  },
  { from: "Betagate", to: "Cash in the U.S.", value: 10 },
  { from: "Betagate", to: "Cash Overseas", value: 105 },

  {
    from: "Top 5 tech companies",
    to: "Apexi",
    value: 253,
    labelSettings2: {
      dy: -70,
      centerX: am5.p100,
      rotation: -90,
      text: "APEXI [bold]$253[/]B"
    }
  },
  { from: "Apexi", to: "Cash in the U.S.", value: 23 },
  { from: "Apexi", to: "Cash Overseas", value: 230 }
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
  width: 800px;
  height: 800px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
