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
  // Health fields
  youtubeLogin: boolean;
  gmailLogin: boolean;
  proxyHealth: boolean;
  proxyLatency: number;
  driveAccess: boolean;
  sheetAccess: boolean;
  ixBrowserProfile: boolean;
  lastHealthCheck: string;
  // Stats fields
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
    id: '1', name: 'BenchDecoded', niche: 'Judge', tier: 'T1', youtubeChannelId: 'UCxBD1234abcd',
    ixProfile: 'BD-Main', ixProfileId: 'IX-4821', ixStatus: 'open',
    proxy: '45.89.112.34:8080', dailyLimit: 2, videosToday: 1, todayViews: 187420, subscribers: 124500, uploadQueue: 3, status: 'active',
    publishTimes: ['09:00', '15:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/1abc', videoFolder: '/media/benchdecoded',
    driveLongsFolderId: 'drive_bd_longs_001', driveShortsFolderId: 'drive_bd_shorts_001',
    team: { managerName: 'Ahmed', editorName: 'Ali Raza', editorEmail: 'ali@unitymediaflow.com', editorSalary: 400, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.34:8080', username: 'bd_user', password: '••••••', provider: 'Bright Data', type: 'residential', buyDate: '2026-01-15', price: 20, expiryDate: '2026-03-05' },
    shopping: { enabled: true, products: [{ name: 'Legal Rights Handbook', link: 'https://amzn.to/abc1' }, { name: 'Home Security Camera', link: 'https://amzn.to/abc2' }], category: 'Legal Books', amazonStoreId: 'unitystore-20', commissionRate: 8 },
    videoDefaults: { ...defaultVideoDefaults, abTesting: true, defaultPlaylist: 'Judge Compilations', videoLocation: 'New York' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 45, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '5 min ago',
    monthRevenue: 320, monthViews: 187420, totalPublished: 47, longFormPerDay: 1, shortsPerDay: 3, lastVideoTime: '2h ago',
  },
  {
    id: '2', name: 'TrialTales', niche: 'Judge', tier: 'T2', youtubeChannelId: 'UCxTT5678efgh',
    ixProfile: 'TT-Primary', ixProfileId: 'IX-4822', ixStatus: 'open',
    proxy: '45.89.112.35:8080', dailyLimit: 2, videosToday: 2, todayViews: 134200, subscribers: 847, uploadQueue: 1, status: 'active',
    publishTimes: ['10:00', '16:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/2def', videoFolder: '/media/trialtales',
    driveLongsFolderId: 'drive_tt_longs_001', driveShortsFolderId: 'drive_tt_shorts_001',
    team: { managerName: 'Ahmed', editorName: 'Usman Khan', editorEmail: 'usman@unitymediaflow.com', editorSalary: 35000, salaryCurrency: 'PKR', salaryPayDate: 5 },
    proxyDetails: { address: '45.89.112.35:8080', username: 'tt_user', password: '••••••', provider: 'DataImpulse', type: 'residential', buyDate: '2026-01-20', price: 15, expiryDate: '2026-04-12' },
    shopping: { enabled: false, products: [], category: '', amazonStoreId: '', commissionRate: 0 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Court Stories' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 62, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '5 min ago',
    monthRevenue: 280, monthViews: 134200, totalPublished: 32, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: '1h ago',
  },
  {
    id: '3', name: 'VerdictVault', niche: 'Judge', tier: 'T2', youtubeChannelId: 'UCxVV9012ijkl',
    ixProfile: 'VV-Main', ixProfileId: 'IX-4823', ixStatus: 'open',
    proxy: '45.89.112.36:8080', dailyLimit: 2, videosToday: 1, todayViews: 98340, subscribers: 67200, uploadQueue: 2, status: 'active',
    publishTimes: ['11:00', '17:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/3ghi', videoFolder: '/media/verdictvault',
    driveLongsFolderId: 'drive_vv_longs_001', driveShortsFolderId: 'drive_vv_shorts_001',
    team: { managerName: 'Ahmed', editorName: 'Hamza Malik', editorEmail: 'hamza@unitymediaflow.com', editorSalary: 350, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.36:8080', username: 'vv_user', password: '••••••', provider: 'Bright Data', type: 'datacenter', buyDate: '2026-02-01', price: 20, expiryDate: '2026-03-28' },
    shopping: { enabled: true, products: [{ name: 'Courtroom Drama Book', link: 'https://amzn.to/vv1' }], category: 'Legal Books', amazonStoreId: 'unitystore-20', commissionRate: 7 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Verdict Videos' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 38, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '5 min ago',
    monthRevenue: 210, monthViews: 98340, totalPublished: 28, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: '3h ago',
  },
  {
    id: '4', name: 'TechVault', niche: 'Tech', tier: 'T3', youtubeChannelId: 'UCxTV3456mnop',
    ixProfile: 'TV-Main', ixProfileId: 'IX-4824', ixStatus: 'closed',
    proxy: '45.89.112.37:8080', dailyLimit: 3, videosToday: 2, todayViews: 245100, subscribers: 312000, uploadQueue: 4, status: 'active',
    publishTimes: ['08:00', '12:00', '18:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/4jkl', videoFolder: '/media/techvault',
    driveLongsFolderId: 'drive_tv_longs_001', driveShortsFolderId: 'drive_tv_shorts_001',
    team: { managerName: 'Sara', editorName: 'Zain Ahmed', editorEmail: 'zain@unitymediaflow.com', editorSalary: 500, salaryCurrency: 'USD', salaryPayDate: 1 },
    proxyDetails: { address: '45.89.112.37:8080', username: 'tv_user', password: '••••••', provider: 'DataImpulse', type: 'datacenter', buyDate: '2026-01-10', price: 15, expiryDate: '2026-04-05' },
    shopping: { enabled: true, products: [{ name: 'USB-C Hub', link: 'https://amzn.to/tv1' }, { name: 'Wireless Mouse', link: 'https://amzn.to/tv2' }, { name: 'Monitor Light', link: 'https://amzn.to/tv3' }], category: 'Tech Gadgets', amazonStoreId: 'unitytech-20', commissionRate: 6 },
    videoDefaults: { ...defaultVideoDefaults, category: 'Science & Technology', defaultPlaylist: 'Tech Reviews', videoLocation: 'San Francisco' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 55, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '8 min ago',
    monthRevenue: 480, monthViews: 245100, totalPublished: 52, longFormPerDay: 2, shortsPerDay: 3, lastVideoTime: '30 min ago',
  },
  {
    id: '5', name: 'FoodFlicks', niche: 'Food', tier: 'T3', youtubeChannelId: 'UCxFF7890qrst',
    ixProfile: 'FF-Main', ixProfileId: 'IX-4825', ixStatus: 'closed',
    proxy: '45.89.112.38:8080', dailyLimit: 2, videosToday: 1, todayViews: 156300, subscribers: 89400, uploadQueue: 2, status: 'active',
    publishTimes: ['09:30', '15:30'], sheetUrl: 'https://docs.google.com/spreadsheets/d/5mno', videoFolder: '/media/foodflicks',
    driveLongsFolderId: 'drive_ff_longs_001', driveShortsFolderId: 'drive_ff_shorts_001',
    team: { managerName: 'Sara', editorName: 'Nadia Bashir', editorEmail: 'nadia@unitymediaflow.com', editorSalary: 1500, salaryCurrency: 'AED', salaryPayDate: 10 },
    proxyDetails: { address: '45.89.112.38:8080', username: 'ff_user', password: '••••••', provider: 'Bright Data', type: 'mobile', buyDate: '2026-02-05', price: 20, expiryDate: '2026-03-30' },
    shopping: { enabled: true, products: [{ name: 'Kitchen Knife Set', link: 'https://amzn.to/ff1' }], category: 'Kitchen Tools', amazonStoreId: 'unityfood-20', commissionRate: 5 },
    videoDefaults: { ...defaultVideoDefaults, category: 'Howto & Style', defaultPlaylist: 'Quick Recipes' },
    youtubeLogin: true, gmailLogin: true, proxyHealth: true, proxyLatency: 78, driveAccess: true, sheetAccess: true, ixBrowserProfile: true, lastHealthCheck: '10 min ago',
    monthRevenue: 180, monthViews: 156300, totalPublished: 35, longFormPerDay: 1, shortsPerDay: 2, lastVideoTime: '1h ago',
  },
  {
    id: '6', name: 'LawBites', niche: 'Judge', tier: 'T4', youtubeChannelId: 'UCxLB1234uvwx',
    ixProfile: 'LB-Main', ixProfileId: 'IX-4826', ixStatus: 'closed',
    proxy: '45.89.112.39:8080', dailyLimit: 1, videosToday: 1, todayViews: 25933, subscribers: 312, uploadQueue: 1, status: 'paused',
    publishTimes: ['14:00'], sheetUrl: 'https://docs.google.com/spreadsheets/d/6pqr', videoFolder: '/media/lawbites',
    driveLongsFolderId: 'drive_lb_longs_001', driveShortsFolderId: 'drive_lb_shorts_001',
    team: { managerName: 'Ahmed', editorName: 'Farhan Shah', editorEmail: 'farhan@unitymediaflow.com', editorSalary: 25000, salaryCurrency: 'PKR', salaryPayDate: 5 },
    proxyDetails: { address: '45.89.112.39:8080', username: 'lb_user', password: '••••••', provider: 'DataImpulse', type: 'residential', buyDate: '2026-02-15', price: 10, expiryDate: '2026-04-15' },
    shopping: { enabled: false, products: [], category: '', amazonStoreId: '', commissionRate: 0 },
    videoDefaults: { ...defaultVideoDefaults, defaultPlaylist: 'Law Explained' },
    youtubeLogin: false, gmailLogin: true, proxyHealth: true, proxyLatency: 120, driveAccess: true, sheetAccess: true, ixBrowserProfile: false, lastHealthCheck: '15 min ago',
    monthRevenue: 45, monthViews: 25933, totalPublished: 12, longFormPerDay: 1, shortsPerDay: 0, lastVideoTime: 'Yesterday',
  },
];

export const managerChannels = ['1', '2', '3'];

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

function mockFiles(type: 'Long' | 'Short', hasOptionals: boolean): VideoFolderFile[] {
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
  { id: 'v1', channel: 'BenchDecoded', channelId: '1', title: 'Judge Absolutely DESTROYS Entitled Karen in Court', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '09:00', tier: 'T1', uploadedAt: '2026-02-28 08:45', youtubeUrl: 'https://youtube.com/watch?v=abc1', error: '', description: 'A judge delivers justice to an entitled woman who refuses to follow court orders.', tags: ['judge', 'court', 'karen', 'justice'], videoType: 'Long', folderName: 'video_001', files: mockFiles('Long', true), titleB: 'Karen Gets DESTROYED by Judge in Epic Court Moment', thumbnailB: true, quiz: 'Q: What is contempt of court?\nA: A type of dance\nA: A cooking method\nCORRECT: Disobeying a court order' },
  { id: 'v2', channel: 'BenchDecoded', channelId: '1', title: 'Lawyer Gets CAUGHT Lying to the Judge', status: 'QUEUED', publishDate: '2026-02-28', publishTime: '15:00', tier: 'T1', uploadedAt: '', youtubeUrl: '', error: '', description: 'When a lawyer tries to deceive the judge, things go very wrong.', tags: ['lawyer', 'court', 'lying'], videoType: 'Long', folderName: 'video_002', files: mockFiles('Long', false) },
  { id: 'v3', channel: 'BenchDecoded', channelId: '1', title: 'Most SAVAGE Judge Moments of 2026', status: 'EDITING', publishDate: '2026-03-01', publishTime: '09:00', tier: 'T1', uploadedAt: '', youtubeUrl: '', error: '', description: 'Compilation of the most intense courtroom moments.', tags: ['compilation', 'judge', 'savage'], videoType: 'Long', folderName: 'video_003', files: [{ name: 'video.mp4', required: true, present: false }, { name: 'title.txt', required: true, present: true, size: '0.1 KB' }, { name: 'description.txt', required: true, present: false }, { name: 'tags.txt', required: true, present: true, size: '0.3 KB' }, { name: 'thumbnail.jpg', required: true, present: false }] },
  { id: 'v4', channel: 'TrialTales', channelId: '2', title: 'Woman Sues Neighbor Over 2 Inches of Fence', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '10:00', tier: 'T2', uploadedAt: '2026-02-28 09:45', youtubeUrl: 'https://youtube.com/watch?v=def2', error: '', description: 'A heated dispute over property lines ends up in court.', tags: ['neighbor', 'fence', 'lawsuit'], videoType: 'Long', folderName: 'video_001', files: mockFiles('Long', false) },
  { id: 'v5', channel: 'TrialTales', channelId: '2', title: 'Judge Judy vs The Most Annoying Plaintiff', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '16:00', tier: 'T2', uploadedAt: '2026-02-28 15:40', youtubeUrl: 'https://youtube.com/watch?v=ghi3', error: '', description: 'Judge handles the most difficult plaintiff ever seen in court.', tags: ['judge judy', 'plaintiff', 'annoying'], videoType: 'Short', folderName: 'short_001', files: mockFiles('Short', false) },
  { id: 'v6', channel: 'TrialTales', channelId: '2', title: 'Man Refuses to Pay Child Support — Judge Reacts', status: 'ERROR', publishDate: '2026-02-27', publishTime: '10:00', tier: 'T2', uploadedAt: '2026-02-27 09:30', youtubeUrl: '', error: 'Upload timeout after 3 retries. IXBrowser session crashed.', description: 'A father faces consequences for refusing court-ordered payments.', tags: ['child support', 'court'], videoType: 'Long', folderName: 'video_002', files: mockFiles('Long', false) },
  { id: 'v7', channel: 'VerdictVault', channelId: '3', title: 'Top 10 Courtroom Freakouts Caught on Camera', status: 'UPLOADING', publishDate: '2026-02-28', publishTime: '17:00', tier: 'T2', uploadedAt: '', youtubeUrl: '', error: '', description: 'The most dramatic courtroom moments ever filmed.', tags: ['freakout', 'courtroom', 'top10'], videoType: 'Long', folderName: 'video_001', files: mockFiles('Long', true), quiz: 'Q: What happens if you lie under oath?\nA: Nothing\nA: You get a medal\nCORRECT: You can be charged with perjury' },
  { id: 'v8', channel: 'VerdictVault', channelId: '3', title: 'Criminal Tries to ESCAPE During Sentencing', status: 'READY_TO_UPLOAD', publishDate: '2026-03-01', publishTime: '11:00', tier: 'T2', uploadedAt: '', youtubeUrl: '', error: '', description: 'Dramatic footage of a defendant attempting to flee the courtroom.', tags: ['escape', 'criminal', 'sentencing'], videoType: 'Long', folderName: 'video_002', files: mockFiles('Long', false) },
  { id: 'v9', channel: 'TechVault', channelId: '4', title: 'I Tested the $5000 AI Laptop — Was It Worth It?', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '08:00', tier: 'T3', uploadedAt: '2026-02-28 07:45', youtubeUrl: 'https://youtube.com/watch?v=jkl4', error: '', description: 'Full review of the latest AI-focused laptop.', tags: ['laptop', 'AI', 'review', 'tech'], videoType: 'Long', folderName: 'video_001', files: mockFiles('Long', false) },
  { id: 'v10', channel: 'TechVault', channelId: '4', title: 'Best Budget Phones 2026 — You Wont Believe #1', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '12:00', tier: 'T3', uploadedAt: '2026-02-28 11:45', youtubeUrl: 'https://youtube.com/watch?v=mno5', error: '', description: 'Our top picks for budget smartphones this year.', tags: ['phones', 'budget', '2026'], videoType: 'Short', folderName: 'short_001', files: mockFiles('Short', true) },
  { id: 'v11', channel: 'TechVault', channelId: '4', title: 'This Gadget Changed My Life — $29 Only', status: 'UPLOADED_UNLISTED', publishDate: '2026-02-28', publishTime: '18:00', tier: 'T3', uploadedAt: '2026-02-28 17:30', youtubeUrl: 'https://youtube.com/watch?v=pqr6', error: '', description: 'An unboxing and review of a surprisingly useful gadget.', tags: ['gadget', 'unboxing', 'cheap'], videoType: 'Long', folderName: 'video_002', files: mockFiles('Long', false) },
  { id: 'v12', channel: 'TechVault', channelId: '4', title: 'Apple vs Samsung 2026 — The TRUTH', status: 'QUEUED', publishDate: '2026-03-01', publishTime: '08:00', tier: 'T3', uploadedAt: '', youtubeUrl: '', error: '', description: 'A deep comparison between the latest Apple and Samsung flagships.', tags: ['apple', 'samsung', 'comparison'], videoType: 'Long', folderName: 'video_003', files: mockFiles('Long', false) },
  { id: 'v13', channel: 'FoodFlicks', channelId: '5', title: '5 Minute Meals That Actually Taste AMAZING', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '09:30', tier: 'T3', uploadedAt: '2026-02-28 09:15', youtubeUrl: 'https://youtube.com/watch?v=stu7', error: '', description: 'Quick and delicious meals anyone can make.', tags: ['cooking', 'quick meals', 'recipes'], videoType: 'Long', folderName: 'video_001', files: mockFiles('Long', false) },
  { id: 'v14', channel: 'FoodFlicks', channelId: '5', title: 'Street Food in Tokyo — $1 vs $100', status: 'READY_TO_UPLOAD', publishDate: '2026-03-01', publishTime: '09:30', tier: 'T3', uploadedAt: '', youtubeUrl: '', error: '', description: 'Exploring the extremes of Tokyo street food.', tags: ['tokyo', 'street food', 'challenge'], videoType: 'Short', folderName: 'short_001', files: mockFiles('Short', false) },
  { id: 'v15', channel: 'LawBites', channelId: '6', title: 'Why This Murder Case SHOCKED Everyone', status: 'PUBLISHED', publishDate: '2026-02-28', publishTime: '14:00', tier: 'T4', uploadedAt: '2026-02-28 13:45', youtubeUrl: 'https://youtube.com/watch?v=vwx8', error: '', description: 'An analysis of one of the most surprising murder cases.', tags: ['murder', 'case', 'shocking'], videoType: 'Long', folderName: 'video_001', files: mockFiles('Long', false) },
  { id: 'v16', channel: 'LawBites', channelId: '6', title: 'Legal Myths That Could Get You ARRESTED', status: 'EDITING', publishDate: '2026-03-02', publishTime: '14:00', tier: 'T4', uploadedAt: '', youtubeUrl: '', error: '', description: 'Common legal misconceptions that people actually believe.', tags: ['legal', 'myths', 'arrested'], videoType: 'Long', folderName: 'video_002', files: [{ name: 'video.mp4', required: true, present: false }, { name: 'title.txt', required: true, present: true, size: '0.1 KB' }, { name: 'description.txt', required: true, present: true, size: '0.8 KB' }, { name: 'tags.txt', required: true, present: false }, { name: 'thumbnail.jpg', required: true, present: false }] },
  { id: 'v17', channel: 'BenchDecoded', channelId: '1', title: 'Judge Makes Grown Man CRY in Court', status: 'UPLOADED_UNLISTED', publishDate: '2026-03-01', publishTime: '15:00', tier: 'T1', uploadedAt: '2026-02-28 20:00', youtubeUrl: 'https://youtube.com/watch?v=yza9', error: '', description: 'Emotional courtroom moment when judge delivers a powerful message.', tags: ['emotional', 'judge', 'crying'], videoType: 'Long', folderName: 'video_004', files: mockFiles('Long', true), titleB: 'Grown Man CRIES After Judge Says This', thumbnailB: true },
  { id: 'v18', channel: 'VerdictVault', channelId: '3', title: 'Judge Catches Witness in a LIE — Epic Moment', status: 'QUEUED', publishDate: '2026-03-01', publishTime: '17:00', tier: 'T2', uploadedAt: '', youtubeUrl: '', error: '', description: 'Incredible moment when a witness is caught lying under oath.', tags: ['witness', 'lie', 'perjury'], videoType: 'Short', folderName: 'short_001', files: mockFiles('Short', true) },
  { id: 'v19', channel: 'FoodFlicks', channelId: '5', title: 'I Ate ONLY Gas Station Food for 24 Hours', status: 'EDITING', publishDate: '2026-03-03', publishTime: '15:30', tier: 'T3', uploadedAt: '', youtubeUrl: '', error: '', description: 'A 24-hour challenge eating only from gas stations.', tags: ['challenge', 'gas station', 'food'], videoType: 'Long', folderName: 'video_002', files: [{ name: 'video.mp4', required: true, present: true, size: '310 MB' }, { name: 'title.txt', required: true, present: true, size: '0.1 KB' }, { name: 'description.txt', required: true, present: false }, { name: 'tags.txt', required: true, present: true, size: '0.2 KB' }, { name: 'thumbnail.jpg', required: true, present: false }] },
  { id: 'v20', channel: 'TechVault', channelId: '4', title: 'Unboxing the RAREST Tech of 2026', status: 'READY_TO_UPLOAD', publishDate: '2026-03-01', publishTime: '12:00', tier: 'T3', uploadedAt: '', youtubeUrl: '', error: '', description: 'Exclusive unboxing of extremely rare tech products.', tags: ['unboxing', 'rare', 'tech'], videoType: 'Long', folderName: 'video_004', files: mockFiles('Long', false) },
];

export const activityFeed = [
  { time: '2 min ago', message: 'TechVault: Video uploaded — "This Gadget Changed My Life"', type: 'upload', icon: '📤' },
  { time: '5 min ago', message: 'BenchDecoded: Warmup session completed', type: 'system', icon: '⚙️' },
  { time: '8 min ago', message: 'TrialTales: Published to YouTube — "Judge Judy vs The Most Annoying Plaintiff"', type: 'publish', icon: '🚀' },
  { time: '12 min ago', message: 'VerdictVault: Upload started — "Top 10 Courtroom Freakouts"', type: 'upload', icon: '📤' },
  { time: '15 min ago', message: 'FoodFlicks: Video published — "5 Minute Meals That Actually Taste AMAZING"', type: 'publish', icon: '🚀' },
  { time: '22 min ago', message: 'LawBites: Video published — "Why This Murder Case SHOCKED Everyone"', type: 'publish', icon: '🚀' },
  { time: '30 min ago', message: 'BenchDecoded: Published to YouTube — "Judge DESTROYS Entitled Karen"', type: 'publish', icon: '🚀' },
  { time: '35 min ago', message: 'TechVault: Published — "Best Budget Phones 2026"', type: 'publish', icon: '🚀' },
  { time: '42 min ago', message: 'System: Daily backup completed', type: 'system', icon: '✅' },
  { time: '1 hr ago', message: 'TrialTales: Upload failed — retrying in 5 min', type: 'error', icon: '⚠️' },
  { time: '1.5 hr ago', message: 'TechVault: Published — "I Tested the $5000 AI Laptop"', type: 'publish', icon: '🚀' },
  { time: '2 hr ago', message: 'System: Cron scheduler restarted', type: 'system', icon: '🔄' },
];

export const alerts = [
  { id: 'a1', severity: 'critical' as const, type: 'health', channel: 'BENCH01', title: 'Proxy expires in 5 days', description: 'BenchDecoded proxy (45.89.112.34) expires on March 5, 2026. Renew immediately to avoid service interruption.', time: '10 min ago', action: 'Renew Now' },
  { id: 'a2', severity: 'critical' as const, type: 'upload', channel: 'BENCH02', title: 'Upload failed 3 times on TrialTales', description: 'Video "Man Refuses to Pay Child Support" failed upload 3 times. IXBrowser session crashed during upload process.', time: '1 hr ago', action: 'Review' },
  { id: 'a3', severity: 'warning' as const, type: 'finance', channel: '', title: 'IXBrowser subscription renews in 12 days', description: 'IXBrowser subscription ($49/mo) renews on March 12, 2026. Ensure payment method is up to date.', time: '3 hr ago', action: 'Reminder Set' },
  { id: 'a4', severity: 'warning' as const, type: 'health', channel: 'VV', title: 'VerdictVault approaching YPP', description: 'VerdictVault has reached 847/1000 subscribers. Only 153 more subscribers needed for YouTube Partner Program eligibility.', time: '5 hr ago', action: 'View Stats' },
  { id: 'a5', severity: 'info' as const, type: 'upload', channel: 'BENCH01', title: 'BenchDecoded video went viral', description: '"Judge DESTROYS Entitled Karen" is performing 3.2x above normal with 187,420 views today.', time: '2 hr ago', action: 'View' },
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
  { channelId: '1', channelName: 'BenchDecoded', month: '2026-02', revenue: 3420, views: 4200000, subsGained: 4200, videosPublished: 42 },
  { channelId: '2', channelName: 'TrialTales', month: '2026-02', revenue: 890, views: 1800000, subsGained: 680, videosPublished: 38 },
  { channelId: '3', channelName: 'VerdictVault', month: '2026-02', revenue: 2150, views: 2600000, subsGained: 2100, videosPublished: 35 },
  { channelId: '4', channelName: 'TechVault', month: '2026-02', revenue: 4280, views: 6800000, subsGained: 5400, videosPublished: 56 },
  { channelId: '5', channelName: 'FoodFlicks', month: '2026-02', revenue: 1780, views: 3400000, subsGained: 2800, videosPublished: 40 },
  { channelId: '6', channelName: 'LawBites', month: '2026-02', revenue: 327, views: 620000, subsGained: 210, videosPublished: 22 },
  { channelId: '1', channelName: 'BenchDecoded', month: '2026-01', revenue: 3100, views: 3800000, subsGained: 3800, videosPublished: 40 },
  { channelId: '4', channelName: 'TechVault', month: '2026-01', revenue: 3950, views: 6200000, subsGained: 4800, videosPublished: 52 },
  { channelId: '3', channelName: 'VerdictVault', month: '2026-01', revenue: 1950, views: 2300000, subsGained: 1800, videosPublished: 32 },
  { channelId: '5', channelName: 'FoodFlicks', month: '2026-01', revenue: 1540, views: 2900000, subsGained: 2400, videosPublished: 36 },
  { channelId: '2', channelName: 'TrialTales', month: '2026-01', revenue: 420, views: 900000, subsGained: 320, videosPublished: 30 },
  { channelId: '6', channelName: 'LawBites', month: '2026-01', revenue: 240, views: 420000, subsGained: 120, videosPublished: 18 },
];

export const salaryPayments: SalaryPayment[] = [
  { channelId: '1', editorName: 'Ali Raza', amount: 400, currency: 'USD', month: '2026-02', payDate: 1, paid: true },
  { channelId: '2', editorName: 'Usman Khan', amount: 35000, currency: 'PKR', month: '2026-02', payDate: 5, paid: true },
  { channelId: '3', editorName: 'Hamza Malik', amount: 350, currency: 'USD', month: '2026-02', payDate: 1, paid: true },
  { channelId: '4', editorName: 'Zain Ahmed', amount: 500, currency: 'USD', month: '2026-02', payDate: 1, paid: true },
  { channelId: '5', editorName: 'Nadia Bashir', amount: 1500, currency: 'AED', month: '2026-02', payDate: 10, paid: false },
  { channelId: '6', editorName: 'Farhan Shah', amount: 25000, currency: 'PKR', month: '2026-02', payDate: 5, paid: true },
];

export const proxyCosts: ProxyCost[] = [
  { channelId: '1', channelName: 'BenchDecoded', provider: 'Bright Data', amount: 20, buyDate: '2026-01-15', expiryDate: '2026-03-05', daysLeft: 4 },
  { channelId: '2', channelName: 'TrialTales', provider: 'DataImpulse', amount: 15, buyDate: '2026-01-20', expiryDate: '2026-04-12', daysLeft: 42 },
  { channelId: '3', channelName: 'VerdictVault', provider: 'Bright Data', amount: 20, buyDate: '2026-02-01', expiryDate: '2026-03-28', daysLeft: 27 },
  { channelId: '4', channelName: 'TechVault', provider: 'DataImpulse', amount: 15, buyDate: '2026-01-10', expiryDate: '2026-04-05', daysLeft: 35 },
  { channelId: '5', channelName: 'FoodFlicks', provider: 'Bright Data', amount: 20, buyDate: '2026-02-05', expiryDate: '2026-03-30', daysLeft: 29 },
  { channelId: '6', channelName: 'LawBites', provider: 'DataImpulse', amount: 10, buyDate: '2026-02-15', expiryDate: '2026-04-15', daysLeft: 45 },
];

export const shoppingEvents: ShoppingEvent[] = [
  { channelId: '1', channelName: 'BenchDecoded', videoFolder: 'video_001', productName: 'Legal Rights Handbook', productLink: 'https://amzn.to/abc1', addedAt: '2026-02-28 08:45', estimatedCommission: 2.40 },
  { channelId: '1', channelName: 'BenchDecoded', videoFolder: 'video_004', productName: 'Home Security Camera', productLink: 'https://amzn.to/abc2', addedAt: '2026-02-28 20:00', estimatedCommission: 4.80 },
  { channelId: '3', channelName: 'VerdictVault', videoFolder: 'video_001', productName: 'Courtroom Drama Book', productLink: 'https://amzn.to/vv1', addedAt: '2026-02-27 11:00', estimatedCommission: 1.96 },
  { channelId: '4', channelName: 'TechVault', videoFolder: 'video_001', productName: 'USB-C Hub', productLink: 'https://amzn.to/tv1', addedAt: '2026-02-28 07:45', estimatedCommission: 1.80 },
  { channelId: '4', channelName: 'TechVault', videoFolder: 'video_002', productName: 'Wireless Mouse', productLink: 'https://amzn.to/tv2', addedAt: '2026-02-28 17:30', estimatedCommission: 1.50 },
  { channelId: '4', channelName: 'TechVault', videoFolder: 'video_003', productName: 'Monitor Light', productLink: 'https://amzn.to/tv3', addedAt: '2026-02-27 08:00', estimatedCommission: 2.10 },
  { channelId: '5', channelName: 'FoodFlicks', videoFolder: 'video_001', productName: 'Kitchen Knife Set', productLink: 'https://amzn.to/ff1', addedAt: '2026-02-28 09:15', estimatedCommission: 3.25 },
];

export const monthlySummaries: MonthlySummary[] = [
  { month: '2026-02', totalRevenue: 12847, totalSalaryCost: 1650, totalProxyCost: 100, grossProfit: 11097, marginPct: 86.4, videosProduced: 233, topChannel: 'TechVault' },
  { month: '2026-01', totalRevenue: 11200, totalSalaryCost: 1650, totalProxyCost: 100, grossProfit: 9450, marginPct: 84.4, videosProduced: 208, topChannel: 'TechVault' },
  { month: '2025-12', totalRevenue: 10500, totalSalaryCost: 1500, totalProxyCost: 90, grossProfit: 8910, marginPct: 84.9, videosProduced: 195, topChannel: 'TechVault' },
  { month: '2025-11', totalRevenue: 9100, totalSalaryCost: 1500, totalProxyCost: 90, grossProfit: 7510, marginPct: 82.5, videosProduced: 178, topChannel: 'BenchDecoded' },
  { month: '2025-10', totalRevenue: 7800, totalSalaryCost: 1350, totalProxyCost: 80, grossProfit: 6370, marginPct: 81.7, videosProduced: 156, topChannel: 'BenchDecoded' },
  { month: '2025-09', totalRevenue: 6200, totalSalaryCost: 1200, totalProxyCost: 70, grossProfit: 4930, marginPct: 79.5, videosProduced: 134, topChannel: 'BenchDecoded' },
];

export const ytdSummary = {
  totalRevenue: 57647,
  totalCosts: 10280,
  totalProfit: 47367,
  totalVideos: 1104,
  channelsActive: 6,
  avgRevenuePerVideo: 52.22,
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
  { id: 'p1', name: 'Mohsin', title: 'Founder & CEO', equityPercent: 40, role: 'Overall company strategy, growth, key decisions, partnerships', allTimeEarnings: 18430, lastLogin: '2 min ago', channelsManaged: 16 },
  { id: 'p2', name: 'Mudassir', title: 'Partner & CFO', equityPercent: 40, role: 'Finance ownership: budgeting, expense controls, reporting, profitability', allTimeEarnings: 18430, lastLogin: '1h ago', channelsManaged: 16 },
  { id: 'p3', name: 'Haseeb', title: 'Head of Production', equityPercent: 10, role: 'Manages editors team, workflow, delivery, quality control', allTimeEarnings: 4607, lastLogin: '3h ago', channelsManaged: 8 },
  { id: 'p4', name: 'Waleed', title: 'Head of Strategy & Research', equityPercent: 10, role: 'Research, channel strategy, optimization frameworks, content systems', allTimeEarnings: 4607, lastLogin: 'Yesterday', channelsManaged: 4 },
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
  { id: 'cp1', channelId: '1', channelName: 'BenchDecoded', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-06', endMonth: null },
  { id: 'cp2', channelId: '2', channelName: 'TrialTales', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-08', endMonth: null },
  { id: 'cp3', channelId: '3', channelName: 'VerdictVault', partnerId: 'p4', partnerName: 'Waleed', partnerSharePercent: 80, companySharePercent: 20, startMonth: '2025-09', endMonth: null },
  { id: 'cp4', channelId: '4', channelName: 'TechVault', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-07', endMonth: null },
  { id: 'cp5', channelId: '5', channelName: 'FoodFlicks', partnerId: 'p3', partnerName: 'Haseeb', partnerSharePercent: 70, companySharePercent: 30, startMonth: '2025-10', endMonth: null },
  { id: 'cp6', channelId: '6', channelName: 'LawBites', partnerId: 'p1', partnerName: 'Mohsin', partnerSharePercent: 0, companySharePercent: 100, startMonth: '2025-11', endMonth: null },
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
  { id: 'e1', month: '2026-02', amount: 400, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: '1', channelName: 'BenchDecoded', vendor: 'Ali Raza', notes: 'Editor salary', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e2', month: '2026-02', amount: 125, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: '2', channelName: 'TrialTales', vendor: 'Usman Khan', notes: 'Editor salary (35000 PKR)', createdBy: 'Mudassir', createdAt: '2026-02-05' },
  { id: 'e3', month: '2026-02', amount: 350, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: '3', channelName: 'VerdictVault', vendor: 'Hamza Malik', notes: 'Editor salary', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e4', month: '2026-02', amount: 500, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: '4', channelName: 'TechVault', vendor: 'Zain Ahmed', notes: 'Editor salary', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e5', month: '2026-02', amount: 408, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: '5', channelName: 'FoodFlicks', vendor: 'Nadia Bashir', notes: 'Editor salary (1500 AED)', createdBy: 'Mudassir', createdAt: '2026-02-10' },
  { id: 'e6', month: '2026-02', amount: 89, category: 'EDITOR_SALARY', expenseType: 'CHANNEL_DIRECT', channelId: '6', channelName: 'LawBites', vendor: 'Farhan Shah', notes: 'Editor salary (25000 PKR)', createdBy: 'Mudassir', createdAt: '2026-02-05' },
  { id: 'e7', month: '2026-02', amount: 49, category: 'TOOLS_SUBSCRIPTIONS', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'IXBrowser', notes: 'Browser automation tool', createdBy: 'Mudassir', createdAt: '2026-02-15' },
  { id: 'e8', month: '2026-02', amount: 120, category: 'AI_TOOLS', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'Anthropic', notes: 'Claude API', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e9', month: '2026-02', amount: 35, category: 'OPERATIONS', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'Contabo', notes: 'VPS hosting', createdBy: 'Mudassir', createdAt: '2026-02-20' },
  { id: 'e10', month: '2026-02', amount: 30, category: 'OPERATIONS', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'WhatsApp API', notes: 'Notification service', createdBy: 'Mudassir', createdAt: '2026-02-05' },
  { id: 'e11', month: '2026-02', amount: 20, category: 'PROXIES', expenseType: 'CHANNEL_DIRECT', channelId: '1', channelName: 'BenchDecoded', vendor: 'Bright Data', notes: 'Proxy cost', createdBy: 'System', createdAt: '2026-02-01' },
  { id: 'e12', month: '2026-02', amount: 15, category: 'PROXIES', expenseType: 'CHANNEL_DIRECT', channelId: '2', channelName: 'TrialTales', vendor: 'DataImpulse', notes: 'Proxy cost', createdBy: 'System', createdAt: '2026-02-01' },
  { id: 'e13', month: '2026-02', amount: 20, category: 'PROXIES', expenseType: 'CHANNEL_DIRECT', channelId: '3', channelName: 'VerdictVault', vendor: 'Bright Data', notes: 'Proxy cost', createdBy: 'System', createdAt: '2026-02-01' },
  { id: 'e14', month: '2026-02', amount: 15, category: 'PROXIES', expenseType: 'CHANNEL_DIRECT', channelId: '4', channelName: 'TechVault', vendor: 'DataImpulse', notes: 'Proxy cost', createdBy: 'System', createdAt: '2026-02-01' },
  { id: 'e15', month: '2026-02', amount: 20, category: 'PROXIES', expenseType: 'CHANNEL_DIRECT', channelId: '5', channelName: 'FoodFlicks', vendor: 'Bright Data', notes: 'Proxy cost', createdBy: 'System', createdAt: '2026-02-01' },
  { id: 'e16', month: '2026-02', amount: 10, category: 'PROXIES', expenseType: 'CHANNEL_DIRECT', channelId: '6', channelName: 'LawBites', vendor: 'DataImpulse', notes: 'Proxy cost', createdBy: 'System', createdAt: '2026-02-01' },
  { id: 'e17', month: '2026-02', amount: 15, category: 'CAPCUT', expenseType: 'SHARED', channelId: null, channelName: null, vendor: 'CapCut', notes: 'Editing tool — shared across editors', createdBy: 'Mudassir', createdAt: '2026-02-01' },
  { id: 'e18', month: '2026-02', amount: 25, category: 'MISC', expenseType: 'OVERHEAD', channelId: null, channelName: null, vendor: 'Miscellaneous', notes: 'Domain renewals + small tools', createdBy: 'Mudassir', createdAt: '2026-02-10' },
];

export const revenueEntries: RevenueEntry[] = [
  { id: 'r1', channelId: '1', channelName: 'BenchDecoded', month: '2026-02', amount: 2890, source: 'ADSENSE', notes: 'YouTube ad revenue' },
  { id: 'r2', channelId: '1', channelName: 'BenchDecoded', month: '2026-02', amount: 350, source: 'AFFILIATE', notes: 'Amazon affiliates' },
  { id: 'r3', channelId: '1', channelName: 'BenchDecoded', month: '2026-02', amount: 180, source: 'SPONSORSHIP', notes: 'LegalZoom sponsorship' },
  { id: 'r4', channelId: '2', channelName: 'TrialTales', month: '2026-02', amount: 750, source: 'ADSENSE', notes: '' },
  { id: 'r5', channelId: '2', channelName: 'TrialTales', month: '2026-02', amount: 140, source: 'AFFILIATE', notes: '' },
  { id: 'r6', channelId: '3', channelName: 'VerdictVault', month: '2026-02', amount: 1820, source: 'ADSENSE', notes: '' },
  { id: 'r7', channelId: '3', channelName: 'VerdictVault', month: '2026-02', amount: 330, source: 'AFFILIATE', notes: '' },
  { id: 'r8', channelId: '4', channelName: 'TechVault', month: '2026-02', amount: 3200, source: 'ADSENSE', notes: '' },
  { id: 'r9', channelId: '4', channelName: 'TechVault', month: '2026-02', amount: 680, source: 'AFFILIATE', notes: '' },
  { id: 'r10', channelId: '4', channelName: 'TechVault', month: '2026-02', amount: 400, source: 'SPONSORSHIP', notes: 'TechBuddy promo' },
  { id: 'r11', channelId: '5', channelName: 'FoodFlicks', month: '2026-02', amount: 1480, source: 'ADSENSE', notes: '' },
  { id: 'r12', channelId: '5', channelName: 'FoodFlicks', month: '2026-02', amount: 300, source: 'AFFILIATE', notes: '' },
  { id: 'r13', channelId: '6', channelName: 'LawBites', month: '2026-02', amount: 297, source: 'ADSENSE', notes: '' },
  { id: 'r14', channelId: '6', channelName: 'LawBites', month: '2026-02', amount: 30, source: 'OTHER', notes: 'Super Thanks' },
  // January data
  { id: 'r15', channelId: '1', channelName: 'BenchDecoded', month: '2026-01', amount: 2650, source: 'ADSENSE', notes: '' },
  { id: 'r16', channelId: '1', channelName: 'BenchDecoded', month: '2026-01', amount: 280, source: 'AFFILIATE', notes: '' },
  { id: 'r17', channelId: '2', channelName: 'TrialTales', month: '2026-01', amount: 380, source: 'ADSENSE', notes: '' },
  { id: 'r18', channelId: '3', channelName: 'VerdictVault', month: '2026-01', amount: 1650, source: 'ADSENSE', notes: '' },
  { id: 'r19', channelId: '3', channelName: 'VerdictVault', month: '2026-01', amount: 300, source: 'AFFILIATE', notes: '' },
  { id: 'r20', channelId: '4', channelName: 'TechVault', month: '2026-01', amount: 3100, source: 'ADSENSE', notes: '' },
  { id: 'r21', channelId: '4', channelName: 'TechVault', month: '2026-01', amount: 850, source: 'AFFILIATE', notes: '' },
  { id: 'r22', channelId: '5', channelName: 'FoodFlicks', month: '2026-01', amount: 1340, source: 'ADSENSE', notes: '' },
  { id: 'r23', channelId: '5', channelName: 'FoodFlicks', month: '2026-01', amount: 200, source: 'AFFILIATE', notes: '' },
  { id: 'r24', channelId: '6', channelName: 'LawBites', month: '2026-01', amount: 210, source: 'ADSENSE', notes: '' },
];

export const budgetEntries: BudgetEntry[] = [
  { id: 'b1', month: '2026-02', category: 'EDITOR_SALARY', budgetAmount: 2000, actualAmount: 1872 },
  { id: 'b2', month: '2026-02', category: 'TOOLS_SUBSCRIPTIONS', budgetAmount: 200, actualAmount: 184 },
  { id: 'b3', month: '2026-02', category: 'PROXIES', budgetAmount: 120, actualAmount: 100 },
  { id: 'b4', month: '2026-02', category: 'AI_TOOLS', budgetAmount: 150, actualAmount: 120 },
  { id: 'b5', month: '2026-02', category: 'OPERATIONS', budgetAmount: 100, actualAmount: 65 },
  { id: 'b6', month: '2026-02', category: 'CAPCUT', budgetAmount: 20, actualAmount: 15 },
  { id: 'b7', month: '2026-02', category: 'MISC', budgetAmount: 50, actualAmount: 25 },
  { id: 'b8', month: '2026-02', category: 'TOTAL', budgetAmount: 2640, actualAmount: 2381 },
];

export const editorAllocations: EditorAllocation[] = [
  { editorName: 'Ali Raza', month: '2026-02', channelId: '1', channelName: 'BenchDecoded', allocationPercent: 100, allocatedAmount: 400 },
  { editorName: 'Usman Khan', month: '2026-02', channelId: '2', channelName: 'TrialTales', allocationPercent: 100, allocatedAmount: 125 },
  { editorName: 'Hamza Malik', month: '2026-02', channelId: '3', channelName: 'VerdictVault', allocationPercent: 100, allocatedAmount: 350 },
  { editorName: 'Zain Ahmed', month: '2026-02', channelId: '4', channelName: 'TechVault', allocationPercent: 100, allocatedAmount: 500 },
  { editorName: 'Nadia Bashir', month: '2026-02', channelId: '5', channelName: 'FoodFlicks', allocationPercent: 100, allocatedAmount: 408 },
  { editorName: 'Farhan Shah', month: '2026-02', channelId: '6', channelName: 'LawBites', allocationPercent: 100, allocatedAmount: 89 },
];

export const monthStatuses: MonthStatus[] = [
  { month: '2026-02', isClosed: false, closedBy: null, closedAt: null },
  { month: '2026-01', isClosed: true, closedBy: 'Mudassir', closedAt: '2026-02-03 10:00' },
  { month: '2025-12', isClosed: true, closedBy: 'Mudassir', closedAt: '2026-01-05 09:30' },
];

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

export const REVENUE_SOURCE_LABELS: Record<RevenueSource, string> = {
  ADSENSE: 'YouTube AdSense',
  SPONSORSHIP: 'Sponsorship',
  AFFILIATE: 'Affiliate',
  OTHER: 'Other',
};
