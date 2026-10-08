---
title: "IMapRasterSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imaprasterseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapSeriesSettings, ISunSettings
All ancestors: IMapSeriesSettings, ISunSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.MapRasterSeries` (see its page for the class)
TypeScript: `am5map.IMapRasterSeriesSettings` (`import type { IMapRasterSeriesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **src** (`string`) — URL of an image of the whole world in equirectangular projection ("plate carrée"): longitude -180 to 180 from left to right, latitude 90 to -90 from top to bottom. Satellite imagery such as NASA's Blue Marble comes in this form. The geodata package has day and night images of the Earth ready for this, e.g. `geodata/images/earthDay2048.jpg` (credit: NASA Earth Observatory). See `images/README.md` in the geodata package.
- **nightSrc** (`string`) — URL of an image of the world at night, in the same form as `src`. With `sunPosition` set, the series shows `src` where the sun is up and this image where it is down, blended across twilight. The geodata package has one: `geodata/images/earthNight2048.jpg`.
- **cors** (`string`) — default `"anonymous"` — The images' `crossOrigin` setting. A cross-origin image can only be reprojected if its server allows it (CORS).

## Inherited settings with a different default on MapRasterSeries

- **idField** (`string`) — default `"id"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for an id of the data item.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapSeriesSettings")`) for types, defaults and descriptions.

- _IMapSeriesSettings_: affectsBounds, exclude, geodataNames, geoJSON, geometryField, geometryTypeField, include, valueField
- _ISunSettings_: sunDate, sunPosition, twilight
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
