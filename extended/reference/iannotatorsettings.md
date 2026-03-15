---
title: "IAnnotatorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iannotatorsettings/"
scraped: "2026-03-15"
---

Inheritance
IAnnotatorSettings extends IEntitySettings.
IAnnotatorSettings is not extended by any other symbol.
Properties


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        layer        
        #
      


                          Type undefined | number                      
Default 1000

Layer number to use for annotations.


        markerSettings        
        #
      


                          Type undefined | object                      
MarkerArea settings in form of an object where keys are setting names and value is a setting value. E.g.:
let annotator = am5plugins_exporting.Annotator.new(root, {
 markerSettings: {
   defaultColorSet: ["red", "green", "blue"],
   wrapText: true
 }
});

var annotator = am5plugins_exporting.Annotator.new(root, {
 markerSettings: {
   defaultColorSet: ["red", "green", "blue"],
   wrapText: true
 }
});

## Inheritance

Extends: IEntitySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **layer** (`undefined | number`) — Default 1000 Layer number to use for annotations.
- **markerSettings** (`undefined | object`) — MarkerArea settings in form of an object where keys are setting names and value is a setting value. E.g.: let annotator = am5plugins_exporting.Annotator.new(root, { markerSettings: { defaultColorSet: ["red", "green", "blue"], wrapText: true } }); var annotator = am5plugins_exporting.Annotator.new(root, { markerSettings: { defaultColorSet: ["red", "green", "blue"], wrapText: true } }); Click here for a full list of settings @since 5.7.4
- **markerState** (`any`) — Raw annotation info saved by MarkerJS.
- **markerStyleSettings** (`undefined | object`) — MarkerArea style settings for user interface elements.E.g.: let annotator = am5plugins_exporting.Annotator.new(root, { markerStyleSettings: { toolboxColor: "#F472B6", toolboxAccentColor: "#BE185D" } }); var annotator = am5plugins_exporting.Annotator.new(root, { markerStyleSettings: { toolboxColor: "#F472B6", toolboxAccentColor: "#BE185D" } }); Click here for a full list of settings @since 5.7.5
