import { statusOptionsResponse } from "../components/ServerStatus"
import { InMemoryServerStatusRepository } from "../repositories/InMemoryServerStatusRepository"

export interface ServerStatusRepository {
    getServerStatus: () => Promise<{ status: number }>
}

export async function getServerStatus(repository: ServerStatusRepository = new InMemoryServerStatusRepository()): Promise<statusOptionsResponse> {
    try {
        const time = Date.now()
        const response = await repository.getServerStatus()

        if (response.status !== 200) {
            throw new Error('Server is offline')
        }
        
        return Promise.resolve({ status: 'online', responseTime: Date.now() - time })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return Promise.resolve({ status: 'offline', responseTime: 0 })
    }
}