---
title: "Stacked Column Chart (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.3: examples/xy-stacked-column/config.json"
---

# Stacked Column Chart (JSON config)

Six column series stacked on a category axis, with value labels and a legend.

Chart family: xy · Tags: column, stacked, category axis, legend

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/xy-stacked-column/config.json, version 5.21.3). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "XYChart",
  "settings": {
    "panX": false,
    "panY": false,
    "wheelX": "panX",
    "wheelY": "zoomX",
    "layout": {
      "type": "VerticalLayout"
    },
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "series": [
      "#series-0",
      "#series-1",
      "#series-2",
      "#series-3",
      "#series-4",
      "#series-5"
    ],
    "xAxes": [
      "#axis-0"
    ],
    "yAxes": [
      "#axis-1"
    ]
  },
  "children": [
    {
      "type": "Legend",
      "settings": {
        "centerX": {
          "type": "Percent",
          "value": 50
        },
        "x": {
          "type": "Percent",
          "value": 50
        }
      },
      "properties": {
        "data": [
          "#series-0",
          "#series-1",
          "#series-2",
          "#series-3",
          "#series-4",
          "#series-5"
        ]
      }
    }
  ],
  "refs": [
    {
      "data-0": [
        {
          "year": "2021",
          "europe": 2.5,
          "namerica": 2.5,
          "asia": 2.1,
          "lamerica": 1,
          "meast": 0.8,
          "africa": 0.4
        },
        {
          "year": "2022",
          "europe": 2.6,
          "namerica": 2.7,
          "asia": 2.2,
          "lamerica": 0.5,
          "meast": 0.4,
          "africa": 0.3
        },
        {
          "year": "2023",
          "europe": 2.8,
          "namerica": 2.9,
          "asia": 2.4,
          "lamerica": 0.3,
          "meast": 0.9,
          "africa": 0.5
        }
      ]
    },
    {
      "axis-0": {
        "type": "CategoryAxis",
        "settings": {
          "categoryField": "year",
          "renderer": {
            "type": "AxisRendererX"
          }
        },
        "properties": {
          "data": "#data-0"
        }
      }
    },
    {
      "axis-1": {
        "type": "ValueAxis",
        "settings": {
          "min": 0,
          "renderer": {
            "type": "AxisRendererY"
          }
        }
      }
    },
    {
      "series-0": {
        "type": "ColumnSeries",
        "settings": {
          "name": "Europe",
          "stacked": true,
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "europe",
          "categoryXField": "year",
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "columns": {
            "properties": {
              "template": {
                "settings": {
                  "tooltipText": "{name}, {categoryX}: {valueY}",
                  "tooltipY": {
                    "type": "Percent",
                    "value": 10
                  }
                }
              }
            }
          },
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Label",
                  "settings": {
                    "text": "{valueY}",
                    "fill": {
                      "type": "Color",
                      "value": "#ffffff"
                    },
                    "centerY": {
                      "type": "Percent",
                      "value": 50
                    },
                    "centerX": {
                      "type": "Percent",
                      "value": 50
                    },
                    "populateText": true
                  }
                }
              }
            }
          ]
        }
      }
    },
    {
      "series-1": {
        "type": "ColumnSeries",
        "settings": {
          "name": "North America",
          "stacked": true,
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "namerica",
          "categoryXField": "year",
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "columns": {
            "properties": {
              "template": {
                "settings": {
                  "tooltipText": "{name}, {categoryX}: {valueY}",
                  "tooltipY": {
                    "type": "Percent",
                    "value": 10
                  }
                }
              }
            }
          },
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Label",
                  "settings": {
                    "text": "{valueY}",
                    "fill": {
                      "type": "Color",
                      "value": "#ffffff"
                    },
                    "centerY": {
                      "type": "Percent",
                      "value": 50
                    },
                    "centerX": {
                      "type": "Percent",
                      "value": 50
                    },
                    "populateText": true
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
        "type": "ColumnSeries",
        "settings": {
          "name": "Asia",
          "stacked": true,
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "asia",
          "categoryXField": "year",
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "columns": {
            "properties": {
              "template": {
                "settings": {
                  "tooltipText": "{name}, {categoryX}: {valueY}",
                  "tooltipY": {
                    "type": "Percent",
                    "value": 10
                  }
                }
              }
            }
          },
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Label",
                  "settings": {
                    "text": "{valueY}",
                    "fill": {
                      "type": "Color",
                      "value": "#ffffff"
                    },
                    "centerY": {
                      "type": "Percent",
                      "value": 50
                    },
                    "centerX": {
                      "type": "Percent",
                      "value": 50
                    },
                    "populateText": true
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
        "type": "ColumnSeries",
        "settings": {
          "name": "Latin America",
          "stacked": true,
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "lamerica",
          "categoryXField": "year",
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "columns": {
            "properties": {
              "template": {
                "settings": {
                  "tooltipText": "{name}, {categoryX}: {valueY}",
                  "tooltipY": {
                    "type": "Percent",
                    "value": 10
                  }
                }
              }
            }
          },
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Label",
                  "settings": {
                    "text": "{valueY}",
                    "fill": {
                      "type": "Color",
                      "value": "#ffffff"
                    },
                    "centerY": {
                      "type": "Percent",
                      "value": 50
                    },
                    "centerX": {
                      "type": "Percent",
                      "value": 50
                    },
                    "populateText": true
                  }
                }
              }
            }
          ]
        }
      }
    },
    {
      "series-4": {
        "type": "ColumnSeries",
        "settings": {
          "name": "Middle East",
          "stacked": true,
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "meast",
          "categoryXField": "year",
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "columns": {
            "properties": {
              "template": {
                "settings": {
                  "tooltipText": "{name}, {categoryX}: {valueY}",
                  "tooltipY": {
                    "type": "Percent",
                    "value": 10
                  }
                }
              }
            }
          },
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Label",
                  "settings": {
                    "text": "{valueY}",
                    "fill": {
                      "type": "Color",
                      "value": "#ffffff"
                    },
                    "centerY": {
                      "type": "Percent",
                      "value": 50
                    },
                    "centerX": {
                      "type": "Percent",
                      "value": 50
                    },
                    "populateText": true
                  }
                }
              }
            }
          ]
        }
      }
    },
    {
      "series-5": {
        "type": "ColumnSeries",
        "settings": {
          "name": "Africa",
          "stacked": true,
          "xAxis": "#axis-0",
          "yAxis": "#axis-1",
          "valueYField": "africa",
          "categoryXField": "year",
          "autoAppear": true,
          "appearDuration": 1000
        },
        "properties": {
          "data": "#data-0",
          "columns": {
            "properties": {
              "template": {
                "settings": {
                  "tooltipText": "{name}, {categoryX}: {valueY}",
                  "tooltipY": {
                    "type": "Percent",
                    "value": 10
                  }
                }
              }
            }
          },
          "bullets": [
            {
              "type": "Bullet",
              "settings": {
                "sprite": {
                  "type": "Label",
                  "settings": {
                    "text": "{valueY}",
                    "fill": {
                      "type": "Color",
                      "value": "#ffffff"
                    },
                    "centerY": {
                      "type": "Percent",
                      "value": 50
                    },
                    "centerX": {
                      "type": "Percent",
                      "value": 50
                    },
                    "populateText": true
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
