---
title: "ColorPickerButton"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/colorpickerbutton/"
scraped: "2026-03-15"
---

Sources
ColorPickerButton can be used (imported) via one of the following packages.
// Import ColorPickerButton
import * as am5plugins_colorPicker from "@amcharts/amcharts5/plugins/colorPicker";

am5plugins_colorPicker.ColorPickerButton.new(root, {
  // ... config if applicable
});

<!-- Load ColorPickerButton -->
<script src="plugins/colorPicker.js">

<script>
// Create ColorPickerButton
am5plugins_colorPicker.ColorPickerButton.new(root, {
  // ... config if applicable
});
</script>

## Import

```javascript
// Import ColorPickerButton
import * as am5plugins_colorPicker from "@amcharts/amcharts5/plugins/colorPicker"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **backgroundColor** (`Color`) — (no description)
- **color** (`Color`) — (no description)
- **colorOpacity** (`undefined | number`) — (no description)
- **disableOpacity** (`undefined | false | true`) — (no description)

## Properties

- **icon** (`Graphics`) — Default this.children.push(Graphics.new(this._root, { themeTags: ["icon"] }))
- **noColorGraphics** (`Graphics`) — Default this.children.push(Graphics.new(this._root, { themeTags: ["nocolor"] }))
