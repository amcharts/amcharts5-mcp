---
title: "Reversed Value Axis"
source: "https://www.amcharts.com/demos/reversed-value-axis/"
category: "line-area"
scraped: "2026-03-15"
---

In most common scenarios your line or column chart has a value axis that goes up from the bottom left corner (for positive values). But in some cases you may want to reverse this behavior. This demo shows you how to do it.
Key implementation details
Everything you need to enable this is included and there's no need to do any tricks or "massage" your data. Just set inversed: true on the axis renderer and it will take care of the rest.
Inversed axes
Value axis

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout,
    pinchZoomX: true
  })
);



// The data
var data = [
  {
    year: "1930",
    italy: 1,
    germany: 5,
    uk: 3
  },
  {
    year: "1934",
    italy: 1,
    germany: 2,
    uk: 6
  },
  {
    year: "1938",
    italy: 2,
    germany: 3,
    uk: 1
  },
  {
    year: "1950",
    italy: 3,
    germany: 4,
    uk: 1
  },
  {
    year: "1954",
    italy: 5,
    germany: 1,
    uk: 2
  },
  {
    year: "1958",
    italy: 3,
    germany: 2,
    uk: 1
  },
  {
    year: "1962",
    italy: 1,
    germany: 2,
    uk: 3
  },
  {
    year: "1966",
    italy: 2,
    germany: 1,
    uk: 5
  },
  {
    year: "1970",
    italy: 3,
    germany: 5,
    uk: 2
  },
  {
    year: "1974",
    italy: 4,
    germany: 3,
    uk: 6
  },
  {
    year: "1978",
    italy: 1,
    germany: 2,
    uk: 4
  }
];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minorGridEnabled: true
});
xRenderer.grid.template.set("location", 0.5);
xRenderer.labels.template.setAll({
  location: 0.5,
  multiLocation: 0.5
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {}),
    snapTooltip: true
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxPrecision: 0,
    renderer: am5xy.AxisRendererY.new(root, {
      inversed: true
    })
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {  
  alwaysShow: true,
  xAxis: xAxis,
  positionX: 1
}));

cursor.lineY.set("visible", false);
cursor.lineX.set("focusable", true);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      categoryXField: "year",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "[bold]{name}[/]
{categoryX}: {valueY}"
      })
    })
  );


  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill")
      })
    });
  });

  // create hover state for series and for mainContainer, so that when series is hovered,
  // the state would be passed down to the strokes which are in mainContainer.
  series.set("setStateOnChildren", true);
  series.states.create("hover", {});

  series.mainContainer.set("setStateOnChildren", true);
  series.mainContainer.states.create("hover", {});

  series.strokes.template.states.create("hover", {
    strokeWidth: 4
  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("Italy", "italy");
createSeries("Germany", "germany");
createSeries("UK", "uk");

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  marginBottom: 20
}));

var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

// Make series change state when legend item is hovered
legend.itemContainers.template.states.create("hover", {});

legend.itemContainers.template.events.on("pointerover", function (e) {
  e.target.dataItem.dataContext.hover();
});
legend.itemContainers.template.events.on("pointerout", function (e) {
  e.target.dataItem.dataContext.unhover();
});

legend.data.setAll(chart.series.values);

chart.plotContainer.events.on("pointerout", function(){
    cursor.set("positionX", 1)
})

chart.plotContainer.events.on("pointerover", function(){
  cursor.set("positionX", undefined)  
})

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
