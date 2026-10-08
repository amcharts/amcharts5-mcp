---
title: "EventListener"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/eventlistener/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A universal interface for event listeners.

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **killed** (`boolean`)
- **once** (`boolean`)
- **type** (`any`)
- **callback** (`(event: any) => void`)
- **context** (`unknown`)
- **shouldClone** (`boolean`)
- **dispatch** (`(type: any, event: any) => void`)
- **disposer** (`IDisposer`)
- **_debounceDelay** (`number`)
- **_debounceTimeout** (`number`)
