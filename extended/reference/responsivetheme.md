---
title: "ResponsiveTheme"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/responsivetheme/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A theme that changes chart settings as the chart's size changes, so charts fit small spaces. `new()` comes with built-in rules for the common chart types; `newEmpty()` starts with none, for rules of your own.

Docs: https://www.amcharts.com/docs/v5/concepts/responsive/

## Import

```js
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

root.setThemes([am5themes_Responsive.new(root)]);
```

## Inheritance

Extends: Theme

## Properties

Public properties (not settings):

- **responsiveRules** (`IResponsiveRule[]`) — Rules added to the theme.
