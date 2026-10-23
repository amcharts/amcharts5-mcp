---
title: "Gantt Chart with Subtasks (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/gantt-multilevel/config.json"
---

# Gantt Chart with Subtasks (JSON config)

A Gantt chart with parent tasks and subtasks, set up with parentId in the category data.

Chart family: gantt · Tags: gantt, subtasks, parent tasks, links

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/gantt-multilevel/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/plugins/colorPicker.js
- https://cdn.amcharts.com/lib/5/gantt.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "Gantt",
  "settings": {
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "yAxis": {
      "properties": {
        "data": "#data-0"
      }
    },
    "series": {
      "properties": {
        "data": "#data-1"
      }
    }
  },
  "refs": [
    {
      "data-0": [
        {
          "id": "kickoff",
          "name": "Kick-off",
          "color": "#6794dc"
        },
        {
          "id": "design",
          "name": "Design",
          "color": "#6771dc",
          "collapsed": false
        },
        {
          "id": "wireframes",
          "name": "Wireframes",
          "parentId": "design",
          "color": "#6771dc"
        },
        {
          "id": "visuals",
          "name": "Visual design",
          "parentId": "design",
          "color": "#6771dc"
        },
        {
          "id": "development",
          "name": "Development",
          "color": "#8067dc",
          "collapsed": false
        },
        {
          "id": "frontend",
          "name": "Front end",
          "parentId": "development",
          "color": "#8067dc"
        },
        {
          "id": "backend",
          "name": "Back end",
          "parentId": "development",
          "color": "#8067dc"
        },
        {
          "id": "testing",
          "name": "Testing",
          "parentId": "development",
          "color": "#8067dc"
        },
        {
          "id": "launch",
          "name": "Launch",
          "color": "#a367dc"
        }
      ]
    },
    {
      "data-1": [
        {
          "id": "kickoff",
          "start": 1758142800000,
          "duration": 0,
          "progress": 1,
          "linkTo": [
            "design"
          ],
          "end": 1758142800000,
          "__parse": true
        },
        {
          "id": "design",
          "linkTo": [
            "development"
          ],
          "__parse": true
        },
        {
          "id": "wireframes",
          "start": 1758142800000,
          "duration": 2,
          "progress": 1,
          "linkTo": [
            "visuals"
          ],
          "end": 1758315600000,
          "__parse": true
        },
        {
          "id": "visuals",
          "start": 1758488400000,
          "duration": 4,
          "progress": 0.75,
          "end": 1758834000000
        },
        {
          "id": "development",
          "linkTo": [
            "launch"
          ],
          "__parse": true
        },
        {
          "id": "frontend",
          "start": 1758834000000,
          "duration": 4,
          "progress": 0.2,
          "linkTo": [
            "testing"
          ],
          "end": 1759352400000,
          "__parse": true
        },
        {
          "id": "backend",
          "start": 1758834000000,
          "duration": 3,
          "progress": 0,
          "linkTo": [
            "testing"
          ],
          "end": 1759266000000,
          "__parse": true
        },
        {
          "id": "testing",
          "start": 1759352400000,
          "duration": 2,
          "progress": 0,
          "end": 1759525200000
        },
        {
          "id": "launch",
          "start": 1759698000000,
          "duration": 0,
          "progress": 0,
          "end": 1759698000000
        }
      ]
    }
  ]
}
```
