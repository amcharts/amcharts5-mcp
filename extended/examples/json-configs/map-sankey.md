---
title: "Map Sankey (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/map-sankey/config.json"
---

# Map Sankey (JSON config)

Flows between countries drawn as bands on a map with MapSankeySeries, each band as wide as its value.

Chart family: map · Tags: map sankey series, flows, links, nodes

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-sankey/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
          "sourceId": "BR",
          "source": "Brazil",
          "targetId": "US",
          "target": "United States",
          "value": 450
        },
        {
          "sourceId": "BR",
          "source": "Brazil",
          "targetId": "DE",
          "target": "Germany",
          "value": 350
        },
        {
          "sourceId": "BR",
          "source": "Brazil",
          "targetId": "IT",
          "target": "Italy",
          "value": 200
        },
        {
          "sourceId": "CO",
          "source": "Colombia",
          "targetId": "US",
          "target": "United States",
          "value": 250
        },
        {
          "sourceId": "CO",
          "source": "Colombia",
          "targetId": "DE",
          "target": "Germany",
          "value": 80
        },
        {
          "sourceId": "ET",
          "source": "Ethiopia",
          "targetId": "DE",
          "target": "Germany",
          "value": 80
        },
        {
          "sourceId": "VN",
          "source": "Vietnam",
          "targetId": "DE",
          "target": "Germany",
          "value": 200
        },
        {
          "sourceId": "VN",
          "source": "Vietnam",
          "targetId": "IT",
          "target": "Italy",
          "value": 150
        },
        {
          "sourceId": "VN",
          "source": "Vietnam",
          "targetId": "JP",
          "target": "Japan",
          "value": 100
        },
        {
          "sourceId": "ID",
          "source": "Indonesia",
          "targetId": "JP",
          "target": "Japan",
          "value": 80
        },
        {
          "sourceId": "ID",
          "source": "Indonesia",
          "targetId": "DE",
          "target": "Germany",
          "value": 60
        }
      ]
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
                  "fillOpacity": 0.15
                }
              }
            }
          }
        }
      }
    },
    {
      "series-1": {
        "type": "MapSankeySeries",
        "settings": {
          "polygonSeries": "#series-0"
        },
        "properties": {
          "data": "#data-1",
          "mapPolygons": {
            "properties": {
              "template": {
                "settings": {
                  "fillOpacity": 0.6,
                  "tooltipText": "{source} > {target}: {value}"
                }
              }
            }
          },
          "nodes": {
            "properties": {
              "mapPolygons": {
                "properties": {
                  "template": {
                    "settings": {
                      "tooltipText": "{name}: {sum}"
                    }
                  }
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
