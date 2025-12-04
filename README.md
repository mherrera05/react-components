# React Components
[![Build Status](https://drone.softlutions.cl/api/badges/mherrera05/react-components/status.svg?ref=refs/heads/main)](https://drone.softlutions.cl/mherrera05/react-components)

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Components](#components)
- [Usage](#usage)

## Overview

A collection of reusable React components for building modern user interfaces.

## Installation

```bash
npm install
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

### Button

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `label` | `string` | Button text | - |
| `onClick` | `function` | Click handler | - |
| `variant` | `'primary' \| 'secondary'` | Button style | `'primary'` |
| `disabled` | `boolean` | Disable button | `false` |
