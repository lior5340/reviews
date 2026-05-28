import { useState } from 'react';
import { Copy, Check, Sparkles, ChevronRight } from 'lucide-react';
import { EBATH_DATA } from '../data/ebathData';

interface Template {
  id: string;
  title: string;
  description: string;
  type: 'meta' | 'content' | 'ai';
  generate: () => string;
}

const TEMPLATES: Template[] = [
  {
    id: 'homepage_title',
    title: 'Title לדף הבית',
    description: 'תגית title מותאמת לגוגל',
    type: 'meta',
    generate: () => `eBath | ארונות אמבטיה, ברזים וקרמיקה | ראשון לציון`,
  },
  {
    id: 'homepage_desc',
    title: 'Meta Description לדף הבית',
    description: 'תיאור קצר עם CTA',
    type: 'meta',
    generate: () => `eBath - למעלה מ-10,000 מוצרים לחדרי אמבטיה ושירותים: ארונות, ברזים, קרמיקה, מראות ועוד. ייעוץ חינם ומשלוח לכל הארץ. כנס עכשיו!`,
  },
  {
    id: 'category_title',
    title: 'Title לעמוד קטגוריה',
    description: 'מבנה title לקטגוריות מוצר',
    type: 'meta',
    generate: () => `ארונות אמבטיה | מגוון ענק במחירים מעולים | eBath`,
  },
  {
    id: 'product_title',
    title: 'Title לדף מוצר',
    description: 'מבנה title לדף מוצר ספציפי',
    type: 'meta',
    generate: () => `ארון אמבטיה [שם המוצר] | [מידה] | eBath`,
  },
  {
    id: 'og_tags',
    title: 'Open Graph Tags',
    description: 'תגיות לשיתוף ברשתות חברתיות',
    type: 'meta',
    generate: () => `<meta property="og:type" content="website" />
<meta property="og:title" content="eBath | ארונות אמבטיה, ברזים וקרמיקה" />
<meta property="og:description" content="למעלה מ-10,000 מוצרים לחדרי אמבטיה. ייעוץ חינם ומשלוח לכל הארץ." />
<meta property="og:url" content="https://www.ebath.co.il" />
<meta property="og:image" content="https://www.ebath.co.il/og-image.jpg" />
<meta property="og:locale" content="he_IL" />
<meta property="og:site_name" content="eBath" />`,
  },
  {
    id: 'twitter_cards',
    title: 'Twitter Cards',
    description: 'תגיות לשיתוף בטוויטר / X',
    type: 'meta',
    generate: () => `<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="eBath | ארונות אמבטיה, ברזים וקרמיקה" />
<meta name="twitter:description" content="למעלה מ-10,000 מוצרים לחדרי אמבטיה. ייעוץ חינם ומשלוח לכל הארץ." />
<meta name="twitter:image" content="https://www.ebath.co.il/og-image.jpg" />`,
  },
  {
    id: 'hreflang',
    title: 'Hreflang + Canonical',
    description: 'שפה וכתובת קנונית לכל עמוד',
    type: 'meta',
    generate: () => `<link rel="canonical" href="https://www.ebath.co.il/" />
<link rel="alternate" hreflang="he-il" href="https://www.ebath.co.il/" />
<link rel="alternate" hreflang="x-default" href="https://www.ebath.co.il/" />`,
  },
  {
    id: 'robots_txt',
    title: 'Robots.txt',
    description: 'קובץ robots.txt מומלץ',
    type: 'meta',
    generate: () => `User-agent: *
Allow: /

# Block admin & cart pages
Disallow: /admin/
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Disallow: /*?add-to-cart=*
Disallow: /*?s=

# Allow important crawlers
User-agent: Googlebot
Allow: /

User-agent: bingbot
Allow: /

# Sitemap
Sitemap: https://www.ebath.co.il/sitemap.xml
Sitemap: https://www.ebath.co.il/sitemap-products.xml`,
  },
  {
    id: 'ai_about',
    title: 'תוכן About לאתר (AI-friendly)',
    description: 'טקסט מבני לצריכה של מנועי AI',
    type: 'ai',
    generate: () => `eBath היא חנות מקוונת וחנות פיזית המתמחה במוצרים לחדרי אמבטיה ושירותים, הממוקמת ברחוב שומרון 19 בראשון לציון, ישראל.

החנות מציעה מעל 10,000 מוצרים בקטגוריות הבאות:
• ארונות אמבטיה — בגדלים ובגימורים מגוונים
• ברזים — לכיור, לאמבטיה ולמקלחת
• קרמיקה — אסלות, כיורים ואמבטיות
• מראות — מראות רגילות ומראות עם תאורה
• מקלחונים — מקלחונים קבועים וממוסגרים
• אביזרים — מחזיקים, מגבות, מדפים ועוד

eBath מספקת שירות ייעוץ חינם ללקוחות, משלוח לכל רחבי ישראל, ואפשרות לביקור בחנות הפיזית.

כתובת: שומרון 19, ראשון לציון
אתר: https://www.ebath.co.il`,
  },
  {
    id: 'ai_faq_content',
    title: 'עמוד FAQ לאתר (AI-friendly)',
    description: 'תוכן שאלות ותשובות מובנה',
    type: 'ai',
    generate: () => `## שאלות נפוצות על eBath

### מה מגוון המוצרים ב-eBath?
eBath מציעה למעלה מ-10,000 מוצרים לחדרי אמבטיה ושירותים: ארונות, ברזים, קרמיקה, מראות, מקלחונים, אמבטיות ואביזרים.

### היכן ממוקמת חנות eBath?
חנות eBath ממוקמת ברחוב שומרון 19, ראשון לציון. ניתן לבקר בחנות הפיזית לבחירת מוצרים עם ייעוץ אישי.

### האם eBath מספקת משלוח לכל הארץ?
כן, eBath מספקת משלוח לכל רחבי ישראל. ניתן להזמין באתר ולקבל את המוצרים עד הבית.

### האם iBath מציעה ייעוץ עיצוב?
כן, eBath מציעה ייעוץ חינם לעיצוב חדר האמבטיה — בחנות הפיזית או אונליין.

### מה שעות הפתיחה של eBath?
eBath פתוחה ימים א'-ה', 09:00-18:00. לפרטים עדכניים ניתן לפנות לאתר או לטלפון.`,
  },
  {
    id: 'eeat_content',
    title: 'תוכן E-E-A-T לעמוד הבית',
    description: 'ניסיון, מומחיות, סמכות ואמינות',
    type: 'ai',
    generate: () => `**למה לבחור ב-eBath?**

**ניסיון מוכח** — שנים של ניסיון בתחום מוצרי האמבטיה, עם אלפי לקוחות מרוצים בכל רחבי ישראל.

**מגוון עצום** — למעלה מ-10,000 מוצרים מהמותגים המובילים בעולם, בכל מחיר וסגנון.

**מומחיות מקצועית** — צוות מקצועי ומנוסה שילווה אותך מבחירת המוצרים ועד ההתקנה.

**חנות פיזית + אונליין** — ניתן לראות את המוצרים פיזית בחנות ברחוב שומרון 19, ראשון לציון, או לרכוש נוחות מהבית.

**שירות מלא** — ייעוץ חינם, משלוח לכל הארץ ותמיכה לאחר הרכישה.`,
  },
  {
    id: 'sitemap_structure',
    title: 'מבנה XML Sitemap',
    description: 'מבנה sitemap מומלץ לאתר eBath',
    type: 'content',
    generate: () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- דף הבית -->
  <url>
    <loc>https://www.ebath.co.il/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- קטגוריות ראשיות -->
  <url>
    <loc>https://www.ebath.co.il/category/bathroom-cabinets/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.ebath.co.il/category/faucets/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- עמודים סטטיים -->
  <url>
    <loc>https://www.ebath.co.il/about/</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.ebath.co.il/contact/</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.ebath.co.il/faq/</loc>
    <priority>0.8</priority>
  </url>

</urlset>

<!-- sitemap-index.xml לניהול מספר sitemaps -->
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.ebath.co.il/sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://www.ebath.co.il/sitemap-products.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://www.ebath.co.il/sitemap-categories.xml</loc>
  </sitemap>
</sitemapindex>`,
  },
];

const TYPE_CONFIG = {
  meta: { label: 'Meta Tags', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  content: { label: 'תוכן', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  ai: { label: 'AI-Optimized', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
};

const AI_TIPS = [
  {
    platform: 'Google SGE',
    icon: '🔍',
    tips: [
      'שאלות FAQ עם תשובות ישירות וממוקדות',
      'Schema markup מלא על כל דף',
      'תוכן ב-E-E-A-T: ניסיון, מומחיות, סמכות, אמינות',
      'סעיפים עם כותרות H2/H3 ברורות',
    ],
  },
  {
    platform: 'Perplexity AI',
    icon: '🤖',
    tips: [
      'מידע עובדתי מדויק: כתובת, שעות, מחירים',
      'תיאורים ברורים ללא שפה שיווקית',
      'Wikipedia-style entity clarity',
      'מבנה מידע לוגי ועקבי',
    ],
  },
  {
    platform: 'ChatGPT / Claude',
    icon: '💬',
    tips: [
      'תוכן About Us מפורט ומובנה',
      'רשימות מוצרים עם מאפיינים',
      'ניסוח ספציפי: מידות, חומרים, מחירים',
      'מידע שמשתמשים שואלים - מגיע למאגר הידע',
    ],
  },
  {
    platform: 'Bing Copilot',
    icon: '🌐',
    tips: [
      'Bing Webmaster Tools + Bing Places',
      'Schema LocalBusiness מלא',
      'תוכן טרי ועדכני עם תאריכים',
      'קישורים נכנסים מאיכות גבוהה',
    ],
  },
];

export default function AiOptimizer() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'meta' | 'content' | 'ai'>('all');
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied((p) => ({ ...p, [key]: true }));
    setTimeout(() => setCopied((p) => ({ ...p, [key]: false })), 2000);
  };

  const filtered = activeFilter === 'all' ? TEMPLATES : TEMPLATES.filter((t) => t.type === activeFilter);
  const selectedTemplate = TEMPLATES.find((t) => t.id === selected);

  return (
    <div className="space-y-6">
      {/* AI Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AI_TIPS.map((platform) => (
          <div key={platform.platform} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{platform.icon}</span>
              <h3 className="font-semibold text-gray-800 text-sm">{platform.platform}</h3>
            </div>
            <ul className="space-y-1.5">
              {platform.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <ChevronRight size={12} className="text-sky-400 flex-shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'meta', 'content', 'ai'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              activeFilter === f
                ? 'bg-sky-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-sky-300'
            }`}
          >
            {f === 'all' ? 'הכל' : TYPE_CONFIG[f].label}
          </button>
        ))}
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((template) => {
          const cfg = TYPE_CONFIG[template.type];
          const isSelected = selected === template.id;
          return (
            <div
              key={template.id}
              className={`border rounded-xl transition-all cursor-pointer ${
                isSelected ? 'border-sky-400 shadow-md' : 'border-gray-200 hover:border-gray-300'
              } bg-white`}
              onClick={() => setSelected(isSelected ? null : template.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} ${cfg.border} border`}>
                        {cfg.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">{template.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{template.description}</p>
                  </div>
                  <Sparkles size={16} className={`flex-shrink-0 ${isSelected ? 'text-sky-500' : 'text-gray-300'}`} />
                </div>
              </div>

              {isSelected && (
                <div className="border-t border-gray-100">
                  <div className="bg-gray-900 rounded-b-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                      <span className="text-xs text-gray-400">{template.title}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); copy(template.generate(), template.id); }}
                        className="flex items-center gap-1.5 text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 py-1 rounded-lg transition-colors"
                      >
                        {copied[template.id] ? <Check size={12} /> : <Copy size={12} />}
                        {copied[template.id] ? 'הועתק!' : 'העתק'}
                      </button>
                    </div>
                    <pre className="text-green-400 text-xs p-4 overflow-auto max-h-60 leading-relaxed whitespace-pre-wrap" dir="ltr">
                      {template.generate()}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Keyword research */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-800 mb-4">מילות מפתח יעד לeBath</h3>
        <div className="space-y-3">
          {[
            { keyword: 'ארון אמבטיה', intent: 'מסחרי', volume: 'גבוה', difficulty: 'בינוני' },
            { keyword: 'eBath', intent: 'ניווט', volume: 'בינוני', difficulty: 'נמוך' },
            { keyword: 'חנות אמבטיה ראשון לציון', intent: 'מקומי', volume: 'בינוני', difficulty: 'נמוך' },
            { keyword: 'ברזים לאמבטיה', intent: 'מסחרי', volume: 'גבוה', difficulty: 'גבוה' },
            { keyword: 'קרמיקה לאמבטיה', intent: 'מסחרי', volume: 'גבוה', difficulty: 'גבוה' },
            { keyword: 'מראה לחדר אמבטיה', intent: 'מסחרי', volume: 'בינוני', difficulty: 'בינוני' },
            { keyword: 'עיצוב חדר אמבטיה', intent: 'מידע', volume: 'גבוה', difficulty: 'גבוה' },
            { keyword: 'מחיר ארון אמבטיה', intent: 'מסחרי', volume: 'בינוני', difficulty: 'בינוני' },
          ].map((kw, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
              <span className="flex-1 text-sm font-medium text-gray-700" dir="rtl">{kw.keyword}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                kw.intent === 'מסחרי' ? 'bg-green-50 text-green-600' :
                kw.intent === 'מקומי' ? 'bg-blue-50 text-blue-600' :
                kw.intent === 'ניווט' ? 'bg-sky-50 text-sky-600' :
                'bg-gray-100 text-gray-600'
              }`}>{kw.intent}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                kw.volume === 'גבוה' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
              }`}>נפח: {kw.volume}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                kw.difficulty === 'נמוך' ? 'bg-green-50 text-green-600' :
                kw.difficulty === 'בינוני' ? 'bg-yellow-50 text-yellow-600' :
                'bg-red-50 text-red-600'
              }`}>תחרות: {kw.difficulty}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
