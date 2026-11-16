---
title: "Grid layout of the container"
source: "https://docs.amcharts.com/embeds/v5/grid-layout-of-the-container/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/containers"]
---

A demo from the docs page "Containers" (get_doc(path: "concepts/common-elements/containers")).

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
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root
var root = am5.Root.new("chartdiv");

// Create chart
var chart = root.container.children.push(
  am5.Container.new(root, {
    //layout: root.gridLayout,
    layout: am5.GridLayout.new(root, {
      maxColumns: 3,
      fixedWidthGrid: true
    }),

    width: am5.percent(100),
    height: am5.percent(100),
    background: am5.Rectangle.new(root, {
      stroke: am5.color(0x555555)
    })
  })
);

// Create child elements
function createRectangle(width) {
  var rectangle = chart.children.push(
    am5.Rectangle.new(root, {
      width: width,
      height: width,
      fill: am5.color(0x297373),
      fillOpacity: 0.5,
      stroke: am5.color(0x297373)
    })
  );

  return rectangle;
}

createRectangle(30);
createRectangle(40);
createRectangle(60);
createRectangle(80);

createRectangle(40);
createRectangle(100);
createRectangle(40);
createRectangle(60);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 350px;
  height: 350px;
  margin: 100px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
