---
title: "Sunburst Chart (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.24.0: examples/hierarchy-sunburst/config.json"
---

# Sunburst Chart (JSON config)

A sunburst: nested data as rings of slices, one ring per level.

Chart family: hierarchy · Tags: sunburst, hierarchy, nested data

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/hierarchy-sunburst/config.json, version 5.24.0). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, ResponsiveMax, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js (theme, applied separately)

## JSON config

```json
{
  "type": "Sunburst",
  "settings": {
    "radius": {
      "type": "Percent",
      "value": 95
    },
    "valueField": "value",
    "categoryField": "name",
    "childDataField": "children",
    "selectedDataItem": "@self.dataItems.0",
    "focusable": true,
    "ariaLabel": "Sunburst chart of website visits by where they came from: search, social and direct, then their kinds and sources, one ring per level. Tab to the slices, move between them with the up and down arrow keys, and press Enter to zoom into one; Enter on the middle goes back",
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "data": "#data-0",
    "nodes": {
      "properties": {
        "template": {
          "settings": {
            "focusable": true,
            "focusableGroup": "nodes",
            "hoverOnFocus": true,
            "ariaLabel": "{category}: {sum}"
          }
        }
      }
    }
  },
  "refs": [
    {
      "data-0": [
        {
          "name": "Visits",
          "children": [
            {
              "name": "Search",
              "children": [
                {
                  "name": "Organic",
                  "children": [
                    {
                      "name": "Google",
                      "value": 420
                    },
                    {
                      "name": "Bing",
                      "value": 90
                    }
                  ],
                  "__parse": true
                },
                {
                  "name": "Paid",
                  "children": [
                    {
                      "name": "Text Ads",
                      "value": 100
                    },
                    {
                      "name": "Banners",
                      "value": 70
                    }
                  ],
                  "__parse": true
                }
              ],
              "__parse": true
            },
            {
              "name": "Social",
              "children": [
                {
                  "name": "Video",
                  "children": [
                    {
                      "name": "YouTube",
                      "value": 110
                    },
                    {
                      "name": "TikTok",
                      "value": 70
                    }
                  ],
                  "__parse": true
                },
                {
                  "name": "Networks",
                  "children": [
                    {
                      "name": "Facebook",
                      "value": 150
                    },
                    {
                      "name": "Instagram",
                      "value": 120
                    }
                  ],
                  "__parse": true
                }
              ],
              "__parse": true
            },
            {
              "name": "Direct",
              "children": [
                {
                  "name": "Saved",
                  "children": [
                    {
                      "name": "Bookmarks",
                      "value": 90
                    },
                    {
                      "name": "Shortcuts",
                      "value": 60
                    }
                  ],
                  "__parse": true
                },
                {
                  "name": "Email",
                  "children": [
                    {
                      "name": "Newsletter",
                      "value": 95
                    },
                    {
                      "name": "Campaigns",
                      "value": 60
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
