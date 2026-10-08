---
title: "Clock with Two Faces"
source: "https://www.amcharts.com/demos/clock-with-two-faces/"
category: "gauges"
scraped: "2026-10-08"
---

A clock with a dial inside a dial: hours and minutes on the outer face, seconds on a small inner face, and today’s date in the middle.

Two scales on one dial: An inner dial adds a second scale without a second chart: here the seconds, but it could be a stopwatch or a second time zone. Each dial is its own axis with its own radius, so the two can count in different units.

Good for:
- A stopwatch or second time zone inside a clock
- Watch-style faces for wall screens
- A date or status in the middle of a dial

Think twice when:
- Small screens: the inner dial gets hard to read
- Exact readings: show the digits as well
- More than two scales: the face gets busy

Prompt: Create a working analog clock from a circular gauge chart with two dials: an outer dial for the hour and minute hands and a small inner dial for the second hand, with today’s date in the middle. The hands follow the current local time. Use the amCharts 5 library with its Responsive theme.

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

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false, // the clock doesn't pan when dragged
  panY: false
}));

// Create axis and its renderer
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  innerRadius: -10,   // the grid lines are 10px marks in from the rim
  strokeOpacity: 1,   // a solid rim...
  strokeWidth: 8,     // ...8px thick
  minGridDistance: 10 // a mark and a number for every hour, down to 10px apart
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,    // the scale can't be panned past its ends
  min: 0,             // the dial runs from 0...
  max: 12,            // ...to 12 hours
  strictMinMax: true, // exactly, not rounded out
  renderer: axisRenderer,
  maxPrecision: 0     // whole numbers only
}));

// second axis
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
// the small seconds dial, at 40% of the clock's radius: a 0 to 60 scale shown only by its ticks
var secondAxisRenderer = am5radar.AxisRendererCircular.new(root, {
  innerRadius: -10,
  radius: am5.percent(40),
  strokeOpacity: 0,  // no rim line
  minGridDistance: 1 // a tick for every second
});

var secondXAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  min: 0,         // the seconds dial runs from 0...
  max: 60,        // ...to 60
  strictMinMax: true,
  renderer: secondAxisRenderer,
  maxPrecision: 0 // whole numbers only
}));

// hides 0 value
axisRenderer.labels.template.setAll({
  minPosition: 0.02,
  textType: "adjusted", // upright numbers, kept clear of the rim
  inside: true,         // inside the rim...
  radius: 25            // ...25px in from it
});
axisRenderer.grid.template.set("strokeOpacity", 1); // solid hour marks

secondAxisRenderer.labels.template.setAll({
  forceHidden: true  // no numbers on the seconds dial...
});
secondAxisRenderer.grid.template.setAll({
  forceHidden: true  // ...and no grid lines
});
secondAxisRenderer.ticks.template.setAll({
  strokeOpacity: 1,  // solid ticks
  minPosition: 0.01, // no tick at 0, where it would sit on 60's
  visible: true,     // ticks are hidden by default
  inside: true,      // pointing inward
  length: 10         // 10px long
});

// Add clock hands
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands

// hour
var hourDataItem = xAxis.makeDataItem({});

var hourHand = am5radar.ClockHand.new(root, {
  radius: am5.percent(70), // the short hand...
  topWidth: 14,            // ...14px wide
  bottomWidth: 14,         // all along its length
  // the hand starts just outside the seconds dial
  innerRadius: am5.percent(43),
  pinRadius: 0, // no pin in the middle
  layer: 5      // drawn on a layer above the rest of the chart
})

hourDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: hourHand
}));

xAxis.createAxisRange(hourDataItem);

hourDataItem.get("grid").set("visible", false); // hide the range's own grid line

// minutes
var minutesDataItem = xAxis.makeDataItem({});

var minutesHand = am5radar.ClockHand.new(root, {
  radius: am5.percent(85), // longer than the hour hand...
  topWidth: 10,            // ...and thinner
  bottomWidth: 10,
  innerRadius: am5.percent(43),
  pinRadius: 0,
  layer: 5
})

minutesDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: minutesHand
}));

xAxis.createAxisRange(minutesDataItem);

minutesDataItem.get("grid").set("visible", false); // hide the range's own grid line

// seconds
var secondsDataItem = xAxis.makeDataItem({});

var secondsHand = am5radar.ClockHand.new(root, {
  radius: am5.percent(40), // reaches the seconds dial's ticks...
  innerRadius: -10,        // ...and is just their 10px length
  topWidth: 5,             // 5px wide
  bottomWidth: 5,
  pinRadius: 0,
  layer: 5
})

secondsHand.hand.set("fill", am5.color(0xff0000)); // red
secondsHand.pin.set("fill", am5.color(0xff0000));

secondsDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: secondsHand
}));

xAxis.createAxisRange(secondsDataItem);

secondsDataItem.get("grid").set("visible", false); // hide the range's own grid line

// date label, in the middle of the seconds dial
var label = chart.radarContainer.children.push(am5.Label.new(root, {
  fontSize: "1.5em",       // 1.5 times the chart's text size
  centerX: am5.p50,        // centered on the dial's center
  centerY: am5.p50,
  oversizedBehavior: "fit" // shrinks to fit its maxWidth
}));

// On a small clock, shrink the date to fit inside the seconds dial
chart.plotContainer.events.on("boundschanged", function() {
  // the dial is 40% of the clock's radius; leave room for its ticks
  label.set("maxWidth", chart.getPrivate("radius", 0) * 0.8 - 30);
});

// move the hands every second
setInterval(function() {
  updateHands(300) // the seconds hand takes 0.3 seconds to step
}, 1000);

// point the hands at the current time; duration is the seconds hand's step
function updateHands(duration) {
  // get current date
  var date = new Date();
  // 0 to 11: the axis stops at 12, so 12:30 (12.5) would not be drawn
  var hours = date.getHours() % 12;

  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // set hours
  hourDataItem.set("value", hours + minutes / 60 + seconds / 60 / 60);
  // set minutes
  // all hands sit on the 12-hour axis, so minutes and seconds are scaled to 0-12
  minutesDataItem.set("value", 12 * (minutes + seconds / 60) / 60);
  // set seconds
  var current = secondsDataItem.get("value");
  var value = 12 * date.getSeconds() / 60;
  // otherwise animation will go from 59 to 0 and the hand will move backwards
  if (value == 0) {
    value = 11.999;
  }
  // if it's more than 11.99, set it to 0
  if (current > 11.99) {
    current = 0;
  }
  secondsDataItem.animate({
    key: "value",
    from: current,
    to: value,
    duration: duration
  });

  label.set("text", chart.getDateFormatter().format(date, "MMM dd")) // the date, like Oct 07
}

updateHands(0); // set the hands at once on load

// Make stuff animate on load
chart.appear(1000, 100);

// Set the hands straight away when the page is shown again: timers slow down in a background tab
function onVisibilityChange() {
  if (root.isDisposed()) {
    // the chart is gone: stop listening
    document.removeEventListener("visibilitychange", onVisibilityChange);
  } else {
    updateHands(0);
  }
}
document.addEventListener("visibilitychange", onVisibilityChange);
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
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
