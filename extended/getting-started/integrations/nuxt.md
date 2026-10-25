---
title: "Using amCharts 5 with Nuxt 3"
source: "https://docs.amcharts.com/v5/getting-started/integrations/nuxt/"
scraped: "2026-10-22"
---

Nuxt is a Vue framework: use our [`@amcharts/amcharts5-vue`](https://www.npmjs.com/package/@amcharts/amcharts5-vue) package, as in the [Vue.js tutorial](https://docs.amcharts.com/v5/getting-started/integrations/vue/). It works with Nuxt's server rendering: there is no need for `<ClientOnly>`, and nothing to set in `nuxt.config.ts`.

Follow the directions for [installing Nuxt](https://nuxt.com/docs/getting-started/installation), then install amCharts:

```shell
npm install @amcharts/amcharts5 @amcharts/amcharts5-vue
```

Use the package in any component:

```html
<script setup>
import { useTemplateRef } from "vue";
import { useAmChart, AmChart } from "@amcharts/amcharts5-vue";
import * as am5xy from "@amcharts/amcharts5/xy";

useAmChart(useTemplateRef("chart"), (root) => {
  const chart = root.container.children.push(am5xy.XYChart.new(root, {}));
  // ... axes, series and data
});
</script>

<template>
  <div ref="chart" style="height: 500px"></div>
  <AmChart :config="config" style="height: 500px" />
</template>
```

A license key goes in a client plugin, e.g. `plugins/amcharts.client.ts`:

```typescript
import * as am5 from "@amcharts/amcharts5";

export default defineNuxtPlugin(() => {
  am5.addLicense("AM5C-...");
});
```

An [example app](https://github.com/amcharts/amcharts5/tree/master/integrations/vue/examples/nuxt) is on GitHub.

## Without the package

To use the code from [the Vue.js tutorial](https://docs.amcharts.com/v5/getting-started/integrations/vue/#without-the-package) without the package, render the component in `<ClientOnly>`:

```html
<ClientOnly>
  <Chart />
</ClientOnly>
```
