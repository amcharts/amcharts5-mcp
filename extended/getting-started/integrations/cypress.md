---
title: "Testing amCharts 5 with Cypress"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/cypress/"
scraped: "2026-03-15"
---

This tutorial looks at how we can use a robust [Cypress testing framework](https://www.cypress.io/) for end-to-end testing of amCharts components.

## Accessing amCharts objects

amCharts 5 maintains a global variable `am5` which in turn has a property `registry`.

In Cypress we can access it via `cy.window()` call, then use `am5.registry.rootElements` to access actual `Root` elements created on the page.

The following code will grab the first Root and its child chart of the page:

describe("Check Legend", () => {
  it("passes", () => {
    cy.visit("https://my-test-url/");

    // Wait for window
    cy.window().then((win) => {

      // Grab first chart
      const root = win.am5.registry.rootElements\[0\];
      const chart = root.container.children.getIndex(0);

      // ...
  });
});

## Throwing errors

We can use standard `throw` syntax to trigger errors of our custom tests.

Cypress will fail the test on encountering an exception.

describe("Check Legend", () => {
  it("passes", () => {
    cy.visit("https://my-test-url/");

    // Wait for window
    cy.window().then((win) => {

      // Grab first chart
      const root = win.am5.registry.rootElements\[0\];
      const chart = root.container.children.getIndex(0);

      // Check the type
      if (chart.className != "XYChart") {
        throw new Error("Wrong chart type");
      }
  });
});

## Testing DOM elements

amCharts 5 is rendered using Canvas, and thus does not have DOM elements for each of its internal objects.

That being said, some of the elements in amCharts 5 are focusable by default, or can be made so by setting `focusable: true`.

For example, all buttons and legend items are focusable by default.

Focusable elements have actual DOM elements created under main chart container `<div>` and can be queried using Cypress, or more precisely in a sub-div with a class name of `"am5-focus-container"`.

As an example, the following Cypress query will select the first legend item focus element of a chart contained in a div with `"chartdiv"` id.

cy.get("#chartdiv .am5-focus-container div\[role=checkbox\]:first")

## Full code

We can combine object and DOM tests.

The following Cypress test will:

-   Go to a demo page on amCharts website.
-   Select the first available chart.
-   Focus its first legend item.
-   Simulate pressing SPACE to toggle related series on.
-   Verify that the target series is indeed hidden via API.
-   Then toggle it back on by another simulated SPACE press.

describe("Check Legend", () => {
  it("passes", () => {
    cy.viewport(1200, 1000);
    cy.visit("https://www.amcharts.com/demos/100-stacked-column-chart/");
    cy.wait(1000);

    // Wait for window
    cy.window().then((win) => {

      // Grab first chart
      const root = win.am5.registry.rootElements\[0\];
      const chart = root.container.children.getIndex(0);
      const series = chart.series.getIndex(0);

      // Select first legend item focus
      cy.get(root.dom).get(".am5-focus-container div\[role=checkbox\]:first").focus();
      cy.wait(1000);

      // Toggle legend item off
      cy.get("body").type(" ");
      
      // Wait and check if series is actually hidden
      cy.wait(1000).then(() => {
        if (!series.isHidden()) {
          throw new Error("Series was not hidden");
        }
      });

      // Toggle series back on
      cy.get("body").type(" ");

      // Wait and check if series is unhidden
      cy.wait(1000).then(() => {
        if (series.isHidden()) {
          throw new Error("Series was not unhidden");
        }
      });
    })
  })
})
