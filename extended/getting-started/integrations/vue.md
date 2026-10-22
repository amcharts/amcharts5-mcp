---
title: "Using amCharts 5 with Vue.js"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/vue/"
scraped: "2026-10-22"
---

Use amCharts 5 in [Vue.js](https://vuejs.org/) with our [`@amcharts/amcharts5-vue`](https://www.npmjs.com/package/@amcharts/amcharts5-vue) package. It creates and disposes the chart with your component, and works with server rendering.

## Installation

Create a project, if you do not have one, and install amCharts with the package:

```shell
npm create vue@latest my-project
cd my-project
npm install @amcharts/amcharts5 @amcharts/amcharts5-vue
```

It needs Vue 3.5.2 or later and amCharts 5.21.0 or later.

## A chart written in code

`useAmChart()` takes the template ref of the chart's element and gives your function a new root. Build the chart in it as in any amCharts example. The element needs a height:

```html
<script setup>
import { useTemplateRef } from "vue";
import { useAmChart } from "@amcharts/amcharts5-vue";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const props = defineProps(["data"]);

useAmChart(useTemplateRef("chart"), (root) => {
  root.setThemes([am5themes_Animated.new(root)]);

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panY: false,
      layout: root.verticalLayout
    })
  );

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    })
  );

  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      categoryField: "category"
    })
  );
  xAxis.data.setAll(props.data);

  const series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Value",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryXField: "category"
    })
  );
  series.data.setAll(props.data);

  const legend = chart.children.push(am5.Legend.new(root, {}));
  legend.data.setAll(chart.series.values);

  chart.set("cursor", am5xy.XYCursor.new(root, {}));
}, { watch: () => props.data });
</script>

<template>
  <div ref="chart" style="width: 100%; height: 500px"></div>
</template>
```

-   `watch` makes the chart again when it changes. It takes what Vue's `watch()` takes: a getter, a ref, a reactive object or an array of them. Leave it out to make the chart once. Add `deep: true` to also react to changes inside, e.g. `props.data.push()`.
-   The chart is made when the element is there, also when it is rendered later with `v-if`, and disposed when it goes.
-   `{ renderer: "svg" }` in the options draws the chart as SVG.
-   If your function throws, the error goes to `app.config.errorHandler`.

### Updating without making the chart again

`useAmChart()` returns `root`, and `result`: what your function returned, as shallow refs. Keep what you need there and change it when the data changes:

```typescript
import { useTemplateRef, watchEffect } from "vue";
import { useAmChart } from "@amcharts/amcharts5-vue";

const { result } = useAmChart(useTemplateRef("chart"), (root) => {
  // ... the chart, as above, without setting data
  return { xAxis, series };
});

// New data goes to the chart that is there, with an animation
watchEffect(() => {
  if (result.value) {
    result.value.xAxis.data.setAll(props.data);
    result.value.series.data.setAll(props.data);
  }
});
```

IMPORTANT Give amCharts plain data and keep amCharts objects out of Vue's reactive state: use `shallowRef()` for data, or pass `toRaw(data)`. Reactive proxies make charts slow and can cause errors.

## A chart from a JSON config

`<AmChart>` builds a chart from a [JSON config](https://www.amcharts.com/docs/v5/concepts/serializing/), with no chart code:

```html
<script setup>
import { AmChart } from "@amcharts/amcharts5-vue";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const themes = [am5themes_Animated];
</script>

<template>
  <AmChart :config="config" :themes="themes" style="height: 500px" @ready="onReady" />
</template>
```

| Prop or event | What it is |
| --- | --- |
| `config` | The chart as a JSON config: an object or a JSON string. A config with different content makes the chart again; the same content written inline does not. |
| `src` | A URL to load the config from, used when there is no `config`. |
| `themes` | Theme classes, e.g. `[am5themes_Animated]`. Themes are not part of a config. |
| `renderer` | `"svg"` draws the chart as SVG; the default is canvas. |
| `@ready` | `{ root, chart }`, when the chart is built. |
| `@error` | When it could not be built. |

It is the library's [`<am5-chart>` element](https://www.amcharts.com/docs/v5/getting-started/integrations/am5-chart-element/): the component exposes it as `element`. Without a height, it is 400 pixels high.

## License

With a commercial license, call `am5.addLicense()` once in `main.js`, before `createApp()`. Not in your chart function: a chart decides on the logo when its root is made.

## Without the package

To manage the chart yourself, create the root when the component is mounted and dispose it before it is unmounted:

```html
<script setup>
import { onBeforeUnmount, onMounted, useTemplateRef } from "vue";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

const chartdiv = useTemplateRef("chartdiv");

// A plain variable, not reactive state
let root;

onMounted(() => {
  root = am5.Root.new(chartdiv.value);

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {})
  );

  // ... axes, series and data
});

onBeforeUnmount(() => {
  if (root) {
    root.dispose();
  }
});
</script>

<template>
  <div ref="chartdiv" style="width: 100%; height: 500px"></div>
</template>
```

Keep amCharts objects in plain variables, not in reactive state. If you need them in a ref, use `shallowRef()`.

## Examples

Example apps for Vite and Nuxt are [on GitHub](https://github.com/amcharts/amcharts5/tree/master/integrations/vue/examples).
