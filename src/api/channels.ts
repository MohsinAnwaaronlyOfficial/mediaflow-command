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

  // Warmup & Cookie
  getWarmupDefaultSites: () => api.get('/channel-setup/warmup/default-sites'),
  getNicheSites: (niche: string) => api.get(`/channel-setup/warmup/niche-sites/${niche}`),
  getWarmupSessions: (channelKey?: string) => api.get('/channel-setup/warmup/sessions', { params: { channelKey } }),

  // Sheets Logging
  getLogSheets: () => api.get('/channel-setup/log-sheets'),
  initLogSheets: () => api.post('/channel-setup/log-sheets/init'),

  // Gemini AI
  testGemini: () => api.get('/channel-setup/gemini/test'),
  generateKeywords: (niche: string, count?: number) => api.post('/channel-setup/gemini/generate-keywords', { niche, count }),
  generateContentIdeas: (niche: string, recentTitles?: string[], count?: number) => api.post('/channel-setup/gemini/content-ideas', { niche, recentTitles, count }),

  // Proxy Tracking (Finance)
  getProxyTracking: () => api.get('/channel-setup/proxy-tracking'),
  getProxyChannels: () => api.get('/channel-setup/proxy-tracking/channels'),
  addProxy: (data: Record<string, unknown>) => api.post('/channel-setup/proxy-tracking', data),
  updateProxy: (id: number, data: Record<string, unknown>) => api.put(`/channel-setup/proxy-tracking/${id}`, data),
  deleteProxy: (id: number) => api.delete(`/channel-setup/proxy-tracking/${id}`),
};
