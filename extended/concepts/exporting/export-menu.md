---
title: "Export menu"
source: "https://www.amcharts.com/docs/v5/concepts/exporting/export-menu/"
scraped: "2026-03-15"
---

This tutorial looks at configuration options for [Exporting](https://www.amcharts.com/docs/v5/concepts/exporting/) plugin menu.

## Enabling

To enable export menu, we need to instantiate an `ExportingMenu` object and assign it to `menu` setting of the exporting:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {})
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {})
});

## Position

Export menu is placed in upper-right corner of the chart by default.

To change it, we can use menu's `align` and `valign` settings to set horizontal and vertical alignment respectively.

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {
    align: "left",
    valign: "bottom"
  })
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {
    align: "left",
    valign: "bottom"
  })
});

The above will place menu in the lower-left corner.

## External container

We can also place the whole menu in an external container.

For that we need to set menu's setting `container` to a reference to the DOM element, we want to use as a container.

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {
    container: document.getElementById("exportdiv")
  })
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {
    container: document.getElementById("exportdiv")
  })
});


## Appearance

The exporting menu is built using HTML tags.

Each tag is has a class name attached to it, so it can be targeted via CSS.

The following table lists some of the most common CSS queries that can be used to target menu elements:

CSS query

Refers to

`a.am5exporting-icon`

Menu toggle button.

`.am5exporting-list`

A `<ul>` element with menu items.

`.am5exporting-item`

A `<li>` element of the menu item.

`.am5exporting-item a`

A `<a>` element of the menu item (child of the `<li>`)

`.am5exporting-menu-open`

A `<div>` element with all menu items, when menu is open.

`.am5exporting-align-left`

A main `<div>` element when setting `align: "left"` is set.

`.am5exporting-align-right`

A main `<div>` element when setting `align: "right"` is set (default).

`.am5exporting-valign-top`

A main `<div>` element when setting `valign: "top"` is set (default).

`.am5exporting-valign-bottom`

A main `<div>` element when setting `valign: "bottom"` is set.

Menu will automatically load a default stylesheets to make the menu usable without any further configuration.

We can override all or some of the default CSS:

a.am5exporting-icon,
.am5exporting-list {
  background: #C2FFE2;
}

a.am5exporting-icon:hover,
.am5exporting-menu-open a.am5exporting-icon,
.am5exporting-item a:hover {
  background: #85FFC4;
}


If we'd rather menu would not load any default CSS, allowing us to configure it from scratch, we can set menu's `useDefaultCSS` to `false`:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {
    useDefaultCSS: false
  })
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {
    useDefaultCSS: false
  })
});

## Behavior

### Auto-closing

Normally, when user clicks on menu item, that invokes some export operation, the legend auto-closes.

If we'd rather it remained open until toggle button is clicked again, we can set menu's `[autoClose](https://www.amcharts.com/docs/v5/reference/exportingmenu/#autoClose_setting)` setting to `false`:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {
    autoClose: false
  })
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {
    autoClose: false
  })
});

### Deactivating underlying chart

Menu will also disable all interactivity on the underlying chart when legend is hovered, so that interactive elements like cursor would not be active.

To disable this functionality, use `[deactivateRoot](https://www.amcharts.com/docs/v5/reference/exportingmenu/#deactivateRoot_setting)` setting:

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {
    deactivateRoot: false
  })
});

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {
    deactivateRoot: false
  })
});

## Customizing menu items

### Adding custom items

We can add custom menu items to menu as well, by pushing item objects into `items` array.

Menu item object must follow `[IExportingMenuItem](https://www.amcharts.com/docs/v5/reference/iexportingmenuitem/)` interface.

The object should at the very least have `type` key, with one of the possible values:

-   `"format"` - export to specific format. If this type is used, `format` key must also be set (`"png"`, `"jpg"`, `"pdf"`, `"xlsx"`, `"csv"`, `"json"`, `"html"`, `"pdfdata"`, `"print"`).
-   `"separator"` - a separator line.
-   `"custom"` - a custom function will be called when clicked. `callback` must also be set if this type is used.

Additionally, we will probably want to set `label` property, so that item is labelled:

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

### Completely custom menu

We can build a completely custom menu by overriding `items` altogether, e.g.:

exporting.get("menu").set("items", \[{
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
}\]);

exporting.get("menu").set("items", \[{
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
}\]);


## Menu API

Menu can be opened or closed programmatically using its methods `[open()](https://www.amcharts.com/docs/v5/reference/exportingmenu/#open_method)`, `[close()](https://www.amcharts.com/docs/v5/reference/exportingmenu/#close_method)`, and `[toggle()](https://www.amcharts.com/docs/v5/reference/exportingmenu/#toggle_method)`:

exporting.get("menu").toggle();

exporting.get("menu").toggle();
