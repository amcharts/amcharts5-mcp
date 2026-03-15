---
title: "IDurationFormatterSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idurationformattersettings/"
scraped: "2026-03-15"
---

Inheritance
IDurationFormatterSettings extends IEntitySettings.
IDurationFormatterSettings is not extended by any other symbol.
Properties


        baseUnit        
        #
      


                          Type TimeUnit                      
Default "second"

Identifies what values are used in duration.
 Available options: "millisecond", "second" (default), "minute", "hour", "day", "week", "month", and "year".

## Inheritance

Extends: IEntitySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **baseUnit** (`TimeUnit`) — Default "second" Identifies what values are used in duration. Available options: "millisecond", "second" (default), "minute", "hour", "day", "week", "month", and "year". Click here for more info
- **durationFields** (`string[]`) — An array of data fields that hold duration values and should be formatted with a DurationFormatter. Click here for more info
- **durationFormat** (`undefined | string`) — A universal duration format to use wherever number needs to be formatted as a duration.
- **durationFormats** (`Partial`) — Time unit dependent duration formats. Used be DurationAxis.
- **negativeBase** (`undefined | number`) — Default 0 A base value. Any number below it will be considered "negative".
