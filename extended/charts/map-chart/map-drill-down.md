---
title: "Map drill-down"
source: "https://www.amcharts.com/docs/v5/charts/map-chart/map-drill-down/"
scraped: "2026-03-15"
---

This tutorial will look at the ways drill-down/up navigation can be implemented in a map chart.

## Workflow

Typically, a drill-down in a map chart is set up using these steps:

1.  Catch click/tap event on a country/area.
2.  Zoom in to the target area.
3.  Hide or fade out source map polygon series.
4.  Show or fade in target polygon series. If needed also change geodata for the target polygon series.

The following sections will examine those steps one-by-one.

## Static geodata

For the purpose of this tutorial let's examine a scenario where Continent map drills-down into World map.

### Creating series

This scenario will use two levels of drill down: Continents and World (countries).

We will pre-create a map polygon series for each of those:

let continentSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata\_continentsLow,
  exclude: \["antarctica"\]
}));

let countrySeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata\_worldLow,
  exclude: \["AQ"\],
  visible: false
}));

var continentSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata\_continentsLow,
  exclude: \["antarctica"\]
}));

var countrySeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata\_worldLow,
  exclude: \["AQ"\],
  visible: false
}));

When drilling down we will hide `continentSeries` and reveal `countrySeries`, and vice versa when drilling up.

### Capturing clicks

To capture a click (or tap) on a map polygon, we can use `click` event, set on polygon template:

continentSeries.mapPolygons.template.events.on("click", function (ev) {

  // Clicked on a continent
  // ev.dataItem will container clicked polygon's data item
});

continentSeries.mapPolygons.template.events.on("click", function (ev) {
  // Clicked on a continent
  // ev.dataItem will container clicked polygon's data item
});

Now, our custom function will kick in every time we click on any continent.

We just need to fill in the code to:

-   Zoom in on a clicked continent.
-   Fade out continent series.
-   Fade in country series.

continentSeries.mapPolygons.template.events.on("click", function (ev) {
  continentSeries.zoomToDataItem(ev.target.dataItem);
  continentSeries.hide();
  countrySeries.show();
});

continentSeries.mapPolygons.template.events.on("click", function (ev) {
  continentSeries.zoomToDataItem(ev.target.dataItem);
  continentSeries.hide();
  countrySeries.show();
});

MORE INFOFor more information about zooming map via API, refer to "Panning and zooming the map: [Zooming to clicked object](https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zooming_to_clicked_object)". For an in-depth info about events, check out "[Events](https://www.amcharts.com/docs/v5/concepts/events/)" tutorial.

### Drill-up

For going back to continent view, let's create a simple button which would be hidden by default, but would be revealed when drill-down happens:

let homeButton = chart.children.push(am5.Button.new(root, {
  paddingTop: 10,
  paddingBottom: 10,
  x: am5.percent(100),
  centerX: am5.percent(100),
  opacity: 0,
  interactiveChildren: false,
  icon: am5.Graphics.new(root, {
    svgPath: "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8",
    fill: am5.color(0xffffff)
  })
}));

homeButton.events.on("click", function() {
  chart.goHome();
  continentSeries.show();
  countrySeries.hide();
  homeButton.hide();
});

var homeButton = chart.children.push(am5.Button.new(root, {
  paddingTop: 10,
  paddingBottom: 10,
  x: am5.percent(100),
  centerX: am5.percent(100),
  opacity: 0,
  interactiveChildren: false,
  icon: am5.Graphics.new(root, {
    svgPath: "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8",
    fill: am5.color(0xffffff)
  })
}));

homeButton.events.on("click", function() {
  chart.goHome();
  continentSeries.show();
  countrySeries.hide();
  homeButton.hide();
});

In the above code, we add `click` event to the button which:

-   Uses map chart's `goHome()` method to zoom the map fully back out.
-   Hides country series and reveals continent series.
-   Hides itself because we don't need it on top level of the drill-down map.

### Full example


## Dynamic geodata

In previous section we were just switching back and forth between two fully set up polygon series.

In the following chapters we'll take a look how we can reuse polygon series for displaying dynamically loaded geodata, by building a World map that drill-down into individual country maps.

Here instead of pre-filling target series' `geoJSON` setting with a pre-loaded map, we will determine clicked country and load geodata dynamically.

Furthermore, we will use `Promise` object to sync zoom-in animations and loading of external geodata.

worldSeries.mapPolygons.template.events.on("click", function (ev) {
  let country = ev.target.dataItem.get("id");
  let map;
  switch(country) {
    case "US":
      map = "usaLow.json";
      break;
    case "CA":
      map = "canadaLow.json";
      break;
    case "MX":
      map = "mexicoLow.json";
      break;
  }

  if (map) {
    Promise.all(\[
      // Initiate zoom to country animation
      worldSeries.zoomToDataItem(ev.target.dataItem).waitForStop(),

      // Start loading target geodata
      am5.net.load("https://cdn.amcharts.com/lib/5/geodata/json/" + map, chart)
    \]).then(function(result) {
      // Both zoom and geodata loading is complete
      let geodata = am5.JSONParser.parse(result\[1\].response);
      countrySeries.setAll({
        geoJSON: geodata
      });
      countrySeries.show();
      worldSeries.hide();
      homeButton.show();
    });
  }
});

worldSeries.mapPolygons.template.events.on("click", function (ev) {
  var country = ev.target.dataItem.get("id");
  var map;
  switch(country) {
    case "US":
      map = "usaLow.json";
      break;
    case "CA":
      map = "canadaLow.json";
      break;
    case "MX":
      map = "mexicoLow.json";
      break;
  }

  if (map) {
    Promise.all(\[
      // Initiate zoom to country animation
      worldSeries.zoomToDataItem(ev.target.dataItem).waitForStop(),

      // Start loading target geodata
      am5.net.load("https://cdn.amcharts.com/lib/5/geodata/json/" + map, chart)
    \]).then(function(result) {
      // Both zoom and geodata loading is complete
      var geodata = am5.JSONParser.parse(result\[1\].response);
      countrySeries.setAll({
        geoJSON: geodata
      });
      countrySeries.show();
      worldSeries.hide();
      homeButton.show();
    });
  }
});

Let's examine the code above.

First we determine ID of a clicked country, by accessing `id` setting of its data item.

Then we determine which map is appropriate for the clicked country.

We also use built-in [data loader](https://www.amcharts.com/docs/v5/concepts/data/#External_data) and JSON parser to load GeoJSON data as well as set it on the country series.

Finally, to avoid visual glitches, we don't want country series geodata to be set before it finishes loading, or before zoom animation is played out, so we employ `Promise` mechanism to sync up zoom and loading.

Series' `zoomToDataItem()` method will return `Animation` object, which in turn has a method `waitForStop()` that returns a promise that kicks in when animation finishes playing.

Similarly, `net.load()` utility also returns a promise.

We sync up both using `[Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)` method.


## Examples

Here's another example which uses bundled country data to bind each country with appropriate map.


And another version of the same map with a zoom control.


