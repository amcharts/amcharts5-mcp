---
title: "Word Cloud from Text (JSON config)"
category: "json-configs"
source: "@amcharts/amcharts5@5.21.4: examples/wordcloud-with-text/config.json"
---

# Word Cloud from Text (JSON config)

A word cloud made from a paragraph of text: the series counts the words and sizes them by how often they are used.

Chart family: other · Tags: word cloud, text

A complete amCharts 5 JSON config, as shipped in the `@amcharts/amcharts5` npm package (examples/wordcloud-with-text/config.json, version 5.21.4). It works with `am5plugins_json.JsonParser`, the `<am5-chart>` element, the framework packages' `config` prop, and Chart Maker links. The rules for writing one are in the skill's JSON reference (get_chart_reference("json")).

Themes are not part of a config. The example is meant for: Animated, set with `root.setThemes()`, the element's `themes` attribute, or a Chart Maker link's `theme`.

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/plugins/json.js
- https://cdn.amcharts.com/lib/5/wc.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js (theme, applied separately)

## JSON config

```json
{
  "type": "WordCloud",
  "settings": {
    "text": "'Tis sweet and commendable in your nature, Hamlet, to give these mourning duties to your father: but, you must know, your father lost a father; that father lost, lost his, and the survivor bound in filial obligation for some term to do obsequious sorrow: but to persever in obstinate condolement is a course of impious stubbornness; 'tis unmanly grief; it shows a will most incorrect to heaven, a heart unfortified, a mind impatient, an understanding simple and unschool'd: for what we know must be and is as common as any the most vulgar thing to sense, why should we in our peevish opposition take it to heart? Fie! 'tis a fault to heaven, a fault against the dead, a fault to nature, to reason most absurd: whose common theme is death of fathers, and who still hath cried, from the first corse till he that died to-day, 'This must be so.'",
    "maxCount": 100,
    "minWordLength": 3,
    "excludeWords": [
      "and",
      "the",
      "that",
      "but",
      "for"
    ],
    "minFontSize": {
      "type": "Percent",
      "value": 4
    },
    "maxFontSize": {
      "type": "Percent",
      "value": 25
    },
    "angles": [
      0,
      0,
      -90
    ],
    "randomizeAngles": false,
    "autoAppear": true,
    "appearDuration": 1000,
    "appearDelay": 100
  },
  "properties": {
    "labels": {
      "properties": {
        "template": {
          "settings": {
            "paddingTop": 5,
            "paddingBottom": 5,
            "paddingLeft": 5,
            "paddingRight": 5,
            "fontFamily": "Courier New"
          }
        }
      }
    }
  },
  "refs": []
}
```
