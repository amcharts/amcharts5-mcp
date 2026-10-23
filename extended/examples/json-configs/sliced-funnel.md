---
title: "Funnel Chart (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/sliced-funnel/config.json"
---

# Funnel Chart (JSON config)

A funnel series in a sliced chart, with labels on the slices and a legend.

Chart family: percent · Tags: funnel, sliced, legend

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/sliced-funnel/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "SlicedChart",
  "settings": {
    "layout": {
      "type": "VerticalLayout"
    },
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
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
        "data": "#series-0.dataItems"
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
        "type": "FunnelSeries",
        "settings": {
          "alignLabels": false,
          "orientation": "vertical",
          "valueField": "value",
          "categoryField": "category",
          "autoAppear": true
        },
        "properties": {
          "data": "#data-0"
        }
      }
    }
  ]
}
```
