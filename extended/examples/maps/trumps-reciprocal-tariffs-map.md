---
title: "Trump’s Reciprocal Tariffs Map"
source: "https://www.amcharts.com/demos/trumps-reciprocal-tariffs-map/"
category: "maps"
scraped: "2026-03-15"
---

A real world application of a heat map, featuring amCharts 5 features like heat rules, heat legend, globe (orthographic) projection, animations and custom controls.
DISCLAIMER: The data, provided in this demo is not being updated to reflect actual dynamic situation and should be treated as a sample, not basis of an actual research or decision making.
Related documentation
Map charts
Map projections
Heat rules
Heat legend

## JavaScript

```javascript
var bulletColor = am5.color(0xc83830);
var polygonColor = am5.color(0xd9cec8);

var data = [
  {
    "id": "CN",
    "threatened": 34,
    "updated": 125
  },
  {
    "id": "AT",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "BE",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "BG",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "HR",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "CY",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "CZ",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "DK",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "EE",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "FI",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "FR",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "DE",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "GR",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "HU",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "IE",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "IT",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "LV",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "LT",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "LU",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "MT",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "NL",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "PL",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "PT",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "RO",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "SK",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "SI",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "ES",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "SE",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "VN",
    "threatened": 46,
    "updated": 10
  },
  {
    "id": "TW",
    "threatened": 32,
    "updated": 10
  },
  {
    "id": "JP",
    "threatened": 24,
    "updated": 10
  },
  {
    "id": "IN",
    "threatened": 26,
    "updated": 10
  },
  {
    "id": "TH",
    "threatened": 36,
    "updated": 10
  },
  {
    "id": "CH",
    "threatened": 31,
    "updated": 10
  },
  {
    "id": "ID",
    "threatened": 32,
    "updated": 10
  },
  {
    "id": "MY",
    "threatened": 24,
    "updated": 10
  },
  {
    "id": "KH",
    "threatened": 49,
    "updated": 10
  },
  {
    "id": "GB",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "ZA",
    "threatened": 30,
    "updated": 10
  },
  {
    "id": "BR",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BD",
    "threatened": 37,
    "updated": 10
  },
  {
    "id": "SG",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "IL",
    "threatened": 17,
    "updated": 10
  },
  {
    "id": "PH",
    "threatened": 17,
    "updated": 10
  },
  {
    "id": "CL",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AU",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "PK",
    "threatened": 29,
    "updated": 10
  },
  {
    "id": "TR",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "LK",
    "threatened": 44,
    "updated": 10
  },
  {
    "id": "CO",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "PE",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "NI",
    "threatened": 18,
    "updated": 10
  },
  {
    "id": "NO",
    "threatened": 15,
    "updated": 10
  },
  {
    "id": "CR",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "JO",
    "threatened": 20,
    "updated": 10
  },
  {
    "id": "DO",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AE",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "NZ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AR",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "EC",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "GT",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "HN",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MG",
    "threatened": 47,
    "updated": 10
  },
  {
    "id": "MM",
    "threatened": 44,
    "updated": 10
  },
  {
    "id": "TN",
    "threatened": 28,
    "updated": 10
  },
  {
    "id": "KZ",
    "threatened": 27,
    "updated": 10
  },
  {
    "id": "RS",
    "threatened": 37,
    "updated": 10
  },
  {
    "id": "EG",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SA",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SV",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BW",
    "threatened": 37,
    "updated": 10
  },
  {
    "id": "TT",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MA",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "DZ",
    "threatened": 30,
    "updated": 10
  },
  {
    "id": "OM",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "UY",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BS",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "LS",
    "threatened": 50,
    "updated": 10
  },
  {
    "id": "UA",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BH",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "QA",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MU",
    "threatened": 40,
    "updated": 10
  },
  {
    "id": "FJ",
    "threatened": 32,
    "updated": 10
  },
  {
    "id": "IS",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "KE",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "LI",
    "threatened": 37,
    "updated": 10
  },
  {
    "id": "GY",
    "threatened": 38,
    "updated": 10
  },
  {
    "id": "HT",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BA",
    "threatened": 35,
    "updated": 10
  },
  {
    "id": "NG",
    "threatened": 14,
    "updated": 10
  },
  {
    "id": "NA",
    "threatened": 21,
    "updated": 10
  },
  {
    "id": "BO",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "PA",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "VE",
    "threatened": 15,
    "updated": 10
  },
  {
    "id": "MK",
    "threatened": 33,
    "updated": 10
  },
  {
    "id": "ET",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "GH",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MD",
    "threatened": 31,
    "updated": 10
  },
  {
    "id": "AO",
    "threatened": 32,
    "updated": 10
  },
  {
    "id": "JM",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MZ",
    "threatened": 16,
    "updated": 10
  },
  {
    "id": "PY",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "ZM",
    "threatened": 17,
    "updated": 10
  },
  {
    "id": "LB",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "CD",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BF",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BF",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "CI",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "TZ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "IQ",
    "threatened": 39,
    "updated": 10
  },
  {
    "id": "GE",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SN",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AZ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "CM",
    "threatened": 11,
    "updated": 10
  },
  {
    "id": "UG",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AL",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AM",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "NP",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "GA",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "KW",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "TG",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SR",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BZ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "PG",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MW",
    "threatened": 17,
    "updated": 10
  },
  {
    "id": "LR",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "VG",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AF",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "ZW",
    "threatened": 18,
    "updated": 10
  },
  {
    "id": "BJ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BB",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MC",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "UZ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "CG",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "DJ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "PF",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "KY",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "CW",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "VU",
    "threatened": 22,
    "updated": 10
  },
  {
    "id": "RW",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SL",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MN",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SM",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AG",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BM",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SZ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MH",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "PM",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "KN",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "TM",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "GD",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SD",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "TC",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AW",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "ME",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "KG",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "YE",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "VC",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "NE",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "LC",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "NR",
    "threatened": 30,
    "updated": 10
  },
  {
    "id": "GQ",
    "threatened": 13,
    "updated": 10
  },
  {
    "id": "LY",
    "threatened": 31,
    "updated": 10
  },
  {
    "id": "WS",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "GN",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "TL",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MS",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "TD",
    "threatened": 13,
    "updated": 10
  },
  {
    "id": "ML",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MV",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "TJ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "CV",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BI",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "GP",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "BT",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MQ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "TO",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "MR",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "DM",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "GM",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "GF",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "CX",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AD",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "CF",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SB",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "YT",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "AI",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "CC",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "ER",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "CK",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SS",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "KM",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "KI",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "NF",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "GI",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "TV",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "IO",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "TK",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "GW",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "SJ",
    "threatened": 10,
    "updated": 10
  },
  {
    "id": "RE",
    "threatened": 10,
    "updated": 10
  }
]


var root = am5.Root.new("chartdiv");

var myTheme = am5.Theme.new(root);

myTheme.rule("InterfaceColors").setAll({
  primaryButton: am5.color(0xc83830),
  primaryButtonHover: am5.Color.lighten(am5.color(0xc83830), 0.2),
  primaryButtonDown: am5.Color.lighten(am5.color(0xc83830), -0.2),
  primaryButtonActive: am5.color(0xd9cec8),
});


myTheme.rule("Label").setAll({
  fontSize: "0.8em"
});

root.setThemes([am5themes_Animated.new(root), myTheme]);

var chart = root.container.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoMercator()
}));

var graticuleSeries = chart.series.unshift(
  am5map.GraticuleSeries.new(root, {
    step: 10
  })
);

graticuleSeries.mapLines.template.set("strokeOpacity", 0.05)


var cont = chart.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout,
  x: am5.percent(15),
  centerX: 0,
  y: am5.percent(100),
  dy: -40
}));

// Add labels and controls
cont.children.push(am5.Label.new(root, {
  centerY: am5.p50,
  text: "Map"
}));

var switchButton = cont.children.push(am5.Button.new(root, {
  themeTags: ["switch"],
  centerY: am5.p50,
  icon: am5.Circle.new(root, {
    themeTags: ["icon"]
  })
}));

switchButton.on("active", function () {
  if (!switchButton.get("active")) {
    chart.set("projection", am5map.geoMercator());
    chart.set("panY", "translateY");
    chart.set("rotationY", 0);
    polygonSeries.set("exclude", ["AQ"]);
    
  } else {
    chart.set("projection", am5map.geoOrthographic());
    chart.set("panY", "rotateY")
    chart.set("panX", "rotateX");
    polygonSeries.set("exclude", []);
    chart.animate({ key: "rotationX", to: chart.get("rotationX") + 360, duration: 15000, easing: am5.ease.inOut(am5.ease.cubic) });
  }
});

cont.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Globe"
  })
);


// proposed switch button


var cont2 = chart.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout,
  x: am5.percent(85),
  centerX: am5.p100,
  y: am5.percent(100),
  dy: -40
}));

// Add labels and controls
cont2.children.push(am5.Label.new(root, {
  centerY: am5.p50,
  text: "Threatened"
}));

var switchButton2 = cont2.children.push(am5.Button.new(root, {
  themeTags: ["switch"],
  centerY: am5.p50,
  icon: am5.Circle.new(root, {
    themeTags: ["icon"]
  })
}));

switchButton2.on("active", function () {
  if (!switchButton2.get("active")) {
    polygonSeries.set("valueField", "threatened");
    polygonSeries.data.setAll(data);

  } else {
    polygonSeries.set("valueField", "updated");    
    polygonSeries.data.setAll(data);
  }
});

cont2.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Updated"
  })
);

var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    valueField: "threatened",
    calculateAggregates: true,
    exclude: ["AQ"]
  })
);

polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});

polygonSeries.set("heatRules", [{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color(0xd3a29f),
  max: am5.color(0x6f0600),
  key: "fill"
}]);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name} {value}%",
  fill: polygonColor,
  stroke: am5.color(0xffffff)
});

polygonSeries.data.setAll(data);


var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
  orientation: "vertical",
  startColor: am5.color(0xd3a29f),
  endColor: am5.color(0x6f0600),
  startText: "Lowest",
  endText: "Highest",
  stepCount: 8,
  x: am5.p100,
  centerX: am5.p100,
  paddingRight: 20,
  paddingTop: 20,
  paddingBottom: 20
}));

heatLegend.startLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("startColor")
});

heatLegend.endLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("endColor")
});

// change this to template when possible
polygonSeries.events.on("datavalidated", function () {
  heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
  heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
});


var title = chart.children.push(am5.Label.new(root, {
  text: "Trump's tariffs on world countries",
  fontSize: 20,
  x: am5.percent(50),
  centerX: am5.p50,
  y: 40
}));
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 650px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
