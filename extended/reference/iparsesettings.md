---
title: "IParseSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iparsesettings/"
scraped: "2026-09-14"
---

Options object passed as the **second argument** of `JsonParser.parse(config, options)`. These are not settings of the parser object itself.

```javascript
const parser = am5plugins_json.JsonParser.new(root);
const chart = await parser.parse(config, { parent: root.container, updateTargets: "soft" });
```

## Properties

- **parent** (`Container`) — Parent container to place the parsed chart into.
- **updateTargets** (`"strict" | "soft"`) — Default "strict" If set to "strict" and source object has `type` set, a new object of that type will be created and used in place of existing one. In case of "soft", parser will check if source and target objects are of the same type and overwrite only if types differ. Otherwise only settings will be applied, just like if the `type` was not specified at all. @since 5.20.3
