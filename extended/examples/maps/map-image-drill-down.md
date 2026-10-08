---
title: "Map Image Drill-Down"
source: "https://www.amcharts.com/demos/map-image-drill-down/"
category: "maps"
scraped: "2026-10-08"
---

A store locator that drills down: bubbles count the stores of a U.S. retail chain in each state. Click a state’s bubble to see its cities, then a city’s to see each store.

When to drill into points: Hundreds of points on one map turn into a blur, so this one starts with a bubble per state and opens the detail on click: cities, then single stores. Each level is a point series of its own, made the first time it’s opened, from one file of data. The same pattern suits any store, office or dealer finder.

Good for:
- Store, office and dealer finders
- Thousands of locations in a hierarchy
- Counts by region with the detail a click away

Think twice when:
- No natural levels like state and city: cluster the points
- Comparing regions exactly: a bar chart
- Readers looking for one address: add a search

Prompt: Create a store locator map of the United States that drills down in three levels: bubbles with the number of stores per state, then per city when a state is clicked, then each store when a city is clicked, with a button to zoom back out. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// =================================
// Create map chart
// =================================

// Create root and chart
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Colors from the theme, so the map follows the theme
var colors = am5.ColorSet.new(root, {});

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    minZoomLevel: 0.5, // can zoom out to half the fitted size
    // go to the home view once the map is fitted
    autoHome: true,
    panX: "rotateX",
    projection: am5map.geoAlbersUsa() // puts Alaska and Hawaii next to the other states
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_usaLow // the U.S. states, in low detail
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}" // the state's name on hover
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: colors.getIndex(9) // the hovered state turns another theme color
});

// a round zoom-out button, top right; the tooltip container keeps it above the map
var zoomOut = root.tooltipContainer.children.push(am5.Button.new(root, {
  x: am5.p100,
  y: 0,
  centerX: am5.p100,
  centerY: 0,
  paddingTop: 18, // padding that makes the button 36px square around the 12px minus sign
  paddingBottom: 18,
  paddingLeft: 12,
  paddingRight: 12,
  dx: -20,             // 20px in from the right edge...
  dy: 20,              // ...and 20px down from the top
  themeTags: ["zoom"], // styled like the map's zoom buttons
  icon: am5.Graphics.new(root, {
    themeTags: ["icon"],      // styled as a button icon
    strokeOpacity: 0.7,       // a slightly faded line
    draw: function(display) { // a minus sign: a 12px flat line
      display.moveTo(0, 0);
      display.lineTo(12, 0);
    }
  })
}));

zoomOut.get("background").setAll({
  cornerRadiusBL: 40, // corners rounded enough to make a circle
  cornerRadiusBR: 40,
  cornerRadiusTL: 40,
  cornerRadiusTR: 40
});
// zooming out goes back to the whole country and its state bubbles
zoomOut.events.on("click", function() {
  if (currentSeries) {
    currentSeries.hide();
  }
  chart.goHome();
  zoomOut.hide();
  currentSeries = regionalSeries.US.series;
  currentSeries.show();
});
zoomOut.hide(); // hidden until a bubble is clicked

// =================================
// Set up point series
// =================================

// Load store data: the stores of a U.S. retail chain, each with its city, state, coordinates and a count
am5.net.load("https://www.amcharts.com/wp-content/uploads/assets/maps/TargetStores.json").then(function(result) {
  var stores = am5.JSONParser.parse(result.response);
  setupStores(stores);
});

var regionalSeries = {}; // bubble data and series for the country, each state and each city
var currentSeries;       // the bubbles on screen now

// Parses data and creates map point series for country and state level
function setupStores(data) {

  // Init country-level series
  regionalSeries.US = {
    markerData: [],
    series: createSeries("stores") // sized by the number of stores
  };

  // Set current series
  currentSeries = regionalSeries.US.series;

  // Process data
  am5.array.each(data.query_results, function(store) {

    // Get store data
    var store = {
      state: store.MAIL_ST_PROV_C,
      long: am5.type.toNumber(store.LNGTD_I),
      lat: am5.type.toNumber(store.LATTD_I),
      location: store.co_loc_n,
      city: store.mail_city_n,
      count: am5.type.toNumber(store.count)
    };

    // Process state-level data
    if (regionalSeries[store.state] == undefined) {
      var statePolygon = getPolygon("US-" + store.state);
      if (statePolygon) {

        // the state's bubble goes to the visual center of its shape
        var centroid = statePolygon.visualCentroid();

        // Add state data
        regionalSeries[store.state] = {
          target: store.state, // the key of this state's own drill-down level
          type: "state",
          name: statePolygon.dataItem.dataContext.name,
          count: store.count,
          stores: 1, // the first store found; more are counted below
          state: store.state,
          markerData: [],
          geometry: {
            type: "Point",
            coordinates: [centroid.longitude, centroid.latitude]
          }
        };
        // the state's bubble goes on the country level
        regionalSeries.US.markerData.push(regionalSeries[store.state]);

      }
      else {
        // State not found
        return;
      }
    }
    else {
      regionalSeries[store.state].stores++;             // one more store in the state...
      regionalSeries[store.state].count += store.count; // ...and its count added
    }

    // Process city-level data
    if (regionalSeries[store.city] == undefined) {
      regionalSeries[store.city] = {
        target: store.city,
        type: "city",
        name: store.city,
        count: store.count,
        stores: 1,
        state: store.state,
        markerData: [],
        geometry: {
          type: "Point",
          coordinates: [store.long, store.lat]
        }
      };
      // the city's bubble goes on its state's level
      regionalSeries[store.state].markerData.push(regionalSeries[store.city]);
    }
    else {
      regionalSeries[store.city].stores++;
      regionalSeries[store.city].count += store.count;
    }

    // Process individual store
    regionalSeries[store.city].markerData.push({
      name: store.location,
      count: store.count,
      stores: 1,
      state: store.state,
      geometry: {
        type: "Point",
        coordinates: [store.long, store.lat]
      }
    });

  });
  regionalSeries.US.series.data.setAll(regionalSeries.US.markerData); // show the state bubbles first
}

// Finds polygon in series by its id
function getPolygon(id) {
  var found;
  polygonSeries.mapPolygons.each(function(polygon) {
    if (polygon.dataItem.get("id") == id) {
      found = polygon;
    }
  })
  return found;
}

// All counts on the bubbles share this template, so they can be shown or hidden at once, on every level
var labelTemplate = am5.Template.new({
  fill: root.interfaceColors.get("background"), // text in the background color, to stand out on the bubbles
  centerX: am5.p50,   // centered on the bubble...
  centerY: am5.p50,   // ...both ways...
  textAlign: "center" // ...and line by line
});

// Creates series with heat rules
function createSeries(heatfield) {

  // Create point series
  var pointSeries = chart.series.push(
    am5map.MapPointSeries.new(root, {
      valueField: heatfield,    // the field the bubble size comes from
      calculateAggregates: true // works out the lowest and highest value, which the heat rule needs
    })
  );

  // Each series has a bubble template of its own, the target of its heat rule
  var circleTemplate = am5.Template.new({
    fill: root.interfaceColors.get("alternativeBackground"), // bubbles in the contrast color...
    fillOpacity: 0.7,           // ...slightly see-through
    cursorOverStyle: "pointer", // a hand pointer: the bubbles can be clicked
    tooltipText: "{name}:\n[bold]{stores} stores[/]" // the place's name and its number of stores
  });

  // Add store bullet: a bubble with the number of stores on it
  pointSeries.bullets.push(function() {
    var container = am5.Container.new(root, {});

    var circle = container.children.push(am5.Circle.new(root, {
      radius: 10 // a starting size; the heat rule sets the real one
    }, circleTemplate));

    container.children.push(am5.Label.new(root, {
      text: "{stores}",  // the number of stores...
      populateText: true // ...filled in from the data item
    }, labelTemplate));

    // Set up drill-down
    circle.events.on("click", function(ev) {

      // Determine what we've clicked on
      var data = ev.target.dataItem.dataContext;

      // No target? An individual store: nothing to drill down to further
      if (!data.target) {
        return;
      }

      // Create actual series if it hasn't been yet created
      if (!regionalSeries[data.target].series) {
        // deeper levels are sized by the stores' count field
        regionalSeries[data.target].series = createSeries("count");
        regionalSeries[data.target].series.data.setAll(data.markerData);
      }

      // Hide current series
      if (currentSeries) {
        currentSeries.hide();
      }

      // Control zoom
      if (data.type == "state") {
        var statePolygon = getPolygon("US-" + data.state);
        polygonSeries.zoomToDataItem(statePolygon.dataItem); // zoom to fit the state
      }
      else if (data.type == "city") {
        // zoom level 64, centered on the city
        chart.zoomToGeoPoint({
          latitude: data.geometry.coordinates[1],
          longitude: data.geometry.coordinates[0]
        }, 64, true);
      }
      zoomOut.show(); // show the zoom-out button

      // Show new target series
      currentSeries = regionalSeries[data.target].series;
      currentSeries.show();
    });

    return am5.Bullet.new(root, {
      sprite: container
    });
  });

  // Add heat rule for circles
  pointSeries.set("heatRules", [{
    target: circleTemplate,
    dataField: "value",
    min: 10, // bubbles from 10px...
    max: 30, // ...to 30px radius
    key: "radius"
  }]);

  return pointSeries;
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
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/usaLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
