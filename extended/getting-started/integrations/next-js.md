---
title: "Using amCharts 5 with Next.js"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/next-js/"
scraped: "2026-03-15"
---

Next.js is a React framework, so the code in [our React tutorial](https://www.amcharts.com/docs/v5/getting-started/integrations/react/) will work.

However, Next.js also uses SSR, which does not work with amCharts. In order to use amCharts with Next.js, [you must add `"use client";`](https://nextjs.org/docs/app/building-your-application/rendering/client-components) at the top of your `Chart.jsx` file:

"use client";

import { useLayoutEffect } from 'react';
import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";
import am5themes\_Animated from "@amcharts/amcharts5/themes/Animated";

function Chart(props) {
  ...
}
export default Chart;

## Older versions of NextJS

Older versions of NextJS do not have `"use client"`, so instead [you must use `dynamic`](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr) to load the Chart component:

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./Chart'), { ssr: false });

function App() {
  return <Chart />;
}
