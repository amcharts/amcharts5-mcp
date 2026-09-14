---
title: "IRootSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/irootsettings/"
scraped: "2026-03-15"
---

Inheritance
IRootSettings does not extend any other symbol.
IRootSettings is not extended by any other symbol.
Properties


        accessible        
        #
      


                          Type undefined | false | true                      
Default true
Set to false to disable all accessibility features.
 NOTE: once disabled, accessibility cannot be re-enabled on a live Root object.
@since 5.3.0


        ariaLabel        
        #
      


                          Type undefined | string                      
If set to some string, it will be used as inner <div> ARIA-LABEL.
 Should be used in conjuction with focusable.
@since 5.3.17

## Properties

- **accessible** (`undefined | false | true`) — Default true Set to false to disable all accessibility features. NOTE: once disabled, accessibility cannot be re-enabled on a live Root object. @since 5.3.0
- **ariaLabel** (`undefined | string`) — If set to some string, it will be used as inner <div> ARIA-LABEL. Should be used in conjuction with focusable. @since 5.3.17 Click here for more info
- **calculateSize** (`undefined | ( dimensions: DOMRect) => ISize`) — Allows for specifying a custom width / height for the chart. This function will be called automatically when the chart is resized.
- **focusPadding** (`undefined | number`) — Default 2 Distance between focused element and its highlight square in pixels. @since 5.6.0
- **focusable** (`undefined | false | true`) — Default false If set to true, the parent inner <div> element will become a focusable element. @since 5.3.17 Click here for more info
- **role** (`undefined | string`) — Allows setting a "role" for the inner <div>. @since 5.3.17 Click here for more info
- **tooltipContainerBounds** (`undefined | { bottom: number,  left: number,  right: number,  top: number }`) — Allows defining margins around chart area for tooltips to go outside the chart itself. @since 5.2.24

- **fontFamily** (`undefined | string`) — Default font family for all text elements, unless overridden on an element. @since 5.20.2
- **fontSize** (`undefined | number | string`) — Default font size for all text elements, unless overridden on an element. @since 5.20.2
- **fontWeight** (`"normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"`) — Default font weight for all text elements, unless overridden on an element. @since 5.20.2
- **sanitizeHTML** (`undefined | false | true`) — Default true If set to true, dynamically-set HTML (html/labelHTML, HTML tooltips, modal content) is sanitized. Set to false to opt out. @since 5.19.0
