import { ServerStatusRepository } from "../services/ServerStatusService"

export class InMemoryServerStatusRepository implements ServerStatusRepository {
    async getServerStatus(): Promise<{ status: number }> {
        return Promise.resolve({ status: 200 })
    }
}