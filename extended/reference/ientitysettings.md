---
title: "IEntitySettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ientitysettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: (none)
Settings of: `am5.Entity` (see its page for the class)
TypeScript: `am5.IEntitySettings` (`import type { IEntitySettings } from "@amcharts/amcharts5"`)

## Settings

- **ignoreThemes** (`boolean`) — default `false` — Ignores themes: no theme rule applies to the element, not even one of the default theme. _Since 5.15.6._
- **themeTags** (`string[]`) — default `[]` _(code fallback)_ — Tags that theme rules can target. They also count for the element's children, so a rule can match a child by a tag of its parent. Docs: https://www.amcharts.com/docs/v5/concepts/themes/
- **themeTagsSelf** (`string[]`) — Tags that theme rules can target, like `themeTags`, but only for this element, not its children. Docs: https://www.amcharts.com/docs/v5/concepts/themes/
- **themes** (`Theme[]`) — Themes applied to the element and everything inside it.
- **stateAnimationDuration** (`number`) — default `0` _(theme)_ — How long, in milliseconds, a switch from one state to another animates. `0` switches at once.
- **stateAnimationEasing** (`$ease.Easing`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing of the animated switch from one state to another.
- **id** (`string`) — A unique ID for looking the element up in `root.entitiesById`. Setting an ID that another element already has throws an error.
- **userData** (`any`) — Any data of your own to keep with the element.
- **animations** (`IDeclaredAnimation[]`) — Animations the element plays on its own, described as data - so they can be set from a JSON config and saved with it. Each one animates a setting of the element (or, with `target: "dataItem"`, a value of its data item - a map point's `positionOnLine`, say). They start when the setting is applied, restart when it changes, and stop when the element is disposed. A saved config keeps what was configured, never a value caught half way through an animation.

  ```ts
  sprite.set("animations", [
    { key: "rotation", to: 360, duration: 4000, loops: 0 },
    { key: "scale", from: 1, to: 1.3, duration: 800, loops: 0, yoyo: true, easing: "sine" }
  ]);
  ```

  _Since 5.20.8._
