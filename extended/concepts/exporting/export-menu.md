---
title: "Export menu"
source: "https://docs.amcharts.com/v5/concepts/exporting/export-menu/"
scraped: "2026-11-16"
---

> This tutorial looks at configuration options for Exporting plugin menu.

This tutorial looks at configuration options for [Exporting](https://docs.amcharts.com/v5/concepts/exporting/) plugin menu.

## Enabling

To enable export menu, we need to instantiate an `ExportingMenu` object and assign it to `menu` setting of the exporting:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});
```

## Position

Export menu is placed in upper-right corner of the chart by default.

To change it, we can use menu's `align` and `valign` settings to set horizontal and vertical alignment respectively.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    align: "left",
    valign: "bottom"
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    align: "left",
    valign: "bottom"
  })
});
```

The above will place menu in the lower-left corner.

## External container

We can also place the whole menu in an external container.

For that we need to set menu's setting `container` to a reference to the DOM element, we want to use as a container.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    container: document.getElementById("exportdiv")
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    container: document.getElementById("exportdiv")
  })
});
```

Example: [Exporting menu in external container](https://docs.amcharts.com/embeds/v5/exporting-menu-in-external-container/). Its code: get_example(path: "examples/docs-demos/exporting-menu-in-external-container").

## Appearance

The exporting menu is built using HTML tags.

Each tag is has a class name attached to it, so it can be targeted via CSS.

The following table lists some of the most common CSS queries that can be used to target menu elements:

| CSS query                     | Refers to                                                              |
| ----------------------------- | ---------------------------------------------------------------------- |
| `a.am5exporting-icon`         | Menu toggle button.                                                    |
| `.am5exporting-list`          | A `<ul>` element with menu items.                                      |
| `.am5exporting-item`          | A `<li>` element of the menu item.                                     |
| `.am5exporting-item a`        | A `<a>` element of the menu item (child of the `<li>`)                 |
| `.am5exporting-menu-open`     | A `<div>` element with all menu items, when menu is open.              |
| `.am5exporting-align-left`    | A main `<div>` element when setting `align: "left"` is set.            |
| `.am5exporting-align-right`   | A main `<div>` element when setting `align: "right"` is set (default). |
| `.am5exporting-valign-top`    | A main `<div>` element when setting `valign: "top"` is set (default).  |
| `.am5exporting-valign-bottom` | A main `<div>` element when setting `valign: "bottom"` is set.         |

Menu will automatically load a default stylesheets to make the menu usable without any further configuration.

We can override all or some of the default CSS:

```css
a.am5exporting-icon,
.am5exporting-list {
  background: #C2FFE2;
}

a.am5exporting-icon:hover,
.am5exporting-menu-open a.am5exporting-icon,
.am5exporting-item a:hover {
  background: #85FFC4;
}
```

Example: [Exporting data with custom menu](https://docs.amcharts.com/embeds/v5/exporting-data-with-custom-menu/). Its code: get_example(path: "examples/docs-demos/exporting-data-with-custom-menu").

If we'd rather menu would not load any default CSS, allowing us to configure it from scratch, we can set menu's `useDefaultCSS` to `false`:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    useDefaultCSS: false
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    useDefaultCSS: false
  })
});
```

## Behavior

### Auto-closing

Normally, when user clicks on menu item, that invokes some export operation, the legend auto-closes.

If we'd rather it remained open until toggle button is clicked again, we can set menu's `autoClose` setting to `false`:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    autoClose: false
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    autoClose: false
  })
});
```

### Deactivating underlying chart

Menu will also disable all interactivity on the underlying chart when legend is hovered, so that interactive elements like cursor would not be active.

To disable this functionality, use `deactivateRoot` setting:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    deactivateRoot: false
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    deactivateRoot: false
  })
});
```

## Customizing menu items

### Adding custom items

We can add custom menu items to menu as well, by pushing item objects into `items` array.

Menu item object must follow `IExportingMenuItem` interface.

The object should at the very least have `type` key, with one of the possible values:

* `"format"` - export to specific format. If this type is used, `format` key must also be set (`"png"`, `"jpg"`, `"svg"`, `"pdf"`, `"xlsx"`, `"csv"`, `"json"`, `"html"`, `"pdfdata"`, `"print"`).
* `"separator"` - a separator line.
* `"custom"` - a custom function will be called when clicked. `callback` must also be set if this type is used.

Additionally, we will probably want to set `label` property, so that item is labelled:

TypeScript:

```ts
let menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Do something",
  callback: function() {
    alert("Did something!")
  }
});
```

JavaScript:

```js
var menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Do something",
  callback: function() {
    alert("Did something!")
  }
});
```

### Completely custom menu

We can build a completely custom menu by overriding `items` altogether, e.g.:

TypeScript:

```ts
exporting.get("menu").set("items", [{
  type: "format",
  format: "png",
  label: "Export image"
}, {
  type: "format",
  format: "csv",
  label: "Export CSV"
}, {
  type: "separator"
}, {
  type: "format",
  format: "print",
  label: "Print"
}]);
```

JavaScript:

```js
exporting.get("menu").set("items", [{
  type: "format",
  format: "png",
  label: "Export image"
}, {
  type: "format",
  format: "csv",
  label: "Export CSV"
}, {
  type: "separator"
}, {
  type: "format",
  format: "print",
  label: "Print"
}]);
```

Example: [Exporting data with custom menu](https://docs.amcharts.com/embeds/v5/exporting-data-with-custom-menu-2/). Its code: get_example(path: "examples/docs-demos/exporting-data-with-custom-menu-2").

## Accessibility

The menu can be used with a keyboard:

| Key              | Action                                     |
| ---------------- | ------------------------------------------ |
| TAB              | Focuses the menu button.                   |
| ENTER            | Opens the menu, or picks the focused item. |
| Up / Down arrows | Move between items.                        |
| ESC              | Closes the menu.                           |

When the menu closes, focus goes back to the menu button.

Screen readers announce the button as a menu button, along with whether the menu is open or closed, and the items as menu items.

By default, the button is read out as "Export; Press ENTER to open". To change it, use menu's `ariaLabel` setting:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    ariaLabel: "Download or print the chart"
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    ariaLabel: "Download or print the chart"
  })
});
```

## Menu API

Menu can be opened or closed programmatically using its methods `open()`, `close()`, and `toggle()`:

TypeScript:

```ts
exporting.get("menu").toggle();
```

JavaScript:

```js
exporting.get("menu").toggle();
```
