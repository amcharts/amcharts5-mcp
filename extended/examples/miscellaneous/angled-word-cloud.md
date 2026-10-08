---
title: "Angled Word Cloud"
source: "https://www.amcharts.com/demos/angled-word-cloud/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A word cloud made from the plain text of a speech, with every word tilted to one side or the other, packed into a curved shape. Here, the king’s first speech in Shakespeare’s Hamlet: the more often a word appears, the bigger it is.

When to tilt the words: Tilting every word gives a cloud movement and a style of its own, and two angles pack a curved shape better than level words do. Tilted words read more slowly, so it suits a cloud meant to set a mood more than one meant to be studied.

Good for:
- Posters and title slides
- Clouds that fill a curved or diagonal shape
- A playful or energetic look

Think twice when:
- Clouds people should read word by word: keep words level
- Long words: tilted, they take more room
- Common words like "the" and "and": raise the shortest word length

Prompt: Create a zoomable word cloud of the most frequent words in the king’s first speech in Shakespeare’s Hamlet, counted from the plain text, packed into a curved, mustache-like shape with every word tilted 45 degrees one way or the other. Use the Animated theme. Use the amCharts 5 library with its Responsive theme.

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

// Create a container for the series
var chart = root.container.children.push(
  am5.SerialChartContainer.new(root, {
    width: am5.p100, // the container fills the whole chart area
    height: am5.p100
  })
);

// Zoom with the mouse wheel or by pinching
chart.zoomableContainer.setAll({
  wheelable: true,
  pinchZoom: true
});

// Zoom buttons, in the top right corner where the curved shape leaves room
var zoomTools = chart.set("zoomTools", am5.ZoomTools.new(root, {
  y: 0,      // at the top of the chart...
  centerY: 0 // ...measured from the buttons' top edge
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/word-cloud/
var series = chart.series.push(am5wc.WordCloud.new(root, {
  // The words fill this shape, scaled to fit the chart; the padding leaves room
  // for words that spill over its edges
  svgPath: "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z",
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 20,
  paddingRight: 20,
  // Every word is tilted 45 degrees one way or the other
  angles: [45, -45],
  // keep the 100 most frequent words of the text, leaving out one-letter ones
  maxCount: 100,
  minWordLength: 2,
  // the most frequent word's size, as a share of the chart's smaller side
  maxFontSize: am5.percent(35),
  // the text whose words are counted; the most frequent get the biggest type
  text: "Though yet of Hamlet our dear brother's death The memory be green, and that it us befitted To bear our hearts in grief and our whole kingdom To be contracted in one brow of woe, Yet so far hath discretion fought with nature That we with wisest sorrow think on him, Together with remembrance of ourselves. Therefore our sometime sister, now our queen, The imperial jointress to this warlike state, Have we, as 'twere with a defeated joy,-- With an auspicious and a dropping eye, With mirth in funeral and with dirge in marriage, In equal scale weighing delight and dole,-- Taken to wife: nor have we herein barr'd Your better wisdoms, which have freely gone With this affair along. For all, our thanks. Now follows, that you know, young Fortinbras, Holding a weak supposal of our worth, Or thinking by our late dear brother's death Our state to be disjoint and out of frame, Colleagued with the dream of his advantage, He hath not fail'd to pester us with message, Importing the surrender of those lands Lost by his father, with all bonds of law, To our most valiant brother. So much for him. Now for ourself and for this time of meeting: Thus much the business is: we have here writ To Norway, uncle of young Fortinbras,-- Who, impotent and bed-rid, scarcely hears Of this his nephew's purpose,--to suppress His further gait herein; in that the levies, The lists and full proportions, are all made Out of his subject: and we here dispatch You, good Cornelius, and you, Voltimand, For bearers of this greeting to old Norway; Giving to you no further personal power To business with the king, more than the scope Of these delated articles allow. Farewell, and let your haste commend your duty. Tis sweet and commendable in your nature, Hamlet,To give these mourning duties to your father: But, you must know, your father lost a father; That father lost, lost his, and the survivor bound In filial obligation for some term To do obsequious sorrow: but to persever In obstinate condolement is a course Of impious stubbornness; 'tis unmanly grief; It shows a will most incorrect to heaven, A heart unfortified, a mind impatient, An understanding simple and unschool'd: For what we know must be and is as common As any the most vulgar thing to sense, Why should we in our peevish opposition Take it to heart? Fie! 'tis a fault to heaven, A fault against the dead, a fault to nature, To reason most absurd: whose common theme Is death of fathers, and who still hath cried, From the first corse till he that died to-day, 'This must be so.' We pray you, throw to earth This unprevailing woe, and think of us As of a father: for let the world take note, You are the most immediate to our throne; And with no less nobility of love Than that which dearest father bears his son, Do I impart toward you. For your intent In going back to school in Wittenberg, It is most retrograde to our desire: And we beseech you, bend you to remain Here, in the cheer and comfort of our eye, Our chiefest courtier, cousin, and our son."
}));

// Configure labels
series.labels.template.setAll({
  paddingTop: 5,                     // room around each word, so neighbors don't touch
  paddingBottom: 5,
  paddingLeft: 5,
  paddingRight: 5,
  fontFamily: "Courier New",         // a monospaced font for every word
  tooltipText: "{category}: {value}" // the word and how many times it appears
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
