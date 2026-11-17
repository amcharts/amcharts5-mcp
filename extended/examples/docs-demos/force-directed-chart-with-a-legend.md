---
title: "Force-directed chart with a legend"
source: "https://docs.amcharts.com/embeds/v5/force-directed-chart-with-a-legend/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/hierarchy"]
---

A demo from the docs page "Hierarchy charts" (get_doc(path: "charts/hierarchy")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
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

var title = container.children.push(
  am5.Label.new(root, {
    text: "Network Schema",
    fontSize: 20,
    x: am5.percent(50),
    centerX: am5.percent(50)
  })
);

var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    initialDepth: 2,
    topDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    xField: "x",
    yField: "y"
  })
);

series.data.setAll([
  {
    name: "Root",
    value: 0,
    children: [
      {
        name: "A0",
        x: am5.percent(50),
        y: am5.percent(50),
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
        x: am5.percent(80),
        y: am5.percent(20),
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
        x: am5.percent(20),
        y: am5.percent(40),
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

var legend = container.children.push(
  am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: root.horizontalLayout
  })
);

legend.data.setAll(series.dataItems[0].get("children"));
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
