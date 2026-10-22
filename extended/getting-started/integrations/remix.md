---
title: "Using amCharts 5 with Remix"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/remix/"
scraped: "2026-10-22"
---

Remix 2 is now [React Router](https://reactrouter.com/), in its framework mode. This tutorial shows amCharts 5 in a React Router app. For Remix 3, see [Remix 3](https://www.amcharts.com/docs/v5/getting-started/integrations/remix-3/).

Create a project and install amCharts with our React package:

```shell
npx create-react-router@latest my-project
cd my-project
npm install @amcharts/amcharts5 @amcharts/amcharts5-react
```

React Router renders pages on the server with Node, which cannot load amCharts' files on its own. Add amCharts to the server build in `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [reactRouter()],
  ssr: {
    noExternal: ["@amcharts/amcharts5"]
  }
});
```

Then use `useAmChart()` and `<AmChart>` in a route, e.g. `app/routes/home.tsx`. There is no need for a `.client.tsx` file or `ClientOnly`: the package loads the library in the browser only.

```typescript
import { useAmChart, AmChart } from "@amcharts/amcharts5-react";
import * as am5xy from "@amcharts/amcharts5/xy";
import config from "../chart-config.json";

export default function Home() {
  const { ref } = useAmChart((root) => {
    const chart = root.container.children.push(am5xy.XYChart.new(root, {}));
    // ... axes, series and data
  }, []);

  return (
    <>
      <div ref={ref} style={{ height: "500px" }}></div>
      <AmChart config={config} style={{ height: "500px" }} />
    </>
  );
}
```

See the [React tutorial](https://www.amcharts.com/docs/v5/getting-started/integrations/react/) for everything the package does, and the [example app](https://github.com/amcharts/amcharts5/tree/master/integrations/react/examples/react-router) on GitHub.

NOTE Astro needs the same setting, under `vite` in `astro.config.mjs`.
