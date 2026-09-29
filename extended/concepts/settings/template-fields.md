---
title: "Template fields"
source: "https://www.amcharts.com/docs/v5/concepts/settings/template-fields/"
scraped: "2026-03-15"
---

Template fields is a way to bind element's settings to data. Any element that has a data item can bind its settings to values in it.

## Setting up

Template fields are similar to series data fields (see "[XY chart series: Data fields](https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields)"). In a nutshell it means this: "this field in data holds an object with setting values to be used for the element".

It is set via setting `templateField`.

It can be set directly on an object or objects template, like for example `columns.template` on a column series, or `slices.template` on a pie series.

In fact, the most common usage of template fields is in series (because they are primary users of data), so we'll be using series as example in this tutorial.

series.columns.template.setAll({
  fillOpacity: 0.5,
  strokeWidth: 2,
  templateField: "columnSettings"
});

series.columns.template.setAll({
  fillOpacity: 0.5,
  strokeWidth: 2,
  templateField: "columnSettings"
});

Now, we can add objects with key `"columnSettings"` and setting values in it. Those settings will be applied to relevant columns.

\[{
  date: new Date(2021, 0, 1).getTime(),
  value: 1000,
  columnSettings: {
    fill: am5.color(0xd6e681)
  }
}, {
  date: new Date(2021, 0, 2).getTime(),
  value: 800,
  columnSettings: {
    fill: am5.color(0xbabf95)
  }
}, {
  date: new Date(2021, 0, 3).getTime(),
  value: 700,
  columnSettings: {
    fill: am5.color(0xc4ad83)
  }
}, {
  date: new Date(2021, 0, 4).getTime(),
  value: 1200,
  columnSettings: {
    fill: am5.color(0xc6b677)
  }
}, {
  date: new Date(2021, 0, 5).getTime(),
  value: 740,
  columnSettings: {
    fill: am5.color(0xdbb957)
  }
}\]


Another example using `PieSeries`:

series.slices.template.setAll({
  templateField: "sliceSettings"
});

series.slices.template.setAll({
  templateField: "sliceSettings"
});

And the data:

\[{
  country: "France",
  sales: 100000,
  sliceSettings: {
    fill: am5.color(0xd6e681),
    stroke: am5.color(0xd6e681)
  }
}, {
  country: "Spain",
  sales: 160000,
  sliceSettings: {
    fill: am5.color(0xbabf95),
    stroke: am5.color(0xbabf95)
  }
}, {
  country: "United Kingdom",
  sales: 80000,
  sliceSettings: {
    fill: am5.color(0xc4ad83),
    stroke: am5.color(0xc4ad83)
  }
}\];


## Backgrounds (5.20.7)

A container's `background` (e.g. the background of a `Label`) has no data item of its own. Since 5.20.7, a background that has its own `templateField` reads the data item of the container it belongs to, so a background can be set per data item — for example, a different label background on each bullet:

```javascript
series.bullets.push(function (root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{valueY}",
      populateText: true,
      background: am5.RoundedRectangle.new(root, {
        templateField: "labelBg"
      })
    })
  });
});

// Data
// { date: ..., value: 1000, labelBg: { fill: am5.color(0xff0000) } }
```

Before 5.20.7 such a `templateField` on a background was never applied.


## Bullets

There are some caveats involved when using template fields with bullets.

For more information, please visit "Bullets: [Template fields](https://www.amcharts.com/docs/v5/concepts/common-elements/bullets/#template-fields)" tutorial.
