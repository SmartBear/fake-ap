# Fake AP
A fake AP module to help develop and test Atlassian Connect applications

[![version][version-badge]][package]
[![license][license-badge]][license]

## Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Introduction

Atlassian Connect apps often use the [Atlassian Connect JavaScript API](https://developer.atlassian.com/cloud/jira/software/about-the-javascript-api/), also called **AP**, to overcome the limitations due to the app existing in an iframe from an Atlassian page.

AP is typically included by calling the following script:
```html
<script src="https://connect-cdn.atl-paas.net/all.js"></script>
```

However this script only work when in an ifram from an Atlassian page. It means that when developing or testing, it is not possible to directly call the page if it is using AP.

This package provides a way to make a fake AP that can be used instead of the real one. It is still in development but includes the most commonly used features of AP, including:
- Generating JWT tokens
- Dialogs
- Events
- Flags
- History
- Request
- User locale

## Installation

Using npm:
```
npm install --save @smartbear/fake-ap
```

Using yarn:
```
yarn add @smartbear/fake-ap
```

## Usage

### Create a fake AP

Simply create a Fake AP instance an make it available globally:

```javascript
import FakeAP from '@smartbear/fake-ap'

window.AP = new FakeAP()
```

### Use the fake AP

The fake AP creation should be done in a script included instead of the real one.
For instance, in for the project fake AP was originally created for, the script is available as a pack which is included when a flag is set.
Here is an example using Rails and Webpacker:

```html
<% if ENV['USE_FAKE_AP'] %>
  <%= javascript_pack_tag 'fake_ap' %>
<% else %>
  <script src="https://connect-cdn.atl-paas.net/all.js"></script>
<% end %>
```

## Configuration

While most features work with no configuration, some methods require configuration to tell our fake AP which values to deal with.
Configuration can be done when creating the fake AP, or at any time later using the special `AP.configure` method:

```javascript
const AP = new FakeAP({
  locale: 'en_US'
})

AP.configure({
  locale: 'fr_FR'
})
```

**Note:** when using `AP.configure`, all previous configuration is kept, only conflicting configuration is replaced. All new configuration is added.

### `AP.context.getToken`

To use `AP.context.getToken`, which creates a valid JWT token as Atlassian would do, it is required to provide the tenant client key and shared secret, as well as a user ID:

```javascript
AP.configure({
  clientKey: 'key',
  sharedSecret: 'secret',
  userId: 'user'
})
```

### `AP.dialog`

To use dialogs (`AP.context.create`), you need to provide the dialog keys and URLs as they are describe in the descriptor:

```javascript
AP.configure({
  dialogUrls: {
    'custom-dialog': 'https://localhost:3000/dialog'
  }
})

AP.dialog.create({
  key: 'custom-dialog'
})
```

### `AP.user.getLocale`

You can specify the user locale (defaults to `en_US`):

```javascript
AP.configure({
  locale: 'fr_FR'
})
```

### `AP.request`

`AP.request` is the most complex to implement. Because of same-origin policy, it is not possible to implement a native request method using a shared secret configuration. Since several solutions are possible to work around this limitation, **adapters** have been designed to provide a request method.

#### Default adapter

If you do not specify any adapter, the default behavior when using `AP.request` is to do nothing.
It will just call the `notImplementedAction` method if provided:

```javascript
AP.configure({
  notImplementedAction: console.log
})

// This will call console.log('AP.request', 'path', { method: 'POST' })
AP.request('path', { method: 'POST' })
```

#### Backend adapter

The backend adapter is a way to make actual requests to the Jira API using your own backend. It requires some work from the backend though:
- Implement a Jira client to interact with the Jira API
- Provide an API endpoint for the fake AP to call

This API endpoint should not require any authentication method, as the adapter does not provide any. **For obvious reasons, ensure that this API endpoint is never available on production.**

Backend adapter should be configured like this:

```javascript
import FakeAP, { BackendRequestAdapter } from '@smartbear/fake-ap'

const backendRequestAdapter = new BackendRequestAdapter('/path/to/fake_ap/api')

const AP = new FakeAP({
  requestAdapter: backendRequestAdapter
})
```

Then a POST request to the backend API will be made using the `AP.request` options.
For instance, consider following request:

```javascript
AP.request(
  '/rest/api/3/search',
  {
    data: { some: 'data' }
  }
)
```

This will make a POST request to your backend with a request body containing:
- `method = GET`
- `path = '/rest/api/3/search'`
- `data = { some: 'data' }`

To make this adapter as generic as possible, there is no additional information sent to the backend. If you need to know which tenant is this request for, you need to specify it with the configuration URL. For instance:

```javascript
AP.configure({
  requestAdapter: new BackendRequestAdapter('/path/to/fake_ap/api/tenants/2')
})
```

#### Custom adapters

It is possible to create a custom adapter by extending from the default adapter:
```javascript
import { RequestAdapter } from '@smartbear/fake-ap'

class CustomAdapter extends RequestAdapter {
  async request() {
    return {
      body: '{}'
    }
  }
}
```

Here are the specifications for a custom adapter:
- Extend from `RequestAdapter`
- Implement a `request` method that is async (or returns a promise)
- If the request is a success, `request` should return an object with a `body` property that contained the JSON response as a string
- If the request is a failure, `request` should throw the response body with a specific object:
  ```javascript
  // Assuming the response body was '{}' and status was 400
  {
    err: '{}',
    xhr: {
      responseText: '{}',
      status: 400,
      statusText: 'Bad Request'
    }
  }
  ```

### Not implemented methods

It is possible to configure the behavior of AP methods that are not implemented in fake AP:

```javascript
AP.configure({
  notImplementedAction: console.log
})
```

When called, any method that is not implemented will call the `notImplementedAction` method with the method name and all the arguments.
Using the above configuration, calling `AP.context.getContext('a', 'b')` will call `console.log('AP.context.getContext', 'a', 'b')`.
It is possible to have more advanced behaviors:

```javascript
// This will forward all arguments to console.log, but will silence AP.resize calls
AP.configure({
  notImplementedAction: (method, ...args) => {
    if (method !== 'AP.resize') {
      console.log(method, ...args)
    }
  }
})
```

### Missing configuration

When a method requires some configuration that is not provided (for instance `AP.context.getToken`), Fake AP will throw an error by default. It is possible to change this behavior:

```javascript
AP.configure({
  clientKey: 'key',
  userId: 'user',
  missingConfigurationAction: console.log
})

// This will call console.log('AP.context.getToken', 'sharedSecret', callback)
const callback = () => {}
await AP.context.getToken(callback)
```

### Disabling dialogs and flags

To make dialogs and flags work, Fake AP will create and mount React components in the document body. If you do not want this to happen (to keep your DOM clean during unit tests for instance), you can disable dialogs and flags:

```javascript
const AP = new FakeAP({
  mountDialogs: false,
  mountFlags: false
})
```

No error will be raised, but nothing will happen since the components will not exist.

**Note: this can only be configured when creating the Fake AP. `AP.configure` will have no effect here since the components are already mounted.**


[version-badge]: https://img.shields.io/npm/v/@smartbear/fake-ap.svg
[package]: https://www.npmjs.com/package/@smartbear/fake-ap
[license-badge]: https://img.shields.io/npm/l/@smartbear/fake-ap.svg
[license]: https://github.com/SmartBear/fake-ap/blob/master/LICENSE
