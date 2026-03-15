---
title: "List templates"
source: "https://www.amcharts.com/docs/v5/concepts/settings/list-templates/"
scraped: "2026-03-15"
---

List templates (or objects of type `[ListTemplate](https://www.amcharts.com/docs/v5/reference/listtemplate/)`) are combination of a list of items of certain type as well as collection of default settings for those objects. List templates are used throughout amCharts 5.

## Use case

List templates are used in many cases where some object - mainly series - needs to create a number of specific elements and make those elements user-configurable.

For example, pie series would create a bunch of slices.

The list template for those would be accessible via pie series' `slices` property, and would hold instances of all actual `Slice` elements in series, as well as a property: `template`, which can be used to configure slices.

## Templates

Templates of a list template is accessible via its `template` property.

For example: `pieSeries.slices.template`.

It can be used to set:

-   Settings
-   Events
-   Adapters
-   States
-   Object setup function

Each of those work exactly like we would use them on an object of a real element.

### Settings

We set settings using `set()` (for setting single key) or `setAll()` (for setting multiple key/values at once).

pieSeries.slices.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0x000000),
  strokeOpacity: 1
});

pieSeries.slices.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0x000000),
  strokeOpacity: 1
});

When new elements are created in this list, the will be set the settings from the template.

These settings will override whatever defaults actual element may have.

For more information about setting, refer to "[Settings](https://www.amcharts.com/docs/v5/concepts/settings/)" tutorial.

### Setup handler

Templates can also have a custom function which will be run on a newly created object.

The following will show how we can make axis labels add a background:

yAxis.get("renderer").labels.template.setup = function(target) {
  target.set("background", am5.Rectangle.new(root, {
    fill: am5.color(0xff0000)
  }))
}

yAxis.get("renderer").labels.template.setup = function(target) {
  target.set("background", am5.Rectangle.new(root, {
    fill: am5.color(0xff0000)
  }))
}

IMPORTANT The `template.setup` needs to be set **before** any data is set on the the series.

### Events

Events can also be set on a template, just like we would do on a real element:

columnSeries.columns.template.events.on("click", function(ev) {
  console.log("Clicked on a clumn");
});

columnSeries.columns.template.events.on("click", function(ev) {
  console.log("Clicked on a clumn");
});

Events added on a template, will be automatically replicated on any new object created in the list.

For more information about events, refer to "[Events](https://www.amcharts.com/docs/v5/concepts/events/)" tutorial.

### Adapters

Similarly to events, adapters added to a template will also be copied over to any new element created in the list:

columnSeries.columns.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.valueY < 0) {
    return am5.color(0xff0000);
  else {
    return fill;
  }
});

columnSeries.columns.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.valueY < 0) {
    return am5.color(0xff0000);
  else {
    return fill;
  }
});

For more information about adapters, refer to "[Adapters](https://www.amcharts.com/docs/v5/concepts/settings/adapters/)" tutorial.

### States

States can also be created on a template, and will carry over to the newly created elements:

columnSeries.columns.template.set("interactive", true);

columnSeries.columns.template.states.create("hover", {
  fill: am5.color(0x0ff00f)
});

columnSeries.columns.template.set("interactive", true);

columnSeries.columns.template.states.create("hover", {
  fill: am5.color(0x0ff00f)
});

For more information about states, refer to "[Sates](https://www.amcharts.com/docs/v5/concepts/settings/states/)" tutorial.

## List items

### Getting specific item

To get a specific item from the list, we can use its `getIndex()` method:

pieSeries.slices.getIndex(0); // get the first slice

pieSeries.slices.getIndex(0); // get the first slice

### Iterating

List template has a handy method `each()` that can be used to iterate through all of the list items:

pieSeries.slices.each(function(slice) {
  console.log(slice);
});

pieSeries.slices.each(function(slice) {
  console.log(slice);
});

For more methods and properties available in list templates, refer to `ListTemplate` [class reference](https://www.amcharts.com/docs/v5/reference/listtemplate/).
