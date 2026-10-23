---
title: "Satellite Image Globe (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/map-satellite-globe/config.json"
---

# Satellite Image Globe (JSON config)

A slowly turning globe that shows a satellite image with MapRasterSeries, with country borders drawn over it. The image loads from the amCharts CDN, so it needs an internet connection.

Chart family: map · Tags: globe, satellite, raster, image, animations

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-satellite-globe/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
    "panX": "rotateX",
    "panY": "rotateY",
    "animations": [
      {
        "key": "rotationX",
        "from": 0,
        "to": 360,
        "duration": 120000,
        "loops": 0
      }
    ],
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100,
    "projectionName": "geoOrthographic"
  },
  "properties": {
    "series": [
      "#series-0",
      "#series-1"
    ]
  },
  "children": [
    {
      "type": "Label",
      "settings": {
        "text": "Imagery: NASA Earth Observatory",
        "fontSize": 12,
        "x": {
          "type": "Percent",
          "value": 100
        },
        "centerX": {
          "type": "Percent",
          "value": 100
        },
        "y": {
          "type": "Percent",
          "value": 100
        },
        "centerY": {
          "type": "Percent",
          "value": 100
        }
      }
    }
  ],
  "refs": [
    {
      "data-0": []
    },
    {
      "data-1": []
    },
    {
      "series-0": {
        "type": "MapRasterSeries",
        "settings": {
          "src": "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg"
        }
      }
    },
    {
      "series-1": {
        "type": "MapPolygonSeries",
        "settings": {
          "geoJSON": "am5geodata_worldLow"
        },
        "properties": {
          "mapPolygons": {
            "properties": {
              "template": {
                "settings": {
                  "fillOpacity": 0,
                  "stroke": {
                    "type": "Color",
                    "value": "#ffffff"
                  },
                  "strokeWidth": 0.5,
                  "strokeOpacity": 0.6
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
