---
title: "INetLoadResult"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/inetloadresult/"
scraped: "2026-03-15"
---

Defines an interface for objects that hold a net request result.

## Properties

- **blob** (`Blob`) — Request response as Blob. (if set responseType = "blob")
- **error** (`boolean`) — Was there an error?
- **response** (`undefined | string`) — Request response body.
- **target** (`A`) — A target object that made the net load request.
- **type** (`string | null`) — Response Content-Type.

