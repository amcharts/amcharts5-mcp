---
title: "Map with Dynamic Pie Charts"
source: "https://www.amcharts.com/demos/map-dynamic-pie-charts/"
category: "maps"
scraped: "2026-03-15"
---

One of the super-powers of amCharts is that you can combine multiple chart types into a single cohesive and interactive visualization. This demo shows interactive pie charts on top of an active zoomable map.
Key implementation details
The key trick here is that we create pie charts as bullets in map point series.
Map point series
Pie chart
Bullets

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv"); 

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);


// ====================================
// Create map
// ====================================

var map = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "none",
    projection: am5map.geoNaturalEarth1()
  })
);

// Create polygon series
var polygonSeries = map.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_continentsLow,
    exclude: ["antarctica"],
    fill: am5.color(0xbbbbbb)
  })
);

var pointSeries = map.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
  })
);

pointSeries.bullets.push(function(root, series, x) {
  
  var chartData = x.dataContext.data;
  
  var chart = root.container.children.push(am5percent.PieChart.new(root, {
    width: chartData.width,
    height: chartData.height,
    radius: am5.p100,
    centerX: am5.p50,
    centerY: am5.p50
  }));
  
  var series = chart.series.push(am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
  }));
  
  series.labels.template.set("forceHidden", true);
  series.ticks.template.set("forceHidden", true);
  series.data.setAll(chartData.pieData);
 
  return am5.Bullet.new(root, {
    sprite: chart
  });
});

pointSeries.bullets.push(function(root, series, x) {
  
  var chartData = x.dataContext.data;
 
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: chartData.title,
      centerX: am5.p50,
      centerY: am5.p100,
      dy: chartData.height * -0.5
    })
  });
});


// ====================================
// Create pie charts
// ====================================

var charts = [{
  "title": "North America",
  "latitude": 39.563353,
  "longitude": -99.316406,
  "width": 100,
  "height": 100,
  "pieData": [{
    "category": "Category #1",
    "value": 1200
  }, {
    "category": "Category #2",
    "value": 500
  }, {
    "category": "Category #3",
    "value": 765
  }, {
    "category": "Category #4",
    "value": 260
  }]
}, {
  "title": "Europe",
  "latitude": 50.896104,
  "longitude": 19.160156,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "Asia",
  "latitude": 47.212106,
  "longitude": 103.183594,
  "width": 80,
  "height": 80,
  "pieData": [{
    "category": "Category #1",
    "value": 352
  }, {
    "category": "Category #2",
    "value": 266
  }, {
    "category": "Category #3",
    "value": 512
  }, {
    "category": "Category #4",
    "value": 199
  }]
}, {
  "title": "Africa",
  "latitude": 11.081385,
  "longitude": 21.621094,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 300
  }, {
    "category": "Category #3",
    "value": 599
  }, {
    "category": "Category #4",
    "value": 512
  }]
}];

for (var i = 0; i < charts.length; i++) {
  var chart = charts[i];
  pointSeries.data.push({
    geometry: { type: "Point", coordinates: [chart.longitude, chart.latitude] },
    title: chart.title,
    data: chart
  });
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
  height: 500px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/continentsLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
