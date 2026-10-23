---
title: "Stacked Step Line Chart (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/xy-stacked-step/config.json"
---

# Stacked Step Line Chart (JSON config)

Two step line series with fills, one stacked on the other, on a date axis.

Chart family: xy · Tags: step line, stacked, area, date axis

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/xy-stacked-step/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
    "scrollbarX": {
      "type": "Scrollbar",
      "settings": {
        "orientation": "horizontal"
      }
    },
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "series": [
      "#series-0",
      "#series-1"
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
          "date": 1704067200000,
          "value1": 102,
          "value2": 21
        },
        {
          "date": 1704153600000,
          "value1": 104,
          "value2": 19
        },
        {
          "date": 1704240000000,
          "value1": 103,
          "value2": 18
        },
        {
          "date": 1704326400000,
          "value1": 99,
          "value2": 20
        },
        {
          "date": 1704412800000,
          "value1": 102,
          "value2": 21
        },
        {
          "date": 1704499200000,
          "value1": 100,
          "value2": 22
        },
        {
          "date": 1704585600000,
          "value1": 101,
          "value2": 22
        },
        {
          "date": 1704672000000,
          "value1": 103,
          "value2": 20
        },
        {
          "date": 1704758400000,
          "value1": 105,
          "value2": 21
        },
        {
          "date": 1704844800000,
          "value1": 108,
          "value2": 20
        },
        {
          "date": 1704931200000,
          "value1": 112,
          "value2": 21
        },
        {
          "date": 1705017600000,
          "value1": 115,
          "value2": 22
        },
        {
          "date": 1705104000000,
          "value1": 120,
          "value2": 23
        },
        {
          "date": 1705190400000,
          "value1": 121,
          "value2": 21
        },
        {
          "date": 1705276800000,
          "value1": 118,
          "value2": 20
        },
        {
          "date": 1705363200000,
          "value1": 120,
          "value2": 19
        },
        {
          "date": 1705449600000,
          "value1": 118,
          "value2": 20
        },
        {
          "date": 1705536000000,
          "value1": 119,
          "value2": 22
        },
        {
          "date": 1705622400000,
          "value1": 122,
          "value2": 23
        },
        {
          "date": 1705708800000,
          "value1": 126,
          "value2": 22
        },
        {
          "date": 1705795200000,
          "value1": 125,
          "value2": 21
        },
        {
          "date": 1705881600000,
          "value1": 121,
          "value2": 22
        },
        {
          "date": 1705968000000,
          "value1": 116,
          "value2": 22
        },
        {
          "date": 1706054400000,
          "value1": 111,
          "value2": 22
        },
        {
          "date": 1706140800000,
          "value1": 115,
          "value2": 24
        },
        {
          "date": 1706227200000,
          "value1": 117,
          "value2": 25
        },
        {
          "date": 1706313600000,
          "value1": 117,
          "value2": 25
        },
        {
          "date": 1706400000000,
          "value1": 113,
          "value2": 27
        },
        {
          "date": 1706486400000,
          "value1": 115,
          "value2": 29
        },
        {
          "date": 1706572800000,
          "value1": 118,
          "value2": 28
        }
      ]
    },
    {
      "axis-0": {
        "type": "DateAxis",
        "settings": {
          "baseInterval": {
            "timeUnit": "day",
            "count": 1
          },
          "renderer": {
            "type": "AxisRendererX",
            "settings": {
              "minorGridEnabled": true
            }
          },
          "tooltip": {
            "type": "Tooltip"
          }
        }
      }
    },
    {
      "axis-1": {
        "type": "ValueAxis",
        "settings": {
          "renderer": {
            "type": "AxisRendererY",
            "settings": {
              "minorGridEnabled": true,
              "minGridDistance": 70
            }
          }
        }
      }
    },
    {
      "series-0": {
        "type": "StepLineSeries",
        "settings": {
          "name": "Series 1",
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "value1",
          "valueXField": "date",
          "tooltip": {
            "type": "Tooltip",
            "settings": {
              "labelText": "{name}: {valueY}"
            }
          },
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "fills": {
            "properties": {
              "template": {
                "settings": {
                  "fillOpacity": 0.5,
                  "visible": true
                }
              }
            }
          }
        }
      }
    },
    {
      "series-1": {
        "type": "StepLineSeries",
        "settings": {
          "name": "Series 2",
          "stacked": true,
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "value2",
          "valueXField": "date",
          "tooltip": {
            "type": "Tooltip",
            "settings": {
              "labelText": "{name}: {valueY}"
            }
          },
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "fills": {
            "properties": {
              "template": {
                "settings": {
                  "fillOpacity": 0.5,
                  "visible": true
                }
              }
            }
          }
        }
      }
    }
  ]
}
```
