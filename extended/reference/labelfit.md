---
title: "LabelFit"
type: "class"
source: "https://docs.amcharts.com/v5/reference/labelfit/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Keeps the labels its owner hid for not fitting, with the box and place they had, and tells when one would fit again.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **out** (`{ [uid: number]: { label: Label; box: IBounds; x: number; y: number; text: string; w: number; h: number; font: string; }; }`)

## Methods

- `check(label: Label, box: IBounds | undefined, fits: (box: IBounds) => boolean, populate?: boolean): number` — Checks a label: `box` is where it is drawn, if it is. Returns 1 when it is to be hidden, -1 when it is to be shown again, 0 otherwise. `populate` reads its text anew, which is slow, for a label whose drawn text may be out of date.
- `end(): boolean` — Ends a pass. Returns whether a label waits for one more pass to be hidden.
