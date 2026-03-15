---
title: "IResponsiveRule"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iresponsiverule/"
scraped: "2026-03-15"
---

An interface describing resonsive rule.

## Properties

- **applied** (`undefined | false | true`) — Indicates if rule is currently applied. @readonly
- **applying** (`undefined | () => void`) — A custom callback function which is called when applying the rule.
- **name** (`undefined | string`) — A class name of the elements to apply rule to.
- **relevant** (`( width: number, height: number) => boolean`) — A callback function which should check and return true if rule is applicable for current situation.
- **removing** (`undefined | () => void`) — A custom callback function which is called when removing the rule.
- **settings** (`any`) — Settings to apply when activating the responsive rule.
- **tags** (`string | string[]`) — A class group of the elements to apply rule to.

