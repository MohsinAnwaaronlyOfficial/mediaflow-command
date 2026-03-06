import api from './client';

export const systemApi = {
  getHealth: () => api.get('/system/health'),
  getWorkers: () => api.get('/system/workers'),
  getLogs: () => api.get('/system/logs'),
  getCrons: () => api.get('/system/crons'),
  restartWorker: (name: string) => api.post(`/system/restart/${name}`),
  testSlack: () => api.post('/system/test-slack'),
  getConfig: () => api.get('/system/config'),
  updateConfig: (data: Record<string, unknown>) => api.put('/system/config', data),
};
