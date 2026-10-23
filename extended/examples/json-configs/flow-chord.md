---
title: "Chord Diagram (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/flow-chord/config.json"
---

# Chord Diagram (JSON config)

A chord diagram where ribbons between the nodes show how much flows each way.

Chart family: flow · Tags: chord, flow, links

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/flow-chord/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "Chord",
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
              }
            ],
            "reuse": false,
            "startIndex": 0,
            "stateAnimationDuration": 600
          }
        }
      }
    }
  },
  "refs": [
    {
      "data-0": [
        {
          "source": "Berlin",
          "target": "Amsterdam",
          "value": 14
        },
        {
          "source": "Berlin",
          "target": "London",
          "value": 33
        },
        {
          "source": "Berlin",
          "target": "Paris",
          "value": 13
        },
        {
          "source": "Berlin",
          "target": "Madrid",
          "value": 36
        },
        {
          "source": "Amsterdam",
          "target": "Berlin",
          "value": 42
        },
        {
          "source": "Amsterdam",
          "target": "London",
          "value": 20
        },
        {
          "source": "Amsterdam",
          "target": "Paris",
          "value": 19
        },
        {
          "source": "Amsterdam",
          "target": "Madrid",
          "value": 11
        },
        {
          "source": "London",
          "target": "Amsterdam",
          "value": 9
        },
        {
          "source": "London",
          "target": "Berlin",
          "value": 38
        },
        {
          "source": "London",
          "target": "Paris",
          "value": 41
        },
        {
          "source": "London",
          "target": "Madrid",
          "value": 16
        },
        {
          "source": "Paris",
          "target": "Amsterdam",
          "value": 12
        },
        {
          "source": "Paris",
          "target": "London",
          "value": 16
        },
        {
          "source": "Paris",
          "target": "Berlin",
          "value": 21
        },
        {
          "source": "Paris",
          "target": "Madrid",
          "value": 8
        },
        {
          "source": "Madrid",
          "target": "Amsterdam",
          "value": 22
        },
        {
          "source": "Madrid",
          "target": "London",
          "value": 25
        },
        {
          "source": "Madrid",
          "target": "Paris",
          "value": 19
        },
        {
          "source": "Madrid",
          "target": "Berlin",
          "value": 7
        }
      ]
    }
  ]
}
```
