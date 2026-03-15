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

`am5.ease.pow`

`am5.ease.quad`

`am5.ease.sine`

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


