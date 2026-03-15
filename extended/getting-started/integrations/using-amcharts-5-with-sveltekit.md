---
title: "Using amCharts 5 with SvelteKit"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/using-amcharts-5-with-sveltekit/"
scraped: "2026-03-15"
---

This tutorial will show you every step you need to use amCharts 5 with SvelteKit.

First, create a new SvelteKit project by following the directions in [their docs](https://kit.svelte.dev/docs/creating-a-project):

npm create svelte@latest my-app
cd my-app
npm install

Second, run the command `npm install --save-dev vite-plugin-iso-import @amcharts/amcharts5` to install amCharts.

Third, add `vite-plugin-iso-import` into your `vite.config.ts` file:

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { isoImport } from 'vite-plugin-iso-import';
export default defineConfig({
    plugins: \[sveltekit(), isoImport()\]
});

Fourth, create a new `src/lib/Chart.svelte` file which contains your amCharts code:

<div class="chart" bind:this={chartdiv}></div>
<style>
.chart {
    width: 100%;
    height: 500px;
}
</style>
<script>
import { onMount } from "svelte";
import \* as am5 from "@amcharts/amcharts5?client";
import \* as am5xy from "@amcharts/amcharts5/xy?client";
import am5themes\_Animated from "@amcharts/amcharts5/themes/Animated?client";
let chartdiv;
onMount(() => {
    let root = am5.Root.new(chartdiv);
    root.setThemes(\[am5themes\_Animated.new(root)\]);
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );
    // Define data
    let data = \[{
        category: "Research",
        value1: 1000,
        value2: 588
      }, {
        category: "Marketing",
        value1: 1200,
        value2: 1800
      }, {
        category: "Sales",
        value1: 850,
        value2: 1230
      }
    \];
    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );
    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "category"
      })
    );
    xAxis.data.setAll(data);
    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value1",
        categoryXField: "category"
      })
    );
    series1.data.setAll(data);
    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value2",
        categoryXField: "category"
      })
    );
    series2.data.setAll(data);
    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);
    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    return () => {
        root.dispose();
    };
});
</script>

You must add `?client` at the end of the amCharts imports.

Lastly you can import the Chart component and use it:

<Chart />
<script>
import Chart from "$lib/Chart.svelte";
</script>

Now you can use `npm run dev` in order to run your project.
