---
title: "IWordCloudSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iwordcloudsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesSettings
All ancestors: ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5wc.WordCloud` (see its page for the class)
TypeScript: `am5wc.IWordCloudSettings` (`import type { IWordCloudSettings } from "@amcharts/amcharts5/wc"`)

## Settings

- **animationDuration** (`number`) — default `0` _(code fallback)_ — Duration, in milliseconds, of words moving to their new places when the cloud is laid out again, as when the chart resizes.
- **animationEasing** (`(t: Time) => Time`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing of words moving to their new places. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Easing_functions
- **autoFit** (`boolean`) — default `true` _(theme)_ — Shrinks all words until every one of them fits. When off, words that don't fit are left out.
- **progress** (`number`) — Layout progress, from `0` to `1`. The layout runs in one pass, so this turns `1` each time it finishes: watch it to know when words are placed.
- **colors** (`ColorSet`) — Colors for words with no `fill` in data, one after another.
- **categoryField** (`string`) — default `"category"` _(class default)_ — Field in `data` that holds the words.
- **fillField** (`string`) — default `"fill"` _(class default)_ — Field in `data` that holds a word's color.
- **text** (`string`) — Text to make the cloud from: each word's value is the number of times it appears. Replaces `data`.
- **minFontSize** (`number | Percent`) — default `am5.percent(2)` _(theme)_ — Font size of the words with the lowest value: in pixels, or a share of the smaller of the cloud's width and height.
- **maxFontSize** (`number | Percent`) — default `am5.percent(15)` _(theme)_ — Font size of the words with the highest value: in pixels, or a share of the smaller of the cloud's width and height.
- **minValue** (`number`) — default `1` _(code fallback)_ — Fewest times a word must appear in `text` to be shown.
- **maxCount** (`number`) — default `Infinity` _(code fallback)_ — Most words to take from `text`, most frequent first. Doesn't limit `data`.
- **excludeWords** (`string[]`) — default `[]` _(theme)_ — Words of `text` to leave out. Case-sensitive.
- **randomness** (`number`) — default `0` _(theme)_ — How randomly words are placed, from `0` (from the middle outwards, in order of value) to `1`.
- **minWordLength** (`number`) — default `1` _(theme)_ — Fewest characters a word of `text` must have to be shown.
- **angles** (`number[]`) — default `[0, -90]` _(theme)_ — Angles, in degrees, that words can be rotated to. _Note:_ Any angles work since 5.20.1 (e.g. `[0, -30, -45]`); earlier versions handled only 0, 90 and -90. An overly wide word may still be turned to 0 or ±90 for a better fit, but only to a value present in `angles`.
- **randomizeAngles** (`boolean`) — default `true` — Gives each word a random angle from `angles`, so the cloud differs on every layout. When `false`, words take `angles` in turn, which with `randomness: 0` makes the layout the same every time. _Since 5.20.1._
- **allowNesting** (`boolean`) — default `true` — Lets small words tuck into the gaps between a bigger word's letters, so the cloud packs tightly, though the words' boxes overlap. Set to `false` to keep boxes apart, as for labels with an opaque `background`. _Since 5.20.1._
- **step** (`number`) — default `15` _(theme)_ — Spacing of the spiral of points that words are tried at. Smaller packs words more tightly, but takes longer.
- **svgPath** (`string`) — Experimental: an SVG path for the words to fill, scaled to fit the cloud. The fit is approximate. Simple, bold shapes work best; tune `shapeTolerance`, `maskByShape`, `angles`, `minFontSize` and `maxFontSize` for a better fill. _Since 5.20.1._
- **shapeTolerance** (`number`) — default `0` — How many more pixels a word may reach past the `svgPath` outline, on top of the bit each word overhangs by itself in proportion to its size. A negative value keeps words further inside. Affects placement only, not the drawn `shape`. _Since 5.20.1._
- **maskByShape** (`boolean`) — default `false` — Clips the words to the `svgPath` shape, cutting off letters that reach past its edge. _Since 5.20.1._

## Inherited settings with a different default on WordCloud

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **sequencedDelay** (`number`) — default `15` _(theme)_ — _from ISeriesSettings_ — Extra delay in milliseconds between the animations of consecutive data items, with `sequencedInterpolation`. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
- **sequencedInterpolation** (`boolean`) — default `true` _(theme)_ — _from ISeriesSettings_ — Shows and hides the data items one after another instead of all at once, including in the initial animation. Works in XY and percent series. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
- **valueField** (`string`) — default `"value"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for a numeric value of the data item. Some series draw their elements by it; heat rules can use it too.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesSettings")`) for types, defaults and descriptions.

- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendLabelText, legendValueText, linkTarget, name, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData

## Notes

### Breaking change in 5.20.1

The WordCloud layout is computed synchronously in a single pass instead of one word per animation frame — much faster for large clouds. The per-data-item `ghostLabel` was removed and labels are held in an internal container, so code reading `dataItem.get("ghostLabel")` or walking `series.children` for labels needs updating. Use `series.labels` (a `ListTemplate<Label>`) or `dataItem.get("label")` instead.

A `series.shape` (`Graphics`) element draws the `svgPath` outline behind the words. Its geometry and `forceHidden` are managed by the series — only `fill`/`stroke` styling is yours to set.
