---
title: "Using amCharts 5 with Jest"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/jest/"
scraped: "2026-03-15"
---

This tutorial will show you how to create unit tests for [Jest](https://jestjs.io/).

Jest does not support ES6 modules by default, but you can still use ES6 modules if you use Babel.

# Installation

You must install the following packages in your `package.json`:

"dependencies": {
  "@amcharts/amcharts5": "^5.2.17"
},
"devDependencies": {
  "@babel/core": "^7.18.10",
  "@babel/preset-env": "^7.18.10",
  "@babel/preset-typescript": "^7.18.6",
  "babel-jest": "^28.1.3",
  "jest-environment-jsdom": "^28.1.3",
  "jest": "^28.1.3",
  "canvas": "^2.9.3"
}

And you must add this `"jest"` configuration to your `package.json`:

"jest": {
  "testEnvironment": "jsdom",
  "transformIgnorePatterns": \[
    "/node\_modules/(?!@amcharts|d3-|internmap)"
  \]
}

Now you must do `npm install` or `yarn install`.

Lastly create a `babel.config.js` file:

module.exports = {
  presets: \[
    \['@babel/preset-env', {targets: {node: 'current'}}\],
    '@babel/preset-typescript',
  \],
};

# Writing tests

Now that you have everything setup, you can write your unit tests.

Let's say that your chart code is in a `chart.js` file:

import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";

export function makeChart() {
  const root = am5.Root.new("chartdiv");

  const chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX"
  }));

  // Rest of chart code...

  return { root, chart };
}

You can write your unit tests in a `chart.test.js` file, like this:

// Import chart code
import { makeChart } from "./chart";

beforeEach(() => {
  // Create <div> which is needed by the chart
  document.body.innerHTML = \`<div id="chartdiv"></div>\`;
});

test("chart exists", () => {
  const { root, chart } = makeChart();

  // Test chart
  expect(root).toBeDefined();
  expect(chart).toBeDefined();
  expect(chart.get("wheelX")).toBe("panX");
});

## Example

[Open in StackBlitz](https://stackblitz.com/edit/node-mm8hqa?file=src%2FApp.js).
