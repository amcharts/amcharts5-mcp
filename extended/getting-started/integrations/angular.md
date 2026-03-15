---
title: "Using amCharts 5 with Angular"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/angular/"
scraped: "2026-03-15"
---

This tutorial will provide basic information, needed to run amCharts 5 with [Angular](https://angular.io/) framework.

## Requirements

amCharts 5 requires **TypeScript 4.3** or later to run. This in turn means that it will run on **Angular 12** or later.

For running amCharts in lower versions of Angular than 12, see "Before Angular 12" section.

## Using amCharts

First, create a new Angular project:

npx -p @angular/cli ng new my-project
cd my-project

You can now run your project by using this command:

npm start

If you load `http://localhost:4200/` in a browser, you should see your new project!

Now it's time to add in an amCharts 5 chart. First create a new chart component:

npm run -- ng generate component chart --module app

Then use this command to install amCharts 5:

npm install @amcharts/amcharts5

Then add in the following code to the `src/app/chart/chart.component.html` file:

<div id="chartdiv" style="width: 100%; height: 500px"></div>

And use the following code in `src/app/chart/chart.component.ts`:

import { Component, Inject, NgZone, PLATFORM\_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import \* as am5 from '@amcharts/amcharts5';
import \* as am5xy from '@amcharts/amcharts5/xy';
import am5themes\_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: \['./chart.component.css'\]
})

export class ChartComponent {
  private root!: am5.Root;

  constructor(@Inject(PLATFORM\_ID) private platformId: Object, private zone: NgZone) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");

      root.setThemes(\[am5themes\_Animated.new(root)\]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        })
      );

      // Define data
      let data = \[
        {
          category: "Research",
          value1: 1000,
          value2: 588
        },
        {
          category: "Marketing",
          value1: 1200,
          value2: 1800
        },
        {
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

      this.root = root;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}

The chart code goes inside the `ngAfterViewInit` method.

Lastly, add `<app-chart></app-chart>` to your `src/app.component.html` file.

Now you can run `npm start` again and you should see a chart.

## Working example

## Lazy loading amCharts

Pardon the mess. We're still working on this section.

## Before Angular 12

If your app is using Angular version lower than 12, you will need to use script version of amCharts 5.

Instead of importing amCharts 5 modules, add them as a `<script>` blocks in HTML.

<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>

As well as declare amCharts globals that are created by scripts:

declare const am5: any;
declare const am5xy: any;
declare const am5themes\_Animated: any;
