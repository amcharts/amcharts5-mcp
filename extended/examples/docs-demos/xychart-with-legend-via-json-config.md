---
title: "XYChart with legend via JSON config"
source: "https://docs.amcharts.com/embeds/v5/xychart-with-legend-via-json-config/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/serializing"]
---

A demo from the docs page "Serializing / JSON config" (get_doc(path: "concepts/serializing")).

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
            {
              year: "2021",
              europe: 2.5,
              namerica: 2.5
            },
            {
              year: "2022",
              europe: 2.6,
              namerica: 2.7
            },
            {
              year: "2023",
              europe: 2.8,
              namerica: 2.9
            }
          ]
        },

        {
          xAxis: {
            type: "CategoryAxis",
            settings: {
              categoryField: "year",
              renderer: {
                type: "AxisRendererX"
              },

              tooltip: {
                type: "Tooltip"
              }
            },

            properties: {
              data: "#data"
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
          series: [
            {
              type: "ColumnSeries",
              settings: {
                name: "Europe",
                categoryXField: "year",
                valueYField: "europe",
                xAxis: "#xAxis",
                yAxis: "#yAxis"
              },

              properties: {
                data: "#data",
                bullets: [
                  {
                    type: "Bullet",
                    settings: {
                      locationY: 1,
                      sprite: {
                        type: "Label",
                        settings: {
                          centerX: {
                            type: "Percent",
                            value: 50
                          },

                          centerY: {
                            type: "Percent",
                            value: 100
                          },

                          text: "{valueY}",
                          populateText: true,
                          fill: "@series.get('fill')",
                          fontSize: 19,
                          fontWeight: "bold"
                        }
                      }
                    }
                  }
                ]
              }
            },

            {
              type: "ColumnSeries",
              settings: {
                name: "North America",
                categoryXField: "year",
                valueYField: "namerica",
                xAxis: "#xAxis",
                yAxis: "#yAxis"
              },

              properties: {
                data: "#data",
                bullets: [
                  {
                    type: "Bullet",
                    settings: {
                      locationY: 1,
                      sprite: {
                        type: "Label",
                        settings: {
                          centerX: {
                            type: "Percent",
                            value: 50
                          },

                          centerY: {
                            type: "Percent",
                            value: 100
                          },

                          text: "{valueY}",
                          populateText: true,
                          fill: "@series.get('fill')",
                          fontSize: 19,
                          fontWeight: "bold"
                        }
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      ],

      type: "XYChart",
      settings: {
        layout: "vertical"
      },

      properties: {
        xAxes: ["#xAxis"],

        yAxes: ["#yAxis"],

        series: "#series"
      },

      children: [
        {
          type: "Legend",
          settings: {
            centerX: {
              type: "Percent",
              value: 50
            },

            x: {
              type: "Percent",
              value: 50
            },

            layout: "horizontal"
          },

          properties: {
            data: "#series"
          }
        }
      ]
    },

    {
      parent: root.container
    }
  )
  .then(function (chart) {
    // This kicks in when config is parsed
    chart.series.getIndex(0).appear(1000);
    chart.series.getIndex(1).appear(1000);
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
