import { statusOptionsResponse, statusOptions, IServerStatusService } from "../components/ServerStatus"
import { InMemoryServerStatusRepository } from "../repositories/InMemoryServerStatusRepository"

export interface ServerStatusRepository {
    getStatus: () => Promise<{ status: number }>
}

export class ServerStatusService implements IServerStatusService {
    repository: ServerStatusRepository

    constructor(repository: ServerStatusRepository) {
        this.repository = repository
    }

    static createDefault(repository: ServerStatusRepository = new InMemoryServerStatusRepository()): IServerStatusService {
        return new ServerStatusService(repository)
    }

    static create(repository: ServerStatusRepository): IServerStatusService {
        return new ServerStatusService(repository)
    }

    async getStatus(): Promise<statusOptionsResponse> {
        try {
            const time = Date.now()
            const response = await this.repository.getStatus()

            if (response.status !== 200) {
                throw new Error('Server is offline')
            }

            return Promise.resolve({ status: statusOptions.online, responseTime: Date.now() - time })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return Promise.resolve({ status: statusOptions.offline, responseTime: 0 })
        }
    }
}