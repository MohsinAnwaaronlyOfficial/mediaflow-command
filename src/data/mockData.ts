// ═══ UMF — UNITY MEDIA FLOW — PRODUCTION DATA ═══

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

export interface VideoFolderFile {
  name: string;
  required: boolean;
  present: boolean;
  size?: string;
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
  status: 'active' | 'paused' | 'error' | 'inactive' | 'setup_required';
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
  lastVideoTime: string;
}

const defaultVideoDefaults: VideoDefaults = {
  madeForKids: false, ageRestriction: false, alteredContent: true, automaticChapters: true,
  featuredPlaces: false, automaticConcepts: true, captionCertification: 'None',
  videoLocation: '', license: 'Standard', shortsRemixing: true,
  category: 'Entertainment', commentsMode: 'All', ratingsVisible: true,
  addEndScreen: true, addCards: true, abTesting: false, defaultPlaylist: '',
};

export const channels: Channel[] = [
  {
    id: 'BENCH01', name: 'BenchDecoded', niche: 'Judge / Courtroom', tier: 'T1', youtubeChannelId: 'UCxBD1234abcd',
    ixProfile: 'BD-Main', ixProfileId: 'IX-4821', ixStatus: 'open',
    proxy: '45.89.112.34:8080', dailyLimit: 2, videosToday: 1, todayViews: 187420, subscribers: 124500, uploadQueue: 3, status: 'active',
    publishTimes: ['18:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/1abc_bd', videoFolder: '/media/benchdecoded',
    driveLongsFolderId: '1xKjR_BD_Longs', driveShortsFolderId: '1xKjR_BD_Shorts',
    team: { managerName: 'Haseeb', editorName: 'Ali Raza', editorEmail: 'ali@unitymediaflow.com', editorSalary: 400, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.34:8080', username: 'bd_user', password: '••••••', provider: 'Bright Data', type: 'residential', buyDate: '2026-01-15', price: 20, expiryDate: '2026-04-15' },
    shopping: { enabled: true, products: [{ name: 'Legal Rights Handbook', link: 'https://amzn.to/bd_legal' }, { name: 'Home Security Camera', link: 'https://amzn.to/bd_cam' }], category: 'Legal Books', amazonStoreId: 'unitystore-20', commissionRate: 8 },
    videoDefaults: { ...defaultVideoDefaults, abTesting: true, defaultPlaylist: 'Judge Compilations', videoLocation: 'New York', category: 'Entertainment' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 45, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '5 min ago',
    monthRevenue: 3420, monthViews: 4200000, totalPublished: 47, longFormPerDay: 1, shortsPerDay: 3, lastVideoTime: '2h ago',
  },
  {
    id: 'BENCH02', name: 'TrialTales', niche: 'Judge / Courtroom', tier: 'T2', youtubeChannelId: 'UCxTT5678efgh',
    ixProfile: 'TT-Primary', ixProfileId: 'IX-4822', ixStatus: 'open',
    proxy: '45.89.112.35:8080', dailyLimit: 2, videosToday: 2, todayViews: 134200, subscribers: 847, uploadQueue: 1, status: 'active',
    publishTimes: ['17:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/2def_tt', videoFolder: '/media/trialtales',
    driveLongsFolderId: '1xKjR_TT_Longs', driveShortsFolderId: '1xKjR_TT_Shorts',
    team: { managerName: 'Haseeb', editorName: 'Usman Khan', editorEmail: 'usman@unitymediaflow.com', editorSalary: 35000, salaryCurrency: 'PKR', salaryPayDate: 5 },
    proxyDetails: { address: '45.89.112.35:8080', username: 'tt_user', password: '••••••', provider: 'DataImpulse', type: 'residential', buyDate: '2026-01-20', price: 15, expiryDate: '2026-04-20' },
    shopping: { enabled: false, products: [], category: '', amazonStoreId: '', commissionRate: 0 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Court Stories', category: 'Entertainment' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 62, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '5 min ago',
    monthRevenue: 890, monthViews: 1800000, totalPublished: 38, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: '1h ago',
  },
  {
    id: 'BENCH03', name: 'VerdictVault', niche: 'Judge / Courtroom', tier: 'T2', youtubeChannelId: 'UCxVV9012ijkl',
    ixProfile: 'VV-Main', ixProfileId: 'IX-4823', ixStatus: 'open',
    proxy: '45.89.112.36:8080', dailyLimit: 2, videosToday: 1, todayViews: 98340, subscribers: 67200, uploadQueue: 2, status: 'active',
    publishTimes: ['18:30'], sheetUrl: 'https://docs.google.com/spreadsheets/d/3ghi_vv', videoFolder: '/media/verdictvault',
    driveLongsFolderId: '1xKjR_VV_Longs', driveShortsFolderId: '1xKjR_VV_Shorts',
    team: { managerName: 'Haseeb', editorName: 'Hamza Malik', editorEmail: 'hamza@unitymediaflow.com', editorSalary: 350, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.36:8080', username: 'vv_user', password: '••••••', provider: 'Bright Data', type: 'datacenter', buyDate: '2026-02-01', price: 20, expiryDate: '2026-05-01' },
    shopping: { enabled: true, products: [{ name: 'Courtroom Drama Book', link: 'https://amzn.to/vv_book' }], category: 'Legal Books', amazonStoreId: 'unitystore-20', commissionRate: 7 },
    videoDefaults: { ...defaultVideoDefaults, abTesting: true, defaultPlaylist: 'Verdict Videos', category: 'Entertainment' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 38, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '5 min ago',
    monthRevenue: 2150, monthViews: 2600000, totalPublished: 35, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: '3h ago',
  },
  {
    id: 'BENCH04', name: 'GavelStrike', niche: 'Judge / Courtroom', tier: 'T3', youtubeChannelId: 'UCxGS4567mnop',
    ixProfile: 'GS-Main', ixProfileId: 'IX-4824', ixStatus: 'open',
    proxy: '45.89.112.40:8080', dailyLimit: 2, videosToday: 1, todayViews: 42100, subscribers: 18900, uploadQueue: 2, status: 'active',
    publishTimes: ['19:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/4_gs', videoFolder: '/media/gavelstrike',
    driveLongsFolderId: '1xKjR_GS_Longs', driveShortsFolderId: '1xKjR_GS_Shorts',
    team: { managerName: 'Haseeb', editorName: 'Usman Khan', editorEmail: 'usman@unitymediaflow.com', editorSalary: 0, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.40:8080', username: 'gs_user', password: '••••••', provider: 'DataImpulse', type: 'residential', buyDate: '2026-02-10', price: 15, expiryDate: '2026-05-10' },
    shopping: { enabled: false, products: [], category: '', amazonStoreId: '', commissionRate: 0 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Gavel Moments', category: 'Entertainment' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 52, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '8 min ago',
    monthRevenue: 680, monthViews: 890000, totalPublished: 24, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: '4h ago',
  },
  {
    id: 'COMEDY01', name: 'DailyLaughs', niche: 'Comedy / Funny', tier: 'T2', youtubeChannelId: 'UCxDL8901qrst',
    ixProfile: 'DL-Main', ixProfileId: 'IX-4825', ixStatus: 'open',
    proxy: '45.89.112.41:8080', dailyLimit: 3, videosToday: 2, todayViews: 156300, subscribers: 89400, uploadQueue: 5, status: 'active',
    publishTimes: ['12:00', '18:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/5_dl', videoFolder: '/media/dailylaughs',
    driveLongsFolderId: '1xKjR_DL_Longs', driveShortsFolderId: '1xKjR_DL_Shorts',
    team: { managerName: 'Waleed', editorName: 'Nadia Bashir', editorEmail: 'nadia@unitymediaflow.com', editorSalary: 1500, salaryCurrency: 'AED', salaryPayDate: 10 },
    proxyDetails: { address: '45.89.112.41:8080', username: 'dl_user', password: '••••••', provider: 'Bright Data', type: 'residential', buyDate: '2026-01-25', price: 20, expiryDate: '2026-04-25' },
    shopping: { enabled: true, products: [{ name: 'Funny T-Shirt Collection', link: 'https://amzn.to/dl_tshirt' }], category: 'Apparel', amazonStoreId: 'unitycomedy-20', commissionRate: 5 },
    videoDefaults: { ...defaultVideoDefaults, abTesting: true, defaultPlaylist: 'Funny Compilations', category: 'Comedy' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 48, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '6 min ago',
    monthRevenue: 1780, monthViews: 3400000, totalPublished: 40, longFormPerDay: 1, shortsPerDay: 3, lastVideoTime: '1h ago',
  },
  {
    id: 'COMEDY02', name: 'LOLCentral', niche: 'Comedy / Funny', tier: 'T3', youtubeChannelId: 'UCxLC2345uvwx',
    ixProfile: 'LC-Main', ixProfileId: 'IX-4826', ixStatus: 'open',
    proxy: '45.89.112.42:8080', dailyLimit: 2, videosToday: 1, todayViews: 67800, subscribers: 34500, uploadQueue: 3, status: 'active',
    publishTimes: ['17:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/6_lc', videoFolder: '/media/lolcentral',
    driveLongsFolderId: '1xKjR_LC_Longs', driveShortsFolderId: '1xKjR_LC_Shorts',
    team: { managerName: 'Waleed', editorName: 'Bilal Hussain', editorEmail: 'bilal.h@unitymediaflow.com', editorSalary: 30000, salaryCurrency: 'PKR', salaryPayDate: 5 },
    proxyDetails: { address: '45.89.112.42:8080', username: 'lc_user', password: '••••••', provider: 'DataImpulse', type: 'datacenter', buyDate: '2026-02-05', price: 12, expiryDate: '2026-05-05' },
    shopping: { enabled: false, products: [], category: '', amazonStoreId: '', commissionRate: 0 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'LOL Best Of', category: 'Comedy' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 71, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '7 min ago',
    monthRevenue: 540, monthViews: 1200000, totalPublished: 28, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: '5h ago',
  },
  {
    id: 'NEWS01', name: 'FlashNews', niche: 'News / Current Events', tier: 'T2', youtubeChannelId: 'UCxFN6789yzab',
    ixProfile: 'FN-Main', ixProfileId: 'IX-4827', ixStatus: 'open',
    proxy: '45.89.112.43:8080', dailyLimit: 4, videosToday: 3, todayViews: 245100, subscribers: 312000, uploadQueue: 4, status: 'active',
    publishTimes: ['09:00', '13:00', '18:00', '21:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/7_fn', videoFolder: '/media/flashnews',
    driveLongsFolderId: '1xKjR_FN_Longs', driveShortsFolderId: '1xKjR_FN_Shorts',
    team: { managerName: 'Haseeb', editorName: 'Zain Ahmed', editorEmail: 'zain@unitymediaflow.com', editorSalary: 500, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.43:8080', username: 'fn_user', password: '••••••', provider: 'Bright Data', type: 'residential', buyDate: '2026-01-10', price: 20, expiryDate: '2026-04-10' },
    shopping: { enabled: false, products: [], category: '', amazonStoreId: '', commissionRate: 0 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Breaking News', category: 'News & Politics' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: false, proxyLatency: 2300, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '3 min ago',
    monthRevenue: 4280, monthViews: 6800000, totalPublished: 56, longFormPerDay: 2, shortsPerDay: 4, lastVideoTime: '30 min ago',
  },
  {
    id: 'NEWS02', name: 'DailyDigest', niche: 'News / Current Events', tier: 'T3', youtubeChannelId: 'UCxDD0123cdef',
    ixProfile: 'DD-Main', ixProfileId: 'IX-4828', ixStatus: 'open',
    proxy: '45.89.112.44:8080', dailyLimit: 3, videosToday: 2, todayViews: 89200, subscribers: 45600, uploadQueue: 2, status: 'active',
    publishTimes: ['10:00', '16:00', '20:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/8_dd', videoFolder: '/media/dailydigest',
    driveLongsFolderId: '1xKjR_DD_Longs', driveShortsFolderId: '1xKjR_DD_Shorts',
    team: { managerName: 'Haseeb', editorName: 'Zain Ahmed', editorEmail: 'zain@unitymediaflow.com', editorSalary: 0, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.44:8080', username: 'dd_user', password: '••••••', provider: 'DataImpulse', type: 'datacenter', buyDate: '2026-02-01', price: 12, expiryDate: '2026-05-01' },
    shopping: { enabled: false, products: [], category: '', amazonStoreId: '', commissionRate: 0 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Daily Updates', category: 'News & Politics' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 58, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '6 min ago',
    monthRevenue: 920, monthViews: 1900000, totalPublished: 42, longFormPerDay: 2, shortsPerDay: 3, lastVideoTime: '2h ago',
  },
  {
    id: 'TECH01', name: 'TechVault', niche: 'Tech / Gadgets', tier: 'T1', youtubeChannelId: 'UCxTV3456ghij',
    ixProfile: 'TV-Main', ixProfileId: 'IX-4829', ixStatus: 'open',
    proxy: '45.89.112.45:8080', dailyLimit: 3, videosToday: 2, todayViews: 312400, subscribers: 478000, uploadQueue: 4, status: 'active',
    publishTimes: ['12:00', '18:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/9_tv', videoFolder: '/media/techvault',
    driveLongsFolderId: '1xKjR_TV_Longs', driveShortsFolderId: '1xKjR_TV_Shorts',
    team: { managerName: 'Waleed', editorName: 'Farhan Shah', editorEmail: 'farhan@unitymediaflow.com', editorSalary: 450, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.45:8080', username: 'tv_user', password: '••••••', provider: 'Bright Data', type: 'residential', buyDate: '2026-01-05', price: 20, expiryDate: '2026-04-05' },
    shopping: { enabled: true, products: [{ name: 'USB-C Hub', link: 'https://amzn.to/tv_hub' }, { name: 'Wireless Mouse', link: 'https://amzn.to/tv_mouse' }, { name: 'Monitor Light Bar', link: 'https://amzn.to/tv_light' }], category: 'Tech Gadgets', amazonStoreId: 'unitytech-20', commissionRate: 6 },
    videoDefaults: { ...defaultVideoDefaults, abTesting: true, defaultPlaylist: 'Tech Reviews', videoLocation: 'San Francisco', category: 'Science & Technology' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 32, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '4 min ago',
    monthRevenue: 5640, monthViews: 8200000, totalPublished: 52, longFormPerDay: 2, shortsPerDay: 3, lastVideoTime: '45 min ago',
  },
  {
    id: 'FOOD01', name: 'FoodFlicks', niche: 'Food / Cooking', tier: 'T2', youtubeChannelId: 'UCxFF7890klmn',
    ixProfile: 'FF-Main', ixProfileId: 'IX-4830', ixStatus: 'open',
    proxy: '45.89.112.46:8080', dailyLimit: 2, videosToday: 1, todayViews: 78400, subscribers: 56200, uploadQueue: 2, status: 'active',
    publishTimes: ['13:00', '19:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/10_ff', videoFolder: '/media/foodflicks',
    driveLongsFolderId: '1xKjR_FF_Longs', driveShortsFolderId: '1xKjR_FF_Shorts',
    team: { managerName: 'Waleed', editorName: 'Nadia Bashir', editorEmail: 'nadia@unitymediaflow.com', editorSalary: 0, salaryCurrency: 'AED', salaryPayDate: 10 },
    proxyDetails: { address: '45.89.112.46:8080', username: 'ff_user', password: '••••••', provider: 'Bright Data', type: 'mobile', buyDate: '2026-02-05', price: 20, expiryDate: '2026-05-05' },
    shopping: { enabled: true, products: [{ name: 'Kitchen Knife Set', link: 'https://amzn.to/ff_knife' }], category: 'Kitchen Tools', amazonStoreId: 'unityfood-20', commissionRate: 5 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Quick Recipes', category: 'Howto & Style' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 78, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '10 min ago',
    monthRevenue: 1480, monthViews: 2800000, totalPublished: 35, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: '1h ago',
  },
  {
    id: 'FINANCE01', name: 'MoneyMindset', niche: 'Finance / Investing', tier: 'T2', youtubeChannelId: 'UCxMM1234opqr',
    ixProfile: 'MM-Main', ixProfileId: 'IX-4831', ixStatus: 'open',
    proxy: '45.89.112.47:8080', dailyLimit: 2, videosToday: 1, todayViews: 124800, subscribers: 98700, uploadQueue: 3, status: 'active',
    publishTimes: ['17:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/11_mm', videoFolder: '/media/moneymindset',
    driveLongsFolderId: '1xKjR_MM_Longs', driveShortsFolderId: '1xKjR_MM_Shorts',
    team: { managerName: 'Waleed', editorName: 'Tariq Mehmood', editorEmail: 'tariq@unitymediaflow.com', editorSalary: 380, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.47:8080', username: 'mm_user', password: '••••••', provider: 'Bright Data', type: 'residential', buyDate: '2026-01-15', price: 20, expiryDate: '2026-04-15' },
    shopping: { enabled: true, products: [{ name: 'Rich Dad Poor Dad', link: 'https://amzn.to/mm_book1' }, { name: 'Financial Calculator', link: 'https://amzn.to/mm_calc' }], category: 'Finance Books', amazonStoreId: 'unityfin-20', commissionRate: 7 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Money Tips', category: 'Education' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 41, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '5 min ago',
    monthRevenue: 2340, monthViews: 3200000, totalPublished: 30, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: '3h ago',
  },
  {
    id: 'SCARY01', name: 'NightmareFiles', niche: 'Scary / Horror', tier: 'T2', youtubeChannelId: 'UCxNF5678stuv',
    ixProfile: 'NF-Main', ixProfileId: 'IX-4832', ixStatus: 'open',
    proxy: '45.89.112.48:8080', dailyLimit: 2, videosToday: 1, todayViews: 198700, subscribers: 142000, uploadQueue: 3, status: 'active',
    publishTimes: ['21:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/12_nf', videoFolder: '/media/nightmarefiles',
    driveLongsFolderId: '1xKjR_NF_Longs', driveShortsFolderId: '1xKjR_NF_Shorts',
    team: { managerName: 'Haseeb', editorName: 'Ali Raza', editorEmail: 'ali@unitymediaflow.com', editorSalary: 0, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.48:8080', username: 'nf_user', password: '••••••', provider: 'DataImpulse', type: 'residential', buyDate: '2026-01-20', price: 15, expiryDate: '2026-04-20' },
    shopping: { enabled: false, products: [], category: '', amazonStoreId: '', commissionRate: 0 },
    videoDefaults: { ...defaultVideoDefaults, abTesting: true, defaultPlaylist: 'True Horror Stories', category: 'Entertainment' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 55, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '4 min ago',
    monthRevenue: 3120, monthViews: 5400000, totalPublished: 32, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: 'Yesterday 9PM',
  },
  {
    id: 'MOTIVATE01', name: 'RiseDaily', niche: 'Motivation / Self-Help', tier: 'T3', youtubeChannelId: 'UCxRD9012wxyz',
    ixProfile: 'RD-Main', ixProfileId: 'IX-4833', ixStatus: 'open',
    proxy: '45.89.112.49:8080', dailyLimit: 2, videosToday: 1, todayViews: 56200, subscribers: 28400, uploadQueue: 2, status: 'active',
    publishTimes: ['06:00', '18:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/13_rd', videoFolder: '/media/risedaily',
    driveLongsFolderId: '1xKjR_RD_Longs', driveShortsFolderId: '1xKjR_RD_Shorts',
    team: { managerName: 'Waleed', editorName: 'Bilal Hussain', editorEmail: 'bilal.h@unitymediaflow.com', editorSalary: 0, salaryCurrency: 'PKR', salaryPayDate: 5 },
    proxyDetails: { address: '45.89.112.49:8080', username: 'rd_user', password: '••••••', provider: 'DataImpulse', type: 'datacenter', buyDate: '2026-02-10', price: 12, expiryDate: '2026-05-10' },
    shopping: { enabled: true, products: [{ name: 'Atomic Habits Book', link: 'https://amzn.to/rd_habits' }], category: 'Self-Help', amazonStoreId: 'unitymotiv-20', commissionRate: 6 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Morning Motivation', category: 'People & Blogs' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 65, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '9 min ago',
    monthRevenue: 620, monthViews: 1100000, totalPublished: 26, longFormPerDay: 1, shortsPerDay: 3, lastVideoTime: '6h ago',
  },
  {
    id: 'ANIMAL01', name: 'WildWatch', niche: 'Animals / Nature', tier: 'T3', youtubeChannelId: 'UCxWW3456abcd',
    ixProfile: 'WW-Main', ixProfileId: 'IX-4834', ixStatus: 'open',
    proxy: '45.89.112.50:8080', dailyLimit: 2, videosToday: 1, todayViews: 72300, subscribers: 41200, uploadQueue: 2, status: 'active',
    publishTimes: ['14:00', '20:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/14_ww', videoFolder: '/media/wildwatch',
    driveLongsFolderId: '1xKjR_WW_Longs', driveShortsFolderId: '1xKjR_WW_Shorts',
    team: { managerName: 'Haseeb', editorName: 'Hamza Malik', editorEmail: 'hamza@unitymediaflow.com', editorSalary: 0, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.50:8080', username: 'ww_user', password: '••••••', provider: 'Bright Data', type: 'residential', buyDate: '2026-01-28', price: 20, expiryDate: '2026-04-28' },
    shopping: { enabled: true, products: [{ name: 'Wildlife Camera Trap', link: 'https://amzn.to/ww_cam' }], category: 'Outdoor Gear', amazonStoreId: 'unitywild-20', commissionRate: 5 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Amazing Animals', category: 'Pets & Animals' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 82, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '8 min ago',
    monthRevenue: 890, monthViews: 1600000, totalPublished: 30, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: '4h ago',
  },
  {
    id: 'HISTORY01', name: 'PastRevealed', niche: 'History / Documentary', tier: 'T4', youtubeChannelId: 'UCxPR7890efgh',
    ixProfile: 'PR-Main', ixProfileId: 'IX-4835', ixStatus: 'closed',
    proxy: '45.89.112.51:8080', dailyLimit: 1, videosToday: 0, todayViews: 12400, subscribers: 8900, uploadQueue: 1, status: 'inactive',
    publishTimes: ['18:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/15_pr', videoFolder: '/media/pastrevealed',
    driveLongsFolderId: '1xKjR_PR_Longs', driveShortsFolderId: '1xKjR_PR_Shorts',
    team: { managerName: 'Waleed', editorName: 'Tariq Mehmood', editorEmail: 'tariq@unitymediaflow.com', editorSalary: 0, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.51:8080', username: 'pr_user', password: '••••••', provider: 'DataImpulse', type: 'datacenter', buyDate: '2026-02-15', price: 10, expiryDate: '2026-05-15' },
    shopping: { enabled: false, products: [], category: '', amazonStoreId: '', commissionRate: 0 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Hidden History', category: 'Education' },
    youtubeLogin: false, gmailLogin: true, proxyHealth: true, proxyLatency: 120, driveAccess: true, sheetAccess: true, ixBrowserProfile: false, lastHealthCheck: '15 min ago',
    monthRevenue: 145, monthViews: 280000, totalPublished: 12, longFormPerDay: 1, shortsPerDay: 0, lastVideoTime: 'Yesterday',
  },
  {
    id: 'SPORTS01', name: 'ClutchPlays', niche: 'Sports / Highlights', tier: 'T4', youtubeChannelId: 'UCxCP1234ijkl',
    ixProfile: 'CP-Main', ixProfileId: 'IX-4836', ixStatus: 'closed',
    proxy: '45.89.112.52:8080', dailyLimit: 2, videosToday: 0, todayViews: 8700, subscribers: 5200, uploadQueue: 0, status: 'setup_required',
    publishTimes: ['17:00'], sheetUrl: '', videoFolder: '/media/clutchplays',
    driveLongsFolderId: '', driveShortsFolderId: '',
    team: { managerName: 'Haseeb', editorName: 'Farhan Shah', editorEmail: 'farhan@unitymediaflow.com', editorSalary: 25000, salaryCurrency: 'PKR', salaryPayDate: 5 },
    proxyDetails: { address: '45.89.112.52:8080', username: 'cp_user', password: '••••••', provider: 'DataImpulse', type: 'residential', buyDate: '2026-02-20', price: 10, expiryDate: '2026-05-20' },
    shopping: { enabled: false, products: [], category: '', amazonStoreId: '', commissionRate: 0 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Top Plays', category: 'Sports' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 95, driveAccess: false, sheetAccess: false, ixBrowserProfile: false, lastHealthCheck: '20 min ago',
    monthRevenue: 45, monthViews: 92000, totalPublished: 8, longFormPerDay: 1, shortsPerDay: 0, lastVideoTime: '3 days ago',
  },
];

// Manager sees only their assigned channels
export const managerChannels = ['BENCH01', 'BENCH02', 'BENCH03', 'BENCH04', 'NEWS01', 'NEWS02', 'SCARY01', 'ANIMAL01'];

export type VideoStatus = 'EDITING' | 'READY_TO_UPLOAD' | 'QUEUED' | 'UPLOADING' | 'UPLOADED_UNLISTED' | 'PUBLISHED' | 'ERROR' | 'DETECTED' | 'DOWNLOADING' | 'UNLISTED' | 'SCHEDULED';

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
  videoType: 'Long' | 'Short';
  folderName: string;
  files: VideoFolderFile[];
  titleB?: string;
  thumbnailB?: boolean;
  quiz?: string;
  variant?: string;
  progress?: number;
}

function buildFiles(type: 'Long' | 'Short', hasOptionals: boolean): VideoFolderFile[] {
  const base: VideoFolderFile[] = [
    { name: 'video.mp4', required: true, present: true, size: type === 'Long' ? '245 MB' : '32 MB' },
    { name: 'title.txt', required: true, present: true, size: '0.1 KB' },
    { name: 'description.txt', required: true, present: true, size: '1.2 KB' },
    { name: 'tags.txt', required: true, present: true, size: '0.3 KB' },
  ];
  if (type === 'Long') {
    base.push({ name: 'thumbnail.jpg', required: true, present: true, size: '180 KB' });
    if (hasOptionals) {
      base.push({ name: 'title_b.txt', required: false, present: true, size: '0.1 KB' });
      base.push({ name: 'thumbnail_b.jpg', required: false, present: true, size: '175 KB' });
      base.push({ name: 'quiz.txt', required: false, present: true, size: '0.4 KB' });
    }
  } else {
    base.push({ name: 'thumbnail.jpg', required: false, present: hasOptionals, size: hasOptionals ? '120 KB' : undefined });
  }
  return base;
}

export const videoQueue: VideoItem[] = [
  // BENCH01 — BenchDecoded
  { id: 'v1', channel: 'BenchDecoded', channelId: 'BENCH01', title: 'Judge Absolutely DESTROYS Entitled Karen in Court', status: 'PUBLISHED', publishDate: '2026-03-05', publishTime: '18:00', tier: 'T1', uploadedAt: '2026-03-05 17:45', youtubeUrl: 'https://youtube.com/watch?v=bd_001', error: '', description: 'A judge delivers justice to an entitled woman who refuses to follow court orders.', tags: ['judge', 'court', 'karen', 'justice'], videoType: 'Long', folderName: 'Video_047', files: buildFiles('Long', true), titleB: 'Karen Gets DESTROYED by Judge in Epic Court Moment', thumbnailB: true, quiz: 'Q: What is contempt of court?\nA: A type of dance\nA: A cooking method\nCORRECT: Disobeying a court order', variant: 'A' },
  { id: 'v2', channel: 'BenchDecoded', channelId: 'BENCH01', title: 'Lawyer Gets CAUGHT Lying to the Judge', status: 'SCHEDULED', publishDate: '2026-03-06', publishTime: '18:00', tier: 'T1', uploadedAt: '2026-03-05 14:30', youtubeUrl: '', error: '', description: 'When a lawyer tries to deceive the judge, things go very wrong.', tags: ['lawyer', 'court', 'lying'], videoType: 'Long', folderName: 'Video_048', files: buildFiles('Long', true), titleB: 'This Lawyer LIED to the Judge — Watch What Happens', thumbnailB: true },
  { id: 'v3', channel: 'BenchDecoded', channelId: 'BENCH01', title: 'Most SAVAGE Judge Moments of 2026', status: 'UPLOADING', publishDate: '2026-03-06', publishTime: '18:00', tier: 'T1', uploadedAt: '', youtubeUrl: '', error: '', description: 'Compilation of the most intense courtroom moments.', tags: ['compilation', 'judge', 'savage'], videoType: 'Long', folderName: 'Video_049', files: buildFiles('Long', false), progress: 67 },

  // BENCH02 — TrialTales
  { id: 'v4', channel: 'TrialTales', channelId: 'BENCH02', title: 'Woman Sues Neighbor Over 2 Inches of Fence', status: 'PUBLISHED', publishDate: '2026-03-05', publishTime: '17:00', tier: 'T2', uploadedAt: '2026-03-05 16:45', youtubeUrl: 'https://youtube.com/watch?v=tt_001', error: '', description: 'A heated dispute over property lines ends up in court.', tags: ['neighbor', 'fence', 'lawsuit'], videoType: 'Long', folderName: 'Video_038', files: buildFiles('Long', false) },
  { id: 'v5', channel: 'TrialTales', channelId: 'BENCH02', title: 'Judge Judy vs The Most Annoying Plaintiff', status: 'PUBLISHED', publishDate: '2026-03-05', publishTime: '17:00', tier: 'T2', uploadedAt: '2026-03-05 16:40', youtubeUrl: 'https://youtube.com/watch?v=tt_s01', error: '', description: 'Judge handles the most difficult plaintiff ever seen in court.', tags: ['judge judy', 'plaintiff', 'annoying'], videoType: 'Short', folderName: 'Short_015', files: buildFiles('Short', false) },
  { id: 'v6', channel: 'TrialTales', channelId: 'BENCH02', title: 'Man Refuses to Pay Child Support — Judge Reacts', status: 'ERROR', publishDate: '2026-03-04', publishTime: '17:00', tier: 'T2', uploadedAt: '2026-03-04 16:30', youtubeUrl: '', error: 'Upload timeout after 3 retries. IXBrowser session crashed.', description: 'A father faces consequences for refusing court-ordered payments.', tags: ['child support', 'court'], videoType: 'Long', folderName: 'Video_037', files: buildFiles('Long', false) },

  // BENCH03 — VerdictVault
  { id: 'v7', channel: 'VerdictVault', channelId: 'BENCH03', title: 'Top 10 Courtroom Freakouts Caught on Camera', status: 'UNLISTED', publishDate: '2026-03-06', publishTime: '18:30', tier: 'T2', uploadedAt: '2026-03-05 22:00', youtubeUrl: 'https://youtube.com/watch?v=vv_001', error: '', description: 'The most dramatic courtroom moments ever filmed.', tags: ['freakout', 'courtroom', 'top10'], videoType: 'Long', folderName: 'Video_035', files: buildFiles('Long', true), variant: 'B' },
  { id: 'v8', channel: 'VerdictVault', channelId: 'BENCH03', title: 'Criminal Tries to ESCAPE During Sentencing', status: 'DETECTED', publishDate: '', publishTime: '', tier: 'T2', uploadedAt: '', youtubeUrl: '', error: '', description: 'Dramatic footage of a defendant attempting to flee the courtroom.', tags: ['escape', 'criminal', 'sentencing'], videoType: 'Long', folderName: 'Video_036', files: buildFiles('Long', false) },

  // NEWS01 — FlashNews
  { id: 'v9', channel: 'FlashNews', channelId: 'NEWS01', title: 'BREAKING: Major Policy Change Shocks the Nation', status: 'PUBLISHED', publishDate: '2026-03-05', publishTime: '09:00', tier: 'T2', uploadedAt: '2026-03-05 08:45', youtubeUrl: 'https://youtube.com/watch?v=fn_001', error: '', description: 'In-depth analysis of the latest policy announcement.', tags: ['breaking', 'news', 'policy'], videoType: 'Long', folderName: 'Video_056', files: buildFiles('Long', false) },
  { id: 'v10', channel: 'FlashNews', channelId: 'NEWS01', title: 'Top 5 Stories You Missed This Week', status: 'SCHEDULED', publishDate: '2026-03-06', publishTime: '09:00', tier: 'T2', uploadedAt: '2026-03-05 20:00', youtubeUrl: '', error: '', description: 'Weekly roundup of the biggest news stories.', tags: ['weekly', 'roundup', 'news'], videoType: 'Long', folderName: 'Video_057', files: buildFiles('Long', false) },

  // TECH01 — TechVault
  { id: 'v11', channel: 'TechVault', channelId: 'TECH01', title: 'I Tested the $5000 AI Laptop — Was It Worth It?', status: 'PUBLISHED', publishDate: '2026-03-05', publishTime: '12:00', tier: 'T1', uploadedAt: '2026-03-05 11:45', youtubeUrl: 'https://youtube.com/watch?v=tv_001', error: '', description: 'Full review of the latest AI-focused laptop.', tags: ['laptop', 'AI', 'review', 'tech'], videoType: 'Long', folderName: 'Video_052', files: buildFiles('Long', true), titleB: 'This $5000 AI Laptop is INSANE — Full Review', thumbnailB: true, variant: 'A' },
  { id: 'v12', channel: 'TechVault', channelId: 'TECH01', title: 'Best Budget Phones 2026 — You Wont Believe #1', status: 'PUBLISHED', publishDate: '2026-03-05', publishTime: '18:00', tier: 'T1', uploadedAt: '2026-03-05 17:45', youtubeUrl: 'https://youtube.com/watch?v=tv_s01', error: '', description: 'Our top picks for budget smartphones this year.', tags: ['phones', 'budget', '2026'], videoType: 'Short', folderName: 'Short_018', files: buildFiles('Short', true) },
  { id: 'v13', channel: 'TechVault', channelId: 'TECH01', title: 'Apple vs Samsung 2026 — The TRUTH', status: 'DOWNLOADING', publishDate: '', publishTime: '', tier: 'T1', uploadedAt: '', youtubeUrl: '', error: '', description: 'A deep comparison between the latest flagships.', tags: ['apple', 'samsung', 'comparison'], videoType: 'Long', folderName: 'Video_053', files: buildFiles('Long', false), progress: 34 },

  // COMEDY01 — DailyLaughs
  { id: 'v14', channel: 'DailyLaughs', channelId: 'COMEDY01', title: 'Try NOT to Laugh — Impossible Challenge', status: 'PUBLISHED', publishDate: '2026-03-05', publishTime: '12:00', tier: 'T2', uploadedAt: '2026-03-05 11:50', youtubeUrl: 'https://youtube.com/watch?v=dl_001', error: '', description: 'The ultimate try not to laugh compilation.', tags: ['funny', 'challenge', 'compilation'], videoType: 'Long', folderName: 'Video_040', files: buildFiles('Long', false) },
  { id: 'v15', channel: 'DailyLaughs', channelId: 'COMEDY01', title: 'Funniest Animal Fails 2026', status: 'QUEUED', publishDate: '2026-03-06', publishTime: '12:00', tier: 'T2', uploadedAt: '', youtubeUrl: '', error: '', description: 'Adorable and hilarious animal fail moments.', tags: ['animals', 'fails', 'funny'], videoType: 'Short', folderName: 'Short_022', files: buildFiles('Short', true) },

  // SCARY01 — NightmareFiles
  { id: 'v16', channel: 'NightmareFiles', channelId: 'SCARY01', title: '3 TRUE Horror Stories That Will Keep You Awake', status: 'PUBLISHED', publishDate: '2026-03-04', publishTime: '21:00', tier: 'T2', uploadedAt: '2026-03-04 20:45', youtubeUrl: 'https://youtube.com/watch?v=nf_001', error: '', description: 'Real horror stories submitted by viewers.', tags: ['horror', 'true stories', 'scary'], videoType: 'Long', folderName: 'Video_032', files: buildFiles('Long', true), titleB: 'These 3 TRUE Stories Will TERRIFY You', thumbnailB: true, variant: 'B' },
  { id: 'v17', channel: 'NightmareFiles', channelId: 'SCARY01', title: 'The Abandoned Hospital Nobody Talks About', status: 'UNLISTED', publishDate: '2026-03-05', publishTime: '21:00', tier: 'T2', uploadedAt: '2026-03-05 18:00', youtubeUrl: 'https://youtube.com/watch?v=nf_002', error: '', description: 'Exploring the dark history of an abandoned medical facility.', tags: ['abandoned', 'hospital', 'horror'], videoType: 'Long', folderName: 'Video_033', files: buildFiles('Long', false) },

  // FOOD01 — FoodFlicks
  { id: 'v18', channel: 'FoodFlicks', channelId: 'FOOD01', title: '5 Minute Meals That Actually Taste AMAZING', status: 'PUBLISHED', publishDate: '2026-03-05', publishTime: '13:00', tier: 'T2', uploadedAt: '2026-03-05 12:50', youtubeUrl: 'https://youtube.com/watch?v=ff_001', error: '', description: 'Quick and delicious meals anyone can make.', tags: ['cooking', 'quick meals', 'recipes'], videoType: 'Long', folderName: 'Video_035', files: buildFiles('Long', false) },

  // FINANCE01 — MoneyMindset
  { id: 'v19', channel: 'MoneyMindset', channelId: 'FINANCE01', title: 'How I Built a $10K/mo Passive Income Stream', status: 'PUBLISHED', publishDate: '2026-03-05', publishTime: '17:00', tier: 'T2', uploadedAt: '2026-03-05 16:45', youtubeUrl: 'https://youtube.com/watch?v=mm_001', error: '', description: 'Step-by-step breakdown of building passive income.', tags: ['passive income', 'finance', 'investing'], videoType: 'Long', folderName: 'Video_030', files: buildFiles('Long', false) },

  // MOTIVATE01 — RiseDaily
  { id: 'v20', channel: 'RiseDaily', channelId: 'MOTIVATE01', title: 'The Speech That Changed My Life Forever', status: 'QUEUED', publishDate: '2026-03-06', publishTime: '06:00', tier: 'T3', uploadedAt: '', youtubeUrl: '', error: '', description: 'Powerful motivational speech compilation.', tags: ['motivation', 'speech', 'inspiration'], videoType: 'Long', folderName: 'Video_026', files: buildFiles('Long', false) },
];

export const activityFeed = [
  { time: '2 min ago', message: 'BENCH01 — "Judge DESTROYS Karen" published to YouTube', type: 'publish', icon: '🚀' },
  { time: '5 min ago', message: 'TECH01 — Upload started for "Apple vs Samsung 2026"', type: 'upload', icon: '📤' },
  { time: '8 min ago', message: 'BENCH02 — "Judge Judy vs Annoying Plaintiff" published', type: 'publish', icon: '🚀' },
  { time: '12 min ago', message: 'BENCH03 — Video uploaded to YouTube (unlisted)', type: 'upload', icon: '📤' },
  { time: '15 min ago', message: 'FOOD01 — "5 Minute Meals" published successfully', type: 'publish', icon: '🚀' },
  { time: '22 min ago', message: 'SCARY01 — Video uploaded to YouTube (unlisted)', type: 'upload', icon: '📤' },
  { time: '30 min ago', message: 'NEWS01 — "BREAKING: Major Policy Change" published', type: 'publish', icon: '🚀' },
  { time: '35 min ago', message: 'TECH01 — "Best Budget Phones 2026" short published', type: 'publish', icon: '🚀' },
  { time: '42 min ago', message: 'System — Daily backup completed successfully', type: 'system', icon: '✅' },
  { time: '1 hr ago', message: 'BENCH02 — Upload failed — "Child Support" video (3 retries)', type: 'error', icon: '⚠️' },
  { time: '1.5 hr ago', message: 'FINANCE01 — "Passive Income" published to YouTube', type: 'publish', icon: '🚀' },
  { time: '2 hr ago', message: 'NEWS01 — Proxy latency spiked to 2.3s', type: 'error', icon: '⚠️' },
  { time: '3 hr ago', message: 'System — Cron scheduler restarted automatically', type: 'system', icon: '🔄' },
  { time: '4 hr ago', message: 'COMEDY01 — "Try NOT to Laugh" published', type: 'publish', icon: '🚀' },
  { time: '5 hr ago', message: 'ANIMAL01 — New video detected in Drive folder', type: 'upload', icon: '📥' },
];

export const alerts = [
  { id: 'a1', severity: 'critical' as const, type: 'health', channel: 'NEWS01', title: 'FlashNews proxy latency critical (2.3s)', description: 'NEWS01 proxy at 45.89.112.43 showing 2300ms latency. Videos may fail to upload. Consider switching provider.', time: '2 hr ago', action: 'Check Proxy' },
  { id: 'a2', severity: 'critical' as const, type: 'upload', channel: 'BENCH02', title: 'Upload failed 3x on TrialTales', description: 'Video "Man Refuses to Pay Child Support" failed upload 3 times. IXBrowser session crashed during upload process.', time: '1 hr ago', action: 'Review' },
  { id: 'a3', severity: 'warning' as const, type: 'health', channel: 'HISTORY01', title: 'PastRevealed — YouTube login expired', description: 'HISTORY01 YouTube login session has expired. Channel cannot upload until re-authenticated via IXBrowser.', time: '3 hr ago', action: 'Re-login' },
  { id: 'a4', severity: 'warning' as const, type: 'health', channel: 'SPORTS01', title: 'ClutchPlays — Setup incomplete', description: 'SPORTS01 is missing Drive folder and Google Sheet configuration. Channel cannot operate.', time: '5 hr ago', action: 'Setup' },
  { id: 'a5', severity: 'warning' as const, type: 'finance', channel: '', title: 'IXBrowser subscription renews in 12 days', description: 'IXBrowser subscription ($49/mo) renews on March 17, 2026. Ensure payment method is up to date.', time: '6 hr ago', action: 'Reminder Set' },
  { id: 'a6', severity: 'info' as const, type: 'upload', channel: 'BENCH01', title: 'BenchDecoded video going viral', description: '"Judge DESTROYS Entitled Karen" is performing 3.2x above normal with 187,420 views today.', time: '2 hr ago', action: 'View' },
  { id: 'a7', severity: 'info' as const, type: 'health', channel: 'BENCH02', title: 'TrialTales approaching YPP threshold', description: 'TrialTales has reached 847/1000 subscribers. Only 153 more needed for YouTube Partner Program eligibility.', time: '8 hr ago', action: 'View Stats' },
  { id: 'a8', severity: 'warning' as const, type: 'finance', channel: '', title: 'Nadia Bashir salary unpaid (Feb)', description: 'Editor Nadia Bashir (DailyLaughs, FoodFlicks) AED 1,500 salary for February still marked unpaid. Pay date was 10th.', time: '1 day ago', action: 'Process' },
];

export const resolvedAlerts = [
  { id: 'ra1', title: 'TechVault proxy renewed successfully', resolvedAt: '2026-03-03 14:30', resolutionTime: '2 hours' },
  { id: 'ra2', title: 'FoodFlicks upload error fixed (retry worked)', resolvedAt: '2026-03-03 10:15', resolutionTime: '45 min' },
  { id: 'ra3', title: 'Redis connection restored', resolvedAt: '2026-03-02 22:00', resolutionTime: '12 min' },
  { id: 'ra4', title: 'BenchDecoded daily limit reached — auto-paused', resolvedAt: '2026-03-02 16:00', resolutionTime: 'Auto' },
  { id: 'ra5', title: 'VPS disk usage cleaned below 80%', resolvedAt: '2026-03-01 09:30', resolutionTime: '1 hour' },
  { id: 'ra6', title: 'TrialTales warmup timeout — resolved on retry', resolvedAt: '2026-03-01 08:00', resolutionTime: '30 min' },
  { id: 'ra7', title: 'Google API rate limit — auto-backoff worked', resolvedAt: '2026-02-28 19:45', resolutionTime: '15 min' },
  { id: 'ra8', title: 'Cron job failed — publish worker restarted', resolvedAt: '2026-02-28 14:20', resolutionTime: '5 min' },
  { id: 'ra9', title: 'IXBrowser profile #4824 corrupted — rebuilt', resolvedAt: '2026-02-27 11:00', resolutionTime: '3 hours' },
  { id: 'ra10', title: 'WhatsApp notification API failure', resolvedAt: '2026-02-27 07:30', resolutionTime: '20 min' },
];

export const teamMembers = [
  { id: 't1', name: 'Sardar Mohsin', role: 'Owner', email: 'mohsin@unitymediaflow.com', channels: 'All Channels (16)', lastLogin: '2026-03-05 09:15', status: 'online' },
  { id: 't2', name: 'Haseeb', role: 'Manager', email: 'haseeb@unitymediaflow.com', channels: 'BENCH01-04, NEWS01-02, SCARY01, ANIMAL01', lastLogin: '2026-03-05 08:30', status: 'online' },
  { id: 't3', name: 'Waleed', role: 'Manager', email: 'waleed@unitymediaflow.com', channels: 'COMEDY01-02, TECH01, FOOD01, FINANCE01, MOTIVATE01, HISTORY01, SPORTS01', lastLogin: '2026-03-05 07:45', status: 'online' },
  { id: 't4', name: 'Mudassir', role: 'Finance', email: 'mudassir@unitymediaflow.com', channels: 'N/A — Finance oversight', lastLogin: '2026-03-04 18:00', status: 'offline' },
];

export const teamActivityLog = [
  { time: '09:15', user: 'Sardar Mohsin', action: 'Logged in to dashboard' },
  { time: '09:10', user: 'Haseeb', action: 'Published video on TrialTales' },
  { time: '08:45', user: 'Haseeb', action: 'Uploaded video to BenchDecoded' },
  { time: '08:30', user: 'Haseeb', action: 'Logged in to dashboard' },
  { time: '08:15', user: 'Waleed', action: 'Started warmup session for TechVault' },
  { time: '07:45', user: 'Waleed', action: 'Logged in to dashboard' },
  { time: '07:30', user: 'System', action: 'Auto-publish completed for FoodFlicks' },
  { time: '07:00', user: 'System', action: 'Daily cron jobs started' },
  { time: 'Yesterday 18:00', user: 'Mudassir', action: 'Exported monthly finance report' },
  { time: 'Yesterday 17:30', user: 'Mudassir', action: 'Added expense: Claude API — $120' },
  { time: 'Yesterday 16:30', user: 'Sardar Mohsin', action: 'Updated proxy for NEWS01' },
  { time: 'Yesterday 15:00', user: 'Waleed', action: 'Paused HISTORY01 channel' },
  { time: 'Yesterday 14:30', user: 'Haseeb', action: 'Re-queued failed video on TrialTales' },
  { time: 'Yesterday 12:00', user: 'System', action: 'Backup completed successfully' },
  { time: 'Yesterday 10:00', user: 'Sardar Mohsin', action: 'Added SPORTS01 channel (setup pending)' },
];

// ═══ CHART DATA ═══

export function generateViewsData(days: number) {
  const data = [];
  const now = new Date('2026-03-05');
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      BenchDecoded: Math.floor(35000 + Math.random() * 25000 + (days - i) * 500),
      TrialTales: Math.floor(8000 + Math.random() * 6000 + (days - i) * 100),
      VerdictVault: Math.floor(20000 + Math.random() * 12000 + (days - i) * 200),
      FlashNews: Math.floor(40000 + Math.random() * 20000 + (days - i) * 400),
      TechVault: Math.floor(50000 + Math.random() * 30000 + (days - i) * 600),
      DailyLaughs: Math.floor(25000 + Math.random() * 15000 + (days - i) * 300),
      NightmareFiles: Math.floor(30000 + Math.random() * 18000 + (days - i) * 350),
      FoodFlicks: Math.floor(18000 + Math.random() * 10000 + (days - i) * 200),
      MoneyMindset: Math.floor(22000 + Math.random() * 12000 + (days - i) * 250),
    });
  }
  return data;
}

export function generateSubsData(days: number) {
  const data = [];
  const now = new Date('2026-03-05');
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      BenchDecoded: Math.floor(180 + Math.random() * 120),
      TrialTales: Math.floor(15 + Math.random() * 20),
      VerdictVault: Math.floor(90 + Math.random() * 70),
      FlashNews: Math.floor(250 + Math.random() * 180),
      TechVault: Math.floor(320 + Math.random() * 200),
      DailyLaughs: Math.floor(120 + Math.random() * 90),
      NightmareFiles: Math.floor(150 + Math.random() * 100),
      FoodFlicks: Math.floor(80 + Math.random() * 60),
      MoneyMindset: Math.floor(100 + Math.random() * 80),
    });
  }
  return data;
}

export function generateRevenueData() {
  return [
    { month: 'Sep', revenue: 8200, expenses: 2400 },
    { month: 'Oct', revenue: 11800, expenses: 2800 },
    { month: 'Nov', revenue: 15100, expenses: 3100 },
    { month: 'Dec', revenue: 18500, expenses: 3400 },
    { month: 'Jan', revenue: 21200, expenses: 3600 },
    { month: 'Feb', revenue: 24847, expenses: 3800 },
  ];
}

export const topVideos = [
  { title: 'Judge DESTROYS Entitled Karen in Court', channel: 'BenchDecoded', views: 187420, ctr: 8.2, watchTime: 1240, revenue: 89.50, published: '2026-03-05', viral: true },
  { title: 'BREAKING: Major Policy Change Shocks the Nation', channel: 'FlashNews', views: 245100, ctr: 7.8, watchTime: 890, revenue: 156.30, published: '2026-03-05', viral: true },
  { title: 'I Tested the $5000 AI Laptop', channel: 'TechVault', views: 312400, ctr: 7.1, watchTime: 2100, revenue: 224.30, published: '2026-03-05', viral: false },
  { title: '3 TRUE Horror Stories That Will Keep You Awake', channel: 'NightmareFiles', views: 198700, ctr: 6.9, watchTime: 1560, revenue: 134.20, published: '2026-03-04', viral: false },
  { title: 'Try NOT to Laugh — Impossible Challenge', channel: 'DailyLaughs', views: 156300, ctr: 6.8, watchTime: 780, revenue: 87.40, published: '2026-03-05', viral: false },
  { title: 'How I Built a $10K/mo Passive Income', channel: 'MoneyMindset', views: 124800, ctr: 6.5, watchTime: 1890, revenue: 98.70, published: '2026-03-05', viral: false },
  { title: '5 Minute Meals That Actually Taste AMAZING', channel: 'FoodFlicks', views: 78400, ctr: 6.2, watchTime: 650, revenue: 45.80, published: '2026-03-05', viral: false },
  { title: 'Top 10 Courtroom Freakouts', channel: 'VerdictVault', views: 98340, ctr: 5.9, watchTime: 780, revenue: 52.30, published: '2026-03-05', viral: false },
  { title: 'Woman Sues Neighbor Over 2 Inches of Fence', channel: 'TrialTales', views: 134200, ctr: 5.5, watchTime: 540, revenue: 38.90, published: '2026-03-05', viral: false },
  { title: 'The Speech That Changed My Life Forever', channel: 'RiseDaily', views: 56200, ctr: 5.1, watchTime: 420, revenue: 22.10, published: '2026-03-04', viral: false },
];

export const channelColors: Record<string, string> = {
  BenchDecoded: '#C85000',
  TrialTales: '#1B8A5A',
  VerdictVault: '#3B82F6',
  GavelStrike: '#8B5CF6',
  DailyLaughs: '#EC4899',
  LOLCentral: '#F472B6',
  FlashNews: '#EF4444',
  DailyDigest: '#F97316',
  TechVault: '#6366F1',
  FoodFlicks: '#10B981',
  MoneyMindset: '#F59E0B',
  NightmareFiles: '#7C3AED',
  RiseDaily: '#14B8A6',
  WildWatch: '#22C55E',
  PastRevealed: '#A78BFA',
  ClutchPlays: '#FB923C',
};

// ═══ CXO FINANCE DATA ═══

export interface MonthlyRevenue {
  channelId: string;
  channelName: string;
  month: string;
  revenue: number;
  views: number;
  subsGained: number;
  videosPublished: number;
}

export interface SalaryPayment {
  channelId: string;
  editorName: string;
  amount: number;
  currency: string;
  month: string;
  payDate: number;
  paid: boolean;
}

export interface ProxyCost {
  channelId: string;
  channelName: string;
  provider: string;
  amount: number;
  buyDate: string;
  expiryDate: string;
  daysLeft: number;
}

export interface ShoppingEvent {
  channelId: string;
  channelName: string;
  videoFolder: string;
  productName: string;
  productLink: string;
  addedAt: string;
  estimatedCommission: number;
}

export interface MonthlySummary {
  month: string;
  totalRevenue: number;
  totalSalaryCost: number;
  totalProxyCost: number;
  grossProfit: number;
  marginPct: number;
  videosProduced: number;
  topChannel: string;
}

export const monthlyRevenueData: MonthlyRevenue[] = [
  // Feb 2026
  { channelId: 'BENCH01', channelName: 'BenchDecoded', month: '2026-02', revenue: 3420, views: 4200000, subsGained: 4200, videosPublished: 42 },
  { channelId: 'BENCH02', channelName: 'TrialTales', month: '2026-02', revenue: 890, views: 1800000, subsGained: 680, videosPublished: 38 },
  { channelId: 'BENCH03', channelName: 'VerdictVault', month: '2026-02', revenue: 2150, views: 2600000, subsGained: 2100, videosPublished: 35 },
  { channelId: 'BENCH04', channelName: 'GavelStrike', month: '2026-02', revenue: 680, views: 890000, subsGained: 520, videosPublished: 24 },
  { channelId: 'COMEDY01', channelName: 'DailyLaughs', month: '2026-02', revenue: 1780, views: 3400000, subsGained: 2800, videosPublished: 40 },
  { channelId: 'COMEDY02', channelName: 'LOLCentral', month: '2026-02', revenue: 540, views: 1200000, subsGained: 680, videosPublished: 28 },
  { channelId: 'NEWS01', channelName: 'FlashNews', month: '2026-02', revenue: 4280, views: 6800000, subsGained: 5400, videosPublished: 56 },
  { channelId: 'NEWS02', channelName: 'DailyDigest', month: '2026-02', revenue: 920, views: 1900000, subsGained: 890, videosPublished: 42 },
  { channelId: 'TECH01', channelName: 'TechVault', month: '2026-02', revenue: 5640, views: 8200000, subsGained: 6800, videosPublished: 52 },
  { channelId: 'FOOD01', channelName: 'FoodFlicks', month: '2026-02', revenue: 1480, views: 2800000, subsGained: 1900, videosPublished: 35 },
  { channelId: 'FINANCE01', channelName: 'MoneyMindset', month: '2026-02', revenue: 2340, views: 3200000, subsGained: 2400, videosPublished: 30 },
  { channelId: 'SCARY01', channelName: 'NightmareFiles', month: '2026-02', revenue: 3120, views: 5400000, subsGained: 3200, videosPublished: 32 },
  { channelId: 'MOTIVATE01', channelName: 'RiseDaily', month: '2026-02', revenue: 620, views: 1100000, subsGained: 580, videosPublished: 26 },
  { channelId: 'ANIMAL01', channelName: 'WildWatch', month: '2026-02', revenue: 890, views: 1600000, subsGained: 720, videosPublished: 30 },
  { channelId: 'HISTORY01', channelName: 'PastRevealed', month: '2026-02', revenue: 145, views: 280000, subsGained: 120, videosPublished: 12 },
  { channelId: 'SPORTS01', channelName: 'ClutchPlays', month: '2026-02', revenue: 45, views: 92000, subsGained: 45, videosPublished: 8 },
  // Jan 2026
  { channelId: 'BENCH01', channelName: 'BenchDecoded', month: '2026-01', revenue: 3100, views: 3800000, subsGained: 3800, videosPublished: 40 },
  { channelId: 'BENCH02', channelName: 'TrialTales', month: '2026-01', revenue: 420, views: 900000, subsGained: 320, videosPublished: 30 },
  { channelId: 'BENCH03', channelName: 'VerdictVault', month: '2026-01', revenue: 1950, views: 2300000, subsGained: 1800, videosPublished: 32 },
  { channelId: 'BENCH04', channelName: 'GavelStrike', month: '2026-01', revenue: 480, views: 620000, subsGained: 380, videosPublished: 20 },
  { channelId: 'COMEDY01', channelName: 'DailyLaughs', month: '2026-01', revenue: 1540, views: 2900000, subsGained: 2400, videosPublished: 36 },
  { channelId: 'COMEDY02', channelName: 'LOLCentral', month: '2026-01', revenue: 380, views: 850000, subsGained: 420, videosPublished: 22 },
  { channelId: 'NEWS01', channelName: 'FlashNews', month: '2026-01', revenue: 3950, views: 6200000, subsGained: 4800, videosPublished: 52 },
  { channelId: 'NEWS02', channelName: 'DailyDigest', month: '2026-01', revenue: 720, views: 1500000, subsGained: 680, videosPublished: 38 },
  { channelId: 'TECH01', channelName: 'TechVault', month: '2026-01', revenue: 4800, views: 7200000, subsGained: 5600, videosPublished: 48 },
  { channelId: 'FOOD01', channelName: 'FoodFlicks', month: '2026-01', revenue: 1200, views: 2400000, subsGained: 1600, videosPublished: 32 },
  { channelId: 'FINANCE01', channelName: 'MoneyMindset', month: '2026-01', revenue: 1980, views: 2800000, subsGained: 2000, videosPublished: 28 },
  { channelId: 'SCARY01', channelName: 'NightmareFiles', month: '2026-01', revenue: 2680, views: 4800000, subsGained: 2800, videosPublished: 28 },
  { channelId: 'MOTIVATE01', channelName: 'RiseDaily', month: '2026-01', revenue: 450, views: 820000, subsGained: 420, videosPublished: 22 },
  { channelId: 'ANIMAL01', channelName: 'WildWatch', month: '2026-01', revenue: 680, views: 1200000, subsGained: 560, videosPublished: 26 },
  { channelId: 'HISTORY01', channelName: 'PastRevealed', month: '2026-01', revenue: 120, views: 220000, subsGained: 90, videosPublished: 10 },
  { channelId: 'SPORTS01', channelName: 'ClutchPlays', month: '2026-01', revenue: 20, views: 45000, subsGained: 20, videosPublished: 4 },
];

export const salaryPayments: SalaryPayment[] = [
  { channelId: 'BENCH01', editorName: 'Ali Raza', amount: 400, currency: 'USD', month: '2026-02', payDate: 1, paid: true },
  { channelId: 'BENCH02', editorName: 'Usman Khan', amount: 35000, currency: 'PKR', month: '2026-02', payDate: 5, paid: true },
  { channelId: 'BENCH03', editorName: 'Hamza Malik', amount: 350, currency: 'USD', month: '2026-02', payDate: 1, paid: true },
  { channelId: 'NEWS01', editorName: 'Zain Ahmed', amount: 500, currency: 'USD', month: '2026-02', payDate: 1, paid: true },
  { channelId: 'COMEDY01', editorName: 'Nadia Bashir', amount: 1500, currency: 'AED', month: '2026-02', payDate: 10, paid: false },
  { channelId: 'COMEDY02', editorName: 'Bilal Hussain', amount: 30000, currency: 'PKR', month: '2026-02', payDate: 5, paid: true },
  { channelId: 'TECH01', editorName: 'Farhan Shah', amount: 450, currency: 'USD', month: '2026-02', payDate: 1, paid: true },
  { channelId: 'FINANCE01', editorName: 'Tariq Mehmood', amount: 380, currency: 'USD', month: '2026-02', payDate: 1, paid: true },
  { channelId: 'SPORTS01', editorName: 'Farhan Shah', amount: 25000, currency: 'PKR', month: '2026-02', payDate: 5, paid: true },
];

export const proxyCosts: ProxyCost[] = [
  { channelId: 'BENCH01', channelName: 'BenchDecoded', provider: 'Bright Data', amount: 20, buyDate: '2026-01-15', expiryDate: '2026-04-15', daysLeft: 41 },
  { channelId: 'BENCH02', channelName: 'TrialTales', provider: 'DataImpulse', amount: 15, buyDate: '2026-01-20', expiryDate: '2026-04-20', daysLeft: 46 },
  { channelId: 'BENCH03', channelName: 'VerdictVault', provider: 'Bright Data', amount: 20, buyDate: '2026-02-01', expiryDate: '2026-05-01', daysLeft: 57 },
  { channelId: 'BENCH04', channelName: 'GavelStrike', provider: 'DataImpulse', amount: 15, buyDate: '2026-02-10', expiryDate: '2026-05-10', daysLeft: 66 },
  { channelId: 'COMEDY01', channelName: 'DailyLaughs', provider: 'Bright Data', amount: 20, buyDate: '2026-01-25', expiryDate: '2026-04-25', daysLeft: 51 },
  { channelId: 'COMEDY02', channelName: 'LOLCentral', provider: 'DataImpulse', amount: 12, buyDate: '2026-02-05', expiryDate: '2026-05-05', daysLeft: 61 },
  { channelId: 'NEWS01', channelName: 'FlashNews', provider: 'Bright Data', amount: 20, buyDate: '2026-01-10', expiryDate: '2026-04-10', daysLeft: 36 },
  { channelId: 'NEWS02', channelName: 'DailyDigest', provider: 'DataImpulse', amount: 12, buyDate: '2026-02-01', expiryDate: '2026-05-01', daysLeft: 57 },
  { channelId: 'TECH01', channelName: 'TechVault', provider: 'Bright Data', amount: 20, buyDate: '2026-01-05', expiryDate: '2026-04-05', daysLeft: 31 },
  { channelId: 'FOOD01', channelName: 'FoodFlicks', provider: 'Bright Data', amount: 20, buyDate: '2026-02-05', expiryDate: '2026-05-05', daysLeft: 61 },
  { channelId: 'FINANCE01', channelName: 'MoneyMindset', provider: 'Bright Data', amount: 20, buyDate: '2026-01-15', expiryDate: '2026-04-15', daysLeft: 41 },
  { channelId: 'SCARY01', channelName: 'NightmareFiles', provider: 'DataImpulse', amount: 15, buyDate: '2026-01-20', expiryDate: '2026-04-20', daysLeft: 46 },
  { channelId: 'MOTIVATE01', channelName: 'RiseDaily', provider: 'DataImpulse', amount: 12, buyDate: '2026-02-10', expiryDate: '2026-05-10', daysLeft: 66 },
  { channelId: 'ANIMAL01', channelName: 'WildWatch', provider: 'Bright Data', amount: 20, buyDate: '2026-01-28', expiryDate: '2026-04-28', daysLeft: 54 },
  { channelId: 'HISTORY01', channelName: 'PastRevealed', provider: 'DataImpulse', amount: 10, buyDate: '2026-02-15', expiryDate: '2026-05-15', daysLeft: 71 },
  { channelId: 'SPORTS01', channelName: 'ClutchPlays', provider: 'DataImpulse', amount: 10, buyDate: '2026-02-20', expiryDate: '2026-05-20', daysLeft: 76 },
];

export const shoppingEvents: ShoppingEvent[] = [
  { channelId: 'BENCH01', channelName: 'BenchDecoded', videoFolder: 'Video_047', productName: 'Legal Rights Handbook', productLink: 'https://amzn.to/bd_legal', addedAt: '2026-03-05 17:45', estimatedCommission: 2.40 },
  { channelId: 'BENCH01', channelName: 'BenchDecoded', videoFolder: 'Video_048', productName: 'Home Security Camera', productLink: 'https://amzn.to/bd_cam', addedAt: '2026-03-05 14:30', estimatedCommission: 4.80 },
  { channelId: 'BENCH03', channelName: 'VerdictVault', videoFolder: 'Video_035', productName: 'Courtroom Drama Book', productLink: 'https://amzn.to/vv_book', addedAt: '2026-03-05 22:00', estimatedCommission: 1.96 },
  { channelId: 'TECH01', channelName: 'TechVault', videoFolder: 'Video_052', productName: 'USB-C Hub', productLink: 'https://amzn.to/tv_hub', addedAt: '2026-03-05 11:45', estimatedCommission: 1.80 },
  { channelId: 'TECH01', channelName: 'TechVault', videoFolder: 'Video_052', productName: 'Wireless Mouse', productLink: 'https://amzn.to/tv_mouse', addedAt: '2026-03-05 11:45', estimatedCommission: 1.50 },
  { channelId: 'TECH01', channelName: 'TechVault', videoFolder: 'Video_053', productName: 'Monitor Light Bar', productLink: 'https://amzn.to/tv_light', addedAt: '2026-03-05 08:00', estimatedCommission: 2.10 },
  { channelId: 'FOOD01', channelName: 'FoodFlicks', videoFolder: 'Video_035', productName: 'Kitchen Knife Set', productLink: 'https://amzn.to/ff_knife', addedAt: '2026-03-05 12:50', estimatedCommission: 3.25 },
  { channelId: 'FINANCE01', channelName: 'MoneyMindset', videoFolder: 'Video_030', productName: 'Rich Dad Poor Dad', productLink: 'https://amzn.to/mm_book1', addedAt: '2026-03-05 16:45', estimatedCommission: 1.40 },
  { channelId: 'COMEDY01', channelName: 'DailyLaughs', videoFolder: 'Video_040', productName: 'Funny T-Shirt Collection', productLink: 'https://amzn.to/dl_tshirt', addedAt: '2026-03-05 11:50', estimatedCommission: 2.80 },
];

export const monthlySummaries: MonthlySummary[] = [
  { month: '2026-02', totalRevenue: 28940, totalSalaryCost: 3180, totalProxyCost: 261, grossProfit: 25499, marginPct: 88.1, videosProduced: 480, topChannel: 'TechVault' },
  { month: '2026-01', totalRevenue: 24470, totalSalaryCost: 3180, totalProxyCost: 261, grossProfit: 21029, marginPct: 85.9, videosProduced: 416, topChannel: 'TechVault' },
  { month: '2025-12', totalRevenue: 18500, totalSalaryCost: 2800, totalProxyCost: 220, grossProfit: 15480, marginPct: 83.7, videosProduced: 365, topChannel: 'BenchDecoded' },
  { month: '2025-11', totalRevenue: 15100, totalSalaryCost: 2600, totalProxyCost: 200, grossProfit: 12300, marginPct: 81.5, videosProduced: 320, topChannel: 'BenchDecoded' },
  { month: '2025-10', totalRevenue: 11800, totalSalaryCost: 2200, totalProxyCost: 180, grossProfit: 9420, marginPct: 79.8, videosProduced: 280, topChannel: 'BenchDecoded' },
  { month: '2025-09', totalRevenue: 8200, totalSalaryCost: 1800, totalProxyCost: 150, grossProfit: 6250, marginPct: 76.2, videosProduced: 220, topChannel: 'BenchDecoded' },
];

export const ytdSummary = {
  totalRevenue: 107010,
  totalCosts: 16830,
  totalProfit: 90180,
  totalVideos: 2081,
  channelsActive: 14,
  avgRevenuePerVideo: 51.42,
  growthPct: 18.4,
};

export const productionReport = channels.map(ch => ({
  channelId: ch.id,
  channelName: ch.name,
  longsThisWeek: Math.floor(Math.random() * 8) + 3,
  shortsThisWeek: Math.floor(Math.random() * 5) + 1,
  longsThisMonth: Math.floor(Math.random() * 20) + 15,
  shortsThisMonth: Math.floor(Math.random() * 15) + 5,
  editorName: ch.team.editorName,
  editorOutput: Math.floor(Math.random() * 10) + 8,
}));

export const youtubeCategories = [
  'Entertainment', 'Education', 'Science & Technology', 'Howto & Style', 'News & Politics',
  'People & Blogs', 'Comedy', 'Film & Animation', 'Music', 'Sports', 'Gaming',
  'Autos & Vehicles', 'Pets & Animals', 'Travel & Events',
];

// ═══ FINANCE MODULE DATA ═══

export interface Partner {
  id: string;
  name: string;
  title: string;
  equityPercent: number;
  role: string;
  allTimeEarnings: number;
  lastLogin: string;
  channelsManaged: number;
}

export const partners: Partner[] = [
  { id: 'p1', name: 'Mohsin', title: 'Founder & CEO', equityPercent: 40, role: 'Overall company strategy, growth, key decisions, partnerships', allTimeEarnings: 36072, lastLogin: '2 min ago', channelsManaged: 16 },
  { id: 'p2', name: 'Mudassir', title: 'Partner & CFO', equityPercent: 40, role: 'Finance ownership: budgeting, expense controls, reporting, profitability', allTimeEarnings: 36072, lastLogin: '1h ago', channelsManaged: 16 },
  { id: 'p3', name: 'Haseeb', title: 'Head of Production', equityPercent: 10, role: 'Manages editors team, workflow, delivery, quality control', allTimeEarnings: 9018, lastLogin: '3h ago', channelsManaged: 8 },
  { id: 'p4', name: 'Waleed', title: 'Head of Strategy & Research', equityPercent: 10, role: 'Research, channel strategy, optimization frameworks, content systems', allTimeEarnings: 9018, lastLogin: 'Yesterday', channelsManaged: 8 },
];

export interface ChannelPartnership {
  id: string;
  channelId: string;
  channelName: string;
  partnerId: string;
  partnerName: string;
  partnerSharePercent: number;
  companySharePercent: number;
  startMonth: string;
  endMonth: string | null;
}

export const channelPartnerships: ChannelPartnership[] = [
  { id: 'cp1', channelId: 'BENCH01', channelName: 'BenchDecoded', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-06', endMonth: null },
  { id: 'cp2', channelId: 'BENCH02', channelName: 'TrialTales', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-08', endMonth: null },
  { id: 'cp3', channelId: 'BENCH03', channelName: 'VerdictVault', partnerId: 'p4', partnerName: 'Waleed', partnerSharePercent: 80, companySharePercent: 20, startMonth: '2025-09', endMonth: null },
  { id: 'cp4', channelId: 'BENCH04', channelName: 'GavelStrike', partnerId: 'p3', partnerName: 'Haseeb', partnerSharePercent: 70, companySharePercent: 30, startMonth: '2025-11', endMonth: null },
  { id: 'cp5', channelId: 'COMEDY01', channelName: 'DailyLaughs', partnerId: 'p3', partnerName: 'Haseeb', partnerSharePercent: 70, companySharePercent: 30, startMonth: '2025-10', endMonth: null },
  { id: 'cp6', channelId: 'COMEDY02', channelName: 'LOLCentral', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-12', endMonth: null },
  { id: 'cp7', channelId: 'NEWS01', channelName: 'FlashNews', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-07', endMonth: null },
  { id: 'cp8', channelId: 'NEWS02', channelName: 'DailyDigest', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-11', endMonth: null },
  { id: 'cp9', channelId: 'TECH01', channelName: 'TechVault', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-07', endMonth: null },
  { id: 'cp10', channelId: 'FOOD01', channelName: 'FoodFlicks', partnerId: 'p3', partnerName: 'Haseeb', partnerSharePercent: 70, companySharePercent: 30, startMonth: '2025-10', endMonth: null },
  { id: 'cp11', channelId: 'FINANCE01', channelName: 'MoneyMindset', partnerId: 'p4', partnerName: 'Waleed', partnerSharePercent: 80, companySharePercent: 20, startMonth: '2025-09', endMonth: null },
  { id: 'cp12', channelId: 'SCARY01', channelName: 'NightmareFiles', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-08', endMonth: null },
  { id: 'cp13', channelId: 'MOTIVATE01', channelName: 'RiseDaily', partnerId: 'p4', partnerName: 'Waleed', partnerSharePercent: 80, companySharePercent: 20, startMonth: '2026-01', endMonth: null },
  { id: 'cp14', channelId: 'ANIMAL01', channelName: 'WildWatch', partnerId: 'p3', partnerName: 'Haseeb', partnerSharePercent: 70, companySharePercent: 30, startMonth: '2025-11', endMonth: null },
  { id: 'cp15', channelId: 'HISTORY01', channelName: 'PastRevealed', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2026-01', endMonth: null },
  { id: 'cp16', channelId: 'SPORTS01', channelName: 'ClutchPlays', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2026-02', endMonth: null },
];

export type ExpenseCategory = 'EDITOR_SALARY' | 'TOOLS_SUBSCRIPTIONS' | 'PROXIES' | 'CAPCUT' | 'AI_TOOLS' | 'CONTRACTORS' | 'OPERATIONS' | 'MISC';
export type ExpenseType = 'OVERHEAD' | 'CHANNEL_DIRECT' | 'SHARED' | 'DERIVED';
export type RevenueSource = 'ADSENSE' | 'SPONSORSHIP' | 'AFFILIATE' | 'OTHER';

export interface ExpenseEntry {
  id: string;
  month: string;
  amount: number;
  category: ExpenseCategory;
  expenseType: ExpenseType;
  channelId: string | null;
  channelName: string | null;
  vendor: string;
  notes: string;
  createdBy: string;
  createdAt: string;
}

export interface RevenueEntry {
  id: string;
  channelId: string;
  channelName: string;
  month: string;
  amount: number;
  source: RevenueSource;
  notes: string;
}

export interface BudgetEntry {
  id: string;
  month: string;
  category: ExpenseCategory | 'TOTAL';
  budgetAmount: number;
  actualAmount: number;
}

export interface EditorAllocation {
  editorName: string;
  month: string;
  channelId: string;
  channelName: string;
  allocationPercent: number;
  allocatedAmount: number;
}

export interface MonthStatus {
  month: string;
  isClosed: boolean;
  closedBy: string | null;
  closedAt: string | null;
}

export const expenseEntries: ExpenseEntry[] = [
  // Editor salaries
  { id: 'e1', month: '2026-02', amount: 400, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: 'BENCH01', channelName: 'BenchDecoded', vendor: 'Ali Raza', notes: 'Editor salary', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e2', month: '2026-02', amount: 125, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: 'BENCH02', channelName: 'TrialTales', vendor: 'Usman Khan', notes: 'Editor salary (35000 PKR)', createdBy: 'Mudassir', createdAt: '2026-02-05' },
  { id: 'e3', month: '2026-02', amount: 350, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: 'BENCH03', channelName: 'VerdictVault', vendor: 'Hamza Malik', notes: 'Editor salary', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e4', month: '2026-02', amount: 500, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: 'NEWS01', channelName: 'FlashNews', vendor: 'Zain Ahmed', notes: 'Editor salary', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e5', month: '2026-02', amount: 408, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: 'COMEDY01', channelName: 'DailyLaughs', vendor: 'Nadia Bashir', notes: 'Editor salary (1500 AED)', createdBy: 'Mudassir', createdAt: '2026-02-10' },
  { id: 'e6', month: '2026-02', amount: 107, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: 'COMEDY02', channelName: 'LOLCentral', vendor: 'Bilal Hussain', notes: 'Editor salary (30000 PKR)', createdBy: 'Mudassir', createdAt: '2026-02-05' },
  { id: 'e7', month: '2026-02', amount: 450, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: 'TECH01', channelName: 'TechVault', vendor: 'Farhan Shah', notes: 'Editor salary', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e8', month: '2026-02', amount: 380, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: 'FINANCE01', channelName: 'MoneyMindset', vendor: 'Tariq Mehmood', notes: 'Editor salary', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e9', month: '2026-02', amount: 89, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: 'SPORTS01', channelName: 'ClutchPlays', vendor: 'Farhan Shah', notes: 'Editor salary (25000 PKR)', createdBy: 'Mudassir', createdAt: '2026-02-05' },
  // Tools & overhead
  { id: 'e10', month: '2026-02', amount: 49, category: 'TOOLS_SUBSCRIPTIONS', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'IXBrowser', notes: 'Browser automation tool', createdBy: 'Mudassir', createdAt: '2026-02-15' },
  { id: 'e11', month: '2026-02', amount: 120, category: 'AI_TOOLS', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'Anthropic', notes: 'Claude API usage', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e12', month: '2026-02', amount: 45, category: 'AI_TOOLS', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'OpenAI', notes: 'GPT-4 API usage', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e13', month: '2026-02', amount: 35, category: 'OPERATIONS', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'Contabo', notes: 'VPS hosting (8GB RAM)', createdBy: 'Mudassir', createdAt: '2026-02-20' },
  { id: 'e14', month: '2026-02', amount: 30, category: 'OPERATIONS', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'WhatsApp API', notes: 'Notification service', createdBy: 'Mudassir', createdAt: '2026-02-05' },
  { id: 'e15', month: '2026-02', amount: 15, category: 'CAPCUT', expenseType: 'SHARED', channelId: null, channelName: null, vendor: 'CapCut', notes: 'Editing tool — shared across editors', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e16', month: '2026-02', amount: 25, category: 'MISC', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'Various', notes: 'Domain renewals + small tools', createdBy: 'Mudassir', createdAt: '2026-02-10' },
  // Proxies (auto-generated)
  ...channels.map((ch, i) => ({
    id: `ep${i + 1}`,
    month: '2026-02',
    amount: ch.proxyDetails.price,
    category: 'PROXIES' as ExpenseCategory,
    expenseType: 'CHANNEL_DIRECT' as ExpenseType,
    channelId: ch.id,
    channelName: ch.name,
    vendor: ch.proxyDetails.provider,
    notes: 'Monthly proxy cost',
    createdBy: 'System',
    createdAt: '2026-02-01',
  })),
];

export const revenueEntries: RevenueEntry[] = [
  // Feb 2026 — AdSense
  { id: 'r1', channelId: 'BENCH01', channelName: 'BenchDecoded', month: '2026-02', amount: 2890, source: 'ADSENSE', notes: 'YouTube ad revenue' },
  { id: 'r2', channelId: 'BENCH01', channelName: 'BenchDecoded', month: '2026-02', amount: 350, source: 'AFFILIATE', notes: 'Amazon affiliates' },
  { id: 'r3', channelId: 'BENCH01', channelName: 'BenchDecoded', month: '2026-02', amount: 180, source: 'SPONSORSHIP', notes: 'LegalZoom sponsorship' },
  { id: 'r4', channelId: 'BENCH02', channelName: 'TrialTales', month: '2026-02', amount: 750, source: 'ADSENSE', notes: '' },
  { id: 'r5', channelId: 'BENCH02', channelName: 'TrialTales', month: '2026-02', amount: 140, source: 'AFFILIATE', notes: '' },
  { id: 'r6', channelId: 'BENCH03', channelName: 'VerdictVault', month: '2026-02', amount: 1820, source: 'ADSENSE', notes: '' },
  { id: 'r7', channelId: 'BENCH03', channelName: 'VerdictVault', month: '2026-02', amount: 330, source: 'AFFILIATE', notes: '' },
  { id: 'r8', channelId: 'BENCH04', channelName: 'GavelStrike', month: '2026-02', amount: 620, source: 'ADSENSE', notes: '' },
  { id: 'r9', channelId: 'BENCH04', channelName: 'GavelStrike', month: '2026-02', amount: 60, source: 'AFFILIATE', notes: '' },
  { id: 'r10', channelId: 'COMEDY01', channelName: 'DailyLaughs', month: '2026-02', amount: 1480, source: 'ADSENSE', notes: '' },
  { id: 'r11', channelId: 'COMEDY01', channelName: 'DailyLaughs', month: '2026-02', amount: 300, source: 'AFFILIATE', notes: '' },
  { id: 'r12', channelId: 'COMEDY02', channelName: 'LOLCentral', month: '2026-02', amount: 490, source: 'ADSENSE', notes: '' },
  { id: 'r13', channelId: 'COMEDY02', channelName: 'LOLCentral', month: '2026-02', amount: 50, source: 'OTHER', notes: 'Super Thanks' },
  { id: 'r14', channelId: 'NEWS01', channelName: 'FlashNews', month: '2026-02', amount: 3680, source: 'ADSENSE', notes: '' },
  { id: 'r15', channelId: 'NEWS01', channelName: 'FlashNews', month: '2026-02', amount: 600, source: 'SPONSORSHIP', notes: 'NewsApp promo' },
  { id: 'r16', channelId: 'NEWS02', channelName: 'DailyDigest', month: '2026-02', amount: 840, source: 'ADSENSE', notes: '' },
  { id: 'r17', channelId: 'NEWS02', channelName: 'DailyDigest', month: '2026-02', amount: 80, source: 'AFFILIATE', notes: '' },
  { id: 'r18', channelId: 'TECH01', channelName: 'TechVault', month: '2026-02', amount: 4200, source: 'ADSENSE', notes: '' },
  { id: 'r19', channelId: 'TECH01', channelName: 'TechVault', month: '2026-02', amount: 940, source: 'AFFILIATE', notes: '' },
  { id: 'r20', channelId: 'TECH01', channelName: 'TechVault', month: '2026-02', amount: 500, source: 'SPONSORSHIP', notes: 'TechBuddy promo' },
  { id: 'r21', channelId: 'FOOD01', channelName: 'FoodFlicks', month: '2026-02', amount: 1180, source: 'ADSENSE', notes: '' },
  { id: 'r22', channelId: 'FOOD01', channelName: 'FoodFlicks', month: '2026-02', amount: 300, source: 'AFFILIATE', notes: '' },
  { id: 'r23', channelId: 'FINANCE01', channelName: 'MoneyMindset', month: '2026-02', amount: 1940, source: 'ADSENSE', notes: '' },
  { id: 'r24', channelId: 'FINANCE01', channelName: 'MoneyMindset', month: '2026-02', amount: 400, source: 'AFFILIATE', notes: '' },
  { id: 'r25', channelId: 'SCARY01', channelName: 'NightmareFiles', month: '2026-02', amount: 2720, source: 'ADSENSE', notes: '' },
  { id: 'r26', channelId: 'SCARY01', channelName: 'NightmareFiles', month: '2026-02', amount: 400, source: 'AFFILIATE', notes: '' },
  { id: 'r27', channelId: 'MOTIVATE01', channelName: 'RiseDaily', month: '2026-02', amount: 520, source: 'ADSENSE', notes: '' },
  { id: 'r28', channelId: 'MOTIVATE01', channelName: 'RiseDaily', month: '2026-02', amount: 100, source: 'AFFILIATE', notes: '' },
  { id: 'r29', channelId: 'ANIMAL01', channelName: 'WildWatch', month: '2026-02', amount: 780, source: 'ADSENSE', notes: '' },
  { id: 'r30', channelId: 'ANIMAL01', channelName: 'WildWatch', month: '2026-02', amount: 110, source: 'AFFILIATE', notes: '' },
  { id: 'r31', channelId: 'HISTORY01', channelName: 'PastRevealed', month: '2026-02', amount: 125, source: 'ADSENSE', notes: '' },
  { id: 'r32', channelId: 'HISTORY01', channelName: 'PastRevealed', month: '2026-02', amount: 20, source: 'OTHER', notes: 'Super Thanks' },
  { id: 'r33', channelId: 'SPORTS01', channelName: 'ClutchPlays', month: '2026-02', amount: 40, source: 'ADSENSE', notes: '' },
  { id: 'r34', channelId: 'SPORTS01', channelName: 'ClutchPlays', month: '2026-02', amount: 5, source: 'OTHER', notes: 'Super Thanks' },
];

export const budgetEntries: BudgetEntry[] = [
  { id: 'b1', month: '2026-02', category: 'EDITOR_SALARY', budgetAmount: 3500, actualAmount: 2809 },
  { id: 'b2', month: '2026-02', category: 'TOOLS_SUBSCRIPTIONS', budgetAmount: 200, actualAmount: 49 },
  { id: 'b3', month: '2026-02', category: 'PROXIES', budgetAmount: 300, actualAmount: 261 },
  { id: 'b4', month: '2026-02', category: 'AI_TOOLS', budgetAmount: 200, actualAmount: 165 },
  { id: 'b5', month: '2026-02', category: 'OPERATIONS', budgetAmount: 100, actualAmount: 65 },
  { id: 'b6', month: '2026-02', category: 'CAPCUT', budgetAmount: 20, actualAmount: 15 },
  { id: 'b7', month: '2026-02', category: 'MISC', budgetAmount: 50, actualAmount: 25 },
  { id: 'b8', month: '2026-02', category: 'TOTAL', budgetAmount: 4370, actualAmount: 3389 },
];

export const editorAllocations: EditorAllocation[] = [
  { editorName: 'Ali Raza', month: '2026-02', channelId: 'BENCH01', channelName: 'BenchDecoded', allocationPercent: 60, allocatedAmount: 240 },
  { editorName: 'Ali Raza', month: '2026-02', channelId: 'SCARY01', channelName: 'NightmareFiles', allocationPercent: 40, allocatedAmount: 160 },
  { editorName: 'Usman Khan', month: '2026-02', channelId: 'BENCH02', channelName: 'TrialTales', allocationPercent: 70, allocatedAmount: 87.5 },
  { editorName: 'Usman Khan', month: '2026-02', channelId: 'BENCH04', channelName: 'GavelStrike', allocationPercent: 30, allocatedAmount: 37.5 },
  { editorName: 'Hamza Malik', month: '2026-02', channelId: 'BENCH03', channelName: 'VerdictVault', allocationPercent: 60, allocatedAmount: 210 },
  { editorName: 'Hamza Malik', month: '2026-02', channelId: 'ANIMAL01', channelName: 'WildWatch', allocationPercent: 40, allocatedAmount: 140 },
  { editorName: 'Zain Ahmed', month: '2026-02', channelId: 'NEWS01', channelName: 'FlashNews', allocationPercent: 70, allocatedAmount: 350 },
  { editorName: 'Zain Ahmed', month: '2026-02', channelId: 'NEWS02', channelName: 'DailyDigest', allocationPercent: 30, allocatedAmount: 150 },
  { editorName: 'Nadia Bashir', month: '2026-02', channelId: 'COMEDY01', channelName: 'DailyLaughs', allocationPercent: 60, allocatedAmount: 244.8 },
  { editorName: 'Nadia Bashir', month: '2026-02', channelId: 'FOOD01', channelName: 'FoodFlicks', allocationPercent: 40, allocatedAmount: 163.2 },
  { editorName: 'Bilal Hussain', month: '2026-02', channelId: 'COMEDY02', channelName: 'LOLCentral', allocationPercent: 60, allocatedAmount: 64.2 },
  { editorName: 'Bilal Hussain', month: '2026-02', channelId: 'MOTIVATE01', channelName: 'RiseDaily', allocationPercent: 40, allocatedAmount: 42.8 },
  { editorName: 'Farhan Shah', month: '2026-02', channelId: 'TECH01', channelName: 'TechVault', allocationPercent: 80, allocatedAmount: 360 },
  { editorName: 'Farhan Shah', month: '2026-02', channelId: 'SPORTS01', channelName: 'ClutchPlays', allocationPercent: 20, allocatedAmount: 90 },
  { editorName: 'Tariq Mehmood', month: '2026-02', channelId: 'FINANCE01', channelName: 'MoneyMindset', allocationPercent: 70, allocatedAmount: 266 },
  { editorName: 'Tariq Mehmood', month: '2026-02', channelId: 'HISTORY01', channelName: 'PastRevealed', allocationPercent: 30, allocatedAmount: 114 },
];

export const monthStatuses: MonthStatus[] = [
  { month: '2026-02', isClosed: false, closedBy: null, closedAt: null },
  { month: '2026-01', isClosed: true, closedBy: 'Mudassir', closedAt: '2026-02-03 10:00' },
  { month: '2025-12', isClosed: true, closedBy: 'Mudassir', closedAt: '2026-01-05 09:30' },
];

export const REVENUE_SOURCE_LABELS: Record<RevenueSource, string> = {
  ADSENSE: 'AdSense',
  SPONSORSHIP: 'Sponsorship',
  AFFILIATE: 'Affiliate',
  OTHER: 'Other',
};

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  EDITOR_SALARY: 'Editor Salaries',
  TOOLS_SUBSCRIPTIONS: 'Tools & Subscriptions',
  PROXIES: 'Proxies',
  CAPCUT: 'CapCut',
  AI_TOOLS: 'AI Tools',
  CONTRACTORS: 'Contractors',
  OPERATIONS: 'Operations',
  MISC: 'Miscellaneous',
};
