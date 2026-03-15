---
title: "Using amCharts 5 with Vue.js"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/vue/"
scraped: "2026-03-15"
---

This tutorial contains some guidelines for usage of amCharts in a [Vue.js](https://vuejs.org/) project.

## Setting up

We will use [Vue CLI](https://cli.vuejs.org/) to scaffold the starter Vue app like this:

npx @vue/cli create my-chart-project

We will choose the "default" preset (babel, eslint) for the most common scenario.

Let’s make sure that everything got created as expected. Switch to our project directory:

cd my-chart-project

And run the dev server:

npm run serve

You should see a standard Vue.js starter page when you navigate to `http://localhost:8080`.

Now open the HelloWorld component (/src/components/HelloWorld.vue) in your code editor of choice and remove everything inside the root DIV in the template, unnecessary CSS declarations and code. And add CSS to set the size of our main DIV and a REF that we will use later to tell amCharts where to render the chart.

Your component should look something like this:

<template>
  <div class="hello" ref="chartdiv">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>

## Adding charts

Now let’s add amCharts.

Install amCharts 5 from `npm`:

npm install @amcharts/amcharts5

Import amCharts libraries in the script portion of your component:

import \* as am5 from '@amcharts/amcharts5';
import \* as am5xy from '@amcharts/amcharts5/xy';
import am5themes\_Animated from '@amcharts/amcharts5/themes/Animated';

Add the `mounted()` method to your component:

export default {
  name: 'HelloWorld',
  mounted() {
    // we will create the chart here
  }
}

And implement chart creation code in it so you whole component looks like this:

<template>
  <div class="hello" ref="chartdiv">
  </div>
</template>

<script>
import \* as am5 from '@amcharts/amcharts5';
import \* as am5xy from '@amcharts/amcharts5/xy';
import am5themes\_Animated from '@amcharts/amcharts5/themes/Animated';


export default {
  name: 'HelloWorld',
  mounted() {
    let root = am5.Root.new(this.$refs.chartdiv);

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
      },
 {
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

    this.root = root;
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>

You're all set!

## Important note

Don't put amCharts objects inside of the component's `data`, it will cause errors. Instead, just use a regular property (like in the above example).

For the same reason, you cannot use `[ref](https://v3.vuejs.org/api/refs-api.html#ref)` with amCharts objects. Instead, you must use `[shallowRef](https://v3.vuejs.org/api/refs-api.html#shallowref)`.

You can still use `data` and props, but you will need to use lifecycle hooks in order to update amCharts when they change:

export default {
  data() {
    return {
      foo: 5,
    };
  },

  props: {
    bar: Number,
  },

  watch: {
    foo(newValue, oldValue) {
      if (this.root) {
        // Update chart based on foo data
        ...
      }
    }
  },

  updated() {
    if (this.root) {
      // Update chart based on props
      ...
    }
  },

  ...
}
