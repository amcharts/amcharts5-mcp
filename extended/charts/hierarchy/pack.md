---
title: "Pack"
source: "https://www.amcharts.com/docs/v5/charts/hierarchy/pack/"
scraped: "2026-03-15"
---

This tutorial will look at how to configure pack series.

## Circles

In pack series, `circles.template` can be used to configure node circles. All nodes have them.

The template accepts all [`Circle` settings](https://www.amcharts.com/docs/v5/reference/circle/#Settings).

series.circles.template.setAll({
  fillOpacity: 0.7,
  strokeWidth: 1,
  strokeOpacity: 1
});

series.circles.template.setAll({
  fillOpacity: 0.7,
  strokeWidth: 1,
  strokeOpacity: 1
});

## Labels

### Configuring labels

Series label configuration is done via its template, accessible via series property `labels.template`.

series.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x550000),
  text: "{category}"
});

series.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x550000),
  text: "{category}"
});

Pack series uses `[Label](https://www.amcharts.com/docs/v5/reference/label/)` for its labels. Check out its class reference for all the [possible settings](https://www.amcharts.com/docs/v5/reference/label/#Settings).

### Label content

Node labels are pre-set to display name of the node.

We can modify contents of the tooltips using `text` setting on a series label template:

series.labels.template.setAll({
  text: "{category}: \[bold\]{sum}\[/\]",
  fontSize: 14
});

series.labels.template.setAll({
  text: "{category}: \[bold\]{sum}\[/\]",
  fontSize: 14
});

Contents of the tooltip can include [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

Refer to `[IPackDataItem](https://www.amcharts.com/docs/v5/reference/ipackdataitem/)` for available keys for the data placeholders.

### Disabling labels

To disable series labels, we can set `forceHidden` setting to `true` in their template:

series.labels.template.set("forceHidden", true);

series.labels.template.set("forceHidden", true);

## Tooltips

Nodes are pre-set to display a tooltip on hover containing name of the category and its value.

We can modify contents of the tooltips using `tooltipText` on rectangle's template:

series.nodes.template.set("tooltipText", "{category}: \[bold\]{sum}\[/\]");

series.nodes.template.set("tooltipText", "{category}: \[bold\]{sum}\[/\]");

Contents of the tooltip can include [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

Refer to `[IPackDataItem](https://www.amcharts.com/docs/v5/reference/ipackdataitem/)` for available keys for the data placeholders.

## Example


