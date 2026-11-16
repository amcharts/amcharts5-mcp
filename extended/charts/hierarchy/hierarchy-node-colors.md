---
title: "Hierarchy node colors"
source: "https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-node-colors/"
scraped: "2026-11-16"
---

This tutorial looks at various ways we can control coloring of hierarchy nodes.

## Auto-assigned colors

A series will automatically assign a unique color to each root node as well as all the first-level nodes from its own [color set](https://docs.amcharts.com/v5/reference/xychart/#colors_setting).

Deeper level nodes will inherit their colors from parent nodes.

Should we want to, we can override the whole list of colors by either setting it directly on series color set, creating a [quick theme](https://docs.amcharts.com/v5/concepts/themes/#quick-custom-theme), or a [reusable full theme](https://docs.amcharts.com/v5/concepts/themes/creating-themes/), e.g.:

TypeScript:

```ts
series.get("colors").setAll({
  colors: [
    am5.color(0x095256),
    am5.color(0x087f8c),
    am5.color(0x5aaa95),
    am5.color(0x86a873),
    am5.color(0xbb9f06)
  ],
  step: 1
});
```

JavaScript:

```js
series.get("colors").setAll({
  colors: [
    am5.color(0x095256),
    am5.color(0x087f8c),
    am5.color(0x5aaa95),
    am5.color(0x86a873),
    am5.color(0xbb9f06)
  ],
  step: 1
});
```

> **Important:** By default, Hierarchy takes every second color from the color list. If we are defining a list of colors and want each of those used, we also need to set `step: 1` setting as per above code.

> **More info:** A "[Color sets](https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/#setting-own-list-of-colors)" section of our color tutorial has more details and code samples.

## Manual colors

### Note about data

Before we explore the dynamic node coloring options, and important note.

Series data needs to be set **after** all the other configuration options for the series.

Setting data before adapters or template fields, will cause the those to be ignored.

### Via adapters

It's possible to use custom functions ([adapters](https://docs.amcharts.com/v5/concepts/settings/adapters/)) to determine color for each node's elements, like circles or rectangles.

Adapters are functions that are run whenever color (or any other setting) is requested for an element. They have a chance of modifying the value.

We can use them to apply custom colors for series elements:

| Hierarchy type  | Visual elements                    |
| --------------- | ---------------------------------- |
| `ForceDirected` | `circles`, `outerCircles`, `links` |
| `Pack`          | `circles`                          |
| `Partition`     | `rectangles`                       |
| `Sunburst`      | `slices`                           |
| `Tree`          | `circles`, `outerCircles`, `links` |
| `Treemap`       | `rectangles`                       |

For example, the following will change fill color for node circles, and outline to outer circles on a force-directed series to red:

TypeScript:

```ts
series.circles.template.adapters.add("fill", function(fill, target) {
  return am5.color(0xff0000);
});

series.outerCircles.template.adapters.add("stroke", function(fill, target) {
  return am5.color(0xff0000);
});
```

JavaScript:

```js
series.circles.template.adapters.add("fill", function(fill, target) {
  return am5.color(0xff0000);
});

series.outerCircles.template.adapters.add("stroke", function(fill, target) {
  return am5.color(0xff0000);
});
```

Adapters can also contain custom code to selectively return values according to some logic.

E.g. the following will color treemap node rectangles red if value is lower than 100, and green if it's 100 or above:

TypeScript:

```ts
series.rectangles.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("value") > 100) {
    return am5.color(0xb30000);
  }
  else {
    return am5.color(0x50b300);
  }
});
```

JavaScript:

```js
series.rectangles.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("value") > 100) {
    return am5.color(0xb30000);
  }
  else {
    return am5.color(0x50b300);
  }
});
```

In the above code we are accessing data item of the node (passed in via `target` parameter) to determine its value.

Example: [Treemap using adapters for rectangle fills](https://docs.amcharts.com/embeds/v5/treemap-using-adapters-for-rectangle-fills/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 95vh;
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

// Create wrapper container
var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/hierarchy/#adding
var series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    upDepth: 1,
    initialDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

series.rectangles.template.adapters.add("fill", function (fill, target) {
  if (target.dataItem.get("value") > 100) {
    return am5.color(0xb30000);
  } else {
    return am5.color(0x50b300);
  }
});

// Set data
// https://docs.amcharts.com/v5/charts/hierarchy/#setting-data
series.data.setAll([
  {
    name: "Root",
    children: [
      {
        name: "A",
        value: 70
      },
      {
        name: "B",
        value: 120
      },
      {
        name: "C",
        value: 49
      },
      {
        name: "D",
        value: 71
      },
      {
        name: "E",
        value: 150
      },
      {
        name: "F",
        value: 101
      }
    ]
  }
]);

series.set("selectedDataItem", series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);
```

### Via data

We can also specify fill and other colors, as well as any other setting value, via data using [template fields](https://docs.amcharts.com/v5/concepts/settings/template-fields/).

In short, template field allows specifying field in data that holds setting values for the node.

Using it we can bind `fill` and `stroke` settings of an element to data:

TypeScript:

```ts
series.circles.template.setAll({
  templateField: "nodeSettings"
});

series.data.setAll([{
  name: "Root",
  value: 0,
  children: [{
    name: "A",
    value: 89,
    nodeSettings: {
      fill: am5.color(0x297373)
    }
  }, {
    name: "B",
    value: 55,
    nodeSettings: {
      fill: am5.color(0x946B49)
    }
  }, {
    name: "C",
    value: 66,
    nodeSettings: {
      fill: am5.color(0xFF621F)
    }
  }]
}]);
```

JavaScript:

```js
series.circles.template.setAll({
  templateField: "nodeSettings"
});

series.data.setAll([{
  name: "Root",
  value: 0,
  children: [{
    name: "A",
    value: 89,
    nodeSettings: {
      fill: am5.color(0x297373)
    }
  }, {
    name: "B",
    value: 55,
    nodeSettings: {
      fill: am5.color(0x946B49)
    }
  }, {
    name: "C",
    value: 66,
    nodeSettings: {
      fill: am5.color(0xFF621F)
    }
  }]
}]);
```

Example: [Force-directed chart with topDepth](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-topdepth-2/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 95vh;
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

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    initialDepth: 2,
    topDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
    // minRadius: 20,
    // maxRadius: am5.percent(15)
  })
);

series.circles.template.setAll({
  templateField: "nodeSettings"
});

series.data.setAll([
  {
    name: "Root",
    value: 0,
    children: [
      {
        name: "A",
        value: 89,
        nodeSettings: {
          fill: am5.color(0x297373)
        }
      },

      {
        name: "B",
        value: 55,
        nodeSettings: {
          fill: am5.color(0x946b49)
        }
      },

      {
        name: "C",
        value: 66,
        nodeSettings: {
          fill: am5.color(0xff621f)
        }
      }
    ]
  }
]);

series.set("selectedDataItem", series.dataItems[0]);
```

### Via heat rules

[Heat rules](https://docs.amcharts.com/v5/concepts/settings/heat-rules/) is an excellent way to automatically apply a range of setting values, e.g. fill color, based on the node's value within range of values in the whole series.

We can use values in series' `valueField` for heat rules, or we can use a set of completely different values via `customValueField`:

TypeScript:

```ts
let series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    upDepth: -1,
    initialDepth: 2,
    valueField: "value",
    customValueField: "heatValue",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 0,
    nodePaddingInner: 0,
    calculateAggregates: true
  })
);

series.events.on("datavalidated", function() {
  let min = Infinity;
  let max = 0;
  series.nodes.each(function(node) {
    var dataItem = node.dataItem;
    if (dataItem.get("customValue") > max) {
      max = dataItem.get("customValue");
    }
    if (dataItem.get("customValue") < min) {
      min = dataItem.get("customValue");
    }
  });

  series.set("heatRules", [{
    target: series.rectangles.template,
    dataField: "customValue",
    min: am5.color(0xF53D3D),
    max: am5.color(0x0056F5),
    minValue: min,
    maxValue: max,
    key: "fill"
  }]);
});
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    upDepth: -1,
    initialDepth: 2,
    valueField: "value",
    customValueField: "heatValue",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 0,
    nodePaddingInner: 0,
    calculateAggregates: true
  })
);

// Calculate min and max values in data
series.events.on("datavalidated", function() {
  var min = Infinity;
  var max = 0;
  series.nodes.each(function(node) {
    var dataItem = node.dataItem;
    if (dataItem.get("customValue") > max) {
      max = dataItem.get("customValue");
    }
    if (dataItem.get("customValue") < min) {
      min = dataItem.get("customValue");
    }
  });

  series.set("heatRules", [{
    target: series.rectangles.template,
    dataField: "customValue",
    min: am5.color(0xF53D3D),
    max: am5.color(0x0056F5),
    minValue: min,
    maxValue: max,
    key: "fill"
  }]);
});
```

> **Important:** Hierarchy series will not be able to calculate their minimum and maximum values from all levels of the data hierarchy, so we need to provide `minValue` and `maxValue` ourselves. The code above provides an automatic way to do that.

Example: [Treemap chart with heat rules](https://docs.amcharts.com/embeds/v5/treemap-chart-with-heat-rules/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 95vh;
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

// Data
var data = {
  name: "Root",
  children: [
    {
      name: "First",
      value: 100,
      heatValue: 200
    },
    {
      name: "Second",
      value: 220,
      heatValue: 100
    },
    {
      name: "Third",
      value: 80,
      heatValue: 150
    },
    {
      name: "Fourth",
      value: 120,
      heatValue: 120
    },
    {
      name: "Fifth",
      value: 190,
      heatValue: 50
    }
  ]
};

// Create wrapper container
var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/hierarchy/#adding
var series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    upDepth: -1,
    initialDepth: 2,
    valueField: "value",
    customValueField: "heatValue",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 0,
    nodePaddingInner: 0
  })
);

// Calculate min and max values in data
series.events.on("datavalidated", function () {
  var min = Infinity;
  var max = 0;
  series.nodes.each(function (node) {
    var dataItem = node.dataItem;
    if (dataItem.get("customValue") > max) {
      max = dataItem.get("customValue");
    }
    if (dataItem.get("customValue") < min) {
      min = dataItem.get("customValue");
    }
  });

  series.set("heatRules", [
    {
      target: series.rectangles.template,
      dataField: "customValue",
      min: am5.color(0xf53d3d),
      max: am5.color(0x0056f5),
      minValue: min,
      maxValue: max,
      key: "fill"
    }
  ]);
});

series.rectangles.template.setAll({
  strokeWidth: 2
});

// Set data
// https://docs.amcharts.com/v5/charts/hierarchy/#setting-data
series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);
```
