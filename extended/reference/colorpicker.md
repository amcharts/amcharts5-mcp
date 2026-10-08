---
title: "ColorPicker"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/colorpicker/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A color picker with a color square, a hue slider, an eyedropper, a hex input and an opacity slider. It opens for the `ColorPickerButton` set as its `colorButton`.

## Import

```js
import * as am5plugins_colorPicker from "@amcharts/amcharts5/plugins/colorPicker";

am5plugins_colorPicker.ColorPicker.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IColorPickerSettings` — get_api_reference shows it after this page
- Private settings: `IColorPickerPrivate`
- Events: `IColorPickerEvents`

## Properties

Public properties (not settings):

- **cancelButton** (`Button`) — Button that restores the previous color and closes the picker.
- **colorInput** (`EditableLabel`) — Editable label that shows the color in hex and takes a typed one.
- **gradientsContainer** (`Container`) — Container with the color square and the hue slider.
- **noColorButton** (`Button`) — Button that removes the color and closes the picker.
- **okButton** (`Button`) — Button that confirms the color, dispatching `colorchanged`, and closes the picker.
- **opacitySlider** (`Slider`) — Slider that sets the color's opacity. Hidden when the `colorButton` has `disableOpacity`.
- **pickerButton** (`Button`) — Toggle button for the eyedropper: while it is on, the color follows the chart pixel under the pointer, and a click keeps it.
- **rectangles** (`ListTemplate<RoundedRectangle>`)
- **slider** (`Slider`) — Vertical slider that sets the hue.
- **targetCircle** (`Circle`) — Circle that marks the selected color on the color square.
