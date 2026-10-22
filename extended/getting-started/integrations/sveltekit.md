---
title: "Using amCharts 5 with SvelteKit"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/sveltekit/"
scraped: "2026-10-22"
---

Use amCharts 5 in Svelte and [SvelteKit](https://svelte.dev/docs/kit) with our [`@amcharts/amcharts5-svelte`](https://www.npmjs.com/package/@amcharts/amcharts5-svelte) package. It creates and disposes the chart with the element, and works with server rendering: nothing has to be configured.

Create a project, if you do not have one, and install amCharts with the package:

```shell
npx sv create my-app
cd my-app
npm install @amcharts/amcharts5 @amcharts/amcharts5-svelte
```

It needs Svelte 4 or later and amCharts 5.21.0 or later.

## Using the package

In Svelte 5.29 or later, use attachments. `attachAmChart()` gives your function a new root in the element; build the chart in it as in any amCharts example. `attachAmChartConfig()` builds a chart from a [JSON config](https://www.amcharts.com/docs/v5/concepts/serializing/) in the library's [`<am5-chart>` element](https://www.amcharts.com/docs/v5/getting-started/integrations/am5-chart-element/). Both elements need a height.

```html
<script lang="ts">
  import { attachAmChart, attachAmChartConfig } from "@amcharts/amcharts5-svelte";
  import type { Root } from "@amcharts/amcharts5";
  import * as am5xy from "@amcharts/amcharts5/xy";
  import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

  let { data, config } = $props();

  // The series, to give it new data later
  let series = $state.raw<am5xy.ColumnSeries>();

  function buildChart(root: Root) {
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(am5xy.XYChart.new(root, {}));

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      categoryXField: "category",
      valueYField: "value"
    }));
  }

  // The data goes to the chart once it is made, and again when it changes,
  // without making the chart again
  $effect(() => {
    if (series) {
      const rows = $state.snapshot(data);
      series.get("xAxis").data.setAll(rows);
      series.data.setAll(rows);
    }
  });
</script>

<div {@attach attachAmChart(buildChart)} style="height: 500px"></div>

<am5-chart {@attach attachAmChartConfig({ config, themes: [am5themes_Animated] })} style="height: 500px"></am5-chart>
```

-   The chart is made when the element is there, and disposed when it goes. Like any attachment, it is made again when state read in its expression changes.
-   `attachAmChart(buildChart, { renderer: "svg" })` draws the chart as SVG.
-   `attachAmChart(buildChart, { onError })` gets errors from your function. Without it, they are reported as uncaught errors.
-   Give amCharts plain data: `$state.snapshot()` turns Svelte state into it.
-   The `<am5-chart>` element dispatches `ready` (`event.detail` has `root` and `chart`) and `error`: listen with `onready` and `onerror`.

### Svelte 4 and older Svelte 5

Use the actions instead. With `deps`, the chart is made again when a value in it changes, compared by content:

```html
<div use:amChart={{ setup: buildChart, deps: [data] }} style="height: 500px"></div>

<am5-chart use:amChartConfig={{ config }} on:ready={(event) => console.log(event.detail.chart)}></am5-chart>
```

### License

With a commercial license, call `am5.addLicense()` once in `src/hooks.client.ts`, which runs when the app starts in the browser.

An [example app](https://github.com/amcharts/amcharts5/tree/master/integrations/svelte/examples/sveltekit) is on GitHub.

## Without the package

To manage the chart yourself, create the root in `onMount` and dispose it in the function it returns. `onMount` runs in the browser only:

```html
<script>
  import { onMount } from "svelte";
  import * as am5 from "@amcharts/amcharts5";
  import * as am5xy from "@amcharts/amcharts5/xy";

  let chartdiv;

  onMount(() => {
    const root = am5.Root.new(chartdiv);

    const chart = root.container.children.push(am5xy.XYChart.new(root, {}));
    // ... axes, series and data

    return () => {
      root.dispose();
    };
  });
</script>

<div bind:this={chartdiv} style="height: 500px"></div>
```
