import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react"
import { Copyable } from "../../src/components/Copyable"

describe('Copyable Component', () => {
    it('should show content text', () => {
        const component = render(<Copyable text="Sample Text" />)

        const result = component.getByText(/Sample Text/i)

        expect(result).toBeDefined()
    })

    it('should show copy text when hovered', () => {
        const component = render(<Copyable text="Sample Text" />)

        fireEvent.mouseEnter(component.getByText(/Sample Text/i))
        const result = component.getByText(/Copy/i)

        expect(result).toBeDefined()
    })

    it('should show copy icon when hovered', () => {
        const component = render(<Copyable text="Sample Text" copyIcon={'copy-icon-class'} />)

        fireEvent.mouseEnter(component.getByText(/Sample Text/i))
        const result = component.getByRole('img', { hidden: true })

        expect(result).toBeDefined()
        expect(result.className).toBe('copy-icon-class')
    })

    it('should not show copy text when left', () => {
        const component = render(<Copyable text="Sample Text" />)

        fireEvent.mouseEnter(component.getByText(/Sample Text/i))
        fireEvent.mouseLeave(component.getByText(/Sample Text/i))
        const result = component.queryByText(/Copy/i)

        expect(result).toBeNull()
    })

    it('should show copied text when clicked on copy', () => {
        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: jest.fn(),
                readText: jest.fn(),
            },
            configurable: true,
        });
        const component = render(<Copyable text="Sample Text" />)

        fireEvent.mouseEnter(component.getByText(/Sample Text/i))
        fireEvent.click(component.getByText(/Copy/i))

        waitFor(async () => {
            const result = await component.getByText(/Copied!/i)
            expect(result).toBeDefined()
        })
    })

    it('should show copied icon and text when clicked on copy with checkIcon', () => {
        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: jest.fn(),
                readText: jest.fn(),
            },
            configurable: true,
        });
        const component = render(<Copyable text="Sample Text" checkIcon={'check-icon-class'} />)

        fireEvent.mouseEnter(component.getByText(/Sample Text/i))
        fireEvent.click(component.getByText(/Copy/i))

        waitFor(async () => {
            const icon = await component.getByRole('img', { hidden: true })
            const text = await component.getByText(/Copied!/i)
            expect(icon).toBeDefined()
            expect(icon.className).toBe('check-icon-class')
            expect(text).toBeDefined()
        })
    })

})
