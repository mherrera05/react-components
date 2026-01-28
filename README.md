# React Components
[![Build Status](https://drone.softlutions.cl/api/badges/mherrera05/react-components/status.svg?ref=refs/heads/main)](https://drone.softlutions.cl/mherrera05/react-components)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/2252317c6e634959bb62df9a22f40fb6)](https://app.codacy.com/gh/mherrera05/react-components/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/2252317c6e634959bb62df9a22f40fb6)](https://app.codacy.com/gh/mherrera05/react-components/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Components](#components)
  - [Copyable](#1-copyable)
    - [Copyable Properties](#copyable-properties)
    - [Copyable Usage](#copyable-usage)
  - [GoogleAuthButton](#2-googleauthbutton)
    - [GoogleAuthButton Properties](#googleauthbutton-properties)
    - [GoogleAuthButton Usage](#googleauthbutton-usage)
  - [Rolling Counter](#3-rolling-counter)
    - [Rolling Counter Properties](#rolling-counter-properties)
    - [Rolling Counter Usage](#rolling-counter-usage)
  - [Server Status](#4-server-status)
    - [Server Status Properties](#server-status-properties)
    - [Server Status Usage](#server-status-usage)
    - [Server Status Dependencies](#server-status-dependencies)

## Overview

A collection of reusable React components for building modern user interfaces.

## Installation

```bash
npm install --save @mherrera/react-components
```

## Components

### 1. Copyable

#### Copyable Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `text` | `string` | The text to be displayed and copied to clipboard | - |
| `copyIcon` | `string \| null` | CSS class for the copy icon (e.g., `fas fa-copy` for FontAwesome, `bi bi-clipboard` for Bootstrap) | `null` |
| `checkIcon` | `string \| null` | CSS class for the check icon shown after copying (e.g., `fas fa-check` for FontAwesome, `bi bi-check` for Bootstrap) | `null` |
| `copiedText` | `string \| null` | Text to display when the text has been copied | `'Copied!'` |
| `fadeOutTime` | `number` | Time in milliseconds before the "copied" indicator fades out | `2000` |

#### Copyable Usage

```jsx
import { Copyable } from './components';

export default function App() {
    return (
        <>
            <Copyable
                text="user@example.com"
                copyIcon="fas fa-copy"
                checkIcon="fas fa-check"
                copiedText="Email copied!"
                fadeOutTime={2000}
            />
        </>
    );
}
```

**Alternative: Using text-based copy/check indicators**

```jsx
import { Copyable } from './components';

export default function App() {
    return (
        <>
            <Copyable
                text="https://example.com"
                copiedText="Link copied!"
            />
        </>
    );
}
```

### 2. GoogleAuthButton

#### GoogleAuthButton Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `googleLoginHost` | `string` | URL for the Google Identity Services script (e.g. `https://accounts.google.com/gsi/client`) | - |
| `googleLoginClientId` | `string` | OAuth 2.0 Client ID for your Google application | - |
| `googleLoginUrl` | `string` | Redirect/login URI where Google sends the response | - |

#### GoogleAuthButton Usage

```jsx
import { GoogleAuthButton } from './components';

export default function App() {
    return (
        <>
            <GoogleAuthButton
                googleLoginHost="https://accounts.google.com/gsi/client"
                googleLoginClientId="YOUR_GOOGLE_CLIENT_ID"
                googleLoginUrl="https://yourapp.com/auth/google"
            />
        <>
    );
}
```

### 3. Rolling Counter

#### Rolling Counter Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `fromValue` | `number` | The starting value for the counter animation | `0` |
| `toValue` | `number` | The ending value for the counter animation | - |
| `duration` | `number` | Animation duration in milliseconds | `500` |

#### Rolling Counter Usage

```jsx
import { RollingCounter } from './components';

export default function App() {
    return (
        <>
            <RollingCounter
                fromValue={0}
                toValue={100}
                duration={500}
            />
        </>
    );
}
```

**Alternative: Basic counter with default starting value**

```jsx
import { RollingCounter } from './components';

export default function App() {
    return (
        <>
            <RollingCounter toValue={50} duration={1000} />
        </>
    );
}
```

### 4. Server Status

#### Server Status Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `onlineIcon` | `string` | CSS class for the online icon (e.g., `fas fa-circle` for FontAwesome, `bi bi-circle-fill` for Bootstrap) | - |
| `offlineIcon` | `string` | CSS class for the offline icon (e.g., `fas fa-times-circle` for FontAwesome, `bi bi-circle` for Bootstrap) | - |
| `refreshInterval` | `number` | Polling interval in milliseconds to check server status | `180000` |
| `serverStatusService` | `IServerStatusService` | Service instance for fetching server status | `ServerStatusService.createDefault()` |

#### Server Status Usage

```jsx
import { ServerStatus } from './components';
import { ServerStatusService } from './services';

export default function App() {
    return (
        <>
            <ServerStatus
                onlineIcon="fas fa-circle"
                offlineIcon="fas fa-circle"
                refreshInterval={180000}
                serverStatusService={ServerStatusService.createDefault()}
            />
        </>
    );
}
```

**Alternative: Using useMemo for the service**

```jsx
import { useMemo } from 'react';
import { ServerStatus } from './components';
import { ServerStatusService } from './services';

export default function App() {
    const serverStatusService = useMemo(
        () => ServerStatusService.createDefault(),
        []
    );

    return (
        <>
            <ServerStatus
                onlineIcon="fas fa-circle"
                offlineIcon="fas fa-circle"
                refreshInterval={180000}
                serverStatusService={serverStatusService}
            />
        </>
    );
}
```

#### Server Status Dependencies

The `ServerStatus` component follows a layered architecture with the following dependency chain:

- **Component Layer**: `ServerStatus` depends on `IServerStatusService` to fetch server status periodically
- **Service Layer**: `ServerStatusService` implements the service interface and depends on `ServerStatusRepository` to retrieve server status data
- **Repository Layer**: `InMemoryServerStatusRepository` implements the repository interface and provides the actual data source

This architecture allows for flexible testing and swapping implementations. You can provide a custom repository implementation to `ServerStatusService.create()` to connect to different data sources without modifying the component.
