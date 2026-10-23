---
title: "Globe Rotating to a Country (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/map-globe-rotate-to-country/config.json"
---

# Globe Rotating to a Country (JSON config)

A globe that turns and zooms to the clicked country, and back when it is clicked again or the water is clicked: clickZoom on a map that pans by rotating.

Chart family: map · Tags: globe, orthographic, rotate, click, clickZoom, active state

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-globe-rotate-to-country/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
    "paddingBottom": 20,
    "paddingTop": 20,
    "paddingLeft": 20,
    "paddingRight": 20,
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
                  "fillOpacity": 0.1,
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
          "geoJSON": "am5geodata_worldLow",
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
