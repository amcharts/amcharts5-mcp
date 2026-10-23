---
title: "Radar Date Range Columns (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/radar-date-range-columns/config.json"
---

# Radar Date Range Columns (JSON config)

Rounded radar columns that span date ranges on a circular date axis, with a ring for each category.

Chart family: radar · Tags: radar, column, date axis, category axis, open value, rounded corners

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/radar-date-range-columns/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "RadarChart",
  "settings": {
    "innerRadius": {
      "type": "Percent",
      "value": 30
    },
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "series": [
      "#series-0"
    ],
    "xAxes": [
      "#axis-0"
    ],
    "yAxes": [
      "#axis-1"
    ]
  },
  "refs": [
    {
      "data-0": [
        {
          "produce": "Leeks",
          "start": 1757883600000,
          "end": 1767132000000
        },
        {
          "produce": "Apples",
          "start": 1755205200000,
          "end": 1763157600000
        },
        {
          "produce": "Tomatoes",
          "start": 1751317200000,
          "end": 1760043600000
        },
        {
          "produce": "Strawberries",
          "start": 1747688400000,
          "end": 1752958800000
        },
        {
          "produce": "Asparagus",
          "start": 1744664400000,
          "end": 1750366800000
        },
        {
          "produce": "Spinach",
          "start": 1740780000000,
          "end": 1748638800000
        },
        {
          "produce": "Spinach",
          "start": 1756674000000,
          "end": 1762725600000
        }
      ]
    },
    {
      "data-1": [
        {
          "produce": "Leeks"
        },
        {
          "produce": "Apples"
        },
        {
          "produce": "Tomatoes"
        },
        {
          "produce": "Strawberries"
        },
        {
          "produce": "Asparagus"
        },
        {
          "produce": "Spinach"
        }
      ]
    },
    {
      "axis-0": {
        "type": "DateAxis",
        "settings": {
          "min": 1735682400000,
          "max": 1767218400000,
          "baseInterval": {
            "timeUnit": "day",
            "count": 1
          },
          "renderer": {
            "type": "AxisRendererCircular"
          }
        }
      }
    },
    {
      "axis-1": {
        "type": "CategoryAxis",
        "settings": {
          "categoryField": "produce",
          "renderer": {
            "type": "AxisRendererRadial",
            "settings": {
              "minGridDistance": 20
            }
          }
        },
        "properties": {
          "data": "#data-1"
        }
      }
    },
    {
      "series-0": {
        "type": "RadarColumnSeries",
        "settings": {
          "name": "In season",
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "categoryYField": "produce",
          "openValueXField": "start",
          "valueXField": "end",
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "columns": {
            "properties": {
              "template": {
                "settings": {
                  "cornerRadius": 25,
                  "tooltipText": "{categoryY}: {openValueX} - {valueX}"
                }
              }
            }
          }
        }
      }
    }
  ],
  "root": {
    "properties": {
      "dateFormatter": {
        "settings": {
          "dateFormat": "MMM d",
          "dateFields": [
            "valueX",
            "openValueX"
          ]
        }
      }
    }
  }
}
```
