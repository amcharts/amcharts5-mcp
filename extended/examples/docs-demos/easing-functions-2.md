---
title: "Easing functions"
source: "https://docs.amcharts.com/embeds/v5/easing-functions-2/"
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
      width: 130,
      height: 130
    })
  );

  var circle = animationContainer.children.push(
    am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0xff621f),
      x: am5.p50,
      y: 60
    })
  );

  var label = animationContainer.children.push(
    am5.Label.new(root, {
      text: title,
      fontSize: 12,
      x: am5.p50,
      y: 130,
      centerX: am5.p50,
      centerY: am5.p100
    })
  );

  circle.animate({
    key: "y",
    from: 60,
    to: 10,
    loops: Infinity,
    duration: 4000,
    easing: am5.ease.yoyo(easing)
  });
}

createAnimation(am5.ease.inOut(am5.ease.bounce), "am5.ease.inOut(\n  am5.ease.bounce\n)");
createAnimation(am5.ease.inOut(am5.ease.cubic), "am5.ease.inOut(\n  am5.ease.cubic\n)");
createAnimation(am5.ease.inOut(am5.ease.elastic), "am5.ease.inOut(\n  am5.ease.elastic\n)");
createAnimation(am5.ease.inOut(am5.ease.linear), "am5.ease.inOut(\n  am5.ease.linear\n)");

createAnimation(am5.ease.out(am5.ease.bounce), "am5.ease.out(\n  am5.ease.bounce\n)");
createAnimation(am5.ease.out(am5.ease.cubic), "am5.ease.out(\n  am5.ease.cubic\n)");
createAnimation(am5.ease.out(am5.ease.elastic), "am5.ease.out(\n  am5.ease.elastic\n)");
createAnimation(am5.ease.out(am5.ease.linear), "am5.ease.out(\n  am5.ease.linear\n)");

createAnimation(am5.ease.yoyo(am5.ease.bounce), "am5.ease.yoyo(\n  am5.ease.bounce\n)");
createAnimation(am5.ease.yoyo(am5.ease.cubic), "am5.ease.yoyo(\n  am5.ease.cubic\n)");
createAnimation(am5.ease.yoyo(am5.ease.elastic), "am5.ease.yoyo(\n  am5.ease.elastic\n)");
createAnimation(am5.ease.yoyo(am5.ease.linear), "am5.ease.yoyo(\n  am5.ease.linear\n)");
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 550px;
  height: 450px;
  margin: auto;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
