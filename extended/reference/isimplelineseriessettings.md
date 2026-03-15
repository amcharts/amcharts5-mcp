---
title: "ISimpleLineSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isimplelineseriessettings/"
scraped: "2026-03-15"
---

Inheritance
ISimpleLineSeriesSettings extends IDrawingSeriesSettings.
ISimpleLineSeriesSettings is extended by IAverageSeriesSettings, IFibonacciSeriesSettings, IHorizontalLineSeriesSettings, IHorizontalRaySeriesSettings, ILineArrowSeriesSettings, IRectangleSeriesSettings, IParallelChannelSeriesSettings, IQuadrantLineSeriesSettings, IRegressionSeriesSettings, ITrendLineSeriesSettings, IVerticalLineSeriesSettings.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        ariaChecked        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
aria-checked setting.
 This setting is ignored unless role is one of the following:

"checkbox"

"option"

"radio"

"menuitemcheckbox"

"menuitemradio"

"treeitem"


        ariaControls        
        #
      


                          Type undefined | string                      
Inherited from ISpriteSettings
aria-controls setting.


        ariaCurrent        
        #
      


                          Type undefined | string                      
Inherited from ISpriteSettings
aria-current setting.

## Inheritance

Extends: IDrawingSeriesSettings
Extended by: IAverageSeriesSettings, IFibonacciSeriesSettings, IHorizontalLineSeriesSettings, IHorizontalRaySeriesSettings, ILineArrowSeriesSettings, IRectangleSeriesSettings, IParallelChannelSeriesSettings, IQuadrantLineSeriesSettings, IRegressionSeriesSettings, ITrendLineSeriesSettings, IVerticalLineSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IDrawingSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **showExtension** (`undefined | false | true`) — Default true Show a dotted line extending from both ends of the drawn line.
