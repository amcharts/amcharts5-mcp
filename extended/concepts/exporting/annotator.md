---
title: "Annotator"
source: "https://www.amcharts.com/docs/v5/concepts/exporting/annotator/"
scraped: "2026-03-15"
---

This tutorial shows how we can use Annotator tool that comes with the Exporting plugin.

## About Annotator

Annotator is a standalone control that enables users to add visual annotations to the charts.

Under the hood it's just a wrapper for an amazing [marker.js 2](https://markerjs.com/l/amcharts/) library.

Annotator is equipped to automatically load marker.js so you do not need any additional downloads or any dependencies to install.

## Loading

Annotator comes with the Exporting plugin, so if you are using other plugin's features, nothing needs to be loaded additionally.

If you are planning on using Annotator alone, you will need to load Exporting plugin.

You can import those in your TypeScript / ES6 application as JavaScript modules:

import \* as am5plugins\_exporting from "@amcharts/amcharts5/plugins/exporting";

For vanilla JavaScript applications and web pages, you can use "script" version:

<script src="https://cdn.amcharts.com/lib/5/plugins/exporting.js"></script>

MORE INFOFor more information on installing amCharts 5 as well as loading modules refer to our "[Getting started](https://www.amcharts.com/docs/v5/getting-started/)" tutorial.

## Enabling

Annotator is instantiated just like any other object in amCharts 5: by calling [`new()` method](https://www.amcharts.com/docs/v5/getting-started/#New_element_syntax) of its class, passing in [root element](https://www.amcharts.com/docs/v5/getting-started/#Root_element) and settings object.

let annotator = am5plugins\_exporting.Annotator.new(root, {});

var annotator = am5plugins\_exporting.Annotator.new(root, {});

## Invoking

### Via API

Annotator instance contains several methods that we can use:

Method

Comment

`open()`

Triggers annotation mode on the chart. This will display UI toolbars and disable all interactions on the chart itself.

`close()`

Exists from annotation mode. All annotations remain visible on the chart.

`toggle()`

Toggles annotation mode between on and off. If annotations have been modified, the changes will be saved.

`cancel()`

Exits from annotation mode. Any changes made during last session of the annotation editing are discarded.

`clear()`

All annotations are removed.

annotator.open();

annotator.open();

### Via export menu

We can add Annotator to export menu by manually [inserting it into menu items](https://www.amcharts.com/docs/v5/concepts/exporting/export-menu/#Adding_custom_items):

let menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Annotate",
  callback: function() {
    this.close();
    annotator.toggle();
  }
});

var menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Annotate",
  callback: function() {
    this.close();
    annotator.toggle();
  }
});

## Configuring UI

Annotator acts as a wrapper for the actual annotation library - marker.js 2.

To configure UI and functionality of the marker.js you will need to set `markerStyleSettings` and `markerSettings` respectively.

let annotator = am5plugins\_exporting.Annotator.new(root, {
  markerSettings: {
    defaultColorSet: \["red", "green", "blue"\],
    defaultColor: "green"
  }
  markerStyleSettings: {
    toolboxColor: "#F472B6",
    toolboxAccentColor: "#BE185D"
  }
});

var annotator = am5plugins\_exporting.Annotator.new(root, {
  markerSettings: {
    defaultColorSet: \["red", "green", "blue"\],
    defaultColor: "green"
  }
  markerStyleSettings: {
    toolboxColor: "#F472B6",
    toolboxAccentColor: "#BE185D"
  }
});

For more information on configuring `MarkerArea`, visit these [marker.js docs](https://markerjs.com/docs/getting-started).

## Example


## Pre-loading annotations

In some cases we will want to pre-load previously created annotations, rather then starting afresh.

### Getting annotation data

To get current annotations from annotator, we can use its `markerState` setting.

It's a setting annotator stores raw data in whenever annotation UI is closed.

let annotationData = annotator.get("markerState");

var annotationData = annotator.get("markerState");

Now that we have raw data (which is a JS object), we can serialize and store it the way we see fit, for later retrieval.

### Restoring annotation data

For restoring annotation data, we too use `markerState`.

We can use annotator's `set()` method, or provide it when initializing the annotator itself:

let annotationData = { ... };

let annotator = am5plugins\_exporting.Annotator.new(root, {
  markerState: annotationData
});

var annotationData = { ... };

var annotator = am5plugins\_exporting.Annotator.new(root, {
  markerState: annotationData
});


