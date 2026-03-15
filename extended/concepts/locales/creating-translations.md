---
title: "Creating translations"
source: "https://www.amcharts.com/docs/v5/concepts/locales/creating-translations/"
scraped: "2026-03-15"
---

amCharts 5 uses locale objects to modify textual prompts as well as other location-specific options like number separators, date formats, etc. This tutorial will look at ways to create your own locales or modify existing ones.

## Prerequisite

If we you're not yet familiar how localization works in amCharts 5, we suggest reading "[Locales](https://www.amcharts.com/docs/v5/concepts/locales/)" tutorial first.

## Creating a new locale

### Getting started

The best way to get started is to grab existing locale file from amCharts 5 sources, and creating a copy of it.

We suggest using `[en.ts](https://github.com/amcharts/amcharts5/blob/master/src/locales/en.ts)` file which is for International English and is a default locale.

### Naming the file

Name the file using syntax `language_COUNTRY.ts` (e.g. `pt_BR` meaning Brazilian Portuguese).

NOTEIf we are creating a plain JavaScript locale file, we'll want to use `.js` extension instead.

### Adding a header

A header of the locale file conveys information about the language this file is for.

It can also contain information about the author of the translation.

Make sure you include appropriate header with your locale file.

The template `en.ts` already includes a header placeholder, which you can use as a template.

Example:

/\*\*
 \* amCharts 5 Translation file
 \* Locale: es\_ES
 \* Language: Spanish (Spain)
 \* Author: Dominick Green
 \*/

/\*\*
 \* amCharts 5 Translation file
 \* Locale: es\_ES
 \* Language: Spanish (Spain)
 \* Author: Dominick Green
 \*/

### File structure

Basically, a locale is defined by a single object with key/value pairs.

Each key is a prompt/format ID (usually a version of the prompt in International English), and each value is a translation/format/etc.

A sample locale might look like this:

{

  // ...
  "January": "Enero",
  "February": "Febrero",
  "March": "Marzo",
  "April": "Abril",
  "May": "Mayo",
  "June": "Junio",
  "July": "Julio",
  "August": "Agosto",
  "September": "Septiembre",
  "October": "Octubre",
  "November": "Noviembre",
  "December": "Diciembre",
  // ...
}

The actual code will depend on whether we are creating a translation for use in TypeScript or plain JavaScript.

/\*\*
 \* amCharts 5 Translation file
 \* Locale: es\_ES
 \* Language: Spanish (Spain)
 \* Author: Dominick Green
 \*/

export default {

  // ...
  "January": "Enero",
  "February": "Febrero",
  "March": "Marzo",
  "April": "Abril",
  "May": "Mayo",
  "June": "Junio",
  "July": "Julio",
  "August": "Agosto",
  "September": "Septiembre",
  "October": "Octubre",
  "November": "Noviembre",
  "December": "Diciembre",
  // ...
}

/\*\*
 \* amCharts 5 Translation file
 \* Locale: es\_ES
 \* Language: Spanish (Spain)
 \* Author: Dominick Green
 \*/

var am5locales\_es\_ES = default {

  // ...
  "January": "Enero",
  "February": "Febrero",
  "March": "Marzo",
  "April": "Abril",
  "May": "Mayo",
  "June": "Junio",
  "July": "Julio",
  "August": "Agosto",
  "September": "Septiembre",
  "October": "Octubre",
  "November": "Noviembre",
  "December": "Diciembre",
  // ...
}

If we are creating a JavaScript locale file, we need to pay attention to the name of the global variable we are defining.

It should follow default syntax for amCharts 5: `am5locales_[language]_[country]`, e.g. `am5locales_es_ES` for Spain.

### Types of the translatable prompts

As you explore the template `en.ts`, you'll notice that some keys are not English phrases or words, and that some of the values are not actually strings.

Let's explore these different types of translatable elements.

#### Basic phrases and words

Those are the base of the translations. They come in a very predictable pattern: English phrase or word as a key, and exact translation as a value. E.g.:

export default {
  // ...
  "Zoom Out": "Uitzoomen",
  "Play": "Afspelen",
  "Stop": "Stoppen",
  // ...
}

var am5locales\_nl\_NL = {
  // ...
  "Zoom Out": "Uitzoomen",
  "Play": "Afspelen",
  "Stop": "Stoppen",
  // ...
}

#### Special keys

Each locale is responsible not only for translating words and phrases, but also defining number and date/time formats for the target country.

Some keys in the translation files are not phrases in English, but rather some internal code, denoting a specific format:

export default {
  // ...
  "\_decimalSeparator": ",",
  "\_thousandSeparator": " ",
  // ...
  "\_date\_day": "yyyy-MM-dd",
  // ...
}

var am5locales\_nl\_NL = {
  // ...
  "\_decimalSeparator": ",",
  "\_thousandSeparator": " ",
  // ...
  "\_date\_day": "yyyy-MM-dd",
  // ...
}

The `"_decimalSeparator"` above instructs that we want to use a comma as a decimal separator in numbers. The `"_thousandSeparator"` says we want our thousands to be separate by a space.

`"_date_day"` set the default date format when we want to show a particular date.

`en.ts` file might contain further tips and guidelines for each group of such special translations.

#### Ordinals

These are not basic values, but rather functions, that return a prompt, based on the actual value.

For example, a number suffix which denotes number's position. E.g `1st`, `2nd`, `3rd`, `4th`, `21st`, etc.

The reason why we need to use a function, as opposed to just translating `"st"`, `"nd"`, is that those might not necessarily be like this in other languages.

We can't predict how different languages treat ordinals, so we must leave to a translator to come up with a function that generates a proper ordinal for a number, supplied as a parameter.

Here's how ordinal function looks like for English:

export default {
  // ...
  "\_dateOrd": function(day: number): string {
    let res = "th";
    if ((day < 11) || (day > 13)) {
      switch (day % 10) {
        case 1:
          res = "st";
          break;
        case 2:
          res = "nd";
          break;
        case 3:
          res = "rd"
          break;
      }
    }
    return res;
  }",
  // ...
}

var am5locales\_en\_US = {
  // ...
  "\_dateOrd": function(day: number): string {
    let res = "th";
    if ((day < 11) || (day > 13)) {
      switch (day % 10) {
        case 1:
          res = "st";
          break;
        case 2:
          res = "nd";
          break;
        case 3:
          res = "rd"
          break;
      }
    }
    return res;
  }",
  // ...
}

For some languages, like Lithuanian, ordinals do not differ for numbers, so the function would look quite straightforward:

export default {
  // ...
  "\_dateOrd": function(day: number): string {
    return "-a(s)";
  },",
  // ...
}

var am5locales\_lt\_LT = {
  // ...
  "\_dateOrd": function(day: number): string {
    return "-a(s)";
  },",
  // ...
}

### Placeholders

You will also notice, that some prompts contain numbers prefixed with a percent sign, e.g.:

export default {
  // ...
  "From %1 to %2": "",
  "From %1": "",
  "To %1": "",
  // ...
}

var am5locales\_en\_US = {
  // ...
  "From %1 to %2": "",
  "From %1": "",
  "To %1": "",
  // ...
}

Those are placeholders, that will be replaced with actual values.

IMPORTANTThe translation **must** include all the same placeholders, however their position is not important. Choose the position which suits the translation best.

Here's how Spanish translation might look for the above:

export default {
  // ...
  "From %1 to %2": "De %1 a %2",
  "From %1": "Desde %1",
  "To %1": "Hasta %1",
  // ...
}

var am5locales\_es\_ES = {
  // ...
  "From %1 to %2": "De %1 a %2",
  "From %1": "Desde %1",
  "To %1": "Hasta %1",
  // ...
}

### Untranslated prompts

An empty string `""` in translation means "use default English" prompt.

If the translation is not necessary, e.g. as most prompts and formats in variations of English, or if you can't translate some of the prompts right now, simply leave the translation as an empty string. The chart will fall back to English for just those untranslated ones.

### Empty prompts

If for some reason you want to display nothing instead of an English phrase, use `null` instead:

export default {
  // ...
  "AM": null,
  "PM": null,
  // ...
}

var am5locales\_nl\_NL = {
  // ...
  "AM": null,
  "PM": null,
  // ...
}

## Using a custom locale

There are a few ways to use newly-created locales.

### Loading a file

We can save the locale as a `.ts` or `.js` file, then load it like any other bundled locale:

import am5locales\_xx\_XX from "our/custom/locale.ts";

<script src="/our/custom/locale.js"></script>

Then just set it via `root.locale`:

root.locale = am5locales\_xx\_XX;

root.locale = am5locales\_xx\_XX;

### In-line translation

We can also create translations in-line, directly with our chart code:

const am5locales\_nl\_NL = {
  // ...
  "Zoom Out": "Uitzoomen",
  "Play": "Afspelen",
  "Stop": "Stoppen",
  // ...
}

root.locale = am5locales\_nl\_NL;

var am5locales\_nl\_NL = {
  // ...
  "Zoom Out": "Uitzoomen",
  "Play": "Afspelen",
  "Stop": "Stoppen",
  // ...
}

root.locale = am5locales\_nl\_NL;

Or even setting it directly to `root.locale`, without creating a variable:

root.locale = {
  // ...
  "Zoom Out": "Uitzoomen",
  "Play": "Afspelen",
  "Stop": "Stoppen",
  // ...
};

root.locale = {
  // ...
  "Zoom Out": "Uitzoomen",
  "Play": "Afspelen",
  "Stop": "Stoppen",
  // ...
};

## Modifying individual prompts

In some cases we might be generally happy with existing default or bundled translation, and would just need to modify a single prompt or two.

This way we can directly access the locale object and modify its values:

root.locale\["\_decimalSeparator"\] = ",";
root.locale\["\_thousandSeparator"\] = " ";
root.locale\["Export"\] = "Save";

root.locale\["\_decimalSeparator"\] = ",";
root.locale\["\_thousandSeparator"\] = " ";
root.locale\["Export"\] = "Save";

## Extending locale with custom prompts

The above functionality was dealing with hardcoded list of prompts.

Using any prompts outside of the built-in list, would result in errors in strongly typed languages like TypeScript.

In the following section, we will explore ways to add "non-standard" prompts as well as ways to translate them.

### Adding custom translations

We can use `Language` methods `setTranslationAny()` and `setTranslationsAny()` to add custom prompts without triggering any errors or warnings.

`setTranslationAny()` adds a single translation:

root.language.setTranslationAny("Hello!", "¡Hola!");

root.language.setTranslationAny("Hello!", "¡Hola!");

We can also add many translations in one go using `setTranslationsAny()`:

root.language.setTranslationsAny({
  "Hello!": "¡Hola!",
  "Bye": "Adios"
});

root.language.setTranslationsAny({
  "Hello!": "¡Hola!",
  "Bye": "Adios"
});

NOTE`setTranslationsAny()` method is available from version `5.3.3` and up.

### Translating custom prompts

A `translateAny()` method, as the name implies, will translate any prompt - both built-in and custom ones.

console.log(root.language.translateAny("Hello!"));

console.log(root.language.translateAny("Hello!"));

### Translating Stock Chart

Please refer to "[Translating Stock Chart](https://www.amcharts.com/docs/v5/charts/stock/translating-stock-chart/)" tutorial.
