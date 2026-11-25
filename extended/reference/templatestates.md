---
title: "TemplateStates"
type: "class"
source: "https://docs.amcharts.com/v5/reference/templatestates/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

The states of a `Template`, by name.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Methods

- `create(name: string, settings: Partial<E["_settings"]>): TemplateState<E>` — Creates the state called `name` with `settings`, or adds `settings` to it if it already exists. Parameters: `name`: State name; `settings`: Settings. Returns: State
- `lookup(name: string): TemplateState<E> | undefined` — Returns the state called `name`, or `undefined` if there is none. Parameters: `name`: State name. Returns: State
- `remove(name: string): void` — Removes the state called `name`. Parameters: `name`: State name.
