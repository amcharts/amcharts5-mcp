---
title: "Map with Animated Bubbles"
source: "https://www.amcharts.com/demos/map-with-animated-bubbles/"
category: "maps"
scraped: "2026-03-15"
---

Animating bullet sizes and values is a great way to showcase data changes over time. This demo shows you how to do it on a map.
Key implementation details
We use MapPointSeries to place the bubbles on the map. polygonIdField is set to the ID of the country polygon and the chart places the point in the center of that polygon/country. We then add a Circle as a bullet for the series. Finally, we use "heat rules" to apply settings based on the data values.
Then we just change the underlying values on a timer.
Map chart
Map point series
Bullets
Heat rules

## JavaScript

```javascript
var data = [
  {
    id: "US",
    name: "United States",
    value: 100
  }, {
    id: "GB",
    name: "United Kingdom",
    value: 100
  }, {
    id: "CN",
    name: "China",
    value: 100
  }, {
    id: "IN",
    name: "India",
    value: 100
  }, {
    id: "AU",
    name: "Australia",
    value: 100
  }, {
    id: "CA",
    name: "Canada",
    value: 100
  }, {
    id: "BR",
    name: "Brasil",
    value: 100
  }, {
    id: "ZA",
    name: "South Africa",
    value: 100
  }
];

var root = am5.Root.new("chartdiv");
root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(am5map.MapChart.new(root, {}));

var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);

var bubbleSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    valueField: "value",
    calculateAggregates: true,
    polygonIdField: "id"
  })
);

var circleTemplate = am5.Template.new({});

bubbleSeries.bullets.push(function(root, series, dataItem) {
  var container = am5.Container.new(root, {});

  var circle = container.children.push(
    am5.Circle.new(root, {
      radius: 20,
      fillOpacity: 0.7,
      fill: am5.color(0xff0000),
      cursorOverStyle: "pointer",
      tooltipText: `{name}: [bold]{value}[/]`
    }, circleTemplate)
  );

  var countryLabel = container.children.push(
    am5.Label.new(root, {
      text: "{name}",
      paddingLeft: 5,
      populateText: true,
      fontWeight: "bold",
      fontSize: 13,
      centerY: am5.p50
    })
  );

  circle.on("radius", function(radius) {
    countryLabel.set("x", radius);
  })

  return am5.Bullet.new(root, {
    sprite: container,
    dynamic: true
  });
});

bubbleSeries.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{value.formatNumber('#.')}",
      fill: am5.color(0xffffff),
      populateText: true,
      centerX: am5.p50,
      centerY: am5.p50,
      textAlign: "center"
    }),
    dynamic: true
  });
});



// minValue and maxValue must be set for the animations to work
bubbleSeries.set("heatRules", [
  {
    target: circleTemplate,
    dataField: "value",
    min: 10,
    max: 50,
    minValue: 0,
    maxValue: 100,
    key: "radius"
  }
]);

bubbleSeries.data.setAll(data);

updateData();
setInterval(function() {
  updateData();
}, 2000)

function updateData() {
  for (var i = 0; i < bubbleSeries.dataItems.length; i++) {
    bubbleSeries.data.setIndex(i, { value: Math.round(Math.random() * 100), id: data[i].id, name: data[i].name })
  }
}

```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 600px
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
