---
title: "Interactive Wheel of Life"
source: "https://www.amcharts.com/demos/wheel-of-life/"
category: "radar-polar"
scraped: "2026-10-08"
---

A wheel of life asks how satisfied you are with eight areas of life and draws the answers as a ring of slices. Pick a score for each area and watch the wheel fill in.

A chart that people fill in: The wheel of life is a coaching exercise: rate each area of life from 1 to 10, and the wheel shows at a glance which areas are full and which need attention. A radar column chart draws it with one slice per area and the score as its length. The same setup works for any self-assessment on a fixed scale.

Good for:
- Self-assessments and coaching tools
- Surveys on a fixed 1 to 10 scale
- Quizzes that build a chart as people answer

Think twice when:
- Comparing many people: use a grouped bar chart
- Scores on different scales
- More than a dozen areas: the slices get thin

Prompt: Create an interactive wheel of life: a radar column chart of eight areas of life, such as health, career and family, that starts empty. Above it, a question asks you to rate one area at a time from 1 to 10 with buttons; each answer fills that area’s column, and a button starts over at the end. Use the amCharts 5 library with its Responsive theme.

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

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false, // no panning or zooming: the wheel stays as it is
  panY: false,
  wheelX: "none",
  wheelY: "none"
}));

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
// every area keeps its label, also on a small chart
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 10
});
xRenderer.labels.template.setAll({
  radius: 10 // names 10px outside the circle
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "category",
  renderer: xRenderer
}));

// The scale runs from 0 to 10
var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 10,
  renderer: am5radar.AxisRendererRadial.new(root, {
    minGridDistance: 20 // rings at least 20px apart
  })
}));

yAxis.get("renderer").labels.template.set("forceHidden", true); // no numbers on the scale

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
  templateField: "columnSettings", // each area takes its color from the data
  strokeOpacity: 0,                // no outline
  // each column fills its whole slice of the circle, with no gap to its neighbors
  width: am5.p100
});

// Set data: eight areas of life, each in its own color, all at 0 until rated
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
var areas = ["Health", "Career", "Love", "Spirituality", "Family", "Money", "Fun", "Friends"];
var data = areas.map(function(area) {
  return {
    category: area,
    value: 0,
    columnSettings: {
      fill: chart.get("colors").next() // the theme's next color
    }
  };
});

series.data.setAll(data);
xAxis.data.setAll(data);

// Animate chart
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
series.appear(1000);
chart.appear(1000, 100);

// The questions above the chart: one area at a time, rated from 1 to 10
var question = document.querySelector(".question");
var questionText = document.getElementById("question-text");
var answers = document.getElementById("answers");
var current = 0;

// The questions take the chart's text color, so they follow its theme, light or dark
question.style.color = root.interfaceColors.get("text").toCSS();

var scoreButtons = [];
for (var score = 1; score <= 10; score++) {
  var button = document.createElement("button");
  button.type = "button";
  button.textContent = score;
  // a click gives the current area this button's score
  button.addEventListener("click", function() {
    setValue(current, Number(this.textContent));
  });
  answers.appendChild(button);
  scoreButtons.push(button);
}

var againButton = document.createElement("button");
againButton.type = "button";
againButton.textContent = "Start again";
againButton.addEventListener("click", startAgain);
answers.appendChild(againButton);

// Show the question for one area, or the end of the round
function ask(index) {
  current = index;
  var done = index >= data.length;
  questionText.textContent = done ? "All done: this is your wheel of life." : data[index].category + " (" + (index + 1) + " of " + data.length + ")";
  scoreButtons.forEach(function(button) {
    button.hidden = done;
  });
  againButton.hidden = !done;
  if (!done) {
    // the buttons light up in the area's color
    answers.style.setProperty("--area", data[index].columnSettings.fill.toCSS());
  }
}

// Set one area's score: its column grows to the new value, then the next question shows
function setValue(index, value) {
  var row = data[index];
  row.value = value;
  series.data.setIndex(index, { // replacing the row makes its column grow to the new value
    category: row.category,
    value: value,
    columnSettings: row.columnSettings
  });
  ask(index + 1);
}

// Back to 0 everywhere, and to the first question
function startAgain() {
  data.forEach(function(row, index) {
    row.value = 0;
    series.data.setIndex(index, { // each column shrinks back to 0
      category: row.category,
      value: 0,
      columnSettings: row.columnSettings
    });
  });
  ask(0);
}

ask(0);
```

## HTML

```html
<div class="wheel">
  <div class="question">
    <h3 id="question-text"></h3>
    <div class="answers" id="answers"></div>
  </div>
  <div id="chartdiv"></div>
</div>
```

## CSS

```css
.wheel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 640px;
}

.question {
  text-align: center;
  padding-bottom: 8px;
}

.question h3 {
  margin: 0 0 8px;
  font-size: 1.1em;
  font-weight: 600;
}

.answers button {
  min-width: 2.4em;
  margin: 2px;
  padding: 6px 4px;
  font: inherit;
  color: inherit;
  background: none;
  border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 6px;
  cursor: pointer;
}

/* --area is the color of the life area being rated */
.answers button:hover,
.answers button:focus-visible {
  color: #fff;
  background: var(--area);
  border-color: var(--area);
}

#chartdiv {
  flex: 1;
  width: 100%;
  min-height: 0;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
