---
title: "IPatternSetSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipatternsetsettings/"
scraped: "2026-03-15"
---

Inheritance
IPatternSetSettings extends IEntitySettings.
IPatternSetSettings is not extended by any other symbol.
Properties


        color        
        #
      


                          Type Color                      
A base color to use for all patterns.

## Inheritance

Extends: IEntitySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **color** (`Color`) — A base color to use for all patterns. Click here for more info
- **patterns** (`Pattern[]`) — List of colors in the set.
- **startIndex** (`undefined | number`) — Start iterating patterns from specific index.
- **step** (`undefined | number`) — Default 1 A step size when using next(). E.g. setting to 2 will make it return every second pattern in the list.
