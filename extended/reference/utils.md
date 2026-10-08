---
title: "utils"
type: "namespace"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Helpers exported as `am5.utils`.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.utils.…
```

## Functions

- `addClass(element: HTMLElement | SVGElement, className: string): void` — Adds a class name to an HTML or SVG element.
- `addEventListener<E extends Event>(dom: EventTarget, type: string, listener: (event: E) => void, options?: any): IDisposer` — Function that adds a disposable event listener directly to a DOM element.
- `addSpacing(str: string): string` — Adds a space before each uppercase letter, except the first character. Characters without case, such as digits and spaces, count as uppercase.
- `alternativeColor(color: iRGB, lightAlternative?: iRGB, darkAlternative?: iRGB): iRGB` — Returns `lightAlternative` or `darkAlternative`, whichever contrasts more with `color`.
- `blur(): void` — Removes focus from any element by shifting focus to body.
- `brighten(rgb: $type.Optional<iRGB>, percent: number): $type.Optional<iRGB>` — Returns a color brightened by `percent`, from `-1` to `1`. Unlike `lighten()`, it adds the same amount to every channel.
- `capitalizeFirst(text: string): string` — Capitalizes the first letter of a string.
- `cleanFormat(format: string): string` — Cleans up format: • Strips out formatter hints
- `contains(a: Element, b: Element): boolean` — Checks if element `a` contains element `b`, or is `b`. Looks across shadow DOM boundaries too.
- `decimalPlaces(number: number): number` — Returns number of decimals
- `escapeForRgex(value: string): string` — Escapes string so it can safely be used in a Regex.
- `focus(el: HTMLElement): void` — Focuses element.
- `get12Hours(hours: number, base?: number): number` — Returns 12-hour representation out of the 24-hour hours.
- `getBrightnessStep(_value: number, percent: number): number` — Returns brightness step.
- `getDayFromWeek(week: number, year: number, weekday?: number, utc?: boolean): number` — Returns a year day out of the given week number.
- `getEventKey(event: KeyboardEvent): string` — Returns a normalized key name from a keyboard event.
- `getEventTarget(event: Event | Touch): Node | null` — Gets the target of the event, works for shadow DOM too.
- `getFormat(format: string): string` — Tries to determine format type.
- `getLightnessStep(value: number, percent: number): number` — Gets lightness step.
- `getMonthWeek(date: Date, utc?: boolean): number` — Returns a week number in the month.
- `getPointerId(event: IPointerEvent): any`
- `getRendererEvent(key: string): string`
- `getSafeResolution(): number | undefined` — Returns a safe canvas resolution for the current device. Returns `1` on iOS to avoid memory issues, `undefined` otherwise.
- `getShadowRoot(a: Node): ShadowRoot | null` — Returns the shadow root the node is in, or `null` if it is not in one.
- `getStyle(dom: HTMLElement, property: string): string | undefined` — Gets style property value on a DOM element.
- `getTimeZone(date: Date, long?: boolean, savings?: boolean, utc?: boolean, timezone?: string): string` — Returns a string name of the time zone.
- `getTimezoneOffset(timezone: string, targetDate?: Date): number` — Returns the UTC offset in minutes for a given timezone, positive west of UTC, as with `Date.getTimezoneOffset()`.
- `getWeek(date: Date, _utc?: boolean): number` — Returns the ISO 8601 week number of a date: weeks start on Monday, and week 1 is the one with the year's first Thursday.
- `getWeekYear(date: Date, _utc?: boolean): number` — Returns the year that the ISO 8601 week of the date belongs to. Around January 1 it can differ from the calendar year. _Since 5.3.0._
- `getYearDay(date: Date, utc?: boolean): number` — Returns the day of the year, `1` being January 1.
- `hslToHsv(hsl: iHSL): iHSV` — Converts HSL to HSV.
- `hslToRgb(color: iHSL): iRGB` — Converts an HSL color to RGB: `h`, `s` and `l` from `0` to `1` in, `r`, `g` and `b` from `0` to `255` out. Alpha is not carried over.
- `hsvToHsl(hsv: iHSV): iHSL` — Converts HSV to HSL.
- `htmlToText(html: string): string` — Returns the text of an HTML string: tags removed, entities such as `&amp;` turned into characters. For attributes like `title` that do not parse HTML.
- `iOS(): boolean` — Returns `true` if the current device is running iOS.
- `isLight(color: iRGB): boolean` — Returns `true` if color is "light", for example to pick dark text to go on it.
- `isLocalEvent(event: IPointerEvent, target: Sprite): boolean | null` — Returns `true` if pointer event originated on an element within Root. _Since 5.2.8._
- `isTouchEvent(ev: MouseEvent | Touch): boolean` — Returns `true` if the event came from touch or a pen, `false` if from a mouse.
- `lighten(rgb: $type.Optional<iRGB>, percent: number): $type.Optional<iRGB>` — Returns a color lightened by `percent`, from `-1` to `1`: `0.2` moves each channel 20% of the way to `255`. A negative value darkens it toward `0`.
- `mergeTags(tags1: string[] | undefined, tags2: string[]): string[]`
- `onZoom(listener: () => void): IDisposer` — Calls `listener` when the window is resized, which also happens when the browser's zoom changes.
- `padString(value: any, len?: number, char?: string): string` — Pads a string with additional characters to certain length.
- `plainText(text: string): string` — Replaces line breaks in a string with `". "` and removes HTML tags.
- `ready(f: () => void): void` — Calls `f` when the DOM is ready, or right away if it already is. _Since 5.0.2._
- `relativeToValue(percent: number | Percent | undefined | null, full: number): number` — Converts a value that can be a number or `Percent` to an absolute number relative to the given full value.
- `removeClass(element: HTMLElement, className: string): void` — Removes a class name from an HTML or SVG element.
- `removeElement(el: HTMLElement): void` — Removes a DOM element.
- `rgbToHsl(color: iRGB): iHSL` — Converts an RGB color to HSL: `r`, `g` and `b` from `0` to `255` in, `h`, `s` and `l` from `0` to `1` out. Alpha is not carried over.
- `sameBounds(a: IBounds, b?: IBounds): boolean`
- `sanitizeHTML(html: string): string` — Removes the parts of an HTML string that are practically only used for cross-site scripting (XSS), leaving legitimate markup intact: _Since 5.19.0._
- `saturate(rgb: $type.Optional<iRGB>, saturation: number): $type.Optional<iRGB>` — Returns `rgb` with its saturation set to `saturation`, from `0` (grey) to `1`. The value replaces the color's saturation; `1` returns `rgb` unchanged.
- `setInteractive(target: HTMLElement, interactive: boolean): void` — Disables or enables interactivity of a DOM element.
- `setStyle(dom: HTMLElement, property: string, value: string | undefined): void` — Sets style property on DOM element.
- `splitString(source: string): string[]` — Splits the string into separate characters. Keeps RTL words non-split.
- `stripFormatTags(text: string): string` — Strips inline formatting tags (square brackets) from the string.
- `stripTags(text: string): string` — Strips all tags from the string.
- `supports(cap: "touchevents" | "pointerevents" | "mouseevents" | "wheelevents" | "keyboardevents"): boolean`
- `trim(text: string): string` — Removes whitespace from both ends of a string.
- `trimLeft(text: string): string` — Removes whitespace from the beginning of a string.
- `trimRight(text: string): string` — Removes whitespace from the end of a string.
- `truncateTextWithEllipsis(text: string, maxLength: number, breakWords?: boolean, ellipsis?: string): string` — Truncates a string to a maximum length, appending an ellipsis.

## Other members

- `iHSL` (interface)
- `iHSV` (interface)
- `iRGB` (interface)
- `StyleRule` (class)
- `StyleSheet` (class)
