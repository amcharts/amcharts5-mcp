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

- **allowNesting** (`undefined | false | true`) — Default true *(since 5.20.1)* Whether words may nest into each other's empty space. When true a word is packed against its neighbors' letters, so small words tuck into the concavities of bigger ones and the cloud packs tightly — but bounding boxes may overlap. Set to false to pack whole bounding boxes instead, so they never overlap (useful when labels have an opaque background, whose rectangles would otherwise slide into a neighbor's gaps).
- **angles** (`number[]`) — Default [0, -90] An array of possible rotation angles for words. As of 5.20.1 any angle is supported (e.g. [0, -30, -45]); earlier versions only handled 0, 90 and -90. Note that an overly wide word may still be flipped to 0 or ±90 for a better fit, but only if that value is present in the array.
- **animationDuration** (`undefined | number`) — Duration of word animation when chart resizes.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Default am5.ease.out($ease.cubic) An easing function to use for word animations. Click here for more info
- **autoFit** (`undefined | false | true`) — Default true (set by WordCloudDefaultTheme; the typings' @default false is stale) Indicates whether font sizes are scaled down so all words fit the available area.
- **categoryField** (`undefined | string`) — A field in data that holds category names.
- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for slices.
- **excludeWords** (`Array`) — Default [] Array of words exclude from cloud.
- **fillField** (`undefined | string`) — A field that holds color for label fill.
- **maskByShape** (`undefined | false | true`) — Default false *(since 5.20.1)* If set to true, words are clipped to the svgPath shape, so the parts of letters that overhang the outline (see shapeTolerance) are cut off at the edge for a crisp silhouette. Requires svgPath.
- **maxCount** (`undefined | number`) — Maximum number of words to show.
- **maxFontSize** (`number | Percent`) — Default 15% Absolute or relative font size for the biggest words.
- **minFontSize** (`number | Percent`) — Default 2% Absolute or relative font size for the smallest words.
- **minValue** (`undefined | number`) — Minimum occurances for a word to be included into cloud.
- **minWordLength** (`undefined | number`) — Default 1 Minimum number of characters for a word to be included in the cloud.
- **progress** (`undefined | number`) — Progress of current word layout animation. (0-1) @readonly
- **randomizeAngles** (`undefined | false | true`) — Default true *(since 5.20.1)* How a word's rotation is chosen from angles. When true each word picks a random angle from angles, so the cloud looks different on every layout. When false words cycle through angles in order (word 0 gets angles[0], word 1 angles[1], and so on), which — together with randomness: 0 — makes the layout reproducible.
- **randomness** (`undefined | number`) — Default 0 Randomness of word placement (0-1).
- **shapeTolerance** (`undefined | number`) — Default 0 *(since 5.20.1)* Extra distance (in pixels) a word may extend past the svgPath outline, on top of the automatic per-word overhang (a fraction of each word's own size). Can also be negative to pull words further inside the outline, creating visual padding between the words and the shape edge. Only affects placement — the drawn shape outline is unchanged. Requires svgPath.
- **step** (`undefined | number`) — Default 15 Step for next word placement.
- **svgPath** (`undefined | string`) — *(since 5.20.1)* Experimental: if set, words are arranged to fill this shape. The path is scaled proportionally to fit the plot area. The fit is approximate — favor simple, bold shapes over complex, thin, or highly concave ones, and tune shapeTolerance, maskByShape, angles (and minFontSize/maxFontSize) to get a better fill for a particular shape.
- **text** (`undefined | string`) — Source text from which words are extracted.

### Inherited from ISeriesSettings (notable for WordCloud)

- **sequencedInterpolation** (`undefined | false | true`) — Default true (set by WordCloudDefaultTheme) Staggers the word reveal instead of showing all words at once.
- **sequencedDelay** (`undefined | number`) — Default 15 Milliseconds between words when sequencedInterpolation is enabled.

## Breaking change in 5.20.1

The WordCloud layout is now computed synchronously in a single pass instead of one word per animation frame — much faster for large clouds. The per-data-item `ghostLabel` is removed and labels are held in an internal container, so code reading `dataItem.get("ghostLabel")` or walking `series.children` for labels needs updating. Use `series.labels` (a `ListTemplate<Label>`) or `dataItem.get("label")` instead.

A `series.shape` (`Graphics`) element was added; it draws the `svgPath` outline behind the words. Its geometry and `forceHidden` are managed by the series — only `fill`/`stroke` styling is yours to set.
