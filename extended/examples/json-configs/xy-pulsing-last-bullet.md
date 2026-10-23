---
title: "Pulsing Last Bullet (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/xy-pulsing-last-bullet/config.json"
---

# Pulsing Last Bullet (JSON config)

A line whose last point has a pulsing bullet, switched on for one data item with templateField and animated with the animations setting.

Chart family: xy · Tags: line, bullet, animation, templatefield

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/xy-pulsing-last-bullet/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
          "date": 1717189200000,
          "value": 50
        },
        {
          "date": 1717275600000,
          "value": 53
        },
        {
          "date": 1717362000000,
          "value": 56
        },
        {
          "date": 1717448400000,
          "value": 52
        },
        {
          "date": 1717534800000,
          "value": 48
        },
        {
          "date": 1717621200000,
          "value": 47
        },
        {
          "date": 1717707600000,
          "value": 51
        },
        {
          "date": 1717794000000,
          "value": 55
        },
        {
          "date": 1717880400000,
          "value": 54
        },
        {
          "date": 1717966800000,
          "value": 58
        },
        {
          "date": 1718053200000,
          "value": 62
        },
        {
          "date": 1718139600000,
          "value": 60
        },
        {
          "date": 1718226000000,
          "value": 57
        },
        {
          "date": 1718312400000,
          "value": 61
        },
        {
          "date": 1718398800000,
          "value": 65,
          "bulletSettings": {
            "visible": true
          },
          "__parse": true
        }
      ]
    },
    {
      "template-0": {
        "type": "Template",
        "settings": {
          "visible": false
        }
      }
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
          "name": "Series",
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "value",
          "valueXField": "date",
          "tooltip": {
            "type": "Tooltip",
            "settings": {
              "labelText": "{valueY}"
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
          },
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Container",
                  "settings": {
                    "templateField": "bulletSettings"
                  },
                  "children": [
                    {
                      "type": "Circle",
                      "settings": {
                        "radius": 5,
                        "fill": {
                          "type": "Color",
                          "value": "#67b7dc"
                        }
                      }
                    },
                    {
                      "type": "Circle",
                      "settings": {
                        "radius": 5,
                        "fill": {
                          "type": "Color",
                          "value": "#67b7dc"
                        },
                        "animations": [
                          {
                            "key": "scale",
                            "from": 1,
                            "to": 4,
                            "duration": 1000,
                            "easing": "cubic",
                            "ease": "out",
                            "loops": 0
                          },
                          {
                            "key": "opacity",
                            "from": 1,
                            "to": 0,
                            "duration": 1000,
                            "easing": "cubic",
                            "ease": "out",
                            "loops": 0
                          }
                        ]
                      }
                    }
                  ],
                  "properties": {
                    "template": "#template-0"
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
