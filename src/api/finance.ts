import api from './client';

export const financeApi = {
  getSummary: (month?: string) => api.get('/finance/summary', { params: { month } }),
  getRevenues: (params?: Record<string, string>) => api.get('/finance/revenues', { params }),
  addRevenue: (data: Record<string, unknown>) => api.post('/finance/revenues', data),
  getExpenses: (params?: Record<string, string>) => api.get('/finance/expenses', { params }),
  addExpense: (data: Record<string, unknown>) => api.post('/finance/expenses', data),
  getChannelPL: (month?: string) => api.get('/finance/channel-pl', { params: { month } }),
  getPartners: () => api.get('/finance/partners'),
  getMonthlyEarnings: () => api.get('/finance/monthly-earnings'),
  closeMonth: (month: string) => api.post('/finance/close-month', { month }),
};
