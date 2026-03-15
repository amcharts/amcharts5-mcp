---
title: "Using amCharts 5 with React"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/react/"
scraped: "2026-03-15"
---

This tutorial will show you every step you need to use amCharts 5 with React + Vite.

## Creating a project

npm create vite@latest my-project -- --template react
cd my-project
npm install
npm install @amcharts/amcharts5

Create a new `src/Chart.jsx` file:

import { useLayoutEffect } from 'react';
import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";
import am5themes\_Animated from "@amcharts/amcharts5/themes/Animated";

function Chart(props) {
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
    <div id="chartdiv" style={{ width: "500px", height: "500px" }}></div>
  );
}
export default Chart;

You can now import and use the `Chart` component inside of `src/App.jsx`:

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Chart from './Chart';
import './App.css';

function App() {
  return (
    <>
      <Chart />
    </>
  )
}

export default App

## Updating the chart

You can update the chart by storing the amCharts objects inside of a `useRef`, and then using `useLayoutEffect` multiple times to update it:

import { useRef, useLayoutEffect } from 'react';
import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";
import am5themes\_Animated from "@amcharts/amcharts5/themes/Animated";

function Chart(props) {
  const chartRef = useRef(null);

  // Creates the chart, this code only runs one time
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

    chartRef.current = chart;

    return () => {
      root.dispose();
    };
  }, \[\]);

  // When the paddingRight prop changes it will update the chart
  useLayoutEffect(() => {
      chartRef.current.set("paddingRight", props.paddingRight);
  }, \[props.paddingRight\]);

  return (
    <div id="chartdiv" style={{ width: "500px", height: "500px" }}></div>
  );
}
export default Chart;

And then you can pass in props to the Chart component:

<Chart paddingRight={20} />

## Examples

### Simple chart

### With data binding

### Stock chart
