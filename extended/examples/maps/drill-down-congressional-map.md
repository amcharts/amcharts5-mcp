---
title: "Drill-Down Congressional Map"
source: "https://www.amcharts.com/demos/drill-down-congressional-map/"
category: "maps"
scraped: "2026-10-08"
---

A map of the United States that drills down to congressional districts: click a state to zoom in and load the map of its districts.

When to load maps on demand: Detailed maps are big files, so this one starts with the states and loads a state’s district map only when someone clicks it. The first view loads quickly, and the detail is a click away. The same approach works for countries and their regions, or any two levels of geography.

Good for:
- Districts, counties or zip codes within states
- Two levels of geography with large files
- Exploring one area at a time

Think twice when:
- Comparing districts across states: show them all at once
- Offline use: the maps load from the CDN
- Readers who won’t click: lead with the key area

Prompt: Create a two-level drill-down map of the United States: clicking a state zooms to it, loads its congressional districts map and shows the state’s name as the title. A back button returns to the whole country. Use the amCharts 5 library with its Responsive theme.

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

// Hover colors come from the theme's palette
var colors = am5.ColorSet.new(root, {});

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  minZoomLevel: 0.5,                 // zoom out to half the fitted size at most
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "translateX",                // dragging moves the map sideways (Albers USA can't rotate)
  panY: "translateY",                // ...and up and down
  projection: am5map.geoAlbersUsa(), // a US projection, with Alaska and Hawaii in insets at the lower left
  // room for the title above the map
  paddingTop: 40
}));

// Zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create polygon series for the states
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var usaSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_usaLow
}));

usaSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",           // the state's name on hover
  interactive: true,               // reacts to hover and clicks
  templateField: "polygonSettings" // styles from a polygonSettings field in the data, if a state has one
});

// a state turns a palette color under the pointer
usaSeries.mapPolygons.template.states.create("hover", {
  fill: colors.getIndex(9)
});

// a click zooms in on the state and loads its congressional districts
usaSeries.mapPolygons.template.events.on("click", (ev) => {
  var dataItem = ev.target.dataItem;
  // "US-CA" becomes "ca", the state's part of the district map's file name
  var id = dataItem.get("id").toLowerCase().split("-").pop();
  var name = dataItem.dataContext.name;
  var zoomAnimation = usaSeries.zoomToDataItem(dataItem); // zoom in to fit the clicked state

  // once the zoom has ended and the districts have loaded, swap the states for the districts
  Promise.all([
    zoomAnimation.waitForStop(),
    am5.net.load("https://cdn.amcharts.com/lib/5/geodata/json/region/usa/congressional120/" + id + "Low.json", chart)
  ]).then(function(results) {
    var geodata = am5.JSONParser.parse(results[1].response);
    stateSeries.setAll({
      geoJSON: geodata
    });

    stateSeries.show();
    usaSeries.hide(100); // hide the states in 0.1 seconds
    backContainer.show();
    title.set("text", name);
  });
});

// Create polygon series for the districts of the clicked state
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var stateSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  visible: false // hidden until a state is clicked
}));

stateSeries.mapPolygons.template.setAll({
  tooltipText: "{name}", // the district's name on hover
  interactive: true      // reacts to hover
});

stateSeries.mapPolygons.template.states.create("hover", {
  fill: colors.getIndex(9)
});

// Add button to go back to the whole country
var backContainer = chart.children.push(am5.Container.new(root, {
  x: am5.p100,                   // at the chart's right edge...
  centerX: am5.p100,             // ...aligned by its own right edge
  dx: -10,                       // 10px in from the edge
  paddingTop: 5,                 // space around the label and the arrow
  paddingRight: 10,
  paddingBottom: 5,
  y: 30,                         // a little below the top
  // the whole box takes the click, not the label and icon inside it
  interactiveChildren: false,
  layout: root.horizontalLayout, // the label and the arrow side by side
  cursorOverStyle: "pointer",    // a hand pointer over the button
  background: am5.RoundedRectangle.new(root, {
    fill: root.interfaceColors.get("background"), // a box in the chart's background color...
    fillOpacity: 0.7 // ...slightly see-through
  }),
  visible: false // hidden until a state is clicked
}));

var backLabel = backContainer.children.push(am5.Label.new(root, {
  text: "Back",
  centerY: am5.p50 // the label and the arrow line up on their middles
}));

var backButton = backContainer.children.push(am5.Graphics.new(root, {
  width: 32, // a 32px icon
  height: 32,
  centerY: am5.p50,
  fill: root.interfaceColors.get("text"), // in the text color, so it shows on light and dark backgrounds
  // a back arrow, as SVG path data
  svgPath: "M12 9.059V6.5a1.001 1.001 0 0 0-1.707-.708L4 12l6.293 6.207a.997.997 0 0 0 1.414 0A.999.999 0 0 0 12 17.5v-2.489c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941z"
}));

// back to the whole country: zoom out and swap the districts for the states
function goBack() {
  chart.goHome();
  usaSeries.show();
  stateSeries.hide();
  backContainer.hide();
  title.set("text", "United States");
}

backContainer.events.on("click", goBack);

// the zoom control's home button goes back to the whole country too
zoomControl.homeButton.events.on("click", goBack);

// the title sits in the room above the map ("absolute" places it from the chart's top edge, not inside the padding)
var title = chart.children.push(am5.Label.new(root, {
  text: "United States",
  position: "absolute",
  x: am5.p50,       // centered across the chart...
  centerX: am5.p50, // ...by its own middle
  y: 5,             // 5px from the top
  fontSize: 20,     // 20px text
  textAlign: "center"
}));
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
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://cdn.amcharts.com/lib/5/geodata/usaLow.js
