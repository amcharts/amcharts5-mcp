---
title: "net"
type: "namespace"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Helpers exported as `am5.net`.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.net.…
```

## Functions

- `load<A>(url: string, target?: A, options?: INetRequestOptions): Promise<INetLoadResult<A>>` — Loads a file from `url` and returns a `Promise` of the result. The promise is rejected, with `error: true` in the result, if the request fails or its status is not 200.
- `readBlob(blob: Blob): Promise<string>` — Returns textual representation of a Blob object.

## Other members

- `INetLoadResult` (interface)
- `INetRequestOptions` (interface)
