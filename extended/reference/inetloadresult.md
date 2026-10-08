---
title: "INetLoadResult"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/inetloadresult/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Defines an interface for objects that hold a net request result.

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **xhr** (`XMLHttpRequest`) — A reference to original `XMLHttpRequest`.
- **response** (`string`) — Request response body.
- **blob** (`Blob`) — Response as a `Blob`, when `responseType` is `"blob"`. `response` then holds its text.
- **type** (`string`) — Response `Content-Type`.
- **error** (`boolean`) — Was there an error?
- **target** (`A`) — The `target` passed to `load()`.
