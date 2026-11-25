---
title: "Zoom to Country (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.24.0: examples/map-zoom-to-country/config.json"
---

# Zoom to Country (JSON config)

Click a country to zoom in on it; click it again, the water or the home button to zoom back out. One setting, clickZoom, does it.

Chart family: map · Tags: zoom, click, clickZoom, active state, zoom control, home button

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-zoom-to-country/config.json, version 5.24.0). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, ResponsiveMax, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js (theme, applied separately)

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
    "focusable": true,
    "ariaLabel": "World map of countries that zooms to the one you pick. Tab to the countries, move between them with the up and down arrow keys, and press Enter to zoom to one or back out",
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
                  "interactive": true,
                  "focusable": true,
                  "focusableGroup": "countries",
                  "hoverOnFocus": true,
                  "ariaLabel": "{name}"
                },
                "states": [
                  {
                    "key": "hover",
                    "settings": {
                      "fill": "@root.interfaceColors.get('primaryButtonHover')"
                    }
                  },
                  {
                    "key": "active",
                    "settings": {
                      "fill": "@root.interfaceColors.get('primaryButtonActive')"
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
