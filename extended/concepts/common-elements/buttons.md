---
title: "Buttons"
source: "https://www.amcharts.com/docs/v5/concepts/common-elements/buttons/"
scraped: "2026-03-15"
---

This tutorials takes a brief look at `Button` elements, and ways to configure them.

## Button element

Buttons are elements of class `[Button](https://www.amcharts.com/docs/v5/reference/button/)` or one of its derivate classes, such as `ResizeButton`.

They are highly configurable. We can change colors, borders, rounding, text, and icons in them.

## Standalone buttons

We can create buttons by instantiating `Button` object and pushing it into `children` of the target container.

let button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  label: am5.Label.new(root, {
    text: "Add data"
  })
}));

var button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  label: am5.Label.new(root, {
    text: "Add data"
  })
}));

And, since we probably want it to do something, we should attach a `click` event to it as well:

button.events.on("click", function(ev) {
  var last = series.data.getIndex(series.data.length - 1);
  var newDate = new Date(last.date);
  newDate.setDate(newDate.getDate() + 1);
  series.data.push({
    date: newDate.getTime(),
    value: last.value + Math.random() \* 5 - 2
  })
});

button.events.on("click", function(ev) {
  var last = series.data.getIndex(series.data.length - 1);
  var newDate = new Date(last.date);
  newDate.setDate(newDate.getDate() + 1);
  series.data.push({
    date: newDate.getTime(),
    value: last.value + Math.random() \* 5 - 2
  })
});

The above code will add a button to the corner of chart's plot container, which upon click will add a new data item to the series data.


## Built-in buttons

Some controls in charts come with pre-created buttons. We usually can access them via property and configure just like any other regular button.

Below is a list of such pre-created buttons.

Element class

Property

Button class

Comment

`XYChart`

`zoomOutButton`

`Button`

A zoom-out button that appears when chart is zoomed in.

`Scrollbar`

`startGrip`

`Button`

Start grip of a scrollbar.

`Scrollbar`

`endGrip`

`Button`

End grip of a scrollbar.

`ZoomControl`

`plusButton`

`Button`

Zoom-in button.

`ZoomControl`

`minusButton`

`Button`

Zoom-out button.

## Customizing buttons

### Layer

Since buttons are controls that need unobstructive access, we may want to put them in a higher layer than the rest of the chart.

Most of the buttons and related interactive controls are put in layer 40. It makes sense to use the same layer for custom buttons as well.

To set a layer, we use button's `layer` setting:

let button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  label: am5.Label.new(root, {
    text: "Add data"
  })
}));

var button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  label: am5.Label.new(root, {
    text: "Add data"
  })
}));

### Body/background

The button body can be configured via its `background` setting which holds an instance of `[RoundedRectangle](https://www.amcharts.com/docs/v5/reference/roundedrectangle/#Settings)`.

We can set various settings like colors, corner radius, transparency, etc.

button.get("background").setAll({
  cornerRadiusTL: 0,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusBL: 0,
  fill: am5.color(0x000000),
  fillOpacity: 0.7
});

button.get("background").setAll({
  cornerRadiusTL: 0,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusBL: 0,
  fill: am5.color(0x000000),
  fillOpacity: 0.7
});

In some cases we might want to disable body/background altogether.

Perhaps we will use an image as button icon and do not need additional elements. In such case we can use `forceHidden` on button's background to completely hide it.

button.get("background").setAll({
  forceHidden: true
});

button.get("background").setAll({
  forceHidden: true
});

### Label

Buttons start without any labels, so it's up to us to create a `Label` object and set it to button's `label` setting. That is if we need a textual label on our button.

To configure the label, we can use any setting that is available on `[Label](https://www.amcharts.com/docs/v5/reference/label/#Settings)`.

let button = chart.plotContainer.children.push(am5.Button.new(root, {
  layer: 40,
  label: am5.Label.new(root, {
    text: "Add data",
    fontSize: 15,
    fontWeight: "600",
    paddingTop: 2,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4
  })
}));

var button = chart.plotContainer.children.push(am5.Button.new(root, {
  layer: 40,
  label: am5.Label.new(root, {
    text: "Add data",
    fontSize: 15,
    fontWeight: "600",
    paddingTop: 2,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4
  })
}));

Note, that all padding on button comes from default label padding.


### Icon

Save for some of the built-in ones, buttons do not have an icon by default.

If we need some graphical element to be shown instead or next to the label, we will need to create it and pass it in via `icon` setting.

#### External image

An icon can be any `Graphics` element, including basic built in shapes as `Rectangle` or `Picture` which allows using any external or in-line image to be used in button.

let button = chart.plotContainer.children.push(am5.Button.new(root, {
  layer: 40,
  icon: am5.Picture.new(root, {
    interactive: true,
    src: "https://assets.codepen.io/t-160/icon\_add.png",
    cursorOverStyle: "pointer"
  })
}));

var button = chart.plotContainer.children.push(am5.Button.new(root, {
  layer: 40,
  icon: am5.Picture.new(root, {
    interactive: true,
    src: "https://assets.codepen.io/t-160/icon\_add.png",
    cursorOverStyle: "pointer"
  })
}));

NOTEThe interactive part of the button is its background. If we are disabling it, we will need to explicitly make the icon interactive by setting its `interactive` setting to `true`.

#### In-line image

We can also use Base64-encoded image data for in-line images.

If we use an SVG as an icon, we may want to specify image's `width` and `height` too.

let button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  icon: am5.Picture.new(root, {
    width: 32,
    height: 32,
    src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTQuMDAwMDAwLCAtMi4wMDAwMDApIj48ZyBpZD0iYWRkLWNpcmNsZS1vdXRsaW5lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTQuMDAwMDAwLCAyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMSw1IEw5LDUgTDksOSBMNSw5IEw1LDExIEw5LDExIEw5LDE1IEwxMSwxNSBMMTEsMTEgTDE1LDExIEwxNSw5IEwxMSw5IEwxMSw1IEwxMSw1IFogTTEwLDAgQzQuNSwwIDAsNC41IDAsMTAgQzAsMTUuNSA0LjUsMjAgMTAsMjAgQzE1LjUsMjAgMjAsMTUuNSAyMCwxMCBDMjAsNC41IDE1LjUsMCAxMCwwIEwxMCwwIFogTTEwLDE4IEM1LjYsMTggMiwxNC40IDIsMTAgQzIsNS42IDUuNiwyIDEwLDIgQzE0LjQsMiAxOCw1LjYgMTgsMTAgQzE4LDE0LjQgMTQuNCwxOCAxMCwxOCBMMTAsMTggWiIgaWQ9IlNoYXBlIi8+PC9nPjwvZz48L2c+PC9zdmc+",
    cursorOverStyle: "pointer"
  })
}));

var button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  icon: am5.Picture.new(root, {
    width: 32,
    height: 32,
    src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTQuMDAwMDAwLCAtMi4wMDAwMDApIj48ZyBpZD0iYWRkLWNpcmNsZS1vdXRsaW5lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTQuMDAwMDAwLCAyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMSw1IEw5LDUgTDksOSBMNSw5IEw1LDExIEw5LDExIEw5LDE1IEwxMSwxNSBMMTEsMTEgTDE1LDExIEwxNSw5IEwxMSw5IEwxMSw1IEwxMSw1IFogTTEwLDAgQzQuNSwwIDAsNC41IDAsMTAgQzAsMTUuNSA0LjUsMjAgMTAsMjAgQzE1LjUsMjAgMjAsMTUuNSAyMCwxMCBDMjAsNC41IDE1LjUsMCAxMCwwIEwxMCwwIFogTTEwLDE4IEM1LjYsMTggMiwxNC40IDIsMTAgQzIsNS42IDUuNiwyIDEwLDIgQzE0LjQsMiAxOCw1LjYgMTgsMTAgQzE4LDE0LjQgMTQuNCwxOCAxMCwxOCBMMTAsMTggWiIgaWQ9IlNoYXBlIi8+PC9nPjwvZz48L2c+PC9zdmc+",
    cursorOverStyle: "pointer"
  })
}));


#### SVG path

We can also use just an [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) as button icon. The advantages of using an SVG path in place of a full image are that we can set colors to it both directly and via states.

let button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  icon: am5.Graphics.new(root, {
    fill: am5.color(0xffffff),
    svgPath: "M11,5 L9,5 L9,9 L5,9 L5,11 L9,11 L9,15 L11,15 L11,11 L15,11 L15,9 L11,9 L11,5 L11,5 Z M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2 C14.4,2 18,5.6 18,10 C18,14.4 14.4,18 10,18 L10,18 Z"
  })
}));

var button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  icon: am5.Graphics.new(root, {
    fill: am5.color(0xffffff),
    svgPath: "M11,5 L9,5 L9,9 L5,9 L5,11 L9,11 L9,15 L11,15 L11,11 L15,11 L15,9 L11,9 L11,5 L11,5 Z M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2 C14.4,2 18,5.6 18,10 C18,14.4 14.4,18 10,18 L10,18 Z"
  })
}));


### States

Buttons come with three states that change background appearance on user interactions:

-   `hover` - applied when button is hovered by a pointer.
-   `down` - applied when button is being pressed down on by a pointer.
-   `active` - when button is set as "active".

We can modify default states to apply our own colors and other settings:

button.get("background").states.create("hover", {}).setAll({
  fill: am5.color(0xff0000),
  fillOpacity: 0.8
});

button.get("background").states.create("down", {}).setAll({
  fill: am5.color(0xff0000),
  fillOpacity: 1
});

button.get("background").states.create("hover", {}).setAll({
  fill: am5.color(0xff0000),
  fillOpacity: 0.8
});

button.get("background").states.create("down", {}).setAll({
  fill: am5.color(0xff0000),
  fillOpacity: 1
});


