---
title: "Dropdown control"
source: "https://docs.amcharts.com/v5/charts/stock/toolbar/dropdown-control/"
scraped: "2026-11-16"
---

> It's a generic control that can be added to a stock toolbar, populated with custom content to be displayed in a dropdown when toggled.

It's a generic control that can be added to a [stock toolbar](https://docs.amcharts.com/v5/charts/stock/toolbar/), populated with custom content to be displayed in a dropdown when toggled.

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

TypeScript:

```ts
// Add custom dropdown
let myDropdown = am5stock.DropdownControl.new(root, {
  stockChart: stockChart
});

// Add toolbar
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    myDropdown
  ]
});
```

JavaScript:

```js
// Add custom dropdown
let myDropdown = am5stock.DropdownControl.new(root, {
  stockChart: stockChart
});

// Add toolbar
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    myDropdown
  ]
});
```

## Adding content

The above code will add a control. Now let's see how we can add content to its dropdown popup.

We can supply plain HTML to add, or append DOM nodes.

### Plain HTML

We can use control's `html` setting to supply content:

TypeScript:

```ts
let myDropdown = am5stock.DropdownControl.new(root, {
  stockChart: stockChart,
  html: "<h3>Hello world!</h3>"
});
```

JavaScript:

```js
var myDropdown = am5stock.DropdownControl.new(root, {
  stockChart: stockChart,
  html: "<h3>Hello world!</h3>"
});
```

### DOM nodes

We can also push DOM nodes directly to control's `container`:

TypeScript:

```ts
let myDropdown = am5stock.DropdownControl.new(root, {
  stockChart: stockChart,
  name: "My Button"
});

let dropdownContent = document.createElement("div");
dropdownContent.innerHTML = "<h3>Hello World!</h3>";
myDropdown.getPrivate("container").appendChild(dropdownContent);
```

JavaScript:

```js
var myDropdown = am5stock.DropdownControl.new(root, {
  stockChart: stockChart,
  name: "My Button"
});

var dropdownContent = document.createElement("div");
dropdownContent.innerHTML = "<h3>Hello World!</h3>";
myDropdown.getPrivate("container").appendChild(dropdownContent);
```

## Example

Example: [Stock chart with custom dropdown control](https://docs.amcharts.com/embeds/v5/stock-chart-with-custom-dropdown-control/). Its code: get_example(path: "examples/docs-demos/stock-chart-with-custom-dropdown-control").
