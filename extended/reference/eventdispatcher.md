---
title: "EventDispatcher"
type: "class"
source: "https://docs.amcharts.com/v5/reference/eventdispatcher/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Universal Event Dispatcher.

Docs: https://docs.amcharts.com/v5/concepts/events/

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)
Extended by: SpriteEventDispatcher, TargetedEventDispatcher

## Methods

- `disable(): void` — Disable dispatching of events until re-enabled by `enable()`.
- `disableType<Key extends keyof T>(type: Key, amount?: number): void` — Stops dispatching events of `type`, until `enableType()` is called or, if `amount` is set, for that many dispatches. Parameters: `type`: Event type; `amount`: Number of event dispatches to skip.
- `dispatch<Key extends keyof T>(type: Key, event: T[Key]): void` — Calls the listeners of `type` right away; debounced listeners are called after their delay. `event` must include `type` and `target`. Parameters: `type`: Event type; `event`: Event object.
- `dispose(): void` — Disposes the dispatcher and all its listeners.
- `enable(): void` — Enable dispatching of events if they were previously disabled by `disable()`.
- `enableType<Key extends keyof T>(type: Key): void` — Enable dispatching particular event, if it was disabled before by `disableType()`. Parameters: `type`: Event type.
- `has<C, Key extends keyof T>(type: Key, callback?: (this: C, event: T[Key]) => void, context?: C): boolean` — Checks if there's already a listener with specific parameters. Listeners added with `once()` are not counted. Parameters: `type`: Listener's type; `callback`: Callback function; `context`: Callback context. Returns: Has listener?
- `hasListeners(): boolean` — Checks if the dispatcher has any listeners. Returns: Has listeners?
- `hasListenersByType<Key extends keyof T>(type: Key): boolean` — Checks if the dispatcher has listeners for `type`, counting the ones added with `onAll()`. Parameters: `type`: Event type. Returns: Has particular event listeners?
- `isDisposed(): boolean` — Returns `true` if the dispatcher has been disposed. Returns: Disposed?
- `isEnabled<Key extends keyof T>(type: Key): boolean` — Checks if an event of `type` would reach a listener: events are enabled, the type is not disabled, and it has listeners. Parameters: `type`: Event type. Returns: Enabled?
- `off<C, Key extends keyof T>(type: Key, callback?: (this: C, event: T[Key]) => void, context?: C): void` — Removes listeners added with `on()` or `onDebounced()` that match `type`, `callback` and `context`. Without `callback`, removes all of them for `type` and `context`. Listeners added with `once()` are not removed. Parameters: `type`: Listener's type; `callback`: Callback function; `context`: Callback context, the same as passed to `on()`.
- `on<C, Key extends keyof T>(type: Key, callback: (this: C | undefined, event: T[Key]) => void, context?: C, shouldClone?: boolean): IDisposer` — Creates an event listener to be invoked on a specific event type. The above logs every click on the button. To remove the listener, call `dispose()` on the returned object, or use `off()`. Parameters: `type`: Listener's type; `callback`: Callback function; `context`: Value of `this` inside `callback`; `shouldClone`: Whether the listener should be copied when the EventDispatcher is copied. Returns: A disposable event listener
- `onAll<C, K extends keyof T>(callback: (this: C, event: T[K]) => void, context?: C, shouldClone?: boolean): IDisposer` — Creates an event listener to be invoked on **any** event. Parameters: `callback`: Callback function; `context`: Value of `this` inside `callback`; `shouldClone`: Whether the listener should be copied when the EventDispatcher is copied. Returns: A disposable event listener
- `onDebounced<C, Key extends keyof T>(type: Key, callback: (this: C | undefined, event: T[Key]) => void, debounceDelay: number, context?: C, shouldClone?: boolean): IDisposer` — Creates a debounced event listener to be invoked on a specific event type. The above logs once, 500 ms after the last of a series of clicks. Each new event restarts the delay, and `callback` gets the last one. Parameters: `type`: Listener's type; `callback`: Callback function; `debounceDelay`: Debounce delay in milliseconds; `context`: Value of `this` inside `callback`; `shouldClone`: Whether the listener should be copied when the EventDispatcher is copied. Returns: A disposable event listener _Since 5.14.0._ Docs: https://docs.amcharts.com/v5/concepts/events/#debounced-events
- `once<C, Key extends keyof T>(type: Key, callback: (this: C | undefined, event: T[Key]) => void, context?: C, shouldClone?: boolean): IDisposer` — Creates an event listener that is invoked only the first time the event happens, and is then disposed. The above logs the first click on the button only. `off()` does not remove such a listener: call `dispose()` on the returned object instead. Parameters: `type`: Listener's type; `callback`: Callback function; `context`: Value of `this` inside `callback`; `shouldClone`: Whether the listener should be copied when the EventDispatcher is copied. Returns: A disposable event listener
- `removeType<Key extends keyof T>(type: Key): void` — Removes all listeners of a particular event type. Parameters: `type`: Listener's type.
