---
title: "Pictorial Chart"
source: "https://www.amcharts.com/demos/pictorial-chart/"
category: "funnel-pyramid"
scraped: "2026-10-08"
---

A pictorial chart that fills only the bowl of a wine glass, with two wines in their own colors. The slider under it drinks the glass down, and the shares follow.

When a pictorial chart works: A shape that matches the data makes a chart easy to remember: wine in a glass, people in a crowd. The fill can stop part way, as here, where it covers only the bowl, so the empty part of the shape tells something too.

Good for:
- Infographics and posters
- Personal or playful stories
- Levels: how full, how much is left

Think twice when:
- Serious reports, where a picture can feel light
- Many categories: a glass holds two or three bands, not ten
- Reading exact values: the round bowl distorts the areas

Prompt: Create a pictorial stacked chart in the shape of a wine glass, with two wines filling the bowl. Below the glass, add a slider: dragging it lowers the top wine, as if it were being drunk. Use the Animated and Responsive themes and the amCharts 5 library.

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
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
  paddingTop: 20,             // 20px of room above...
  paddingBottom: 20,          // ...and below the glass
  layout: root.verticalLayout // the title, the glass and the slider stacked top to bottom
}));

// the wine glass outline as an SVG path
var svgPath = "M256.814,72.75c0-26.898-10.451-52.213-29.43-71.277C226.444,0.529,225.17,0,223.84,0H87.712c-1.329,0-2.604,0.529-3.543,1.473c-18.978,19.064-29.43,44.379-29.43,71.277c0,50.615,37.414,92.654,86.037,99.922v108.88h-21.25c-8.271,0-15,6.729-15,15c0,8.271,6.729,15,15,15h72.5c8.271,0,15-6.729,15-15c0-8.271-6.729-15-15-15h-21.25v-108.88C219.399,165.404,256.814,123.365,256.814,72.75z M106.709,120.879c-1.234,1.083-2.765,1.615-4.285,1.615c-1.807,0-3.604-0.748-4.888-2.212c-13.153-14.986-18.888-34.832-15.733-54.451c0.571-3.543,3.902-5.956,7.45-5.385c3.544,0.57,5.955,3.905,5.386,7.45c-2.538,15.779,2.079,31.747,12.667,43.811C109.674,114.404,109.406,118.511,106.709,120.879z M144.351,136.662c-0.514,3.194-3.274,5.468-6.409,5.468c-0.343,0-0.69-0.027-1.041-0.083c-6.937-1.117-13.6-3.299-19.804-6.488c-3.193-1.641-4.451-5.559-2.811-8.752c1.641-3.194,5.563-4.451,8.752-2.81c4.985,2.562,10.345,4.317,15.929,5.215C142.511,129.782,144.922,133.118,144.351,136.662z";

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
var series = chart.series.push(am5percent.PictorialStackedSeries.new(root, {
  alignLabels: true,       // labels line up in a column beside the glass
  orientation: "vertical", // slices stacked top to bottom
  valueField: "value",
  categoryField: "name",
  // the wine fills only the bowl: from 10% down to 55.4% of the glass's height
  startLocation: 0.1,
  endLocation: 0.554,
  svgPath: svgPath // the shape the slices fill
}));

series.slices.template.setAll({
  templateField: "sliceSettings", // each wine's color from sliceSettings in the data
  // each slice darkens from left to right, which makes the wine look round
  fillGradient: am5.LinearGradient.new(root, {
    rotation:0, // the gradient runs left to right
    stops: [{ brighten: 0 }, { brighten: -0.8 }]
  }),
  strokeGradient: am5.LinearGradient.new(root, { // the outline shades the same way
    rotation:0, // left to right
    stops: [{ brighten: 0 }, { brighten: -0.8 }]
  })
});
series.labelsContainer.set("width", 150); // 150px of room for the labels

var slider = chart.children.push(
  am5.Slider.new(root, {
    orientation: "horizontal", // a horizontal slider...
    start: 0,                  // ...with its grip at the left: a full glass
    width: am5.percent(60),    // 60% of the chart's width
    centerY: am5.p50,
    centerX: am5.p50,          // anchored by its middle...
    x: am5.p50,                // ...at the middle of the chart
    // the slider is left out of exported images
    exportable: false
  })
);

// The title gets its own row above the glass, so it never runs into the labels,
// and takes the theme's text color, so it reads in dark mode too
var label = chart.children.unshift(am5.Label.new(root, {
  x: am5.p100,       // at the right edge...
  centerX: am5.p100, // ...anchored by its right end...
  paddingRight: 10,  // ...10px in from it
  fontSize: "1.5em", // one and a half times the normal text size
  fontWeight: "500", // medium weight
  text: "Wine I drank yesterday"
}));

// Dragging the slider drinks the wine: the top slice shrinks and the fill starts lower in the glass
slider.events.on("rangechanged", function() {
  var sliderPosition = slider.get("start"); // 0 at the left, 1 at the right
  series.dataItems[0].set("valueWorking", series.dataItems[0].get("value") * (1 - sliderPosition));
  series.set("startLocation", 0.1 + (0.554 - 0.1) * sliderPosition);
  // the slider's track turns from light gray to wine red
  slider.get("background").set("fill", am5.Color.interpolate(sliderPosition, am5.color(0xdadada), am5.color(0x7b131c)))
})

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
series.data.setAll([{
  name: "Pinot Noir",
  value: 200,
  sliceSettings: {
    fill: am5.color(0x390511),
    stroke: am5.color(0x390511)
  }
},
{
  name: "Primitivo",
  value: 300,
  sliceSettings: {
    fill: am5.color(0x7b131c),
    stroke: am5.color(0x7b131c)
  }
}]);

// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
