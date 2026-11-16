---
title: "Custom PDF export"
source: "https://docs.amcharts.com/embeds/v5/custom-pdf-export/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/exporting/exporting-pdf"]
---

A demo from the docs page "Exporting PDF" (get_doc(path: "concepts/exporting/exporting-pdf")).

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250,
    value2: 200
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110,
    value2: 210
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185,
    value2: 85
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105,
    value2: 244
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 2
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Create axis ranges
function createRange(value, bullet) {
  var rangeDataItem = xAxis.makeDataItem({
    value: value
  });

  var range = xAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("grid").set("visible", false);

  rangeDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: am5.Picture.new(root, {
        width: 32,
        height: 32,
        centerX: am5.percent(0),
        centerY: am5.percent(100),
        src: bullet
      })
    })
  );
}

createRange(new Date(2021, 0, 3).getTime(), "https://docs.amcharts.com/assets/icon_flag_red.svg");
createRange(new Date(2021, 0, 10).getTime(), "https://docs.amcharts.com/assets/icon_flag_green.svg");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data
});

exporting.events.on("pdfdocready", function (event) {
  // Add title to the beginning
  event.doc.content.unshift({
    text: "Regional revenue comparison",
    margin: [0, 30],
    style: {
      fontSize: 25,
      bold: true
    }
  });

  event.doc.content.unshift({
    image:
      "data:image/png;base64,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",
    fit: [119, 54]
  });

  // Add a two-column intro
  event.doc.content.push({
    alignment: "justify",
    columns: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur."
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur."
      }
    ],

    columnGap: 20,
    margin: [0, 30]
  });
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
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/plugins/exporting.js
