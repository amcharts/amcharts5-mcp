---
title: "Road Trip Dashboard with Map"
source: "https://www.amcharts.com/demos/road-trip-dashboard-with-map/"
category: "dashboards"
scraped: "2026-10-08"
---

A road trip from Vilnius to Palermo told twice: on a timeline that winds like a road, measured in kilometers driven, and on a map of Europe. Circles are sized by population, and pointing at a city in either chart highlights it in the other.

Two views of one trip: The map answers where, the timeline answers how far and in what order, and linking the two lets readers move between them without losing their place. A serpentine timeline fits a long sequence into a compact box by winding it back and forth, which suits trips, routes and journeys told stop by stop.

Good for:
- Trips, tours and delivery routes
- Steps that each have a place
- Linking a map to a second view

Think twice when:
- Stops close together: their names crowd
- Legs to compare: a bar chart of distances
- Dozens of stops: the road gets crowded

Prompt: Create a road trip dashboard with two linked charts: a serpentine timeline of 13 daily stops from Vilnius to Palermo, drawn as a winding road with the cities sized by population, and a map of Europe with the route and the same cities. Pointing at a city in either chart enlarges it in both. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// The 13 stops of the trip: distance driven so far (km), population, date and location
var data = [
  {
    "distance": 0,
    "category": "city",
    "name": "Vilnius",
    "date": new Date(2025, 4, 1).getTime(),
    "population": 607404,
    "geometry": { "type": "Point", "coordinates": [25.279652, 54.687157] }
  },
  {
    "distance": 462,
    "category": "city",
    "name": "Warsaw",
    "date": new Date(2025, 4, 2).getTime(),
    "population": 1793579,
    "geometry": { "type": "Point", "coordinates": [21.01178, 52.22977] }
  },
  {
    "distance": 1033,
    "category": "city",
    "name": "Berlin",
    "date": new Date(2025, 4, 3).getTime(),
    "population": 3769000,
    "geometry": { "type": "Point", "coordinates": [13.41053, 52.52437] }
  },
  {
    "distance": 1604,
    "category": "city",
    "name": "Amsterdam",
    "date": new Date(2025, 4, 4).getTime(),
    "population": 933680,
    "geometry": { "type": "Point", "coordinates": [4.897070, 52.377956] }
  },
  {
    "distance": 1813,
    "category": "city",
    "name": "Brussels",
    "date": new Date(2025, 4, 5).getTime(),
    "population": 1250000,
    "geometry": { "type": "Point", "coordinates": [4.34878, 50.85045] }
  },
  {
    "distance": 2125,
    "category": "city",
    "name": "Paris",
    "date": new Date(2025, 4, 6).getTime(),
    "population": 2048472,
    "geometry": { "type": "Point", "coordinates": [2.349014, 48.864716] }
  },
  {
    "distance": 2772,
    "category": "city",
    "name": "Zurich",
    "date": new Date(2025, 4, 7).getTime(),
    "population": 448664,
    "geometry": { "type": "Point", "coordinates": [8.55, 47.36667] }
  },
  {
    "distance": 3300,
    "category": "city",
    "name": "Vienna",
    "date": new Date(2025, 4, 8).getTime(),
    "population": 1921153,
    "geometry": { "type": "Point", "coordinates": [16.363449, 48.210033] }
  },
  {
    "distance": 3546,
    "category": "city",
    "name": "Budapest",
    "date": new Date(2025, 4, 9).getTime(),
    "population": 1780390,
    "geometry": { "type": "Point", "coordinates": [19.04, 47.4980] }
  },
  {
    "distance": 4254,
    "category": "city",
    "name": "Venice",
    "date": new Date(2025, 4, 10).getTime(),
    "population": 258685,
    "geometry": { "type": "Point", "coordinates": [12.33265, 45.43713] }
  },
  {
    "distance": 5000,
    "category": "city",
    "name": "Rome",
    "date": new Date(2025, 4, 11).getTime(),
    "population": 4347100,
    "geometry": { "type": "Point", "coordinates": [12.496366, 41.902782] }
  },
  {
    "distance": 5229,
    "category": "city",
    "name": "Naples",
    "date": new Date(2025, 4, 12).getTime(),
    "population": 2182170,
    "geometry": { "type": "Point", "coordinates": [14.305573, 40.853294] }
  },
  {
    "distance": 5957,
    "category": "city",
    "name": "Palermo",
    "date": new Date(2025, 4, 13).getTime(),
    "population": 851282,
    "geometry": { "type": "Point", "coordinates": [13.3356, 38.1321] }
  }
];

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Colors from the theme, so the dashboard follows the theme: a main color and a pale one for the rest
var colors = am5.ColorSet.new(root, {});
var mainColor = colors.getIndex(0);
var secondaryColor = am5.Color.lighten(mainColor, 0.7);

// Buttons and switches in the main color
root.interfaceColors.setAll({
  primaryButton: mainColor,
  primaryButtonHover: am5.Color.lighten(mainColor, 0.2), // a little lighter on hover...
  primaryButtonDown: am5.Color.lighten(mainColor, -0.2)  // ...and darker when pressed
});

// One root holds both charts, side by side: the timeline on the left, the map on the right
root.container.set("layout", root.horizontalLayout);

var serpentineSeries = makeSerpentineChart(); // the timeline's city series...
var pointSeries = makeMapChart();             // ...and the map's, which cityCircle looks through

// The circle of a city in the given series, so hovering a city in one chart can highlight it in the other.
// Each bullet keeps its circle in userData.
function cityCircle(series, dataItem) {
  var other = series.getDataItemById(dataItem.dataContext.name);
  var bullet = other && other.bullets ? other.bullets[0] : undefined;
  return bullet ? bullet.get("sprite").get("userData").circle : undefined;
}

// the timeline: the trip as a winding road, with a circle for each city
function makeSerpentineChart() {
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/timeline/
  var chart = root.container.children.push(am5timeline.SerpentineChart.new(root, {
    width: am5.percent(50), // the left half
    // the road winds back and forth over five levels
    levelCount: 5,
    startLocation: 0.1,          // the road starts a tenth of the way along the first level...
    endLocation: 1,              // ...and runs to the end of the last one
    wheelY: "zoomX",             // the mouse wheel zooms in on part of the road
    yAxisRadius: am5.percent(20) // the Y axis spans 20% of the space between two levels
  }));

  var yRenderer = am5timeline.AxisRendererCurveY.new(root, {});

  yRenderer.labels.template.setAll({
    forceHidden: true // no Y axis labels
  });

  yRenderer.grid.template.set("forceHidden", true); // no Y grid lines

  // Create axes and their renderers
  // The X axis is the road: a dotted line in the text color, with the distance written on it
  var xRenderer = am5timeline.AxisRendererCurveX.new(root, {
    yRenderer: yRenderer,
    strokeDasharray: [2, 2],
    strokeWidth: 2,     // 2px wide
    strokeOpacity: 0.5, // half see-through
    stroke: root.interfaceColors.get("text")
  });

  // The axis labels are hidden: the distance markers are axis ranges (see below)
  xRenderer.labels.template.set("forceHidden", true);
  xRenderer.grid.template.set("forceHidden", true); // no grid lines either

  var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "category",
    renderer: yRenderer
  }));

  var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    renderer: xRenderer
  }));

  // A distance marker every 500 km, except close to a city, where the city's circle would cover it
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
  function nearCity(km) {
    return data.some(function (city) {
      return Math.abs(city.distance - km) < 150; // within 150 km of a city
    });
  }

  for (var km = 500; km < 6000; km += 500) {
    if (!nearCity(km)) {
      var range = xAxis.createAxisRange(xAxis.makeDataItem({ value: km }));
      range.get("label").setAll({
        text: km + " km",
        forceHidden: false, // range labels copy the hidden axis labels, so they're shown again here
        centerY: am5.p50,   // centered on the road
        fontSize: 11,       // small text, in pixels
        fillOpacity: 0.6,   // dimmer than the city names
        layer: 30,          // on its own layer, above the road
        // the marker covers the road behind it with the background color
        background: am5.Rectangle.new(root, {
          fill: root.interfaceColors.get("background"),
          fillOpacity: 1
        })
      });
    }
  }

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5timeline.CurveLineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    baseAxis: yAxis,
    valueField: "population",
    valueXField: "distance",
    categoryYField: "category",
    idField: "name", // cityCircle finds a city by its name
    // city circles aren't clipped at the edges of the plot area
    maskBullets: false,
    calculateAggregates: true // works out the lowest and highest populations, for the heat rule
  }));

  // no line: the axis draws the road, and the series only places the city circles
  series.strokes.template.setAll({
    forceHidden: true
  });

  // Circles sized by population
  var circleTemplate = am5.Template.new(root, {});

  series.set("heatRules", [{
    target: circleTemplate,
    min: 3,  // the smallest city a 3px circle...
    max: 20, // ...the largest 20px
    dataField: "value",
    key: "radius"
  }]);

  // each city: a circle sized by population, with its name above it
  series.bullets.push(function (root, series, dataItem) {
    // drawn above the distance labels
    var container = am5.Container.new(root, {
      layer: 40
    });

    // a disc in the background color under each circle, so the road and its labels don't show through
    container.children.push(am5.Circle.new(root, {
      fill: root.interfaceColors.get("background")
    }, circleTemplate));

    var circle = container.children.push(am5.Circle.new(root, {
      radius: 9,
      fill: mainColor,
      stroke: mainColor,
      strokeWidth: 2,     // a 2px ring...
      strokeOpacity: 0.8, // ...slightly see-through
      tooltipText: "[bold fontSize: 20px]{name}[/]\n{date.formatDate('MMM d, yyyy')}\n{distance} km driven\npopulation: {population}",
      tooltipY: 0,        // the tooltip points at the top of the circle
      fillOpacity: 0.7    // the fill a little see-through
    }, circleTemplate));

    circle.states.create("hover", {
      scale: 1.5,    // a hovered circle grows by half...
      fillOpacity: 1 // ...and turns solid
    });

    container.set("userData", { circle: circle }); // so cityCircle can find the circle

    // highlight the city on the map too
    circle.events.on("pointerover", function (ev) {
      var other = cityCircle(pointSeries, ev.target.dataItem);
      if (other) {
        other.hover();
      }
    });

    circle.events.on("pointerout", function (ev) {
      var other = cityCircle(pointSeries, ev.target.dataItem);
      if (other) {
        other.unhover();
      }
    });

    var label = container.children.push(am5.Label.new(root, {
      text: "{name}",
      fontSize: 13,      // 13px text
      centerY: am5.p100, // the label's bottom...
      centerX: am5.p50,  // ...centered over the circle
      populateText: true // fills in {name} from the city's data
    }));

    // the name sits just above the circle, whatever its size
    label.adapters.add("dy", function (dy, target) {
      return -circle.get("radius");
    });

    return am5.Bullet.new(root, {
      sprite: container,
      locationX: 0,
      locationY: 0.5 // in the middle of the Y axis, on the road
    })
  })

  // Drag along the road to zoom in on part of it
  var cursor = chart.set("cursor", am5timeline.CurveCursor.new(root, {
    behavior: "zoomX",
    xAxis: xAxis,
    yAxis: yAxis
  }));

  cursor.lineY.set("forceHidden", true); // no cursor lines: the cursor only zooms
  cursor.lineX.set("forceHidden", true);

  series.data.setAll(data);

  yAxis.data.setAll([
    { category: "city" }
  ]);

  // Animate chart and series in
  // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
  series.appear(1000);
  chart.appear(1000, 100);

  return series;
}

// the map: the same cities on a map of Europe, joined by the route
function makeMapChart() {
  // Create the map chart
  // https://www.amcharts.com/docs/v5/charts/map-chart/
  var chart = root.container.children.push(am5map.MapChart.new(root, {
    minZoomLevel: 0.5, // can zoom out to half the size of the fitted map
    // go to the home view once the map is fitted: zoomed in on the route, with room for the city names left of
    // the circles
    autoHome: true,
    homeGeoPoint: { longitude: 13, latitude: 47.3 }, // the home view's center...
    homeZoomLevel: 3.4,     // ...and its zoom level
    width: am5.percent(50), // the right half
    // the map shares the root with the timeline, so it keeps its countries within its own half
    maskContent: true,
    panX: "translateX",              // drag to move the map sideways...
    panY: "translateY",              // ...and up and down
    projection: am5map.geoMercator() // Mercator, the familiar flat map
  }));

  // Zoom control
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
  var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

  // the home button is hidden by default
  zoomControl.homeButton.set("visible", true);

  // Create series for the water: a faint fill behind the countries
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
  var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    // the map fits the countries, not this rectangle around the whole world
    affectsBounds: false
  }));

  waterSeries.mapPolygons.template.setAll({
    fill: root.interfaceColors.get("alternativeBackground"), // the theme's contrast color, dark on light
    fillOpacity: 0.05, // at 5%, only a faint tint
    strokeOpacity: 0   // no outline
  });

  waterSeries.data.push({
    geometry: am5map.getGeoRectangle(90, 180, -90, -180) // north, east, south and west edges: the whole world
  });

  // Create graticule series: grid lines every 10 degrees
  // https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
  var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
    step: 10
  }));

  graticuleSeries.mapLines.template.setAll({
    stroke: root.interfaceColors.get("alternativeBackground"), // the contrast color...
    strokeOpacity: 0.08 // ...very faint
  });

  // Create main polygon series for countries
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
  var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    name: "Polygon Series",
    geoJSON: am5geodata_region_world_europeLow // Europe's countries, low detail
  }));

  // Half-transparent land stays light on a light background and turns dark on a dark one,
  // so the city names on it can always be read
  polygonSeries.mapPolygons.template.setAll({
    fill: secondaryColor,
    fillOpacity: 0.5,
    stroke: root.interfaceColors.get("background"), // borders in the background color...
    strokeWidth: 1 // ...1px wide
  });

  // The route: a dotted line in the text color, through the cities in order
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
  var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {
    name: "Line Series"
  }));

  lineSeries.mapLines.template.setAll({
    stroke: root.interfaceColors.get("text"),
    strokeDasharray: [2, 2],
    strokeWidth: 1,    // 1px wide
    strokeOpacity: 0.5 // half see-through
  });

  // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
  var series = chart.series.push(am5map.MapPointSeries.new(root, {
    name: "City Series",
    valueField: "population",  // the value the heat rule sizes the circles by
    calculateAggregates: true, // works out the lowest and highest populations, for the heat rule
    idField: "name"            // the route and cityCircle find a city by its name
  }));

  // Circles sized by population
  var circleTemplate = am5.Template.new(root, {});

  series.set("heatRules", [{
    target: circleTemplate,
    min: 3,  // the smallest city a 3px circle...
    max: 17, // ...the largest 17px
    dataField: "value",
    key: "radius"
  }]);

  // each city: a circle sized by population, with its name to the left
  series.bullets.push(function (root, series, dataItem) {
    var container = am5.Container.new(root, {});
    var circle = container.children.push(am5.Circle.new(root, {
      radius: 9,
      fill: mainColor,
      stroke: mainColor,
      strokeWidth: 1,            // a 1px ring...
      strokeOpacity: 0.8,        // ...slightly see-through
      fillOpacity: 0.7,          // the fill a little see-through
      cursorOverStyle: "pointer" // a hand cursor over the circle
    }, circleTemplate));

    circle.states.create("hover", {
      scale: 1.4,    // a hovered circle grows by 40%...
      fillOpacity: 1 // ...and turns solid
    });

    container.set("userData", { circle: circle }); // so cityCircle can find the circle

    // highlight the city on the timeline too, with its details
    circle.events.on("pointerover", function (ev) {
      var other = cityCircle(serpentineSeries, ev.target.dataItem);
      if (other) {
        other.hover();
        other.showTooltip();
      }
    });

    circle.events.on("pointerout", function (ev) {
      var other = cityCircle(serpentineSeries, ev.target.dataItem);
      if (other) {
        other.unhover();
        other.hideTooltip();
      }
    });

    var label = container.children.push(am5.Label.new(root, {
      text: "{name}",
      fontSize: 13,       // 13px text
      centerY: am5.p50,   // centered on the circle's height...
      centerX: am5.p100,  // ...with the label's right end at the circle
      populateText: true, // fills in {name} from the city's data
      paddingRight: 4     // a 4px gap before the circle
    }));

    // the name sits just left of the circle, whatever its size
    label.adapters.add("dx", function (dx, target) {
      return -circle.get("radius");
    });

    return am5.Bullet.new(root, {
      sprite: container
    })
  })

  series.data.setAll(data);

  // The route connects the cities by their names
  lineSeries.set("pointSeries", series);
  lineSeries.data.setAll([{
    id: "route",
    pointIds: data.map(function (city) {
      return city.name;
    })
  }]);

  // Make stuff animate on load
  chart.appear(1000, 100);

  return series;
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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/timeline.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://cdn.amcharts.com/lib/5/geodata/region/world/europeLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
