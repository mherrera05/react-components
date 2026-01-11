import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { ServerStatus } from '../../src/components/ServerStatus'
import { ServerStatusService } from '../../src/services/ServerStatusService'

describe('Server Status', () => {
    it('should show server status online using the default service', async () => {
        const component = render(<ServerStatus
            onlineIcon={"online-icon"}
            offlineIcon={"offline-icon"}
            refreshInterval={10}
        />)

        await waitFor(async () => {
            const result = await component.findByText(/Server: Online - /i)
            expect(result).toBeDefined()
        })
    })

    it('should show server status offline a custom repository through the service', async () => {
        const mockRepository = {
            getStatus: async () => {
                return Promise.resolve({ status: 500 } as { status: number })
            }
        }
        const component = render(<ServerStatus
            onlineIcon={"online-icon"}
            offlineIcon={"offline-icon"}
            refreshInterval={10}
            serverStatusService={ServerStatusService.create(mockRepository)}
        />)

        await waitFor(async () => {
            const result = await component.findByText(/Server: Offline/i)
            expect(result).toBeDefined()
        })
    })
})