---
title: "ISpriteSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ispritesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.Sprite` (see its page for the class)
TypeScript: `am5.ISpriteSettings` (`import type { ISpriteSettings } from "@amcharts/amcharts5"`)

## Settings

- **x** (`number | Percent`) — X position in the parent: pixels from its left edge, or a `Percent` of its inner width, measured from inside its left padding.
- **y** (`number | Percent`) — Y position in the parent: pixels from its top edge, or a `Percent` of its inner height, measured from inside its top padding.
- **width** (`number | Percent`) — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.
- **height** (`number | Percent`) — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **maxWidth** (`number`) — Maximum allowed width in pixels.
- **maxHeight** (`number`) — Maximum allowed height in pixels.
- **minWidth** (`number`) — Minimum allowed width in pixels.
- **minHeight** (`number`) — Minimum allowed height in pixels.
- **opacity** (`number`) — default `1` _(theme)_ — Opacity, from `0` (transparent) to `1` (opaque).
- **rotation** (`number`) — default `0` _(theme)_ — Rotation in degrees, clockwise, around the point set by `centerX` and `centerY`.
- **scale** (`number`) — default `1` _(theme)_ — Scale, around the point set by `centerX` and `centerY`: below `1` shrinks the element, above `1` enlarges it.
- **centerX** (`number | Percent`) — The point of the element that is placed at its `x` position, and that it rotates and scales around: pixels from its left edge, or a percent of its width.
- **centerY** (`number | Percent`) — The point of the element that is placed at its `y` position, and that it rotates and scales around: pixels from its top edge, or a percent of its height.
- **marginLeft** (`number`) — Left margin in pixels.
- **marginRight** (`number`) — Right margin in pixels.
- **marginTop** (`number`) — Top margin in pixels.
- **marginBottom** (`number`) — Bottom margin in pixels.
- **visible** (`boolean`) — default `true` _(theme)_ — Whether the element is shown. Unlike `show()` and `hide()`, it does not animate.
- **position** (`"absolute" | "relative"`) — default `"relative"` _(theme)_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **dx** (`number`) — default `0` _(code fallback)_ — Horizontal shift in pixels. Can be negative to shift leftward.
- **dy** (`number`) — default `0` _(code fallback)_ — Vertical shift in pixels. Can be negative to shift upward.
- **interactive** (`boolean`) — Makes the element respond to the pointer. Adding a pointer event listener to it turns this on.
- **tooltipText** (`string`) — Text of the element's tooltip. It can hold data placeholders, such as `{value}`.
- **tooltipHTML** (`string`) — HTML content of the element's tooltip, shown in place of `tooltipText`. _Since 5.2.11._
- **tooltipX** (`number | Percent`) — default `am5.p50` _(theme)_ — Where on the element the tooltip points, horizontally: pixels from its left edge, or a percent of its width.
- **tooltipY** (`number | Percent`) — default `am5.p50` _(theme)_ — Where on the element the tooltip points, vertically: pixels from its top edge, or a percent of its height.
- **tooltip** (`Tooltip`) — The `Tooltip` to show for the element. If not set, the nearest parent's is used.
- **tooltipPosition** (`"fixed" | "pointer"`) — default `"fixed"` _(theme)_ — Where the tooltip points: `"fixed"` at `tooltipX` and `tooltipY`, or `"pointer"` at the pointer, following it.
- **isMeasured** (`boolean`) — default `true` _(theme)_ — If `false`, the element's bounds are not measured, so it takes no part in its parent's layout or size.
- **templateField** (`string`) — Field in the data item's data object that holds settings for this element, applied over its template's. Docs: https://www.amcharts.com/docs/v5/concepts/settings/template-fields/
- **draggable** (`boolean`) — Lets the user drag the element. Touches that start on it no longer scroll the page.
- **wheelable** (`boolean`) — Makes the element receive mouse wheel events. While the pointer is over it, the wheel no longer scrolls the page.
- **numberFormatter** (`NumberFormatter`) — default `root.numberFormatter` _(code fallback)_ — A `NumberFormatter` to use for this element instead of the root's. Docs: https://www.amcharts.com/docs/v5/concepts/using-formatters/
- **dateFormatter** (`DateFormatter`) — default `root.dateFormatter` _(code fallback)_ — A `DateFormatter` to use for this element instead of the root's. Docs: https://www.amcharts.com/docs/v5/concepts/using-formatters/
- **durationFormatter** (`DurationFormatter`) — default `root.durationFormatter` _(code fallback)_ — A `DurationFormatter` to use for this element instead of the root's. Docs: https://www.amcharts.com/docs/v5/concepts/using-formatters/
- **toggleKey** (`"none" | "disabled" | "active"`) — Setting that a click or tap toggles between `true` and `false`: `"active"` or `"disabled"`. `"none"` turns toggling off.
- **active** (`boolean`) — Applies the element's `"active"` state while `true`.
- **disabled** (`boolean`) — Applies the element's `"disabled"` state while `true`. It changes only the look: the element still responds to the pointer.
- **filter** (`string`) — default `""` _(code fallback)_ — _(internal)_ An SVG filter to apply to the element. IMPORTANT: SVG filters are not supported in some browsers, e.g. Safari. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/filters/#SVG_filters
- **cursorOverStyle** (`string`) — CSS cursor to show while the pointer is over the element, e.g. `"pointer"`. Docs: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
- **exportable** (`boolean`) — If `false`, the element is left out of exported images of the chart.
- **layer** (`number`) — Layer to draw the element on: elements on higher layers show in front of those on lower ones. If not set, the element is on its parent's layer.
- **layerMargin** (`IMargin`) — Margins in pixels that make the element's layer larger than the chart, or, when negative, smaller.
- **forceHidden** (`boolean`) — Hides the element whatever its `visible` setting, even when `show()` is called.
- **autoAppear** (`boolean`) — default `false` — Plays the element's reveal animation, as `appear()` does, when it is first drawn: a chart fades in, a series grows its columns or lines from the base. A series waits for its first data. It plays once: data updates do not replay it, but turning the setting off and on again does. Elements made from a template play as each one is made. An element that starts hidden (`visible: false`, or hidden in code before it is drawn) stays hidden. An `animations` entry on the same setting, such as a pulsing `opacity`, keeps playing. This is how a JSON config gets the opening animation, as a config cannot call `appear()`.

  ```ts
  chart.setAll({ autoAppear: true, appearDuration: 1000, appearDelay: 100 });
  series.setAll({ autoAppear: true, appearDuration: 1000 });
  ```

  _Since 5.21.0._ Docs: https://www.amcharts.com/docs/v5/concepts/animations/

- **appearDuration** (`number`) — Duration of the `autoAppear` animation, in milliseconds. Without it, the element's `stateAnimationDuration` is used. _Since 5.21.0._
- **appearDelay** (`number`) — default `0` — Milliseconds to wait before the `autoAppear` animation starts. The element stays hidden until then. _Since 5.21.0._
- **forceInactive** (`boolean`) — default `null` _(code fallback)_ — Makes the element and its children ignore the pointer, even with `interactive: true` or event listeners set. _Since 5.0.21._
- **showTooltipOn** (`"click" | "hover" | "always"`) — default `"hover"` — When the element's tooltip shows: • `"hover"` (default) - while the pointer is over the element, or after a tap on it until a tap elsewhere. • `"always"` - all the time. To show tooltips of several elements at once, give each its own `Tooltip` (`tooltip`). • `"click"` - after a click or tap on the element, until a click anywhere else on the page. _Since 5.0.16._ Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/tooltips/#Sticky_tooltips
- **crisp** (`boolean`) — default `false` — Draws the element sharply, with minimal anti-aliasing: its position is rounded to whole pixels, and `strokeWidth` is adjusted to the device pixel ratio, so lines may look thinner than expected. NOTE: it may not work well on several elements that are meant to fit together exactly. _Since 5.3.0._
- **blur** (`number`) — default `0` _(code fallback)_ — Blur radius in pixels, from `0` (no blur) up. IMPORTANT: This setting is not supported in Safari browsers. _Since 5.5.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/filters/
- **brightness** (`number`) — default `1` _(code fallback)_ — Brightness. • `0` - completely black • `1` - no changes (default) • `>1` - brighter IMPORTANT: This setting is not supported in Safari browsers. _Since 5.5.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/filters/
- **contrast** (`number`) — default `1` _(code fallback)_ — Contrast. • `0` - completely gray • `1` - no changes (default) • `>1` - more contrast IMPORTANT: This setting is not supported in Safari browsers. _Since 5.5.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/filters/
- **saturate** (`number`) — default `1` _(code fallback)_ — Saturation. • `0` - grayscale • `1` - no changes (default) • `>1` - more saturated IMPORTANT: This setting is not supported in Safari browsers. _Since 5.5.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/filters/
- **sepia** (`number`) — default `0` _(code fallback)_ — Sepia tone, from `0` (no changes) to `1` (full sepia). IMPORTANT: This setting is not supported in Safari browsers. _Since 5.5.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/filters/
- **invert** (`number`) — default `0` _(code fallback)_ — Color inversion, from `0` (no changes) to `1` (fully inverted colors). IMPORTANT: This setting is not supported in Safari browsers. _Since 5.5.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/filters/
- **hue** (`number`) — default `0` _(code fallback)_ — Rotates the hue of all colors by this many degrees, from `0` to `360`. IMPORTANT: This setting is not supported in Safari browsers. _Since 5.5.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/filters/
- **tabindexOrder** (`number`) — An internal order by which focusable elements will be selected within the chart. Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Focusing_elements
- **hoverOnFocus** (`boolean`) — Simulate hover on an element when it gains focus, including changing hover appearance and displaying a tooltip if applicable. Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Focusing_elements
- **focusable** (`boolean`) — Can element be focused, i.e. selected using TAB key. Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Focusing_elements
- **focusableGroup** (`string | number`) — An identifier by which to group common elements into focusable groups. If set, only the first element in he group will be focusable via TAB key. When it is selected, the rest of the elements in the same group can be selected using arrow keys. It allows users to TAB-through chart elements quickly without the need to TAB into each and every element. It's up to implementer of the charts to provide meaningful `ariaLabel` to the element, which advertises this capability and provides adequate instructions. _Since 5.0.6._ Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Grouping_focusable_elements
- **clickAnnounceText** (`string`) — If set, the text will be read out (announced) by a screen reader when focused element is "clicked" (by pressing ENTER or SPACE). _Since 5.10.8._
- **role** (`Role`) — Element's role. Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Roles
- **ariaLive** (`AriaLive`) — `aria-live` setting.
- **ariaChecked** (`boolean`) — `aria-checked` setting. This setting is ignored unless `role` is one of the following: • `"checkbox"` • `"option"` • `"radio"` • `"menuitemcheckbox"` • `"menuitemradio"` • `"treeitem"` On a toggle `"button"` (one with `toggleKey`) it is exposed as `aria-pressed`.
- **ariaExpanded** (`boolean`) — `aria-expanded` setting: whether the content the element shows or hides (e.g. a task's subtasks, a node's children) is shown. _Since 5.21.0._ Docs: https://w3c.github.io/aria/#aria-expanded
- **ariaCurrent** (`string`) — `aria-current` setting. _Since 5.9.8._ Docs: https://w3c.github.io/aria/#aria-current
- **ariaSelected** (`boolean`) — `aria-selected` setting. _Since 5.9.8._ Docs: https://w3c.github.io/aria/#aria-selected
- **ariaHidden** (`boolean`) — `aria-hidden` setting.
- **ariaLabel** (`string`) — Label for the element to use for screen readers. Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Screen_reader
- **ariaOrientation** (`string`) — `aria-orientation` setting.
- **ariaValueNow** (`string`) — `aria-valuenow` setting.
- **ariaValueMin** (`string`) — `aria-valuemin` setting.
- **ariaValueMax** (`string`) — `aria-valuemax` setting.
- **ariaValueText** (`string`) — `aria-valuetext` setting.
- **ariaControls** (`string`) — `aria-controls` setting.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
