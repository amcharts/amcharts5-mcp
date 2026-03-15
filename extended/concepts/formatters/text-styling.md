---
title: "Text styling"
source: "https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/"
scraped: "2026-03-15"
---

Any text in amCharts 5 can be styled with in-line codes. This tutorial will show how.

## Style blocks

### Opening block

Style blocks are enclosed in square brackets, and contain style instructions for the text that goes immediately after text until end, or closing block.

series.set("tooltipText", "\[#888\]{categoryX}\[/\]: \[bold\]{valueY}\[/\]");

series.set("tooltipText", "\[#888\]{categoryX}\[/\]: \[bold\]{valueY}\[/\]");

### Closing block

The effect of the style block expires if a closing block (`[/]`) is encountered in text.

Since style directives can be combined, there's no need to match closing bracket to the opening one. The following is wrong: `[bold]...[/bold]`. The correct usage is `[bold]...[/]`.

Closing bracket is also optional. If there's no closing bracket the next opening one the style will be automatically terminated by either next opening style block or end of the string, whichever come first.

The following is perfectly valid: `[bold #f00]Value is: [#0f0]{valueY.value}`.

### Available style codes

Code

Example

Comment

`bold`

`"I'm a [bold]thick[/] text!"`

Makes enclosed text bold.

`underline`

`"I'm [underline]underlined[/b]"`

Underlines enclosed text. This feature is experimental.

Hex color code

`"I'm [#f00]red[/]."`

Applies color to enclosed text.

`width`

`"[width: 100]Name:[/] Patrick"`

Set minimal width of the block (like tab stop).

`fontSize`

`"[fontSize: 20px]I'm big![/]"`

Sets [font-size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) for enclosed text.

`fontVariant`

`"[fontVariant: small-caps]All caps[/]"`

Sets [font-variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant) for enclosed text.

`fontWeight`

`"[fontWeight: 300]I'm bold(ish).[/]"`

Sets [font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) for enclosed text.

`fontStyle`

`"[fontStyle: italic]I'm italic.[/]"`

Sets [font-style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style) for enclosed text.

`fontFamily`

`"[fontFamily: Roboto]I'm a robot![/]"`

Sets [font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) for enclosed text.

`verticalAlign`

`"Copyright[fontSize: 8px; verticalAlign: super;]TM[\]"`

Supports `"super"` and `"sub"` for super- and sub-script.

### Combining styles

Each block can combine several style codes, separated by a space or a semicolon:

series.set("tooltipText", "\[#888 fontVariant: small-caps width: 100\]{categoryX}:\[/\] \[bold fontStyle: italic\]{valueY}\[/\]");

series.set("tooltipText", "\[#888 fontVariant: small-caps width: 100\]{categoryX}:\[/\] \[bold fontStyle: italic\]{valueY}\[/\]");

## Line breaks

To insert a simple line break use JS-standard `\n` symbol., e.g. `"So it begins...\nand ends on a second line."`.

## Escaping

Let's say we have this text:

"Quick \[fox\] jumps over lazy {dog}"

That won't work as expected because text in square brackets will be treated as style block, while one in curly brackets - as a data placeholder.

Escaping is done by duplicating the bracket:

"Quick \[\[fox\]\] jumps over lazy {{dog}}"
