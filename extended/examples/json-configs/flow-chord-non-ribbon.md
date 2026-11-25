---
title: "Chord Diagram with Moving Bullets (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.24.0: examples/flow-chord-non-ribbon/config.json"
---

# Chord Diagram with Moving Bullets (JSON config)

A chord diagram with thin line links, nodes drawn as circle bullets, and a circle travelling along every link.

Chart family: flow · Tags: chord, non-ribbon, bullets, animations

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/flow-chord-non-ribbon/config.json, version 5.24.0). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, ResponsiveMax, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js (theme, applied separately)

## JSON config

```json
{
  "type": "ChordNonRibbon",
  "settings": {
    "sourceIdField": "source",
    "targetIdField": "target",
    "valueField": "value",
    "focusable": true,
    "ariaLabel": "Chord diagram of ten routes between seven airports, drawn as thin lines. Tab to the airports or the routes, then move through them with the up and down arrow keys; Enter on an airport hides or shows its routes",
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "data": "#data-0",
    "links": {
      "properties": {
        "template": {
          "settings": {
            "focusable": true,
            "focusableGroup": "links",
            "tabindexOrder": 5,
            "hoverOnFocus": true,
            "ariaLabel": "{sourceId} to {targetId}: {value}"
          }
        }
      }
    },
    "nodes": {
      "properties": {
        "nodes": {
          "properties": {
            "template": {
              "settings": {
                "focusable": true,
                "focusableGroup": "nodes",
                "ariaLabel": "{name}: {sum} in all"
              }
            }
          }
        },
        "labels": {
          "properties": {
            "template": {
              "settings": {
                "textType": "regular",
                "fill": "@root.interfaceColors.get('alternativeText')",
                "radius": -5
              },
              "states": [
                {
                  "key": "disabled",
                  "settings": {
                    "fill": "@root.interfaceColors.get('alternativeText')"
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
                  "fill": "@colors.getIndex(0)"
                },
                "states": [
                  {
                    "key": "hidden",
                    "settings": {
                      "fill": "@root.interfaceColors.get('disabled')"
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
            "step": 2
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
              "fill": "@colors.getIndex(0)"
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
