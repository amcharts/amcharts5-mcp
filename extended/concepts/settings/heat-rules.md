---
title: "Heat rules"
source: "https://docs.amcharts.com/v5/concepts/settings/heat-rules/"
scraped: "2026-10-18"
---

Heat rules is a way to apply value-dependent setting values on series elements.

## Prerequisites

In order for heat rules to function properly on series, it needs aggregate values (high and low) to be calculated for the series.

Normally, series does not do that in order not to waste resources.

To enable, we just need to set `[calculateAggregates](https://docs.amcharts.com/v5/reference/series/#calculateAggregates_setting)` setting to `true`:

let series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series",
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    valueXField: "date",
    calculateAggregates: true
  })
);

var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series",
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    valueXField: "date",
    calculateAggregates: true
  })
);

## Creating

A heat rule is a generic object that corresponds to `[IHeatRule](https://docs.amcharts.com/v5/reference/iheatrule/)` interface.

It has the following required properties:

Property

Comment

`target`

A template for target element that heat rules will be applied to. E.g. column series' `columns.template`.

`key`

A settings key to apply heat value to on actual elements.

`min`

Lower end value of the spectrum, corresponding to the lowest value in all elements affected by the heat rule. Not needed if [`stops`](#multiple-stops) is set.

`max`

Higher end value of the spectrum, corresponding to the highest value in all elements affected by the heat rule. Not needed if [`stops`](#multiple-stops) is set.

`dataField`

A data field to look for element's "value".

## Series elements

To apply heat rules to series elements, like a column, we can use its template as a `target` for the heat rule.

Here's an example of a heat rule that applies color to column series columns based on their `valueY` data field (same data field that is used to determine column height).

series.set("heatRules", \[{
  target: series.columns.template,
  dataField: "valueY",
  min: am5.color(0xff621f),
  max: am5.color(0x661F00),
  key: "fill"
}\])

series.set("heatRules", \[{
  target: series.columns.template,
  dataField: "valueY",
  min: am5.color(0xff621f),
  max: am5.color(0x661F00),
  key: "fill"
}\])


## Arbitrary value

We're not limited to binding to a data field that is used for actually plotting the series.

Each series also defines a generic `"value"` data field, which can be used for heat rules.

var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: name,
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueField: "heatValue",
    valueYField: field, 
    valueXField: "date",
    calculateAggregates: true
  }) 
);

series.setAll({
  heatRules: \[{
    target: series.columns.template,
    dataField: "value",
    min: am5.color(0xff621f),
    max: am5.color(0x661F00),
    key: "fill"
  }\]
});

var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: name,
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueField: "heatValue",
    valueYField: field, 
    valueXField: "date",
    calculateAggregates: true
  }) 
);

series.setAll({
  heatRules: \[{
    target: series.columns.template,
    dataField: "value",
    min: am5.color(0xff621f),
    max: am5.color(0x661F00),
    key: "fill"
  }\]
});


## Bullets

Bullets do not have a dedicated template in series, so they need their template (for use in a heat rule) to be created explicitly:

let circleTemplate: am5.Template<am5.Circle> = am5.Template.new({});

series.bullets.push(function() {
  const bulletCircle = am5.Circle.new(root, {
    radius: 5,
    fill: series.get("fill"),
    fillOpacity: 0.8
  }, circleTemplate);
  
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rules
series.set("heatRules", \[{
  target: circleTemplate,
  min: 3,
  max: 60,
  dataField: "value",
  key: "radius"
}\]);

let circleTemplate = am5.Template.new({});

series.bullets.push(function() {
  const bulletCircle = am5.Circle.new(root, {
    radius: 5,
    fill: series.get("fill"),
    fillOpacity: 0.8
  }, circleTemplate);
  
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rules
series.set("heatRules", \[{
  target: circleTemplate,
  min: 3,
  max: 60,
  dataField: "value",
  key: "radius"
}\]);

var circleTemplate = am5.Template.new({});

series.bullets.push(function() {
  var bulletCircle = am5.Circle.new(root, {
    radius: 5,
    fill: series.get("fill"),
    fillOpacity: 0.8
  }, circleTemplate);
  
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rules
series.set("heatRules", \[{
  target: circleTemplate,
  min: 3,
  max: 60,
  dataField: "value",
  key: "radius"
}\]);

The above creates a `Template` object, which is then passed in as a second parameter to `new()` method of a `Circle` class, so it is tied to a template.

We can then use that template in a heat rule to use on circle's `radius` setting.


## Custom value range

Heat rules will use aggregated high and low values from the data items of involved elements.

We can override that with absolutely custom values using heat rules `minValue` and `maxValue` settings.

series.set("heatRules", \[{
  target: series.columns.template,
  dataField: "valueY",
  min: am5.color(0xff621f),
  max: am5.color(0x661F00),
  minValue: 0,
  maxValue: 1000,
  key: "fill"
}\])

series.set("heatRules", \[{
  target: series.columns.template,
  dataField: "valueY",
  min: am5.color(0xff621f),
  max: am5.color(0x661F00),
  minValue: 0,
  maxValue: 1000,
  key: "fill"
}\])

NOTE If we set `minValue` and `maxValue` we don't need series to aggregate values, so the `calculateAggregates` does not need to be set.

NOTE Before 5.21.0, `minValue: 0` and `maxValue: 0` were ignored, and the series' lowest or highest value was used instead. Since 5.21.0 a `0` is used like any other value.

## Multiple stops

`min` and `max` make a scale between two values. For a scale through more than two, e.g. red to yellow to green, use `stops` instead: an array of values, from the lowest to the highest.

series.set("heatRules", \[{
  target: series.columns.template,
  dataField: "valueY",
  stops: \[
    root.interfaceColors.get("negative"),
    root.interfaceColors.get("warning"),
    root.interfaceColors.get("positive")
  \],
  key: "fill"
}\])

series.set("heatRules", \[{
  target: series.columns.template,
  dataField: "valueY",
  stops: \[
    root.interfaceColors.get("negative"),
    root.interfaceColors.get("warning"),
    root.interfaceColors.get("positive")
  \],
  key: "fill"
}\])

The element with the lowest value gets the first stop, and the one with the highest value gets the last. The stops are spread evenly across the range, so in the above, the middle value gets yellow, and the values in between blend from one stop to the next.

Stops can be numbers, percents, or colors, but all of one kind. If `minValue` and `maxValue` are set, values outside that range get the first or last stop.

NOTE`stops` is available since version 5.21.2. To show the same scale in a [heat legend](https://docs.amcharts.com/v5/concepts/legend/heat-legend/), pass the same colors to its `colors` setting.

## Logarithmic scale

By default, values are spread between `min` and `max` (or across `stops`) on a linear scale.

If values differ by orders of magnitude, e.g. populations of countries, a few very large values would get the far end of the scale, while all the others would end up close together near its start. Setting `logarithmic: true` spreads them on a logarithmic scale instead, so the differences between smaller values show too:

polygonSeries.set("heatRules", \[{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  logarithmic: true,
  key: "fill"
}\])

polygonSeries.set("heatRules", \[{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  logarithmic: true,
  key: "fill"
}\])

NOTEA logarithmic scale works with values above zero only.

## Elements without a value

Elements whose data item has no value in `dataField` are not affected by the heat rule, and keep the setting value from their template. E.g. countries on a map that are not in data.

To give such elements a specific value instead, use the `neutral` setting:

polygonSeries.set("heatRules", \[{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  neutral: am5.color(0xdddddd),
  key: "fill"
}\])

polygonSeries.set("heatRules", \[{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xffd19a),
  max: am5.color(0xb3261e),
  neutral: am5.color(0xdddddd),
  key: "fill"
}\])

The above will make countries with no data light gray.

## Custom functions

If we need to do something fancier than just set value of a setting, we can use heat rule's `customFunction` property.

If set, instead of setting value of the setting directly on an element, this function will be called passing in the following parameters:

-   Target element (not a template, but an actual live element).
-   Min value
-   Max value
-   Value of the target element

It'll be up to the custom function to determine what settings and to what values to set.

The function is also called for elements without a value, with the value parameter `undefined`.

series.set("heatRules", \[{
  target: series.columns.template,
  dataField: "value",
  customFunction: function(sprite, min, max, value) {
    if (value === undefined) {
      // No value: leave the element as it is
      return;
    }
    if (value < 100) {
      sprite.set("fill", am5.color(0xff0000));
    }
    else {
      sprite.set("fill", am5.color(0x00ff00));
    }
  }
}\])

series.set("heatRules", \[{
  target: series.columns.template,
  dataField: "value",
  customFunction: function(sprite: am5.Sprite, min, max, value) {
    if (value === undefined) {
      // No value: leave the element as it is
      return;
    }
    if (value < 100) {
      (sprite as am5.Graphics).set("fill", am5.color(0xff0000));
    }
    else {
      (sprite as am5.Graphics).set("fill", am5.color(0x00ff00));
    }
  }
}\])

series.set("heatRules", \[{
  target: series.columns.template,
  dataField: "value",
  customFunction: function(sprite, min, max, value) {
    if (value === undefined) {
      // No value: leave the element as it is
      return;
    }
    if (value < 100) {
      sprite.set("fill", am5.color(0xff0000));
    }
    else {
      sprite.set("fill", am5.color(0x00ff00));
    }
  }
}\])

## Examples

### Map chart


