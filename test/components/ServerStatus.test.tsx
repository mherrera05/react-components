import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { ServerStatus } from '../../src/components/ServerStatus'

const intervals = {
    SHORTTIME: 1,
    LONGTIME: 10
}

describe('Server Status', () => {
    it('should not render server status first render', async () => {
        const mockService = {
            getStatus: async () => {
                return Promise.resolve({status: 'online', responseTime: 123} as {status: 'online' | 'offline', responseTime: number})
            }
        }
        const component = render(<ServerStatus
            onlineIcon={"online-icon"}
            offlineIcon={"offline-icon"}
            refreshInterval={intervals.SHORTTIME}
            service={mockService}
        />)

        const result = component.queryByText(/Servidor: online/i)

        expect(result).toBeNull()
    })

    it('should render server status as online after an interval', async () => {
        const mockService = {
            getStatus: async () => {
                return Promise.resolve({status: 'online', responseTime: 123} as {status: 'online' | 'offline', responseTime: number})
            }
        }
        const component = render(<ServerStatus
            onlineIcon={"online-icon"}
            offlineIcon={"offline-icon"}
            refreshInterval={intervals.LONGTIME}
            service={mockService}
        />)

         await waitFor(async () => {
            const result = await component.findAllByText(/Servidor: online - 123ms/i)
            expect(result).toBeDefined()
        })

    })

    it('should render server status as offline after an interval', async () => {
        const mockService = {
            getStatus: async () => {
                return Promise.resolve({status: 'offline', responseTime: 123} as {status: 'online' | 'offline', responseTime: number})
            }
        }
        const component = render(<ServerStatus
            onlineIcon={"online-icon"}
            offlineIcon={"offline-icon"}
            refreshInterval={intervals.LONGTIME}
            service={mockService}
        />)

        await waitFor(async () => {
            const result = await component.findAllByText(/Servidor: offline/i)
            expect(result).toBeDefined()
        })

    })
})
