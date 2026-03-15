---
title: "Exporting to image formats"
source: "https://www.amcharts.com/docs/v5/concepts/exporting/exporting-images/"
scraped: "2026-03-15"
---

This tutorial looks at configuration options for chart snapshot export with [Exporting](https://www.amcharts.com/docs/v5/concepts/exporting/) plugin.

## Image quality

PNG or JPEG formats support `quality` option.

It's a numeric value between `0` (zero) and `1` (one), where zero means worst quality, and one - the highest possible quality.

For very large images, we might want to reduce quality so that export does not result in huge files.

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    quality: 0.7
  },
  jpgOptions: {
    quality: 0.7
  }
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    quality: 0.7
  },
  jpgOptions: {
    quality: 0.7
  }
});

## Pixel ratio

Most of the computer screen nowadays have a pixel ratio.

That means that actual screen resolution is times higher than the OS resolution.

For example the screen matrix might support 4800 pixels, but the screen is set to show only 2400 pixels - two hardware pixels per one virtual pixels.

This results in super sharp images on screen.

When exporting, the image will have actual resolution - like it would be without pixel ratio applied - 4800 pixels as per example above.

If we'd rather export an image down-sampled to the view pixels (2400), we can set `maintainPixelRatio` option for image formats to `true`:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    maintainPixelRatio: true
  },
  jpgOptions: {
    maintainPixelRatio: true
  }
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    maintainPixelRatio: true
  },
  jpgOptions: {
    maintainPixelRatio: true
  }
});

## Sizing exported image

Image formats (`pngOptions` and `jpgOptions`) have four options that can modify size of the exported image:

Option

Comment

`minWidth`

Exported image will not be smaller than X pixels in width.

`maxWidth`

Exported image will not be bigger than X pixels in width.

`minHeight`

Exported image will not be smaller than X pixels in height.

`maxHeight`

Exported image will not be bigger than X pixels in height.

When exporting an image, plugin will size the image to fit into all of these constraints that are set in options.

The image will still maintain its width/height ratio.

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    minWidth: 1000,
    maxWidth: 2000
  },
  jpgOptions: {
    minWidth: 1000,
    maxWidth: 2000
  }
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
  pngOptions: {
    minWidth: 1000,
    maxWidth: 2000
  },
  jpgOptions: {
    minWidth: 1000,
    maxWidth: 2000
  }
});

The above will ensure that exported image is within 1000 and 2000 pixels in width.

If the source chart is narrower than 1000 pixels, export will re-render it to be exactly 1000 pixels wide.

Similarly, if it is wider than 2000 pixels, export will re-render it to 2000 pixels.

## Combining multiple images

It's possible to include additional root elements into exported images, by including it into exporting's `extraImages` setting.

The following code will add an external legend to the bottom of the exported image:

var exporting = am5plugins\_exporting.Exporting.new(chartRoot, {
  menu: am5plugins\_exporting.ExportingMenu.new(chartRoot, {}),
  extraImages: \[legendRoot\]
});

var exporting = am5plugins\_exporting.Exporting.new(chartRoot, {
  menu: am5plugins\_exporting.ExportingMenu.new(chartRoot, {}),
  extraImages: \[legendRoot\]
});

The items in `extraImages` can either be root elements (they will be added to the bottom of the exported image), or an object that implements `[IExportingImageSource](https://www.amcharts.com/docs/v5/reference/iexportingimagesource/)` interface.

Using a wrapper objects allows specifying a number of additional options, such as position and margins of the extra images:

let exporting = am5plugins\_exporting.Exporting.new(chartRoot, {
  menu: am5plugins\_exporting.ExportingMenu.new(chartRoot, {}),
  extraImages: \[{
    source: legendRoot,
    marginTop: 20
  }\]
});

var exporting = am5plugins\_exporting.Exporting.new(chartRoot, {
  menu: am5plugins\_exporting.ExportingMenu.new(chartRoot, {}),
  extraImages: \[{
    source: legendRoot,
    marginTop: 20
  }\]
});

Here's a working example:


## Modifying exported image

### Hiding/showing elements

It's also possible to modify exported image using exporting plugin's events: `exportstarted` and `exportfinished`.

All we need to do is to make any necessary modifications to our chart when `exportstarted` kicks in, then revert those back on `exportfinished`.

The following code will add a hidden title to the chart, which will be revealed briefly only for export.

let title = chart.children.unshift(am5.Label.new(root, {
  text: "Sales by country ($M)",
  fontSize: 24,
  textAlign: "center",
  width: am5.p100,
  visible: false
}));


let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {})
});

exporting.events.on("exportstarted", function() {
  title.show(0);
});

exporting.events.on("exportfinished", function() {
  title.hide(0);
});

var title = chart.children.unshift(am5.Label.new(root, {
  text: "Sales by country ($M)",
  fontSize: 24,
  textAlign: "center",
  width: am5.p100,
  visible: false
}));


var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {})
});

exporting.events.on("exportstarted", function() {
  title.show(0);
});

exporting.events.on("exportfinished", function() {
  title.hide(0);
});


### Resizing the whole chart

The same approach would work for resizing the export, too.

We can temporarily change the width/height of the chart's container `<div>` when `exportstarted` kicks in, then reset it back when `exportfinished` triggers.

To ensure that chart takes in the new sizing, we will also need to call `resize()` method of the root element.

exporting.events.on("exportstarted", function() {
  root.dom.style.width = "200px";
  root.dom.style.height = "300px";
  root.resize();
});

exporting.events.on("exportfinished", function() {
  root.dom.style.width = "";
  root.dom.style.height = "";
});

exporting.events.on("exportstarted", function() {
  root.dom.style.width = "200px";
  root.dom.style.height = "300px";
  root.resize();
});

exporting.events.on("exportfinished", function() {
  root.dom.style.width = "";
  root.dom.style.height = "";
});


