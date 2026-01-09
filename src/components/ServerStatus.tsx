import React, { useEffect, useState } from 'react'

const intervalDefault: number = 300000
const statusOptions: statusOptionsEnum = {
    online: 'online',
    offline: 'offline'
}

type statusOption = 'online' | 'offline'
type statusOptionsEnum = { online: statusOption, offline: statusOption }
export type statusOptionsResponse = {
    status: statusOption
    responseTime: number
}

interface ServerStatusService {
    getServerStatus: () => Promise<statusOptionsResponse>
}
interface ServerStatusProps {
    onlineIcon: string
    offlineIcon: string
    refreshInterval: number
    service: ServerStatusService
}

export function ServerStatus({ onlineIcon, offlineIcon, refreshInterval = intervalDefault, service }: ServerStatusProps) {
    const [status, setStatus] = useState<statusOptionsResponse | null>(null)

     useEffect(() => {
        const executionId = setInterval(async () => {
            setStatus(await service.getServerStatus())
        }, refreshInterval)
        return () => clearInterval(executionId)
    }, [])

    if (!status) {
        return <></>
    }

    return (
        <>
            <i className={status.status === statusOptions.online ? onlineIcon : offlineIcon} style={{ color: status.status === statusOptions.online ? 'inherit' : 'red' }}></i> Servidor: {status.status} {status.status === statusOptions.online ? `- ${status.responseTime}ms` : ''}
        </>
    )
}