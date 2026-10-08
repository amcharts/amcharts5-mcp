---
title: "IAnnotatorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iannotatorsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5plugins_exporting.Annotator` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **layer** (`number`) — default `1000` _(class default)_ — Layer the annotations are drawn on, above the chart.
- **markerState** (`any`) — The annotations, as state saved by MarkerJS. Setting it draws them, e.g. to restore annotations saved earlier.
- **markerSettings** (`{ [index: string]: any; }`) — default `{}` _(code fallback)_ — Settings for MarkerJS's `MarkerArea`, as an object of setting names and values, e.g.:

  ```ts
  let annotator = am5plugins_exporting.Annotator.new(root, {
   markerSettings: {
     defaultColorSet: ["red", "green", "blue"],
     wrapText: true
   }
  });
  ```

  _Since 5.7.4._ Docs: https://markerjs.com/reference/classes/settings.html

- **markerStyleSettings** (`{ [index: string]: any; }`) — default `{}` _(code fallback)_ — Style settings for the MarkerJS user interface, e.g.:

  ```ts
  let annotator = am5plugins_exporting.Annotator.new(root, {
   markerStyleSettings: {
     toolboxColor: "#F472B6",
     toolboxAccentColor: "#BE185D"
   }
  });
  ```

  _Since 5.7.5._ Docs: https://markerjs.com/reference/classes/settings.html

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
