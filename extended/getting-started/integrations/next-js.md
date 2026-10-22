---
title: "Using amCharts 5 with Next.js"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/next-js/"
scraped: "2026-10-22"
---

Next.js is a React framework: use our [`@amcharts/amcharts5-react`](https://www.npmjs.com/package/@amcharts/amcharts5-react) package, as in the [React tutorial](https://www.amcharts.com/docs/v5/getting-started/integrations/react/). It works with the app router and server rendering, and needs nothing in `next.config`.

```shell
npm install @amcharts/amcharts5 @amcharts/amcharts5-react
```

## A chart written in code

`useAmChart()` takes a function, so it goes in a client component, a file that starts with `"use client"`. It is still rendered on the server, where it draws nothing; the library is loaded in the browser only.

```typescript
"use client";

import { useAmChart } from "@amcharts/amcharts5-react";
import * as am5xy from "@amcharts/amcharts5/xy";

export function Chart({ data }) {
  const { ref } = useAmChart((root) => {
    const chart = root.container.children.push(am5xy.XYChart.new(root, {}));
    // ... axes, series and data
  }, [data]);

  return <div ref={ref} style={{ height: "500px" }}></div>;
}
```

## A chart from a JSON config

A server component can render `<AmChart>` with a config itself, because a config is plain data. Theme classes and functions cannot be passed from a server component: for those, use a client component.

```typescript
import { AmChart } from "@amcharts/amcharts5-react";
import { Chart } from "./Chart";
import config from "./chart-config.json";

const data = [
  { category: "Research", value: 1000 },
  { category: "Marketing", value: 1200 }
];

export default function Page() {
  return (
    <>
      <Chart data={data} />
      <AmChart config={config} style={{ height: "500px" }} />
    </>
  );
}
```

An [example app](https://github.com/amcharts/amcharts5/tree/master/integrations/react/examples/next) is on GitHub.

## Without the package

The code from the [React tutorial](https://www.amcharts.com/docs/v5/getting-started/integrations/react/#without-the-package) works in a client component: add `"use client";` at the top of the file.

Older versions of Next.js do not have `"use client"`, so [use `dynamic`](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr) to load the chart component in the browser only:

```typescript
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./Chart"), { ssr: false });

function App() {
  return <Chart />;
}
```
