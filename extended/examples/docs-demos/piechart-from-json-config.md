---
title: "PieChart from JSON config"
source: "https://docs.amcharts.com/embeds/v5/piechart-from-json-config/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/serializing"]
---

A demo from the docs page "Serializing / JSON config" (get_doc(path: "concepts/serializing")).

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

// Specify date fields, so that they are formatted accordingly in tooltips
// https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/#formatting-placeholders
root.dateFormatter.setAll({
  dateFields: ["valueX"]
});

// Parse chart config
// https://docs.amcharts.com/v5/concepts/serializing/
am5plugins_json.JsonParser.new(root)
  .parse(
    {
      refs: [
        {
          data: [
            {
              country: "France",
              sales: 100000
            },
            {
              country: "Spain",
              sales: 160000
            },
            {
              country: "United Kingdom",
              sales: 80000
            }
          ]
        },

        {
          series: {
            type: "PieSeries",
            settings: {
              name: "Series",
              valueField: "sales",
              categoryField: "country"
            },

            properties: {
              data: "#data"
            }
          }
        }
      ],

      type: "PieChart",
      settings: {
        layout: "vertical"
      },

      properties: {
        series: ["#series"]
      },

      children: [
        {
          type: "Legend",
          settings: {
            centerX: {
              type: "Percent",
              value: 50
            },

            x: {
              type: "Percent",
              value: 50
            },

            layout: "horizontal"
          },

          properties: {
            data: "#series.dataItems"
          }
        }
      ]
    },

    {
      parent: root.container
    }
  )
  .then(function (chart) {
    // Make stuff animate on load
    // https://docs.amcharts.com/v5/concepts/animations/#forcing-appearance-animation
    chart.series.getIndex(0).appear(1000);
    chart.appear(1000, 100);
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
