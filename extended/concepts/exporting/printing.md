---
title: "Printing"
source: "https://www.amcharts.com/docs/v5/concepts/exporting/printing/"
scraped: "2026-03-15"
---

This tutorial looks at configuration options for printing charts with [Exporting](https://www.amcharts.com/docs/v5/concepts/exporting/) plugin.

## Print method

There are two methods to initiate print of a single element on the page:

-   Hide everything besides chart being printed, then initiate print of the page.
-   Create an `<iframe>` element with chart snapshot in it, then initiate print of the iframe document.

The iframe method is default.

However, in some setups, security restrictions might prevent creating iframes. In those cases we might want to switch the method by setting `printMethod` option to `"css"`:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  printOptions: {
    printMethod: "css"
  }
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  printOptions: {
    printMethod: "css"
  }
});

## Title

If we'd like some title to be added to the printed chart we can do so via `title` option in `printOptions`:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  printOptions: {
    title: "My awesome chart"
  }
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  printOptions: {
    title: "My awesome chart"
  }
});

## Image options

Export will generate a snapshot for printing in PNG format.

We can change that using `imageFormat` option:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  printOptions: {
    imageFormat: "jpg"
  }
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  printOptions: {
    imageFormat: "jpg"
  }
});

Choosing specific format will also mean that specific image format options will be used to generate snapshot: `pngOptions` for PNG and `jpgOptions` for JPEG.

## Disabling print

Disabling print is done just like any other format - via its options:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  printOptions: {
    disabled: true
  }
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  printOptions: {
    disabled: true
  }
});

## Printing via API

To trigger printing of the chart programmatically, simply call exporting plugins `print()` method:

exporting.print();

exporting.print();
