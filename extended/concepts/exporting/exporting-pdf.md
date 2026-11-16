---
title: "Exporting PDF"
source: "https://docs.amcharts.com/v5/concepts/exporting/exporting-pdf/"
scraped: "2026-11-16"
---

> This tutorial looks at configuration options for export of charts to PDF documents with Exporting plugin.

This tutorial looks at configuration options for export of charts to PDF documents with [Exporting](https://docs.amcharts.com/v5/concepts/exporting/) plugin.

## Page options

We can set page format, orientation, and margins via `pdfOptions` setting.

The following options are available:

| Option            | Default            | Available values                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pageSize`        | `"A4"`             | `"4A0"`, `"2A0"`, `"A0"`, `"A1"`, `"A2"`, `"A3"`, `"A4"`, `"A5"`, `"A6"`, `"A7"`, `"A8"`, `"A9"`, `"A10"`, `"B0"`, `"B1"`, `"B2"`, `"B3"`, `"B4"`, `"B5"`, `"B6"`, `"B7"`, `"B8"`, `"B9"`, `"B10"`, `"C0"`, `"C1"`, `"C2"`, `"C3"`, `"C4"`, `"C5"`, `"C6"`, `"C7"`, `"C8"`, `"C9"`, `"C10"`, `"RA0"`, `"RA1"`, `"RA2"`, `"RA3"`, `"RA4"`, `"SRA0"`, `"SRA1"`, `"SRA2"`, `"SRA3"`, `"SRA4"`, `"EXECUTIVE"`, `"FOLIO"`, `"LEGAL"`, `"LETTER"`, `"TABLOID"`. |
| `pageOrientation` | `"portrait"`       | `"portrait"`, `"landscape"`.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `pageMargins`     | `[30, 30, 30, 30]` | A single number, in which case it will act as margin setting for all four edges of the page. An array of two numbers `[ horizontal, vertical ]`. An array of four numbers `[ left, top, right, bottom ]`.                                                                                                                                                                                                                                                 |

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  pdfOptions: {
    pageSize: "LETTER",
    pageOrientation: "landscape",
    pageMargins: [20, 20, 20, 40]
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  pdfOptions: {
    pageSize: "LETTER",
    pageOrientation: "landscape",
    pageMargins: [20, 20, 20, 40]
  }
});
```

## Image options

Export will use PNG format to generate an image to include into PDF.

We can change that using `imageFormat` option:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  pdfOptions: {
    imageFormat: "jpg"
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  pdfOptions: {
    imageFormat: "jpg"
  }
});
```

Choosing specific format will also mean that specific image format options will be used to generate snapshot: `pngOptions` for PNG and `jpgOptions` for JPEG.

## Extra info

### Title

If we'd like some title to be added at the top of the PDF document we can do so via `title` setting. Please note that it's a plugin setting, on a format option in `pdfOptions`:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  title: "My awesome chart",
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  title: "My awesome chart",
});
```

### Data

We can also make the PDF include a table of data via `includeData` option:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  data: data,
  title: "My awesome chart",
  pdfOptions: {
    includeData: true
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  data: data,
  title: "My awesome chart",
  pdfOptions: {
    includeData: true
  }
});
```

### Source URL

PDF will also include a `"Saved from... "` header, to indicated the address of the web page PDF was exported on.

We can disable it by setting `addURL` option to `false`:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  data: data,
  title: "My awesome chart",
  pdfOptions: {
    includeData: true,
    addURL: false
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  data: data,
  title: "My awesome chart",
  pdfOptions: {
    includeData: true,
    addURL: false
  }
});
```

## Fonts

The core functionality of the PDF export includes only Latin fonts. That means that exported text in non-Latin alphabets will come out garbled.

That affects only actual text added to the exported PDF, such as title or data.

To fix that, we offer additional font package you can download, install, or load off of CDN: PDF font package.

### Loading fonts

#### NPM package

To get all available fonts, install the [`@amcharts/amcharts5-fonts`](https://www.npmjs.com/package/@amcharts/amcharts5-fonts) package:

```sh
npm install @amcharts/amcharts5-fonts
```

Then you can access each specific font as a module:

```ts
import am5fonts_notosans_kr from "@amcharts/amcharts5-fonts/notosans-kr";
```

#### JavaScript script

Font files are provided in plain JS files that you can load using `<script>` tags:

```js
<script src="https://cdn.amcharts.com/lib/5/fonts/notosans-kr.js"></script>
```

The file will create a global variable `am5fonts_notosans_kr` which you can use later in the code.

The above example uses amCharts CDN to load font file. You can also download font package from amCharts [Downloads page](https://www.amcharts.com/download/).

#### List of available fonts

| Font                                                                                     | Language            | Global variable            |
| ---------------------------------------------------------------------------------------- | ------------------- | -------------------------- |
| [Cairo](https://fonts.google.com/specimen/Cairo?subset=arabic\&category=Sans+Serif)      | Arabic              | `am5fonts_cairo_arabic`    |
| [NotoSans JP](https://fonts.google.com/specimen/Noto+Sans+JP?subset=japanese)            | Japanese            | `am5fonts_notosans_jp`     |
| [NotoSans KR](https://fonts.google.com/specimen/Noto+Sans+KR?subset=korean)              | Korean              | `am5fonts_notosans_`kr     |
| [NotoSans SC](https://fonts.google.com/specimen/Noto+Sans+SC?subset=chinese-simplified)  | Simplified Chinese  | `am5fonts_notosans_sc`     |
| [NotoSans TC](https://fonts.google.com/specimen/Noto+Sans+TC?subset=chinese-traditional) | Traditional Chinese | `am5fonts_notosans_tc`     |
| [OpenSans](https://fonts.google.com/specimen/Open+Sans?subset=cyrillic)                  | Cyrilic             | `am5fonts_pensans_cyrilic` |
| [Rubik](https://fonts.google.com/specimen/Rubik?subset=hebrew)                           | Hebrew              | `am5fonts_rubik_hebrew`    |
| [Sarabun](https://fonts.google.com/specimen/Sarabun?subset=thai\&category=Sans+Serif)    | Thai                | `am5fonts_sarabun_thai`    |

### Using loaded fonts

To use loaded font, use `font` setting of the exporting plugin object:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  title: "나의 멋진 차트",
  pdfOptions: {
    includeData: true,
    font: am5fonts_notosans_kr
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  title: "나의 멋진 차트",
  pdfOptions: {
    includeData: true,
    font: am5fonts_notosans_kr
  }
});
```

![](https://docs.amcharts.com/v5/images/concepts/exporting/exporting-pdf/no_pdf_fonts.png "`font` not set (default)")

![](https://docs.amcharts.com/v5/images/concepts/exporting/exporting-pdf/pdf_fonts.png "`font: am5fonts_notosans_kr`")

Example: [PDF export with Korean characters in data](https://docs.amcharts.com/embeds/v5/pdf-export-with-korean-characters-in-data/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js, https://cdn.amcharts.com/lib/5/fonts/notosans-kr.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 400px;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(am5xy.XYChart.new(root, {}));

// Define data
var data = [
  {
    category: "연구",
    value: 450
  },
  {
    category: "마케팅",
    value: 1200
  },
  {
    category: "분포",
    value: 1850
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

xAxis.data.setAll(data);

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  })
);

series.data.setAll(data);

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  title: "나의 멋진 차트",
  pdfOptions: {
    includeData: true,
    addURL: false,
    font: am5fonts_notosans_kr
  }
});
```

### Using multiple fonts

If our export contains multiple languages, we can add additional PDF fonts via `extraFonts` option:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  title: "나의 멋진 차트",
  pdfOptions: {
    includeData: true,
    font: am5fonts_notosans_kr,
    extraFonts: [
      am5fonts_notosans_jp,
      am5fonts_notosans_sc
    ]
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  title: "나의 멋진 차트",
  pdfOptions: {
    includeData: true,
    font: am5fonts_notosans_kr,
    extraFonts: [
      am5fonts_notosans_jp,
      am5fonts_notosans_sc
    ]
  }
});
```

## Customizing PDF document

Export plugin uses a 3rd party library - [pdfmake](http://pdfmake.org/#/) - to generate PDF documents.

Export to PDF operation builds a pdfmake document, populates it with chart image and/or data table, as well as additional elements, like title and source URL.

It also decorates the document with options like page format, margins, font settings.

Before prepared PDF document is converted to actual PDF file and downloaded to user, an event is invoked: `pdfdocready`.

At this point we have an opportunity to modify pdfmake document any way we want:

TypeScript:

```ts
exporting.events.on("pdfdocready", function(event) {
  // Modify event.doc which is a pdfmake document
  // ...
});
```

JavaScript:

```js
exporting.events.on("pdfdocready", function(event) {
  // Modify event.doc which is a pdfmake document
  // ...
});
```

The document definition (`event.doc`) contains a property `content` which is an array consisting of all separate elements that would go into PDF: images, paragraphs, tables, etc.

By default it will contain an `"image"` block containing chart snapshot.

Custom blocks can be added to `content`.

> **More info:** For complete reference on pdfmake document structure [read here](https://pdfmake.github.io/docs/document-definition-object/), or check out their [demo playground](http://pdfmake.org/playground.html).

### Adding custom title

We want our image to go at the top. So we need to add it to the top of the `content` array.

We also need to make it bold and bigger, so we'll need to add `style` block to it.

Finally, we also need padding, so we'll use `margin` setting.

TypeScript:

```ts
exporting.events.on("pdfdocready", function(event) {

  // Add title to the beginning
  event.doc.content.unshift({
    text: "Regional revenue comparison",
    margin: [0, 30],
    style: {
      fontSize: 25,
      bold: true,
    }
  });

});
```

JavaScript:

```js
exporting.events.on("pdfdocready", function(event) {

  // Add title to the beginning
  event.doc.content.unshift({
    text: "Regional revenue comparison",
    margin: [0, 30],
    style: {
      fontSize: 25,
      bold: true,
    }
  });

});
```

### Adding image logo

Just like we added `text` block, we can add `image` block.

Image needs to be provided in a [data: uri](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) format.

There are a lot of tools out there that can convert your image file or URL into a data: uri. For example: [this one](https://dopiaza.org/tools/datauri/index.php).

TypeScript:

```ts
exporting.events.on("pdfdocready", function(event) {

  // ...

  // Add logo
  event.doc.content.unshift({
    image: "data:image/png;base64,...", // actual content removed
    fit: [119, 54]
  });

});
```

JavaScript:

```js
exporting.events.on("pdfdocready", function(event) {

  // ...

  // Add logo
  event.doc.content.unshift({
    image: "data:image/png;base64,...", // actual content removed
    fit: [119, 54]
  });

});
```

Notice `fit` block? It indicates dimensions to which the image should be resized to fit.

### Adding paragraph

To add columned text, we can use `columns` block.

TypeScript:

```ts
exporting.events.on("pdfdocready", function(event) {

  // ...

  // Add a two-column intro
  event.doc.content.push({
    alignment: 'justify',
    columns: [{
      text: 'Lorem ipsum ...'
    }, {
      text: 'Lorem ipsum ...'
    }],
    columnGap: 20,
    margin: [0, 30]
  });

});
```

JavaScript:

```js
exporting.events.on("pdfdocready", function(event) {

  // ...

  // Add a two-column intro
  event.doc.content.push({
    alignment: 'justify',
    columns: [{
      text: 'Lorem ipsum ...'
    }, {
      text: 'Lorem ipsum ...'
    }],
    columnGap: 20,
    margin: [0, 30]
  });

});
```

Notice two additional settings we have here: `columnGap` and `alignment`. Those are pretty self-explanatory.

Example: [Custom PDF export](https://docs.amcharts.com/embeds/v5/custom-pdf-export/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 400px;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250,
    value2: 200
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110,
    value2: 210
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185,
    value2: 85
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105,
    value2: 244
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 2
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Create axis ranges
function createRange(value, bullet) {
  var rangeDataItem = xAxis.makeDataItem({
    value: value
  });

  var range = xAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("grid").set("visible", false);

  rangeDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: am5.Picture.new(root, {
        width: 32,
        height: 32,
        centerX: am5.percent(0),
        centerY: am5.percent(100),
        src: bullet
      })
    })
  );
}

createRange(new Date(2021, 0, 3).getTime(), "https://docs.amcharts.com/assets/icon_flag_red.svg");
createRange(new Date(2021, 0, 10).getTime(), "https://docs.amcharts.com/assets/icon_flag_green.svg");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data
});

exporting.events.on("pdfdocready", function (event) {
  // Add title to the beginning
  event.doc.content.unshift({
    text: "Regional revenue comparison",
    margin: [0, 30],
    style: {
      fontSize: 25,
      bold: true
    }
  });

  event.doc.content.unshift({
    image:
      "data:image/png;base64,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",
    fit: [119, 54]
  });

  // Add a two-column intro
  event.doc.content.push({
    alignment: "justify",
    columns: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur."
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur."
      }
    ],

    columnGap: 20,
    margin: [0, 30]
  });
});
```

## Note about pdfmake

amCharts 5 Exporting plugin uses pdfmake library for PDF document generation. Starting with version 5.18.0, amCharts 5 now bundles and uses pdfmake 0.3 (was 0.2) which introduces some breaking changes to the API.

If you are just using amCharts 5 Exporting API, you don't need to do anything.

If you are accessing pdfmake object directly to use its API, please [read here](https://docs.amcharts.com/v5/tutorials/pdfmake-upgrade-notice-02-03/).
