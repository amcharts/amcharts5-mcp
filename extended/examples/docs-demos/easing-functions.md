---
title: "Easing functions"
source: "https://docs.amcharts.com/embeds/v5/easing-functions/"
category: "docs-demos"
scraped: "2026-11-14"
docsPages: ["concepts/animations"]
---

A demo from the docs page "Animations" (get_doc(path: "concepts/animations")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100,
    layout: root.gridLayout
  })
);

function createAnimation(easing, title) {
  var animationContainer = container.children.push(
    am5.Container.new(root, {
      width: 100,
      height: 100
    })
  );

  var circle = animationContainer.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0xff621f),
      x: 50,
      y: 60
    })
  );

  var label = animationContainer.children.push(
    am5.Label.new(root, {
      text: title,
      fontSize: 12,
      x: 50,
      y: 100,
      centerX: am5.p50,
      centerY: am5.p100
    })
  );

  circle.animate({
    key: "y",
    to: 10,
    loops: Infinity,
    duration: 2000,
    easing: am5.ease.yoyo(easing)
  });
}

createAnimation(am5.ease.bounce, "am5.ease.bounce");
createAnimation(am5.ease.circle, "am5.ease.circle");
createAnimation(am5.ease.cubic, "am5.ease.cubic");
createAnimation(am5.ease.elastic, "am5.ease.elastic");
createAnimation(am5.ease.exp, "am5.ease.exp");
createAnimation(am5.ease.linear, "am5.ease.linear");
createAnimation(am5.ease.quad, "am5.ease.quad");
createAnimation(am5.ease.sine, "am5.ease.sine");
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 400px;
  height: 200px;
  margin: auto;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
