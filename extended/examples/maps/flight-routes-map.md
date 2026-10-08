---
title: "Flight Routes Map"
source: "https://www.amcharts.com/demos/flight-routes-map/"
category: "maps"
scraped: "2026-10-08"
---

Flight routes drawn as lines from London to eleven cities, with the destinations as dots. Origin switches to the routes from Vilnius.

When to draw lines on a map: Lines between places show connections: routes, trade, migration or messages. Lines that follow the curve of the Earth, as these do, show the shortest path, which is why the route to New York bends north. Start them from one place, as here, or keep them few, or they turn into a tangle.

Good for:
- Flight and shipping routes
- Connections from one hub
- Travel or trade between a few places

Think twice when:
- Hundreds of connections: a chord or flow diagram
- Amounts on each route: vary the line width
- Routes with exact paths: draw the real waypoints

Prompt: Create a flight routes map with two origin cities, London and Vilnius, and their destinations across Europe and in New York. Clicking an origin shows its routes as lines and moves the map to them. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Colors from the theme, so the map follows the theme
var colors = am5.ColorSet.new(root, {});

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    // near-black space behind the satellite picture, shown only with it
    background: am5.Rectangle.new(root, {
      fill: am5.color(0x101318),
      fillOpacity: 0 // clear until the satellite view turns it on
    }),
    minZoomLevel: 0.5,                 // zoom out to half the fitted size at most
    // go to the home view once the map is fitted: the area of the selected origin's routes, London's to start with
    autoHome: true,
    homeGeoPoint: { longitude: -18, latitude: 43 }, // the home view centers here...
    homeZoomLevel: 3,                  // ...at zoom level 3
    panX: "translateX",                // drag the map sideways...
    panY: "translateY",                // ...or up and down to move it
    // hold shift and drag to zoom into a box
    boxZoom: "shift",
    projection: am5map.geoEqualEarth() // a world map that keeps the countries' areas true to size
  })
);

// Zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// true while the map is drawn as a globe, which turns to the routes instead of panning
var globe = false;

// Create series for the water: a faint fill behind the countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // the map fits the countries, not this rectangle around the whole world
  affectsBounds: false
}));

waterSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  fillOpacity: 0.05, // barely there
  strokeOpacity: 0   // no outline
});

waterSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // north, east, south and west edges: the whole world
});

// Satellite view: NASA's picture of the Earth by day, under the grid lines and the countries. Hidden at first
// (visible: false): make it visible for the satellite view
// https://www.amcharts.com/docs/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  visible: false,
  // the map fits the countries, not the whole picture
  affectsBounds: false
}));

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

// latitude and longitude lines, every 10 degrees by default
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  strokeOpacity: 0.08 // very faint
});

// Create line series for trajectory lines
// https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
lineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // contrasting with the background...
  strokeOpacity: 0.6 // ...a little see-through
});

// Create point series for markers
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var originSeries = chart.series.push(
  am5map.MapPointSeries.new(root, { idField: "id" }) // so a city can be found by its id (getDataItemById)
);

// a clickable dot for each origin city
originSeries.bullets.push(function () {
  var circle = am5.Circle.new(root, {
    radius: 7,                  // bigger than the destination dots
    tooltipText: "{title}",     // the city's name on hover
    cursorOverStyle: "pointer", // a hand pointer: the dot can be clicked
    tooltipY: 0,                // the tooltip points at the top of the dot
    fill: colors.getIndex(10),  // a palette color...
    stroke: root.interfaceColors.get("background"), // ...with an outline in the background color...
    strokeWidth: 2              // ...2px wide
  });

  circle.events.on("click", function (e) { // a click shows this city's routes
    selectOrigin(e.target.dataItem.get("id"));
  });
  return am5.Bullet.new(root, {
    sprite: circle
  });
});

// destination series
var destinationSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

destinationSeries.bullets.push(function () {
  var circle = am5.Circle.new(root, {
    radius: 5, // smaller than the origin dots
    tooltipText: "{title}",
    tooltipY: 0,
    fill: colors.getIndex(10),
    stroke: root.interfaceColors.get("background"),
    strokeWidth: 2
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

var originCities = [
  {
    id: "london",
    title: "London",
    destinations: [
      "vilnius",
      "reykjavik",
      "lisbon",
      "moscow",
      "belgrade",
      "ljubljana",
      "madrid",
      "stockholm",
      "bern",
      "kyiv",
      "new york"
    ],
    geometry: { type: "Point", coordinates: [-0.1262, 51.5002] },
    // the area its routes cover
    homeGeoPoint: { longitude: -18, latitude: 43 }, // the home view for this origin...
    homeZoomLevel: 3 // ...and how far to zoom in
  },
  {
    id: "vilnius",
    title: "Vilnius",
    destinations: [
      "london",
      "brussels",
      "prague",
      "athens",
      "dublin",
      "oslo",
      "moscow",
      "bratislava",
      "belgrade",
      "madrid"
    ],
    geometry: { type: "Point", coordinates: [25.2799, 54.6896] },
    homeGeoPoint: { longitude: 15, latitude: 49 },
    homeZoomLevel: 5.5
  }
];

var destinationCities = [
  {
    id: "brussels",
    title: "Brussels",
    geometry: { type: "Point", coordinates: [4.3676, 50.8371] }
  },
  {
    id: "prague",
    title: "Prague",
    geometry: { type: "Point", coordinates: [14.4205, 50.0878] }
  },
  {
    id: "athens",
    title: "Athens",
    geometry: { type: "Point", coordinates: [23.7166, 37.9792] }
  },
  {
    id: "reykjavik",
    title: "Reykjavik",
    geometry: { type: "Point", coordinates: [-21.8952, 64.1353] }
  },
  {
    id: "dublin",
    title: "Dublin",
    geometry: { type: "Point", coordinates: [-6.2675, 53.3441] }
  },
  {
    id: "oslo",
    title: "Oslo",
    geometry: { type: "Point", coordinates: [10.7387, 59.9138] }
  },
  {
    id: "lisbon",
    title: "Lisbon",
    geometry: { type: "Point", coordinates: [-9.1355, 38.7072] }
  },
  {
    id: "moscow",
    title: "Moscow",
    geometry: { type: "Point", coordinates: [37.6176, 55.7558] }
  },
  {
    id: "belgrade",
    title: "Belgrade",
    geometry: { type: "Point", coordinates: [20.4781, 44.8048] }
  },
  {
    id: "bratislava",
    title: "Bratislava",
    geometry: { type: "Point", coordinates: [17.1547, 48.2116] }
  },
  {
    id: "ljubljana",
    title: "Ljubljana",
    geometry: { type: "Point", coordinates: [14.506, 46.0514] }
  },
  {
    id: "madrid",
    title: "Madrid",
    geometry: { type: "Point", coordinates: [-3.7033, 40.4167] }
  },
  {
    id: "stockholm",
    title: "Stockholm",
    geometry: { type: "Point", coordinates: [18.0645, 59.3328] }
  },
  {
    id: "bern",
    title: "Bern",
    geometry: { type: "Point", coordinates: [7.4481, 46.948] }
  },
  {
    id: "kyiv",
    title: "Kyiv",
    geometry: { type: "Point", coordinates: [30.5367, 50.4422] }
  },
  {
    id: "new york",
    title: "New York",
    geometry: { type: "Point", coordinates: [-74, 40.43] }
  }
];

originSeries.data.setAll(originCities);
destinationSeries.data.setAll(destinationCities);

// The selected origin's routes give the home view; a globe turns to face them and zooms in half as far
function setHome() {
  var area = originSeries.getDataItemById(currentId).dataContext;
  if (globe) {
    chart.set("rotationX", -area.homeGeoPoint.longitude);
    chart.set("rotationY", -area.homeGeoPoint.latitude);
  }
  chart.set("homeGeoPoint", area.homeGeoPoint);
  chart.set("homeZoomLevel", globe ? area.homeZoomLevel / 2 : area.homeZoomLevel);
}

// Show the routes from an origin, "london" or "vilnius", and go to their area; a click on an origin calls it
function selectOrigin(id) {
  currentId = id;
  var dataItem = originSeries.getDataItemById(id);
  var dataContext = dataItem.dataContext;
  setHome();
  chart.goHome();

  var destinations = dataContext.destinations;
  var lineSeriesData = [];
  var originLongitude = dataItem.get("longitude");
  var originLatitude = dataItem.get("latitude");

  am5.array.each(destinations, function (did) {
    var destinationDataItem = destinationSeries.getDataItemById(did);
    // a destination can also be the other origin city
    if (!destinationDataItem) {
      destinationDataItem = originSeries.getDataItemById(did);
    }
    lineSeriesData.push({
      geometry: { // a line from the origin to the destination
        type: "LineString",
        coordinates: [
          [originLongitude, originLatitude],
          [
            destinationDataItem.get("longitude"),
            destinationDataItem.get("latitude")
          ]
        ]
      }
    });
  });
  lineSeries.data.setAll(lineSeriesData);
}

var currentId = "london";

// draw the first origin's routes once all the cities have their positions
destinationSeries.events.on("datavalidated", function () {
  selectOrigin(currentId);
});

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // small text...
  fill: am5.color(0xffffff), // ...in white, over the dark satellite picture...
  fillOpacity: 0.6,          // ...a little see-through
  x: am5.p100,               // at the chart's right edge...
  centerX: am5.p100,         // ...aligned by its own right edge
  dx: -10,                   // 10px in from the edge
  y: 10,                     // 10px from the top
  visible: false             // shown only with the satellite picture
}));

// The countries' own look, to go back to
var landTemplate = polygonSeries.mapPolygons.template;
var landLook = {
  fillOpacity: landTemplate.get("fillOpacity", 1),
  stroke: landTemplate.get("stroke", root.interfaceColors.get("background")),
  strokeOpacity: landTemplate.get("strokeOpacity", 1)
};

// The picture loads the first time it shows. Then the countries turn to white outlines over it, the grid lines
// and the routes turn white, the credit shows and the map sits in near-black space
satelliteSeries.on("visible", function(visible) {
  if (visible) {
    satelliteSeries.set("src", "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg");
  }
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  landTemplate.setAll(visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook);
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
  // white routes show over the dark picture
  lineSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
});

// Make stuff animate on load
chart.appear(1000, 100);
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
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
