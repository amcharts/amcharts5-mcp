---
title: "Pie Chart (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.24.0: examples/pie-chart/config.json"
---

# Pie Chart (JSON config)

A pie chart with a legend below it.

Chart family: percent · Tags: pie, legend

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/pie-chart/config.json, version 5.24.0). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, ResponsiveMax, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js (theme, applied separately)

## JSON config

```json
{
  "type": "PieChart",
  "settings": {
    "layout": {
      "type": "VerticalLayout"
    },
    "focusable": true,
    "ariaLabel": "Pie chart of seven categories, One to Seven, and their share of the total. Tab to the slices, then move between them with the up and down arrow keys; Enter pulls a slice out"
  },
  "properties": {
    "series": [
      "#series-0"
    ]
  },
  "children": [
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
        },
        "marginTop": 15,
        "marginBottom": 15
      },
      "properties": {
        "data": "#series-0.dataItems",
        "itemContainers": {
          "properties": {
            "template": {
              "settings": {
                "focusableGroup": "legend",
                "tabindexOrder": 10
              }
            }
          }
        }
      }
    }
  ],
  "refs": [
    {
      "data-0": [
        {
          "value": 10,
          "category": "One"
        },
        {
          "value": 9,
          "category": "Two"
        },
        {
          "value": 6,
          "category": "Three"
        },
        {
          "value": 5,
          "category": "Four"
        },
        {
          "value": 4,
          "category": "Five"
        },
        {
          "value": 3,
          "category": "Six"
        },
        {
          "value": 1,
          "category": "Seven"
        }
      ]
    },
    {
      "series-0": {
        "type": "PieSeries",
        "settings": {
          "valueField": "value",
          "categoryField": "category",
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
                  "focusable": true,
                  "focusableGroup": "slices",
                  "hoverOnFocus": true,
                  "ariaLabel": "{category}: {value}, {valuePercentTotal.formatNumber('0.0')}%"
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
