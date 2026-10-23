---
title: "Zoom to Country (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/map-zoom-to-country/config.json"
---

# Zoom to Country (JSON config)

Click a country to zoom in on it; click it again, the water or the home button to zoom back out. One setting, clickZoom, does it.

Chart family: map · Tags: zoom, click, clickZoom, active state, zoom control, home button

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-zoom-to-country/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
    "zoomControl": {
      "type": "ZoomControl",
      "properties": {
        "homeButton": {
          "settings": {
            "visible": true
          }
        }
      }
    },
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100,
    "projectionName": "geoMercator"
  },
  "properties": {
    "series": [
      "#series-0"
    ]
  },
  "refs": [
    {
      "data-0": []
    },
    {
      "series-0": {
        "type": "MapPolygonSeries",
        "settings": {
          "geoJSON": "am5geodata_worldLow",
          "exclude": [
            "AQ"
          ],
          "clickZoom": true
        },
        "properties": {
          "mapPolygons": {
            "properties": {
              "template": {
                "settings": {
                  "tooltipText": "{name}",
                  "interactive": true
                },
                "states": [
                  {
                    "key": "hover",
                    "settings": {
                      "fill": {
                        "type": "Color",
                        "value": "#6771dc"
                      }
                    }
                  },
                  {
                    "key": "active",
                    "settings": {
                      "fill": {
                        "type": "Color",
                        "value": "#68dc76"
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  ]
}
```
