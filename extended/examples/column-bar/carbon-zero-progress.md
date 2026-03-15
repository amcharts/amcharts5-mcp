---
title: "Carbon-zero Progress"
source: "https://www.amcharts.com/demos/carbon-zero-progress/"
category: "column-bar"
scraped: "2026-03-15"
---

amCharts flexibility allows you to go way beyond canonical chart types and use our libraries to build vast variety of data visualizations. In this demo we use the XY chart to implement a beautiful progress bar.
Key implementation details
This visualization is essentially a column chart with equal values for all columns. The data includes a columnSettings object containing the fill color that is applied by setting templateField to columnSettings. Additionally, we have currentBullet and targetBullet data fields on the corresponding items. These values are used to selectively apply the pin and the goal circle bullets on the corresponding columns.
XY chart
Column series
Bullets
List templates

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
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "none",
  wheelY: "none",
  layout: root.verticalLayout,
  paddingRight: 30
}));


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

var data = [{
  category: "15",
  value: 100,
  columnSettings: {
    fill: am5.color(0xc6251a)
  }
}, {
  category: "14",
  value: 100,
  columnSettings: {
    fill: am5.color(0xc6251a)
  }
}, {
  category: "13",
  value: 100,
  columnSettings: {
    fill: am5.color(0xc6251a)
  }
}, {
  category: "12",
  value: 100,
  columnSettings: {
    fill: am5.color(0xc6251a)
  }
}, {
  category: "11",
  value: 100,
  columnSettings: {
    fill: am5.color(0xc6251a)
  }
}, {
  category: "10",
  value: 100,
  currentBullet: true,
  columnSettings: {
    fill: am5.color(0xfcc034)
  }
}, {
  category: "9",
  value: 100,
  columnSettings: {
    fill: am5.color(0xfcc034)
  }
}, {
  category: "8",
  value: 100,
  columnSettings: {
    fill: am5.color(0xfcc034)
  }
}, {
  category: "7",
  value: 100,
  columnSettings: {
    fill: am5.color(0xfcc034)
  }
}, {
  category: "6",
  value: 100,
  columnSettings: {
    fill: am5.color(0xfcc034)
  }
}, {
  category: "5",
  value: 100,
  columnSettings: {
    fill: am5.color(0x6bc352)
  }
}, {
  category: "4",
  value: 100,
  columnSettings: {
    fill: am5.color(0x6bc352)
  }
}, {
  category: "3",
  value: 100,
  columnSettings: {
    fill: am5.color(0x6bc352)
  }
}, {
  category: "2",
  value: 100,
  columnSettings: {
    fill: am5.color(0x6bc352)
  }
}, {
  category: "1",
  value: 100,
  columnSettings: {
    fill: am5.color(0x6bc352)
  }
}, {
  category: "0",
  value: 100,
  targetBullet: true,
  columnSettings: {
    fill: am5.color(0xffffff)
  }  
}];


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {

  }),
  tooltip: am5.Tooltip.new(root, {})
}));

var xRenderer = xAxis.get("renderer");

xRenderer.grid.template.set("forceHidden", true);
xRenderer.labels.template.set("forceHidden", true);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 400,
  strictMinMax: true,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var yRenderer = yAxis.get("renderer");

yRenderer.grid.template.set("forceHidden", true);
yRenderer.labels.template.set("forceHidden", true);


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "category",
  maskBullets: false
}));

series.columns.template.setAll({
  //tooltipText: "{categoryX}: {valueY}",
  width: am5.p100,
  tooltipY: 0,
  strokeOpacity: 1,
  strokeWidth:2,
  stroke:am5.color(0xffffff),
  templateField: "columnSettings"
});

series.bullets.push(function(root, target, dataItem) {
  if (dataItem.dataContext.currentBullet) {
    var container = am5.Container.new(root, {});
    
    var pin = container.children.push(am5.Graphics.new(root, {
      fill: dataItem.dataContext.columnSettings.fill,
      dy: -5,
      centerY: am5.p100,
      centerX: am5.p50,
      svgPath: "M66.9 41.8c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4 0 11.3 20.4 32.4 20.4 32.4s20.4-21.1 20.4-32.4zM37 41.4c0-5.2 4.3-9.5 9.5-9.5s9.5 4.2 9.5 9.5c0 5.2-4.2 9.5-9.5 9.5-5.2 0-9.5-4.3-9.5-9.5z"
    }));
    
    var label = container.children.push(am5.Label.new(root, {
      text: dataItem.get("categoryX"),
      dy: -38,
      centerY: am5.p50,
      centerX: am5.p50,
      populateText: true,
      paddingTop: 5,
      paddingRight: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      background: am5.RoundedRectangle.new(root, {
        fill: am5.color(0xffffff),
        cornerRadiusTL: 20,
        cornerRadiusTR: 20,
        cornerRadiusBR: 20,
        cornerRadiusBL: 20,
      })
    }));
    
    return am5.Bullet.new(root, {
      locationY: 1,
      sprite: container
    });
  }
  else if (dataItem.dataContext.targetBullet) {
    var container = am5.Container.new(root, {
      dx: 15
    });
    
    var circle = container.children.push(am5.Circle.new(root, {
      radius: 34,
      fill: am5.color(0x11326d),
    }));
    
    var label = container.children.push(am5.Label.new(root, {
      text: "GOAL
[bold]ZERO[/]",
      textAlign: "center",
      //fontSize: "10",
      fill: am5.color(0xffffff),
      centerY: am5.p50,
      centerX: am5.p50,
      populateText: true,
    }));
    return am5.Bullet.new(root, {
      locationY: 0.5,
      sprite: container
    });
  }
  return false;
});

series.data.setAll(data);

// Add labels
function addAxisLabel(category, text) {
  var rangeDataItem = xAxis.makeDataItem({
    category: category
  });
  
  var range = xAxis.createAxisRange(rangeDataItem);

  range.get("label").setAll({
    //fill: am5.color(0xffffff),
    text: text,
    forceHidden: false
  });

  range.get("grid").setAll({
    //stroke: color,
    strokeOpacity: 1,
    location: 1
  });
}

addAxisLabel("15", "20+");
addAxisLabel("10", "10");
addAxisLabel("5", "5");


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000, 100);
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
  height: 130px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
