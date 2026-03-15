---
title: "Getting the most out of net.load utility"
source: "https://www.amcharts.com/docs/v5/concepts/data/net-load-utility/"
scraped: "2026-03-15"
---

This tutorial walks through advanced uses of the `net.load` utility, which is used to load data in external URLs.

## Prerequisites

We're assuming that you are familiar with what `net.load` utility is, what is it used for, and how. For basic usage refer to the "[External data](https://www.amcharts.com/docs/v5/concepts/data/#External_data)" section in "Data" tutorial.

## Specifying data user

`net.load` utility is completely standalone, but we can pass in its intended data user via second parameter.

Doing so will not modify it, or set data on it, but will rather contain reference to it in all success/error handlers, so we can use generic load handler functions. E.g.:

function dataLoaded(result) {
  // Set data on all series of the chart
  const data = am5.JSONParser.parse(result.response);
  result.target.series.each(function(series) {
    series.data.setAll(data);
  });
}

am5.net.load("/data/mydata.json", chart).then(dataLoaded);

function dataLoaded(result) {
  // Set data on all series of the chart
  var data = am5.JSONParser.parse(result.response);
  result.target.series.each(function(series) {
    series.data.setAll(data);
  });
}

am5.net.load("/data/mydata.json", chart).then(dataLoaded);

## HTTP request options

It's possible to pass in options to the HTTP request via third parameter to the `net.load()` function.

Supported properties are as follows:

Option

Comment

`requestHeaders`

An array of objects that define key and value of additional information to pass as a HTTP(S) request headers.

`responseType`

A response type expected from the server. ([more info](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType))

`withCredentials`

Whether to pass in web authentication credentials with the request. ([more info](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials))

function dataLoaded(result) {
  // Set data on all series of the chart
  const data = am5.JSONParser.parse(result.response);
  result.target.series.each(function(series) {
    series.data.setAll(data);
  });
}

am5.net.load("/data/mydata.json", chart, {
  requestHeaders: \[{
    key: "x-user-token",
    value: "123456789"
  }\]
}).then(dataLoaded);

function dataLoaded(result) {
  // Set data on all series of the chart
  var data = am5.JSONParser.parse(result.response);
  result.target.series.each(function(series) {
    series.data.setAll(data);
  });
}

am5.net.load("/data/mydata.json", chart, {
  requestHeaders: \[{
    key: "x-user-token",
    value: "123456789"
  }\]
}).then(dataLoaded);

## Result object

The result object passed in to load handler function contains much more than the `response`:

Field

Comment

`xhr`

The original `XMLHttpRequest` object used to make HTTP(S) request. ([more info](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest))

`response`

A string response loaded from the web server.

`blob`

Response `Blob` if `responseType` in request options was set to `"blob"`.

`type`

A response type. ([more info](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType))

`error`

`false` if loaded successfully; `true` if error occurred when loading.

`target`

A target data user object if it was specified. ([more info](https://www.amcharts.com/docs/v5/tutorials/advanced-use-of-net-load-utility/#Specifying_data_user))
