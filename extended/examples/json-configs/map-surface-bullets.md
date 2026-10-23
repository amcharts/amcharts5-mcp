---
title: "Globe with Surface Bullets (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/map-surface-bullets/config.json"
---

# Globe with Surface Bullets (JSON config)

City pins that lie on the surface of a globe and flatten towards its edge, using the surfaceBullets setting of MapPointSeries.

Chart family: map · Tags: globe, map points, bullets, surface, icon

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-surface-bullets/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100,
    "projectionName": "geoOrthographic"
  },
  "properties": {
    "series": [
      "#series-0",
      "#series-1",
      "#series-2"
    ]
  },
  "refs": [
    {
      "data-0": [
        {
          "geometry": {
            "type": "GeoRectangle",
            "north": 90,
            "east": 180,
            "south": -90,
            "west": -180
          },
          "__parse": true
        }
      ]
    },
    {
      "data-1": []
    },
    {
      "data-2": [
        {
          "title": "New York",
          "latitude": 40.7128,
          "longitude": -74.006
        },
        {
          "title": "Mexico City",
          "latitude": 19.4326,
          "longitude": -99.1332
        },
        {
          "title": "Sao Paulo",
          "latitude": -23.5505,
          "longitude": -46.6333
        },
        {
          "title": "Reykjavik",
          "latitude": 64.1466,
          "longitude": -21.9426
        },
        {
          "title": "London",
          "latitude": 51.5072,
          "longitude": -0.1276
        },
        {
          "title": "Lagos",
          "latitude": 6.5244,
          "longitude": 3.3792
        },
        {
          "title": "Cape Town",
          "latitude": -33.9249,
          "longitude": 18.4241
        },
        {
          "title": "Cairo",
          "latitude": 30.0444,
          "longitude": 31.2357
        },
        {
          "title": "Moscow",
          "latitude": 55.7558,
          "longitude": 37.6173
        },
        {
          "title": "Delhi",
          "latitude": 28.6139,
          "longitude": 77.209
        },
        {
          "title": "Tokyo",
          "latitude": 35.6895,
          "longitude": 139.6917
        },
        {
          "title": "Sydney",
          "latitude": -33.8688,
          "longitude": 151.2093
        }
      ]
    },
    {
      "series-0": {
        "type": "MapPolygonSeries",
        "properties": {
          "data": "#data-0",
          "mapPolygons": {
            "properties": {
              "template": {
                "settings": {
                  "fill": {
                    "type": "Color",
                    "value": "#000000"
                  },
                  "fillOpacity": 0.06,
                  "strokeOpacity": 0
                }
              }
            }
          }
        }
      }
    },
    {
      "series-1": {
        "type": "MapPolygonSeries",
        "settings": {
          "geoJSON": "am5geodata_worldLow"
        }
      }
    },
    {
      "series-2": {
        "type": "MapPointSeries",
        "settings": {
          "surfaceBullets": true,
          "latitudeField": "latitude",
          "longitudeField": "longitude"
        },
        "properties": {
          "data": "#data-2",
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Graphics",
                  "settings": {
                    "svgPath": "M0,0 C-5,-7 -9,-11 -9,-17 A9,9 0 1 1 9,-17 C9,-11 5,-7 0,0 Z M0,-20.5 A3.5,3.5 0 1 0 0,-13.5 A3.5,3.5 0 1 0 0,-20.5 Z",
                    "fill": {
                      "type": "Color",
                      "value": "#ff621f"
                    },
                    "stroke": {
                      "type": "Color",
                      "value": "#ffffff"
                    },
                    "strokeWidth": 1,
                    "tooltipText": "{title}"
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
