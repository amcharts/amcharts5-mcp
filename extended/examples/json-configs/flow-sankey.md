---
title: "Sankey Diagram (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/flow-sankey/config.json"
---

# Sankey Diagram (JSON config)

A Sankey diagram: nodes in columns and links whose width shows how much flows between them.

Chart family: flow · Tags: sankey, flow, links

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/flow-sankey/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "Sankey",
  "settings": {
    "sourceIdField": "source",
    "targetIdField": "target",
    "valueField": "value",
    "paddingRight": 50,
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
              },
              {
                "type": "Color",
                "value": "#c3dc67"
              },
              {
                "type": "Color",
                "value": "#a0dc67"
              },
              {
                "type": "Color",
                "value": "#7ddc67"
              },
              {
                "type": "Color",
                "value": "#67dc75"
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
          "source": "A",
          "target": "D",
          "value": 10
        },
        {
          "source": "B",
          "target": "D",
          "value": 8
        },
        {
          "source": "B",
          "target": "E",
          "value": 4
        },
        {
          "source": "C",
          "target": "E",
          "value": 3
        },
        {
          "source": "D",
          "target": "G",
          "value": 5
        },
        {
          "source": "D",
          "target": "I",
          "value": 2
        },
        {
          "source": "D",
          "target": "H",
          "value": 3
        },
        {
          "source": "E",
          "target": "H",
          "value": 6
        },
        {
          "source": "G",
          "target": "J",
          "value": 5
        },
        {
          "source": "I",
          "target": "J",
          "value": 1
        },
        {
          "source": "H",
          "target": "J",
          "value": 9
        }
      ]
    }
  ]
}
```
