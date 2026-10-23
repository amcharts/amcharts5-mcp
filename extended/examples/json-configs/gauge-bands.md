---
title: "Gauge with Bands (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/gauge-bands/config.json"
---

# Gauge with Bands (JSON config)

A gauge with labelled color bands, where the hand and the value label take the color of the band the hand is in.

Chart family: radar · Tags: gauge, bands, axis ranges, clock hand, animation

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/gauge-bands/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
    "startAngle": 160,
    "endAngle": 380,
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "xAxes": [
      "#axis-0"
    ],
    "radarContainer": {
      "children": [
        {
          "type": "Label",
          "settings": {
            "fill": {
              "type": "Color",
              "value": "#ffffff"
            },
            "centerX": {
              "type": "Percent",
              "value": 50
            },
            "centerY": {
              "type": "Percent",
              "value": 50
            },
            "textAlign": "center",
            "fontSize": "3em",
            "text": "82"
          }
        }
      ]
    }
  },
  "refs": [
    {
      "axis-0": {
        "type": "ValueAxis",
        "settings": {
          "maxDeviation": 0,
          "min": -40,
          "max": 100,
          "strictMinMax": true,
          "renderer": {
            "type": "AxisRendererCircular",
            "settings": {
              "innerRadius": -40
            },
            "properties": {
              "grid": {
                "properties": {
                  "template": {
                    "settings": {
                      "stroke": {
                        "type": "Color",
                        "value": "#ffffff"
                      },
                      "visible": true,
                      "strokeOpacity": 0.8,
                      "strokeWidth": 2,
                      "crisp": false
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      "axisRange-0": {
        "axis": "#axis-0",
        "settings": {
          "above": true,
          "value": -40,
          "endValue": -20,
          "label": {
            "type": "AxisLabelRadial",
            "settings": {
              "radius": 15,
              "inside": true,
              "fontSize": "0.9em",
              "fill": {
                "type": "Color",
                "value": "#ffffff"
              },
              "text": "Unsustainable"
            }
          },
          "axisFill": {
            "type": "Slice",
            "settings": {
              "visible": true,
              "fill": {
                "type": "Color",
                "value": "#ee1f25"
              },
              "fillOpacity": 0.8
            }
          }
        },
        "__parseLogic": "axisRange"
      }
    },
    {
      "axisRange-1": {
        "axis": "#axis-0",
        "settings": {
          "above": true,
          "value": -20,
          "endValue": 0,
          "label": {
            "type": "AxisLabelRadial",
            "settings": {
              "radius": 15,
              "inside": true,
              "fontSize": "0.9em",
              "fill": {
                "type": "Color",
                "value": "#ffffff"
              },
              "text": "Volatile"
            }
          },
          "axisFill": {
            "type": "Slice",
            "settings": {
              "visible": true,
              "fill": {
                "type": "Color",
                "value": "#f04922"
              },
              "fillOpacity": 0.8
            }
          }
        },
        "__parseLogic": "axisRange"
      }
    },
    {
      "axisRange-2": {
        "axis": "#axis-0",
        "settings": {
          "above": true,
          "value": 0,
          "endValue": 20,
          "label": {
            "type": "AxisLabelRadial",
            "settings": {
              "radius": 15,
              "inside": true,
              "fontSize": "0.9em",
              "fill": {
                "type": "Color",
                "value": "#ffffff"
              },
              "text": "Foundational"
            }
          },
          "axisFill": {
            "type": "Slice",
            "settings": {
              "visible": true,
              "fill": {
                "type": "Color",
                "value": "#fdae19"
              },
              "fillOpacity": 0.8
            }
          }
        },
        "__parseLogic": "axisRange"
      }
    },
    {
      "axisRange-3": {
        "axis": "#axis-0",
        "settings": {
          "above": true,
          "value": 20,
          "endValue": 40,
          "label": {
            "type": "AxisLabelRadial",
            "settings": {
              "radius": 15,
              "inside": true,
              "fontSize": "0.9em",
              "fill": {
                "type": "Color",
                "value": "#ffffff"
              },
              "text": "Developing"
            }
          },
          "axisFill": {
            "type": "Slice",
            "settings": {
              "visible": true,
              "fill": {
                "type": "Color",
                "value": "#f3eb0c"
              },
              "fillOpacity": 0.8
            }
          }
        },
        "__parseLogic": "axisRange"
      }
    },
    {
      "axisRange-4": {
        "axis": "#axis-0",
        "settings": {
          "above": true,
          "value": 40,
          "endValue": 60,
          "label": {
            "type": "AxisLabelRadial",
            "settings": {
              "radius": 15,
              "inside": true,
              "fontSize": "0.9em",
              "fill": {
                "type": "Color",
                "value": "#ffffff"
              },
              "text": "Maturing"
            }
          },
          "axisFill": {
            "type": "Slice",
            "settings": {
              "visible": true,
              "fill": {
                "type": "Color",
                "value": "#b0d136"
              },
              "fillOpacity": 0.8
            }
          }
        },
        "__parseLogic": "axisRange"
      }
    },
    {
      "axisRange-5": {
        "axis": "#axis-0",
        "settings": {
          "above": true,
          "value": 60,
          "endValue": 80,
          "label": {
            "type": "AxisLabelRadial",
            "settings": {
              "radius": 15,
              "inside": true,
              "fontSize": "0.9em",
              "fill": {
                "type": "Color",
                "value": "#ffffff"
              },
              "text": "Sustainable"
            }
          },
          "axisFill": {
            "type": "Slice",
            "settings": {
              "visible": true,
              "fill": {
                "type": "Color",
                "value": "#54b947"
              },
              "fillOpacity": 0.8
            }
          }
        },
        "__parseLogic": "axisRange"
      }
    },
    {
      "axisRange-6": {
        "axis": "#axis-0",
        "settings": {
          "above": true,
          "value": 80,
          "endValue": 100,
          "label": {
            "type": "AxisLabelRadial",
            "settings": {
              "radius": 15,
              "inside": true,
              "fontSize": "0.9em",
              "fill": {
                "type": "Color",
                "value": "#ffffff"
              },
              "text": "High Performing"
            }
          },
          "axisFill": {
            "type": "Slice",
            "settings": {
              "visible": true,
              "fill": {
                "type": "Color",
                "value": "#0f9747"
              },
              "fillOpacity": 0.8
            }
          }
        },
        "__parseLogic": "axisRange"
      }
    },
    {
      "axisRange-7": {
        "axis": "#axis-0",
        "settings": {
          "value": 82.43356914899199,
          "bullet": {
            "type": "AxisBullet",
            "settings": {
              "sprite": {
                "type": "ClockHand",
                "settings": {
                  "pinRadius": {
                    "type": "Percent",
                    "value": 20
                  },
                  "radius": {
                    "type": "Percent",
                    "value": 100
                  },
                  "bottomWidth": 40
                }
              }
            }
          }
        },
        "__parseLogic": "axisRange"
      }
    }
  ]
}
```
