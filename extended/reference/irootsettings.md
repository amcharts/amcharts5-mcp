---
title: "IRootSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/irootsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: (none)
Settings of: `am5.Root` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **useSafeResolution** (`boolean`) — default `true` — Draws the chart at a resolution of `1` on iOS and iPadOS devices instead of the screen's pixel ratio, to stay within their memory limits. Set to `false` for sharper charts there.
- **tooltipContainerBounds** (`{ top: number; left: number; right: number; bottom: number; }`) — Extra space in pixels on each side of the chart where tooltips can still be drawn, letting them go outside the chart's container. _Since 5.2.24._
- **accessible** (`boolean`) — default `true` — Set to `false` to disable all accessibility features. NOTE: once disabled, accessibility cannot be re-enabled on a live `Root` object. _Since 5.3.0._
- **focusable** (`boolean`) — default `false` — If set to `true`, the parent inner `<div>` element will become a focusable element. _Since 5.3.17._ Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Accessibility_of_Root_element
- **focusPadding** (`number`) — default `2` — Distance between focused element and its highlight square in pixels. _Since 5.6.0._
- **ariaLabel** (`string`) — If set to some string, it will be used as inner `<div>` ARIA-LABEL. Should be used in conjunction with `focusable`. _Since 5.3.17._ Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Accessibility_of_Root_element
- **role** (`string`) — Allows setting a "role" for the inner `<div>`. _Since 5.3.17._ Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Accessibility_of_Root_element
- **calculateSize** (`(dimensions: DOMRect) => ISize`) — A function that returns the width and height in pixels to draw the chart at, given the container's measured box. It runs when the chart is created and on every resize.
- **sanitizeHTML** (`boolean`) — default `true` — Cleans potentially malicious code out of HTML content (`html` and `labelHTML` settings, HTML tooltips, modals, export menu labels) before it goes on the page. Turn it off only if you trust all HTML content: unsanitized HTML from untrusted data can lead to XSS attacks. _Since 5.19.0._
- **fontFamily** (`string`) — Font family for all labels. It overrides the theme's, but not a `fontFamily` set on a label itself. _Since 5.20.2._
- **fontSize** (`string | number`) — Font size for all labels: a number in pixels, or a CSS size such as `"1.2em"`. It overrides the theme's, but not a `fontSize` set on a label itself. _Since 5.20.2._
- **fontWeight** (`"normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"`) — Font weight for all labels. It overrides the theme's, but not a `fontWeight` set on a label itself. _Since 5.20.2._
- **renderer** (`IRendererClass`) — The renderer that draws the chart. Defaults to `Root.defaultRenderer`, which is `CanvasRenderer` unless changed. To draw with SVG, use `am5.SVGRenderer`:

  ```ts
  const root = am5.Root.new("chartdiv", {
    renderer: am5.SVGRenderer
  });
  ```

  Can only be set when the Root is created.

  _Since 5.21.0._

- **forcedColors** (`boolean`) — default `true` — Makes the chart's interface colors (labels, grid, axes, buttons) follow the system colors when the page is in a forced colors mode, such as Windows High Contrast, so they stay visible. Series colors are kept. _Since 5.21.0._
