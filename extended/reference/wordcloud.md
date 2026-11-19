---
title: "WordCloud"
type: "class"
source: "https://docs.amcharts.com/v5/reference/wordcloud/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A word cloud: words sized by their values, from `data` or counted in `text`.

Docs: https://docs.amcharts.com/v5/charts/word-cloud/

## Import

```js
import * as am5wc from "@amcharts/amcharts5/wc";

am5wc.WordCloud.new(root, { /* settings */ });
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IWordCloudSettings` — get_api_reference shows it after this page
- Private settings: `IWordCloudPrivate`
- Data item fields: `IWordCloudDataItem`

## Properties

Public properties (not settings):

- **labels** (`ListTemplate<Label>`) — Labels of all words. Configure them through `labels.template`.
- **shape** (`Graphics`) — Draws the `svgPath` shape behind the words, while it is set: a faint silhouette by default. Style it with `series.shape.setAll({ ... })`; its geometry and visibility are the series'. _Since 5.20.1._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
