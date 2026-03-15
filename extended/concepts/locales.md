---
title: "Locales"
source: "https://www.amcharts.com/docs/v5/concepts/locales/"
scraped: "2026-03-15"
---

amCharts 5 comes with a set of locales. This pages shows how to load and use them.

## What is a locale?

Locale brings in various region-specific settings, such as text prompt translations, date and number formats, etc.

## Loading

Each locale is located in a separate file in `locales` folder. The file name comprises the syntax of language code (lowercase) + region code (uppercase). E.g. to load U.S. English, we would use file `en_US`.

import am5locales\_en\_US from "@amcharts/amcharts5/locales/en\_US";

<script src="//cdn.amcharts.com/lib/5/locales/en\_US.js"></script>

## Applying

To apply the locale to the chart, simply set `locale` property of the [root element](https://www.amcharts.com/docs/v5/getting-started/#Root_element):

root.locale = am5locales\_en\_US;

root.locale = am5locales\_en\_US;

## Creating translations

Please refer to our "[Creating translations](https://www.amcharts.com/docs/v5/concepts/locales/creating-translations/)" tutorial for more info.

## Using time zones

It's possible to force charts to use specific time zone when displaying time/date. For more information visit "Root element: [Time zone](https://www.amcharts.com/docs/v5/getting-started/root-element/#Time_zone)" tutorial.

## First day of week

Normally, the locale we are using will determine which week day is considered start of the week.

If we want to override it, we can do so by modifying `firstDayOfWeek` value in the locale:

// Start the week on Sunday
root.locale.firstDayOfWeek = 0;

// Start the week on Sunday
root.locale.firstDayOfWeek = 0;

## Right-to-left languages

For RTL options, check out "[Right-to-left support](https://www.amcharts.com/docs/v5/concepts/locales/right-to-left-support/)" tutorial.

## Translations in maps

Country names on map charts can automatically be translated to a selection of languages. Please refer to "[Map translations](https://www.amcharts.com/docs/v5/charts/map-chart/map-translations/)" tutorial.
