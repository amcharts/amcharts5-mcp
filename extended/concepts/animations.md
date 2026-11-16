---
title: "Animations"
source: "https://docs.amcharts.com/v5/concepts/animations/"
scraped: "2026-11-14"
---

## Animated theme

The easiest way to enable all kinds of polished animations on charts is to use "Animated" theme.

Like all themes it needs to be loaded first:

TypeScript:

```ts
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
```

JavaScript:

```js
<script src="//cdn.amcharts.com/lib/5/themes/Animated.js"></script>
```

Then applied to the root element:

TypeScript:

```ts
root.setThemes([
  am5themes_Animated.new(root)
]);
```

JavaScript:

```js
root.setThemes([
  am5themes_Animated.new(root)
]);
```

For more information about themes, refer to our "[Themes](https://docs.amcharts.com/v5/concepts/themes/)" tutorial.

## Turning off animations

Without the Animated theme, most animation durations are `0`, so changes happen at once.

To keep the theme but turn off one kind of animation, set its duration to `0`. For example, axis zoom: see "[Zoom animation](https://docs.amcharts.com/v5/charts/xy-chart/zoom-and-pan/#zoom-animation)".

## Animating settings

A value of a setting of an element or a data item can be animated using its `animate()` method.

This applies to settings that use quantifiable values, like numbers, colors, or percent.

`animate()` method takes one parameter - an object that implements `AnimationOptions` interface:

| Option     | Comment                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `duration` | Animation duration in milliseconds.                                                                           |
| `easing`   | An [easing function](#easing-functions) to use.                                                               |
| `from`     | Starting value. Will use current value if not set.                                                            |
| `key`      | Setting key to animate values for.                                                                            |
| `loops`    | Number of times to play animation. Will play only once if not set, or will loop forever if set to `Infinity`. |
| `to`       | End value to animate to.                                                                                      |

As an example let's create a repeating animation of a `startAngle` setting of a pie series:

TypeScript:

```ts
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});
```

JavaScript:

```js
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});
```

We have used `am5.ease.yoyo` easing function which animates setting to target value, then returns back to original one.

Read more about it in "[Easing functions](#easing-functions)" section.

Example: [Easing](https://docs.amcharts.com/embeds/v5/easing/). Its code: get_example(path: "examples/docs-demos/easing").

It works exactly the same for data item settings:

TypeScript:

```ts
handDataItem.animate({
  key: "value",
  to: 20,
  duration: 800,
  easing: am5.ease.out(am5.ease.cubic)
});
```

JavaScript:

```js
handDataItem.animate({
  key: "value",
  to: 20,
  duration: 800,
  easing: am5.ease.out(am5.ease.cubic)
});
```

Example: [Gauge chart with hand](https://docs.amcharts.com/embeds/v5/gauge-chart-with-hand/). Its code: get_example(path: "examples/docs-demos/gauge-chart-with-hand").

## Animations as settings

Animations can also be set as part of element's configuration, using its `animations` setting. This is handy for animations that should simply always run, such as a spinning globe or a pulsing marker. And since it's a regular setting, it also works in [JSON configs](https://docs.amcharts.com/v5/concepts/serializing/).

The setting takes an array of animations, each with these options:

| Option     | Default       | Comment                                                                                                              |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `key`      |               | Setting to animate.                                                                                                  |
| `from`     | Current value | Value to start from.                                                                                                 |
| `to`       |               | Value to animate to.                                                                                                 |
| `duration` |               | Duration in milliseconds. With `yoyo`, one way.                                                                      |
| `delay`    | `0`           | Milliseconds to wait before starting.                                                                                |
| `loops`    | `1`           | How many times to play the animation. `0` plays it forever.                                                          |
| `yoyo`     | `false`       | Go back to `from` after reaching `to`, instead of jumping back.                                                      |
| `easing`   | `"linear"`    | Easing function by name: `"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"`, or `"elastic"`. |
| `ease`     | `"in"`        | Which way easing applies: `"in"`, `"out"`, or `"inOut"`.                                                             |
| `target`   | `"self"`      | `"self"` animates a setting of the element, `"dataItem"` a value of its data item.                                   |

The following makes a globe spin forever, one full turn every two minutes:

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    projection: am5map.geoOrthographic(),
    animations: [
      { key: "rotationX", from: 0, to: 360, duration: 120000, loops: 0 }
    ]
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    projection: am5map.geoOrthographic(),
    animations: [
      { key: "rotationX", from: 0, to: 360, duration: 120000, loops: 0 }
    ]
  })
);
```

With `target: "dataItem"`, an animation can change a value of element's data item. The following moves a map point along its line, back and forth:

TypeScript:

```ts
pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000),
      animations: [{
        key: "positionOnLine",
        target: "dataItem",
        from: 0,
        to: 1,
        duration: 5000,
        loops: 0,
        yoyo: true,
        easing: "sine",
        ease: "inOut"
      }]
    })
  });
});
```

JavaScript:

```js
pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000),
      animations: [{
        key: "positionOnLine",
        target: "dataItem",
        from: 0,
        to: 1,
        duration: 5000,
        loops: 0,
        yoyo: true,
        easing: "sine",
        ease: "inOut"
      }]
    })
  });
});
```

Animations start when the setting is applied, restart when it changes, and stop when the element is disposed. When the setting changes, the settings its animations animated are put back to what they held first, then the new list starts. When the chart is [serialized](https://docs.amcharts.com/v5/concepts/serializing/chart-serializer/), the configured values are saved, not whatever value the animation was at.

> **Note:** Unlike `animate()`, where `loops: Infinity` means forever, here it's `loops: 0`. The `animations` setting is available since version 5.20.8.

Example: [Marker moving along a route](https://docs.amcharts.com/embeds/v5/marker-moving-along-a-route/). Its code: get_example(path: "examples/docs-demos/marker-moving-along-a-route").

## Animating between states

When element [state](https://docs.amcharts.com/v5/concepts/settings/states/) is applied, its values will replace current setting values.

Normally, element would go directly to new setting values.

However, if we enable animated theme, or if we set required settings, the quantifiable values (numbers, colors, percent) will animate to new values.

These animations are controlled by two settings:

* `stateAnimationDuration` - duration of animation in milliseconds (default: `0`, or `600` if animated theme is enabled).
* `stateAnimationEasing` - an easing function for animation (default: `am5.ease.out($ease.cubic)`).

We can use these two settings to control how long transition of setting values takes, as well as what process easing function it uses:

TypeScript:

```ts
columnSeries.columns.template.setAll({
  interactive: true,
  stateAnimationDuration: 2000,
  stateAnimationEasing: am5.ease.out(am5.ease.cubic)
});
```

JavaScript:

```js
columnSeries.columns.template.setAll({
  interactive: true,
  stateAnimationDuration: 2000,
  stateAnimationEasing: am5.ease.out(am5.ease.cubic)
});
```

The following demo adds a custom state ("off") which is applied to the column when it's clicked.

The state application animation will use `stateAnimationDuration` and `stateAnimationEasing` settings.

Example: [Modifying state animation options](https://docs.amcharts.com/embeds/v5/modifying-state-animation-options/). Its code: get_example(path: "examples/docs-demos/modifying-state-animation-options").

## Animating data values

Updating data values is done via `setIndex()` method of series data, as per "[Data](https://docs.amcharts.com/v5/concepts/data/#updating-existing-data)" tutorial:

TypeScript:

```ts
series.data.setIndex(1, {
  category: "Marketing",
  value: 1000
});
```

JavaScript:

```js
series.data.setIndex(1, {
  category: "Marketing",
  value: 1000
});
```

Once called, series will animate its data item (e.g. column) to new value.

The speed and style of such animation is controlled using two settings:

* `interpolationDuration` - duration of animation in milliseconds (default: `0`, or `600` if animated theme is enabled).
* `interpolationEasing` - an easing function for animation (default: `am5.ease.out($ease.cubic)`).

Using these two settings, we can control how long animation to new value takes, and how it progresses:

TypeScript:

```ts
var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series", 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    categoryXField: "category",
    interpolationDuration: 2000,
    interpolationEasing: am5.ease.inOut(am5.ease.elastic)
  }) 
);
```

JavaScript:

```js
var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series", 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    categoryXField: "category",
    interpolationDuration: 2000,
    interpolationEasing: am5.ease.inOut(am5.ease.elastic)
  }) 
);
```

Example: [Updating series values](https://docs.amcharts.com/embeds/v5/updating-series-values/). Its code: get_example(path: "examples/docs-demos/updating-series-values").

## Forcing appearance animation

### Triggering appearance

Normally, elements that are not hidden would be shown on in chart immediately.

We can force it to "appear" using their `appear()` method.

The actual "appearance" animation may take multiple forms, but most commonly it will make element fade in.

Calling `appear()` method does two things:

1. Hides the element and applies hidden state.
2. Unhides the elements and animates to default state.

It can be used on any element from simple button to series to a whole chart:

TypeScript:

```ts
chart.appear();
```

JavaScript:

```js
chart.appear();
```

### Timing appearance

When called without parameters, appearance will take place immediately, and will take number of milliseconds specified in theme (most commonly enabled by using Animated theme).

We can control that using two parameters to `appear()`:

1. Duration in milliseconds.
2. Delay in milliseconds.

TypeScript:

```ts
chart.appear(2000, 500);
```

JavaScript:

```js
chart.appear(2000, 500);
```

The above will make chart fade-in animation take 2 seconds, and will be delayed by half a second.

### Automatic appearance

Instead of calling `appear()`, we can set element's `autoAppear` setting to `true`. The element will then play its appearance animation by itself, when it is first drawn.

Duration and delay are set with `appearDuration` and `appearDelay` settings, both in milliseconds. If `appearDuration` is not set, element's `stateAnimationDuration` is used.

TypeScript:

```ts
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    autoAppear: true,
    appearDuration: 1000,
    appearDelay: 100
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    autoAppear: true,
    appearDuration: 1000,
    appearDelay: 100
  })
);
```

Since these are regular settings, this is how a [JSON config](https://docs.amcharts.com/v5/concepts/serializing/) or a [\<am5-chart> element](https://docs.amcharts.com/v5/getting-started/integrations/am5-chart-element/) gets its opening animation.

A few things to know:

* The animation plays once. Data updates do not play it again. Turning the setting off and back on does.
* Elements created from a template, e.g. columns, play it as each one is created.
* An element that starts hidden stays hidden.

> **Note:** `autoAppear`, `appearDuration`, and `appearDelay` are available since version 5.21.0.

Example: [Opening animation with autoAppear](https://docs.amcharts.com/embeds/v5/opening-animation-with-autoappear/). Its code: get_example(path: "examples/docs-demos/opening-animation-with-autoappear").

## Animation of series

### Initial animation

Created series will appear on chart right away. Should we want to make it play out initial animation, we can call it's `appear()` method right after creating its object:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
series.appear();
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
series.appear();
```

Alternatively, set `autoAppear: true` on the series (see "[Automatic appearance](#automatic-appearance)"). A series with it waits for its data before animating, so it works even if data is loaded later.

### Sequenced animations

When series animation is playing, all of its data items will be animating into place at the same time.

We can make them appear in sequence, one by one, by setting `sequencedInterpolation` to `true`.

We can also control the delay by which each subsequent data item starts animating by `sequencedDelay` setting, which indicates number of milliseconds.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    sequencedInterpolation: true,
    sequencedDelay: 100
  })
);
series.appear();
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    sequencedInterpolation: true,
    sequencedDelay: 100
  })
);
series.appear();
```

## Easing functions

### Basic easing functions

Easing functions are used by animations to control the effect of progress of the animation.

Different easing functions create different feeling, e.g. "out" function will gradually slow down animation at the end, creating effect of the "braking".

TypeScript:

```ts
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.elastic
});
```

JavaScript:

```js
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.elastic
});
```

There is a number of easing functions:

| Function           | Comment                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------- |
| `am5.ease.bounce`  | Will "bounce" at the end.                                                               |
| `am5.ease.circle`  |                                                                                         |
| `am5.ease.cubic`   |                                                                                         |
| `am5.ease.elastic` | Will overshoot end value, then bounce back a few times before settling down at the end. |
| `am5.ease.exp`     |                                                                                         |
| `am5.ease.linear`  | Constant speed during all duration.                                                     |
| `am5.ease.pow`     |                                                                                         |
| `am5.ease.quad`    |                                                                                         |
| `am5.ease.sine`    |                                                                                         |

Below demo shows the behavior of various basic easing functions:

Example: [Easing functions](https://docs.amcharts.com/embeds/v5/easing-functions/). Its code: get_example(path: "examples/docs-demos/easing-functions").

### Modifier functions

Besides basic easing functions, amCharts 5 comes with several "modifier" functions.

These functions take basic easing function as a parameter and modifies their output in some way.

TypeScript:

```ts
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});
```

JavaScript:

```js
series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});
```

| Function         | Comment                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `am5.ease.inOut` | The basic easing function is applied when starting and ending animation.                                  |
| `am5.ease.out`   | The basic easing function is applied at the end animation.                                                |
| `am5.ease.yoyo`  | Plays animation to the end value, then returns back to the starting value, using supplied basic function. |

Example: [Easing functions](https://docs.amcharts.com/embeds/v5/easing-functions-2/). Its code: get_example(path: "examples/docs-demos/easing-functions-2").

### Easing by name

`am5.ease.byName(name, mode)` returns an easing function by its name — `"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"` or `"elastic"` — optionally wrapped by `mode`: `"in"` (default), `"out"` or `"inOut"`. An unknown name gives `linear`.

`am5.ease.easingInfo(easing)` does the opposite: it returns `{ easing, ease?, yoyo? }` describing a function, or `undefined` for one that cannot be named. Functions made with `out()`, `inOut()` and `yoyo()` keep the name of the function they wrap; a function of your own, a wrapped `pow`, or a combination like `out(yoyo(...))` has none.

```javascript
am5.ease.byName("cubic", "out");                     // same as am5.ease.out(am5.ease.cubic)
am5.ease.easingInfo(am5.ease.yoyo(am5.ease.sine));   // { easing: "sine", yoyo: true }
am5.ease.easingInfo(function(t) { return t * t; });  // undefined
```
