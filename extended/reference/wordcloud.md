---
title: "WordCloud"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/wordcloud/"
scraped: "2026-03-15"
---

Creates a WordlCloud series.

## Import

```javascript
// Import WordCloud
import * as am5wc from "@amcharts/amcharts5/wc"
```

## Inheritance

Extends: Series

> **Note:** This class also inherits all settings, properties, methods, and events from Series (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **angles** (`number[]`) — An array of possible rotation angles for words.
- **animationDuration** (`undefined | number`) — Duration of word animation when chart resizes.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Default am5.ease.out($ease.cubic) An easing function to use for word animations. Click here for more info
- **autoFit** (`undefined | false | true`) — Default false
- **categoryField** (`undefined | string`) — A field in data that holds category names.
- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for slices.
- **excludeWords** (`Array`) — Array of words exclude from cloud.
- **fillField** (`undefined | string`) — A field that holds color for label fill.
- **maxCount** (`undefined | number`) — Maximum number of words to show.
- **maxFontSize** (`number | Percent`) — Absolute or relative font size for the biggest words.
- **minFontSize** (`number | Percent`) — Absolute or relative font size for the smallest words.
- **minValue** (`undefined | number`) — Minimum occurances for a word to be included into cloud.
- **minWordLength** (`undefined | number`) — Minimum number of characters for a word to be included in the cloud.
- **progress** (`undefined | number`) — Progress of current word layout animation. (0-1) @readonly
- **randomness** (`undefined | number`) — Randomness of word placement (0-1).
- **step** (`undefined | number`) — Step for next word placement.
- **text** (`undefined | string`) — Source text from which words are extracted.

## Properties

- **labels** (`ListTemplate`) — Default this.addDisposer(this._makeLabels()) A ListTemplate of all labels in series. labels.template can also be used to configure labels.
