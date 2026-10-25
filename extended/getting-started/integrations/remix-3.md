---
title: "Using amCharts 5 with Remix 3"
source: "https://docs.amcharts.com/v5/getting-started/integrations/remix-3/"
scraped: "2026-10-22"
---

amCharts 5 works with [Remix 3](https://remix.run/) through Remix's own tools: there is no separate package. For Remix 2, now React Router, see [React Router](https://docs.amcharts.com/v5/getting-started/integrations/remix/).

## A chart from a JSON config

The simplest way: the library's [`<am5-chart>` element](https://docs.amcharts.com/v5/getting-started/integrations/am5-chart-element/). It needs no client code. Load its script files in your document's `<head>`, with the files for the chart types the config uses:

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/plugins/json.js"></script>
<script src="https://cdn.amcharts.com/lib/5/element.js"></script>
<script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
```

Then render the element with its [JSON config](https://docs.amcharts.com/v5/concepts/serializing/). The server renders it like any HTML, and the browser builds the chart:

```typescript
function SalesPage() {
  return () => (
    <am5-chart config={JSON.stringify(config)} data-rmx-preserve-dom></am5-chart>
  );
}
```

`data-rmx-preserve-dom` keeps Remix's frame reloads from replacing what the element drew. Without a height, the element is 400 pixels high.

## A chart written in code

Make the chart's component a client entry, so it runs in the browser, and create the root with Remix's `ref` mixin. It gives you the element once it is on the page, and a signal that aborts when it is removed: dispose the root then.

```typescript
import { clientEntry, css, ref, type Handle } from "remix/component";

export let SalesChart = clientEntry(
  "/assets/sales-chart.js#SalesChart",
  function SalesChart(handle: Handle<{ data: Array<{ category: string, value: number }> }>) {
    return () => (
      <div
        data-rmx-preserve-dom
        mix={[
          css({ height: "400px" }),
          ref(async (node, signal) => {
            // In the browser only
            const am5 = await import("@amcharts/amcharts5");
            const am5percent = await import("@amcharts/amcharts5/percent");
            if (signal.aborted) {
              return;
            }

            const root = am5.Root.new(node as HTMLElement);

            // The signal aborts when the element is removed
            signal.addEventListener("abort", () => root.dispose());

            const chart = root.container.children.push(
              am5percent.PieChart.new(root, {})
            );

            const series = chart.series.push(
              am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category"
              })
            );

            series.data.setAll(handle.props.data);
          })
        ]}
      />
    );
  }
);
```

-   The first argument of `clientEntry()` is where your build serves this module, with the export's name.
-   The library is imported in the `ref` callback, which runs in the browser only, so the server never loads it.
-   Props of client entries are serialized to JSON: pass data, not functions.

For more on client entries and mixins, see Remix's [Hydration](https://github.com/remix-run/remix/blob/main/packages/component/docs/hydration.md) and [Mixins](https://github.com/remix-run/remix/blob/main/packages/component/docs/mixins.md) guides.

## License

With a commercial license, call `am5.addLicense()` before the chart is made: in a script after `index.js`, or in the `ref` callback before `am5.Root.new()`.
