---
title: "Theme"
type: "class"
source: "https://docs.amcharts.com/v5/reference/theme/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A base class for an amCharts theme.

Docs: https://docs.amcharts.com/v5/concepts/themes/

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: (none)
Extended by: AnimatedTheme, ColorPickerDefaultTheme, ColorblindTheme, CurveDefaultTheme, DarkTheme, DatavizTheme, DefaultTheme, EmberTheme, FlowDefaultTheme, FrozenTheme, GanttDefaultTheme, HierarchyDefaultTheme, KellyTheme, MapChartDefaultTheme, MaterialTheme, MicrochartTheme, MidnightTheme, MoonriseTheme, NordDarkTheme, NordTheme, PastelDarkTheme, PastelTheme, PatternsDarkTheme, PatternsTheme, PercentDefaultTheme, PetroleumTheme, RadarDefaultTheme, ResponsiveBaseTheme, SavannaTheme, SpiritedTheme, StockChartDefaultTheme, VennDefaultTheme, WordCloudDefaultTheme, XYChartDefaultTheme

## Methods

- `rule<K extends keyof IClasses>(themeClass: K, themeTags?: Array<string>): Template<IClasses[K]>` — Returns the rule for a class and theme tags, as a `Template`. Settings set on it go to every element of that class (or a class extending it) that has all of these tags. The same class and tags return the same rule. Parameters: `themeClass`: Class name, e.g. `"Label"`; `themeTags`: Theme tags. Returns: Template Docs: https://docs.amcharts.com/v5/concepts/themes/
- `ruleRaw<A extends Entity>(themeClass: string, themeTags?: Array<string>): Template<A>` — Same as `rule()`, but takes any class name, without type checks. Parameters: `themeClass`: Class name; `themeTags`: Theme tags. Returns: Template Docs: https://docs.amcharts.com/v5/concepts/themes/
