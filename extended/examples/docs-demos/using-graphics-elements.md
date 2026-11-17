---
title: "Using graphics elements"
source: "https://docs.amcharts.com/embeds/v5/using-graphics-elements/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/graphics"]
---

A demo from the docs page "Graphics" (get_doc(path: "concepts/common-elements/graphics")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    svgPath:
      "M45.418 10c-2.293-2.5-5.625-3.957-8.961-4.168h-.414c-4.168 0-7.918 2.086-10.418 5.418-2.293-4.375-6.668-7.082-11.457-7.082h-.211c-3.539 0-7.082 1.457-9.375 4.164-2.5 2.5-3.75 6.043-3.539 9.586C1.457 24.168 4.582 27.293 7.5 30c3.332 3.332 6.457 6.043 5.418 13.957 0 1.25.625 2.086 1.664 2.086.418 0 .625 0 1.25-.211C37.5 39.168 48.957 30.207 48.957 20.207V20c.211-3.957-1.039-7.293-3.539-10ZM14.582 44.793V43.75Zm0 0"
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
