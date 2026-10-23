---
title: "Word Cloud from Data (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/wordcloud-with-data/config.json"
---

# Word Cloud from Data (JSON config)

A word cloud made from a list of words with weights, colored by weight with a heat rule.

Chart family: other · Tags: word cloud, data, heat rules

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/wordcloud-with-data/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/wc.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "Container",
  "settings": {
    "width": {
      "type": "Percent",
      "value": 100
    },
    "height": {
      "type": "Percent",
      "value": 100
    },
    "layout": {
      "type": "VerticalLayout"
    }
  },
  "children": [
    {
      "type": "Label",
      "settings": {
        "text": "Most popular languages on Stack Overflow",
        "fontSize": 20,
        "x": {
          "type": "Percent",
          "value": 50
        },
        "centerX": {
          "type": "Percent",
          "value": 50
        }
      }
    },
    "#series-0"
  ],
  "refs": [
    {
      "data-0": [
        {
          "tag": "JavaScript",
          "weight": 64.96
        },
        {
          "tag": "HTML/CSS",
          "weight": 56.07
        },
        {
          "tag": "Python",
          "weight": 48.24
        },
        {
          "tag": "SQL",
          "weight": 47.08
        },
        {
          "tag": "Java",
          "weight": 35.35
        },
        {
          "tag": "Node.js",
          "weight": 33.91
        },
        {
          "tag": "TypeScript",
          "weight": 30.19
        },
        {
          "tag": "C#",
          "weight": 27.86
        },
        {
          "tag": "Bash/Shell",
          "weight": 27.13
        },
        {
          "tag": "C++",
          "weight": 24.31
        },
        {
          "tag": "PHP",
          "weight": 21.98
        },
        {
          "tag": "C",
          "weight": 21.01
        },
        {
          "tag": "PowerShell",
          "weight": 10.75
        },
        {
          "tag": "Go",
          "weight": 9.55
        },
        {
          "tag": "Kotlin",
          "weight": 8.32
        },
        {
          "tag": "Rust",
          "weight": 7.03
        },
        {
          "tag": "Ruby",
          "weight": 6.75
        },
        {
          "tag": "Dart",
          "weight": 6.02
        },
        {
          "tag": "Assembly",
          "weight": 5.61
        },
        {
          "tag": "Swift",
          "weight": 5.1
        },
        {
          "tag": "R",
          "weight": 5.07
        },
        {
          "tag": "VBA",
          "weight": 4.66
        },
        {
          "tag": "Matlab",
          "weight": 4.66
        },
        {
          "tag": "Groovy",
          "weight": 3.01
        },
        {
          "tag": "Objective-C",
          "weight": 2.8
        },
        {
          "tag": "Scala",
          "weight": 2.6
        },
        {
          "tag": "Perl",
          "weight": 2.46
        },
        {
          "tag": "Haskell",
          "weight": 2.12
        },
        {
          "tag": "Delphi",
          "weight": 2.1
        },
        {
          "tag": "Clojure",
          "weight": 1.88
        },
        {
          "tag": "Elixir",
          "weight": 1.74
        },
        {
          "tag": "LISP",
          "weight": 1.33
        },
        {
          "tag": "Julia",
          "weight": 1.29
        },
        {
          "tag": "F#",
          "weight": 0.97
        },
        {
          "tag": "Erlang",
          "weight": 0.79
        },
        {
          "tag": "APL",
          "weight": 0.65
        },
        {
          "tag": "Crystal",
          "weight": 0.56
        },
        {
          "tag": "COBOL",
          "weight": 0.53
        }
      ]
    },
    {
      "template-0": {
        "type": "Template",
        "settings": {
          "paddingTop": 5,
          "paddingBottom": 5,
          "paddingLeft": 5,
          "paddingRight": 5,
          "fontFamily": "Courier New"
        }
      }
    },
    {
      "series-0": {
        "type": "WordCloud",
        "settings": {
          "categoryField": "tag",
          "valueField": "weight",
          "calculateAggregates": true,
          "angles": [
            0,
            0,
            0,
            -90
          ],
          "randomizeAngles": false,
          "autoAppear": true,
          "appearDuration": 1000,
          "appearDelay": 100,
          "heatRules": [
            {
              "target": "#template-0",
              "dataField": "value",
              "min": {
                "type": "Color",
                "value": "#ffd4c2"
              },
              "max": {
                "type": "Color",
                "value": "#ff621f"
              },
              "key": "fill",
              "__parse": true
            }
          ]
        },
        "properties": {
          "data": "#data-0",
          "labels": {
            "properties": {
              "template": "#template-0"
            }
          }
        }
      }
    }
  ]
}
```
