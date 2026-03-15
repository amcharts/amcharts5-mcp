---
title: "IGrainPatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/igrainpatternsettings/"
scraped: "2026-03-15"
---

Inheritance
IGrainPatternSettings extends IPatternSettings.
IGrainPatternSettings is not extended by any other symbol.
Properties


        color        
        #
      


                          Type Color                      
Inherited from IPatternSettings
Color of the pattern shape.

## Inheritance

Extends: IPatternSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IPatternSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **colors** (`Array`) — Default [color(0x000000)] An array of colors to randomly use for pixels.
- **density** (`undefined | number`) — Default 1 Density of noise. Value range: 0 (no noise applied) to 1 (noise is applied to every pixel). The bigger the value, the higher chance that pixel will have another pixel painted over with random opacity from minOpacity to maxOpacity.
- **horizontalGap** (`undefined | number`) — Default 0 Horizontal gap between noise pixels measured in size.
- **maxOpacity** (`undefined | number`) — Default 0.3 Maximum opacity of a noise pixel.
- **minOpacity** (`undefined | number`) — Default 0 Minimum opacity of a noise pixel.
- **size** (`undefined | number`) — Default 1 Size of a grain in pixels.
- **verticalGap** (`undefined | number`) — Default 0 Vertical gap between noise pixels measured in size.
