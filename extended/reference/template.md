---
title: "Template"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/template/"
scraped: "2026-03-15"
---

Sources
Template can be used (imported) via one of the following packages.
// Import Template
import * as am5 from "@amcharts/amcharts5";

// Create Template
am5.Template.new(root, {
  // ... config if applicable
});

<!-- Load Template -->
<script src="index.js"></script>

<script>
// Create Template
am5.Template.new(root, {
  // ... config if applicable
});
</script>

## Import

```javascript
// Import Template
import * as am5 from "@amcharts/amcharts5"
```

## Properties

- **adapters** (`TemplateAdapters`) — Default new TemplateAdapters()
- **entities** (`Array`) — Array of all entities using this template.
- **events** (`EventDispatcher`) — Default new EventDispatcher()
- **setup** (`( entity: O) => void | undefined`) — (no description)
