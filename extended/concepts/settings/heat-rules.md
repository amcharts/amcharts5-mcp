---
title: "Heat rules"
source: "https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/"
scraped: "2026-03-15"
---

Heat rules is a way to apply value-dependent setting values on series elements.

## Prerequisites

In order for heat rules to function properly on series, it needs aggregate values (high and low) to be calculated for the series.

Normally, series does not do that in order not to waste resources.

To enable, we just need to set `[calculateAggregates](https://www.amcharts.com/docs/v5/reference/series/#calculateAggregates_setting)` setting to `true`:

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

A heat rule is a generic object that corresponds to `[IHeatRule](https://www.amcharts.com/docs/v5/reference/Iheatrule/)` interface.

It has the following required properties:

Property

Comment

`target`

A template for target element that heat rules will be applied to. E.g. column series' `columns.template`.

`key`

A settings key to apply heat value to on actual elements.

`min`

Lower end value of the spectrum, corresponding to the lowest value in all elements affected by the heat rule.

`max`

Higher end value of the spectrum, corresponding to the highest value in all elements affected by the heat rule.

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

## Custom functions

If we need to do something fancier than just set value of a setting, we can use heat rule's `customFunction` property.

If set, instead of setting value of the setting directly on an element, this function will be called passing in the following parameters:

-   Target element (not a template, but an actual live element).
-   Min value
-   Max value
-   Value of the target element

It'll be up to the custom function to determine what settings and to what values to set.

series.set("heatRules", \[{
  target: series.columns.template,
  dataField: "value",
  customFunction: function(sprite, min, max, value) {
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


