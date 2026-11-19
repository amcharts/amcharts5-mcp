---
title: "SvgDefs"
type: "class"
source: "https://docs.amcharts.com/v5/reference/svgdefs/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

`<defs>` content by markup: the same markup always gets the same id, so the elements that reference it keep the same markup from frame to frame.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **used** (`Set<string>`)

## Methods

- `begin(): void`
- `id(kind: string, markup: string): string` — The id of a def given as markup without an id attribute.
- `sweep(): void` — Forgets defs not used since `begin()`.
- `withId(markup: string): string` — The def as it goes into `<defs>`.
