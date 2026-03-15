---
title: "Adapters"
source: "https://www.amcharts.com/docs/v5/concepts/settings/adapters/"
scraped: "2026-03-15"
---

Adapters are custom functions that can be used to dynamically alter value of an element's setting.

## Adding

And adapter can be added directly to an object or to template using its `adapters.add()` method.

This method requires two parameters:

-   Key of the setting the adapter will be used to modify value for.
-   Function that will be run every time setting value is requested, which can modify the value.

The following code can be used to modify fill color of the column series columns based on their value:

series.columns.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("valueY") < 1000) {
    return am5.color(0xff621f);
  }
  else {
    return fill;
  }
});

series.columns.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("valueY") < 1000) {
    return am5.color(0xff621f);
  }
  else {
    return fill;
  }
});

The above means that before column is drawn, its default fill color will be ran through our custom function. It will check related data item value and if it's less than 1000, it will use reddish color instead of default series color.


## Removing

There are two ways to remove an adapter: dispose it or use `remove()` method.

### Disposing

The `add()` method used to add an adapter will return a `Disposer` object.

It means that you can use its `dispose()` method to destroy it:

let myAdapter = series.columns.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("valueY") < 1000) {
    return am5.color(0xff621f);
  }
  else {
    return fill;
  }
});

// ...

myAdapter.dispose(); // destroy the adapter

var myAdapter = series.columns.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("valueY") < 1000) {
    return am5.color(0xff621f);
  }
  else {
    return fill;
  }
});

// ...

myAdapter.dispose(); // destroy the adapter

### Using remove() method

Another way to remove an adapter is using `remove()` method:

series.columns.template.adapters.remove("fill");

series.columns.template.adapters.remove("fill");

This method is easier, because you don't need to maintain reference to actual adapter.

However, it will disable all adapters for the same key. If the target object has multiple adapters added for the same key, they will all be removed.

## Disabling

If we don't need to remove the adapter, but just want to temporarily disable it, we can use `disable()` method:

series.columns.template.adapters.disable("fill");

series.columns.template.adapters.disable("fill");

If adapter for certain key is disabled, it will not kick in when settings value is requested.

To re-enable the adapter, use `enable()` method:

series.columns.template.adapters.enable("fill");

series.columns.template.adapters.enable("fill");

## Mutating target element

Adapters can also be used permanently update target element's settings. Those can be other settings, not necessarily ones that the adapter is for.

The following adapter will modify `fill` setting of a tooltip, but will also modify related `tooltipY` setting so that tooltips appear at the bottom of the negative-value columns:

series.columns.template.adapters.add("fill", function(fill, target) {
  let dataItem = target.dataItem;
  if (dataItem.get("valueY") < 0) {
    target.set("tooltipY", am5.p100);
    return am5.color(0xff0000);
  }
  return fill;
});

series.columns.template.adapters.add("fill", function(fill, target) {
  var dataItem = target.dataItem;
  if (dataItem.get("valueY") < 0) {
    target.set("tooltipY", am5.p100);
    return am5.color(0xff0000);
  }
  return fill;
});


## Related tutorials

-   [Using adapters on category axis labels](https://www.amcharts.com/docs/v5/tutorials/using-adapters-on-category-axis-labels/)
-   [Labels on negative columns](https://www.amcharts.com/docs/v5/tutorials/labels-on-negative-columns/) (dynamic placement of bullets using an adapter)
