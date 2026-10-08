---
title: "Annotating Charts"
source: "https://www.amcharts.com/demos/annotating-charts/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A pie chart with notes drawn on it: a callout and arrows saying which slices need work. They come from the exporting menu’s Annotate tool, which lets anyone draw on a chart and save the result.

When to annotate a chart: A note on the chart says what to look at before anyone asks. The Annotate tool lets readers add their own arrows and callouts and download the result, and the code can load notes made earlier, like the ones here.

Good for:
- Reports and slides that point at one thing
- Feedback on a chart, drawn on the chart
- Screenshots for support and documentation

Think twice when:
- Charts that change size a lot: the notes are drawn for one layout
- Notes tied to data: label or range bullets move with it
- Long explanations: put them next to the chart

Prompt: Create a pie chart with an export menu that has an extra Annotate item, so anyone can draw callouts, arrows and text on the chart and save the result. Start with a few saved annotations on the slices. Use the Animated and Responsive themes and the amCharts 5 library.

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
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    endAngle: 270 // the pie ends at 270 degrees: a full circle from the top
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    endAngle: 270 // set here too, so the pie has an angle to sweep back to
  })
);

// hidden, the pie closes up at its start angle, so it sweeps open when it appears
series.states.create("hidden", {
  endAngle: -90
});

series.labels.template.set("forceHidden", true); // no slice labels...
series.ticks.template.set("forceHidden", true);  // ...and no lines to them

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([{
  category: "Lithuania",
  value: 501.9
}, {
  category: "Czechia",
  value: 301.9
}, {
  category: "Ireland",
  value: 201.1
}, {
  category: "Germany",
  value: 165.8
}, {
  category: "Australia",
  value: 139.9
}, {
  category: "Austria",
  value: 128.3
}, {
  category: "UK",
  value: 99
}]);

series.appear(1000, 100);

// Set up export and annotation
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}) // an export menu in the corner of the chart
});

// annotations saved from an earlier session: the annotator opens with these markers in place
var annotationData = {"width":897,"height":500,"markers":[{"bgColor":"#EF4444","tipPosition":{"x":276.00001525878906,"y":92.33334350585938},"color":"#FFFFFF","fontFamily":"Helvetica, Arial, sans-serif","padding":5,"text":"Needs improvement","left":96.66667175292969,"top":178,"width":230,"height":48.333343505859375,"rotationAngle":0,"visualTransformMatrix":{"a":1,"b":0,"c":0,"d":1,"e":0,"f":0},"containerTransformMatrix":{"a":1,"b":0,"c":0,"d":1,"e":0,"f":0},"typeName":"CalloutMarker","state":"select"},{"arrowType":"end","strokeColor":"#7C3AED","strokeWidth":3,"strokeDasharray":"","x1":733.3333740234375,"y1":125.33334350585938,"x2":539.3333740234375,"y2":225.6666717529297,"typeName":"ArrowMarker","state":"select"},{"arrowType":"end","strokeColor":"#7C3AED","strokeWidth":3,"strokeDasharray":"","x1":736.6666870117188,"y1":153.33334350585938,"x2":518.6666870117188,"y2":343.0000915527344,"typeName":"ArrowMarker","state":"select"},{"color":"#EF4444","fontFamily":"Helvetica, Arial, sans-serif","padding":5,"text":"OK","left":706.0000610351562,"top":125.00001525878906,"width":100,"height":30,"rotationAngle":0,"visualTransformMatrix":{"a":1,"b":0,"c":0,"d":1,"e":0,"f":0},"containerTransformMatrix":{"a":1,"b":0,"c":0,"d":1,"e":0,"f":0},"typeName":"TextMarker","state":"select"}]};

// the annotator lets people draw arrows, text and callouts over the chart
var annotator = am5plugins_exporting.Annotator.new(root, {
  markerState: annotationData // start with the saved markers
});

var menuitems = exporting.get("menu").get("items"); // the export menu's items

// a separator line, then an Annotate item at the end of the menu
menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Annotate", // the item's text
  callback: function() {
    this.close();       // close the menu...
    annotator.toggle(); // ...and open the annotator, or close it
  }
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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://cdn.amcharts.com/lib/5/plugins/exporting.js
