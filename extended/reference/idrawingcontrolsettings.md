---
title: "IDrawingControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idrawingcontrolsettings/"
scraped: "2026-03-15"
---

Inheritance
IDrawingControlSettings extends IStockControlSettings.
IDrawingControlSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Default false

Inherited from IStockControlSettings
Indicates if control is active.


        align        
        #
      


                          Type "left" | "right"                      
Default "left"

Inherited from IStockControlSettings
Alignment of the control in a toolbar.


        colors        
        #
      


                          Type ColorSet                      
Colors to show in color pickers.

## Inheritance

Extends: IStockControlSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IStockControlSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **colors** (`ColorSet`) — Colors to show in color pickers. Click here for more info
- **drawingIcon** (`IIcon`) — (no description)
- **drawingIcons** (`IIcon[]`) — (no description)
- **fillColor** (`Color`) — Default fill color.
- **fillOpacity** (`undefined | number`) — Default fill opacity.
- **labelFill** (`Color`) — Default color for labels.
- **labelFontFamilies** (`string[]`) — Available fonts for user to choose from.
- **labelFontFamily** (`undefined | string`) — Default label font.
- **labelFontSize** (`number | string | undefined`) — Default label font size.
- **labelFontSizes** (`Array`) — Available font sizes.
- **labelFontStyle** (`"normal" | "italic" | "oblique"`) — Default label style.
- **labelFontWeight** (`"normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"`) — Default label font weight.
- **scrollable** (`undefined | false | true`) — If set to true, the dropdown will fix the height to fit within chart's area, with scroll if the contents do not fit. @since 5.9.5
- **series** (`XYSeries[]`) — Target series for drawing.
- **showExtension** (`undefined | false | true`) — Default true Show dotted/thin line extending from both ends of the drawn line?
- **snapToData** (`undefined | false | true`) — Default true Should drawings snap to the nearest data point?
- **strokeColor** (`Color`) — Default color for lines/borders.
- **strokeDasharray** (`number[]`) — Default dasharray setting.
- **strokeDasharrays** (`number[]`) — Available line dash settings for user to choose from.
- **strokeOpacity** (`undefined | number`) — Default line/border opacity.
- **strokeWidth** (`undefined | number`) — Default line/border width in pixels.
- **strokeWidths** (`number[]`) — Available line widths for user to choose from.
- **tool** (`DrawingTools`) — Default tool.
- **toolSettings** (`undefined | object`) — Default settings for drawing tools. @since 5.5.2 Click here for more info
- **tools** (`DrawingTools[]`) — List of tools available in drawing mode. Click here for more info
