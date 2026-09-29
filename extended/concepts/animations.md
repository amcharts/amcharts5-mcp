---
title: "Animations"
source: "https://www.amcharts.com/docs/v5/concepts/animations/"
scraped: "2026-03-15"
---

## Animated theme

The easiest way to enable all kinds of polished animations on charts is to use "Animated" theme.

Like all themes it needs to be loaded first:

import am5themes\_Animated from "@amcharts/amcharts5/themes/Animated";

<script src="//cdn.amcharts.com/lib/5/themes/Animated.js"></script>

Then applied to the root element:

root.setThemes(\[
  am5themes\_Animated.new(root)
\]);

root.setThemes(\[
  am5themes\_Animated.new(root)
\]);

For more information about themes, refer to our "[Themes](https://www.amcharts.com/docs/v5/concepts/themes/)" tutorial.

## Animating settings

A value of a setting of an element or a data item can be animated using its `[animate()](https://www.amcharts.com/docs/v5/reference/sprite/#animate_method)` method.

This applies to settings that use quantifiable values, like numbers, colors, or percent.

`animate()` method takes one parameter - an object that implements `[AnimationOptions](https://www.amcharts.com/docs/v5/reference/animationoptions/)` interface:

Option

Comment

`duration`

Animation duration in milliseconds.

`easing`

An [easing function](#Easing_functions) to use.

`from`

Starting value. Will use current value if not set.

`key`

Setting key to animate values for.

`loops`

Number of times to play animation. Will play only once if not set, or will loop forever if set to `Infinity`.

`to`

End value to animate to.

As an example let's create a repeating animation of a `startAngle` setting of a pie series:

series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});

series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});

We have used `am5.ease.yoyo` easing function which animates setting to target value, then returns back to original one.

Read more about it in "[Easing functions](#Easing_functions)" section.


It works exactly the same for data item settings:

handDataItem.animate({
  key: "value",
  to: 20,
  duration: 800,
  easing: am5.ease.out(am5.ease.cubic)
});

handDataItem.animate({
  key: "value",
  to: 20,
  duration: 800,
  easing: am5.ease.out(am5.ease.cubic)
});


## Declarative animations (`animations` setting)

Since 5.20.8 every element has an `animations` setting: a list of animations described as data instead of started with `animate()`. Being a plain setting, it can be set like any other — on an element, a template, a bullet's sprite, or in a [JSON config](https://www.amcharts.com/docs/v5/concepts/serializing/) — and a [serialized](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/) chart keeps it.

NOTE The typings (and API reference) mark `animations` as `@since 5.21.0`, but it shipped in 5.20.8.

Each entry in the list is an object with these fields:

Field

Default

Comment

`key`

(required)

Setting to animate. With `target: "dataItem"`, a value of the element's data item.

`from`

current value

Value to start from.

`to`

(required)

Value to animate to.

`duration`

(required)

Duration in milliseconds. With `yoyo`, it is the duration of one way, so a full there-and-back takes twice as long.

`delay`

`0`

Milliseconds to wait before starting.

`loops`

`1`

How many times to play the animation. `0` plays it forever (`Infinity` works too in JavaScript).

`yoyo`

`false`

Go back to `from` after reaching `to`, rather than jumping back.

`easing`

`"linear"`

Easing **by name**: `"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"` or `"elastic"`. An unknown name silently falls back to linear. Functions are not accepted here.

`ease`

`"in"`

Which way the easing applies: `"in"`, `"out"` or `"inOut"` — the same as wrapping the function in `am5.ease.out()` or `am5.ease.inOut()`.

`target`

`"self"`

`"self"` animates a setting of the element; `"dataItem"` animates a value of the element's data item.

The following makes each bullet pulse, for ever:

```javascript
series.bullets.push(function (root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 6,
      animations: [
        { key: "scale", from: 1, to: 1.6, duration: 800, loops: 0, yoyo: true, easing: "sine" },
        { key: "opacity", from: 1, to: 0.3, duration: 800, loops: 0, yoyo: true }
      ]
    })
  });
});
```

The animations start when the setting is applied, restart when it changes (the settings they animated are put back to what they held first), and stop when the element is disposed.

IMPORTANT With `from` omitted, the animation starts from the setting's current value. If that value is `undefined`, the element jumps straight to `to` and nothing animates. `scale`, `opacity` and `rotation` are fine (the theme gives them a value), but settings like `dx` or `fill`, or a data item value that is not set yet (e.g. a map point without `positionOnLine`), need an explicit `from`.

With `target: "dataItem"`, the entry animates the data item the element belongs to — for example, a map point's `positionOnLine`, which flies the point along its line. See "[Map point series: Points on a line](https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/#Points_on_a_line)".

In a JSON config, colors and percents in `from`/`to` are written in their object form:

```json
{
  "type": "Circle",
  "settings": {
    "radius": 6,
    "animations": [{
      "key": "fill",
      "from": { "type": "Color", "value": "#ff0000" },
      "to": { "type": "Color", "value": "#0000ff" },
      "duration": 1000,
      "loops": 0,
      "yoyo": true
    }]
  }
}
```

A serialized chart keeps the values the animated settings were configured with, never ones caught mid-animation. `ChartSerializer` can also turn a never-ending animation started in code with `animate()` into an `animations` entry — see its `runningAnimations` setting in "[Chart serializer](https://www.amcharts.com/docs/v5/concepts/serializing/chart-serializer/)".


## Animating between states

When element [state](https://www.amcharts.com/docs/v5/concepts/settings/states/) is applied, its values will replace current setting values.

Normally, element would go directly to new setting values.

However, if we enable animated theme, or if we set required settings, the quantifiable values (numbers, colors, percent) will animate to new values.

These animations are controlled by two settings:

-   `stateAnimationDuration` - duration of animation in seconds (default: `0`, or `600` if animated theme is enabled).
-   `stateAnimationEasing` - an easing function for animation (default: `am5.ease.out($ease.cubic)`).

We can use these two settings to control how long transition of setting values takes, as well as what process easing function it uses:

columnSeries.columns.template.setAll({
  interactive: true,
  stateAnimationDuration: 2000,
  stateAnimationEasing: am5.ease.out(am5.ease.cubic)
});

columnSeries.columns.template.setAll({
  interactive: true,
  stateAnimationDuration: 2000,
  stateAnimationEasing: am5.ease.out(am5.ease.cubic)
});

The following demo adds a custom state ("off") which is applied to the column when it's clicked.

The state application animation will use `stateAnimationDuration` and `stateAnimationEasing` settings.


## Animating data values

Updating data values is done via `setIndex()` method of series data, as per "[Data](https://www.amcharts.com/docs/v5/concepts/data/#Updating_existing_data)" tutorial:

series.data.setIndex(1, {
  category: "Marketing",
  value: 1000
});

series.data.setIndex(1, {
  category: "Marketing",
  value: 1000
});

Once called, series will animate its data item (e.g. column) to new value.

The speed and style of such animation is controlled using two settings:

-   `interpolationDuration` - duration of animation in seconds (default: `0`, or `600` if animated theme is enabled).
-   `interpolationEasing` - an easing function for animation (default: `am5.ease.out($ease.cubic)`).

Using these two settings, we can control how long animation to new value takes, and how it progresses:

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


## Forcing appearance animation

### Triggering appearance

Normally, elements that are not hidden would be shown on in chart immediately.

We can force it to "appear" using their `appear()` method.

The actual "appearance" animation may take multiple forms, but most commonly it will make element fade in.

Calling `appear()` method does two things:

1.  Hides the element and applies hidden state.
2.  Unhides the elements and animates to default state.

It can be used on any element from simple button to series to a whole chart:

chart.appear();

chart.appear();

### Timing appearance

When called without parameters, appearance will take place immediately, and will take number of milliseconds specified in theme (most commonly enabled by using Animated theme).

We can control that using two parameters to `appear()`:

1.  Duration in milliseconds.
2.  Delay in milliseconds.

chart.appear(2000, 500);

chart.appear(2000, 500);

The above will make chart fade-in animation take 2 seconds, and will be delayed by half a second.

## Animation of series

### Initial animation

Created series will appear on chart right away. Should we want to make it play out initial animation, we can call it's `appear()` method right after creating its object:

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

### Sequenced animations

When series animation is playing, all of its data items will be animating into place at the same time.

We can make them appear in sequence, one by one, by setting `sequencedInterpolation` to `true`.

We can also control the delay by which each subsequent data item starts animating by `sequencedDelay` setting, which indicates number of milliseconds.

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

## Easing functions

### Basic easing functions

Easing functions are used by animations to control the effect of progress of the animation.

Different easing functions create different feeling, e.g. "out" function will gradually slow down animation at the end, creating effect of the "braking".

series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.elastic
});

series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.elastic
});

There is a number of easing functions:

Function

Comment

`am5.ease.bounce`

Will "bounce" at the end.

`am5.ease.circle`

`am5.ease.cubic`

`am5.ease.elastic`

Will overshoot end value, then bounce back a few times before settling down at the end.

`am5.ease.exp`

`am5.ease.linear`

Constant speed during all duration.

`am5.ease.quad`

`am5.ease.sine`

NOTE `am5.ease.pow` is not a ready-to-use easing: it is `pow(t, e)` and needs an exponent as its second parameter. Passed directly as `easing`, the exponent is `undefined` and the animation produces `NaN`. Wrap it in a function instead: `easing: function(t) { return am5.ease.pow(t, 3); }`.

Below demo shows the behavior of various basic easing functions:


### Modifier functions

Besides basic easing functions, amCharts 5 comes with several "modifier" functions.

These functions take basic easing function as a parameter and modifies their output in some way.

series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});

series.animate({
  key: "startAngle",
  to: 180,
  loops: Infinity,
  duration: 2000,
  easing: am5.ease.yoyo(am5.ease.cubic)
});

Function

Comment

`am5.ease.inOut`

The basic easing function is applied when starting and ending animation.

`am5.ease.out`

The basic easing function is applied at the end animation.

`am5.ease.yoyo`

Plays animation to the end value, then returns back to the starting value, using supplied basic function.

### Easing functions by name (5.20.8)

The eight basic easing functions listed above carry a name, which is what lets the [`animations` setting](#Declarative_animations_animations_setting) and JSON configs refer to them as strings.

`am5.ease.byName(name, mode)` returns an easing function by its name — `"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"` or `"elastic"` — optionally wrapped by `mode`: `"in"` (default), `"out"` or `"inOut"`. An unknown name gives `linear`.

`am5.ease.easingInfo(easing)` does the opposite: it returns `{ easing, ease?, yoyo? }` describing a function, or `undefined` for one that cannot be named. Functions made with `out()`, `inOut()` and `yoyo()` keep the name of the function they wrap; a function of your own, a wrapped `pow`, or a combination like `out(yoyo(...))` has none.

```javascript
am5.ease.byName("cubic", "out");                     // same as am5.ease.out(am5.ease.cubic)
am5.ease.easingInfo(am5.ease.yoyo(am5.ease.sine));   // { easing: "sine", yoyo: true }
am5.ease.easingInfo(function(t) { return t * t; });  // undefined
```

NOTE The typings mark `byName()`, `easingInfo()` and `IEasingInfo` as `@since 5.21.0`, but they shipped in 5.20.8.


