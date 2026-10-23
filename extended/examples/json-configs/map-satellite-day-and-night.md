---
title: "Satellite Day and Night Map (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/map-satellite-day-and-night/config.json"
---

# Satellite Day and Night Map (JSON config)

A flat map that shows a daytime satellite image where the sun is up right now and city lights where it is night, with MapRasterSeries. The images load from the amCharts CDN, so it needs an internet connection.

Chart family: map · Tags: satellite, raster, image, day and night, sun

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/map-satellite-day-and-night/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "MapChart",
  "settings": {
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100,
    "projectionName": "geoEqualEarth"
  },
  "properties": {
    "series": [
      "#series-0"
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
      "series-0": {
        "type": "MapRasterSeries",
        "settings": {
          "src": "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg",
          "nightSrc": "https://cdn.amcharts.com/lib/5/geodata/images/earthNight2048.jpg",
          "sunDate": "now"
        }
      }
    }
  ]
}
```
