---
title: "IModalSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imodalsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.Modal` (see its page for the class)
TypeScript: `am5.IModalSettings` (`import type { IModalSettings } from "@amcharts/amcharts5"`)

## Settings

- **content** (`string`) — HTML content of the modal.
- **deactivateRoot** (`boolean`) — default `true` _(class default)_ — Disables interaction with the chart while the modal is open. _Since 5.2.11._
- **ariaLabel** (`string`) — Name of the dialog for screen readers. If not set, the first heading (`<h1>` - `<h6>`) in the content is used. _Since 5.21.0._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
