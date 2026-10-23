---
title: "Tree Chart (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/hierarchy-tree/config.json"
---

# Tree Chart (JSON config)

A tree chart: nested data as linked nodes laid out level by level.

Chart family: hierarchy · Tags: tree, hierarchy, nested data

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/hierarchy-tree/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "Tree",
  "settings": {
    "paddingTop": 40,
    "paddingBottom": 40,
    "valueField": "value",
    "categoryField": "name",
    "childDataField": "children",
    "selectedDataItem": "@self.dataItems.0",
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "data": "#data-0",
    "circles": {
      "properties": {
        "template": {
          "settings": {
            "radius": 30
          }
        }
      }
    }
  },
  "refs": [
    {
      "data-0": [
        {
          "name": "Acme",
          "children": [
            {
              "name": "Product",
              "children": [
                {
                  "name": "Web",
                  "value": 12
                },
                {
                  "name": "Mobile",
                  "value": 8
                },
                {
                  "name": "Platform",
                  "children": [
                    {
                      "name": "Cloud",
                      "value": 5
                    },
                    {
                      "name": "Data",
                      "value": 6
                    }
                  ],
                  "__parse": true
                }
              ],
              "__parse": true
            },
            {
              "name": "Sales",
              "children": [
                {
                  "name": "Europe",
                  "value": 7
                },
                {
                  "name": "Americas",
                  "value": 9
                },
                {
                  "name": "Asia",
                  "value": 4
                }
              ],
              "__parse": true
            },
            {
              "name": "Support",
              "children": [
                {
                  "name": "Helpdesk",
                  "value": 10
                },
                {
                  "name": "Training",
                  "children": [
                    {
                      "name": "Docs",
                      "value": 3
                    },
                    {
                      "name": "Courses",
                      "value": 4
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
