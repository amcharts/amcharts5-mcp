---
title: "Directed Chord Diagram (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/flow-chord-directed/config.json"
---

# Directed Chord Diagram (JSON config)

A chord diagram whose links end in arrowheads, so each one shows its direction.

Chart family: flow · Tags: chord, directed, flow, radial labels

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/flow-chord-directed/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "ChordDirected",
  "settings": {
    "sourceIdField": "source",
    "targetIdField": "target",
    "valueField": "value",
    "radius": {
      "type": "Percent",
      "value": 75
    },
    "startAngle": 80,
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
            "fillStyle": "source"
          }
        }
      }
    },
    "nodes": {
      "properties": {
        "labels": {
          "properties": {
            "template": {
              "settings": {
                "textType": "radial",
                "centerX": 0,
                "fontSize": "0.8em"
              }
            }
          }
        }
      }
    }
  },
  "refs": [
    {
      "data-0": [
        {
          "source": "Monica",
          "target": "Rachel",
          "value": 4
        },
        {
          "source": "Monica",
          "target": "Chandler",
          "value": 113
        },
        {
          "source": "Monica",
          "target": "Ross",
          "value": 16
        },
        {
          "source": "Monica",
          "target": "Joey",
          "value": 9
        },
        {
          "source": "Monica",
          "target": "Phoebe",
          "value": 3
        },
        {
          "source": "Monica",
          "target": "Richard",
          "value": 16
        },
        {
          "source": "Monica",
          "target": "Pete",
          "value": 10
        },
        {
          "source": "Rachel",
          "target": "Chandler",
          "value": 7
        },
        {
          "source": "Rachel",
          "target": "Ross",
          "value": 80
        },
        {
          "source": "Rachel",
          "target": "Joey",
          "value": 30
        },
        {
          "source": "Rachel",
          "target": "Phoebe",
          "value": 6
        },
        {
          "source": "Chandler",
          "target": "Joey",
          "value": 1
        },
        {
          "source": "Chandler",
          "target": "Phoebe",
          "value": 7
        },
        {
          "source": "Chandler",
          "target": "Janice",
          "value": 11
        },
        {
          "source": "Chandler",
          "target": "Kathy",
          "value": 7
        },
        {
          "source": "Ross",
          "target": "Joey",
          "value": 3
        },
        {
          "source": "Ross",
          "target": "Phoebe",
          "value": 18
        },
        {
          "source": "Ross",
          "target": "Carol",
          "value": 10
        },
        {
          "source": "Ross",
          "target": "Emily",
          "value": 12
        },
        {
          "source": "Ross",
          "target": "Elizabeth",
          "value": 8
        },
        {
          "source": "Ross",
          "target": "Mona",
          "value": 11
        },
        {
          "source": "Ross",
          "target": "Charlie",
          "value": 10
        },
        {
          "source": "Joey",
          "target": "Phoebe",
          "value": 6
        },
        {
          "source": "Joey",
          "target": "Janine",
          "value": 9
        },
        {
          "source": "Phoebe",
          "target": "David",
          "value": 14
        },
        {
          "source": "Phoebe",
          "target": "Gary",
          "value": 7
        },
        {
          "source": "Phoebe",
          "target": "Mike",
          "value": 18
        }
      ]
    }
  ]
}
```
