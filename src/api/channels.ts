import api from './client';

export const channelsApi = {
  // IXBrowser
  getIXProfiles: () => api.get('/channel-setup/ixbrowser/profiles'),
  syncIXProfiles: () => api.post('/channel-setup/ixbrowser/sync'),

  // Channel CRUD
  getChannels: () => api.get('/channel-setup/channels'),
  getChannel: (key: string) => api.get(`/channel-setup/channels/${key}`),
  createChannel: (data: Record<string, unknown>) => api.post('/channel-setup/channels', data),
  updateChannel: (key: string, data: Record<string, unknown>) => api.put(`/channel-setup/channels/${key}`, data),
  activateChannel: (key: string) => api.post(`/channel-setup/channels/${key}/activate`),
  freezeChannel: (key: string) => api.post(`/channel-setup/channels/${key}/freeze`),
  unfreezeChannel: (key: string) => api.post(`/channel-setup/channels/${key}/unfreeze`),

  // Verification
  verifyDrive: (key: string, url: string, type: 'longs' | 'shorts') =>
    api.post(`/channel-setup/channels/${key}/verify-drive`, { url, type }),
  verifySheet: (key: string, url: string) =>
    api.post(`/channel-setup/channels/${key}/verify-sheet`, { url }),

  // AI
  suggestTimes: (key: string) =>
    api.post(`/channel-setup/channels/${key}/ai-suggest-times`),

  // Pipeline
  getVideoQueue: (params?: Record<string, string>) =>
    api.get('/channel-setup/video-queue', { params }),

  // Health
  getSystemHealth: () => api.get('/channel-setup/health'),
};
