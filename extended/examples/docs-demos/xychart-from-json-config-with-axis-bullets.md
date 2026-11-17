---
title: "XYChart from JSON config (with axis bullets)"
source: "https://docs.amcharts.com/embeds/v5/xychart-from-json-config-with-axis-bullets/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/serializing"]
---

A demo from the docs page "Serializing / JSON config" (get_doc(path: "concepts/serializing")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Specify date fields, so that they are formatted accordingly in tooltips
// https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/#formatting-placeholders
root.dateFormatter.setAll({
  dateFields: ["valueX"]
});

// Parse chart config
// https://docs.amcharts.com/v5/concepts/serializing/
var parser = am5plugins_json.JsonParser.new(root);
parser
  .parse(
    {
      refs: [
        {
          data: [
            { date: 1652425200000, value: 92 },
            { date: 1652511600000, value: 95 },
            { date: 1652598000000, value: 100 },
            { date: 1652684400000, value: 100 },
            { date: 1652770800000, value: 96 },
            { date: 1652857200000, value: 97 },
            { date: 1652943600000, value: 94 },
            { date: 1653030000000, value: 89 },
            { date: 1653116400000, value: 89 },
            { date: 1653202800000, value: 87 },
            { date: 1653289200000, value: 84 },
            { date: 1653375600000, value: 81 },
            { date: 1653462000000, value: 85 },
            { date: 1653548400000, value: 89 },
            { date: 1653634800000, value: 86 },
            { date: 1653721200000, value: 90 },
            { date: 1653807600000, value: 93 },
            { date: 1653894000000, value: 94 },
            { date: 1653980400000, value: 94 },
            { date: 1654066800000, value: 96 }
          ],

          xAxis: {
            type: "DateAxis",
            settings: {
              maxDeviation: 0.5,
              baseInterval: {
                timeUnit: "day",
                count: 1
              },

              renderer: {
                type: "AxisRendererX",
                settings: {
                  pan: "zoom"
                }
              },

              tooltip: {
                type: "Tooltip"
              }
            },

            properties: {
              bullet: {
                type: "AxisBullet",
                settings: {
                  location: 0,
                  sprite: {
                    type: "Circle",
                    settings: {
                      radius: 5,
                      fill: {
                        type: "Color",
                        value: 0xff0000
                      }
                    }
                  }
                }
              }
            }
          },

          yAxis: {
            type: "ValueAxis",
            settings: {
              maxDeviation: 1,
              renderer: {
                type: "AxisRendererY",
                settings: {
                  pan: "zoom"
                }
              }
            }
          }
        },

        {
          series: {
            type: "LineSeries",
            settings: {
              name: "Series",
              xAxis: "#xAxis",
              yAxis: "#yAxis",
              valueYField: "value",
              valueXField: "date",
              tooltip: {
                type: "Tooltip",
                settings: {
                  labelText: "{valueX}: {valueY}"
                }
              }
            },

            properties: {
              data: "#data",
              strokes: {
                properties: {
                  template: {
                    settings: {
                      strokeWidth: 3
                    }
                  }
                }
              }
            }
          }
        }
      ],

      type: "XYChart",
      settings: {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        cursor: {
          type: "XYCursor",
          settings: {
            behavior: "zoomX"
          },

          properties: {
            lineY: {
              settings: {
                visible: false
              }
            }
          }
        },

        scrollbarX: {
          type: "Scrollbar",
          settings: {
            orientation: "horizontal"
          }
        }
      },

      properties: {
        xAxes: ["#xAxis"],

        yAxes: ["#yAxis"],

        series: ["#series"]
      }
    },

    {
      parent: root.container
    }
  )
  .then(function (chart) {
    // This kicks in when config is parsed
    chart.series.getIndex(0).appear(1000);
    chart.appear(1000, 100);
  });
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
