---
title: "Animating Along Lines (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/map-animating-along-lines/config.json"
---

# Animating Along Lines (JSON config)

A plane flies back and forth along a line between two cities, moved by the animations setting of its bullet.

Chart family: map · Tags: line series, point series, animations, position on line, auto rotate

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-animating-along-lines/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
      "#series-1",
      "#series-2",
      "#series-3"
    ]
  },
  "refs": [
    {
      "data-0": []
    },
    {
      "data-1": [
        {
          "id": "los-angeles",
          "title": "Los Angeles",
          "longitude": -118.24,
          "latitude": 34.05
        },
        {
          "id": "paris",
          "title": "Paris",
          "longitude": 2.35,
          "latitude": 48.86
        }
      ]
    },
    {
      "data-2": [
        {
          "id": "route",
          "pointIds": [
            "los-angeles",
            "paris"
          ],
          "__parse": true
        }
      ]
    },
    {
      "data-3": [
        {
          "lineId": "route",
          "positionOnLine": 0,
          "autoRotate": true
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
        "type": "MapPointSeries",
        "properties": {
          "data": "#data-1",
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Circle",
                  "settings": {
                    "radius": 6,
                    "tooltipText": "{title}",
                    "tooltipY": 0,
                    "fill": {
                      "type": "Color",
                      "value": "#ffba00"
                    },
                    "stroke": {
                      "type": "Color",
                      "value": "#ffffff"
                    },
                    "strokeWidth": 2
                  }
                }
              }
            }
          ]
        }
      }
    },
    {
      "series-2": {
        "type": "MapLineSeries",
        "settings": {
          "pointSeries": "#series-1"
        },
        "properties": {
          "data": "#data-2",
          "mapLines": {
            "properties": {
              "template": {
                "settings": {
                  "stroke": {
                    "type": "Color",
                    "value": "#000000"
                  },
                  "strokeOpacity": 0.4,
                  "strokeWidth": 2
                }
              }
            }
          }
        }
      }
    },
    {
      "series-3": {
        "type": "MapPointSeries",
        "properties": {
          "data": "#data-3",
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Graphics",
                  "settings": {
                    "svgPath": "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
                    "scale": 0.06,
                    "centerX": {
                      "type": "Percent",
                      "value": 50
                    },
                    "centerY": {
                      "type": "Percent",
                      "value": 50
                    },
                    "fill": {
                      "type": "Color",
                      "value": "#000000"
                    },
                    "animations": [
                      {
                        "key": "positionOnLine",
                        "from": 0,
                        "to": 1,
                        "duration": 10000,
                        "loops": 0,
                        "yoyo": true,
                        "target": "dataItem"
                      }
                    ]
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
