---
title: "Map Using D3 Projections"
source: "https://www.amcharts.com/demos/map-using-d3-projections/"
category: "maps"
scraped: "2026-03-15"
---

Besides a solid list of built-in projections, amCharts 5 MapChart can use any projection from D3 and related packages.
Map chart: Using D3 projections

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv"); 
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
    projection: am5map.geoNaturalEarth1()
  })
);

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

var graticuleSeries = chart.series.insertIndex(
  0, am5map.GraticuleSeries.new(root, {})
);

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0x000000),
  strokeOpacity: 0.1
});

var backgroundSeries = chart.series.unshift(
  am5map.MapPolygonSeries.new(root, {})
);

backgroundSeries.mapPolygons.template.setAll({
  fill: am5.color(0xedf7fa),
  stroke: am5.color(0xedf7fa),
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

setProjection("geoAiry");

function setProjection(name) {
  chart.set("projection", d3[name].call(this));
  setButtonState();
}

function setIndex(offset) {
  var selector = document.getElementById("selector");
  var index = selector.selectedIndex + offset;
  if (index < 0) {
    index = 0;
  }
  if (index > (selector.options.length - 1)) {
    index = selector.options.length - 1;
  }
  selector.selectedIndex = index;
  setProjection(selector.options[index].value);
  setButtonState();
}

function setButtonState() {
  var selector = document.getElementById("selector");
  var index = selector.selectedIndex;
  if (index == 0) {
    document.getElementById("selector-prev").disabled = "disabled";
    document.getElementById("selector-next").disabled = "";
  }
  else if (index >= (selector.options.length - 1)) {
    document.getElementById("selector-prev").disabled = "";
    document.getElementById("selector-next").disabled = "disabled";
  }
  else {
    document.getElementById("selector-prev").disabled = "";
    document.getElementById("selector-next").disabled = "";
  }
}
```

## HTML

```html
<div class="tools">
  <input id="selector-prev" type="button" value="&lt;" onclick="setIndex(-1);" disabled="disabled" />
  <select id="selector" onchange="setProjection(this.options[this.selectedIndex].value);">
    <option value="geoAiry">d3.geoAiry()</option>
    <option value="geoAitoff">d3.geoAitoff()</option>
    <option value="geoArmadillo">d3.geoArmadillo()</option>
    <option value="geoAugust">d3.geoAugust()</option>
    <option value="geoAzimuthalEqualArea">d3.geoAzimuthalEqualArea()</option>
    <option value="geoAzimuthalEquidistant">d3.geoAzimuthalEquidistant()</option>
    <option value="geoBaker">d3.geoBaker()</option>
    <option value="geoBerghaus">d3.geoBerghaus()</option>
    <option value="geoBertin1953">d3.geoBertin1953()</option>
    <option value="geoBoggs">d3.geoBoggs()</option>
    <option value="geoBonne">d3.geoBonne()</option>
    <option value="geoBottomley">d3.geoBottomley()</option>
    <option value="geoBromley">d3.geoBromley()</option>
    <option value="geoChamberlinAfrica">d3.geoChamberlinAfrica()</option>
    <option value="geoCollignon">d3.geoCollignon()</option>
    <option value="geoConicConformal">d3.geoConicConformal()</option>
    <option value="geoConicEqualArea">d3.geoConicEqualArea()</option>
    <option value="geoConicEquidistant">d3.geoConicEquidistant()</option>
    <option value="geoCraig">d3.geoCraig()</option>
    <option value="geoCraster">d3.geoCraster()</option>
    <option value="geoCylindricalEqualArea">d3.geoCylindricalEqualArea()</option>
    <option value="geoCylindricalStereographic">d3.geoCylindricalStereographic()</option>
    <option value="geoEckert1">d3.geoEckert1()</option>
    <option value="geoEckert2">d3.geoEckert2()</option>
    <option value="geoEckert3">d3.geoEckert3()</option>
    <option value="geoEckert4">d3.geoEckert4()</option>
    <option value="geoEckert5">d3.geoEckert5()</option>
    <option value="geoEckert6">d3.geoEckert6()</option>
    <option value="geoEisenlohr">d3.geoEisenlohr()</option>
    <option value="geoEquirectangular">d3.geoEquirectangular()</option>
    <option value="geoFahey">d3.geoFahey()</option>
    <option value="geoFoucaut">d3.geoFoucaut()</option>
    <option value="geoFoucautSinusoidal">d3.geoFoucautSinusoidal()</option>
    <option value="geoGingery">d3.geoGingery()</option>
    <option value="geoGinzburg4">d3.geoGinzburg4()</option>
    <option value="geoGinzburg5">d3.geoGinzburg5()</option>
    <option value="geoGinzburg6">d3.geoGinzburg6()</option>
    <option value="geoGinzburg8">d3.geoGinzburg8()</option>
    <option value="geoGinzburg9">d3.geoGinzburg9()</option>
    <option value="geoGnomonic">d3.geoGnomonic()</option>
    <option value="geoGringorten">d3.geoGringorten()</option>
    <option value="geoGuyou">d3.geoGuyou()</option>
    <option value="geoHammer">d3.geoHammer()</option>
    <option value="geoHammerRetroazimuthal">d3.geoHammerRetroazimuthal()</option>
    <option value="geoHealpix">d3.geoHealpix()</option>
    <option value="geoHill">d3.geoHill()</option>
    <option value="geoHomolosine">d3.geoHomolosine()</option>
    <option value="geoHufnagel">d3.geoHufnagel()</option>
    <option value="geoHyperelliptical">d3.geoHyperelliptical()</option>
    <option value="geoKavrayskiy7">d3.geoKavrayskiy7()</option>
    <option value="geoLagrange">d3.geoLagrange()</option>
    <option value="geoLarrivee">d3.geoLarrivee()</option>
    <option value="geoLaskowski">d3.geoLaskowski()</option>
    <option value="geoLittrow">d3.geoLittrow()</option>
    <option value="geoLoximuthal">d3.geoLoximuthal()</option>
    <option value="geoMercator">d3.geoMercator()</option>
    <option value="geoMiller">d3.geoMiller()</option>
    <option value="geoModifiedStereographicAlaska">d3.geoModifiedStereographicAlaska()</option>
    <option value="geoModifiedStereographicGs48">d3.geoModifiedStereographicGs48()</option>
    <option value="geoModifiedStereographicGs50">d3.geoModifiedStereographicGs50()</option>
    <option value="geoModifiedStereographicMiller">d3.geoModifiedStereographicMiller()</option>
    <option value="geoModifiedStereographicLee">d3.geoModifiedStereographicLee()</option>
    <option value="geoMollweide">d3.geoMollweide()</option>
    <option value="geoMtFlatPolarParabolic">d3.geoMtFlatPolarParabolic()</option>
    <option value="geoMtFlatPolarQuartic">d3.geoMtFlatPolarQuartic()</option>
    <option value="geoMtFlatPolarSinusoidal">d3.geoMtFlatPolarSinusoidal()</option>
    <option value="geoNaturalEarth1">d3.geoNaturalEarth1()</option>
    <option value="geoNaturalEarth2">d3.geoNaturalEarth2()</option>
    <option value="geoNellHammer">d3.geoNellHammer()</option>
    <option value="geoNicolosi">d3.geoNicolosi()</option>
    <option value="geoOrthographic">d3.geoOrthographic()</option>
    <option value="geoPatterson">d3.geoPatterson()</option>
    <option value="geoPolyconic">d3.geoPolyconic()</option>
    <option value="geoRectangularPolyconic">d3.geoRectangularPolyconic()</option>
    <option value="geoRobinson">d3.geoRobinson()</option>
    <option value="geoSatellite">d3.geoSatellite()</option>
    <option value="geoSinusoidal">d3.geoSinusoidal()</option>
    <option value="geoSinuMollweide">d3.geoSinuMollweide()</option>
    <option value="geoStereographic">d3.geoStereographic()</option>
    <option value="geoTimes">d3.geoTimes()</option>
    <option value="geoTransverseMercator">d3.geoTransverseMercator()</option>
    <option value="geoTwoPointAzimuthalUsa">d3.geoTwoPointAzimuthalUsa()</option>
    <option value="geoTwoPointEquidistantUsa">d3.geoTwoPointEquidistantUsa()</option>
    <option value="geoVanDerGrinten">d3.geoVanDerGrinten()</option>
    <option value="geoVanDerGrinten2">d3.geoVanDerGrinten2()</option>
    <option value="geoVanDerGrinten3">d3.geoVanDerGrinten3()</option>
    <option value="geoVanDerGrinten4">d3.geoVanDerGrinten4()</option>
    <option value="geoWagner">d3.geoWagner()</option>
    <option value="geoWagner4">d3.geoWagner4()</option>
    <option value="geoWagner6">d3.geoWagner6()</option>
    <option value="geoWagner7">d3.geoWagner7()</option>
    <option value="geoWiechel">d3.geoWiechel()</option>
    <option value="geoWinkel3">d3.geoWinkel3()</option>
    <option value="geoInterruptedHomolosine">d3.geoInterruptedHomolosine()</option>
    <option value="geoInterruptedSinusoidal">d3.geoInterruptedSinusoidal()</option>
    <option value="geoInterruptedBoggs">d3.geoInterruptedBoggs()</option>
    <option value="geoInterruptedSinuMollweide">d3.geoInterruptedSinuMollweide()</option>
    <option value="geoInterruptedMollweide">d3.geoInterruptedMollweide()</option>
    <option value="geoInterruptedMollweideHemispheres">d3.geoInterruptedMollweideHemispheres()</option>
    <option value="geoPolyhedralButterfly">d3.geoPolyhedralButterfly()</option>
    <option value="geoPolyhedralCollignon">d3.geoPolyhedralCollignon()</option>
    <option value="geoPolyhedralWaterman">d3.geoPolyhedralWaterman()</option>
    <option value="geoGringortenQuincuncial">d3.geoGringortenQuincuncial()</option>
    <option value="geoPeirceQuincuncial">d3.geoPeirceQuincuncial()</option>
  </select>
  <input id="selector-next" type="button" value="&gt;" onclick="setIndex(1);" />
</div>
<div id="chartdiv"></div>
```

## CSS

```css
.tools {
  text-align: center;
}

.tools select, .tools input {
  font-size: 1.2em;
  padding: 0.2em 0.4em;
}

#chartdiv {
  width: 100%;
  height: 500px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://d3js.org/d3-array.v1.min.js
- https://d3js.org/d3-geo.v1.min.js
- https://d3js.org/d3-geo-projection.v2.min.js
