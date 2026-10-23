---
title: "Force-Directed Tree (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/hierarchy-force-directed/config.json"
---

# Force-Directed Tree (JSON config)

A force-directed tree: nested data as linked circles that arrange themselves and open on click.

Chart family: hierarchy · Tags: force directed, hierarchy, nested data

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/hierarchy-force-directed/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "ForceDirected",
  "settings": {
    "minRadius": 25,
    "maxRadius": 55,
    "nodePadding": 10,
    "valueField": "value",
    "categoryField": "name",
    "childDataField": "children",
    "selectedDataItem": "@self.dataItems.0",
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "data": "#data-0"
  },
  "refs": [
    {
      "data-0": [
        {
          "name": "Music",
          "children": [
            {
              "name": "Rock",
              "children": [
                {
                  "name": "Classic Rock",
                  "value": 64
                },
                {
                  "name": "Punk",
                  "value": 28
                },
                {
                  "name": "Metal",
                  "children": [
                    {
                      "name": "Heavy Metal",
                      "value": 35
                    },
                    {
                      "name": "Thrash",
                      "value": 17
                    }
                  ],
                  "__parse": true
                }
              ],
              "__parse": true
            },
            {
              "name": "Electronic",
              "children": [
                {
                  "name": "House",
                  "value": 42
                },
                {
                  "name": "Techno",
                  "value": 31
                },
                {
                  "name": "Ambient",
                  "value": 19
                }
              ],
              "__parse": true
            },
            {
              "name": "Jazz",
              "children": [
                {
                  "name": "Swing",
                  "value": 24
                },
                {
                  "name": "Bebop",
                  "value": 33
                },
                {
                  "name": "Fusion",
                  "children": [
                    {
                      "name": "Jazz Rock",
                      "value": 14
                    },
                    {
                      "name": "Latin Jazz",
                      "value": 21
                    }
                  ],
                  "__parse": true
                }
              ],
              "__parse": true
            }
          ],
          "__parse": true
        }
      ]
    }
  ]
}
```
