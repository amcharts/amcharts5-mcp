---
title: "WordCloud"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/wordcloud/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A word cloud: words sized by their values, from `data` or counted in `text`.

Docs: https://www.amcharts.com/docs/v5/charts/word-cloud/

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
