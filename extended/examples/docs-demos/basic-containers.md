---
title: "Basic containers"
source: "https://docs.amcharts.com/embeds/v5/basic-containers/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/containers"]
---

A demo from the docs page "Containers" (get_doc(path: "concepts/common-elements/containers")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    layout: root.gridLayout,
    width: am5.percent(100),
    height: am5.percent(100),
    background: am5.Rectangle.new(root, {
      stroke: am5.color(0x555555)
    })
  })
);

// Create child elements
function createCircle() {
  var circle = chart.children.push(
    am5.Circle.new(root, {
      radius: 50,
      fill: am5.color(0x297373),
      centerX: am5.percent(0),
      centerY: am5.percent(0)
    })
  );

  return circle;
}

createCircle();
createCircle();
createCircle();
createCircle();
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
  /*   margin: 100px; */
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
