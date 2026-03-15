---
title: "Using amCharts 5 with Ember.js"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/ember-js/"
scraped: "2026-03-15"
---

This tutorial will show you every step you need to use amCharts 5 with [Ember.js](https://emberjs.com/).

## Installation

​First, create a new Ember project:

npx -p ember-cli@latest ember new my-project --lang en
cd my-project

​You can now run your project by using this command:

npm start

​If you open up the URL `http://localhost:4200/` you should see a working app.

​Now it's time to add in an amCharts 5 chart. Use this command to install amCharts 5:

npm install --save-dev @ember/render-modifiers @amcharts/amcharts5

​Create a new `app/components/chart.hbs` file:

<div
    {{did-insert this.create}}
    {{will-destroy this.cleanup}}
    style="width: 100%; height: 500px">
</div>

​Also create a new `app/components/chart.js` file:

import Component from "@glimmer/component";
import { action } from "@ember/object";
​
import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";
import am5themes\_Animated from "@amcharts/amcharts5/themes/Animated";
​
export default class ChartComponent extends Component {
    @action
    create(element) {
        const root = am5.Root.new(element);
​
        root.setThemes(\[
            am5themes\_Animated.new(root)
        \]);
​
        root.dateFormatter.setAll({
            dateFields: \["valueX"\]
        });
​
        const chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX"
        }));
​
        const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "zoomX"
        }));
        cursor.lineY.set("visible", false);
​
        const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0.5,
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {
                pan:"zoom"
            }),
            tooltip: am5.Tooltip.new(root, {})
        }));
​
        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation:1,
            renderer: am5xy.AxisRendererY.new(root, {
                pan:"zoom"
            })
        }));
​
        const series = chart.series.push(am5xy.LineSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueX}: {valueY}"
            })
        }));
​
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));
​
        const data = \[
            {
                "date": 1686034800000,
                "value": 103
            },
            {
                "date": 1686121200000,
                "value": 99
            },
            {
                "date": 1686207600000,
                "value": 97
            },
            {
                "date": 1686294000000,
                "value": 101
            },
            {
                "date": 1686380400000,
                "value": 104
            },
            {
                "date": 1686466800000,
                "value": 106
            },
            {
                "date": 1686553200000,
                "value": 109
            },
            {
                "date": 1686639600000,
                "value": 114
            },
            {
                "date": 1686726000000,
                "value": 117
            },
            {
                "date": 1686812400000,
                "value": 113
            }
        \];
        series.data.setAll(data);
​
        series.appear(1000);
        chart.appear(1000, 100);
​
        this.series = series;
        this.root = root;
    }
​
    @action
    cleanup() {
        if (this.root) {
            this.root.dispose();
        }
    }
}

​  
Lastly, change the `app/templates/application.hbs` file and add the `<Chart />` component:

{{page-title "MyProject"}}
​
<Chart />
​
{{outlet}}

​Now if you run `npm start` you should see a working chart.​

# Updating the chart

​If you want to update the chart when an attribute changes, you can use the `did-update` modifier.

For this example, let's update the chart data whenever the `data` attribute changes.

​First, let's change the chart code so that it uses the data from the attributes:

series.data.setAll(this.args.data);

​Next, add in a new `@action` to the `ChartComponent` which will update the data:

@action
updateData() {
    if (this.series) {
        this.series.data.setAll(this.args.data);
    }
}

​Lastly, add the `did-update` modifier into your `app/components/chart.hbs` file:​

<div
    {{did-insert this.create}}
    {{will-destroy this.cleanup}}
    {{did-update this.updateData @data}}
    style="width: 100%; height: 500px">
</div>

​Now you can pass in data to the `<Chart />` component:​

<Chart @data={{this.data}} />

​If you want to update the chart when multiple different attributes change, you can use the `did-update` modifier multiple times:​

<div
    {{did-insert this.create}}
    {{will-destroy this.cleanup}}
    {{did-update this.updateData @data}}
    {{did-update this.updateSize @size}}
    {{did-update this.updateZoom @zoom}}
    style="width: 100%; height: 500px">
</div>
