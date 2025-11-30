# React Components

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

### Button

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `label` | `string` | Button text | - |
| `onClick` | `function` | Click handler | - |
| `variant` | `'primary' \| 'secondary'` | Button style | `'primary'` |
| `disabled` | `boolean` | Disable button | `false` |

### Card

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `title` | `string` | Card title | - |
| `children` | `ReactNode` | Card content | - |
| `elevation` | `number` | Shadow depth | `1` |

### Input

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `placeholder` | `string` | Input placeholder text | - |
| `value` | `string` | Input value | - |
| `onChange` | `function` | Change handler | - |
| `type` | `string` | Input type | `'text'` |

## Usage

```jsx
import { Button, Card, Input } from './components';

export default function App() {
    return (
        <Card title="Welcome">
            <Input placeholder="Enter text" />
            <Button label="Submit" />
        </Card>
    );
}
```