---
title: "Radar Line Chart (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/radar-line/config.json"
---

# Radar Line Chart (JSON config)

A line series with bullets on a radar chart, with a category axis around the circle and a cursor.

Chart family: radar · Tags: radar, line, category axis, bullets, cursor

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/radar-line/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "RadarChart",
  "settings": {
    "panX": false,
    "panY": false,
    "wheelX": "panX",
    "wheelY": "zoomX",
    "cursor": {
      "type": "RadarCursor",
      "settings": {
        "behavior": "zoomX"
      },
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
          "month": "Jan",
          "rainfall": 100
        },
        {
          "month": "Feb",
          "rainfall": 85
        },
        {
          "month": "Mar",
          "rainfall": 53
        },
        {
          "month": "Apr",
          "rainfall": 68
        },
        {
          "month": "May",
          "rainfall": 54
        },
        {
          "month": "Jun",
          "rainfall": 16
        },
        {
          "month": "Jul",
          "rainfall": 4
        },
        {
          "month": "Aug",
          "rainfall": 6
        },
        {
          "month": "Sep",
          "rainfall": 33
        },
        {
          "month": "Oct",
          "rainfall": 101
        },
        {
          "month": "Nov",
          "rainfall": 128
        },
        {
          "month": "Dec",
          "rainfall": 127
        }
      ]
    },
    {
      "axis-0": {
        "type": "CategoryAxis",
        "settings": {
          "maxDeviation": 0,
          "categoryField": "month",
          "renderer": {
            "type": "AxisRendererCircular",
            "properties": {
              "labels": {
                "properties": {
                  "template": {
                    "settings": {
                      "radius": 10
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
          "renderer": {
            "type": "AxisRendererRadial"
          }
        }
      }
    },
    {
      "series-0": {
        "type": "RadarLineSeries",
        "settings": {
          "name": "Rainfall",
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "rainfall",
          "categoryXField": "month",
          "tooltip": {
            "type": "Tooltip",
            "settings": {
              "labelText": "{valueY} mm"
            }
          },
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Circle",
                  "settings": {
                    "radius": 5,
                    "fill": "@series.get('fill')"
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
