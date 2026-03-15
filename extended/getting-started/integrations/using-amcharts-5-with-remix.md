---
title: "Using amCharts 5 with Remix"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/using-amcharts-5-with-remix/"
scraped: "2026-03-15"
---

This tutorial will show you every step you need to use amCharts 5 with Remix.

Create a new project.

npx create-remix@latest my-project
cd my-project
npm install @amcharts/amcharts5
npm install remix-utils

Create an `app/components/Chart.client.tsx` file:

import { useLayoutEffect } from "react";
import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";
import am5themes\_Animated from "@amcharts/amcharts5/themes/Animated";

export default function Chart() {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes(\[
      am5themes\_Animated.new(root)
    \]);

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
    }\];

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
  }, \[\]);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}

Now you can import and use the `Chart` component in the `app/routes/_index.tsx` file:

import type { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import Chart from "../components/Chart.client.tsx";

export const meta: MetaFunction = () => {
  return \[
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  \];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <ClientOnly fallback={null}>
        {() => <Chart />}
      </ClientOnly> 
    </div>
  );
}

You need to wrap it in `<ClientOnly>` because amCharts is a browser library, amCharts cannot run on the server.
