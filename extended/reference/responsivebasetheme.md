---
title: "ResponsiveBaseTheme"
type: "class"
source: "https://docs.amcharts.com/v5/reference/responsivebasetheme/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

What the responsive themes share: the breakpoints, the functions that test them, and the rules that apply while the chart's size meets a condition.

Docs: https://docs.amcharts.com/v5/concepts/responsive/

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: Theme
Extended by: ResponsiveMaxTheme, ResponsiveTheme

## Properties

Public properties (not settings):

- **responsiveRules** (`IResponsiveRule[]`) — Rules added to the theme.

## Methods

- `addRule(rule: IResponsiveRule): IResponsiveRule` — Adds a responsive rule and returns it. It applies at once if it is relevant. Parameters: `rule`: Responsive rule. Returns: Responsive rule Docs: https://docs.amcharts.com/v5/concepts/responsive/
- `dispose(): void`
- `removeRule(rule: IResponsiveRule): void` — Removes a responsive rule from the theme. Parameters: `rule`: Responsive rule.

## Static methods

- `ResponsiveBaseTheme.newEmpty<T extends typeof ResponsiveBaseTheme>(this: T, root: Root): InstanceType<T>` — Creates the theme without its built-in rules, for rules of your own.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Theme")`) for signatures and descriptions.

- _Theme_: rule, ruleRaw
