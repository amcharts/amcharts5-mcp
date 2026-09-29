---
title: "Capitals Map"
source: "https://www.amcharts.com/demos/capitals-map/"
category: "maps"
scraped: "2026-09-29"
---

This world map shows the capital city of every country, 196 in all. Hover over a red star to see the capital and its country, zoom in to see all the capital names right on the map, or switch to the globe to spin the Earth.
Hover over a star to see the capital and its country
Zoom in (scroll, double-click or the + button) and the capital names appear on the map
Use the Map / Globe switch in the top-left corner to turn the map into a 3D globe
Drag to move around, hold Shift and drag to zoom into an area, and use the home button to see the whole world again
More to explore on DataViz Dojo
Spot the CountryHow fast can you find it? A world map geography quiz with five difficulty levels.
SVG Map GeneratorNeed a world or country map for a document or a website? Pick a projection and colors, then download a clean SVG.
PAC-WORLDThe classic arcade game played on a 3D globe: eat the dots and dodge the ghosts across the continents.
Make it your own
Want your own version of this map? Click Edit this chart to open it in the amCharts Editor. Change the colors, add your own cities or pins, highlight countries or map your own data, then export it or share it with a link. No coding needed.
For developers
This is an amCharts 5 MapChart with the Natural Earth projection (am5map.geoNaturalEarth1()). The Map / Globe switch swaps it for am5map.geoOrthographic() and makes vertical dragging rotate the globe. The capitals are a MapPointSeries fed with plain latitude and longitude data, each drawn as an am5.Star with a label. All the labels share one Template, so a single chart.on("zoomLevel") handler shows them once the map is zoomed in to level 3. The list of capitals comes from Natural Earth, a public-domain map dataset. The full JavaScript, TypeScript and JSON source is below.
Related demos
Zooming to Countries Map
Rotate Globe to a Selected Country
World Map With Clustered Points
Map chart
Map point series
Templates

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Atlas-style buttons and text
var myTheme = am5.Theme.new(root);

myTheme.rule("InterfaceColors").setAll({
  primaryButton: am5.color(0x3d6a8c),
  primaryButtonHover: am5.color(0x2f5673),
  primaryButtonDown: am5.color(0x25465e),
  primaryButtonActive: am5.color(0xc0392b),
  text: am5.color(0x2d3b45)
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root), myTheme
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "translateY",
  boxZoom: "shift",
  minZoomLevel: 0.5,
  projection: am5map.geoNaturalEarth1(),
  paddingBottom: 20,
  paddingTop: 20,
  paddingLeft: 20,
  paddingRight: 20,
  background: am5.Rectangle.new(root, {
    fill: am5.color(0xeef3f5),
    fillOpacity: 1
  })
}));


// Zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);


// Map / Globe switch
var cont = chart.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout,
  x: 20,
  y: 40
}));

cont.children.push(am5.Label.new(root, {
  centerY: am5.p50,
  text: "Map"
}));

var switchButton = cont.children.push(am5.Button.new(root, {
  themeTags: ["switch"],
  centerY: am5.p50,
  icon: am5.Circle.new(root, {
    themeTags: ["icon"]
  })
}));

cont.children.push(am5.Label.new(root, {
  centerY: am5.p50,
  text: "Globe"
}));

switchButton.on("active", function () {
  if (switchButton.get("active")) {
    chart.set("projection", am5map.geoOrthographic());
    chart.set("panY", "rotateY");
  }
  else {
    chart.set("projection", am5map.geoNaturalEarth1());
    chart.set("panY", "translateY");
    chart.set("rotationY", 0);
  }
});


// Create series for the ocean
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var oceanSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

oceanSeries.mapPolygons.template.setAll({
  fill: am5.color(0xcfe2ec),
  fillOpacity: 1,
  strokeOpacity: 0
});

oceanSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});


// Create graticule series
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0xffffff),
  strokeOpacity: 0.5
});


// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  fill: am5.color(0xf7f4ea),
  stroke: am5.color(0xb8c3c7),
  strokeWidth: 0.5
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0xefe6cf)
});


// Create point series for the capitals
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

// All capital name labels share this template, so they can be shown or hidden together
var labelTemplate = am5.Template.new({});

pointSeries.bullets.push(function () {
  var container = am5.Container.new(root, {
    tooltipText: "[bold]{title}[/]\n{country}",
    tooltipY: 0
  });

  // A red star, the usual atlas symbol for a capital
  container.children.push(am5.Star.new(root, {
    radius: 6,
    innerRadius: am5.percent(45),
    spikes: 5,
    fill: am5.color(0xc0392b),
    stroke: am5.color(0xffffff),
    strokeWidth: 1,
    centerX: am5.p50,
    centerY: am5.p50
  }));

  container.children.push(am5.Label.new(root, {
    text: "{title}",
    populateText: true,
    fontSize: 11,
    fontWeight: "600",
    fill: am5.color(0x2d3b45),
    centerY: am5.p50,
    dx: 6,
    paddingTop: 0,
    paddingBottom: 0
  }, labelTemplate));

  return am5.Bullet.new(root, {
    sprite: container
  });
});

// Capital names appear once the map is zoomed in far enough to fit them
labelTemplate.set("forceHidden", true);

chart.on("zoomLevel", function (zoomLevel) {
  labelTemplate.set("forceHidden", zoomLevel < 3);
});


// Capitals of the world's countries
// (Natural Earth populated places, public domain)
var capitals = [
  { title: "Kabul", country: "Afghanistan", latitude: 34.52, longitude: 69.18 },
  { title: "Tirana", country: "Albania", latitude: 41.33, longitude: 19.82 },
  { title: "Algiers", country: "Algeria", latitude: 36.77, longitude: 3.05 },
  { title: "Andorra la Vella", country: "Andorra", latitude: 42.5, longitude: 1.52 },
  { title: "Luanda", country: "Angola", latitude: -8.84, longitude: 13.23 },
  { title: "Saint John's", country: "Antigua and Barbuda", latitude: 17.12, longitude: -61.85 },
  { title: "Buenos Aires", country: "Argentina", latitude: -34.6, longitude: -58.4 },
  { title: "Yerevan", country: "Armenia", latitude: 40.18, longitude: 44.51 },
  { title: "Canberra", country: "Australia", latitude: -35.28, longitude: 149.13 },
  { title: "Vienna", country: "Austria", latitude: 48.2, longitude: 16.36 },
  { title: "Baku", country: "Azerbaijan", latitude: 40.4, longitude: 49.86 },
  { title: "Nassau", country: "Bahamas", latitude: 25.08, longitude: -77.35 },
  { title: "Manama", country: "Bahrain", latitude: 26.24, longitude: 50.58 },
  { title: "Dhaka", country: "Bangladesh", latitude: 23.73, longitude: 90.41 },
  { title: "Bridgetown", country: "Barbados", latitude: 13.1, longitude: -59.62 },
  { title: "Minsk", country: "Belarus", latitude: 53.9, longitude: 27.56 },
  { title: "Brussels", country: "Belgium", latitude: 50.84, longitude: 4.33 },
  { title: "Belmopan", country: "Belize", latitude: 17.25, longitude: -88.77 },
  { title: "Porto-Novo", country: "Benin", latitude: 6.48, longitude: 2.62 },
  { title: "Thimphu", country: "Bhutan", latitude: 27.47, longitude: 89.64 },
  { title: "Sucre", country: "Bolivia", latitude: -19.04, longitude: -65.26 },
  { title: "Sarajevo", country: "Bosnia and Herzegovina", latitude: 43.85, longitude: 18.38 },
  { title: "Gaborone", country: "Botswana", latitude: -24.65, longitude: 25.91 },
  { title: "Brasília", country: "Brazil", latitude: -15.78, longitude: -47.92 },
  { title: "Bandar Seri Begawan", country: "Brunei", latitude: 4.88, longitude: 114.93 },
  { title: "Sofia", country: "Bulgaria", latitude: 42.69, longitude: 23.31 },
  { title: "Ouagadougou", country: "Burkina Faso", latitude: 12.37, longitude: -1.53 },
  { title: "Bujumbura", country: "Burundi", latitude: -3.38, longitude: 29.36 },
  { title: "Phnom Penh", country: "Cambodia", latitude: 11.55, longitude: 104.91 },
  { title: "Yaoundé", country: "Cameroon", latitude: 3.87, longitude: 11.51 },
  { title: "Ottawa", country: "Canada", latitude: 45.42, longitude: -75.7 },
  { title: "Praia", country: "Cape Verde", latitude: 14.92, longitude: -23.52 },
  { title: "Bangui", country: "Central African Republic", latitude: 4.37, longitude: 18.56 },
  { title: "N'Djamena", country: "Chad", latitude: 12.12, longitude: 15.05 },
  { title: "Santiago", country: "Chile", latitude: -33.45, longitude: -70.67 },
  { title: "Beijing", country: "China", latitude: 39.93, longitude: 116.39 },
  { title: "Bogotá", country: "Colombia", latitude: 4.6, longitude: -74.09 },
  { title: "Moroni", country: "Comoros", latitude: -11.7, longitude: 43.24 },
  { title: "San José", country: "Costa Rica", latitude: 9.94, longitude: -84.09 },
  { title: "Zagreb", country: "Croatia", latitude: 45.8, longitude: 16.0 },
  { title: "Havana", country: "Cuba", latitude: 23.13, longitude: -82.37 },
  { title: "Nicosia", country: "Cyprus", latitude: 35.17, longitude: 33.37 },
  { title: "Prague", country: "Czechia", latitude: 50.09, longitude: 14.46 },
  { title: "Yamoussoukro", country: "Côte d'Ivoire", latitude: 6.82, longitude: -5.28 },
  { title: "Kinshasa", country: "Democratic Republic of Congo", latitude: -4.33, longitude: 15.31 },
  { title: "Copenhagen", country: "Denmark", latitude: 55.68, longitude: 12.56 },
  { title: "Djibouti", country: "Djibouti", latitude: 11.6, longitude: 43.15 },
  { title: "Roseau", country: "Dominica", latitude: 15.3, longitude: -61.39 },
  { title: "Santo Domingo", country: "Dominican Republic", latitude: 18.47, longitude: -69.9 },
  { title: "Quito", country: "Ecuador", latitude: -0.21, longitude: -78.5 },
  { title: "Cairo", country: "Egypt", latitude: 30.05, longitude: 31.25 },
  { title: "San Salvador", country: "El Salvador", latitude: 13.71, longitude: -89.2 },
  { title: "Malabo", country: "Equatorial Guinea", latitude: 3.75, longitude: 8.78 },
  { title: "Asmara", country: "Eritrea", latitude: 15.33, longitude: 38.93 },
  { title: "Tallinn", country: "Estonia", latitude: 59.43, longitude: 24.73 },
  { title: "Mbabane", country: "Eswatini", latitude: -26.32, longitude: 31.13 },
  { title: "Addis Ababa", country: "Ethiopia", latitude: 9.04, longitude: 38.7 },
  { title: "Palikir", country: "Federated States of Micronesia", latitude: 6.92, longitude: 158.15 },
  { title: "Suva", country: "Fiji", latitude: -18.13, longitude: 178.44 },
  { title: "Helsinki", country: "Finland", latitude: 60.18, longitude: 24.93 },
  { title: "Paris", country: "France", latitude: 48.87, longitude: 2.33 },
  { title: "Libreville", country: "Gabon", latitude: 0.39, longitude: 9.46 },
  { title: "Banjul", country: "Gambia", latitude: 13.45, longitude: -16.59 },
  { title: "Tbilisi", country: "Georgia", latitude: 41.73, longitude: 44.79 },
  { title: "Berlin", country: "Germany", latitude: 52.52, longitude: 13.4 },
  { title: "Accra", country: "Ghana", latitude: 5.55, longitude: -0.22 },
  { title: "Athens", country: "Greece", latitude: 37.99, longitude: 23.73 },
  { title: "Saint George's", country: "Grenada", latitude: 12.05, longitude: -61.74 },
  { title: "Guatemala City", country: "Guatemala", latitude: 14.62, longitude: -90.53 },
  { title: "Conakry", country: "Guinea", latitude: 9.53, longitude: -13.68 },
  { title: "Bissau", country: "Guinea-Bissau", latitude: 11.87, longitude: -15.6 },
  { title: "Georgetown", country: "Guyana", latitude: 6.8, longitude: -58.17 },
  { title: "Port-au-Prince", country: "Haiti", latitude: 18.54, longitude: -72.34 },
  { title: "Tegucigalpa", country: "Honduras", latitude: 14.1, longitude: -87.22 },
  { title: "Budapest", country: "Hungary", latitude: 47.5, longitude: 19.08 },
  { title: "Reykjavík", country: "Iceland", latitude: 64.15, longitude: -21.95 },
  { title: "New Delhi", country: "India", latitude: 28.6, longitude: 77.2 },
  { title: "Jakarta", country: "Indonesia", latitude: -6.17, longitude: 106.83 },
  { title: "Tehran", country: "Iran", latitude: 35.67, longitude: 51.42 },
  { title: "Baghdad", country: "Iraq", latitude: 33.34, longitude: 44.39 },
  { title: "Dublin", country: "Ireland", latitude: 53.34, longitude: -6.25 },
  { title: "Jerusalem", country: "Israel", latitude: 31.78, longitude: 35.21 },
  { title: "Rome", country: "Italy", latitude: 41.9, longitude: 12.48 },
  { title: "Kingston", country: "Jamaica", latitude: 17.98, longitude: -76.77 },
  { title: "Tokyo", country: "Japan", latitude: 35.69, longitude: 139.75 },
  { title: "Amman", country: "Jordan", latitude: 31.95, longitude: 35.93 },
  { title: "Astana", country: "Kazakhstan", latitude: 51.18, longitude: 71.43 },
  { title: "Nairobi", country: "Kenya", latitude: -1.28, longitude: 36.81 },
  { title: "Tarawa", country: "Kiribati", latitude: 1.34, longitude: 173.02 },
  { title: "Pristina", country: "Kosovo", latitude: 42.67, longitude: 21.17 },
  { title: "Kuwait City", country: "Kuwait", latitude: 29.37, longitude: 47.98 },
  { title: "Bishkek", country: "Kyrgyzstan", latitude: 42.88, longitude: 74.58 },
  { title: "Vientiane", country: "Lao People's Democratic Republic", latitude: 17.97, longitude: 102.6 },
  { title: "Riga", country: "Latvia", latitude: 56.95, longitude: 24.1 },
  { title: "Beirut", country: "Lebanon", latitude: 33.87, longitude: 35.51 },
  { title: "Maseru", country: "Lesotho", latitude: -29.32, longitude: 27.48 },
  { title: "Monrovia", country: "Liberia", latitude: 6.31, longitude: -10.8 },
  { title: "Tripoli", country: "Libya", latitude: 32.89, longitude: 13.18 },
  { title: "Vaduz", country: "Liechtenstein", latitude: 47.13, longitude: 9.52 },
  { title: "Vilnius", country: "Lithuania", latitude: 54.68, longitude: 25.32 },
  { title: "Luxembourg", country: "Luxembourg", latitude: 49.61, longitude: 6.13 },
  { title: "Antananarivo", country: "Madagascar", latitude: -18.91, longitude: 47.51 },
  { title: "Lilongwe", country: "Malawi", latitude: -13.98, longitude: 33.78 },
  { title: "Kuala Lumpur", country: "Malaysia", latitude: 3.17, longitude: 101.7 },
  { title: "Malé", country: "Maldives", latitude: 4.17, longitude: 73.5 },
  { title: "Bamako", country: "Mali", latitude: 12.65, longitude: -8.0 },
  { title: "Valletta", country: "Malta", latitude: 35.9, longitude: 14.51 },
  { title: "Majuro", country: "Marshall Islands", latitude: 7.1, longitude: 171.38 },
  { title: "Nouakchott", country: "Mauritania", latitude: 18.09, longitude: -15.98 },
  { title: "Port Louis", country: "Mauritius", latitude: -20.17, longitude: 57.5 },
  { title: "Mexico City", country: "Mexico", latitude: 19.44, longitude: -99.13 },
  { title: "Chișinău", country: "Moldova", latitude: 47.01, longitude: 28.86 },
  { title: "Monaco", country: "Monaco", latitude: 43.74, longitude: 7.41 },
  { title: "Ulaanbaatar", country: "Mongolia", latitude: 47.92, longitude: 106.91 },
  { title: "Podgorica", country: "Montenegro", latitude: 42.47, longitude: 19.27 },
  { title: "Rabat", country: "Morocco", latitude: 34.03, longitude: -6.84 },
  { title: "Maputo", country: "Mozambique", latitude: -25.95, longitude: 32.59 },
  { title: "Naypyidaw", country: "Myanmar", latitude: 19.77, longitude: 96.12 },
  { title: "Windhoek", country: "Namibia", latitude: -22.57, longitude: 17.08 },
  { title: "Yaren", country: "Nauru", latitude: -0.55, longitude: 166.92 },
  { title: "Kathmandu", country: "Nepal", latitude: 27.72, longitude: 85.31 },
  { title: "Amsterdam", country: "Netherlands", latitude: 52.35, longitude: 4.91 },
  { title: "Wellington", country: "New Zealand", latitude: -41.3, longitude: 174.78 },
  { title: "Managua", country: "Nicaragua", latitude: 12.15, longitude: -86.27 },
  { title: "Niamey", country: "Niger", latitude: 13.52, longitude: 2.11 },
  { title: "Abuja", country: "Nigeria", latitude: 9.09, longitude: 7.53 },
  { title: "Pyongyang", country: "North Korea", latitude: 39.02, longitude: 125.75 },
  { title: "Skopje", country: "North Macedonia", latitude: 42.0, longitude: 21.43 },
  { title: "Oslo", country: "Norway", latitude: 59.92, longitude: 10.75 },
  { title: "Muscat", country: "Oman", latitude: 23.61, longitude: 58.59 },
  { title: "Islamabad", country: "Pakistan", latitude: 33.7, longitude: 73.16 },
  { title: "Ngerulmud", country: "Palau", latitude: 7.49, longitude: 134.63 },
  { title: "Panama City", country: "Panama", latitude: 8.97, longitude: -79.53 },
  { title: "Port Moresby", country: "Papua New Guinea", latitude: -9.46, longitude: 147.19 },
  { title: "Asunción", country: "Paraguay", latitude: -25.29, longitude: -57.64 },
  { title: "Lima", country: "Peru", latitude: -12.05, longitude: -77.05 },
  { title: "Manila", country: "Philippines", latitude: 14.61, longitude: 120.98 },
  { title: "Warsaw", country: "Poland", latitude: 52.25, longitude: 21.0 },
  { title: "Lisbon", country: "Portugal", latitude: 38.72, longitude: -9.15 },
  { title: "Doha", country: "Qatar", latitude: 25.29, longitude: 51.53 },
  { title: "Brazzaville", country: "Republic of Congo", latitude: -4.26, longitude: 15.28 },
  { title: "Bucharest", country: "Romania", latitude: 44.44, longitude: 26.1 },
  { title: "Moscow", country: "Russia", latitude: 55.75, longitude: 37.61 },
  { title: "Kigali", country: "Rwanda", latitude: -1.95, longitude: 30.06 },
  { title: "Basseterre", country: "Saint Kitts and Nevis", latitude: 17.3, longitude: -62.72 },
  { title: "Castries", country: "Saint Lucia", latitude: 14.0, longitude: -61.0 },
  { title: "Kingstown", country: "Saint Vincent and the Grenadines", latitude: 13.15, longitude: -61.21 },
  { title: "Apia", country: "Samoa", latitude: -13.84, longitude: -171.74 },
  { title: "San Marino", country: "San Marino", latitude: 43.94, longitude: 12.44 },
  { title: "São Tomé", country: "Sao Tome and Principe", latitude: 0.33, longitude: 6.73 },
  { title: "Riyadh", country: "Saudi Arabia", latitude: 24.64, longitude: 46.77 },
  { title: "Dakar", country: "Senegal", latitude: 14.72, longitude: -17.48 },
  { title: "Belgrade", country: "Serbia", latitude: 44.82, longitude: 20.47 },
  { title: "Victoria", country: "Seychelles", latitude: -4.62, longitude: 55.45 },
  { title: "Freetown", country: "Sierra Leone", latitude: 8.47, longitude: -13.24 },
  { title: "Singapore", country: "Singapore", latitude: 1.29, longitude: 103.85 },
  { title: "Bratislava", country: "Slovakia", latitude: 48.15, longitude: 17.12 },
  { title: "Ljubljana", country: "Slovenia", latitude: 46.06, longitude: 14.51 },
  { title: "Honiara", country: "Solomon Islands", latitude: -9.44, longitude: 159.95 },
  { title: "Mogadishu", country: "Somalia", latitude: 2.07, longitude: 45.36 },
  { title: "Pretoria", country: "South Africa", latitude: -25.7, longitude: 28.23 },
  { title: "Seoul", country: "South Korea", latitude: 37.57, longitude: 127.0 },
  { title: "Juba", country: "South Sudan", latitude: 4.83, longitude: 31.58 },
  { title: "Madrid", country: "Spain", latitude: 40.4, longitude: -3.69 },
  { title: "Colombo", country: "Sri Lanka", latitude: 6.93, longitude: 79.86 },
  { title: "Khartoum", country: "Sudan", latitude: 15.59, longitude: 32.53 },
  { title: "Paramaribo", country: "Suriname", latitude: 5.84, longitude: -55.17 },
  { title: "Stockholm", country: "Sweden", latitude: 59.35, longitude: 18.1 },
  { title: "Bern", country: "Switzerland", latitude: 46.92, longitude: 7.47 },
  { title: "Damascus", country: "Syria", latitude: 33.5, longitude: 36.3 },
  { title: "Taipei", country: "Taiwan", latitude: 25.04, longitude: 121.57 },
  { title: "Dushanbe", country: "Tajikistan", latitude: 38.56, longitude: 68.77 },
  { title: "Dodoma", country: "Tanzania", latitude: -6.18, longitude: 35.75 },
  { title: "Bangkok", country: "Thailand", latitude: 13.75, longitude: 100.51 },
  { title: "Dili", country: "Timor-Leste", latitude: -8.56, longitude: 125.58 },
  { title: "Lomé", country: "Togo", latitude: 6.13, longitude: 1.22 },
  { title: "Nuku'alofa", country: "Tonga", latitude: -21.14, longitude: -175.22 },
  { title: "Port-of-Spain", country: "Trinidad and Tobago", latitude: 10.65, longitude: -61.52 },
  { title: "Tunis", country: "Tunisia", latitude: 36.8, longitude: 10.18 },
  { title: "Ashgabat", country: "Turkmenistan", latitude: 37.95, longitude: 58.38 },
  { title: "Funafuti", country: "Tuvalu", latitude: -8.52, longitude: 179.22 },
  { title: "Ankara", country: "Türkiye", latitude: 39.93, longitude: 32.86 },
  { title: "Kampala", country: "Uganda", latitude: 0.32, longitude: 32.58 },
  { title: "Kyiv", country: "Ukraine", latitude: 50.44, longitude: 30.51 },
  { title: "Abu Dhabi", country: "United Arab Emirates", latitude: 24.47, longitude: 54.37 },
  { title: "London", country: "United Kingdom", latitude: 51.5, longitude: -0.12 },
  { title: "Washington, D.C.", country: "United States", latitude: 38.9, longitude: -77.01 },
  { title: "Montevideo", country: "Uruguay", latitude: -34.86, longitude: -56.17 },
  { title: "Tashkent", country: "Uzbekistan", latitude: 41.31, longitude: 69.29 },
  { title: "Port Vila", country: "Vanuatu", latitude: -17.73, longitude: 168.32 },
  { title: "Vatican City", country: "Vatican City", latitude: 41.9, longitude: 12.45 },
  { title: "Caracas", country: "Venezuela", latitude: 10.5, longitude: -66.92 },
  { title: "Hanoi", country: "Vietnam", latitude: 21.04, longitude: 105.85 },
  { title: "Sana'a", country: "Yemen", latitude: 15.36, longitude: 44.2 },
  { title: "Lusaka", country: "Zambia", latitude: -15.41, longitude: 28.28 },
  { title: "Harare", country: "Zimbabwe", latitude: -17.82, longitude: 31.04 }
];

pointSeries.data.setAll(capitals);


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
  max-width:100%;
  height: 500px;
}

.single-demo .demo-background{background:#eef3f5;}
.single-demo .demo-body.extended{background:#eef3f5;padding:0;border-radius:0;border-top:none;}

```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
