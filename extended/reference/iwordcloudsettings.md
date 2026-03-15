---
title: "IWordCloudSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iwordcloudsettings/"
scraped: "2026-03-15"
---

Inheritance
IWordCloudSettings extends ISeriesSettings.
IWordCloudSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        angles        
        #
      


                          Type number[]                      
An array of possible rotation angles for words.


        animationDuration        
        #
      


                          Type undefined | number                      
Duration of word animation when chart resizes.


        animationEasing        
        #
      


                          Type undefined | ( t: Time) => Time                      
Default am5.ease.out($ease.cubic)

An easing function to use for word animations.

## Inheritance

Extends: ISeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **angles** (`number[]`) — An array of possible rotation angles for words.
- **animationDuration** (`undefined | number`) — Duration of word animation when chart resizes.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Default am5.ease.out($ease.cubic) An easing function to use for word animations. Click here for more info
- **autoFit** (`undefined | false | true`) — Default false
- **categoryField** (`undefined | string`) — A field in data that holds category names.
- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for slices.
- **excludeWords** (`Array`) — Array of words exclude from cloud.
- **fillField** (`undefined | string`) — A field that holds color for label fill.
- **maxCount** (`undefined | number`) — Maximum number of words to show.
- **maxFontSize** (`number | Percent`) — Absolute or relative font size for the biggest words.
- **minFontSize** (`number | Percent`) — Absolute or relative font size for the smallest words.
- **minValue** (`undefined | number`) — Minimum occurances for a word to be included into cloud.
- **minWordLength** (`undefined | number`) — Minimum number of characters for a word to be included in the cloud.
- **progress** (`undefined | number`) — Progress of current word layout animation. (0-1) @readonly
- **randomness** (`undefined | number`) — Randomness of word placement (0-1).
- **step** (`undefined | number`) — Step for next word placement.
- **text** (`undefined | string`) — Source text from which words are extracted.
