---
title: "Dumbbell Plot (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/xy-dumbbell-plot/config.json"
---

# Dumbbell Plot (JSON config)

A range per category drawn as a thin column from the open value to the close value, with a bullet at each end.

Chart family: xy · Tags: dumbbell, column, bullet, category axis, range

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/xy-dumbbell-plot/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "XYChart",
  "settings": {
    "panX": true,
    "panY": true,
    "wheelX": "panX",
    "wheelY": "zoomX",
    "cursor": {
      "type": "XYCursor",
      "properties": {
        "lineY": {
          "settings": {
            "visible": false
          }
        }
      }
    },
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "series": [
      "#series-0"
    ],
    "xAxes": [
      "#axis-0"
    ],
    "yAxes": [
      "#axis-1"
    ]
  },
  "refs": [
    {
      "data-0": [
        {
          "category": "Raina",
          "open": 104,
          "close": 108
        },
        {
          "category": "Demarcus",
          "open": 100,
          "close": 110
        },
        {
          "category": "Carlo",
          "open": 105,
          "close": 109
        },
        {
          "category": "Jacinda",
          "open": 102,
          "close": 111
        },
        {
          "category": "Richie",
          "open": 107,
          "close": 113
        },
        {
          "category": "Antony",
          "open": 104,
          "close": 111
        },
        {
          "category": "Amada",
          "open": 100,
          "close": 112
        },
        {
          "category": "Idalia",
          "open": 104,
          "close": 109
        },
        {
          "category": "Janella",
          "open": 102,
          "close": 105
        },
        {
          "category": "Marla",
          "open": 101,
          "close": 109
        },
        {
          "category": "Curtis",
          "open": 101,
          "close": 112
        },
        {
          "category": "Shellie",
          "open": 100,
          "close": 104
        },
        {
          "category": "Meggan",
          "open": 102,
          "close": 112
        },
        {
          "category": "Nathanael",
          "open": 105,
          "close": 118
        },
        {
          "category": "Jannette",
          "open": 104,
          "close": 112
        },
        {
          "category": "Tyrell",
          "open": 107,
          "close": 118
        },
        {
          "category": "Sheena",
          "open": 104,
          "close": 112
        },
        {
          "category": "Maranda",
          "open": 102,
          "close": 107
        },
        {
          "category": "Briana",
          "open": 99,
          "close": 108
        },
        {
          "category": "Rosa",
          "open": 96,
          "close": 109
        },
        {
          "category": "Rosanne",
          "open": 96,
          "close": 106
        },
        {
          "category": "Herman",
          "open": 99,
          "close": 108
        },
        {
          "category": "Wayne",
          "open": 95,
          "close": 107
        },
        {
          "category": "Shamika",
          "open": 94,
          "close": 104
        },
        {
          "category": "Suk",
          "open": 93,
          "close": 105
        },
        {
          "category": "Clair",
          "open": 89,
          "close": 95
        },
        {
          "category": "Olivia",
          "open": 87,
          "close": 97
        },
        {
          "category": "Hans",
          "open": 87,
          "close": 96
        },
        {
          "category": "Glennie",
          "open": 85,
          "close": 93
        }
      ]
    },
    {
      "axis-0": {
        "type": "CategoryAxis",
        "settings": {
          "maxDeviation": 0.3,
          "categoryField": "category",
          "renderer": {
            "type": "AxisRendererX",
            "settings": {
              "minGridDistance": 30,
              "minorGridEnabled": true
            },
            "properties": {
              "labels": {
                "properties": {
                  "template": {
                    "settings": {
                      "rotation": -90,
                      "centerY": {
                        "type": "Percent",
                        "value": 50
                      },
                      "centerX": 0
                    }
                  }
                }
              }
            }
          },
          "tooltip": {
            "type": "Tooltip"
          }
        },
        "properties": {
          "data": "#data-0"
        }
      }
    },
    {
      "axis-1": {
        "type": "ValueAxis",
        "settings": {
          "maxDeviation": 0.3,
          "renderer": {
            "type": "AxisRendererY"
          }
        }
      }
    },
    {
      "series-0": {
        "type": "ColumnSeries",
        "settings": {
          "name": "Series",
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "close",
          "openValueYField": "open",
          "categoryXField": "category",
          "tooltip": {
            "type": "Tooltip",
            "settings": {
              "labelText": "{openValueY} - {valueY}"
            }
          },
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "columns": {
            "properties": {
              "template": {
                "settings": {
                  "width": 0.5
                }
              }
            }
          },
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "locationY": 0,
                "sprite": {
                  "type": "Circle",
                  "settings": {
                    "radius": 5,
                    "fill": "@series.get('fill')"
                  }
                }
              }
            },
            {
              "type": "Bullet",
              "settings": {
                "locationY": 1,
                "sprite": {
                  "type": "Circle",
                  "settings": {
                    "radius": 5,
                    "fill": {
                      "type": "Color",
                      "value": "#6794dc"
                    }
                  }
                }
              }
            }
          ]
        }
      }
    }
  ]
}
```
