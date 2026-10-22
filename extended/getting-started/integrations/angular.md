---
title: "Using amCharts 5 with Angular"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/angular/"
scraped: "2026-10-22"
---

This tutorial will provide basic information, needed to run amCharts 5 with [Angular](https://angular.dev/) framework.

## Requirements

amCharts 5 requires **TypeScript 5.0** or later. This in turn means that it will run on **Angular 16** or later. Our Angular package needs **Angular 19** or later.

For older versions of Angular, see "[Before Angular 16](#before-angular-16)".

## Using the package

Our [`@amcharts/amcharts5-angular`](https://www.npmjs.com/package/@amcharts/amcharts5-angular) package creates and disposes the chart with the element, works with server-side rendering, and keeps the chart's animations out of Angular's change detection. It needs Angular 19 or later.

```shell
npm install @amcharts/amcharts5 @amcharts/amcharts5-angular
```

### A chart written in code

The `[amChart]` directive gives your function a new root in the element. Build the chart in it as in any amCharts example:

```typescript
import { Component, input } from '@angular/core';
import { AmChartDirective } from '@amcharts/amcharts5-angular';
import type { Root } from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-chart',
  imports: [AmChartDirective],
  template: `<div [amChart]="buildChart" [amChartDeps]="[data()]" style="height: 500px"></div>`
})
export class Chart {
  data = input.required<Array<{ category: string, value: number }>>();

  // An arrow function, so that `this` is the component
  buildChart = (root: Root) => {
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(am5xy.XYChart.new(root, {}));

    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: 'category',
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      categoryXField: 'category',
      valueYField: 'value'
    }));

    xAxis.data.setAll(this.data());
    series.data.setAll(this.data());

    return series;
  };
}
```

| Input or output | What it is |
| --- | --- |
| `[amChart]` | The function that builds the chart in the root it gets. |
| `[amChartDeps]` | Values that make the chart again when one of them changes. Leave it out to make the chart once. |
| `[amChartRenderer]` | `"svg"` draws the chart as SVG; the default is canvas. |
| `(amChartReady)` | `{ root, result }` once the chart is built: `result` is what the function returned. To change the chart without making it again, keep what you need from it, e.g. `result.data.setAll(newData)`. |
| `(amChartError)` | The error, when the function threw. It goes to Angular's `ErrorHandler` too. |

### A chart from a JSON config

`AmChartComponent` is the library's [`<am5-chart>` element](https://www.amcharts.com/docs/v5/getting-started/integrations/am5-chart-element/) with inputs and outputs Angular can check. It builds a chart from a [JSON config](https://www.amcharts.com/docs/v5/concepts/serializing/), with no chart code:

```typescript
import { Component } from '@angular/core';
import { AmChartComponent } from '@amcharts/amcharts5-angular';
import type { IChartElementReadyEvent } from '@amcharts/amcharts5/element';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-dashboard',
  imports: [AmChartComponent],
  template: `<am5-chart [config]="config" [themes]="themes" (amChartReady)="onReady($event)" style="height: 500px"></am5-chart>`
})
export class Dashboard {
  config = { /* the chart's JSON config */ };
  themes = [am5themes_Animated];

  onReady({ root, chart }: IChartElementReadyEvent) {
    // the chart is built
  }
}
```

| Input or output | What it is |
| --- | --- |
| `[config]` | The chart as a JSON config: an object or a JSON string. A config with different content makes the chart again. |
| `[src]` | A URL to load the config from, used when there is no `config`. |
| `[themes]` | Theme classes, e.g. `[am5themes_Animated]`. Themes are not part of a config. |
| `[renderer]` | `"svg"` draws the chart as SVG; the default is canvas. |
| `(amChartReady)` | `{ root, chart }` once the chart is built. |
| `(amChartError)` | The error, when the chart could not be built. |

With a commercial license, call `am5.addLicense()` once in `main.ts`, before `bootstrapApplication()`.

An [example app](https://github.com/amcharts/amcharts5/tree/master/integrations/angular/examples/angular) with server-side rendering is on GitHub.

## Without the package

To manage the chart yourself, without the package:

First, create a new Angular project:

```shell
npx -p @angular/cli ng new my-project
cd my-project
```

You can now run your project by using this command:

```shell
npm start
```

If you load `http://localhost:4200/` in a browser, you should see your new project!

Now it's time to add in an amCharts 5 chart. First install amCharts 5:

```shell
npm install @amcharts/amcharts5
```

Then create a new chart component:

```shell
npx ng generate component chart
```

This creates `src/app/chart/chart.ts` and `src/app/chart/chart.html`. Before Angular 20, the files are `chart.component.ts` and `chart.component.html`, and the class is `ChartComponent`.

Put the chart's element in `src/app/chart/chart.html`. It needs a height:

```html
<div #chartdiv style="width: 100%; height: 500px"></div>
```

And use the following code in `src/app/chart/chart.ts`:

```typescript
import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.html'
})
export class Chart implements AfterViewInit, OnDestroy {
  @ViewChild('chartdiv') chartdiv!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private root?: am5.Root;

  ngAfterViewInit() {
    // In the browser only, not when the page is rendered on a server
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Outside Angular's zone, so that the chart's animations do not run
    // change detection
    this.zone.runOutsideAngular(() => {
      const root = am5.Root.new(this.chartdiv.nativeElement);

      root.setThemes([am5themes_Animated.new(root)]);

      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        })
      );

      // Define data
      const data = [
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
      ];

      // Create Y-axis
      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );

      // Create X-axis
      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          categoryField: "category"
        })
      );
      xAxis.data.setAll(data);

      // Create series
      const series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Value 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value1",
          categoryXField: "category"
        })
      );
      series1.data.setAll(data);

      const series2 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Value 2",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value2",
          categoryXField: "category"
        })
      );
      series2.data.setAll(data);

      // Add legend
      const legend = chart.children.push(am5.Legend.new(root, {}));
      legend.data.setAll(chart.series.values);

      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {}));

      this.root = root;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.root?.dispose();
  }
}
```

The chart code goes inside the `ngAfterViewInit` method, when the chart's element is there.

Lastly, add the component to your app: add `Chart` to the `imports` of the component in `src/app/app.ts`, and `<app-chart></app-chart>` to `src/app/app.html`.

Now you can run `npm start` again and you should see a chart.

## Working example

## Before Angular 16

If your app is using Angular version lower than 16, you will need to use script version of amCharts 5.

Instead of importing amCharts 5 modules, add them as `<script>` tags in `src/index.html`:

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
```

As well as declare amCharts globals that are created by scripts:

```typescript
declare const am5: any;
declare const am5xy: any;
declare const am5themes_Animated: any;
```
