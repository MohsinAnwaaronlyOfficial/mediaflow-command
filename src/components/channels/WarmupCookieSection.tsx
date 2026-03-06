import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { X, Plus, Sparkles, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { channelsApi } from '@/api/channels';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const NICHE_SITES: Record<string, string[]> = {
  'Judge / Courtroom': ['lawandcrime.com', 'law.com', 'cnn.com', 'reddit.com', 'google.com', 'nytimes.com', 'washingtonpost.com'],
  'Comedy / Funny': ['reddit.com', 'buzzfeed.com', 'boredpanda.com', 'google.com', 'twitter.com', 'tiktok.com'],
  'News / Current Events': ['cnn.com', 'bbc.com', 'reuters.com', 'apnews.com', 'nytimes.com', 'google.com', 'reddit.com'],
  'Tech / Gadgets': ['theverge.com', 'techcrunch.com', 'arstechnica.com', 'wired.com', 'reddit.com', 'google.com'],
  'Food / Cooking': ['allrecipes.com', 'foodnetwork.com', 'seriouseats.com', 'reddit.com', 'google.com', 'pinterest.com'],
  'Finance / Investing': ['cnbc.com', 'bloomberg.com', 'wsj.com', 'investopedia.com', 'reddit.com', 'google.com'],
  'Scary / Horror': ['reddit.com', 'creepypasta.com', 'ranker.com', 'google.com', 'twitter.com'],
  'Motivation / Self-Help': ['medium.com', 'ted.com', 'reddit.com', 'google.com', 'goodreads.com'],
  'Animals / Nature': ['nationalgeographic.com', 'reddit.com', 'bbc.com', 'google.com', 'animalsplanet.com'],
  'History / Documentary': ['history.com', 'britannica.com', 'reddit.com', 'google.com', 'smithsonianmag.com'],
  'Sports / Highlights': ['espn.com', 'bleacherreport.com', 'reddit.com', 'google.com', 'sports.yahoo.com'],
};

const ALL_DEFAULT_SITES = [
  'google.com', 'reddit.com', 'cnn.com', 'nytimes.com', 'washingtonpost.com',
  'bbc.com', 'theverge.com', 'techcrunch.com', 'espn.com', 'amazon.com',
  'wikipedia.org', 'twitter.com', 'medium.com', 'pinterest.com', 'buzzfeed.com',
  'foxnews.com', 'reuters.com', 'bloomberg.com', 'wired.com', 'apnews.com',
  'huffpost.com', 'cnbc.com', 'yahoo.com', 'msn.com', 'usatoday.com',
  'forbes.com', 'businessinsider.com', 'wsj.com', 'npr.org', 'abcnews.go.com',
];

interface WarmupCookieSectionProps {
  channelId: string;
  niche: string;
}

export default function WarmupCookieSection({ channelId, niche }: WarmupCookieSectionProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [useRecommended, setUseRecommended] = useState(true);
  const [customSites, setCustomSites] = useState<string[]>([]);
  const [siteInput, setSiteInput] = useState('');
  const [pagesPerSite, setPagesPerSite] = useState(3);
  const [secondsPerPage, setSecondsPerPage] = useState(45);
  const [showAllSites, setShowAllSites] = useState(false);
  const [generating, setGenerating] = useState(false);

  const nicheSites = NICHE_SITES[niche] || NICHE_SITES['Judge / Courtroom'];

  const addChip = (value: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed) && list.length < 30) {
      setter(prev => [...prev, trimmed]);
      inputSetter('');
    }
  };

  const removeChip = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter(v => v !== value));
  };

  const handleGenerateKeywords = async () => {
    setGenerating(true);
    try {
      const res = await channelsApi.generateKeywords(niche, 15);
      const generated: string[] = res.data?.keywords || [`${niche} videos`, `best ${niche}`, `${niche} compilation`, `${niche} 2026`, `top ${niche}`];
      setKeywords(prev => [...new Set([...prev, ...generated])].slice(0, 30));
      toast.success(`Generated ${generated.length} keywords`);
    } catch {
      const fallback = [`${niche} videos`, `best ${niche}`, `${niche} compilation`, `${niche} 2026`, `top ${niche}`];
      setKeywords(prev => [...new Set([...prev, ...fallback])].slice(0, 30));
      toast.success('Generated keywords (offline)');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-5">
      <h4 className="text-sm font-semibold border-b border-border pb-2">🔥 Warmup & Cookie Settings</h4>

      {/* Warmup Keywords */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold">Warmup Keywords ({keywords.length}/30)</Label>
          <button
            onClick={handleGenerateKeywords}
            disabled={generating}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-xs font-semibold hover:bg-primary/30 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-3 h-3" /> {generating ? 'Generating...' : '🤖 Generate with Gemini AI'}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-muted/20 rounded-lg border border-border">
          {keywords.map(kw => (
            <span key={kw} className="pill pill-published flex items-center gap-1">
              {kw}
              <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => removeChip(kw, setKeywords)} />
            </span>
          ))}
          <input
            value={keywordInput}
            onChange={e => setKeywordInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addChip(keywordInput, keywords, setKeywords, setKeywordInput); } }}
            placeholder="Type keyword + Enter"
            className="bg-transparent text-xs outline-none flex-1 min-w-[120px] placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Warmup Tags */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold">Warmup Tags (YouTube search simulation)</Label>
        <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-muted/20 rounded-lg border border-border">
          {tags.map(tag => (
            <span key={tag} className="pill pill-queued flex items-center gap-1">
              {tag}
              <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => removeChip(tag, setTags)} />
            </span>
          ))}
          <input
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addChip(tagInput, tags, setTags, setTagInput); } }}
            placeholder="Type tag + Enter"
            className="bg-transparent text-xs outline-none flex-1 min-w-[120px] placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Cookie Strengthening Sites */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label className="text-xs font-semibold">🍪 USA Cookie Sites</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><Info className="w-3.5 h-3.5 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent className="max-w-[250px] text-xs">
                These sites are visited before YouTube to build a legitimate US browsing profile
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
          <span className="text-xs">Use Recommended Sites (by niche)</span>
          <Switch checked={useRecommended} onCheckedChange={setUseRecommended} />
        </div>

        {useRecommended ? (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {nicheSites.map(site => (
                <span key={site} className="pill pill-published">{site}</span>
              ))}
            </div>
            <button
              onClick={() => setShowAllSites(!showAllSites)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {showAllSites ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              View All {ALL_DEFAULT_SITES.length} Default Sites
            </button>
            {showAllSites && (
              <div className="flex flex-wrap gap-1.5 p-3 bg-muted/10 rounded-lg border border-border">
                {ALL_DEFAULT_SITES.map(site => (
                  <span key={site} className="pill pill-editing text-[10px]">{site}</span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-muted/20 rounded-lg border border-border">
              {customSites.map(site => (
                <span key={site} className="pill pill-uploading flex items-center gap-1">
                  {site}
                  <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => removeChip(site, setCustomSites)} />
                </span>
              ))}
              <input
                value={siteInput}
                onChange={e => setSiteInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addChip(siteInput, customSites, setCustomSites, setSiteInput); } }}
                placeholder="Type URL + Enter"
                className="bg-transparent text-xs outline-none flex-1 min-w-[150px] placeholder:text-muted-foreground"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Pages per site (1-5)</Label>
            <Input type="number" min={1} max={5} value={pagesPerSite} onChange={e => setPagesPerSite(Number(e.target.value))} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Seconds per page (15-90)</Label>
            <Input type="number" min={15} max={90} value={secondsPerPage} onChange={e => setSecondsPerPage(Number(e.target.value))} className="mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
