---
title: "Sankey Diagram (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.24.0: examples/flow-sankey/config.json"
---

# Sankey Diagram (JSON config)

A Sankey diagram: nodes in columns and links whose width shows how much flows between them.

Chart family: flow · Tags: sankey, flow, links

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/flow-sankey/config.json, version 5.24.0). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
  "type": "Sankey",
  "settings": {
    "sourceIdField": "source",
    "targetIdField": "target",
    "valueField": "value",
    "paddingRight": 50,
    "focusable": true,
    "ariaLabel": "Sankey diagram of 11 flows between nine nodes, lettered A to J, from left to right. Tab to the nodes or the flows, then move through them with the up and down arrow keys; Enter on a node hides or shows its flows",
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
                "ariaLabel": "{name}: {sumIncoming} in, {sumOutgoing} out"
              }
            }
          }
        }
      },
      "settings": {
        "colors": {
          "type": "ColorSet",
          "settings": {
            "step": 2
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
