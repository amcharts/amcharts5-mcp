---
title: "IDateRangeSelectorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idaterangeselectorsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IStockControlSettings
All ancestors: IStockControlSettings, IEntitySettings
Settings of: `am5stock.DateRangeSelector` (see its page for the class)
TypeScript: `am5stock.IDateRangeSelectorSettings` (`import type { IDateRangeSelectorSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **dateFormat** (`string`) — Date format of the input fields and the button label, such as `"yyyy-MM-dd"`. Uses the format of the root's date formatter if not set.
- **useDefaultCSS** (`boolean`) — default `true` — Loads the default CSS of the date pickers (Flatpickr). Without it, they need CSS of your own. _Since 5.2.4._
- **minDate** (`"auto" | Date`) — default `"auto"` _(theme)_ — Earliest date that can be picked: a `Date`, `"auto"` for the first date of the data, or `null` for no limit. _Since 5.3.7._
- **maxDate** (`"auto" | Date`) — default `"auto"` _(theme)_ — Latest date that can be picked: a `Date`, `"auto"` for the last date of the data, or `null` for no limit. _Since 5.3.7._
- **disableWeekDays** (`number[]`) — default `[]` — Days of the week that can't be picked: `0` is Sunday, `1` Monday, and so on. _Since 5.11.1._
- **allowInput** (`boolean`) — default `true` _(theme)_ — Lets the user type dates into the fields. When `false`, a day can only be picked in the calendar. _Since 5.12.3._

## Inherited settings with a different default on DateRangeSelector

- **description** (`string`) — default `root.language.translateAny("Date Range")` _(theme)_ — _from IStockControlSettings_ — What the control does, shown as the button's tooltip. Falls back to `name`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IStockControlSettings")`) for types, defaults and descriptions.

- _IStockControlSettings_: active, align, forceHidden, icon, name, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
