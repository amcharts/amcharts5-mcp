---
title: "Migrating from amCharts 4"
source: "https://docs.amcharts.com/v5/migrating-from-amcharts-4/"
scraped: "2026-11-16"
---

This page will list some conceptual differences between amCharts 4 and 5, which, hopefully, will help you with the decision to upgrade (or not).

## Not an upgrade

amCharts 4 and amCharts 5 are conceptually different libraries.

The code between the two is not interchangeable.

## Generic differences

In a few words: amCharts 5 was designed to be fast and use less memory footprint than its predecessor.

amCharts 5 draws with the Canvas API by default, whereas amCharts 4 used SVG. It can also draw a chart as SVG (see "Canvas and SVG" below).

Canvas API is generally way faster than SVG, however it paints outside DOM tree, which means you can't target individual chart elements via JavaScript or CSS.

## Code syntax

amCharts 5 uses "[root element](https://docs.amcharts.com/v5/getting-started/root-element/)" approach - you create a root element, then add actual chart or series objects to it.

The reference to root element is passed into all chart objects being created.

amCharts 4 did not have a root element, so chart instance was the top element in the tree.

## Functional changes in v5

### Limited JSON support

amCharts 4 offered two ways to configure charts: object/procedural and JSON configs.

amCharts 5 offers object/procedural approach as well as limited [JSON config](https://docs.amcharts.com/v5/concepts/serializing/) support.

### No 3D

There are no 3D-esque chart types in amCharts 5, like 3D columns, pies, or cylinders.

### Canvas and SVG

amCharts 5 draws on canvas by default. To draw a chart as SVG, set `renderer: am5.SVGRenderer` in `Root.new()` settings, or `am5.Root.defaultRenderer = am5.SVGRenderer` for every chart on the page. The chart looks and behaves the same. Its SVG nodes are not tagged per chart object, and the chart handles pointer input itself, so chart elements are still configured and styled through amCharts settings, not DOM or CSS. See "[Root element: Renderer](https://docs.amcharts.com/v5/getting-started/root-element/#renderer)".

A chart drawn by either renderer can be exported as an SVG image: the Exporting plugin's `"svg"` format (also in the default export menu), or `am5.renderToSVG(root)`. See "[Exporting to SVG](https://docs.amcharts.com/v5/concepts/exporting/exporting-svg/)".

## Browser support

amCharts 5 does not support any version of Internet Explorer, which was supported in amCharts 4.

EDGE browser as well as other modern desktop and mobile browsers are fully supported.

## Should I migrate?

#### Migrate if...

* Struggling with performance or memory footprint of amCharts 4.
* Using charts in multi-chart dashboards.
* Need chart types unsupported by v4 like Tree, drillable Suburst, Partition, Pack.
* Need Stock chart type (currently in development for amCharts 5).
* Want charts to be faster and use less memory.

#### Do not migrate if...

* Still need to support legacy browsers like Internet Explorer.
* Need 3D charts.
* Need to be able to serialize chart configs as JSON.
* Using amCharts Editor 4.
