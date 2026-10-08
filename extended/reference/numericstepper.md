---
title: "NumericStepper"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/numericstepper/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A number field with up and down arrows. The number can also be typed in.

_Since 5.14.0._

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.NumericStepper.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `INumericStepperSettings` — get_api_reference shows it after this page
- Private settings: `INumericStepperPrivate`

## Properties

Public properties (not settings):

- **buttonsContainer** (`Container`) — The container of the up and down arrows, shown while the pointer is over the stepper.
- **downButton** (`Triangle`) — The arrow that decreases the value.
- **label** (`EditableLabel`) — The editable label that shows the number.
- **upButton** (`Triangle`) — The arrow that increases the value.
