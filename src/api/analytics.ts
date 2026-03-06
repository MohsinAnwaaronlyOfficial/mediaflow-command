import api from './client';

export const analyticsApi = {
  getSummary: () => api.get('/analytics/summary'),
  getChannelAnalytics: (key: string) => api.get(`/analytics/channel/${key}`),
  getRevenueChart: (days?: number) => api.get('/analytics/revenue-chart', { params: { days } }),
  getVideoQueue: () => api.get('/channel-setup/video-queue'),
};
