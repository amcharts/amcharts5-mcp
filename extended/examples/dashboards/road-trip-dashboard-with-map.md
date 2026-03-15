---
title: "Road Trip Dashboard with Map"
source: "https://www.amcharts.com/demos/road-trip-dashboard-with-map/"
category: "dashboards"
scraped: "2026-03-15"
---

## JavaScript

```javascript
var mainColor = am5.color(0xc83830);
var secondaryColor = am5.color(0xd9cec8);
var pointSeries;
var serpentineSeries;

var data = [
  {
    "distance": 0,
    "category": "city",
    "name": "Vilnius",
    "altitude": 112,
    "date": new Date("2025-05-01").getTime(),
    "population": 607404,
    "geometry": { "type": "Point", "coordinates": [25.279652, 54.687157] }
  },
  {
    "distance": 462,
    "category": "city",
    "name": "Warsaw",
    "altitude": 100,
    "date": new Date("2025-05-02").getTime(),
    "population": 1793579,
    "geometry": { "type": "Point", "coordinates": [21.01178, 52.22977] }
  },
  {
    "distance": 1033,
    "category": "city",
    "name": "Berlin",
    "altitude": 34,
    "date": new Date("2025-05-03").getTime(),
    "population": 3769000,
    "geometry": { "type": "Point", "coordinates": [13.41053, 52.52437] }
  },
  {
    "distance": 1604,
    "category": "city",
    "name": "Amsterdam",
    "altitude": 2,
    "date": new Date("2025-05-04").getTime(),
    "population": 933680,
    "geometry": { "type": "Point", "coordinates": [4.897070, 52.377956] }
  },
  {
    "distance": 1813,
    "category": "city",
    "name": "Brussels",
    "altitude": 13,
    "date": new Date("2025-05-05").getTime(),
    "population": 1250000,
    "geometry": { "type": "Point", "coordinates": [4.34878, 50.85045] }
  },
  {
    "distance": 2125,
    "category": "city",
    "name": "Paris",
    "altitude": 35,
    "date": new Date("2025-05-06").getTime(),
    "population": 2048472,
    "geometry": { "type": "Point", "coordinates": [2.349014, 48.864716] }
  },
  {
    "distance": 2772,
    "category": "city",
    "name": "Zurich",
    "altitude": 408,
    "date": new Date("2025-05-07").getTime(),
    "population": 448664,
    "geometry": { "type": "Point", "coordinates": [8.55, 47.36667] }
  },
  {
    "distance": 3300,
    "category": "city",
    "name": "Vienna",
    "altitude": 171,
    "date": new Date("2025-05-08").getTime(),
    "population": 1921153,
    "geometry": { "type": "Point", "coordinates": [16.363449, 48.210033] }
  },
  {
    "distance": 3546,
    "category": "city",
    "name": "Budapest",
    "altitude": 96,
    "date": new Date("2025-05-09").getTime(),
    "population": 1780390,
    "geometry": { "type": "Point", "coordinates": [19.04, 47.4980] }
  },
  {
    "distance": 4254,
    "category": "city",
    "name": "Venice",
    "altitude": 1,
    "date": new Date("2025-05-10").getTime(),
    "population": 258685,
    "geometry": { "type": "Point", "coordinates": [12.33265, 45.43713] }
  },
  {
    "distance": 5000,
    "category": "city",
    "name": "Rome",
    "altitude": 21,
    "date": new Date("2025-05-11").getTime(),
    "population": 4347100,
    "geometry": { "type": "Point", "coordinates": [12.496366, 41.902782] }
  },
  {
    "distance": 5229,
    "category": "city",
    "name": "Naples",
    "altitude": 17,
    "date": new Date("2025-05-12").getTime(),
    "population": 2182170,
    "geometry": { "type": "Point", "coordinates": [14.305573, 40.853294] }
  },
  {
    "distance": 5957,
    "category": "city",
    "name": "Palermo",
    "altitude": 14,
    "date": new Date("2025-05-13").getTime(),
    "population": 851282,
    "geometry": { "type": "Point", "coordinates": [13.3356, 38.1321] }
  }
]

makeMapChart();
makeSerpentineChart();


function makeMapChart() {
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("mapdiv");


  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);


  // Create the map chart
  // https://www.amcharts.com/docs/v5/charts/map-chart/
  var chart = root.container.children.push(am5map.MapChart.new(root, {
    panX: "translateX",
    panY: "translateY",
    projection: am5map.geoMercator(),
    homeGeoPoint: { longitude: 8.7, latitude: 50.5 },
    homeZoomLevel: 3
  }));


  // Create main polygon series for countries
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
  var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_region_world_europeLow
  }));

  polygonSeries.mapPolygons.template.setAll({
    fill: secondaryColor,
    stroke: am5.color(0xffffff),
    strokeWidth: 1,
    strokeOpacity: 0.5
  });

  polygonSeries.events.on("datavalidated", function () {
    chart.goHome();
  })

  var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
  lineSeries.mapLines.template.setAll({
    stroke: am5.color(0x000000),
    strokeDasharray: [3, 3],
    strokeWidth:1,
    strokeOpacity: .5
  });

  pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
    valueField: "population",
    calculateAggregates: true,
    idField: "name"
  }));

  var circleTemplate = am5.Template.new(root, {});

  pointSeries.set("heatRules", [{
    target: circleTemplate,
    min: 3,
    max: 17,
    dataField: "value",
    key: "radius"
  }]);

  pointSeries.bullets.push(function (root, series, dataItem) {
    var container = am5.Container.new(root, {});
    var circle = container.children.push(am5.Circle.new(root, {
      radius: 9,
      fill: mainColor,
      stroke: mainColor,
      strokeWidth: 1,
      strokeOpacity: 0.8,
      fillOpacity: 0.7,
      layer: 30
    }, circleTemplate));

    circle.states.create("hover", {
      scale: 1.4,
      fillOpacity:1
    });

    circle.events.on("pointerover", function (ev) {
      var dataItem = ev.target.dataItem;
      if (dataItem) {
        var city = dataItem.dataContext.name;
        var di = serpentineSeries.getDataItemById(city);

        if (di) {
          var bullet = di.bullets[0];
          
          if (bullet) {
            var container = bullet.get("sprite");
            var c = container.children.getIndex(0);
            if (c) {
              c.hover();
            }
          }
        }
      }
    });

    circle.events.on("pointerout", function (ev) {
      var dataItem = ev.target.dataItem;
      if (dataItem) {
        var city = dataItem.dataContext.name;
        var di = serpentineSeries.getDataItemById(city);

        if (di) {
          var bullet = di.bullets[0];
          
          if (bullet) {
            var container = bullet.get("sprite");
            var c = container.children.getIndex(0);
            if (c) {
              c.unhover();
            }
          }
        }
      }
    });    


    var label = container.children.push(am5.Label.new(root, {
      text: "{name}",
      fontSize: 13,
      centerY: am5.p50,
      centerX: am5.p100,
      populateText: true,
      layer: 30,
      paddingRight: 4
    }));

    label.adapters.add("dx", function (dy, target) {
      return -circle.get("radius");
    });

    return am5.Bullet.new(root, {
      sprite: container,
      locationX: 0,
      locationY: 0.5
    })
  })

  pointSeries.data.setAll(data);

  // create line series data items with points to connect
  var pointsToConnect = [];
  am5.array.each(pointSeries.dataItems, function (dataItem) {
    pointsToConnect.push(dataItem);
  })

  lineSeries.pushDataItem({
    pointsToConnect: pointsToConnect
  });


  // Make stuff animate on load
  chart.appear(1000, 100);
}


function makeSerpentineChart() {

  var root = am5.Root.new("serpentinediv");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);


  // Create chart
  var chart = root.container.children.push(am5timeline.SerpentineChart.new(root, {
    levelCount: 3,
    startLocation: 0.2,
    endLocation: 1,
    wheelY: "zoomX",
    yAxisRadius: am5.percent(20)
  }));

  var yRenderer = am5timeline.AxisRendererCurveY.new(root, {

  });

  yRenderer.labels.template.setAll({
    forceHidden: true
  });

  yRenderer.grid.template.set("forceHidden", true);

  // Create axes and their renderers
  var xRenderer = am5timeline.AxisRendererCurveX.new(root, {
    yRenderer: yRenderer,
    strokeDasharray: [2, 3],
    strokeWidth: 2,
    strokeOpacity: 0.5,
    stroke: am5.color(0x000000)
  });

  xRenderer.labels.template.setAll({
    centerY: am5.p50,
    fontSize: 11,
    fill: am5.color(0x777777),
    minPosition: 0.01,
    maxPosition: 0.99
  });

  xRenderer.grid.template.set("forceHidden", true);

  xRenderer.labels.template.setup = function (target) {
    target.set("layer", 30);
    target.set("background", am5.Rectangle.new(root, {
      fill: am5.color(0xffffff),
      fillOpacity: 1
    }));
  }
  

  var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "category",
    renderer: yRenderer
  }));

  var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    renderer: xRenderer,
    numberFormat: "#' km'",    
  }));

  // Data
  var colorSet = chart.get("colors");

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  serpentineSeries = chart.series.push(am5timeline.CurveLineSeries.new(root, {
    xAxis: xAxis,    
    yAxis: yAxis,
    baseAxis: yAxis,
    valueField: "population",
    valueXField: "distance",
    categoryYField: "category",
    idField: "name",
    maskBullets: false,
    calculateAggregates: true
  }));

  serpentineSeries.strokes.template.setAll({
    forceHidden: true
  });

  var circleTemplate = am5.Template.new(root, {});

  serpentineSeries.set("heatRules", [{
    target: circleTemplate,
    min: 3,
    max: 35,
    dataField: "value",
    key: "radius"
  }]);

  serpentineSeries.bullets.push(function (root, series, dataItem) {
    var container = am5.Container.new(root, {});

    var circle = container.children.push(am5.Circle.new(root, {
      radius: 9,
      fill: mainColor,
      stroke: mainColor,
      strokeWidth: 2,
      strokeOpacity: 0.8,
      layer: 30,
      tooltipText: "[bold fontSize: 20px]{name}[/]
{date.formatDate('MMM dd, yyyy')}
population: {population}",
      tooltipY: 0,
      fillOpacity: 0.7
    }, circleTemplate));

    circle.states.create("hover", {
      scale: 1.5,
      fillOpacity: 1
    });

    circle.events.on("pointerover", function (ev) {
      var dataItem = ev.target.dataItem;
      if (dataItem) {
        var city = dataItem.dataContext.name;
        var di = pointSeries.getDataItemById(city);

        if (di) {
          var bullet = di.bullets[0];
          
          if (bullet) {
            var container = bullet.get("sprite");
            var c = container.children.getIndex(0);
            if (c) {
              c.hover();
            }
          }
        }
      }
    });

    circle.events.on("pointerout", function (ev) {
      var dataItem = ev.target.dataItem;
      if (dataItem) {
        var city = dataItem.dataContext.name;
        var di = pointSeries.getDataItemById(city);

        if (di) {
          var bullet = di.bullets[0];
          
          if (bullet) {
            var container = bullet.get("sprite");
            var c = container.children.getIndex(0);
            if (c) {
              c.unhover();
            }
          }
        }
      }
    });        

    var label = container.children.push(am5.Label.new(root, {
      text: "{name}",
      fontSize: 13,
      centerY: am5.p100,
      centerX: am5.p50,
      populateText: true,
      layer: 30
    }));

    label.adapters.add("dy", function (dy, target) {
      return -circle.get("radius");
    });

    return am5.Bullet.new(root, {
      sprite: container,
      locationX: 0,
      locationY: 0.5
    })
  })

  var cursor = chart.set("cursor", am5timeline.CurveCursor.new(root, {
    behavior: "zoomX",
    xAxis: xAxis,
    yAxis: yAxis
  }));

  cursor.lineY.set("forceHidden", true);
  cursor.lineX.set("forceHidden", true);

  serpentineSeries.data.setAll(data);

  yAxis.data.setAll([
    { category: "city" }
  ]);

  // Animate chart and series in
  // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
  serpentineSeries.appear(1000);
  chart.appear(1000, 100);
}
```

## HTML

```html
<div id="chartdiv">
  <div id="serpentinediv"></div>
  <div id="mapdiv"></div>
</div>
```

## CSS

```css
#chartdiv {
  overflow: auto;
}

#serpentinediv {
  width: 50%;
  height: 600px;
  float: left;
}

#mapdiv {
  width: 50%;
  height: 600px;
  float: left;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/timeline.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/region/world/europeLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
