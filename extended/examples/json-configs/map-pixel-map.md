---
title: "Pixel Map (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/map-pixel-map/config.json"
---

# Pixel Map (JSON config)

A world map drawn as a grid of dots with PixelMapSeries, with countries colored by value using heat rules.

Chart family: map · Tags: pixel map, dots, heat rules, tooltip

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-pixel-map/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "MapChart",
  "settings": {
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100,
    "projectionName": "geoNaturalEarth1"
  },
  "properties": {
    "series": [
      "#series-0"
    ]
  },
  "refs": [
    {
      "data-0": [
        {
          "id": "US",
          "value": 38,
          "__parse": true
        },
        {
          "id": "CA",
          "value": 41,
          "__parse": true
        },
        {
          "id": "MX",
          "value": 29,
          "__parse": true
        },
        {
          "id": "BR",
          "value": 33,
          "__parse": true
        },
        {
          "id": "AR",
          "value": 32,
          "__parse": true
        },
        {
          "id": "RU",
          "value": 39,
          "__parse": true
        },
        {
          "id": "KZ",
          "value": 31,
          "__parse": true
        },
        {
          "id": "CN",
          "value": 38,
          "__parse": true
        },
        {
          "id": "IN",
          "value": 28,
          "__parse": true
        },
        {
          "id": "ID",
          "value": 30,
          "__parse": true
        },
        {
          "id": "AU",
          "value": 38,
          "__parse": true
        },
        {
          "id": "EG",
          "value": 24,
          "__parse": true
        },
        {
          "id": "NG",
          "value": 18,
          "__parse": true
        },
        {
          "id": "ET",
          "value": 19,
          "__parse": true
        },
        {
          "id": "ZA",
          "value": 28,
          "__parse": true
        }
      ]
    },
    {
      "template-0": {
        "type": "Template",
        "settings": {
          "fill": {
            "type": "Color",
            "value": "#adadad"
          },
          "tooltipText": "{name}: {value}"
        }
      }
    },
    {
      "series-0": {
        "type": "PixelMapSeries",
        "settings": {
          "geoJSON": "am5geodata_worldLow",
          "exclude": [
            "AQ"
          ],
          "pixelType": "circle",
          "step": 2,
          "uniform": true,
          "valueField": "value",
          "calculateAggregates": true,
          "heatRules": [
            {
              "target": "#template-0",
              "dataField": "value",
              "min": {
                "type": "Color",
                "value": "#ffd19a"
              },
              "max": {
                "type": "Color",
                "value": "#b3261e"
              },
              "key": "fill",
              "__parse": true
            }
          ]
        },
        "properties": {
          "data": "#data-0",
          "mapPolygons": {
            "properties": {
              "template": "#template-0"
            }
          }
        }
      }
    }
  ]
}
```
