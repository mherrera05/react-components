# React Components
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c12e1c81ab3644e5a2ea145ef87b42a7)](https://app.codacy.com/gh/mherrera05/react-components?utm_source=github.com&utm_medium=referral&utm_content=mherrera05/react-components&utm_campaign=Badge_Grade)
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
