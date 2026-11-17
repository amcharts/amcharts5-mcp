---
title: "JSON config with an opening animation"
source: "https://docs.amcharts.com/embeds/v5/json-config-with-an-opening-animation/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/serializing"]
---

A demo from the docs page "Serializing / JSON config" (get_doc(path: "concepts/serializing")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Chart config
// autoAppear gives the chart and series their opening animation, since a
// config can't call appear()
// https://docs.amcharts.com/v5/concepts/serializing/#opening-animation
var config = {
  type: "XYChart",
  refs: [
    {
      data: [
        { category: "Research", value: 1000 },
        { category: "Marketing", value: 1200 },
        { category: "Sales", value: 850 },
        { category: "Support", value: 600 }
      ]
    },

    {
      xAxis: {
        type: "CategoryAxis",
        settings: {
          categoryField: "category",
          renderer: { type: "AxisRendererX" }
        },

        properties: {
          data: "#data"
        }
      },

      yAxis: {
        type: "ValueAxis",
        settings: {
          renderer: { type: "AxisRendererY" }
        }
      }
    }
  ],

  settings: {
    autoAppear: true,
    appearDuration: 1000,
    appearDelay: 100
  },

  properties: {
    xAxes: ["#xAxis"],
    yAxes: ["#yAxis"],
    series: [
      {
        type: "ColumnSeries",
        settings: {
          xAxis: "#xAxis",
          yAxis: "#yAxis",
          valueYField: "value",
          categoryXField: "category",
          autoAppear: true,
          appearDuration: 1000
        },

        properties: {
          data: "#data"
        }
      }
    ]
  }
};

// Parse config into a chart
// https://docs.amcharts.com/v5/concepts/serializing/#parsing
am5plugins_json.JsonParser.new(root).parse(config, {
  parent: root.container
});
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
