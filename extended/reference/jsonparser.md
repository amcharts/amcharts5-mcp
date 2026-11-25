---
title: "JSONParser"
type: "class"
source: "https://docs.amcharts.com/v5/reference/jsonparser/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Parses a JSON string into data.

Docs: https://docs.amcharts.com/v5/concepts/data/#parsing

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: (none)

## Static methods

- `JSONParser.parse(input: string, options?: IJSONParserOptions): any` — Parses a JSON string. An array or object is returned as it is, and invalid JSON gives `undefined`. Parameters: `input`: JSON; `options`: Options. Returns: Data

## JsonParser (class)

Builds charts from JSON configs.

_Since 5.3.0._ Docs: https://docs.amcharts.com/v5/concepts/serializing/

### Import

```js
import * as am5plugins_json from "@amcharts/amcharts5/plugins/json";
```

### Inheritance

Extends: (none)

### Methods

- `parse<E extends Entity>(object: unknown, settings?: IParseSettings): Promise<E>` — Builds the chart objects a config describes, loading the classes it needs first. Parameters: `object`: Config, as a plain object; `settings`: Parse settings. Returns: A promise of the object the config builds, usually the chart
- `parseString<E extends Entity>(string: string, settings?: IParseSettings): Promise<E>` — Builds the chart objects a config describes, from a JSON string. Parameters: `string`: JSON string; `settings`: Parse settings. Returns: A promise of the object the config builds, usually the chart
