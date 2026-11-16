---
title: "Right-to-left support"
source: "https://docs.amcharts.com/v5/concepts/locales/right-to-left-support/"
scraped: "2026-11-16"
---

> How to lay out labels, legends and other containers for right-to-left languages in amCharts 5.

This tutorial shows how to lay out labels, legends and other containers for right-to-left (RTL) languages, such as Arabic or Hebrew.

## Whole chart

Since version 5.22.0, set `direction` when creating the [root element](https://docs.amcharts.com/v5/getting-started/root-element/#text-direction):

TypeScript:

```ts
const root = am5.Root.new("chartdiv", {
  direction: "rtl"
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  direction: "rtl"
});
```

* Text with no `direction` of its own is drawn right to left.
* Legends lay out from the right: the first item is at the top right, and each item has its marker on the right of its name.
* `"ltr"` keeps everything left to right, e.g. for a chart in English on a page with `dir="rtl"`.
* Not set, text follows the direction of the chart's element, e.g. a page with `dir="rtl"`, and legends stay left to right.

The direction can only be set when the root element is created.

> **Important:** If your legend uses `reverseChildren` for right to left, remove it when you set `direction`. Otherwise the two undo each other, and the markers end up on the left again.

Example: [Right-to-left chart](https://docs.amcharts.com/embeds/v5/right-to-left-chart/). Its code: get_example(path: "examples/docs-demos/right-to-left-chart").

## Labels

To enable RTL on a single label, set its `direction` to `"rtl"`. With the root's `direction: "rtl"`, that's the default for every label without a `direction` of its own.

Let's take this label definition (used for a pie chart slice):

TypeScript:

```ts
pieSeries.labels.template.setAll({
  text: "[bold]فاكهة[/]\n{category}: {value.percent.formatNumber('#.#')}%"
});
```

JavaScript:

```js
pieSeries.labels.template.setAll({
  text: "[bold]فاكهة[/]\n{category}: {value.percent.formatNumber('#.#')}%"
});
```

When the browser's rendering engine encounters RTL text within regular text, its own ordering rules kick in, and the label comes out in the wrong order:

![](https://docs.amcharts.com/v5/images/concepts/locales/right-to-left-support/image-14.png "Incorrect result (`direction = 'ltr'` - default)")

Enabling RTL fixes it by properly laying out the labels:

TypeScript:

```ts
pieSeries.labels.template.setAll({
  text: "[bold]فاكهة[/]\n{category}: {value.percent.formatNumber('#.#')}%",
  direction: "rtl"
});
```

JavaScript:

```js
pieSeries.labels.template.setAll({
  text: "[bold]فاكهة[/]\n{category}: {value.percent.formatNumber('#.#')}%",
  direction: "rtl"
});
```

![](https://docs.amcharts.com/v5/images/concepts/locales/right-to-left-support/image-15.png "Correct result (`direction = 'rtl'`)")

### Text alignment

A label with a `width` aligns its text inside that box with `textAlign`. `"left"` and `"right"` are the box's sides. `"start"` and `"end"` follow the direction:

| `textAlign` | `direction: "ltr"` | `direction: "rtl"` |
| ----------- | ------------------ | ------------------ |
| `"left"`    | Left               | Left               |
| `"right"`   | Right              | Right              |
| `"start"`   | Left               | Right              |
| `"end"`     | Right              | Left               |
| `"center"`  | Center             | Center             |

### Gotchas

#### Numbers

As we can see from the above screenshots, enabling RTL reverses order of blocks, including putting the `"%"` sign to the other side of the number.

This is true for the mixed-language content only.

If our labels would contain only Latin (left-to-right) text or numbers/symbols, it would remain as is: `rtl` setting would have no effect over it.

![](https://docs.amcharts.com/v5/images/concepts/locales/right-to-left-support/image-16.png "For labels with just numbers and symbols `direction` setting is ignored")

#### Formatting blocks

Another thing that does not respect `rtl` setting is [inline formatting block syntax](https://docs.amcharts.com/v5/concepts/formatters/text-styling/).

One might expect the opening and closing blocks of an RTL label to work from right to left as well, e.g. `... [/]xxxxx[bold] ...` to make "xxxxx" bold.

That is not how it works. The formatting block (i.e. `[bold]`) always affects text after it, until it encounters closing block (`[/]`).

So, the correct usage is: `... [bold]xxxxx[/] ...`.

#### Right-to-left pages

Since version 5.22.0, text with no `direction` of its own follows the direction of the chart's element. On a page with `dir="rtl"`, it's drawn right to left, in its place. To keep it left to right, set the root's `direction` to `"ltr"`.

## Legend

With the root's `direction: "rtl"`, legends need no settings of their own. See "[Whole chart](https://docs.amcharts.com/v5/concepts/locales/right-to-left-support/#whole-chart)".

### One legend

Since version 5.22.0, a single legend can be set up for an RTL language with its own `direction` setting:

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50,
  direction: "rtl"
}));
legend.itemContainers.template.set("direction", "rtl");
legend.labels.template.set("direction", "rtl");
legend.valueLabels.template.set("textAlign", "right");
legend.data.setAll(chart.series.values);
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50,
  direction: "rtl"
}));
legend.itemContainers.template.set("direction", "rtl");
legend.labels.template.set("direction", "rtl");
legend.valueLabels.template.set("textAlign", "right");
legend.data.setAll(chart.series.values);
```

| Setting                                      | Effect                                                                                                                                    |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Legend's `direction: "rtl"`                  | Items go from right to left. The first one is at the top right, and a part-filled last row is on the right.                               |
| `itemContainers.template` `direction: "rtl"` | In each item, the marker is on the right, then the name, then the value.                                                                  |
| `labels.template` `direction: "rtl"`         | Needed for names in an RTL language, unless the page has `dir="rtl"`. See "[Labels](https://docs.amcharts.com/v5/concepts/locales/right-to-left-support/#labels)". |
| `valueLabels.template` `textAlign: "right"`  | Keeps each value next to its name. Without it, the values line up at the left.                                                            |

`direction` works on any container with a horizontal or grid layout, not only legends. See "[Containers: Right to left](https://docs.amcharts.com/v5/concepts/common-elements/containers/#right-to-left)".
