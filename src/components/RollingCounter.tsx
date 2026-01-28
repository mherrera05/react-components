import React, { useState, useEffect } from "react"

interface RollingCounterProps {
    fromValue?: number
    toValue: number
    duration?: number
}

export function RollingCounter({ fromValue = 0, toValue, duration = 500 }: RollingCounterProps) {
    const [currentValue, setCurrentValue] = useState(fromValue)

    useEffect(() => {
        let startTime: number | null = null
        const animate = (currentTime: number) => {
            if (!startTime) {
                startTime = currentTime
            }

            const elapsedTime = currentTime - startTime
            const progress = Math.min(elapsedTime / duration, 1)
            const value = Math.floor(fromValue + (toValue - fromValue) * progress)
            setCurrentValue(value)

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        const requestId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestId)
    }, [fromValue, toValue, duration])

    return (
        <>
            {currentValue}
        </>
    )
}