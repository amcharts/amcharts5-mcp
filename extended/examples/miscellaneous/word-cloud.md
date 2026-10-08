---
title: "Word Cloud"
source: "https://www.amcharts.com/demos/word-cloud/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A word cloud sizes each word by how often it appears in a text, so the words used most stand out at once. Here, the king’s first speech in Shakespeare’s Hamlet.

When a word cloud works: A word cloud gives a quick feel for what a text is about, or what people keep saying, without reading all of it. It is a first look rather than an analysis: sizes are hard to compare, and the most common words are often the least telling.

Good for:
- A first look at speeches, reviews or survey answers
- Posters, slides and title pages
- Tags and keywords people already know

Think twice when:
- Exact counts or rankings: a bar chart of the top words is clearer
- Short texts: every word appears once or twice
- Words that matter only in context, like "not good"

Prompt: Create a zoomable word cloud of the most frequent words in King Claudius’s first speech in Shakespeare’s Hamlet, counted from the plain text, with each word set level or upright. Use the amCharts 5 library with its Responsive theme.

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

var chart = root.container.children.push(
  am5.SerialChartContainer.new(root, {
    width: am5.p100, // the container fills the whole chart div
    height: am5.p100
  })
);

chart.zoomableContainer.setAll({
  wheelable: true, // the mouse wheel zooms in on the cloud
  pinchZoom: true  // and so does pinching on a touch screen
});

var zoomTools = chart.set("zoomTools", am5.ZoomTools.new(root, {})); // zoom in, zoom out and reset buttons

// Add series
// https://www.amcharts.com/docs/v5/charts/word-cloud/
var series = chart.series.push(am5wc.WordCloud.new(root, {
  // at most 100 words, each at least 2 letters long
  maxCount:100,
  minWordLength:2,
  maxFontSize:am5.percent(35), // the biggest words: 35% of the cloud's shorter side
  // the source text: the cloud counts its words and sizes each by how often it appears
  text: "Though yet of Hamlet our dear brother's death The memory be green, and that it us befitted To bear our hearts in grief and our whole kingdom To be contracted in one brow of woe, Yet so far hath discretion fought with nature That we with wisest sorrow think on him, Together with remembrance of ourselves. Therefore our sometime sister, now our queen, The imperial jointress to this warlike state, Have we, as 'twere with a defeated joy,-- With an auspicious and a dropping eye, With mirth in funeral and with dirge in marriage, In equal scale weighing delight and dole,-- Taken to wife: nor have we herein barr'd Your better wisdoms, which have freely gone With this affair along. For all, our thanks. Now follows, that you know, young Fortinbras, Holding a weak supposal of our worth, Or thinking by our late dear brother's death Our state to be disjoint and out of frame, Colleagued with the dream of his advantage, He hath not fail'd to pester us with message, Importing the surrender of those lands Lost by his father, with all bonds of law, To our most valiant brother. So much for him. Now for ourself and for this time of meeting: Thus much the business is: we have here writ To Norway, uncle of young Fortinbras,-- Who, impotent and bed-rid, scarcely hears Of this his nephew's purpose,--to suppress His further gait herein; in that the levies, The lists and full proportions, are all made Out of his subject: and we here dispatch You, good Cornelius, and you, Voltimand, For bearers of this greeting to old Norway; Giving to you no further personal power To business with the king, more than the scope Of these delated articles allow. Farewell, and let your haste commend your duty. Tis sweet and commendable in your nature, Hamlet,To give these mourning duties to your father: But, you must know, your father lost a father; That father lost, lost his, and the survivor bound In filial obligation for some term To do obsequious sorrow: but to persever In obstinate condolement is a course Of impious stubbornness; 'tis unmanly grief; It shows a will most incorrect to heaven, A heart unfortified, a mind impatient, An understanding simple and unschool'd: For what we know must be and is as common As any the most vulgar thing to sense, Why should we in our peevish opposition Take it to heart? Fie! 'tis a fault to heaven, A fault against the dead, a fault to nature, To reason most absurd: whose common theme Is death of fathers, and who still hath cried, From the first corse till he that died to-day, 'This must be so.' We pray you, throw to earth This unprevailing woe, and think of us As of a father: for let the world take note, You are the most immediate to our throne; And with no less nobility of love Than that which dearest father bears his son, Do I impart toward you. For your intent In going back to school in Wittenberg, It is most retrograde to our desire: And we beseech you, bend you to remain Here, in the cheer and comfort of our eye, Our chiefest courtier, cousin, and our son.",
}));

// Configure labels
series.labels.template.setAll({
  paddingTop: 5, // a little space around each word, so they don't touch
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 5,
  fontFamily: "Courier New" // a typewriter-like monospace font
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
- https://cdn.amcharts.com/lib/5/wc.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
