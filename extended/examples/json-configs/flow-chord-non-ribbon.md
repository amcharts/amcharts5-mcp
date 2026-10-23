---
title: "Chord Diagram with Moving Bullets (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/flow-chord-non-ribbon/config.json"
---

# Chord Diagram with Moving Bullets (JSON config)

A chord diagram with thin line links, nodes drawn as circle bullets, and a circle travelling along every link.

Chart family: flow · Tags: chord, non-ribbon, bullets, animations

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/flow-chord-non-ribbon/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "ChordNonRibbon",
  "settings": {
    "sourceIdField": "source",
    "targetIdField": "target",
    "valueField": "value",
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "data": "#data-0",
    "nodes": {
      "properties": {
        "labels": {
          "properties": {
            "template": {
              "settings": {
                "textType": "regular",
                "fill": {
                  "type": "Color",
                  "value": "#ffffff"
                },
                "radius": -5
              },
              "states": [
                {
                  "key": "disabled",
                  "settings": {
                    "fill": {
                      "type": "Color",
                      "value": "#ffffff"
                    }
                  }
                }
              ]
            }
          }
        },
        "bullets": [
          {
            "type": "Bullet",
            "settings": {
              "sprite": {
                "type": "Circle",
                "settings": {
                  "radius": 24,
                  "fill": {
                    "type": "Color",
                    "value": "#67b7dc"
                  }
                },
                "states": [
                  {
                    "key": "hidden",
                    "settings": {
                      "fill": {
                        "type": "Color",
                        "value": "#adadad"
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      "settings": {
        "colors": {
          "type": "ColorSet",
          "settings": {
            "step": 2,
            "passOptions": {
              "hue": 0.05,
              "saturation": 0,
              "lightness": 0
            },
            "colors": [
              {
                "type": "Color",
                "value": "#67b7dc"
              },
              {
                "type": "Color",
                "value": "#6794dc"
              },
              {
                "type": "Color",
                "value": "#6771dc"
              },
              {
                "type": "Color",
                "value": "#8067dc"
              },
              {
                "type": "Color",
                "value": "#a367dc"
              },
              {
                "type": "Color",
                "value": "#c767dc"
              },
              {
                "type": "Color",
                "value": "#dc67ce"
              },
              {
                "type": "Color",
                "value": "#dc67ab"
              },
              {
                "type": "Color",
                "value": "#dc6788"
              },
              {
                "type": "Color",
                "value": "#dc6967"
              },
              {
                "type": "Color",
                "value": "#dc8c67"
              },
              {
                "type": "Color",
                "value": "#dcaf67"
              },
              {
                "type": "Color",
                "value": "#dcd267"
              }
            ],
            "reuse": false,
            "startIndex": 0,
            "stateAnimationDuration": 600
          }
        }
      }
    },
    "bullets": [
      {
        "type": "Bullet",
        "settings": {
          "animations": [
            {
              "key": "locationY",
              "from": 0,
              "to": 1,
              "duration": 2000,
              "loops": 0,
              "yoyo": true,
              "easing": "cubic",
              "ease": "inOut"
            }
          ],
          "sprite": {
            "type": "Circle",
            "settings": {
              "radius": 5,
              "fill": {
                "type": "Color",
                "value": "#67b7dc"
              }
            }
          }
        }
      }
    ]
  },
  "refs": [
    {
      "data-0": [
        {
          "source": "LHR",
          "target": "JFK",
          "value": 24
        },
        {
          "source": "LHR",
          "target": "DXB",
          "value": 18
        },
        {
          "source": "LHR",
          "target": "CDG",
          "value": 14
        },
        {
          "source": "CDG",
          "target": "JFK",
          "value": 12
        },
        {
          "source": "CDG",
          "target": "FRA",
          "value": 10
        },
        {
          "source": "FRA",
          "target": "DXB",
          "value": 9
        },
        {
          "source": "FRA",
          "target": "SIN",
          "value": 6
        },
        {
          "source": "DXB",
          "target": "SIN",
          "value": 11
        },
        {
          "source": "JFK",
          "target": "LAX",
          "value": 30
        },
        {
          "source": "LAX",
          "target": "SIN",
          "value": 4
        }
      ]
    }
  ]
}
```
