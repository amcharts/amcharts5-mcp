---
title: "Partition Chart (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/hierarchy-partition/config.json"
---

# Partition Chart (JSON config)

A partition chart: every level of nested data as a column of rectangles sized by value.

Chart family: hierarchy · Tags: partition, hierarchy, nested data, orientation

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/hierarchy-partition/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "Partition",
  "settings": {
    "orientation": "horizontal",
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
          "name": "Budget",
          "children": [
            {
              "name": "Housing",
              "children": [
                {
                  "name": "Rent",
                  "value": 900
                },
                {
                  "name": "Utilities",
                  "children": [
                    {
                      "name": "Electricity",
                      "value": 150
                    },
                    {
                      "name": "Heating",
                      "value": 200
                    },
                    {
                      "name": "Internet",
                      "value": 120
                    }
                  ],
                  "__parse": true
                }
              ],
              "__parse": true
            },
            {
              "name": "Food",
              "children": [
                {
                  "name": "Groceries",
                  "value": 450
                },
                {
                  "name": "Eating Out",
                  "children": [
                    {
                      "name": "Restaurants",
                      "value": 220
                    },
                    {
                      "name": "Coffee",
                      "value": 130
                    }
                  ],
                  "__parse": true
                }
              ],
              "__parse": true
            },
            {
              "name": "Transport",
              "children": [
                {
                  "name": "Car",
                  "children": [
                    {
                      "name": "Fuel",
                      "value": 200
                    },
                    {
                      "name": "Insurance",
                      "value": 150
                    }
                  ],
                  "__parse": true
                },
                {
                  "name": "Public Transit",
                  "value": 130
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
