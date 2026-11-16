---
title: "Using graphics elements"
source: "https://docs.amcharts.com/embeds/v5/using-graphics-elements-2/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/graphics"]
---

A demo from the docs page "Graphics" (get_doc(path: "concepts/common-elements/graphics")).

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
    width: am5.percent(100),
    height: am5.percent(100)
  })
);

chart.children.push(
  am5.Graphics.new(root, {
    stroke: am5.color(0x000000),
    fill: am5.color(0x990000),
    x: am5.percent(50),
    y: am5.percent(50),
    centerX: am5.percent(50),
    centerY: am5.percent(50),
    draw: function (display) {
      display.moveTo(25, 0);
      display.lineTo(50, 50);
      display.lineTo(0, 50);
      display.lineTo(25, 0);
    }
  })
);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 92vh;
  margin: auto;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
