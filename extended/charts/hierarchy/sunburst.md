---
title: "Sunburst"
source: "https://docs.amcharts.com/v5/charts/hierarchy/sunburst/"
scraped: "2026-11-16"
---

This tutorial will walk through available options of configuring a sunburst series.

## Slices

Configuration of a slice is done via its template, which is accessible via series template list: `series.slices.template`.

We can set any setting via template:

TypeScript:

```ts
series.slices.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0xffffff),
  strokeWidth: 2
});
```

JavaScript:

```js
series.slices.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0xffffff),
  strokeWidth: 2
});
```

> **Note:** Setting a value on a template will also update existing slices created using it.

## Radius

### Outer radius

Sunburst's outer radius can be set using its `radius` setting.

It can be either percent value (relative to available space) or fixed pixel value.

Pie chart's `radius` is set to `100%` by default.

We can change that by specifying different value for `radius`:

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Sunburst.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    radius: am5.percent(90)
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Sunburst.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    radius: am5.percent(90)
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_radius_100p.png "`radius: am5.percent(100)` (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_radius_80p.png "`radius: am5.percent(80)`")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_radius_100.png "`radius: 100`")

### Inner radius

Series's `innerRadius` settings controls the "hole" inside the sunburst's pie.

As with `radius` it can be either a percent value or fixed pixel value.

The difference is that `innerRadius` percent value is relative to the series radius, rather than available space.

We can also use negative values in `innerRadius`. Those will mean pixel distance from the outer radius. This allows creating fixed-width donut circles.

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Sunburst.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    radius: am5.percent(95),
    innerRadius: am5.percent(50)
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Sunburst.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    radius: am5.percent(95),
    innerRadius: am5.percent(50)
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_radius_100p.png "`innerRadius: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_innerradius_p30.png "`innerRadius: am5.percent(30)`")

Example: [Sunburst chart with inner radius](https://docs.amcharts.com/embeds/v5/sunburst-chart-with-inner-radius/)

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
  height: 500px;
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
  am5hierarchy.Sunburst.new(root, {
    downDepth: 1,
    initialDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    innerRadius: am5.percent(30)
  })
);

series.data.setAll([
  {
    name: "Root",
    children: [
      {
        name: "A0",
        children: [
          {
            name: "A0A1",
            children: [
              {
                name: "A0A0A2",
                value: 71
              },
              {
                name: "A0A0B2",
                children: [
                  {
                    name: "A0A0B1A3",
                    value: 69
                  },
                  {
                    name: "A0A0B1B3",
                    value: 85
                  }
                ]
              },

              {
                name: "A0A0C2",
                value: 48
              }
            ]
          },

          {
            name: "A0B1",
            value: 27
          },
          {
            name: "A0C1",
            children: [
              {
                name: "A0C2A2",
                value: 2
              },
              {
                name: "A0C2B2",
                children: [
                  {
                    name: "A0C2B1A3",
                    value: 54
                  },
                  {
                    name: "A0C2B1B3",
                    value: 16
                  }
                ]
              }
            ]
          },

          {
            name: "A0D1",
            value: 89
          }
        ]
      },

      {
        name: "B0",
        children: [
          {
            name: "B1A1",
            value: 9
          },
          {
            name: "B1B1",
            children: [
              {
                name: "B1B1A2",
                children: [
                  {
                    name: "B1B1A0A3",
                    value: 35
                  },
                  {
                    name: "B1B1A0B3",
                    value: 40
                  }
                ]
              },

              {
                name: "B1B1B2",
                value: 55
              }
            ]
          }
        ]
      },

      {
        name: "C0",
        children: [
          {
            name: "C2A1",
            children: [
              {
                name: "C2A0A2",
                value: 24
              },
              {
                name: "C2A0B2",
                value: 89
              },
              {
                name: "C2A0C2",
                children: [
                  {
                    name: "C2A0C2A3",
                    children: [
                      {
                        name: "C2A0C2A0A4",
                        children: [
                          {
                            name: "C2A0C2A0A00",
                            value: 90
                          },
                          {
                            name: "C2A0C2A0A01",
                            value: 70
                          },
                          {
                            name: "C2A0C2A0A02",
                            value: 66
                          },
                          {
                            name: "C2A0C2A0A03",
                            value: 58
                          }
                        ]
                      },

                      {
                        name: "C2A0C2A0B4",
                        children: [
                          {
                            name: "C2A0C2A0B10",
                            value: 80
                          },
                          {
                            name: "C2A0C2A0B11",
                            value: 40
                          }
                        ]
                      }
                    ]
                  },

                  {
                    name: "C2A0C2B3",
                    value: 44
                  }
                ]
              },

              {
                name: "C2A0D2",
                children: [
                  {
                    name: "C2A0D3A3",
                    value: 28
                  },
                  {
                    name: "C2A0D3B3",
                    value: 14
                  }
                ]
              }
            ]
          },

          {
            name: "C2B1",
            value: 40
          },
          {
            name: "C2C1",
            children: [
              {
                name: "C2C2A2",
                children: [
                  {
                    name: "C2C2A0A3",
                    value: 28
                  },
                  {
                    name: "C2C2A0B3",
                    children: [
                      {
                        name: "C2C2A0B1A4",
                        value: 19
                      },
                      {
                        name: "C2C2A0B1B4",
                        children: [
                          {
                            name: "C2C2A0B1B10",
                            value: 11
                          },
                          {
                            name: "C2C2A0B1B11",
                            value: 10
                          },
                          {
                            name: "C2C2A0B1B12",
                            value: 97
                          },
                          {
                            name: "C2C2A0B1B13",
                            value: 47
                          }
                        ]
                      },

                      {
                        name: "C2C2A0B1C4",
                        children: [
                          {
                            name: "C2C2A0B1C20",
                            value: 40
                          },
                          {
                            name: "C2C2A0B1C21",
                            value: 37
                          },
                          {
                            name: "C2C2A0B1C22",
                            value: 53
                          }
                        ]
                      }
                    ]
                  },

                  {
                    name: "C2C2A0C3",
                    value: 96
                  }
                ]
              },

              {
                name: "C2C2B2",
                value: 66
              }
            ]
          }
        ]
      }
    ]
  }
]);

series.set("selectedDataItem", series.dataItems[0]);

container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);
```

## Start/end angles

A sunburst series is not limited to a full circle. It can start and end at any angle.

For that we have to set series' settings: `startAngle` and `endAngle`.

These are numeric values denoting degrees.

A zero angle is one that goes from the center of the chart directly to right.

Defaults are `-90` (`startAngle`) and `270` (`endAngle`) forming full circle starting at vertical line up.

We can change that any way we want.

TypeScript:

```ts
let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    startAngle: -180,
    endAngle: 0
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    startAngle: -180,
    endAngle: 0
  })
);
```

The above will result in a horizontal semi-circle:

![](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_innerradius_p30.png "Full circle (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_custom_angles.png "`\{ startAngle: -180, endAngle: 0 }`")

Example: [Sunburst chart with custom start/end angles](https://docs.amcharts.com/embeds/v5/sunburst-chart-with-custom-startend-angles/)

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
  height: 500px;
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
  am5hierarchy.Sunburst.new(root, {
    downDepth: 1,
    initialDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    innerRadius: am5.percent(30),
    startAngle: -180,
    endAngle: 0
  })
);

series.data.setAll([
  {
    name: "Root",
    children: [
      {
        name: "A0",
        children: [
          {
            name: "A0A1",
            children: [
              {
                name: "A0A0A2",
                value: 71
              },
              {
                name: "A0A0B2",
                children: [
                  {
                    name: "A0A0B1A3",
                    value: 69
                  },
                  {
                    name: "A0A0B1B3",
                    value: 85
                  }
                ]
              },

              {
                name: "A0A0C2",
                value: 48
              }
            ]
          },

          {
            name: "A0B1",
            value: 27
          },
          {
            name: "A0C1",
            children: [
              {
                name: "A0C2A2",
                value: 2
              },
              {
                name: "A0C2B2",
                children: [
                  {
                    name: "A0C2B1A3",
                    value: 54
                  },
                  {
                    name: "A0C2B1B3",
                    value: 16
                  }
                ]
              }
            ]
          },

          {
            name: "A0D1",
            value: 89
          }
        ]
      },

      {
        name: "B0",
        children: [
          {
            name: "B1A1",
            value: 9
          },
          {
            name: "B1B1",
            children: [
              {
                name: "B1B1A2",
                children: [
                  {
                    name: "B1B1A0A3",
                    value: 35
                  },
                  {
                    name: "B1B1A0B3",
                    value: 40
                  }
                ]
              },

              {
                name: "B1B1B2",
                value: 55
              }
            ]
          }
        ]
      },

      {
        name: "C0",
        children: [
          {
            name: "C2A1",
            children: [
              {
                name: "C2A0A2",
                value: 24
              },
              {
                name: "C2A0B2",
                value: 89
              },
              {
                name: "C2A0C2",
                children: [
                  {
                    name: "C2A0C2A3",
                    children: [
                      {
                        name: "C2A0C2A0A4",
                        children: [
                          {
                            name: "C2A0C2A0A00",
                            value: 90
                          },
                          {
                            name: "C2A0C2A0A01",
                            value: 70
                          },
                          {
                            name: "C2A0C2A0A02",
                            value: 66
                          },
                          {
                            name: "C2A0C2A0A03",
                            value: 58
                          }
                        ]
                      },

                      {
                        name: "C2A0C2A0B4",
                        children: [
                          {
                            name: "C2A0C2A0B10",
                            value: 80
                          },
                          {
                            name: "C2A0C2A0B11",
                            value: 40
                          }
                        ]
                      }
                    ]
                  },

                  {
                    name: "C2A0C2B3",
                    value: 44
                  }
                ]
              },

              {
                name: "C2A0D2",
                children: [
                  {
                    name: "C2A0D3A3",
                    value: 28
                  },
                  {
                    name: "C2A0D3B3",
                    value: 14
                  }
                ]
              }
            ]
          },

          {
            name: "C2B1",
            value: 40
          },
          {
            name: "C2C1",
            children: [
              {
                name: "C2C2A2",
                children: [
                  {
                    name: "C2C2A0A3",
                    value: 28
                  },
                  {
                    name: "C2C2A0B3",
                    children: [
                      {
                        name: "C2C2A0B1A4",
                        value: 19
                      },
                      {
                        name: "C2C2A0B1B4",
                        children: [
                          {
                            name: "C2C2A0B1B10",
                            value: 11
                          },
                          {
                            name: "C2C2A0B1B11",
                            value: 10
                          },
                          {
                            name: "C2C2A0B1B12",
                            value: 97
                          },
                          {
                            name: "C2C2A0B1B13",
                            value: 47
                          }
                        ]
                      },

                      {
                        name: "C2C2A0B1C4",
                        children: [
                          {
                            name: "C2C2A0B1C20",
                            value: 40
                          },
                          {
                            name: "C2C2A0B1C21",
                            value: 37
                          },
                          {
                            name: "C2C2A0B1C22",
                            value: 53
                          }
                        ]
                      }
                    ]
                  },

                  {
                    name: "C2C2A0C3",
                    value: 96
                  }
                ]
              },

              {
                name: "C2C2B2",
                value: 66
              }
            ]
          }
        ]
      }
    ]
  }
]);

series.set("selectedDataItem", series.dataItems[0]);

container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);
```

## Labels

Sunburst series will display a label inside its slices by default.

### Configuring labels

Series label configuration is done via its template, accessible via series property `labels.template`.

TypeScript:

```ts
series.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x888888)
});
```

JavaScript:

```js
series.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x888888)
});
```

Refer to [`RadialLabel` class reference](https://docs.amcharts.com/v5/reference/radiallabel/#settings) for a full list of available settings.

### Label content

To change label content, we only need to set `text` property of the label template:

TypeScript:

```ts
series.labels.template.setAll({
  text: "[bold]{category}[/] ({sum})"
});
```

JavaScript:

```js
series.labels.template.setAll({
  text: "[bold]{category}[/] ({sum})"
});
```

Contents of the label can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

For available data placeholder fields refer to `ISunburstDataItem`.

### Disabling labels

To disable labels, we can simply set their `forceHidden` to `true`:

TypeScript:

```ts
series.labels.template.set("forceHidden", true);
```

JavaScript:

```js
series.labels.template.set("forceHidden", true);
```

## Tooltips

Nodes are pre-set to display a tooltip on hover containing name of the category and its value.

We can modify contents of the tooltips using `tooltipText` on rectangle's template:

TypeScript:

```ts
series.nodes.template.set("tooltipText", "{category}: [bold]{sum}[/]");
```

JavaScript:

```js
series.nodes.template.set("tooltipText", "{category}: [bold]{sum}[/]");
```

Contents of the tooltip can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

Refer to `ISunburstDataItem` for available keys for the data placeholders.

## Example

Example: [Sunburst chart](https://docs.amcharts.com/embeds/v5/sunburst-chart-2/)

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
  height: 500px;
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
  am5hierarchy.Sunburst.new(root, {
    downDepth: 1,
    initialDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

series.data.setAll([
  {
    name: "Root",
    children: [
      {
        name: "A0",
        children: [
          {
            name: "A0A1",
            children: [
              {
                name: "A0A0A2",
                value: 71
              },
              {
                name: "A0A0B2",
                children: [
                  {
                    name: "A0A0B1A3",
                    value: 69
                  },
                  {
                    name: "A0A0B1B3",
                    value: 85
                  }
                ]
              },

              {
                name: "A0A0C2",
                value: 48
              }
            ]
          },

          {
            name: "A0B1",
            value: 27
          },
          {
            name: "A0C1",
            children: [
              {
                name: "A0C2A2",
                value: 2
              },
              {
                name: "A0C2B2",
                children: [
                  {
                    name: "A0C2B1A3",
                    value: 54
                  },
                  {
                    name: "A0C2B1B3",
                    value: 16
                  }
                ]
              }
            ]
          },

          {
            name: "A0D1",
            value: 89
          }
        ]
      },

      {
        name: "B0",
        children: [
          {
            name: "B1A1",
            value: 9
          },
          {
            name: "B1B1",
            children: [
              {
                name: "B1B1A2",
                children: [
                  {
                    name: "B1B1A0A3",
                    value: 35
                  },
                  {
                    name: "B1B1A0B3",
                    value: 40
                  }
                ]
              },

              {
                name: "B1B1B2",
                value: 55
              }
            ]
          }
        ]
      },

      {
        name: "C0",
        children: [
          {
            name: "C2A1",
            children: [
              {
                name: "C2A0A2",
                value: 24
              },
              {
                name: "C2A0B2",
                value: 89
              },
              {
                name: "C2A0C2",
                children: [
                  {
                    name: "C2A0C2A3",
                    children: [
                      {
                        name: "C2A0C2A0A4",
                        children: [
                          {
                            name: "C2A0C2A0A00",
                            value: 90
                          },
                          {
                            name: "C2A0C2A0A01",
                            value: 70
                          },
                          {
                            name: "C2A0C2A0A02",
                            value: 66
                          },
                          {
                            name: "C2A0C2A0A03",
                            value: 58
                          }
                        ]
                      },

                      {
                        name: "C2A0C2A0B4",
                        children: [
                          {
                            name: "C2A0C2A0B10",
                            value: 80
                          },
                          {
                            name: "C2A0C2A0B11",
                            value: 40
                          }
                        ]
                      }
                    ]
                  },

                  {
                    name: "C2A0C2B3",
                    value: 44
                  }
                ]
              },

              {
                name: "C2A0D2",
                children: [
                  {
                    name: "C2A0D3A3",
                    value: 28
                  },
                  {
                    name: "C2A0D3B3",
                    value: 14
                  }
                ]
              }
            ]
          },

          {
            name: "C2B1",
            value: 40
          },
          {
            name: "C2C1",
            children: [
              {
                name: "C2C2A2",
                children: [
                  {
                    name: "C2C2A0A3",
                    value: 28
                  },
                  {
                    name: "C2C2A0B3",
                    children: [
                      {
                        name: "C2C2A0B1A4",
                        value: 19
                      },
                      {
                        name: "C2C2A0B1B4",
                        children: [
                          {
                            name: "C2C2A0B1B10",
                            value: 11
                          },
                          {
                            name: "C2C2A0B1B11",
                            value: 10
                          },
                          {
                            name: "C2C2A0B1B12",
                            value: 97
                          },
                          {
                            name: "C2C2A0B1B13",
                            value: 47
                          }
                        ]
                      },

                      {
                        name: "C2C2A0B1C4",
                        children: [
                          {
                            name: "C2C2A0B1C20",
                            value: 40
                          },
                          {
                            name: "C2C2A0B1C21",
                            value: 37
                          },
                          {
                            name: "C2C2A0B1C22",
                            value: 53
                          }
                        ]
                      }
                    ]
                  },

                  {
                    name: "C2C2A0C3",
                    value: 96
                  }
                ]
              },

              {
                name: "C2C2B2",
                value: 66
              }
            ]
          }
        ]
      }
    ]
  }
]);

series.set("selectedDataItem", series.dataItems[0]);

container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);
```

## Related tutorials

* [Toggling multi-level Sunburst nodes with legend](https://docs.amcharts.com/v5/tutorials/toggling-multi-level-sunburst-nodes-with-legend/)
