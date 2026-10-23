---
title: "Comparing Two Periods (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/xy-comparing-periods/config.json"
---

# Comparing Two Periods (JSON config)

This period as a solid line and the previous one as a dashed line on the same dates, with one tooltip showing both values.

Chart family: xy · Tags: line, date axis, comparison, tooltip, dashed line

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/xy-comparing-periods/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
          "date": 1718398800000,
          "value": 50,
          "previousDate": 1717189200000,
          "previousValue": 48
        },
        {
          "date": 1718485200000,
          "value": 53,
          "previousDate": 1717275600000,
          "previousValue": 51
        },
        {
          "date": 1718571600000,
          "value": 56,
          "previousDate": 1717362000000,
          "previousValue": 58
        },
        {
          "date": 1718658000000,
          "value": 52,
          "previousDate": 1717448400000,
          "previousValue": 53
        },
        {
          "date": 1718744400000,
          "value": 48,
          "previousDate": 1717534800000,
          "previousValue": 44
        },
        {
          "date": 1718830800000,
          "value": 47,
          "previousDate": 1717621200000,
          "previousValue": 42
        },
        {
          "date": 1718917200000,
          "value": 59,
          "previousDate": 1717707600000,
          "previousValue": 55
        },
        {
          "date": 1719003600000,
          "value": 63,
          "previousDate": 1717794000000,
          "previousValue": 56
        },
        {
          "date": 1719090000000,
          "value": 61,
          "previousDate": 1717880400000,
          "previousValue": 60
        },
        {
          "date": 1719176400000,
          "value": 57,
          "previousDate": 1717966800000,
          "previousValue": 59
        },
        {
          "date": 1719262800000,
          "value": 60,
          "previousDate": 1718053200000,
          "previousValue": 54
        },
        {
          "date": 1719349200000,
          "value": 66,
          "previousDate": 1718139600000,
          "previousValue": 57
        },
        {
          "date": 1719435600000,
          "value": 69,
          "previousDate": 1718226000000,
          "previousValue": 62
        },
        {
          "date": 1719522000000,
          "value": 67,
          "previousDate": 1718312400000,
          "previousValue": 64
        }
      ]
    },
    {
      "axis-0": {
        "type": "DateAxis",
        "settings": {
          "maxDeviation": 0.3,
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
          "maxDeviation": 0.3,
          "renderer": {
            "type": "AxisRendererY"
          }
        }
      }
    },
    {
      "series-0": {
        "type": "LineSeries",
        "settings": {
          "name": "This period",
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "value",
          "valueXField": "date",
          "tooltip": {
            "type": "Tooltip",
            "settings": {
              "labelText": "{valueX}: {valueY}\n{previousDate}: {previousValue}"
            },
            "properties": {
              "background": {
                "settings": {
                  "fillOpacity": 0.5
                }
              }
            }
          },
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "strokes": {
            "properties": {
              "template": {
                "settings": {
                  "strokeWidth": 2
                }
              }
            }
          }
        }
      }
    },
    {
      "series-1": {
        "type": "LineSeries",
        "settings": {
          "name": "Previous period",
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "previousValue",
          "valueXField": "date",
          "stroke": {
            "type": "Color",
            "value": "#67b7dc"
          },
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "strokes": {
            "properties": {
              "template": {
                "settings": {
                  "strokeDasharray": [
                    2,
                    2
                  ],
                  "strokeWidth": 2
                }
              }
            }
          }
        }
      }
    }
  ],
  "root": {
    "properties": {
      "dateFormatter": {
        "settings": {
          "dateFormat": "MMM d",
          "dateFields": [
            "valueX",
            "previousDate"
          ]
        }
      }
    }
  }
}
```
