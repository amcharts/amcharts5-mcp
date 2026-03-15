---
title: "IContainerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icontainersettings/"
scraped: "2026-03-15"
---

Inheritance
IContainerSettings extends ISpriteSettings.
IContainerSettings is extended by ILabelSettings, IComponentSettings, IFlowNodeSettings, IChartSettings, IButtonSettings, ITooltipSettings, IZoomableContainerSettings, IHeatLegendSettings, ILinkSettings, IScrollbarSettings, IZoomToolsSettings, ISpriteResizerSettings, INumericStepperSettings, IProgressPieSettings, IXYCursorSettings, IColorPickerSettings, IColorPickerButtonSettings, IGanttSettings, IBreadcrumbBarSettings, IHierarchyNodeSettings, IClockHandSettings, IIndicatorSettings, IPanelControlsSettings, IStockChartSettings.
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

Extends: ISpriteSettings
Extended by: ILabelSettings, IComponentSettings, IFlowNodeSettings, IChartSettings, IButtonSettings, ITooltipSettings, IZoomableContainerSettings, IHeatLegendSettings, ILinkSettings, IScrollbarSettings, IZoomToolsSettings, ISpriteResizerSettings, INumericStepperSettings, IProgressPieSettings, IXYCursorSettings, IColorPickerSettings, IColorPickerButtonSettings, IGanttSettings, IBreadcrumbBarSettings, IHierarchyNodeSettings, IClockHandSettings, IIndicatorSettings, IPanelControlsSettings, IStockChartSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISpriteSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **background** (`Graphics`) — Background element. Click here for more info
- **html** (`undefined | string`) — HTML content of the container. Click here for more info @since 5.2.11
- **interactiveChildren** (`undefined | false | true`) — If set to true all descendants - not just direct children, but every element in it - will become "interactive".
- **layout** (`Layout | null`) — A method to layout Click here for more info
- **mask** (`Graphics | null`) — An element to use as a container's mask (clipping region). Click here for more info
- **maskContent** (`undefined | false | true`) — If set to true all content going outside the bounds of the container will be clipped.
- **paddingBottom** (`undefined | number`) — Bottom padding in pixels.
- **paddingLeft** (`undefined | number`) — Left padding in pixels.
- **paddingRight** (`undefined | number`) — Right padding in pixels.
- **paddingTop** (`undefined | number`) — Top padding in pixels.
- **reverseChildren** (`undefined | false | true`) — If set to true its children will be laid out in opposite order. @since 5.1.1
- **setStateOnChildren** (`undefined | false | true`) — If set to true, applying a state on a container will also apply the same state on its children. Click here for more info
- **verticalScrollbar** (`Scrollbar`) — Setting this to an instance of Scrollbar will enable vertical scrolling of content if it does not fit into the Container. Click here for more info
