// ═══ UMF — UNITY MEDIA FLOW — TYPE DEFINITIONS ═══

export interface ChannelTeam {
  managerName: string;
  editorName: string;
  editorEmail: string;
  editorSalary: number;
  salaryCurrency: 'USD' | 'PKR' | 'AED';
  salaryPayDate: number;
}

export interface ChannelProxy {
  address: string;
  username: string;
  password: string;
  provider: string;
  type: 'residential' | 'datacenter' | 'mobile';
  buyDate: string;
  price: number;
  expiryDate: string;
}

export interface ShoppingProduct {
  name: string;
  link: string;
}

export interface ChannelShopping {
  enabled: boolean;
  products: ShoppingProduct[];
  category: string;
  amazonStoreId: string;
  commissionRate: number;
}

export interface VideoDefaults {
  madeForKids: boolean;
  ageRestriction: boolean;
  alteredContent: boolean;
  automaticChapters: boolean;
  featuredPlaces: boolean;
  automaticConcepts: boolean;
  captionCertification: 'None' | 'DWMRS' | 'EIA-608';
  videoLocation: string;
  license: 'Standard' | 'Creative Commons';
  shortsRemixing: boolean;
  category: string;
  commentsMode: 'All' | 'Hold for review' | 'Off';
  ratingsVisible: boolean;
  addEndScreen: boolean;
  addCards: boolean;
  abTesting: boolean;
  defaultPlaylist: string;
}

export interface Channel {
  id: string;
  name: string;
  niche: string;
  tier: 'T1' | 'T2' | 'T3' | 'T4';
  youtubeChannelId: string;
  ixProfile: string;
  ixProfileId: string;
  ixStatus: 'open' | 'closed';
  proxy: string;
  dailyLimit: number;
  videosToday: number;
  todayViews: number;
  subscribers: number;
  uploadQueue: number;
  status: 'active' | 'paused' | 'error' | 'inactive' | 'setup_required' | 'frozen';
  publishTimes: string[];
  sheetUrl: string;
  videoFolder: string;
  driveLongsFolderId: string;
  driveShortsFolderId: string;
  team: ChannelTeam;
  proxyDetails: ChannelProxy;
  shopping: ChannelShopping;
  videoDefaults: VideoDefaults;
  youtubeLogin: boolean;
  gmailLogin: boolean;
  proxyHealth: boolean;
  proxyLatency: number;
  driveAccess: boolean;
  sheetAccess: boolean;
  ixBrowserProfile: boolean;
  lastHealthCheck: string;
  monthRevenue: number;
  monthViews: number;
  totalPublished: number;
  longFormPerDay: number;
  shortsPerDay: number;
}

export type VideoStatus = 'DETECTED' | 'DOWNLOADING' | 'UPLOADING' | 'UNLISTED' | 'SCHEDULED' | 'PUBLISHED' | 'ERROR';

export interface VideoFolderFile {
  name: string;
  required: boolean;
  present: boolean;
  size?: string;
}

export interface VideoItem {
  id: string;
  channelId: string;
  channel: string;
  tier: string;
  videoType: 'Long' | 'Short';
  title: string;
  titleB?: string;
  description: string;
  tags: string[];
  folderName: string;
  status: VideoStatus;
  publishDate: string;
  publishTime: string;
  youtubeUrl?: string;
  error?: string;
  quiz?: string;
  variant?: number;
  progress?: number;
  files: VideoFolderFile[];
}

export interface ActivityItem {
  icon: string;
  message: string;
  time: string;
  channel?: string;
  type?: string;
}

export interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  channel?: string;
  type?: string;
  action: string;
}

export interface ResolvedAlert {
  id: string;
  title: string;
  resolvedAt: string;
  resolutionTime: string;
}

export interface Partner {
  id: string;
  name: string;
  title: string;
  equityPercent: number;
  allTimeEarnings: number;
  lastLogin: string;
  channelsManaged: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  channels: string;
  status: 'online' | 'offline';
  lastLogin: string;
}

export interface TeamActivityLog {
  time: string;
  user: string;
  action: string;
}

export interface TopVideo {
  title: string;
  channel: string;
  views: number;
  ctr: number;
  watchTime: number;
  revenue: number;
  viral: boolean;
}

export type RevenueSource = 'ADSENSE' | 'SPONSORSHIP' | 'AFFILIATE' | 'OTHER';

export interface RevenueEntry {
  id: string;
  date: string;
  channel: string;
  source: RevenueSource;
  amount: number;
  addedBy: string;
}

export type ExpenseCategory = 'PROXY' | 'SOFTWARE' | 'SALARY' | 'TAX' | 'OTHER';

export interface ExpenseEntry {
  id: string;
  date: string;
  channel: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  addedBy: string;
}

export interface IXBrowserProfile {
  id: string;
  profileId: string;
  name: string;
  status: 'idle' | 'open' | 'not_found';
  assignedTo?: string;
}

export interface PM2Worker {
  name: string;
  status: 'online' | 'stopped' | 'errored';
  cpu: string;
  memory: string;
  restarts: number;
  uptime: string;
}

export interface CronJob {
  name: string;
  interval: string;
  last: string;
  status: 'ok' | 'running' | 'error';
}

export interface ErrorLog {
  time: string;
  level: 'ERROR' | 'WARN' | 'INFO';
  message: string;
  channel: string;
}

export interface FinanceSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  margin: number;
}

export interface ChannelPL {
  channel: string;
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
  videos: number;
  rpm: number;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: string;
}
