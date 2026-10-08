---
title: "IParseSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iparsesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Settings

- **parent** (`Container`) — Container to add the parsed chart to, usually `root.container`. The config must then build a `Sprite`.
- **updateTargets** (`"strict" | "soft"`) — default `"strict"` — What a config block with a `type` does to an object that is already there: `"strict"` replaces it with a new object of that type; `"soft"` replaces it only if its type differs, and otherwise applies the block to it, as if the block had no `type`. _Since 5.20.3._

## Notes

Options object passed as the **second argument** of `JsonParser.parse(config, options)` (or `parseString`). These are not settings of the parser object itself.

```javascript
const parser = am5plugins_json.JsonParser.new(root);
const chart = await parser.parse(config, { parent: root.container, updateTargets: "soft" });
```
