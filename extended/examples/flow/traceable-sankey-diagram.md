---
title: "Traceable Sankey Diagram"
source: "https://www.amcharts.com/demos/traceable-sankey-diagram/"
category: "flow"
scraped: "2026-03-15"
---

Traceable Sankey Diagram is a specific version of the regular Sankey Diagram enabling viewers to see the whole path of some data by hovering over the chart.
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
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    paddingRight: 50,
    idField: "id"
  })
);

series.links.template.setAll({ fillStyle: "solid", fillOpacity: 0.15 });

// highlight all links with the same id beginning
series.links.template.events.on("pointerover", function (event) {
  var dataItem = event.target.dataItem;
  var id = dataItem.get("id").split("-")[0];

  am5.array.each(series.dataItems, function (dataItem) {
    if (dataItem.get("id").indexOf(id) != -1) {
      dataItem.get("link").hover();
    }
  });
});

series.links.template.events.on("pointerout", function (event) {
  am5.array.each(series.dataItems, function (dataItem) {
    dataItem.get("link").unhover();
  });
});

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
  { from: "A", to: "E", value: 1, id: "A0-0" },
  { from: "A", to: "F", value: 1, id: "A1-0" },
  { from: "A", to: "G", value: 1, id: "A2-0" },

  { from: "B", to: "E", value: 1, id: "B0-0" },
  { from: "B", to: "F", value: 1, id: "B1-0" },
  { from: "B", to: "G", value: 1, id: "B2-0" },

  { from: "C", to: "F", value: 1, id: "C0-0" },
  { from: "C", to: "G", value: 1, id: "C1-0" },
  { from: "C", to: "H", value: 1, id: "C2-0" },

  { from: "D", to: "E", value: 1, id: "D0-0" },
  { from: "D", to: "F", value: 1, id: "D1-0" },
  { from: "D", to: "G", value: 1, id: "D2-0" },
  { from: "D", to: "H", value: 1, id: "D3-0" },

  { from: "E", to: "I", value: 1, id: "A0-1" },
  { from: "E", to: "I", value: 1, id: "B0-1" },
  { from: "E", to: "L", value: 1, id: "D0-1" },

  { from: "F", to: "I", value: 1, id: "A1-1" },
  { from: "F", to: "I", value: 1, id: "C0-1" },
  { from: "F", to: "I", value: 1, id: "D1-1" },
  { from: "F", to: "M", value: 1, id: "B1-1" },

  { from: "G", to: "I", value: 1, id: "A2-1" },
  { from: "G", to: "I", value: 1, id: "B2-1" },
  { from: "G", to: "J", value: 1, id: "C1-1" },
  { from: "G", to: "N", value: 1, id: "D2-1" },

  { from: "H", to: "K", value: 1, id: "C2-1" },
  { from: "H", to: "N", value: 1, id: "D3-1" },

  { from: "I", to: "O", value: 1, id: "A0-2" },
  { from: "I", to: "O", value: 1, id: "B2-2" },
  { from: "I", to: "Q", value: 1, id: "A1-2" },
  { from: "I", to: "R", value: 1, id: "A2-2" },
  { from: "I", to: "S", value: 1, id: "D1-2" },
  { from: "I", to: "T", value: 1, id: "B0-2" },
  { from: "I", to: "Q", value: 1, id: "C0-2" },

  { from: "J", to: "U", value: 1, id: "C1-2" },

  { from: "K", to: "V", value: 1, id: "C2-2" },
  { from: "M", to: "U", value: 1, id: "B1-2" },

  { from: "N", to: "Q", value: 1, id: "D2-2" },
  { from: "N", to: "Q", value: 1, id: "D3-2" },

  { from: "L", to: "W", value: 1, id: "D0-2" }
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
  height: 500px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
