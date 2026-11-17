---
title: "TextFormatter"
type: "class"
source: "https://docs.amcharts.com/v5/reference/textformatter/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Splits text into chunks of plain text and style blocks, such as `[bold]`, and reads style blocks into text styles.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: (none)

## Static methods

- `TextFormatter.getTextStyle(style: string): ITextStyle` — Reads a style block, such as `[bold #f00 fontSize: 20px]`, into text style settings: a font weight, `underline` or `line-through`, a color, and any `key: value` pairs. Parameters: `style`: Style block. Returns: Text style
