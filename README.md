# React Components
[![Build Status](https://drone.softlutions.cl/api/badges/mherrera05/react-components/status.svg?ref=refs/heads/main)](https://drone.softlutions.cl/mherrera05/react-components)

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Components](#components)
  - [GoogleAuthButton](#googleauthbutton)
    - [Properties](#properties)
    - [Usage](#usage)
  - [Server Status](#server-status)
    - [Properties](#properties-1)
    - [Usage](#usage-1)
    - [Dependencies](#dependencies)

## Overview

A collection of reusable React components for building modern user interfaces.

## Installation

```bash
npm install --save @mherrera/react-components
```

## Components

### GoogleAuthButton

#### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `googleLoginHost` | `string` | URL for the Google Identity Services script (e.g. `https://accounts.google.com/gsi/client`) | - |
| `googleLoginClientId` | `string` | OAuth 2.0 Client ID for your Google application | - |
| `googleLoginUrl` | `string` | Redirect/login URI where Google sends the response | - |

#### Usage

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

### Server Status

#### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `onlineIcon` | `string` | CSS class for the online icon (e.g., `fas fa-circle` for FontAwesome, `bi bi-circle-fill` for Bootstrap) | - |
| `offlineIcon` | `string` | CSS class for the offline icon (e.g., `fas fa-times-circle` for FontAwesome, `bi bi-circle` for Bootstrap) | - |
| `refreshInterval` | `number` | Polling interval in milliseconds to check server status | `180000` |
| `serverStatusService` | `IServerStatusService` | Service instance for fetching server status | `ServerStatusService.createDefault()` |

#### Usage

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

#### Dependencies

The `ServerStatus` component follows a layered architecture with the following dependency chain:

- **Component Layer**: `ServerStatus` depends on `IServerStatusService` to fetch server status periodically
- **Service Layer**: `ServerStatusService` implements the service interface and depends on `ServerStatusRepository` to retrieve server status data
- **Repository Layer**: `InMemoryServerStatusRepository` implements the repository interface and provides the actual data source

This architecture allows for flexible testing and swapping implementations. You can provide a custom repository implementation to `ServerStatusService.create()` to connect to different data sources without modifying the component.
