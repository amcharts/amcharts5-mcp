---
title: "IDateFormatterSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idateformattersettings/"
scraped: "2026-03-15"
---

Inheritance
IDateFormatterSettings extends IEntitySettings.
IDateFormatterSettings is not extended by any other symbol.
Properties


        capitalize        
        #
      


                          Type undefined | false | true                      
Default true

Should the first letter of the formatted date be capitalized?


        dateFields        
        #
      


                          Type string[]                      
An array of data fields that hold date values and should be formatted with a DateFormatter.

## Inheritance

Extends: IEntitySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **capitalize** (`undefined | false | true`) — Default true Should the first letter of the formatted date be capitalized?
- **dateFields** (`string[]`) — An array of data fields that hold date values and should be formatted with a DateFormatter. Click here for more info
- **dateFormat** (`string | DateTimeFormatOptions`) — A date format to be used when formatting dates. Click here for more info
- **intlLocales** (`undefined | string`) — Locales to use when formatting using Intl.DateFormatter.
