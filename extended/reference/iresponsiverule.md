---
title: "IResponsiveRule"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iresponsiverule/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A responsive rule: settings for matching elements that apply while the chart's size meets a condition.

Docs: https://www.amcharts.com/docs/v5/concepts/responsive/

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **name** (`string`) — Class name of the elements the rule applies to, such as `"AxisLabel"`.
- **tags** (`string | string[]`) — Theme tags the elements must also have.
- **settings** (`any`) — Settings for the elements while the rule applies. Needs `name`.
- **relevant** (`(width: number, height: number) => boolean`) — Returns `true` while the rule should apply. Gets the root's width and height in pixels; the breakpoint functions of `ResponsiveTheme`, such as `ResponsiveTheme.widthM`, fit here.
- **applying** (`() => void`) — Called when the rule starts to apply.
- **removing** (`() => void`) — Called when the rule stops applying.
- **applied** (`boolean`) — Whether the rule currently applies.
- **template** (`Template<any>`) — The theme rule's `Template` that `settings` are set on.
- **_dp** (`MultiDisposer`) — _(internal)_
