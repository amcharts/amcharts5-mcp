---
title: "A wordcloud with a custom shape"
source: "https://docs.amcharts.com/embeds/v5/a-wordcloud-with-a-custom-shape/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/word-cloud"]
---

A demo from the docs page "Word cloud" (get_doc(path: "charts/word-cloud")).

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

// Head in profile, facing right. Drawn in a 250x250 box; the series scales it
// to the plot area. Clockwise from the crown:
// forehead > brow > nose > lips > chin > jaw > neck > base > back of the skull.
// Near-circular cranium, pointed nose, and a squared-off jaw block that
// overhangs the narrower neck, leaving a notch at the bottom right.
var headPath =
  "M 120 15 C 176 15 216 56 217 105 C 218 116 215 125 216 126 C 219 137 228 148 229 154 C 230 158 226 161 219 163 C 213 163 210 165 210 171 C 221 183 205 187 206 193 C 203 204 201 209 200 213 L 166 213 L 166 236 L 62 236 C 62 162 35 197 24 110 C 20 58 64 15 120 15 Z";

root.container.setAll({
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 20,
  paddingRight: 20
});

var series = root.container.children.push(
  am5wc.WordCloud.new(root, {
    categoryField: "tag",
    valueField: "weight",
    svgPath: headPath,
    shapeTolerance: 20,
    angles: [0, 90],
    sequencedInterpolation: false,
    randomizeAngles: true,
    minFontSize: am5.percent(1),
    maxFontSize: am5.percent(16)
  })
);

series.shape.setAll({
  strokeWidth: 10,
  nonScalingStroke: true,
  stroke: am5.color(0x000000)
});

series.labels.template.setAll({
  fontWeight: "500",
  tooltipText: "{category}: {value}"
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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/wc.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
