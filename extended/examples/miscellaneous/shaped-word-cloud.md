---
title: "Shaped Word Cloud"
source: "https://www.amcharts.com/demos/shaped-word-cloud/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A word cloud that fills a shape: the words pack into the outline of a head, each sized by its weight. Here, what might be on someone’s mind, from money, family and work down to socks and wifi.

When to give a word cloud a shape: A shape tells the topic before a single word is read: a head for thoughts, a heart for what people love, a country’s outline for what its people say. It makes a poster or a title slide, but the shape takes the space a plain cloud would use, so the smallest words shrink further.

Good for:
- Posters, title slides and covers
- A topic that has an obvious shape
- A few dozen to a hundred words

Think twice when:
- Thin or very uneven shapes: the words can’t fill them well
- Reading exact weights: a bar chart of the top words
- Shapes that say nothing about the topic: a plain cloud is clearer

Prompt: Create a word cloud shaped like a human head in profile: about 90 words of very different weights, from Money, Sex, Family and Work down to small ones, fill the head, with its outline drawn around them. Use the Animated theme. Use the amCharts 5 library with its Responsive theme.

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

// Head in profile, facing right. Drawn in a 250x250 box; the series scales it
// to the plot area. Clockwise from the crown:
// forehead > brow > nose > lips > chin > jaw > neck > base > back of the skull.
// Near-circular cranium, pointed nose, and a squared-off jaw block that
// overhangs the narrower neck, leaving a notch at the bottom right.
var headPath = "M 120 15 C 176 15 216 56 217 105 C 218 116 215 125 216 126 C 219 137 228 148 229 154 C 230 158 226 161 219 163 C 213 163 210 165 210 171 C 221 183 205 187 206 193 C 203 204 201 209 200 213 L 166 213 L 166 236 L 62 236 C 62 162 35 197 24 110 C 20 58 64 15 120 15 Z";

// Create a container for the series
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {}));

// Add series
// https://www.amcharts.com/docs/v5/charts/word-cloud/
var series = chart.series.push(
  am5wc.WordCloud.new(root, {
    paddingTop: 20,       // 20px of space around the cloud on each side
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    categoryField: "tag",
    valueField: "weight", // the bigger the weight, the bigger the word
    // The words fill this shape; a shapeTolerance of -5 keeps them 5px inside its
    // edge, clear of the thick outline (the words would vanish into it)
    svgPath: headPath,
    shapeTolerance: -5,
    // each word is horizontal or vertical, picked at random (randomizeAngles)
    angles: [0, 90],
    sequencedInterpolation: false, // all the words animate in at once, not one by one
    randomizeAngles: true,
    minFontSize: am5.percent(1),   // the smallest words: 1% of the chart's shorter side...
    maxFontSize: am5.percent(16)   // ...the biggest 16%
  })
);

// The outline of the head, in the text color so it shows on light and dark backgrounds
series.shape.setAll({
  strokeWidth: 10,
  // the outline stays 10px wide however much the shape is scaled
  nonScalingStroke: true,
  stroke: root.interfaceColors.get("text")
});

series.labels.template.setAll({
  fontWeight: "500",                 // medium weight
  tooltipText: "{category}: {value}" // hover a word for its weight
});

// Steep long tail on purpose: the top handful tower over everything, then a
// broad middle, then a lot of small stuff filling the gaps
series.data.setAll([
  { tag: "Money", weight: 200 },
  { tag: "Sex", weight: 190 },
  { tag: "Family", weight: 178 },
  { tag: "Work", weight: 165 },
  { tag: "Sleep", weight: 152 },
  { tag: "Love", weight: 142 },
  { tag: "Food", weight: 132 },
  { tag: "Future", weight: 120 },
  { tag: "Time", weight: 112 },
  { tag: "Health", weight: 104 },
  { tag: "Friends", weight: 96 },
  { tag: "Home", weight: 90 },
  { tag: "Death", weight: 84 },
  { tag: "Coffee", weight: 80 },
  { tag: "Weekend", weight: 74 },
  { tag: "Dreams", weight: 70 },
  { tag: "Career", weight: 66 },
  { tag: "Music", weight: 62 },
  { tag: "Travel", weight: 58 },
  { tag: "Kids", weight: 55 },
  { tag: "Bills", weight: 52 },
  { tag: "Deadlines", weight: 48 },
  { tag: "Holidays", weight: 46 },
  { tag: "Purpose", weight: 44 },
  { tag: "Exercise", weight: 42 },
  { tag: "Weather", weight: 40 },
  { tag: "Memories", weight: 38 },
  { tag: "Anxiety", weight: 36 },
  { tag: "News", weight: 35 },
  { tag: "Plans", weight: 33 },
  { tag: "Worries", weight: 32 },
  { tag: "Movies", weight: 30 },
  { tag: "Books", weight: 29 },
  { tag: "Rent", weight: 28 },
  { tag: "Goals", weight: 27 },
  { tag: "Politics", weight: 26 },
  { tag: "Pets", weight: 25 },
  { tag: "Regrets", weight: 24 },
  { tag: "Success", weight: 23 },
  { tag: "Freedom", weight: 22 },
  { tag: "Change", weight: 21 },
  { tag: "Growth", weight: 20 },
  { tag: "Shopping", weight: 19 },
  { tag: "Meaning", weight: 19 },
  { tag: "Chores", weight: 18 },
  { tag: "Tomorrow", weight: 18 },
  { tag: "Retirement", weight: 17 },
  { tag: "Failure", weight: 16 },
  { tag: "Silence", weight: 16 },
  { tag: "Guilt", weight: 15 },
  { tag: "Ambition", weight: 15 },
  { tag: "Aging", weight: 14 },
  { tag: "Loneliness", weight: 14 },
  { tag: "Traffic", weight: 13 },
  { tag: "Email", weight: 13 },
  { tag: "Debt", weight: 12 },
  { tag: "Diet", weight: 12 },
  { tag: "Promotion", weight: 11 },
  { tag: "Boss", weight: 11 },
  { tag: "Laundry", weight: 10 },
  { tag: "Keys", weight: 10 },
  { tag: "Doubt", weight: 10 },
  { tag: "Hope", weight: 9 },
  { tag: "Luck", weight: 9 },
  { tag: "Fame", weight: 9 },
  { tag: "Justice", weight: 8 },
  { tag: "Beauty", weight: 8 },
  { tag: "Karma", weight: 8 },
  { tag: "Rain", weight: 7 },
  { tag: "Snacks", weight: 7 },
  { tag: "Naps", weight: 7 },
  { tag: "Socks", weight: 6 },
  { tag: "Wifi", weight: 6 },
  { tag: "Dentist", weight: 6 },
  { tag: "Taxes", weight: 5 },
  { tag: "Batteries", weight: 5 },
  { tag: "Passwords", weight: 5 },
  { tag: "Parking", weight: 4 },
  { tag: "Groceries", weight: 4 },
  { tag: "Commute", weight: 4 },
  { tag: "Podcasts", weight: 3 },
  { tag: "Recipes", weight: 3 },
  { tag: "Neighbors", weight: 3 },
  { tag: "Insurance", weight: 3 },
  { tag: "Homework", weight: 2 },
  { tag: "Gossip", weight: 2 },
  { tag: "Chocolate", weight: 2 },
  { tag: "Stars", weight: 2 }
]);
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
- https://cdn.amcharts.com/lib/5/wc.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
