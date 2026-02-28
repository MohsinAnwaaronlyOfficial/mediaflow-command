export interface Channel {
  id: string;
  name: string;
  niche: string;
  tier: 'T1' | 'T2' | 'T3' | 'T4';
  ixProfile: string;
  ixProfileId: string;
  ixStatus: 'open' | 'closed';
  proxy: string;
  dailyLimit: number;
  videosToday: number;
  todayViews: number;
  subscribers: number;
  uploadQueue: number;
  status: 'active' | 'paused' | 'error';
  publishTimes: string[];
  sheetUrl: string;
  videoFolder: string;
}

export const channels: Channel[] = [
  { id: '1', name: 'BenchDecoded', niche: 'Judge', tier: 'T1', ixProfile: 'BD-Main', ixProfileId: 'IX-4821', ixStatus: 'open', proxy: '45.89.112.34:8080', dailyLimit: 2, videosToday: 1, todayViews: 187420, subscribers: 124500, uploadQueue: 3, status: 'active', publishTimes: ['09:00', '15:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/1abc', videoFolder: '/media/benchdecoded' },
  { id: '2', name: 'TrialTales', niche: 'Judge', tier: 'T2', ixProfile: 'TT-Primary', ixProfileId: 'IX-4822', ixStatus: 'open', proxy: '45.89.112.35:8080', dailyLimit: 2, videosToday: 2, todayViews: 134200, subscribers: 847, uploadQueue: 1, status: 'active', publishTimes: ['10:00', '16:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/2def', videoFolder: '/media/trialtales' },
  { id: '3', name: 'VerdictVault', niche: 'Judge', tier: 'T2', ixProfile: 'VV-Main', ixProfileId: 'IX-4823', ixStatus: 'open', proxy: '45.89.112.36:8080', dailyLimit: 2, videosToday: 1, todayViews: 98340, subscribers: 67200, uploadQueue: 2, status: 'active', publishTimes: ['11:00', '17:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/3ghi', videoFolder: '/media/verdictvault' },
  { id: '4', name: 'TechVault', niche: 'Tech', tier: 'T3', ixProfile: 'TV-Main', ixProfileId: 'IX-4824', ixStatus: 'closed', proxy: '45.89.112.37:8080', dailyLimit: 3, videosToday: 2, todayViews: 245100, subscribers: 312000, uploadQueue: 4, status: 'active', publishTimes: ['08:00', '12:00', '18:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/4jkl', videoFolder: '/media/techvault' },
  { id: '5', name: 'FoodFlicks', niche: 'Food', tier: 'T3', ixProfile: 'FF-Main', ixProfileId: 'IX-4825', ixStatus: 'closed', proxy: '45.89.112.38:8080', dailyLimit: 2, videosToday: 1, todayViews: 156300, subscribers: 89400, uploadQueue: 2, status: 'active', publishTimes: ['09:30', '15:30'], sheetUrl: 'https://docs.google.com/spreadsheets/d/5mno', videoFolder: '/media/foodflicks' },
  { id: '6', name: 'LawBites', niche: 'Judge', tier: 'T4', ixProfile: 'LB-Main', ixProfileId: 'IX-4826', ixStatus: 'closed', proxy: '45.89.112.39:8080', dailyLimit: 1, videosToday: 1, todayViews: 25933, subscribers: 312, uploadQueue: 1, status: 'paused', publishTimes: ['14:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/6pqr', videoFolder: '/media/lawbites' },
];

export const managerChannels = ['1', '2', '3']; // BenchDecoded, TrialTales, VerdictVault

export type VideoStatus = 'EDITING' | 'READY_TO_UPLOAD' | 'QUEUED' | 'UPLOADING' | 'UPLOADED_UNLISTED' | 'PUBLISHED' | 'ERROR';

export interface VideoItem {
  id: string;
  channel: string;
  channelId: string;
  title: string;
  status: VideoStatus;
  publishDate: string;
  publishTime: string;
  tier: string;
  uploadedAt: string;
  youtubeUrl: string;
  error: string;
  description: string;
  tags: string[];
}

export const videoQueue: VideoItem[] = [
  { id: 'v1', channel: 'BenchDecoded', channelId: '1', title: 'Judge Absolutely DESTROYS Entitled Karen in Court', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '09:00', tier: 'T1', uploadedAt: '2026-02-28 08:45', youtubeUrl: 'https://youtube.com/watch?v=abc1', error: '', description: 'A judge delivers justice to an entitled woman who refuses to follow court orders.', tags: ['judge', 'court', 'karen', 'justice'] },
  { id: 'v2', channel: 'BenchDecoded', channelId: '1', title: 'Lawyer Gets CAUGHT Lying to the Judge', status: 'QUEUED', publishDate: '2026-02-28', publishTime: '15:00', tier: 'T1', uploadedAt: '', youtubeUrl: '', error: '', description: 'When a lawyer tries to deceive the judge, things go very wrong.', tags: ['lawyer', 'court', 'lying'] },
  { id: 'v3', channel: 'BenchDecoded', channelId: '1', title: 'Most SAVAGE Judge Moments of 2026', status: 'EDITING', publishDate: '2026-03-01', publishTime: '09:00', tier: 'T1', uploadedAt: '', youtubeUrl: '', error: '', description: 'Compilation of the most intense courtroom moments.', tags: ['compilation', 'judge', 'savage'] },
  { id: 'v4', channel: 'TrialTales', channelId: '2', title: 'Woman Sues Neighbor Over 2 Inches of Fence', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '10:00', tier: 'T2', uploadedAt: '2026-02-28 09:45', youtubeUrl: 'https://youtube.com/watch?v=def2', error: '', description: 'A heated dispute over property lines ends up in court.', tags: ['neighbor', 'fence', 'lawsuit'] },
  { id: 'v5', channel: 'TrialTales', channelId: '2', title: 'Judge Judy vs The Most Annoying Plaintiff', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '16:00', tier: 'T2', uploadedAt: '2026-02-28 15:40', youtubeUrl: 'https://youtube.com/watch?v=ghi3', error: '', description: 'Judge handles the most difficult plaintiff ever seen in court.', tags: ['judge judy', 'plaintiff', 'annoying'] },
  { id: 'v6', channel: 'TrialTales', channelId: '2', title: 'Man Refuses to Pay Child Support — Judge Reacts', status: 'ERROR', publishDate: '2026-02-27', publishTime: '10:00', tier: 'T2', uploadedAt: '2026-02-27 09:30', youtubeUrl: '', error: 'Upload timeout after 3 retries. IXBrowser session crashed.', description: 'A father faces consequences for refusing court-ordered payments.', tags: ['child support', 'court'] },
  { id: 'v7', channel: 'VerdictVault', channelId: '3', title: 'Top 10 Courtroom Freakouts Caught on Camera', status: 'UPLOADING', publishDate: '2026-02-28', publishTime: '17:00', tier: 'T2', uploadedAt: '', youtubeUrl: '', error: '', description: 'The most dramatic courtroom moments ever filmed.', tags: ['freakout', 'courtroom', 'top10'] },
  { id: 'v8', channel: 'VerdictVault', channelId: '3', title: 'Criminal Tries to ESCAPE During Sentencing', status: 'READY_TO_UPLOAD', publishDate: '2026-03-01', publishTime: '11:00', tier: 'T2', uploadedAt: '', youtubeUrl: '', error: '', description: 'Dramatic footage of a defendant attempting to flee the courtroom.', tags: ['escape', 'criminal', 'sentencing'] },
  { id: 'v9', channel: 'TechVault', channelId: '4', title: 'I Tested the $5000 AI Laptop — Was It Worth It?', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '08:00', tier: 'T3', uploadedAt: '2026-02-28 07:45', youtubeUrl: 'https://youtube.com/watch?v=jkl4', error: '', description: 'Full review of the latest AI-focused laptop.', tags: ['laptop', 'AI', 'review', 'tech'] },
  { id: 'v10', channel: 'TechVault', channelId: '4', title: 'Best Budget Phones 2026 — You Wont Believe #1', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '12:00', tier: 'T3', uploadedAt: '2026-02-28 11:45', youtubeUrl: 'https://youtube.com/watch?v=mno5', error: '', description: 'Our top picks for budget smartphones this year.', tags: ['phones', 'budget', '2026'] },
  { id: 'v11', channel: 'TechVault', channelId: '4', title: 'This Gadget Changed My Life — $29 Only', status: 'UPLOADED_UNLISTED', publishDate: '2026-02-28', publishTime: '18:00', tier: 'T3', uploadedAt: '2026-02-28 17:30', youtubeUrl: 'https://youtube.com/watch?v=pqr6', error: '', description: 'An unboxing and review of a surprisingly useful gadget.', tags: ['gadget', 'unboxing', 'cheap'] },
  { id: 'v12', channel: 'TechVault', channelId: '4', title: 'Apple vs Samsung 2026 — The TRUTH', status: 'QUEUED', publishDate: '2026-03-01', publishTime: '08:00', tier: 'T3', uploadedAt: '', youtubeUrl: '', error: '', description: 'A deep comparison between the latest Apple and Samsung flagships.', tags: ['apple', 'samsung', 'comparison'] },
  { id: 'v13', channel: 'FoodFlicks', channelId: '5', title: '5 Minute Meals That Actually Taste AMAZING', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '09:30', tier: 'T3', uploadedAt: '2026-02-28 09:15', youtubeUrl: 'https://youtube.com/watch?v=stu7', error: '', description: 'Quick and delicious meals anyone can make.', tags: ['cooking', 'quick meals', 'recipes'] },
  { id: 'v14', channel: 'FoodFlicks', channelId: '5', title: 'Street Food in Tokyo — $1 vs $100', status: 'READY_TO_UPLOAD', publishDate: '2026-03-01', publishTime: '09:30', tier: 'T3', uploadedAt: '', youtubeUrl: '', error: '', description: 'Exploring the extremes of Tokyo street food.', tags: ['tokyo', 'street food', 'challenge'] },
  { id: 'v15', channel: 'LawBites', channelId: '6', title: 'Why This Murder Case SHOCKED Everyone', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '14:00', tier: 'T4', uploadedAt: '2026-02-28 13:45', youtubeUrl: 'https://youtube.com/watch?v=vwx8', error: '', description: 'An analysis of one of the most surprising murder cases.', tags: ['murder', 'case', 'shocking'] },
  { id: 'v16', channel: 'LawBites', channelId: '6', title: 'Legal Myths That Could Get You ARRESTED', status: 'EDITING', publishDate: '2026-03-02', publishTime: '14:00', tier: 'T4', uploadedAt: '', youtubeUrl: '', error: '', description: 'Common legal misconceptions that people actually believe.', tags: ['legal', 'myths', 'arrested'] },
  { id: 'v17', channel: 'BenchDecoded', channelId: '1', title: 'Judge Makes Grown Man CRY in Court', status: 'UPLOADED_UNLISTED', publishDate: '2026-03-01', publishTime: '15:00', tier: 'T1', uploadedAt: '2026-02-28 20:00', youtubeUrl: 'https://youtube.com/watch?v=yza9', error: '', description: 'Emotional courtroom moment when judge delivers a powerful message.', tags: ['emotional', 'judge', 'crying'] },
  { id: 'v18', channel: 'VerdictVault', channelId: '3', title: 'Judge Catches Witness in a LIE — Epic Moment', status: 'QUEUED', publishDate: '2026-03-01', publishTime: '17:00', tier: 'T2', uploadedAt: '', youtubeUrl: '', error: '', description: 'Incredible moment when a witness is caught lying under oath.', tags: ['witness', 'lie', 'perjury'] },
  { id: 'v19', channel: 'FoodFlicks', channelId: '5', title: 'I Ate ONLY Gas Station Food for 24 Hours', status: 'EDITING', publishDate: '2026-03-03', publishTime: '15:30', tier: 'T3', uploadedAt: '', youtubeUrl: '', error: '', description: 'A 24-hour challenge eating only from gas stations.', tags: ['challenge', 'gas station', 'food'] },
  { id: 'v20', channel: 'TechVault', channelId: '4', title: 'Unboxing the RAREST Tech of 2026', status: 'READY_TO_UPLOAD', publishDate: '2026-03-01', publishTime: '12:00', tier: 'T3', uploadedAt: '', youtubeUrl: '', error: '', description: 'Exclusive unboxing of extremely rare tech products.', tags: ['unboxing', 'rare', 'tech'] },
];

export const activityFeed = [
  { time: '2 min ago', message: 'TechVault: Video uploaded — "This Gadget Changed My Life"', type: 'upload' },
  { time: '5 min ago', message: 'BenchDecoded: Warmup session completed', type: 'system' },
  { time: '8 min ago', message: 'TrialTales: Published to YouTube — "Judge Judy vs The Most Annoying Plaintiff"', type: 'publish' },
  { time: '12 min ago', message: 'VerdictVault: Upload started — "Top 10 Courtroom Freakouts"', type: 'upload' },
  { time: '15 min ago', message: 'FoodFlicks: Video published — "5 Minute Meals That Actually Taste AMAZING"', type: 'publish' },
  { time: '22 min ago', message: 'LawBites: Video published — "Why This Murder Case SHOCKED Everyone"', type: 'publish' },
  { time: '30 min ago', message: 'BenchDecoded: Published to YouTube — "Judge DESTROYS Entitled Karen"', type: 'publish' },
  { time: '35 min ago', message: 'TechVault: Published — "Best Budget Phones 2026"', type: 'publish' },
  { time: '42 min ago', message: 'System: Daily backup completed', type: 'system' },
  { time: '1 hr ago', message: 'TrialTales: Upload failed — retrying in 5 min', type: 'error' },
  { time: '1.5 hr ago', message: 'TechVault: Published — "I Tested the $5000 AI Laptop"', type: 'publish' },
  { time: '2 hr ago', message: 'System: Cron scheduler restarted', type: 'system' },
];

export const alerts = [
  { id: 'a1', severity: 'critical' as const, title: 'Proxy expires in 5 days', description: 'BenchDecoded proxy (45.89.112.34) expires on March 5, 2026. Renew immediately to avoid service interruption.', time: '10 min ago', action: 'Renew Now' },
  { id: 'a2', severity: 'critical' as const, title: 'Upload failed 3 times on TrialTales', description: 'Video "Man Refuses to Pay Child Support" failed upload 3 times. IXBrowser session crashed during upload process.', time: '1 hr ago', action: 'Review' },
  { id: 'a3', severity: 'warning' as const, title: 'IXBrowser subscription renews in 12 days', description: 'IXBrowser subscription ($49/mo) renews on March 12, 2026. Ensure payment method is up to date.', time: '3 hr ago', action: 'Reminder Set' },
  { id: 'a4', severity: 'warning' as const, title: 'VerdictVault approaching YPP', description: 'VerdictVault has reached 847/1000 subscribers. Only 153 more subscribers needed for YouTube Partner Program eligibility.', time: '5 hr ago', action: 'View Stats' },
  { id: 'a5', severity: 'info' as const, title: 'BenchDecoded video went viral', description: '"Judge DESTROYS Entitled Karen" is performing 3.2x above normal with 187,420 views today.', time: '2 hr ago', action: 'View' },
];

export const resolvedAlerts = [
  { id: 'ra1', title: 'TechVault proxy renewed', resolvedAt: '2026-02-27 14:30', resolutionTime: '2 hours' },
  { id: 'ra2', title: 'FoodFlicks upload error fixed', resolvedAt: '2026-02-27 10:15', resolutionTime: '45 min' },
  { id: 'ra3', title: 'Redis connection restored', resolvedAt: '2026-02-26 22:00', resolutionTime: '12 min' },
  { id: 'ra4', title: 'BenchDecoded daily limit reached — paused', resolvedAt: '2026-02-26 16:00', resolutionTime: 'Auto' },
  { id: 'ra5', title: 'VPS disk usage above 80%', resolvedAt: '2026-02-25 09:30', resolutionTime: '1 hour' },
  { id: 'ra6', title: 'TrialTales warmup timeout', resolvedAt: '2026-02-25 08:00', resolutionTime: '30 min' },
  { id: 'ra7', title: 'Google API rate limit hit', resolvedAt: '2026-02-24 19:45', resolutionTime: '15 min' },
  { id: 'ra8', title: 'Cron job failed — publish worker', resolvedAt: '2026-02-24 14:20', resolutionTime: '5 min' },
  { id: 'ra9', title: 'IXBrowser profile corrupted', resolvedAt: '2026-02-23 11:00', resolutionTime: '3 hours' },
  { id: 'ra10', title: 'WhatsApp notification failure', resolvedAt: '2026-02-23 07:30', resolutionTime: '20 min' },
];

export const teamMembers = [
  { id: 't1', name: 'Sardar Mohsin', role: 'Owner', email: 'mohsin@unitymediaflow.com', channels: 'All Channels', lastLogin: '2026-02-28 09:15', status: 'online' },
  { id: 't2', name: 'Ahmed', role: 'Manager', email: 'ahmed@unitymediaflow.com', channels: 'BenchDecoded, TrialTales, VerdictVault', lastLogin: '2026-02-28 08:30', status: 'online' },
  { id: 't3', name: 'Sara', role: 'Manager', email: 'sara@unitymediaflow.com', channels: 'TechVault, FoodFlicks', lastLogin: '2026-02-28 07:45', status: 'online' },
  { id: 't4', name: 'Bilal', role: 'Finance', email: 'bilal@unitymediaflow.com', channels: 'N/A', lastLogin: '2026-02-27 18:00', status: 'offline' },
  { id: 't5', name: 'Omar', role: 'Viewer', email: 'omar@unitymediaflow.com', channels: 'N/A', lastLogin: '2026-02-26 12:00', status: 'offline' },
  { id: 't6', name: 'Fatima', role: 'Viewer', email: 'fatima@unitymediaflow.com', channels: 'N/A', lastLogin: '2026-02-25 16:30', status: 'offline' },
  { id: 't7', name: 'Hassan', role: 'Viewer', email: 'hassan@unitymediaflow.com', channels: 'N/A', lastLogin: '2026-02-24 09:00', status: 'offline' },
];

export const teamActivityLog = [
  { time: '09:15', user: 'Sardar Mohsin', action: 'Logged in to dashboard' },
  { time: '09:10', user: 'Ahmed', action: 'Published video on TrialTales' },
  { time: '08:45', user: 'Ahmed', action: 'Uploaded video to BenchDecoded' },
  { time: '08:30', user: 'Ahmed', action: 'Logged in to dashboard' },
  { time: '08:15', user: 'Sara', action: 'Started warmup session for TechVault' },
  { time: '07:45', user: 'Sara', action: 'Logged in to dashboard' },
  { time: '07:30', user: 'System', action: 'Auto-publish completed for FoodFlicks' },
  { time: '07:00', user: 'System', action: 'Daily cron jobs started' },
  { time: 'Yesterday 18:00', user: 'Bilal', action: 'Exported monthly finance report' },
  { time: 'Yesterday 17:30', user: 'Bilal', action: 'Added expense: Claude API — $120' },
  { time: 'Yesterday 16:30', user: 'Sardar Mohsin', action: 'Updated proxy for BenchDecoded' },
  { time: 'Yesterday 15:00', user: 'Ahmed', action: 'Paused LawBites channel' },
  { time: 'Yesterday 14:30', user: 'Sara', action: 'Re-queued failed video on FoodFlicks' },
  { time: 'Yesterday 12:00', user: 'System', action: 'Backup completed successfully' },
  { time: 'Yesterday 10:00', user: 'Sardar Mohsin', action: 'Added new team member: Hassan' },
];

// Chart data generators
export function generateViewsData(days: number) {
  const data = [];
  const now = new Date('2026-02-28');
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      BenchDecoded: Math.floor(25000 + Math.random() * 20000 + (days - i) * 400),
      TrialTales: Math.floor(15000 + Math.random() * 12000 + (days - i) * 200),
      VerdictVault: Math.floor(12000 + Math.random() * 8000 + (days - i) * 150),
      TechVault: Math.floor(30000 + Math.random() * 15000 + (days - i) * 300),
      FoodFlicks: Math.floor(18000 + Math.random() * 10000 + (days - i) * 250),
      LawBites: Math.floor(3000 + Math.random() * 4000 + (days - i) * 50),
    });
  }
  return data;
}

export function generateSubsData(days: number) {
  const data = [];
  const now = new Date('2026-02-28');
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      BenchDecoded: Math.floor(150 + Math.random() * 100),
      TrialTales: Math.floor(20 + Math.random() * 30),
      VerdictVault: Math.floor(80 + Math.random() * 60),
      TechVault: Math.floor(200 + Math.random() * 150),
      FoodFlicks: Math.floor(100 + Math.random() * 80),
      LawBites: Math.floor(5 + Math.random() * 15),
    });
  }
  return data;
}

export function generateRevenueData() {
  return [
    { month: 'Sep', revenue: 6200, expenses: 1800 },
    { month: 'Oct', revenue: 7800, expenses: 1950 },
    { month: 'Nov', revenue: 9100, expenses: 2100 },
    { month: 'Dec', revenue: 10500, expenses: 2200 },
    { month: 'Jan', revenue: 11200, expenses: 2280 },
    { month: 'Feb', revenue: 12847, expenses: 2340 },
  ];
}

export const topVideos = [
  { title: 'Judge DESTROYS Entitled Karen in Court', channel: 'BenchDecoded', views: 187420, ctr: 8.2, watchTime: 1240, revenue: 89.50, published: '2026-02-28', viral: true },
  { title: 'I Tested the $5000 AI Laptop', channel: 'TechVault', views: 156800, ctr: 7.1, watchTime: 2100, revenue: 124.30, published: '2026-02-28', viral: false },
  { title: '5 Minute Meals That Actually Taste AMAZING', channel: 'FoodFlicks', views: 134500, ctr: 6.8, watchTime: 890, revenue: 67.20, published: '2026-02-28', viral: false },
  { title: 'Woman Sues Neighbor Over 2 Inches of Fence', channel: 'TrialTales', views: 98700, ctr: 6.2, watchTime: 780, revenue: 45.80, published: '2026-02-28', viral: false },
  { title: 'Best Budget Phones 2026', channel: 'TechVault', views: 89300, ctr: 5.9, watchTime: 1560, revenue: 78.40, published: '2026-02-28', viral: false },
  { title: 'Top 10 Courtroom Freakouts', channel: 'VerdictVault', views: 76200, ctr: 5.5, watchTime: 650, revenue: 34.20, published: '2026-02-27', viral: false },
  { title: 'Judge Judy vs The Most Annoying Plaintiff', channel: 'TrialTales', views: 65400, ctr: 5.1, watchTime: 540, revenue: 28.90, published: '2026-02-28', viral: false },
  { title: 'This Gadget Changed My Life', channel: 'TechVault', views: 54200, ctr: 4.8, watchTime: 890, revenue: 42.10, published: '2026-02-27', viral: false },
  { title: 'Why This Murder Case SHOCKED Everyone', channel: 'LawBites', views: 25900, ctr: 4.5, watchTime: 420, revenue: 12.30, published: '2026-02-28', viral: false },
  { title: 'Criminal Tries to ESCAPE During Sentencing', channel: 'VerdictVault', views: 22100, ctr: 4.2, watchTime: 310, revenue: 9.80, published: '2026-02-26', viral: false },
];

export const channelColors: Record<string, string> = {
  BenchDecoded: '#C85000',
  TrialTales: '#1B8A5A',
  VerdictVault: '#3B82F6',
  TechVault: '#8B5CF6',
  FoodFlicks: '#EC4899',
  LawBites: '#B8860B',
};
