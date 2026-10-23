---
title: "Globe with Raised Arcs (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/map-altitude-arcs/config.json"
---

# Globe with Raised Arcs (JSON config)

Flight routes between cities on a globe, drawn as lines that rise above the surface in an arc with the altitude setting.

Chart family: map · Tags: globe, map lines, altitude, arcs, routes

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-altitude-arcs/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
    "rotationX": -20,
    "rotationY": -20,
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100,
    "projectionName": "geoOrthographic"
  },
  "properties": {
    "series": [
      "#series-0",
      "#series-1",
      "#series-2",
      "#series-3"
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
          "id": "london",
          "title": "London",
          "latitude": 51.5072,
          "longitude": -0.1276
        },
        {
          "id": "new-york",
          "title": "New York",
          "latitude": 40.7128,
          "longitude": -74.006
        },
        {
          "id": "sao-paulo",
          "title": "Sao Paulo",
          "latitude": -23.5505,
          "longitude": -46.6333
        },
        {
          "id": "johannesburg",
          "title": "Johannesburg",
          "latitude": -26.2041,
          "longitude": 28.0473
        },
        {
          "id": "singapore",
          "title": "Singapore",
          "latitude": 1.3521,
          "longitude": 103.8198
        }
      ]
    },
    {
      "data-3": [
        {
          "pointIds": [
            "london",
            "new-york"
          ],
          "__parse": true
        },
        {
          "pointIds": [
            "london",
            "singapore"
          ],
          "__parse": true
        },
        {
          "pointIds": [
            "london",
            "johannesburg"
          ],
          "__parse": true
        },
        {
          "pointIds": [
            "new-york",
            "sao-paulo"
          ],
          "__parse": true
        },
        {
          "pointIds": [
            "sao-paulo",
            "johannesburg"
          ],
          "__parse": true
        },
        {
          "pointIds": [
            "johannesburg",
            "singapore"
          ],
          "__parse": true
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
                  "type": "Circle",
                  "settings": {
                    "radius": 5,
                    "fill": {
                      "type": "Color",
                      "value": "#ff621f"
                    },
                    "stroke": {
                      "type": "Color",
                      "value": "#ffffff"
                    },
                    "strokeWidth": 2,
                    "tooltipText": "{title}"
                  }
                }
              }
            }
          ]
        }
      }
    },
    {
      "series-3": {
        "type": "MapLineSeries",
        "settings": {
          "pointSeries": "#series-2"
        },
        "properties": {
          "data": "#data-3",
          "mapLines": {
            "properties": {
              "template": {
                "settings": {
                  "altitude": 1000000,
                  "stroke": {
                    "type": "Color",
                    "value": "#ff621f"
                  },
                  "strokeWidth": 2
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
