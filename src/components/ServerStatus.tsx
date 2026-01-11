import React, { useEffect, useState } from 'react'
import { ServerStatusService } from '../services/ServerStatusService'

const intervalDefault: number = 180000
export const statusOptions: statusOptionsEnum = {
    online: 'Online',
    offline: 'Offline'
}

type statusOption = 'Online' | 'Offline'
type statusOptionsEnum = { online: statusOption, offline: statusOption }
export type statusOptionsResponse = {
    status: statusOption
    responseTime: number
}

export interface IServerStatusService {
    getStatus: () => Promise<statusOptionsResponse>
}
interface IServerStatusProps {
    onlineIcon: string
    offlineIcon: string
    refreshInterval?: number
    serverStatusService?: IServerStatusService
}

export function ServerStatus({ onlineIcon, offlineIcon, refreshInterval = intervalDefault, serverStatusService = ServerStatusService.createDefault() }: IServerStatusProps) {
    const [status, setStatus] = useState<statusOptionsResponse | null>(null)

    useEffect(() => {
        const executionId = setInterval(() => {
            void serverStatusService.getStatus().then(newStatus => {
                setStatus(newStatus)
            })
        }, refreshInterval)
        return () => { clearInterval(executionId) }
    })

    if (!status) {
        return <></>
    }

    return (
        <>
            <i className={status.status === statusOptions.online ? onlineIcon : offlineIcon} style={{ color: status.status === statusOptions.online ? 'inherit' : 'red' }}></i> Server: {status.status} {status.status === statusOptions.online ? `- ${status.responseTime}ms` : ''}
        </>
    )
}