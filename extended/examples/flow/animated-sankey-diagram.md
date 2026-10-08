---
title: "Animated Sankey Diagram"
source: "https://www.amcharts.com/demos/animated-sankey-diagram/"
category: "flow"
scraped: "2026-10-08"
---

A Sankey diagram with amounts that keep floating along the bands, bigger numbers on bigger flows. Here, an example of $1.77 trillion in company cash, split by industry and by where it is held.

When to animate a flow: Floating numbers make a still Sankey diagram move the way the money does. That catches attention on a landing page or in a talk; for careful reading, the labels on the bands carry the same numbers and stay put.

Good for:
- Landing pages and presentations
- Money, goods or traffic on the move
- Big screens that run on their own

Think twice when:
- Dashboards people check every day: the motion wears thin
- Printed reports: only the still labels remain
- Many small flows: tiny moving numbers turn into noise

Prompt: Create a horizontal Sankey diagram of an example breakdown of company cash, from all non-financial companies down to the five biggest tech companies, ending as cash in the U.S. or overseas. Value labels float along every band in endless loops, sized by their value. Use the Animated and Responsive themes and the amCharts 5 library.

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

var serialChartContainer = root.container.children.push(
	am5.SerialChartContainer.new(root, {
		width: am5.percent(100), // the container fills the whole chart area
		height: am5.percent(100)
	})
);

// Create series
// https://www.amcharts.com/docs/v5/charts/flow-charts/
var series = serialChartContainer.series.push(
	am5flow.Sankey.new(root, {
		orientation: "horizontal", // the flows run left to right
		sourceIdField: "from",
		targetIdField: "to",
		valueField: "value",
		nodePadding: 5,            // 5px between the nodes stacked in one column
		// room for the labels left of the first node and right of the last ones
		paddingLeft: 45,
		paddingRight: 130
	})
);

// Nodes are hidden: the bands themselves make the picture
series.nodes.nodes.template.setAll({
	toggleKey: "none",         // clicking a node doesn't hide its bands
	cursorOverStyle: "default" // a plain arrow pointer over the nodes
});

series.nodes.rectangles.template.setAll({
	fillOpacity: 0,
	strokeOpacity: 0
});

series.links.template.setAll({
	tooltipText: "{sourceId} > {targetId}: [bold]${value}B", // source > target: the amount in billions
	fillOpacity: 1, // solid bands
	strokeOpacity: 1, // with an opaque outline
	interactive: true // the bands react to hover: tooltip and hover state
});
series.links.template.states.create("hover", {
	fillOpacity: 0.8 // a hovered band turns a little see-through
});

// Colors from the theme: one for the companies, two more for where the cash is held
var colors = am5.ColorSet.new(root, {});
var companyColor = colors.getIndex(0);
// of the theme's text color and its alternative, the one that stands out on the companies' color
var textColor = am5.Color.alternative(companyColor, root.interfaceColors.get("text"), root.interfaceColors.get("alternativeText"));

// Only the first and the last nodes get a label: their own text from the node data
series.nodes.labels.template.setAll({
	forceHidden: true,             // hidden unless a node's labelSettings says otherwise
	templateField: "labelSettings" // settings from each node's labelSettings
});

series.nodes.data.setAll([
	{
		id: "Non-financial companies",
		fill: companyColor,
		labelSettings: {
			text: "NON-FINANCIAL COMPANIES\n[bold]$1.77 TRILLION[/] IN CASH",
			textAlign: "center",
			forceHidden: false, // this node's label shows
			rotation: -90,      // reading upward along the first node
			centerX: am5.p50,
			centerY: am5.p100,
			paddingLeft: 0,
			paddingBottom: 6
		}
	},
	{ id: "Non-tech companies", fill: companyColor },
	{ id: "Tech companies", fill: companyColor },
	{
		id: "Cash in the U.S.",
		fill: colors.getIndex(1), // the bands into it fade to the next theme color
		labelSettings: {
			text: "CASH IN THE U.S.\n[bold]$459 BILLION",
			forceHidden: false,
			paddingLeft: 8
		}
	},
	{
		id: "Cash overseas",
		fill: colors.getIndex(2), // and these to the one after
		labelSettings: {
			text: "CASH OVERSEAS\n[bold]$1.31 TRILLION",
			forceHidden: false,
			paddingLeft: 8
		}
	},
	{ id: "Rest of tech", fill: companyColor },
	{ id: "Top 5 tech companies", fill: companyColor },
	{ id: "Joytechs", fill: companyColor },
	{ id: "Fireex", fill: companyColor },
	{ id: "Globalworld", fill: companyColor },
	{ id: "Betagate", fill: companyColor },
	{ id: "Apexi", fill: companyColor }
]);

// Amounts that float along every band, again and again, fading in and out on the way. They come first, so the
// band labels below are drawn on top of them.
series.bullets.push(function (root, series, dataItem) {
	var label = am5.Label.new(root, {
		text: "${value}B",         // the band's amount in billions
		populateText: true,        // fill in {value} from the band's data
		centerX: am5.p50,          // centered on its spot on the band
		centerY: am5.p50,
		fill: textColor,           // the text color that stands out on the bands
		opacity: 0,                // invisible at first; the adapter below sets it
		// bigger flows carry bigger numbers, from 9px to 24px
		fontSize: Math.max(9, Math.min(24, dataItem.get("value") / 25))
	});
	var bullet = am5.Bullet.new(root, {
		locationX: 0,    // starts at the beginning of the band
		sprite: label,
		autoRotate: true // turns with the band's curve
	});

	// most visible halfway along the band
	label.adapters.add("opacity", function (opacity) {
		return 0.5 - Math.abs(0.5 - bullet.get("locationX"));
	});

	bullet.animate({
		key: "locationX", // move along the band...
		from: 0,          // ...from its start...
		to: 1,            // ...to its end
		// each amount travels at its own speed, 2 to 12 seconds per trip
		duration: Math.random() * 10000 + 2000,
		loops: Infinity // again and again
	});
	// set the opacity again on every move, so the adapter above works it out for the new spot
	bullet.on("locationX", function () {
		label.set("opacity", label.get("opacity"));
	});

	return bullet;
});

// Labels on the bands, from each link's labelSettings. The labeled bands are all in the companies' color, so the
// text takes the color that stands out on it
series.bullets.push(function () {
	return am5.Bullet.new(root, {
		locationX: 0.5, // halfway along the band
		sprite: am5.Label.new(root, {
			templateField: "labelSettings", // text from each link's labelSettings; links without one get none
			fill: textColor,
			fontSize: "0.85em",             // a little smaller than the chart's text
			textAlign: "center",            // both lines centered
			centerX: am5.p50,
			centerY: am5.p50,
			paddingTop: 0,                  // no padding above and below the text,
			paddingBottom: 0                // so two lines fit the band
		})
	});
});

// The five companies' bands are narrow: their labels end at each company's node, where the band is straight
series.bullets.push(function () {
	return am5.Bullet.new(root, {
		locationX: 1, // at the end of the band, by the company's node
		sprite: am5.Label.new(root, {
			templateField: "companyLabel", // text from each link's companyLabel
			fill: textColor,
			fontSize: "0.75em",            // smaller still, for the narrow bands
			centerX: am5.p100,             // the label ends at that point...
			centerY: am5.p50,
			paddingRight: 5,               // ...5px before the node
			paddingTop: 0,
			paddingBottom: 0
		})
	});
});

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
	{
		from: "Non-financial companies",
		to: "Non-tech companies",
		value: 907,
		labelSettings: { text: "NON-TECH COMPANIES\n[bold]$907 BILLION" }
	},
	{
		from: "Non-financial companies",
		to: "Tech companies",
		value: 861,
		labelSettings: { text: "TECH COMPANIES\n[bold]$861 BILLION" }
	},

	{ from: "Non-tech companies", to: "Cash in the U.S.", value: 324 },
	{ from: "Non-tech companies", to: "Cash overseas", value: 583 },

	{
		from: "Tech companies",
		to: "Rest of tech",
		value: 274,
		labelSettings: { text: "REST OF TECH\n[bold]$274 BILLION" }
	},
	{
		from: "Tech companies",
		to: "Top 5 tech companies",
		value: 587,
		labelSettings: { text: "TOP 5 TECH COMPANIES\n[bold]$587 BILLION" }
	},

	{ from: "Rest of tech", to: "Cash in the U.S.", value: 74 },
	{ from: "Rest of tech", to: "Cash overseas", value: 200 },

	{ from: "Top 5 tech companies", to: "Joytechs", value: 67, companyLabel: { text: "JOYTECHS [bold]$67B" } },
	{ from: "Joytechs", to: "Cash in the U.S.", value: 10 },
	{ from: "Joytechs", to: "Cash overseas", value: 57 },

	{ from: "Top 5 tech companies", to: "Fireex", value: 68, companyLabel: { text: "FIREEX [bold]$68B" } },
	{ from: "Fireex", to: "Cash in the U.S.", value: 8 },
	{ from: "Fireex", to: "Cash overseas", value: 60 },

	{ from: "Top 5 tech companies", to: "Globalworld", value: 85, companyLabel: { text: "GLOBALWORLD [bold]$85B" } },
	{ from: "Globalworld", to: "Cash in the U.S.", value: 10 },
	{ from: "Globalworld", to: "Cash overseas", value: 75 },

	{ from: "Top 5 tech companies", to: "Betagate", value: 115, companyLabel: { text: "BETAGATE [bold]$115B" } },
	{ from: "Betagate", to: "Cash in the U.S.", value: 10 },
	{ from: "Betagate", to: "Cash overseas", value: 105 },

	{ from: "Top 5 tech companies", to: "Apexi", value: 252, companyLabel: { text: "APEXI [bold]$252B" } },
	{ from: "Apexi", to: "Cash in the U.S.", value: 23 },
	{ from: "Apexi", to: "Cash overseas", value: 229 }
]);

// Make stuff animate on load
series.appear(1000, 100);
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
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
