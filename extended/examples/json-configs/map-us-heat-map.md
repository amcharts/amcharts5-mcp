---
title: "US Heat Map (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/map-us-heat-map/config.json"
---

# US Heat Map (JSON config)

US states colored by value on a red, yellow and green scale, with heat rules and a heat legend that take several colors.

Chart family: map · Tags: heat rules, heat legend, choropleth, usa

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-us-heat-map/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/usaLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "MapChart",
  "settings": {
    "paddingBottom": 60,
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100,
    "projectionName": "geoAlbersUsa"
  },
  "properties": {
    "series": [
      "#series-0"
    ]
  },
  "children": [
    {
      "type": "HeatLegend",
      "settings": {
        "orientation": "horizontal",
        "colors": [
          "@root.interfaceColors.get('negative')",
          "@root.interfaceColors.get('warning')",
          "@root.interfaceColors.get('positive')"
        ],
        "startValue": 50,
        "endValue": 100,
        "width": {
          "type": "Percent",
          "value": 40
        },
        "x": {
          "type": "Percent",
          "value": 50
        },
        "centerX": {
          "type": "Percent",
          "value": 50
        },
        "y": {
          "type": "Percent",
          "value": 100
        },
        "paddingTop": 15
      }
    }
  ],
  "refs": [
    {
      "data-0": [
        {
          "id": "US-AL",
          "value": 61,
          "__parse": true
        },
        {
          "id": "US-AK",
          "value": 74,
          "__parse": true
        },
        {
          "id": "US-AZ",
          "value": 68,
          "__parse": true
        },
        {
          "id": "US-AR",
          "value": 57,
          "__parse": true
        },
        {
          "id": "US-CA",
          "value": 83,
          "__parse": true
        },
        {
          "id": "US-CO",
          "value": 88,
          "__parse": true
        },
        {
          "id": "US-CT",
          "value": 79,
          "__parse": true
        },
        {
          "id": "US-DE",
          "value": 71,
          "__parse": true
        },
        {
          "id": "US-DC",
          "value": 66,
          "__parse": true
        },
        {
          "id": "US-FL",
          "value": 72,
          "__parse": true
        },
        {
          "id": "US-GA",
          "value": 64,
          "__parse": true
        },
        {
          "id": "US-HI",
          "value": 90,
          "__parse": true
        },
        {
          "id": "US-ID",
          "value": 77,
          "__parse": true
        },
        {
          "id": "US-IL",
          "value": 69,
          "__parse": true
        },
        {
          "id": "US-IN",
          "value": 63,
          "__parse": true
        },
        {
          "id": "US-IA",
          "value": 81,
          "__parse": true
        },
        {
          "id": "US-KS",
          "value": 75,
          "__parse": true
        },
        {
          "id": "US-KY",
          "value": 58,
          "__parse": true
        },
        {
          "id": "US-LA",
          "value": 54,
          "__parse": true
        },
        {
          "id": "US-ME",
          "value": 86,
          "__parse": true
        },
        {
          "id": "US-MD",
          "value": 73,
          "__parse": true
        },
        {
          "id": "US-MA",
          "value": 89,
          "__parse": true
        },
        {
          "id": "US-MI",
          "value": 67,
          "__parse": true
        },
        {
          "id": "US-MN",
          "value": 92,
          "__parse": true
        },
        {
          "id": "US-MS",
          "value": 52,
          "__parse": true
        },
        {
          "id": "US-MO",
          "value": 65,
          "__parse": true
        },
        {
          "id": "US-MT",
          "value": 84,
          "__parse": true
        },
        {
          "id": "US-NE",
          "value": 80,
          "__parse": true
        },
        {
          "id": "US-NV",
          "value": 62,
          "__parse": true
        },
        {
          "id": "US-NH",
          "value": 91,
          "__parse": true
        },
        {
          "id": "US-NJ",
          "value": 76,
          "__parse": true
        },
        {
          "id": "US-NM",
          "value": 59,
          "__parse": true
        },
        {
          "id": "US-NY",
          "value": 78,
          "__parse": true
        },
        {
          "id": "US-NC",
          "value": 70,
          "__parse": true
        },
        {
          "id": "US-ND",
          "value": 82,
          "__parse": true
        },
        {
          "id": "US-OH",
          "value": 66,
          "__parse": true
        },
        {
          "id": "US-OK",
          "value": 56,
          "__parse": true
        },
        {
          "id": "US-OR",
          "value": 85,
          "__parse": true
        },
        {
          "id": "US-PA",
          "value": 72,
          "__parse": true
        },
        {
          "id": "US-RI",
          "value": 74,
          "__parse": true
        },
        {
          "id": "US-SC",
          "value": 60,
          "__parse": true
        },
        {
          "id": "US-SD",
          "value": 79,
          "__parse": true
        },
        {
          "id": "US-TN",
          "value": 63,
          "__parse": true
        },
        {
          "id": "US-TX",
          "value": 69,
          "__parse": true
        },
        {
          "id": "US-UT",
          "value": 87,
          "__parse": true
        },
        {
          "id": "US-VT",
          "value": 94,
          "__parse": true
        },
        {
          "id": "US-VA",
          "value": 77,
          "__parse": true
        },
        {
          "id": "US-WA",
          "value": 88,
          "__parse": true
        },
        {
          "id": "US-WV",
          "value": 53,
          "__parse": true
        },
        {
          "id": "US-WI",
          "value": 81,
          "__parse": true
        },
        {
          "id": "US-WY",
          "value": 76,
          "__parse": true
        }
      ]
    },
    {
      "template-0": {
        "type": "Template",
        "settings": {
          "tooltipText": "{name}: {value}",
          "stroke": "@root.interfaceColors.get('background')",
          "strokeWidth": 1
        }
      }
    },
    {
      "series-0": {
        "type": "MapPolygonSeries",
        "settings": {
          "geoJSON": "am5geodata_usaLow",
          "valueField": "value",
          "heatRules": [
            {
              "target": "#template-0",
              "dataField": "value",
              "key": "fill",
              "stops": [
                "@root.interfaceColors.get('negative')",
                "@root.interfaceColors.get('warning')",
                "@root.interfaceColors.get('positive')"
              ],
              "minValue": 50,
              "maxValue": 100,
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
