---
title: "Interactive Wheel of Life"
source: "https://www.amcharts.com/demos/wheel-of-life/"
category: "radar-polar"
scraped: "2026-03-15"
---

This is an interactive version of a classic "Wheel of Life" diagram, used to visualize what areas of one's life are important.
Radar chart
Radar axes

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
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX"
}));

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {});
xRenderer.labels.template.setAll({
  radius: 10
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "category",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 10,
  renderer: am5radar.AxisRendererRadial.new(root, {
    minGridDistance: 20
  })
}));

yAxis.get("renderer").labels.template.set("forceHidden", true);

// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "category"
}));

series.columns.template.setAll({
  tooltipText: "{categoryX}: {valueY}",
  templateField: "columnSettings",
  strokeOpacity: 0,
  width: am5.p100
});

// Set data
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
var data = [{
  category: "Health",
  value: 0,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  category: "Career",
  value: 0,
  columnSettings: {
    fill: chart.get("colors").next()
            }
}, {
  category: "Love",
  value: 0,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  category: "Spirituality",
  value: 0,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  category: "Family",
  value: 0,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  category: "Money",
  value: 0,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  category: "Fun",
  value: 0,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}, {
  category: "Friends",
  value: 0,
  columnSettings: {
    fill: chart.get("colors").next()
  }
}];

series.data.setAll(data);
xAxis.data.setAll(data);

// Animate chart
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
series.appear(1000);
chart.appear(1000, 100);

// Function for updating value
function setValue(index, value) {
  
  // Set value
  var row = data[index];
  row.value = value;
  console.log(row)
  series.data.setIndex(index, {
    category: row.category,
    value: value,
    columnSettings: row.columnSettings
  });
  
  // Reveal next question
  var areas = document.getElementsByClassName("area");
  for(var i = 0; i < areas.length; i++) {
    areas[i].style.display = (index + 1) === i ? "block" : "none";
  }
  
}
```

## HTML

```html
<div class="areas">
  <div class="area">
    <h3>Health</h3>
    <div class="values">
      <div class="value" onclick="setValue(0, 1);">1</div>
      <div class="value" onclick="setValue(0, 2);">2</div>
      <div class="value" onclick="setValue(0, 3);">3</div>
      <div class="value" onclick="setValue(0, 4);">4</div>
      <div class="value" onclick="setValue(0, 5);">5</div>
      <div class="value" onclick="setValue(0, 6);">6</div>
      <div class="value" onclick="setValue(0, 7);">7</div>
      <div class="value" onclick="setValue(0, 8);">8</div>
      <div class="value" onclick="setValue(0, 9);">9</div>
      <div class="value" onclick="setValue(0, 10);">10</div>
    </div>
  </div>
  <div class="area" style="display: none;">
    <h3>Career</h3>
    <div class="values">
      <div class="value" onclick="setValue(1, 1);">1</div>
      <div class="value" onclick="setValue(1, 2);">2</div>
      <div class="value" onclick="setValue(1, 3);">3</div>
      <div class="value" onclick="setValue(1, 4);">4</div>
      <div class="value" onclick="setValue(1, 5);">5</div>
      <div class="value" onclick="setValue(1, 6);">6</div>
      <div class="value" onclick="setValue(1, 7);">7</div>
      <div class="value" onclick="setValue(1, 8);">8</div>
      <div class="value" onclick="setValue(1, 9);">9</div>
      <div class="value" onclick="setValue(1, 10);">10</div>
    </div>
  </div>
  <div class="area" style="display: none;">
    <h3>Love</h3>
    <div class="values">
      <div class="value" onclick="setValue(2, 1);">1</div>
      <div class="value" onclick="setValue(2, 2);">2</div>
      <div class="value" onclick="setValue(2, 3);">3</div>
      <div class="value" onclick="setValue(2, 4);">4</div>
      <div class="value" onclick="setValue(2, 5);">5</div>
      <div class="value" onclick="setValue(2, 6);">6</div>
      <div class="value" onclick="setValue(2, 7);">7</div>
      <div class="value" onclick="setValue(2, 8);">8</div>
      <div class="value" onclick="setValue(2, 9);">9</div>
      <div class="value" onclick="setValue(2, 10);">10</div>
    </div>
  </div>
  <div class="area" style="display: none;">
    <h3>Spirituality</h3>
    <div class="values">
      <div class="value" onclick="setValue(3, 1);">1</div>
      <div class="value" onclick="setValue(3, 2);">2</div>
      <div class="value" onclick="setValue(3, 3);">3</div>
      <div class="value" onclick="setValue(3, 4);">4</div>
      <div class="value" onclick="setValue(3, 5);">5</div>
      <div class="value" onclick="setValue(3, 6);">6</div>
      <div class="value" onclick="setValue(3, 7);">7</div>
      <div class="value" onclick="setValue(3, 8);">8</div>
      <div class="value" onclick="setValue(3, 9);">9</div>
      <div class="value" onclick="setValue(3, 10);">10</div>
    </div>
  </div>
  <div class="area" style="display: none;">
    <h3>Family</h3>
    <div class="values">
      <div class="value" onclick="setValue(4, 1);">1</div>
      <div class="value" onclick="setValue(4, 2);">2</div>
      <div class="value" onclick="setValue(4, 3);">3</div>
      <div class="value" onclick="setValue(4, 4);">4</div>
      <div class="value" onclick="setValue(4, 5);">5</div>
      <div class="value" onclick="setValue(4, 6);">6</div>
      <div class="value" onclick="setValue(4, 7);">7</div>
      <div class="value" onclick="setValue(4, 8);">8</div>
      <div class="value" onclick="setValue(4, 9);">9</div>
      <div class="value" onclick="setValue(4, 10);">10</div>
    </div>
  </div>
  <div class="area" style="display: none;">
    <h3>Money</h3>
    <div class="values">
      <div class="value" onclick="setValue(5, 1);">1</div>
      <div class="value" onclick="setValue(5, 2);">2</div>
      <div class="value" onclick="setValue(5, 3);">3</div>
      <div class="value" onclick="setValue(5, 4);">4</div>
      <div class="value" onclick="setValue(5, 5);">5</div>
      <div class="value" onclick="setValue(5, 6);">6</div>
      <div class="value" onclick="setValue(5, 7);">7</div>
      <div class="value" onclick="setValue(5, 8);">8</div>
      <div class="value" onclick="setValue(5, 9);">9</div>
      <div class="value" onclick="setValue(5, 10);">10</div>
    </div>
  </div>
  <div class="area" style="display: none;">
    <h3>Fun</h3>
    <div class="values">
      <div class="value" onclick="setValue(6, 1);">1</div>
      <div class="value" onclick="setValue(6, 2);">2</div>
      <div class="value" onclick="setValue(6, 3);">3</div>
      <div class="value" onclick="setValue(6, 4);">4</div>
      <div class="value" onclick="setValue(6, 5);">5</div>
      <div class="value" onclick="setValue(6, 6);">6</div>
      <div class="value" onclick="setValue(6, 7);">7</div>
      <div class="value" onclick="setValue(6, 8);">8</div>
      <div class="value" onclick="setValue(6, 9);">9</div>
      <div class="value" onclick="setValue(6, 10);">10</div>
    </div>
  </div>
  <div class="area" style="display: none;">
    <h3>Friends</h3>
    <div class="values">
      <div class="value" onclick="setValue(7, 1);">1</div>
      <div class="value" onclick="setValue(7, 2);">2</div>
      <div class="value" onclick="setValue(7, 3);">3</div>
      <div class="value" onclick="setValue(7, 4);">4</div>
      <div class="value" onclick="setValue(7, 5);">5</div>
      <div class="value" onclick="setValue(7, 6);">6</div>
      <div class="value" onclick="setValue(7, 7);">7</div>
      <div class="value" onclick="setValue(7, 8);">8</div>
      <div class="value" onclick="setValue(7, 9);">9</div>
      <div class="value" onclick="setValue(7, 10);">10</div>
    </div>
  </div>
  
  <div class="area" style="display: none;">
    <h3>All done!</h3>
  </div>
</div>
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 600px;
}

.areas {
  text-align: center;
  margin-bottom: 15px;
  min-height: 95px;
}

.areas .value {
  display: inline-block;
  font-size: 1.3em;
  padding: 5px 10px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.areas .value:hover {
  background: #ecc;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
