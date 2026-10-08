---
title: "Bars with Moving Bullets"
source: "https://www.amcharts.com/demos/bars-with-moving-bullets/"
category: "column-bar"
scraped: "2026-10-08"
---

A bar chart with a photo on each bar. Point at a bar and the photo slides along it to the end. Here, step counts for six friends, the bars darker the more they walked.

When to add motion and faces: Photos make a ranking personal, and a small movement on hover invites people to explore it. It suits a team leaderboard or a social post more than a report, where the motion adds nothing to the numbers.

Good for:
- Team leaderboards and challenges
- Rankings of people, products or brands
- Social posts and presentations

Think twice when:
- More than about ten bars: the photos crowd each other
- Reports and printouts: nothing moves on paper
- Values close together: label them, the bars alone won’t tell them apart

Prompt: Create a horizontal bar chart of step counts for six people, shaded from light to dark by value, with each person’s round photo at the start of their bar. Hovering a bar slides its photo along to the bar’s end. Add tooltips. Use the amCharts 5 library with its Responsive theme.

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

var data = [
  {
    name: "Monica",
    steps: 45688,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/monica.jpg"
    }
  },
  {
    name: "Joey",
    steps: 35781,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/joey.jpg"
    }
  },
  {
    name: "Ross",
    steps: 25464,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/ross.jpg"
    }
  },
  {
    name: "Phoebe",
    steps: 18788,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/phoebe.jpg"
    }
  },
  {
    name: "Rachel",
    steps: 15465,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/rachel.jpg"
    }
  },
  {
    name: "Chandler",
    steps: 11561,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/assets/timeline/chandler.jpg"
    }
  }
];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,     // the plot doesn't pan when dragged
    panY: false,
    paddingLeft:0,   // the names sit at the chart's left edge
    paddingRight:30, // room for a photo at the end of the longest bar
    wheelX: "none",  // the mouse wheel doesn't zoom or pan
    wheelY: "none"
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

var yRenderer = am5xy.AxisRendererY.new(root, {
  minorGridEnabled:true
});
yRenderer.grid.template.set("visible", false); // no grid lines across the rows

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "name",
    renderer: yRenderer,
    paddingRight:40 // room between the names and the bars, for the photos
  })
);

var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance:80,   // at least 80px between labels; on narrow screens some are skipped
  minorGridEnabled:true // fainter grid lines between the labeled ones
});

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0, // the bars start at zero
    renderer: xRenderer
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Steps",
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "steps",
    categoryYField: "name",
    sequencedInterpolation: true, // the bars grow one after another
    // finds the lowest and highest steps, which the heat rules below color by
    calculateAggregates: true,
    // let the photos stick out past the plot area's edges
    maskBullets: false,
    tooltip: am5.Tooltip.new(root, {
      dy: -30,                        // 30px higher, above the photo
      pointerOrientation: "vertical", // it points up or down at the bar
      labelText: "{valueX}"           // the steps
    })
  })
);

series.columns.template.setAll({
  strokeOpacity: 0,   // no outline
  cornerRadiusBR: 10, // fully rounded ends
  cornerRadiusTR: 10,
  cornerRadiusBL: 10,
  cornerRadiusTL: 10,
  maxHeight: 50,      // bars no thicker than 50px
  fillOpacity: 0.8    // a little see-through
});

var currentlyHovered; // the bar whose photo is out at its end

// on hover, the photo slides from the start of its bar to the end, and back when the pointer leaves
series.columns.template.events.on("pointerover", function(e) {
  handleHover(e.target.dataItem);
});

series.columns.template.events.on("pointerout", function(e) {
  handleOut();
});

// slide the hovered bar's photo to its end, after sending the last one back
function handleHover(dataItem) {
  if (dataItem && currentlyHovered != dataItem) {
    handleOut();
    currentlyHovered = dataItem;
    var bullet = dataItem.bullets[0];
    bullet.animate({
      key: "locationX",
      to: 1,         // to the end of the bar
      duration: 600, // in 0.6 seconds
      easing: am5.ease.out(am5.ease.cubic)
    });
  }
}

// slide the photo back to the start of its bar
function handleOut() {
  if (currentlyHovered) {
    var bullet = currentlyHovered.bullets[0];
    bullet.animate({
      key: "locationX",
      to: 0,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic)
    });
  }
}

var circleTemplate = am5.Template.new({}); // one template for all the circles, so the heat rule can color them

series.bullets.push(function(root, series, dataItem) {
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
    locationX: 0, // the photo starts at the beginning of the bar
    sprite: bulletContainer
  });
});

// heatrule: the series' color from the theme, a light tint for the fewest steps and the full color for the most
var heatMax = series.get("fill");
var heatMin = am5.Color.lighten(heatMax, 0.6);
series.set("heatRules", [
  {
    dataField: "valueX",
    min: heatMin, // the fewest steps get the light tint...
    max: heatMax, // ...the most, the full color
    target: series.columns.template,
    key: "fill"
  },
  {
    dataField: "valueX",
    min: heatMin,
    max: heatMax,
    target: circleTemplate, // the rings get the same colors
    key: "fill"
  }
]);

series.data.setAll(data);
yAxis.data.setAll(data);

var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineX.set("visible", false); // no cursor lines
cursor.lineY.set("visible", false);

// the row under the cursor counts as hovered too, even where the pointer misses the bar
cursor.events.on("cursormoved", function() {
  var dataItem = series.get("tooltip").dataItem;
  if (dataItem) {
    handleHover(dataItem)
  }
  else {
    handleOut();
  }
})

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
