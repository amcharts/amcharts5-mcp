---
title: "Exporting"
source: "https://www.amcharts.com/docs/v5/concepts/exporting/"
scraped: "2026-03-15"
---

This tutorial will walk through options of exporting chart view and data using bundled plugin: Exporting.

## Loading

Exporting plugin needs to be loaded in order for it to be used.

You can import those in your TypeScript / ES6 application as JavaScript modules:

import \* as am5plugins\_exporting from "@amcharts/amcharts5/plugins/exporting";

For vanilla JavaScript applications and web pages, you can use "script" version:

<script src="https://cdn.amcharts.com/lib/5/plugins/exporting.js"></script>

MORE INFOFor more information on installing amCharts 5 as well as loading modules refer to our "[Getting started](https://www.amcharts.com/docs/v5/getting-started/)" tutorial.

## Enabling

Exporting plugin is instantiated just like any other object in amCharts 5: by calling [`new()` method](https://www.amcharts.com/docs/v5/getting-started/#New_element_syntax) of its class, passing in [root element](https://www.amcharts.com/docs/v5/getting-started/#Root_element) and settings object.

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {})
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {})
});

## Menu

To enable export menu, we need to instantiate an `ExportingMenu` object and assign it to `menu` setting of the exporting:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {})
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {})
});

For more information about setting up and configuring export menu, refer to "[Export menu](https://www.amcharts.com/docs/v5/concepts/exporting/export-menu/)" tutorial.

## Formats

### Configuring formats

Each export format, as a corresponding object in plugins settings, that can be used to set it's options.

For example, PNG image export can be set via `pngOptions`:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    quality: 0.8,
    maintainPixelRatio: true
  }
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    quality: 0.8,
    maintainPixelRatio: true
  }
});

Each format has own set of options that can be set.

The table below lists formats, their options setting, and link to the complete list of format options:

Format

Type

Setting

PNG

Image

`pngOptions`

[Available options](https://www.amcharts.com/docs/v5/reference/iexportingimageoptions/)

JPEG

Image

`jpgOptions`

[Available options](https://www.amcharts.com/docs/v5/reference/iexportingimageoptions/)

PDF

Image + data

`pdfOptions`

[Available options](https://www.amcharts.com/docs/v5/reference/iexportingpdfoptions/)

PDF data

Data

`pdfdataOptions`

[Available options](https://www.amcharts.com/docs/v5/reference/iexportingdataoptions/)

XLSX (Excel)

Data

`xlsxOptions`

[Available options](https://www.amcharts.com/docs/v5/reference/iexportingxlsxoptions/)

CSV

Data

`csvOptions`

[Available options](https://www.amcharts.com/docs/v5/reference/iexportingcsvoptions/)

JSON

Data

`jsonOptions`

[Available options](https://www.amcharts.com/docs/v5/reference/iexportingjsonoptions/)

HTML

Data

`htmlOptions`

[Available options](https://www.amcharts.com/docs/v5/reference/iexportinghtmloptions/)

Print

Print

`printOptions`

[Available options](https://www.amcharts.com/docs/v5/reference/iexportingprintoptions/)

### Disabling formats

Disabling a format is as easy as setting `disabled: true` in its options:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  htmlOptions: {
    disabled: true
  }
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  htmlOptions: {
    disabled: true
  }
});

The above will effectively remove HTML export from the menu.

## Exporting images

For information on how to set up and configure exporting of chart snapshots, refer to "[Exporting to image formats](https://www.amcharts.com/docs/v5/concepts/exporting/exporting-images/)" tutorial.

## Exporting data

To enable data export, we need to provide the data to export via plugin's `dataSource` setting:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  dataSource: data
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  dataSource: data
});

For information on how to set up and configure data export, refer to "[Exporting data](https://www.amcharts.com/docs/v5/concepts/exporting/exporting-data/)" tutorial.

## Name of export file

Exporting plugin will export files named `chart.***` by default.

We can change that using `[filePrefix](https://www.amcharts.com/docs/v5/reference/exporting/#filePrefix_setting)` setting:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  filePrefix: "myChart"
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  filePrefix: "myChart"
});

## Printing

For information on how to set up and configure chart printing, refer to "[Printing](https://www.amcharts.com/docs/v5/concepts/exporting/printing/)" tutorial.

## Common pitfalls

### Tainted images

Due to browser's security restrictions, exported images can't include "tainted" images.

A "tainted" image is any asset that came from a different host than the web page displaying the chart. For example, if you load an image bullet from a different domain, it would be omitted from the exported image.

The chart would still export, just without the tainted images.

### Local files

Local files (files loaded via `file:///...` URL) are considered tainted, and will not be included in exports.

In order for export to work properly, both the web page and all the images need to be loaded via web server, even if it's `http://localhost/...`.

## API

Exporting plugin provides an extensive API. Please refer to "[Exporting API](https://www.amcharts.com/docs/v5/concepts/exporting/exporting-api/#Data_as_an_HTML_table)" tutorial for more information.

## Related tutorials

-   [Creating multi-content PDF export](https://www.amcharts.com/docs/v5/tutorials/creating-multi-content-pdf-export/)
-   [Adding custom buttons to Exporting Menu](https://www.amcharts.com/docs/v5/tutorials/adding-custom-buttons-to-exporting-menu/)
