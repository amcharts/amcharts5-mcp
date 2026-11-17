---
title: "ResponsiveMaxTheme"
type: "class"
source: "https://docs.amcharts.com/v5/reference/responsivemaxtheme/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A theme that fits charts to small spaces by adapting them, hiding parts only as the last step. It turns on the settings that fit labels and legends to the room they have:

• `autoLabels` on axis renderers: labels spaced to fit, and hidden where they would be cut off or overlap another axis's labels. • `keepInView` on axis labels of a chart 400 px or smaller across the axis: a category or date period partly in view keeps its label in the part that is. • `autoLabels` on pie series: the pie moves aside or gets smaller, and its labels wrap, are shortened or are hidden, smallest slices first. • `autoLabels` on other series: bullet labels that would overlap or be cut off are hidden. Drawings on a stock chart are left alone. • `autoFit` on legends: smaller, then scrolling, with long names shortened. • `autoHide` on chart scrollbars: a vertical one goes on a chart 400 px wide or narrower, a horizontal one on a chart 300 px tall or lower (a stock chart is measured whole, not by panel); pinching zooms instead.

Below 400 px, text is drawn at 85% of its size, and axis labels, legend items and word cloud words get less padding; scrollbars get smaller margins. Charts keep their padding. Funnel, pyramid and pictorial labels stay unless the chart is tiny, and radar labels stay outside the circle.

Labels added in code with their own font size, such as a title, are drawn smaller on charts under 600 × 450 px instead, down to three quarters of their size; a label in the middle of a donut is fitted to the hole by the pie's `autoLabels`. A label whose own `scale` is set is left alone.

Settings set on an element in code win over the theme, as with any theme: `autoLabels: false` on a series or renderer turns that part off.

_Since 5.22.0._ Docs: https://docs.amcharts.com/v5/concepts/responsive-max/

## Import

```js
import am5themes_ResponsiveMax from "@amcharts/amcharts5/themes/ResponsiveMax";

root.setThemes([am5themes_ResponsiveMax.new(root)]);
```

## Inheritance

Extends: ResponsiveBaseTheme → Theme

## Methods

- `addRule(rule: IResponsiveRule): IResponsiveRule` — Adds a responsive rule and returns it. It applies at once if it is relevant. Parameters: `rule`: Responsive rule. Returns: Responsive rule
- `dispose(): void`
- `removeRule(rule: IResponsiveRule): void` — Removes a responsive rule from the theme, taking back its settings if it applies. Parameters: `rule`: Responsive rule.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Theme")`) for signatures and descriptions.

- _Theme_: rule, ruleRaw
