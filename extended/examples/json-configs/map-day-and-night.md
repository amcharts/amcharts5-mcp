---
title: "Day and Night Map (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/map-day-and-night/config.json"
---

# Day and Night Map (JSON config)

A world map with a NightSeries that shades where it is night right now and shows the sun.

Chart family: map · Tags: night series, sun, twilight, polygon series

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-day-and-night/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

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
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100,
    "projectionName": "geoNaturalEarth1"
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
      "data-1": []
    },
    {
      "series-0": {
        "type": "MapPolygonSeries",
        "settings": {
          "geoJSON": "am5geodata_worldLow"
        }
      }
    },
    {
      "series-1": {
        "type": "NightSeries",
        "settings": {
          "sunDate": "now"
        }
      }
    }
  ]
}
```
