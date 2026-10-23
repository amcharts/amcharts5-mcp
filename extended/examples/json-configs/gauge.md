---
title: "Gauge with Clock Hand (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/gauge/config.json"
---

# Gauge with Clock Hand (JSON config)

A gauge made from a radar chart: a half-circle value axis and a clock hand that points at a value.

Chart family: radar · Tags: gauge, radar, clock hand, axis range

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/gauge/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
    "startAngle": 180,
    "endAngle": 360,
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "xAxes": [
      "#axis-0"
    ]
  },
  "refs": [
    {
      "axis-0": {
        "type": "ValueAxis",
        "settings": {
          "maxDeviation": 0,
          "min": 0,
          "max": 100,
          "strictMinMax": true,
          "renderer": {
            "type": "AxisRendererCircular",
            "settings": {
              "innerRadius": -10,
              "strokeOpacity": 0.1
            }
          }
        }
      }
    },
    {
      "axisRange-0": {
        "axis": "#axis-0",
        "settings": {
          "value": 65,
          "bullet": {
            "type": "AxisBullet",
            "settings": {
              "sprite": {
                "type": "ClockHand",
                "settings": {
                  "radius": {
                    "type": "Percent",
                    "value": 99
                  }
                }
              }
            }
          },
          "grid": {
            "type": "Grid",
            "settings": {
              "visible": false
            }
          }
        },
        "__parseLogic": "axisRange"
      }
    }
  ]
}
```
