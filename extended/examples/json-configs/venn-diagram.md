---
title: "Venn Diagram (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/venn-diagram/config.json"
---

# Venn Diagram (JSON config)

Three overlapping circles and their intersections, with a legend.

Chart family: other · Tags: venn, sets, legend

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/venn-diagram/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/venn.js
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
      "type": "Legend",
      "settings": {
        "centerX": {
          "type": "Percent",
          "value": 50
        },
        "x": {
          "type": "Percent",
          "value": 50
        }
      },
      "properties": {
        "data": "#series-0.dataItems"
      }
    }
  ],
  "refs": [
    {
      "data-0": [
        {
          "name": "A",
          "value": 10
        },
        {
          "name": "B",
          "value": 10
        },
        {
          "name": "C",
          "value": 5
        },
        {
          "name": "X",
          "value": 4,
          "sets": [
            "A",
            "B"
          ],
          "__parse": true
        },
        {
          "name": "Y",
          "value": 2,
          "sets": [
            "A",
            "C"
          ],
          "__parse": true
        },
        {
          "name": "Z",
          "value": 2,
          "sets": [
            "B",
            "C"
          ],
          "__parse": true
        },
        {
          "name": "Q",
          "value": 1,
          "sets": [
            "A",
            "B",
            "C"
          ],
          "__parse": true
        }
      ]
    },
    {
      "series-0": {
        "type": "Venn",
        "settings": {
          "categoryField": "name",
          "valueField": "value",
          "intersectionsField": "sets",
          "paddingTop": 40,
          "paddingBottom": 40,
          "paddingLeft": 40,
          "paddingRight": 40,
          "autoAppear": true,
          "appearDuration": 1000,
          "appearDelay": 100
        },
        "properties": {
          "data": "#data-0",
          "slices": {
            "properties": {
              "template": {
                "settings": {
                  "tooltipText": "{category}: {value}"
                }
              }
            }
          }
        }
      }
    }
  ]
}
```
