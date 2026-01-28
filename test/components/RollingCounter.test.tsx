import React, { act } from "react"
import { render } from "@testing-library/react"
import { RollingCounter } from "../../src/components/RollingCounter"

jest.useFakeTimers()

describe("RollingCounter", () => {
    it("should render initial fromValue", () => {
        const component = render(<RollingCounter fromValue={10} toValue={20} duration={1000} />)

        const result = component.getByText("10")

        expect(result).toBeDefined()
    })

    it("should render last toValue", () => {
        const component = render(<RollingCounter fromValue={10} toValue={20} duration={1000} />)

        act(() => {
            jest.advanceTimersByTime(10000)
        })
        const result = component.getByText("20")

        expect(result).toBeDefined()
    })

    it("should render default value 0", () => {
        const component = render(<RollingCounter toValue={20} />)

        const result = component.getByText("0")
        
        expect(result).toBeDefined()
    })
})