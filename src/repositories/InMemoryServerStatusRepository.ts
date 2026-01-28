import { IServerStatusRepository } from "../services/ServerStatusService"

export class InMemoryServerStatusRepository implements IServerStatusRepository {
    async getStatus(): Promise<{ status: number }> {
        return Promise.resolve({ status: 200 })
    }
}