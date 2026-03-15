---
title: "Day and Night World Map"
source: "https://www.amcharts.com/demos/day-and-night-world-map/"
category: "maps"
scraped: "2026-03-15"
---

Seeing the visual representation of the time of day in various places in the world could be a very useful aid in business, tourism, and other areas. This demo shows you how to implement the day/night view with amCharts Maps.
Key implementation details
The sun is just a circle bullet on a MapPointSeries that we position using the open source calculation functions available here. The "night" is just 3 overlayed "geo circles" (circles defined by geographic coordinates with radius in degrees). We use 3 circles with different radii to create the transitional twilight area. The center of the circles is position on the exactly opposed side of the world to the sun position.
Map point series
Map polygon series
getGeoCircle()

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");
var baseTime = new Date().getTime() - am5.time.getDuration("day", 2);
var centerOnSun = false;

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Dark.new(root)
]);

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "rotateY",
  projection: am5map.geoMercator()
}));

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0,
  strokeOpacity: 0
});

// Add background polygon
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

root.systemTooltip.setAll({
  getFillFromSprite: false,
  getStrokeFromSprite: false,
  autoTextColor: true
});

root.systemTooltip.get("background").setAll({
  fill: am5.color(0xffffff),
  fillOpacity: 0.8
});


polygonSeries.mapPolygons.template.setAll({
  tooltip: root.systemTooltip,
  fill: am5.color(0x47c78a),
  stroke: am5.color(0x454a58),
  tooltipText: "{name}",
  tooltipPosition: "pointer",
  toggleKey: "active",
  cursorOverStyle: "pointer"
});

var longitude = 0;
var latitude = 0;
chart.events.on("globalpointermove", function (ev) {
  var point = chart.invert({ x: ev.point.x, y: ev.point.y });

  longitude = point.longitude;
  latitude = point.latitude;
});





// Set up events
var previousPolygon;

polygonSeries.mapPolygons.template.on("active", function (active, target) {
  if (previousPolygon && previousPolygon != target) {
    previousPolygon.set("active", false);
  }
  if (target.get("active")) {
    selectCountry(target.dataItem.get("id"));
  }
  previousPolygon = target;
});

function selectCountry(id) {
  var dataItem = polygonSeries.getDataItemById(id);
  var target = dataItem.get("mapPolygon");
  if (target) {
    var centroid = target.geoCentroid();
    if (centroid) {
      chart.animate({ key: "rotationX", to: -centroid.longitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
      chart.animate({ key: "rotationY", to: -centroid.latitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
    }
  }
}



// Create point series for Sun icon
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var sunSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

sunSeries.bullets.push(function () {
  var circle = am5.Circle.new(root, {
    radius: 18,
    fill: am5.color(0xffba00),
    filter: "blur(5px)"
  });

  circle.animate({
    key: "radius",
    duration: 2000,
    to: 23,
    loops: Infinity,
    easing: am5.ease.yoyo(am5.ease.linear)
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

sunSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 14,
      fill: am5.color(0xffba00)
    })
  });
});

var sunDataItem = sunSeries.pushDataItem({});




var teslaContainer =
  chart.children.push(am5.Container.new(root, {
    centerX: am5.p50,
    centerY: am5.p50,
    tooltip: root.systemTooltip,
    tooltipText: "Tesla",
    background: am5.RoundedRectangle.new(root, {
      interactive: true,
      fill: am5.color(0x000000),
      fillOpacity: 0,
      strokeOpacity: 0,
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10
    })
  }));


var tesla = teslaContainer.children.push(am5.Picture.new(root, {
  forceInactive: true,
  width: 20,
  height: 20,
  centerX: am5.p50,
  centerY: am5.p50,
  src: "https://www.amcharts.com/wp-content/uploads/2021/11/tesla.png"
}));


var direction = Math.random() * 360;
var speed = 1;

var tooltipTexts = [
  "Huston, we have a problem.",
  "Ground control to Major Tom..."
]



teslaContainer.adapters.add("tooltipText", function (text, target) {
  return tooltipTexts[Math.floor(Math.random() * tooltipTexts.length)];
});

teslaContainer.set("x", Math.random() * chart.width());
teslaContainer.set("y", Math.random() * chart.height());

teslaContainer.events.on("pointerover", function () {
  speed = 0;
});


teslaContainer.events.on("pointerout", function () {
  direction = (Math.random() * 360);
  speed = Math.random() * 2 - 1;
});

function animateTesla() {
  var radians = direction * Math.PI / 180; 
  
  var newX = teslaContainer.get("x") + Math.cos(radians) * speed;
  var newY = teslaContainer.get("y") + Math.sin(radians) * speed;

  // Wrap around screen edges
  if (newX < 0) newX = chart.width();
  if (newX > chart.width()) newX = 0;
  if (newY < 0) newY = chart.height();
  if (newY > chart.height()) newY = 0;

  teslaContainer.set("x", newX);
  teslaContainer.set("y", newY);

  tesla.set("rotation", tesla.get("rotation") + speed * 2);

  requestAnimationFrame(animateTesla);
}

animateTesla();

// Create polygon series for night-time polygons
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var nightSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

nightSeries.mapPolygons.template.setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.25,
  strokeOpacity: 0
});

var nightDataItem0 = nightSeries.pushDataItem({});
var nightDataItem1 = nightSeries.pushDataItem({});
var nightDataItem2 = nightSeries.pushDataItem({});

// Create controls
var container = chart.children.push(
  am5.Container.new(root, {
    y: am5.percent(95),
    centerX: am5.p50,
    x: am5.p50,
    paddingRight: 20,
    paddingLeft: 60,
    width: am5.percent(100),
    layout: root.horizontalLayout
  })
);

var playButton = container.children.push(
  am5.Button.new(root, {
    themeTags: ["play"],
    centerY: am5.p50,
    marginRight: 15,
    icon: am5.Graphics.new(root, {
      themeTags: ["icon"]
    })
  })
);

playButton.events.on("click", function () {
  if (playButton.get("active")) {
    slider.set("start", slider.get("start") + 0.0001);
  } else {
    slider.animate({
      key: "start",
      to: 1,
      duration: 15000 * (1 - slider.get("start"))
    });
  }
});

var slider = container.children.push(
  am5.Slider.new(root, {
    orientation: "horizontal",
    start: 0.5,
    centerY: am5.p50
  })
);

slider.on("start", function (start) {
  if (start === 1) {
    playButton.set("active", false);
  }
});

slider.events.on("rangechanged", function () {
  updateDateNight(
    (slider.get("start", 0) - 0.5) * am5.time.getDuration("day", 2) + baseTime
  );
});

var timeLabel = container.children.push(am5.EditableLabel.new(root, {
  multiLine: false,
  marginLeft: 20,
  centerY: am5.p50
}));

timeLabel.get("background").set("strokeOpacity", .5);

timeLabel.on("active", function () {
  var date = chart.getDateFormatter().parse(timeLabel.get("text"), "MMM dd yyyy HH:mm");

  baseTime = date.getTime() - am5.time.getDuration("day", 2);
  slider.set("start", 0.5);

  updateDateNight(
    (slider.get("start", 0) - 0.5) * am5.time.getDuration("day", 2) + baseTime
  );

})

var cont = chart.children.push(
  am5.Container.new(root, {
    x: 20,
    y: 20,
    layout: root.horizontalLayout
  })
);

cont.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Map"
  })
);

var switchButton = cont.children.push(
  am5.Button.new(root, {
    themeTags: ["switch"],
    centerY: am5.p50,
    icon: am5.Circle.new(root, {
      themeTags: ["icon"]
    })
  })
);

switchButton.on("active", function () {
  if (!switchButton.get("active")) {
    chart.set("projection", am5map.geoMercator());
    chart.rotate(0, 0);
    setTimeout(() => {
      chart.goHome();
    }, 100);

    backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
  } else {
    chart.rotate(0, 0);
    setTimeout(() => {
      chart.goHome();
    }, 100);
    chart.set("projection", am5map.geoOrthographic());
    backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
  }
});
cont.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Globe"
  })
);


/// center switch
var cont2 = chart.children.push(
  am5.Container.new(root, {
    layout: root.horizontalLayout,
    x: am5.p100,
    y: 20,
    centerX: am5.p100,
    dx: -20
  })
);

cont2.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Move Sun"
  })
);

var switchButton2 = cont2.children.push(
  am5.Button.new(root, {
    themeTags: ["switch"],
    centerY: am5.p50,
    icon: am5.Circle.new(root, {
      themeTags: ["icon"]
    })
  })
);

switchButton2.on("active", function (active) {

  centerOnSun = active;

  updateDateNight(
    (slider.get("start", 0) - 0.5) * am5.time.getDuration("day", 2) + baseTime
  );
});

cont2.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Move Map"
  })
);

var triviaContainer = chart.children.push(am5.Container.new(root, {
  x: am5.percent(50),
  y: am5.percent(90),
  centerY: am5.p100,
  centerX: am5.p50,
  width: am5.percent(60),
  layout: root.horizontalLayout,
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 8,
  paddingRight: 8
}));

triviaContainer.set("background", am5.RoundedRectangle.new(root, {
  fill: am5.color(0x000000),
  fillOpacity: 0.5,
  strokeOpacity: 0,
  cornerRadiusTL: 10,
  cornerRadiusTR: 10,
  cornerRadiusBL: 10,
  cornerRadiusBR: 10
}));

var facts = [
  "At the equator, day and night are almost the same length all year, because the Sun’s path stays fairly consistent.",
  "The Earth spins eastward, which is why the Sun appears to rise in the east and set in the west.",
  "During solstices, one hemisphere gets its longest day while the other gets its longest night.",
  "In polar regions, the Sun can stay above the horizon for months (Midnight Sun) or disappear for months (Polar Night).",
  "The place on Earth where the Sun is exactly overhead at noon is always somewhere between the Tropic of Cancer and the Tropic of Capricorn.",
  "Sunrise and sunset are slightly illusions, because the atmosphere bends sunlight and makes the Sun appear higher than it actually is.",
  "The day is not exactly 24 hours; Earth's rotation is slowly slowing down, so we occasionally add leap seconds.",
  "The reason summer days are longer is not because Earth is closer to the Sun, but because of the tilt of Earth’s axis.",
  "The length of twilight depends on your latitude; near the poles, twilight can last for hours.",
  "At the equinoxes, everywhere on Earth gets roughly 12 hours of daylight and 12 hours of night.",
  "Solar noon (when the Sun is highest) is rarely the same as 12:00 on your clock, thanks to time zones and Earth’s orbit shape.",
  "When you see a sunrise, you’re actually seeing the Sun from about two minutes earlier due to the speed of light and atmospheric refraction."
];

var fact = Math.floor(Math.random() * facts.length);

triviaContainer.children.push(am5.Graphics.new(root, {
  svgPath: "M11 0V3h2V0H11zM4.2 2.8 2.8 4.2 4.9 6.3 6.3 4.9 4.2 2.8zm15.6 0-2.1 2.1 1.4 1.4 2.1-2.1-1.4-1.4zM12 5C8.1 5 5 8.1 5 12c0 2.8 1.7 5.1 4 6.2V21c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V18.2c2.3-1.1 4-3.5 4-6.2 0-3.9-3.1-7-7-7zm0 2c2.8 0 5 2.2 5 5 0 2.2-1.4 4-3.3 4.7L13 16.9V21H11V16.9l-.7-.2C8.4 16 7 14.2 7 12c0-2.8 2.2-5 5-5zM0 11v2H3V11H0zm21 0v2h3V11H21zM4.9 17.7 2.8 19.8l1.4 1.4 2.1-2.1-1.4-1.4zm14.1 0-1.4 1.4 2.1 2.1 1.4-1.4-2.1-2.1z",
  fill: am5.color(0xffffff),
  marginRight: 10,
  centerY: am5.p50,
  y: am5.p50
}));


var label = triviaContainer.children.push(am5.Label.new(root, {
  text: facts[fact],
  fontSize: "0.8em",
  width: am5.percent(100),
  oversizedBehavior: "wrap",
  marginRight: 15,
  fill: am5.color(0xffffff)
}));

triviaContainer.events.on("boundschanged", function () {
  label.set("maxWidth", triviaContainer.width() - 80);
});

label.adapters.add("maxWidth", function (maxWidth, target) {
  return triviaContainer.width() - 80;
})

// close (X) button
triviaContainer.children.push(am5.Graphics.new(root, {
  svgPath: "M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4l5.6 5.6L5 17.6l1.4 1.4L12 13.4l5.6 5.6 1.4-1.4-5.6-5.6z",
  fill: am5.color(0xffffff),
  cursorOverStyle: "pointer",
  centerY: am5.p50,
  y: am5.p50
}));

var interval = setInterval(() => {
  fact++;
  if (fact >= facts.length) {
    fact = 0;
  }
  var promise = triviaContainer.hide();
  promise.then(function () {
    label.set("text", facts[fact]);
    triviaContainer.show();
  });

}, 10000);


triviaContainer.events.on("click", function () {
  triviaContainer.hide();
clearInterval(interval);
});

chart.appear(1000, 100);

var currentDate = new Date();

function updateDateNight(time) {
  var sunPosition = solarPosition(time);
  sunDataItem.set("longitude", sunPosition.longitude);
  sunDataItem.set("latitude", sunPosition.latitude);

  var nightPosition = {
    longitude: sunPosition.longitude + 180,
    latitude: -sunPosition.latitude
  };

  nightDataItem0.set("geometry", am5map.getGeoCircle(nightPosition, 92));
  nightDataItem1.set("geometry", am5map.getGeoCircle(nightPosition, 90));
  nightDataItem2.set("geometry", am5map.getGeoCircle(nightPosition, 88));

  if (centerOnSun) {
    chart.set("rotationX", -sunPosition.longitude);
  }

  currentDate.setTime(time);

  timeLabel.set("text", chart.getDateFormatter().format(new Date(time), "MMM dd yyyy HH:mm"));
}

var offset = new Date().getTimezoneOffset() * 60 * 1000;
//updateDateNight(new Date().getTime());

// all sun position calculation is taken from: http://bl.ocks.org/mbostock/4597134
function solarPosition(time) {
  var centuries = (time - Date.UTC(2000, 0, 1, 12)) / 864e5 / 36525; // since J2000
  var longitude =
    ((am5.time.round(new Date(time), "day", 1).getTime() - time - offset) /
      864e5) *
    360 -
    180;

  return am5map.normalizeGeoPoint({
    longitude: longitude - equationOfTime(centuries) * am5.math.DEGREES,
    latitude: solarDeclination(centuries) * am5.math.DEGREES
  });
}

// Equations based on NOAA’s Solar Calculator; all angles in RADIANS.
// http://www.esrl.noaa.gov/gmd/grad/solcalc/

function equationOfTime(centuries) {
  var e = eccentricityEarthOrbit(centuries),
    m = solarGeometricMeanAnomaly(centuries),
    l = solarGeometricMeanLongitude(centuries),
    y = Math.tan(obliquityCorrection(centuries) / 2);

  y *= y;
  return (
    y * Math.sin(2 * l) -
    2 * e * Math.sin(m) +
    4 * e * y * Math.sin(m) * Math.cos(2 * l) -
    0.5 * y * y * Math.sin(4 * l) -
    1.25 * e * e * Math.sin(2 * m)
  );
}

function solarDeclination(centuries) {
  return Math.asin(
    Math.sin(obliquityCorrection(centuries)) *
    Math.sin(solarApparentLongitude(centuries))
  );
}

function solarApparentLongitude(centuries) {
  return (
    solarTrueLongitude(centuries) -
    (0.00569 +
      0.00478 * Math.sin((125.04 - 1934.136 * centuries) * am5.math.RADIANS)) *
    am5.math.RADIANS
  );
}

function solarTrueLongitude(centuries) {
  return (
    solarGeometricMeanLongitude(centuries) + solarEquationOfCenter(centuries)
  );
}

function solarGeometricMeanAnomaly(centuries) {
  return (
    (357.52911 + centuries * (35999.05029 - 0.0001537 * centuries)) *
    am5.math.RADIANS
  );
}

function solarGeometricMeanLongitude(centuries) {
  var l = (280.46646 + centuries * (36000.76983 + centuries * 0.0003032)) % 360;
  return ((l < 0 ? l + 360 : l) / 180) * Math.PI;
}

function solarEquationOfCenter(centuries) {
  var m = solarGeometricMeanAnomaly(centuries);
  return (
    (Math.sin(m) * (1.914602 - centuries * (0.004817 + 0.000014 * centuries)) +
      Math.sin(m + m) * (0.019993 - 0.000101 * centuries) +
      Math.sin(m + m + m) * 0.000289) *
    am5.math.RADIANS
  );
}

function obliquityCorrection(centuries) {
  return (
    meanObliquityOfEcliptic(centuries) +
    0.00256 *
    Math.cos((125.04 - 1934.136 * centuries) * am5.math.RADIANS) *
    am5.math.RADIANS
  );
}

function meanObliquityOfEcliptic(centuries) {
  return (
    (23 +
      (26 +
        (21.448 -
          centuries * (46.815 + centuries * (0.00059 - centuries * 0.001813))) /
        60) /
      60) *
    am5.math.RADIANS
  );
}

function eccentricityEarthOrbit(centuries) {
  return 0.016708634 - centuries * (0.000042037 + 0.0000001267 * centuries);
}

```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  max-width: 100%;
  height: 600px;
background-color:#454a58;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Dark.js
