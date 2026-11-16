---
title: "Modal popups"
source: "https://docs.amcharts.com/v5/concepts/common-elements/modal-popups/"
scraped: "2026-11-16"
---

amCharts 5 has a built-in way to display modal popups over the area of a Root element.

## Creating

To create a modal popup, we just need to instantiate a `Modal` class instance using its `new()` syntax.

Its main setting is `content`, which holds HTML to display in the modal:

TypeScript:

```ts
let modal = am5.Modal.new(root, {
  content: "<h3>Hello, I'm modal!</h3><p>Nice to meet you.</p>"
});
```

JavaScript:

```js
var modal = am5.Modal.new(root, {
  content: "<h3>Hello, I'm modal!</h3><p>Nice to meet you.</p>"
});
```

## Opening

To open the modal, use its `open()` method:

TypeScript:

```ts
modal.open();
```

JavaScript:

```js
modal.open();
```

## Closing and cancelling

Simirally, to close it, use `close()`:

TypeScript:

```ts
modal.close();
```

JavaScript:

```js
modal.close();
```

A modal can also be "cancelled" by pressing an ESC key, or calling its `cancel()` method.

There's no functional difference between the two (modal will close in either case), except closing will generate `"closed"` event, whereas cancelling will trigger `"cancelled"`.

## Disposing

When modal object is no longer needed, make sure you `dispose()` it:

TypeScript:

```ts
modal.dispose();
```

JavaScript:

```js
modal.dispose();
```

## Events

Modal has three event types:

| Event         | Comment                                                            |
| ------------- | ------------------------------------------------------------------ |
| `"opened"`    | Invoked when a modal opens.                                        |
| `"closed"`    | Invoked when modal is closed via its `close()` method.             |
| `"cancelled"` | Invoked when modal is closed via its `cancel()` method or ESC key. |

TypeScript:

```ts
modal.events.on("opened", function(ev) {
  // A modal has been opened
  // ...
});
```

JavaScript:

```js
modal.events.on("opened", function(ev) {
  // A modal has been opened
  // ...
});
```

## Modal DOM elements

Modal consists of several elements representing its main wrapper div, curtain (shaded area covering root element), and content.

They are accessible via modal's private settings:

| Reference                     | Comment                |
| ----------------------------- | ---------------------- |
| `modal.getPrivate("wrapper")` | Wrapper `<div>`.       |
| `modal.getPrivate("curtain")` | Curtain `<div>`.       |
| `modal.getPrivate("content")` | Modal content `<div>`. |

We can use those in any way we want, e.g. styling them, applying classes, or appending other elements.

The following code will add two buttons: OK and Cancel, that in respectively invoke `close()` and `cancel()` methods.

TypeScript:

```ts
let modal = modal = am5.Modal.new(root, {
  content: "<h3>Hello, I'm modal!</h3><p>Nice to meet you.</p>"
});

let modalSetup = false;

function openModal() {
  if (!modalSetup) {
    let okButton = document.createElement("input");
    okButton.type = "button";
    okButton.value = "OK";
    okButton.addEventListener("click", function() {
      modal.close();
    });
    
    let cancelButton = document.createElement("input");
    cancelButton.type = "button";
    cancelButton.value = "Cancel";
    cancelButton.addEventListener("click", function() {
      modal.cancel();
    });
    
    modal.getPrivate("content").appendChild(okButton);
    modal.getPrivate("content").appendChild(cancelButton);
    
    modalSetup = true;
  }
  modal.open();
}

function closeModal() {
  if (modal) {
    modal.close();
  }
}
```

JavaScript:

```js
var modal = modal = am5.Modal.new(root, {
  content: "<h3>Hello, I'm modal!</h3><p>Nice to meet you.</p>"
});

var modalSetup = false;

function openModal() {
  if (!modalSetup) {
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.value = "OK";
    okButton.addEventListener("click", function() {
      modal.close();
    });
    
    var cancelButton = document.createElement("input");
    cancelButton.type = "button";
    cancelButton.value = "Cancel";
    cancelButton.addEventListener("click", function() {
      modal.cancel();
    });
    
    modal.getPrivate("content").appendChild(okButton);
    modal.getPrivate("content").appendChild(cancelButton);
    
    modalSetup = true;
  }
  modal.open();
}

function closeModal() {
  if (modal) {
    modal.close();
  }
}
```

## Accessibility

A modal is exposed to screen readers as a dialog. It is named by the first heading (`<h1>` - `<h6>`) in its content, e.g. "Hello, I'm modal!" in the examples above.

If the content has no heading, or we'd like a different name, we can set it with the `ariaLabel` setting:

TypeScript:

```ts
let modal = am5.Modal.new(root, {
  content: "<p>Are you sure you want to delete this item?</p>",
  ariaLabel: "Confirm deletion"
});
```

JavaScript:

```js
var modal = am5.Modal.new(root, {
  content: "<p>Are you sure you want to delete this item?</p>",
  ariaLabel: "Confirm deletion"
});
```

The modal also handles keyboard focus:

* When it opens, focus moves to the first focusable element in its content (a button, input, link, etc.), or to the modal itself if there is none.
* While it is open, TAB and SHIFT+TAB cycle through the elements inside it, and do not leave it.
* ESC cancels it.
* When it closes, focus goes back to the element that had it before the modal opened.

> **Note:** These features are available since version 5.21.0. They also apply to modals used by other parts of the library, such as [Stock chart](https://docs.amcharts.com/v5/charts/stock/) settings.

## Example

Example: [Modal popups in amCharts 5](https://docs.amcharts.com/embeds/v5/modal-popups-in-amcharts-5/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
<input type="button" value="Open modal" onclick="openModal()" />
<input type="button" value="Close modal" onclick="closeModal()" />
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
  height: 300px;
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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Add legend
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

var data = [
  {
    year: "2021",
    europe: 2.5,
    namerica: 2.5,
    asia: 2.1,
    lamerica: 1,
    meast: 0.8,
    africa: 0.4
  },
  {
    year: "2022",
    europe: 2.6,
    namerica: 2.7,
    asia: 2.2,
    lamerica: 0.5,
    meast: 0.4,
    africa: 0.3
  },
  {
    year: "2023",
    europe: 2.8,
    namerica: 2.9,
    asia: 2.4,
    lamerica: 0.3,
    meast: 0.9,
    africa: 0.5
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function makeSeries(name, fieldName) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: fieldName,
      categoryXField: "year"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}:{valueY}",
    width: am5.percent(90),
    tooltipY: 0
  });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  series.data.setAll(data);
  series.appear();
  legend.data.push(series);
}

makeSeries("Europe", "europe");
makeSeries("North America", "namerica");
makeSeries("Asia", "asia");
makeSeries("Latin America", "lamerica");
makeSeries("Middle East", "meast");
makeSeries("Africa", "africa");

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);

// Modal
var modal = (modal = am5.Modal.new(root, {
  content: "<h3>Hello, I'm modal!</h3><p>Nice to meet you.</p>"
}));

var modalSetup = false;

function openModal() {
  if (!modalSetup) {
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.value = "OK";
    okButton.addEventListener("click", function () {
      modal.close();
    });

    var cancelButton = document.createElement("input");
    cancelButton.type = "button";
    cancelButton.value = "Cancel";
    cancelButton.addEventListener("click", function () {
      modal.cancel();
    });

    modal.getPrivate("content").appendChild(okButton);
    modal.getPrivate("content").appendChild(cancelButton);

    modalSetup = true;
  }
  modal.open();
}

function closeModal() {
  if (modal) {
    modal.close();
  }
}
```
