---
title: "Complex Venn Diagram"
source: "https://www.amcharts.com/demos/complex-venn-diagram/"
category: "miscellaneous"
scraped: "2026-03-15"
---

A Venn diagram is a visual representation that uses overlapping circles or ellipses to illustrate the relationships and commonalities between different sets or groups of items. Each circle represents a set, and the overlapping regions depict the intersections or shared elements between the sets. The size of each circle is typically proportional to the number of elements or the significance of the set it represents. Venn diagrams are widely used in various fields, including mathematics, logic, statistics, and data analysis, to visually depict and analyze the relationships, similarities, and differences between different categories or entities. They provide a clear and intuitive way to understand set relationships and aid in identifying commonalities and distinctions among the items being compared.
Venn diagram

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([
  am5themes_Animated.new(root)
]);

// Create wrapper container
var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100,
    layout: root.verticalLayout
  })
);

// Create venn series
var chart = container.children.push(
  am5venn.Venn.new(root, {
    categoryField: "name",
    valueField: "value",
    intersectionsField: "sets",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40
  })
);


// Set tooltip content
chart.slices.template.setAll({
  tooltipText: "{category}",
  strokeOpacity: 0,
  templateField: "sliceSettings"
});

chart.labels.template.setAll({
  textAlign: "center",
  templateField: "labelSettings"
});

// Set up hover appearance
chart.hoverGraphics.setAll({
  strokeDasharray: [3, 3],
  stroke: am5.color(0xffffff),
  strokeWidth: 2
});

// Set data
chart.data.setAll([
  { name: "Milk", value: 10, sliceSettings: { fill: am5.color(0xcecbc6) }  },
  { name: "Milk foam", value: 10, sliceSettings: { fill: am5.color(0xd1d0ce) }  },
  { name: "Espresso", value: 20, sliceSettings: { fill: am5.color(0x441702) }, labelSettings: { fill: am5.color(0xffffff) } },
  { name: "Water", value: 8, sliceSettings: { fill: am5.color(0xbbcdd7) }  },
  { name: "", value: 2, sets: ["Milk", "Milk foam"], sliceSettings: { fill: am5.color(0xd2d2d2), tooltipText: "" }  },
  { name: "Flat white", value: 4, sets: ["Milk", "Espresso"], sliceSettings: { fill: am5.color(0xa18b80) }  },
  { name: "Macchiato", value: 4, sets: ["Milk foam", "Espresso"], sliceSettings: { fill: am5.color(0xaba09c) }  },
  { name: "Cappucino
Latte", value: 2, sets: ["Milk", "Milk foam", "Espresso"], sliceSettings: { fill: am5.color(0xd1d0ce) }  },
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
  height: 550px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/venn.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
