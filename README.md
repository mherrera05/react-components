# React Components
[![Build Status](https://drone.softlutions.cl/api/badges/mherrera05/react-components/status.svg?ref=refs/heads/main)](https://drone.softlutions.cl/mherrera05/react-components)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/2252317c6e634959bb62df9a22f40fb6)](https://app.codacy.com/gh/mherrera05/react-components/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/2252317c6e634959bb62df9a22f40fb6)](https://app.codacy.com/gh/mherrera05/react-components/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Components](#components)
  - [GoogleAuthButton](#1-googleauthbutton)
    - [GoogleAuthButton Properties](#googleauthbutton-properties)
    - [GoogleAuthButton Usage](#googleauthbutton-usage)
  - [Server Status](#2-server-status)
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

### 1. GoogleAuthButton

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

### 2. Server Status

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
