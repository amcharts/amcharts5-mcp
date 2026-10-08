---
title: "Columns with Moving Bullets"
source: "https://www.amcharts.com/demos/columns-with-moving-bullets/"
category: "column-bar"
scraped: "2026-10-08"
---

The column version of moving photos: each column has a photo at its foot, and when you point at a column, the photo climbs to its top. Step counts for six friends, darker the higher.

When moving photos help: A photo on each column turns a ranking into people, and the climb on hover rewards anyone who explores. Columns suit a handful of short names; with longer names or more people, the bar version gives the photos more room.

Good for:
- A handful of people or products
- Leaderboards on screens and in posts
- Playful dashboards and infographics

Think twice when:
- More than about eight columns: the photos overlap
- Touch screens: with no hover, few people find the motion
- Values close together: add value labels

Prompt: Create a column chart of step counts for six people, shaded from light to dark by value, with each person’s round photo at the foot of their column. Hovering a column makes its photo climb to the top. Add tooltips. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

var data = [{
  name: "Monica",
  steps: 45688,
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/monica.jpg"
  }
}, {
  name: "Joey",
  steps: 35781,
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/joey.jpg"
  }
}, {
  name: "Ross",
  steps: 25464,
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/ross.jpg"
  }
}, {
  name: "Phoebe",
  steps: 18788,
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/phoebe.jpg"
  }
}, {
  name: "Rachel",
  steps: 15465,
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/rachel.jpg"
  }
}, {
  name: "Chandler",
  steps: 11561,
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/chandler.jpg"
  }
}];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,    // the plot doesn't pan when dragged
    panY: false,
    wheelX: "none", // the mouse wheel doesn't zoom or pan
    wheelY: "none",
    // room above the tallest column for its photo and tooltip
    paddingTop: 50
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

var xRenderer = am5xy.AxisRendererX.new(root, {
  minorGridEnabled:true,
  minGridDistance:60 // at least 60px between labels; on narrow screens some are skipped
});
xRenderer.grid.template.set("visible", false); // no vertical grid lines

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    // room above the names for the photos, which start at the foot of each column
    paddingTop:40,
    categoryField: "name",
    renderer: xRenderer
  })
);

var yRenderer = am5xy.AxisRendererY.new(root, {});
yRenderer.grid.template.set("strokeDasharray", [3]); // dashed grid lines
// the vertical grid lines get the same dash, for when they are shown
xRenderer.grid.template.set("strokeDasharray", [3]);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0, // the columns start at zero
    renderer: yRenderer
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Steps",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "steps",
    categoryXField: "name",
    sequencedInterpolation: true, // the columns grow one after another
    calculateAggregates: true,    // finds the lowest and highest steps, for the heat rules below
    // let the photos stick out past the plot area's edges
    maskBullets: false,
    tooltip: am5.Tooltip.new(root, {
      dy: -30,                        // 30px higher, above the photo
      pointerOrientation: "vertical", // it points up or down at the column
      labelText: "{valueY}"           // the steps
    })
  })
);

series.columns.template.setAll({
  strokeOpacity: 0,   // no outline
  cornerRadiusBR: 10, // fully rounded ends
  cornerRadiusTR: 10,
  cornerRadiusBL: 10,
  cornerRadiusTL: 10,
  maxWidth: 50,       // columns no wider than 50px
  fillOpacity: 0.8    // a little see-through
});

var currentlyHovered; // the column whose photo is up at its top

// on hover, the photo slides from the foot of its column to the top, and back when the pointer goes
series.columns.template.events.on("pointerover", function (e) {
  handleHover(e.target.dataItem);
});

series.columns.template.events.on("pointerout", function (e) {
  handleOut();
});

// slide the hovered column's photo to its top, after sending the last one back
function handleHover(dataItem) {
  if (dataItem && currentlyHovered != dataItem) {
    handleOut();
    currentlyHovered = dataItem;
    var bullet = dataItem.bullets[0];
    bullet.animate({
      key: "locationY",
      to: 1,         // to the top of the column
      duration: 600, // in 0.6 seconds
      easing: am5.ease.out(am5.ease.cubic)
    });
  }
}

// slide the photo back to the foot of its column
function handleOut() {
  if (currentlyHovered) {
    var bullet = currentlyHovered.bullets[0];
    bullet.animate({
      key: "locationY",
      to: 0,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic)
    });
  }
}

var circleTemplate = am5.Template.new({}); // one template for all the circles, so the heat rule can color them

series.bullets.push(function (root, series, dataItem) {
  var bulletContainer = am5.Container.new(root, {});
  var circle = bulletContainer.children.push(
    am5.Circle.new(
      root,
      {
        radius: 34 // a colored ring around the photo
      },
      circleTemplate
    )
  );

  var maskCircle = bulletContainer.children.push(
    am5.Circle.new(root, { radius: 27 }) // the photo is cut to this circle
  );

  // only containers can be masked, so we add image to another container
  var imageContainer = bulletContainer.children.push(
    am5.Container.new(root, {
      mask: maskCircle
    })
  );

  var image = imageContainer.children.push(
    am5.Picture.new(root, {
      templateField: "pictureSettings", // the photo's src from each data item's pictureSettings
      centerX: am5.p50,                 // centered on the bullet
      centerY: am5.p50,
      width: 60,                        // a 60px photo, cut to the circle above
      height: 60
    })
  );

  return am5.Bullet.new(root, {
    locationY: 0, // the photo starts at the foot of the column
    sprite: bulletContainer
  });
});

// heatrule: the series' color from the theme, a light tint for the fewest steps and the full color for the most
var heatMax = series.get("fill");
var heatMin = am5.Color.lighten(heatMax, 0.6);
series.set("heatRules", [
  {
    dataField: "valueY",
    min: heatMin, // the fewest steps get the light tint...
    max: heatMax, // ...the most, the full color
    target: series.columns.template,
    key: "fill"
  },
  {
    dataField: "valueY",
    min: heatMin,
    max: heatMax,
    target: circleTemplate, // the rings get the same colors
    key: "fill"
  }
]);

series.data.setAll(data);
xAxis.data.setAll(data);

var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineX.set("visible", false); // no cursor lines
cursor.lineY.set("visible", false);

// the column under the cursor counts as hovered too, even where the pointer misses it
cursor.events.on("cursormoved", function () {
  var dataItem = series.get("tooltip").dataItem;
  if (dataItem) {
    handleHover(dataItem);
  } else {
    handleOut();
  }
});

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
