---
title: "Right-to-left support"
source: "https://www.amcharts.com/docs/v5/concepts/locales/right-to-left-support/"
scraped: "2026-03-15"
---

This tutorial how you can enable right-to-left support for various elements in amCharts 5.

## Labels

To enable support for RTL on any label, we use its `direction` setting with a `"rtl"` value.

Let's take this label definition (used for a pie chart slice):

pieSeries.labels.template.setAll({
  text: <span style="background-color: inherit; font-family: monospace; font-size: inherit;">"\[bold\]فاكهة\[/\]\\n{category}: {value.percent.formatNumber('#.#')}%"</span>
});

pieSeries.labels.template.setAll({
  text: <span style="background-color: inherit; font-family: monospace; font-size: inherit;">"\[bold\]فاكهة\[/\]\\n{category}: {value.percent.formatNumber('#.#')}%"</span>
});

When browser rendering engine encounters RTL text withing regular text, a pretty weird fuzzy logic kicks in, resulting in labels, that are formatted in definitely not right way:

Incorrect result (`direction = "ltr"` - default)

Enabling RTL fixes it by properly laying out the labels:

pieSeries.labels.template.setAll({
  text: <span style="background-color: inherit; font-family: monospace; font-size: inherit;">"\[bold\]فاكهة\[/\]\\n{category}: {value.percent.formatNumber('#.#')}%"</span>,
  direction: "rtl"
});

pieSeries.labels.template.setAll({
  text: <span style="background-color: inherit; font-family: monospace; font-size: inherit;">"\[bold\]فاكهة\[/\]\\n{category}: {value.percent.formatNumber('#.#')}%"</span>,
  direction: "rtl"
});

Correct result (`direction = "rtl"`)

### Gotchas

#### Numbers

As we can see from the above screenshots, enabling RTL reverses order of blocks, including putting the `"%"` sign to the other side of the number.

This is true for the mixed-language content only.

If our labels would contain only Latin (letf-to-right) text or numbers/symbols, it would remain as is: `rtl` setting would have no effect over it.

For labels with just numbers and symbols `direction` setting is ignored

#### Formatting blocks

Another thing that does not respect `rtl` setting is [inline formatting block syntax](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/).

One might expect for the RTL label the opening and closing blocks to work from right to left to right as well, e.g. `... [/]xxxxx[bold] ...`, e.g. the "xxxxx" to be bold.

That is not how it works. The formatting block (i.e. `[bold]`) always affects text to the right of it, until it encounters closing block (`[/]`).

So, the correct usage is: `... [bold]xxxxx[/] ...`.

## Legend

For RTL languages, reversing order of legend items as well as items within single legend entry (marker to the right, then label, then value) might seem more natural.

Luckily this is easy to do as well: for that we have a universal `reverseChildren` setting.

### Flipping entry elements

Each legend entry is a `Container` with a "horizontal" layout. All we have to do to reverse the order of its elements, is to set `reverseChildren` of the template for the legend item containers:

legend.itemContainers.template.setAll({
  reverseChildren: true
});

legend.itemContainers.template.setAll({
  reverseChildren: true
});

`reverseChildren: false` (default)

`reverseChildren: true`

### Changing item order

We might also want to change the order of the items in legend, so that first item starts on the right.

For that we can simple use the `reverseChildren` on the legend itself.

let legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  layout: root.horizontalLayout,
  reverseChildren: true
}));

var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  layout: root.horizontalLayout,
  reverseChildren: true
}));

### Legend example


