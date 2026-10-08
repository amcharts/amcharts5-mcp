---
title: "BreadcrumbBar"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/breadcrumbbar/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A breadcrumb bar for a hierarchy series: a label for each node on the path from the root to the selected node. Clicking a label selects that node.

Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/breadcrumbs/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.BreadcrumbBar.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IBreadcrumbBarSettings` — get_api_reference shows it after this page
- Private settings: `IBreadcrumbBarPrivate`
- Events: `IBreadcrumbBarEvents`

## Properties

Public properties (not settings):

- **labels** (`ListTemplate<Label>`) — List of the bar's labels; configure them all through `labels.template`.
