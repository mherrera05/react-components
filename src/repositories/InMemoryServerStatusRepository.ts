import { ServerStatusRepository } from "../services/ServerStatusService"

export class InMemoryServerStatusRepository implements ServerStatusRepository {
    async getStatus(): Promise<{ status: number }> {
        return Promise.resolve({ status: 200 })
    }
}