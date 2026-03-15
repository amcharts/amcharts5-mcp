---
title: "Map with Patterns"
source: "https://www.amcharts.com/demos/map-with-patterns/"
category: "maps"
scraped: "2026-03-15"
---

Using patterns instead or in addition to colors is a great way to not only achieve a different look but also to improve readability of the charts for your color blind viewers.
Key implementation details
Items in the MapPolygonSeries have a fillPattern setting that can be used to specify the pattern fill for the particular polygon. In this demo we use LinePattern, RectanglePattern, and CirclePattern. Additionally, we add variety by customizing some parameters of the patterns like checkered for the rectangle and circle patterns, or rotation for the line pattern.
Patterns
Map polygon series

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv"); 

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1()
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_continentsLow,
    exclude: ["antarctica"]
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true,
  templateField: "settings"
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});

var colors = am5.ColorSet.new(root, {});

polygonSeries.data.setAll([{
  id: "europe",
  settings: {
    fill: colors.next(),
    fillPattern: am5.LinePattern.new(root, {
      color: am5.color(0xffffff),
      rotation: 45,
      strokeWidth: 1
    })
  }
}, {
  id: "asia",
  settings: {
    fill: colors.next(),
    fillPattern: am5.RectanglePattern.new(root, {
      color: am5.color(0xffffff),
      checkered: true
    })
  }
}, {
  id: "africa",
  settings: {
    fill: colors.next(),
    fillPattern: am5.CirclePattern.new(root, {
      color: am5.color(0xffffff),
      checkered: true
    })
  }
}, {
  id: "northAmerica",
  settings: {
    fill: colors.next(),
    fillPattern: am5.CirclePattern.new(root, {
      color: am5.color(0xffffff)
    })
  }
}, {
  id: "southAmerica",
  settings: {
    fill: colors.next(),
    fillPattern: am5.LinePattern.new(root, {
      color: am5.color(0xffffff),
      rotation: 90,
      strokeWidth: 2
    })
  }
}, {
  id: "oceania",
  settings: {
    fill: colors.next(),
    fillPattern: am5.LinePattern.new(root, {
      color: am5.color(0xffffff),
    })
  }
}])
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/continentsLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
