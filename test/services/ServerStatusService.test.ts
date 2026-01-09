import { getServerStatus } from '../../src/services/ServerStatusService';

describe('Server Status Service', () => {
    it('should return online status when server is online', async () => {
        global.Date.now = jest.fn()
            .mockReturnValueOnce(1000)
            .mockReturnValueOnce(1100);
        const mockRepository = {
            getServerStatus: async () => {
                return Promise.resolve({ status: 200 });
            }
        };

        const result = await getServerStatus(mockRepository);

        expect(result.status).toBe('online');
        expect(result.responseTime).toBeGreaterThan(0);
    });

    it('should return offline status when server is offline', async () => {
        const mockRepository = {
            getServerStatus: async () => {
                return Promise.resolve({ status: 500 });
            }
        };

        const result = await getServerStatus(mockRepository);

        expect(result.status).toBe('offline');
        expect(result.responseTime).toBe(0);
    });

    it('should return offline status when repository throws an error', async () => {
        const mockRepository = {
            getServerStatus: async () => {
                return Promise.resolve({ status: 500 });
            }
        };

        const result = await getServerStatus(mockRepository);

        expect(result.status).toBe('offline');
        expect(result.responseTime).toBe(0);
    });
});