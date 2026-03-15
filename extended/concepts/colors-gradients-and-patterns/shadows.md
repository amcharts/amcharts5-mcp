---
title: "Shadows"
source: "https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/"
scraped: "2026-03-15"
---

This tutorial looks at how we can add shadows to graphic elements.

## Enabling

Shadows can be enabled on any `Graphics`, `Picture`, and `Label` elements.

To do that, we need to set shadow-related settings:

Setting key

Comment

`shadowColor`

Shadow color.

`shadowBlur`

Blurriness of the shadow.  
The bigger the number, the blurrier and wider shadow will be.  
`0` will mean completely sharp shadow, ideally replicating lines of the target element.

`shadowOffsetX`

Horizontal offset in pixels. Can accept negative number to move it left.

`shadowOffsetY`

Vertical offset in pixels. Can accept negative number to move it up.

`shadowOpacity`

Opacity of the shadow. If not set, will use elements `fillOpacity`.

For shadow to work `shadowColor` and at least one of the `shadowBlur`, `shadowOffsetX`, and/or `shadowOffsetY` needs to be set.

## Examples

### Standalone objects

The following will add shadow to the chart's plot container using its background element:

chart.plotContainer.get("background").setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

chart.plotContainer.get("background").setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

### Column series

series.columns.template.setAll({
  strokeOpacity: 0,
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

series.columns.template.setAll({
  strokeOpacity: 0,
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});


### Line series and bullets

series.strokes.template.setAll({
  strokeWidth: 2,
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 10,
  shadowOffsetY: 10,
  shadowOpacity: 0.5
});

series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      shadowColor: am5.color(0x000000),
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.3
    })
  })
});

series.strokes.template.setAll({
  strokeWidth: 2,
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 10,
  shadowOffsetY: 10,
  shadowOpacity: 0.5
});

series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      shadowColor: am5.color(0x000000),
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.3
    })
  })
});


### Tooltips

We can enable shadows on tooltips using specific tooltip's settings:

series.get("tooltip").get("background").setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

series.get("tooltip").get("background").setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

Or, we can use default theme to apply tooltip to all tooltips:

// Add shadow to all tooltips...
root.defaultTheme.rule("PointedRectangle", \["tooltip", "background"\]).setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

// ... except axis
root.defaultTheme.rule("PointedRectangle", \["tooltip", "background", "axis"\]).setAll({
  shadowColor: null
});

// Add shadow to all tooltips...
root.defaultTheme.rule("PointedRectangle", \["tooltip", "background"\]).setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

// ... except axis
root.defaultTheme.rule("PointedRectangle", \["tooltip", "background", "axis"\]).setAll({
  shadowColor: null
});


