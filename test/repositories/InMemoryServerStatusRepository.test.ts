import { InMemoryServerStatusRepository } from '../../src/repositories/InMemoryServerStatusRepository'

describe('InMemoryServerStatusRepository', () => {
    it('should return status 200', async () => {
        const repository = new InMemoryServerStatusRepository()
        const result = await repository.getStatus()
        expect(result.status).toBe(200)
    })
})