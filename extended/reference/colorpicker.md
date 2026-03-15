---
title: "ColorPicker"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/colorpicker/"
scraped: "2026-03-15"
---

Sources
ColorPicker can be used (imported) via one of the following packages.
// Import ColorPicker
import * as am5plugins_colorPicker from "@amcharts/amcharts5/plugins/colorPicker";

am5plugins_colorPicker.ColorPicker.new(root, {
  // ... config if applicable
});

<!-- Load ColorPicker -->
<script src="plugins/colorPicker.js">

<script>
// Create ColorPicker
am5plugins_colorPicker.ColorPicker.new(root, {
  // ... config if applicable
});
</script>

## Import

```javascript
// Import ColorPicker
import * as am5plugins_colorPicker from "@amcharts/amcharts5/plugins/colorPicker"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **backgroundColor** (`Color`) — Background color of the color picker.
- **color** (`Color`) — Color of the color picker.
- **colorButton** (`ColorPickerButton`) — Color picker button to use.
- **colorOpacity** (`undefined | number`) — Opacity of the color.
- **hue** (`undefined | number`) — (no description)

## Properties

- **cancelButton** (`Button`) — Default this.buttonsContainer.children.push(Button.new(this._root, { themeTags: ["cancel"], label: Label.new(this._root, { }) })) Button that allows to cancel color selection.
- **colorInput** (`EditableLabel`) — Default this.inputContainer.children.push(EditableLabel.new(this._root, { themeTags: ["input", "color"] })) Editable label that allows to input color in hex format.
- **colorRectangleWhiteOverlay** (`Rectangle`) — Default this.colorGradientsContainer.children.push(Rectangle.new(this._root, { crisp: true, forceInactive: true, width: p100, height: p100 })) Rectangle that displays the white overlay. @ignore*
- **gradientsContainer** (`Container`) — Default this.children.push(Container.new(this._root, { themeTagsSelf: ["gradientscontainer"], width: p100, layout: this._root.horizontalLayout })) Container for color gradients.
- **noColorButton** (`Button`) — Default this.inputContainer.children.push(Button.new(this._root, { themeTags: ["nocolor", "pickertool"], icon: Graphics.new(this._root, { themeTags: ["icon"] }) })) Button that allows to remove color.
- **okButton** (`Button`) — Default this.buttonsContainer.children.push(Button.new(this._root, { themeTags: ["ok"], label: Label.new(this._root, { }) })) Button that allows to confirm color selection.
- **opacitySlider** (`Slider`) — Default this.opacityContainer.children.push(Slider.new(this._root, { themeTags: ["opacity"], orientation: "horizontal" })) Slider that allows to change opacity of the color.
- **pickerButton** (`Button`) — Default this.inputContainer.children.push(Button.new(this._root, { themeTags: ["picker", "pickertool"], toggleKey: "active", icon: Graphics.new(this._root, { themeTags: ["icon"] }) })) Button that shows color picker button.
- **rectangles** (`ListTemplate`) — Default new ListTemplate( Template.new({ }), () => RoundedRectangle._new(this._root, { }, [this.rectangles.template]) )
- **slider** (`Slider`) — Default this.gradientsContainer.children.push(Slider.new(this._root, { orientation: "vertical", themeTags: ["gradient"] })) Slider that displays the hue of the color.
- **targetCircle** (`Circle`) — Default this.colorGradientsContainer.children.push(Circle.new(this._root, { themeTags: ["circle", "target"], isMeasured: false, forceInactive: true, position: "absolute", layer: 30 })) Circle that indicates the target color.
