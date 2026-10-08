---
title: "Clock"
source: "https://www.amcharts.com/demos/clock/"
category: "gauges"
scraped: "2026-10-08"
---

An analog clock made from a gauge: the dial is a circular axis from 0 to 12, and the hours, minutes and seconds are three clock hands. It shows the time on your device, live.

Gauges beyond numbers: A clock is a gauge with three needles on one scale. Built with a chart library, the face can match the rest of a dashboard, with the same fonts, colors and themes, and the hands can follow any time you give them, like the time in another office.

Good for:
- World clocks for other time zones
- Countdowns and shift timers
- Kiosks and wall screens

Think twice when:
- Times that must be exact to the second: show digits too
- Small spaces: a digital clock takes less room
- Values that aren’t times: use a regular gauge

Prompt: Create a working analog clock from a circular gauge chart, with the hour numbers around the face and hour, minute and second hands that show the current local time and move every second. Use the amCharts 5 library with its Responsive theme.

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
  innerRadius: -10, // the grid lines are 10px marks in from the rim
  strokeOpacity: 1, // a solid rim...
  strokeWidth: 8,   // ...8px thick
  // all twelve numbers, even on a small clock
  minGridDistance: 10
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,    // the scale can't be panned past its ends
  min: 0,             // the dial runs from 0...
  max: 12,            // ...to 12 hours
  strictMinMax: true, // exactly, not rounded out
  renderer: axisRenderer,
  maxPrecision: 0     // whole numbers only
}));

// hides 0 value
axisRenderer.labels.template.setAll({
  minPosition: 0.02,
  // horizontal numbers, each centered on its point around the dial
  textType: "adjusted",
  inside: true, // inside the rim...
  radius: 25    // ...25px in from it
});
axisRenderer.grid.template.set("strokeOpacity", 1); // solid hour marks

// Add clock hands
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands

// hour
// each hand is the bullet of an axis range: setting the range's value turns the hand
var hourDataItem = xAxis.makeDataItem({});

var hourHand = am5radar.ClockHand.new(root, {
  radius: am5.percent(50), // the short hand...
  topWidth: 12,            // ...12px wide
  bottomWidth: 12,         // all along its length
  pinRadius: 8,            // an 8px pin in the middle
  layer:5                  // drawn on a layer above the rest of the chart
})

hourDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: hourHand
}));

xAxis.createAxisRange(hourDataItem);

hourDataItem.get("grid").set("visible", false); // hide the range's own grid line

// minutes
var minutesDataItem = xAxis.makeDataItem({});

var minutesHand = am5radar.ClockHand.new(root, {
  radius: am5.percent(80), // longer than the hour hand...
  topWidth: 8,             // ...and thinner
  bottomWidth: 8,
  pinRadius: 7,            // a 7px pin
  layer:5
})

minutesDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: minutesHand
}));

xAxis.createAxisRange(minutesDataItem);

minutesDataItem.get("grid").set("visible", false); // hide the range's own grid line

// seconds
var secondsDataItem = xAxis.makeDataItem({});

var secondsHand = am5radar.ClockHand.new(root, {
  radius: am5.percent(80), // as long as the minute hand...
  topWidth: 3,             // ...but only 3px wide
  bottomWidth: 3,
  pinRadius: 3,            // a 3px pin
  layer:5
})

secondsHand.hand.set("fill", am5.color(0xff0000)); // a red hand...
secondsHand.pin.set("fill", am5.color(0xff0000));  // ...with a red pin

secondsDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: secondsHand
}));

xAxis.createAxisRange(secondsDataItem);

secondsDataItem.get("grid").set("visible", false); // hide the range's own grid line

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
