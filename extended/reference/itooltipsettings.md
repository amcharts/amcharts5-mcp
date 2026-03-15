---
title: "ITooltipSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itooltipsettings/"
scraped: "2026-03-15"
---

Inheritance
ITooltipSettings extends IContainerSettings.
ITooltipSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        animationDuration        
        #
      


                          Type undefined | number                      
Duration in milliseconds for tooltip position change, e.g. when tooltip is jumping from one target to another.


        animationEasing        
        #
      


                          Type undefined | ( t: Time) => Time                      
Easing function for tooltip animation.

## Inheritance

Extends: IContainerSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IContainerSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **animationDuration** (`undefined | number`) — Duration in milliseconds for tooltip position change, e.g. when tooltip is jumping from one target to another.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Easing function for tooltip animation. Click here for more info
- **autoTextColor** (`undefined | false | true`) — Default true If set to true tooltip will adjust its text color for better visibility on its background.
- **bounds** (`IBounds`) — Screen bounds to constrain the tooltip within.
- **getFillFromSprite** (`undefined | false | true`) — Default true If set to true will use the same fill color for its background as its tooltipTarget. Click here for more info
- **getFillGradientFromSprite** (`undefined | false | true`) — Default false If set to true will use the same filGradientl for its background as its tooltipTarget. Click here for more info
- **getLabelFillFromSprite** (`undefined | false | true`) — Default false If set to true will use the same fill color as its tooltipTarget. Click here for more info
- **getStrokeFromSprite** (`undefined | false | true`) — Default false If set to true will use the same stroke color as its tooltipTarget. Click here for more info
- **keepTargetHover** (`undefined | false | true`) — If set to true, tooltip's target element will considered to be hovered when mouse pointer is over tooltip itself. @since 5.2.14
- **labelAriaLabel** (`undefined | string`) — A screen reader content for the label. Used in conjuction with readerAnnounce. If it is set to true, and labelAriaLabel is set, its contents will be read out by a screen reader when tooltip is shown or its data item changes. Otherwise, regular labelText (or text set directly on tooltip label) will be used for scree reader announcement. @since 5.9.2
- **labelHTML** (`undefined | string`) — HTML content to use for tooltip's label. @since 5.2.11
- **labelText** (`undefined | string`) — Text to use for tooltip's label.
- **pointTo** (`IPoint`) — Screen coordinates the tooltip show point to.
- **pointerOrientation** (`"left" | "right" | "up" | "down" | "vertical" | "horizontal"`) — A direction of the tooltip pointer. https://www.amcharts.com/docs/v5/concepts/common-elements/tooltips/#Orientation
- **readerAnnounce** (`undefined | false | true`) — Default false If set to true the tooltip contents will be read out by a screen reader when displayed or changed. @since 5.9.2
- **tooltipTarget** (`Sprite`) — A target element tooltip is shown fow.
