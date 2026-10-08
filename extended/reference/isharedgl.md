---
title: "ISharedGL"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isharedgl/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A WebGL2 context shared by every chart on the page: browsers allow only a few live contexts (8-16), and dashboards can have more charts than that. Users draw into it and copy the result out before anyone else draws, and set every piece of state they depend on: nothing is reset between users.

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **canvas** (`HTMLCanvasElement`)
- **gl** (`WebGL2RenderingContext`)
- **generation** (`number`) — Changes when a lost context is restored: textures and programs made before are gone.
