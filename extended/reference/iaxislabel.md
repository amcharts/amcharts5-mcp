---
title: "IAxisLabel"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxislabel/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: Label
TypeScript: `am5xy.IAxisLabel` (`import type { IAxisLabel } from "@amcharts/amcharts5/xy"`)

## Properties

- **location** (`number`) — Where the label sits within its cell, from `0` (start) to `1` (end). A cell is a category, a date period, or the span of an axis range. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Location_of_axis_elements
- **multiLocation** (`number`) — Used instead of `location` when a grid step spans several units, such as 5 days, or when only every few categories get a label. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Multi_location
- **inside** (`boolean`) — Shows the label inside the plot area. If not set, the renderer's `inside` applies.
- **minPosition** (`number`) — default `0` — Hides the label when it is closer to the start of the visible part of the axis than this, from `0` to `1`: `0.1` hides labels in the first 10%.
- **maxPosition** (`number`) — default `1` — Hides the label when it is closer to the end of the visible part of the axis than this, from `0` to `1`: `0.9` hides labels in the last 10%.
- **_tickPoints** (`IPoint[]`)

## Other inherited properties

Names only — see the declaring interface's page (e.g. `get_api_reference("Label")`) for types, defaults and descriptions.

- _Label_: _afterNew, _events, _getTextKeyValue, _makeText, _maybeUpdateHTMLColor, _privateSettings, _setDataItem, _setMaxDimentions, _settings, _text, _textKeys, _updateChildren, getAccessibleText, getText, text
- _Container_: _afterChanged, _applyState, _applyStateAnimated, _applyThemes, _beforeChanged, _changed, _childrenDisplay, _childrenPrep, _childrenUpdt, _contentHeight, _contentMask, _contentWidth, _display, _dispose, _getBounds, _hsbd0, _hsbd1, _percentagePositionChildren, _percentageSizeChildren, _prepareChildren, _prevHeight, _prevWidth, _processTemplateField, _setDefaultTagged, _updateBounds, _updateHTMLContent, _updateSize, _vsbd0, _vsbd1, allChildren, children, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, markDirty, scrollToChild, updateBackground, walkChildren
- _Entity_: _addUserThemeTags, _afterNewApplyThemes, _animationsApplied, _animationTime, _applyDeclaredAnimations, _applyStateByKey, _applyTemplate, _applyTemplates, _builtIn, _declaredAnimations, _declaredTimers, _defaultThemes, _dirty, _dirtyPrivate, _disposeProperty, _disposerProperties, _disposers, _disposeTemplates, _eachTemplate, _findTemplate, _findTemplateByKey, _findTemplateByPrivateKey, _getUserThemeTags, _internalTemplates, _markC, _playDeclaredAnimations, _pushPropertyDisposer, _registerId, _removeTemplatePrivateProperty, _removeTemplateProperty, _removeTemplates, _root, _runSetup, _setC, _setCAll, _setCRaw, _setDefault, _setDefaultFn, _setDefaults, _setRawDefault, _setSoft, _setTemplatePrivateProperty, _setTemplateProperty, _startAnimation, _stopDeclaredAnimations, _t, _template, _templateDisposers, _templates, _user_id, _userPrivateProperties, _userThemeTags, adapters, addDisposer, addTag, className, classNames, get, hasTag, isComputedSetting, isDirty, isPrivateDirty, isType, isUserSetting, remove, removeDispose, removePrivate, removeTag, root, set, setPrivate, setPrivateRaw, setRaw, setTimeout, states, template
- _Settings_: _animatingPrivateSettings, _animatingSettings, _animationBases, _animationWriting, _checkDirty, _computedProperties, _debouncedPrivateSettingEvents, _debouncedSettingEvents, _disposed, _offDebouncedHelper, _onDebouncedHelper, _prevPrivateSettings, _prevSettings, _privateSettingEvents, _runAnimation, _sendKeyEvent, _sendPrivateKeyEvent, _set, _setAnimated, _setPrivate, _setPrivateRaw, _setRaw, _settingEvents, _stopAnimation, _stopAnimationPrivate, _userProperties, animate, animatePrivate, dispose, enableDispose, getPrivate, getRaw, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, once, onceDebounced, onDebounced, onPrivate, onPrivateDebounced, removeAll, resetUserSettings, setAll, uid
- _Sprite_: _addPercentagePositionChildren, _addPercentageSizeChildren, _adjustedLocalBounds, _appearApplied, _appeared, _appearPending, _applyAutoAppear, _autoAppearReady, _clearDirty, _createEvents, _dataItem, _downPoint, _downPoints, _dragDp, _dragEvent, _dragPoint, _findStaticTemplate, _fixMinBounds, _focusBounds, _focusDp, _getDownPoint, _getDownPointId, _getTooltipPoint, _handleDown, _handleOut, _handleOver, _handleStates, _handleUp, _hasDown, _hasMoved, _hoverDp, _isDown, _isDragging, _isHidden, _isHiding, _isShowing, _localBounds, _markDirtyKey, _markDirtyPrivateKey, _onHide, _onShow, _parent, _removeParent, _removeTemplateField, _replayDeclaredAnimations, _setParent, _sizeDirty, _templateField, _toggleDp, _toGlobalBounds, _tooltipDp, _tooltipMoveDp, _tooltipPointerDp, _updatePosition, _virtualParent, _walkParent, _walkParents, adjustedLocalBounds, appear, bounds, compositeOpacity, compositeRotation, compositeScale, dataItem, depth, dragMove, dragStart, dragStop, events, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, globalBounds, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, localBounds, markDirtyAccessibility, markDirtyBounds, markDirtyKey, markDirtyLayer, markDirtyPosition, markDirtySize, maxHeight, maxWidth, parent, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, updatePivotPoint, virtualParent, width, x, y
