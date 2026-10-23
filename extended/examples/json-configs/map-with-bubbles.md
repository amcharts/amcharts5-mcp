---
title: "Map with Bubbles (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/map-with-bubbles/config.json"
---

# Map with Bubbles (JSON config)

Bubbles placed on countries by their id, with heat rules setting each bubble's size and color from its value.

Chart family: map · Tags: bubbles, point series, heat rules, polygon id

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-with-bubbles/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
    "panX": "translateX",
    "panY": "translateY",
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100,
    "projectionName": "geoMercator"
  },
  "properties": {
    "series": [
      "#series-0",
      "#series-1"
    ]
  },
  "refs": [
    {
      "data-0": []
    },
    {
      "data-1": [
        {
          "id": "CN",
          "name": "China",
          "value": 1347600000
        },
        {
          "id": "IN",
          "name": "India",
          "value": 1241500000
        },
        {
          "id": "US",
          "name": "United States",
          "value": 313100000
        },
        {
          "id": "ID",
          "name": "Indonesia",
          "value": 242300000
        },
        {
          "id": "BR",
          "name": "Brazil",
          "value": 196700000
        },
        {
          "id": "PK",
          "name": "Pakistan",
          "value": 176700000
        },
        {
          "id": "NG",
          "name": "Nigeria",
          "value": 162500000
        },
        {
          "id": "BD",
          "name": "Bangladesh",
          "value": 150500000
        },
        {
          "id": "RU",
          "name": "Russia",
          "value": 142800000
        },
        {
          "id": "JP",
          "name": "Japan",
          "value": 126500000
        },
        {
          "id": "MX",
          "name": "Mexico",
          "value": 114800000
        },
        {
          "id": "PH",
          "name": "Philippines",
          "value": 94900000
        },
        {
          "id": "VN",
          "name": "Vietnam",
          "value": 88800000
        },
        {
          "id": "ET",
          "name": "Ethiopia",
          "value": 84700000
        },
        {
          "id": "EG",
          "name": "Egypt",
          "value": 82500000
        },
        {
          "id": "DE",
          "name": "Germany",
          "value": 82200000
        },
        {
          "id": "IR",
          "name": "Iran",
          "value": 74800000
        },
        {
          "id": "TR",
          "name": "Türkiye",
          "value": 73600000
        },
        {
          "id": "TH",
          "name": "Thailand",
          "value": 69500000
        },
        {
          "id": "CD",
          "name": "DR Congo",
          "value": 67800000
        },
        {
          "id": "FR",
          "name": "France",
          "value": 63100000
        },
        {
          "id": "GB",
          "name": "United Kingdom",
          "value": 62400000
        },
        {
          "id": "IT",
          "name": "Italy",
          "value": 60800000
        },
        {
          "id": "ZA",
          "name": "South Africa",
          "value": 50500000
        },
        {
          "id": "KR",
          "name": "South Korea",
          "value": 48400000
        },
        {
          "id": "CO",
          "name": "Colombia",
          "value": 46900000
        },
        {
          "id": "ES",
          "name": "Spain",
          "value": 46500000
        },
        {
          "id": "TZ",
          "name": "Tanzania",
          "value": 46200000
        },
        {
          "id": "UA",
          "name": "Ukraine",
          "value": 45200000
        },
        {
          "id": "KE",
          "name": "Kenya",
          "value": 41600000
        },
        {
          "id": "AR",
          "name": "Argentina",
          "value": 40800000
        },
        {
          "id": "PL",
          "name": "Poland",
          "value": 38300000
        },
        {
          "id": "DZ",
          "name": "Algeria",
          "value": 36000000
        },
        {
          "id": "CA",
          "name": "Canada",
          "value": 34300000
        },
        {
          "id": "MA",
          "name": "Morocco",
          "value": 32300000
        },
        {
          "id": "PE",
          "name": "Peru",
          "value": 29400000
        },
        {
          "id": "SA",
          "name": "Saudi Arabia",
          "value": 28100000
        },
        {
          "id": "AU",
          "name": "Australia",
          "value": 22600000
        },
        {
          "id": "CL",
          "name": "Chile",
          "value": 17300000
        },
        {
          "id": "SE",
          "name": "Sweden",
          "value": 9400000
        }
      ]
    },
    {
      "template-0": {
        "type": "Template"
      }
    },
    {
      "series-0": {
        "type": "MapPolygonSeries",
        "settings": {
          "geoJSON": "am5geodata_worldLow",
          "exclude": [
            "AQ"
          ]
        },
        "properties": {
          "mapPolygons": {
            "properties": {
              "template": {
                "settings": {
                  "fill": {
                    "type": "Color",
                    "value": "#000000"
                  },
                  "fillOpacity": 0.15,
                  "strokeWidth": 0.5,
                  "stroke": {
                    "type": "Color",
                    "value": "#ffffff"
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      "series-1": {
        "type": "MapPointSeries",
        "settings": {
          "calculateAggregates": true,
          "valueField": "value",
          "polygonIdField": "id",
          "heatRules": [
            {
              "target": "#template-0",
              "dataField": "value",
              "key": "radius",
              "min": 4,
              "max": 30,
              "__parse": true
            },
            {
              "target": "#template-0",
              "dataField": "value",
              "key": "fill",
              "min": {
                "type": "Color",
                "value": "#ffb14e"
              },
              "max": {
                "type": "Color",
                "value": "#cd34b5"
              },
              "__parse": true
            }
          ]
        },
        "properties": {
          "data": "#data-1",
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Circle",
                  "settings": {
                    "fillOpacity": 0.7,
                    "tooltipText": "{name}: {value}"
                  },
                  "properties": {
                    "template": "#template-0"
                  }
                }
              }
            }
          ]
        }
      }
    }
  ]
}
```
