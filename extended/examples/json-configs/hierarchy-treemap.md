---
title: "Treemap with Breadcrumbs (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/hierarchy-treemap/config.json"
---

# Treemap with Breadcrumbs (JSON config)

A treemap that drills into a branch on click, with a breadcrumb bar to go back up.

Chart family: hierarchy · Tags: treemap, hierarchy, breadcrumbs, drill-down

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/hierarchy-treemap/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "Container",
  "settings": {
    "width": {
      "type": "Percent",
      "value": 100
    },
    "height": {
      "type": "Percent",
      "value": 100
    },
    "layout": {
      "type": "VerticalLayout"
    }
  },
  "children": [
    "#series-0",
    {
      "type": "BreadcrumbBar",
      "settings": {
        "series": "#series-0"
      },
      "index": 0
    }
  ],
  "refs": [
    {
      "data-0": [
        {
          "name": "Sales",
          "children": [
            {
              "name": "Electronics",
              "children": [
                {
                  "name": "Phones",
                  "value": 86
                },
                {
                  "name": "Laptops",
                  "value": 64
                },
                {
                  "name": "Audio",
                  "children": [
                    {
                      "name": "Headphones",
                      "value": 31
                    },
                    {
                      "name": "Speakers",
                      "value": 18
                    }
                  ],
                  "__parse": true
                }
              ],
              "__parse": true
            },
            {
              "name": "Home",
              "children": [
                {
                  "name": "Furniture",
                  "value": 52
                },
                {
                  "name": "Lighting",
                  "value": 15
                },
                {
                  "name": "Kitchen",
                  "children": [
                    {
                      "name": "Cookware",
                      "value": 22
                    },
                    {
                      "name": "Appliances",
                      "value": 37
                    }
                  ],
                  "__parse": true
                }
              ],
              "__parse": true
            },
            {
              "name": "Sports",
              "children": [
                {
                  "name": "Cycling",
                  "value": 41
                },
                {
                  "name": "Fitness",
                  "value": 28
                },
                {
                  "name": "Outdoor",
                  "value": 23
                }
              ],
              "__parse": true
            }
          ],
          "__parse": true
        }
      ]
    },
    {
      "series-0": {
        "type": "Treemap",
        "settings": {
          "downDepth": 1,
          "upDepth": 1,
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
        }
      }
    }
  ]
}
```
