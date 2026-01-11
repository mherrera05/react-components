import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { ServerStatus, statusOptions } from '../../src/components/ServerStatus'

const intervals = {
    SHORTTIME: 1,
    LONGTIME: 10
}

describe('Server Status', () => {
    it('should not render server status first render', async () => {
        const mockService = {
            getStatus: async () => {
                return Promise.resolve({ status: statusOptions.online, responseTime: 123 } as { status: 'Online' | 'Offline', responseTime: number })
            }
        }
        const component = render(<ServerStatus
            onlineIcon={"online-icon"}
            offlineIcon={"offline-icon"}
            refreshInterval={intervals.SHORTTIME}
            serverStatusService={mockService}
        />)

        const result = component.queryByText(/Server: Online/i)

        expect(result).toBeNull()
    })

    it('should render server status as online after an interval', async () => {
        const mockService = {
            getStatus: async () => {
                return Promise.resolve({ status: statusOptions.online, responseTime: 123 } as { status: 'Online' | 'Offline', responseTime: number })
            }
        }
        const component = render(<ServerStatus
            onlineIcon={"online-icon"}
            offlineIcon={"offline-icon"}
            refreshInterval={intervals.LONGTIME}
            serverStatusService={mockService}
        />)

        await waitFor(async () => {
            const result = await component.findAllByText(/Server: Online - 123ms/i)
            expect(result).toBeDefined()
        })
    })

    it('should render server status as offline after an interval', async () => {
        const mockService = {
            getStatus: async () => {
                return Promise.resolve({ status: statusOptions.offline, responseTime: 123 } as { status: 'Online' | 'Offline', responseTime: number })
            }
        }
        const component = render(<ServerStatus
            onlineIcon={"online-icon"}
            offlineIcon={"offline-icon"}
            refreshInterval={intervals.LONGTIME}
            serverStatusService={mockService}
        />)

        await waitFor(async () => {
            const result = await component.findAllByText(/Server: Offline/i)
            expect(result).toBeDefined()
        })
    })
})
