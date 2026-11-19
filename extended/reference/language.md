---
title: "Language"
type: "class"
source: "https://docs.amcharts.com/v5/reference/language/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Translates the text prompts of charts into the root's locale. Available as `root.language`.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `ILanguageSettings` — get_api_reference shows it after this page
- Private settings: `ILanguagePrivate`

## Methods

- `isDefault(): boolean` — Returns `true` if the root's locale is the default (English) one. Returns: `true` if locale is default; `false` if it is not.
- `setTranslationAny(prompt: string, translation: string, locale?: ILocale): void` — Adds a custom prompt and its translation to a locale. Parameters: `prompt`: Source prompt; `translation`: Translation; `locale`: Target locale; the root's locale if not given. Docs: https://docs.amcharts.com/v5/concepts/locales/creating-translations/#extending-locale-with-custom-prompts
- `setTranslationsAny(translations: { [index: string]: any; }, locale?: ILocale): void` — Adds several custom prompts at once, from an object of prompts and their translations. Parameters: `translations`: Translations; `locale`: Target locale; the root's locale if not given. _Since 5.3.3._ Docs: https://docs.amcharts.com/v5/concepts/locales/creating-translations/#extending-locale-with-custom-prompts
- `translate<Key extends keyof ILocaleSettings>(prompt: Key, locale?: ILocale, ...rest: Array<string>): string` — Returns the translation of `prompt`, from English if the locale has none. `%1`, `%2` and so on in it are replaced with the `rest` parameters. Parameters: `prompt`: Prompt to translate; `locale`: Target locale; the root's locale if not given. Returns: Translation
- `translateAll<Key extends keyof ILocaleSettings>(list: Array<Key>, locale?: ILocale): Array<string>` — Translates a list of prompts. With the default locale, returns the list as it is. Parameters: `list`: Array of prompts to translate; `locale`: Target locale. Returns: Array of translations
- `translateAny(prompt: string, locale?: ILocale, ...rest: Array<string>): string` — Same as `translate()`, but takes any prompt, including custom ones added with `setTranslationAny()`. Parameters: `prompt`: Prompt to translate; `locale`: Target locale; the root's locale if not given. Returns: Translation
- `translateEmpty<Key extends keyof ILocaleSettings>(prompt: Key, locale?: ILocale, ...rest: Array<string>): string` — Same as `translate()`, but returns an empty string when the prompt has no translation. Parameters: `prompt`: Prompt to translate; `locale`: Target locale; the root's locale if not given. Returns: Translation
- `translateFunc<Key extends keyof ILocaleFunctions>(prompt: Key, locale?: ILocale): ILocaleFunctions[Key]` — Returns a function of the root's locale, such as `"_dateOrd"`, which gives the ordinal suffix of a day. A function that returns an empty string if the locale has none. Parameters: `prompt`: Function name; `locale`: Locale. Returns: Function

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
