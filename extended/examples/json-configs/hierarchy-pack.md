---
title: "Circle Pack (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/hierarchy-pack/config.json"
---

# Circle Pack (JSON config)

A pack chart: nested data as circles inside circles, sized by value, where a click opens the next level.

Chart family: hierarchy · Tags: pack, hierarchy, nested data, drill-down

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/hierarchy-pack/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "Pack",
  "settings": {
    "initialDepth": 2,
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
          "name": "Food",
          "children": [
            {
              "name": "Fruit",
              "children": [
                {
                  "name": "Apples",
                  "value": 40
                },
                {
                  "name": "Bananas",
                  "value": 36
                },
                {
                  "name": "Berries",
                  "children": [
                    {
                      "name": "Strawberries",
                      "value": 18
                    },
                    {
                      "name": "Blueberries",
                      "value": 14
                    },
                    {
                      "name": "Raspberries",
                      "value": 12
                    }
                  ],
                  "__parse": true
                }
              ],
              "__parse": true
            },
            {
              "name": "Drinks",
              "children": [
                {
                  "name": "Coffee",
                  "value": 42
                },
                {
                  "name": "Tea",
                  "value": 36
                },
                {
                  "name": "Juice",
                  "value": 39
                }
              ],
              "__parse": true
            },
            {
              "name": "Dairy",
              "children": [
                {
                  "name": "Milk",
                  "value": 46
                },
                {
                  "name": "Yogurt",
                  "value": 38
                },
                {
                  "name": "Cheese",
                  "children": [
                    {
                      "name": "Cheddar",
                      "value": 16
                    },
                    {
                      "name": "Gouda",
                      "value": 14
                    },
                    {
                      "name": "Brie",
                      "value": 12
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
