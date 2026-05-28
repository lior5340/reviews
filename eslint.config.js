import { useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowUpRight, Bath, BookOpen, Building2, Calculator,
  ChevronLeft, Clock, Home, Lightbulb, Menu, PenTool, Search, Sparkles,
  UserRound, X
} from 'lucide-react';

const EBATH = 'https://www.ebath.co.il';

type Page = 'home' | 'category' | 'article' | 'designers' | 'tools';
type CategoryKey = 'bathrooms' | 'interior' | 'kitchens' | 'renovation' | 'inspiration' | 'trends';

type Article = {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryKey;
  categoryLabel: string;
  readTime: string;
  image: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  content: string[];
  ebathLink?: { label: string; url: string };
};

const categories: { key: CategoryKey; label: string; description: string; icon: React.ReactNode }[] = [
  { key: 'bathrooms', label: 'חדרי רחצה', description: 'ארונות, מקלחונים, ברזים, מראות ותכנון נכון', icon: <Bath size={18} /> },
  { key: 'interior', label: 'עיצוב פנים', description: 'סגנונות, צבעים, חומרים ותכנון חללים', icon: <Home size={18} /> },
  { key: 'kitchens', label: 'מטבחים', description: 'תכנון מטבחים, משטחים, תאורה ופרזול', icon: <Building2 size={18} /> },
  { key: 'renovation', label: 'שיפוץ ובנייה', description: 'תקציבים, בעלי מקצוע, טעויות ותכנון', icon: <PenTool size={18} /> },
  { key: 'inspiration', label: 'השראה', description: 'בתים, דירות וחללים מעוצבים מהארץ ומהעולם', icon: <Lightbulb size={18} /> },
  { key: 'trends', label: 'טרנדים בעולם', description: 'מילאנו, גרמניה, איטליה, ארה״ב ויפן', icon: <Sparkles size={18} /> },
];

const articles: Article[] = [
  {
    id: 'bathroom-trends-2026',
    title: 'חדרי רחצה ב־2026: פחות רעש, יותר חומר אמיתי',
    subtitle: 'הטרנדים שמעצבי פנים ואדריכלים בישראל צריכים להכיר לפני הפרויקט הבא',
    category: 'bathrooms',
    categoryLabel: 'חדרי רחצה',
    readTime: '8 דקות',
    image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1400',
    excerpt: 'חדר הרחצה הופך מחדר פונקציונלי לחלל רגשי: חומרים טבעיים, תאורה רכה, נגרות מדויקת ומקלחונים נקיים יותר.',
    author: 'מערכת Design House',
    date: '29.05.2026',
    tags: ['חדרי רחצה', 'טרנדים', 'עיצוב יוקרתי'],
    content: [
      'הכיוון המרכזי בחדרי רחצה מודרניים הוא מעבר מעיצוב עמוס לעיצוב רגוע, מדויק ובוגר. פחות קישוטים, יותר חומר אמיתי: עץ, אבן, זכוכית נקייה, גווני חול ומתכות חמות.',
      'בפרויקטים יוקרתיים רואים יותר ארונות אמבטיה תלויים, משטחי קוריאן או בוצ׳ר, מראות עגולות ותאורה שמרגישה כמו מלון בוטיק. הדגש הוא לא רק על יופי, אלא על תחושת סדר ונוחות יומיומית.',
      'הטיפ החשוב: להתחיל מתכנון אחסון. חדר רחצה יפה שלא יודע להכיל מגבות, מוצרי טיפוח וחומרי ניקוי ייראה מבולגן מהר מאוד.'
    ],
    ebathLink: { label: 'דוגמאות לארונות אמבטיה ב־eBath', url: `${EBATH}/lobby/ארונות-אמבטיה` },
  },
  {
    id: 'small-bathroom-guide',
    title: 'חדר רחצה קטן: איך לגרום ל־4 מ״ר להרגיש כמו סוויטה',
    subtitle: 'מדריך פרקטי לתכנון אמבטיה קטנה בלי לוותר על אחסון ועיצוב',
    category: 'bathrooms',
    categoryLabel: 'מדריך',
    readTime: '10 דקות',
    image: 'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=1200',
    excerpt: 'ארון תלוי, מראה גדולה, זכוכית שקופה ותאורה נכונה יכולים לשנות לגמרי את התחושה בחדר רחצה קטן.',
    author: 'מערכת Design House',
    date: '29.05.2026',
    tags: ['חדר רחצה קטן', 'מדריך', 'שיפוץ'],
    content: [
      'בחדר רחצה קטן כל סנטימטר קובע. במקום להעמיס רהיטים, עדיף לבחור ארון אמבטיה תלוי, כיור אינטגרלי ומקלחון זכוכית שקופה שמייצר המשכיות ויזואלית.',
      'גוונים בהירים אינם חובה, אבל הם עוזרים. אפשר לשלב קיר כוח כהה אחד, כל עוד שאר החלל מקבל תאורה טובה ומראה גדולה שמכפילה את האור.',
      'הטעות הנפוצה ביותר היא לקנות מוצרים לפני שמודדים. קודם מתכננים פתיחות, עומקים, נקודות מים וחשמל — ורק אחר כך בוחרים עיצוב.'
    ],
    ebathLink: { label: 'פתרונות לחדר רחצה קטן', url: `${EBATH}/lobby/ארונות-אמבטיה` },
  },
  {
    id: 'interior-designers-israel',
    title: 'איך לבחור מעצב פנים לפרויקט בישראל',
    subtitle: 'מה לבדוק בתיק עבודות, איך להבין סגנון, ואיפה לא להתפשר',
    category: 'interior',
    categoryLabel: 'עיצוב פנים',
    readTime: '7 דקות',
    image: 'https://images.pexels.com/photos/6585601/pexels-photo-6585601.jpeg?auto=compress&cs=tinysrgb&w=1200',
    excerpt: 'מעצב פנים טוב לא רק בוחר צבעים. הוא מנהל תכנון, תקציב, בעלי מקצוע והחלטות קטנות שמצטברות לתוצאה גדולה.',
    author: 'מערכת Design House',
    date: '29.05.2026',
    tags: ['מעצבי פנים', 'אדריכלות', 'שיפוץ'],
    content: [
      'הדבר הראשון שצריך לבדוק אצל מעצב פנים הוא התאמה לסגנון החיים שלכם. תמונות יפות באינסטגרם לא מספיקות — צריך להבין אם המעצב יודע לפתור בעיות אמיתיות.',
      'כדאי לבקש לראות פרויקטים מלאים, לא רק תמונות בודדות. פרויקט מלא מגלה תכנון, זרימה בין חללים, בחירת חומרים ויכולת לשמור על שפה אחידה.',
      'בפרויקט טוב יש שיתוף פעולה בין המעצב, הספקים והלקוח. ככל שהבחירות נעשות מוקדם יותר, כך יש פחות טעויות יקרות בשטח.'
    ],
  },
  {
    id: 'kitchen-lighting',
    title: 'תאורה למטבח: ההבדל בין מטבח יפה למטבח שעובד נכון',
    subtitle: 'שכבות תאורה, פסי לד, תאורה מעל אי ומניעת צללים באזורי עבודה',
    category: 'kitchens',
    categoryLabel: 'מטבחים',
    readTime: '6 דקות',
    image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=1200',
    excerpt: 'מטבח מודרני חייב תאורה חכמה: כללית, פונקציונלית ואווירתית. אחרת גם המטבח היקר ביותר ירגיש פחות טוב.',
    author: 'מערכת Design House',
    date: '29.05.2026',
    tags: ['מטבחים', 'תאורה', 'עיצוב פנים'],
    content: [
      'תכנון תאורה במטבח מתחיל בחלוקה לשלוש שכבות: תאורה כללית לחלל, תאורת עבודה לאזורים פעילים ותאורת אווירה שמדגישה חומרים.',
      'מעל אי מומלץ לחשוב גם על גובה הגוף וגם על פיזור האור. גוף יפה מדי שלא מאיר נכון ייצור צללים ויפגע בשימוש היומיומי.',
      'במטבחים פתוחים לסלון חשוב לשמור על שפה עיצובית מחוברת, כדי שהתאורה לא תרגיש כמו אלמנט מנותק.'
    ],
  },
  {
    id: 'renovation-budget',
    title: 'תקציב שיפוץ: איפה אנשים נופלים ומה חייבים לחשב מראש',
    subtitle: 'מדריך קצר לבניית תקציב שיפוץ ריאלי לדירה, בית או חדר רחצה',
    category: 'renovation',
    categoryLabel: 'שיפוץ',
    readTime: '9 דקות',
    image: 'https://images.pexels.com/photos/6315778/pexels-photo-6315778.jpeg?auto=compress&cs=tinysrgb&w=1200',
    excerpt: 'הבעיה בתקציב שיפוץ היא לא רק המחיר. הבעיה היא הדברים שלא חושבים עליהם בזמן: הובלות, התאמות, חריגות וגמרים.',
    author: 'מערכת Design House',
    date: '29.05.2026',
    tags: ['שיפוץ', 'תקציב', 'בנייה'],
    content: [
      'תקציב שיפוץ טוב צריך לכלול לפחות 10%–15% מרווח ביטחון. כמעט תמיד יש הפתעות: קירות לא ישרים, נקודות מים שצריך להזיז, חשמל שלא תוכנן נכון או גמרים שמתייקרים.',
      'חשוב להפריד בין עבודת קבלן לבין מוצרים. אריחים, כלים סניטריים, ברזים, ארונות, מראות ותאורה הם עולם תקציבי בפני עצמו.',
      'הדרך הנכונה לשלוט בתקציב היא לסגור מפרט מוקדם ככל האפשר ולא להשאיר החלטות לשטח.'
    ],
  },
  {
    id: 'milan-design-trends',
    title: 'מה מילאנו מלמדת את ישראל על עיצוב הבית',
    subtitle: 'חומרים, צבעים וחיבורים בין עיצוב איטלקי לבין בתים ישראליים',
    category: 'trends',
    categoryLabel: 'טרנדים בעולם',
    readTime: '6 דקות',
    image: 'https://images.pexels.com/photos/6958524/pexels-photo-6958524.jpeg?auto=compress&cs=tinysrgb&w=1200',
    excerpt: 'העיצוב האיטלקי ממשיך להשפיע על ישראל: פרופורציות שקטות, חומרים טבעיים והרבה פחות עומס ויזואלי.',
    author: 'מערכת Design House',
    date: '29.05.2026',
    tags: ['מילאנו', 'איטליה', 'טרנדים'],
    content: [
      'הלקח המרכזי מהעיצוב האיטלקי הוא איזון. לא כל פריט צריך לצעוק. דווקא בחירה מדויקת של חומר, קו ופרופורציה יוצרת תחושת יוקרה.',
      'בישראל אפשר לתרגם את זה לחללים שימושיים יותר: פחות עומס, יותר אחסון נסתר, צבעים רגועים וחיבור בין פנים לחוץ.',
      'העיקרון שעובד כמעט בכל בית: לבחור חומר מוביל אחד ולתת לו להוביל את כל השפה העיצובית.'
    ],
  },
];

const designers = [
  { name: 'דנה לוי', area: 'תל אביב והמרכז', specialty: 'דירות יוקרה וחדרי רחצה', projects: 42 },
  { name: 'מיכל אדרי', area: 'חיפה והצפון', specialty: 'בתים פרטיים ושיפוצים', projects: 31 },
  { name: 'רוני ברק', area: 'ירושלים והסביבה', specialty: 'עיצוב מודרני חם', projects: 28 },
];

function AppHeader({ setPage, setCategory }: { setPage: (p: Page) => void; setCategory: (c: CategoryKey) => void }) {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: 'בית', action: () => setPage('home') },
    { label: 'חדרי רחצה', action: () => { setCategory('bathrooms'); setPage('category'); } },
    { label: 'עיצוב פנים', action: () => { setCategory('interior'); setPage('category'); } },
    { label: 'מעצבי פנים', action: () => setPage('designers') },
    { label: 'כלים חכמים', action: () => setPage('tools') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur-xl" dir="rtl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button onClick={() => setPage('home')} className="flex items-baseline gap-1 text-right">
          <span className="text-2xl font-black tracking-tight text-stone-950">DESIGN</span>
          <span className="text-2xl font-light tracking-tight text-stone-500">HOUSE</span>
          <span className="mr-2 hidden rounded-full bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-500 sm:inline">ישראל</span>
        </button>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <button key={item.label} onClick={item.action} className="text-sm font-semibold text-stone-600 transition hover:text-stone-950">
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-700 transition hover:bg-stone-200 md:flex" aria-label="חיפוש">
            <Search size={18} />
          </button>
          <a href={EBATH} target="_blank" rel="noreferrer" className="hidden rounded-full bg-stone-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-stone-700 md:inline-flex">
            eBath
          </a>
          <button onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 md:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-stone-100 bg-white px-4 py-3 md:hidden">
          {nav.map((item) => (
            <button key={item.label} onClick={() => { item.action(); setOpen(false); }} className="block w-full rounded-xl px-3 py-3 text-right font-semibold text-stone-700 hover:bg-stone-50">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function ArticleCard({ article, onOpen }: { article: Article; onOpen: (id: string) => void }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <button onClick={() => onOpen(article.id)} className="block w-full text-right">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={article.image} alt={article.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-stone-700 backdrop-blur">{article.categoryLabel}</span>
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-center gap-2 text-xs text-stone-400"><Clock size={13} />{article.readTime}</div>
          <h3 className="mb-2 text-xl font-black leading-tight text-stone-950 group-hover:text-stone-700">{article.title}</h3>
          <p className="mb-4 line-clamp-2 text-sm leading-7 text-stone-500">{article.excerpt}</p>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-stone-800">קרא כתבה <ChevronLeft size={16} /></span>
        </div>
      </button>
    </article>
  );
}

export default function DesignHouse() {
  const [page, setPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('bathrooms');
  const [selectedArticleId, setSelectedArticleId] = useState(articles[0].id);

  const selectedArticle = useMemo(() => articles.find((a) => a.id === selectedArticleId) || articles[0], [selectedArticleId]);
  const categoryArticles = useMemo(() => articles.filter((a) => a.category === selectedCategory), [selectedCategory]);
  const featured = articles[0];

  const openArticle = (id: string) => { setSelectedArticleId(id); setPage('article'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const openCategory = (key: CategoryKey) => { setSelectedCategory(key); setPage('category'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="min-h-screen bg-[#f7f4ef] font-sans text-stone-950" dir="rtl">
      <AppHeader setPage={setPage} setCategory={setSelectedCategory} />

      {page === 'home' && (
        <main>
          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
              <button onClick={() => openArticle(featured.id)} className="group relative min-h-[540px] overflow-hidden rounded-[2rem] text-right shadow-2xl">
                <img src={featured.image} alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute bottom-0 right-0 max-w-3xl p-7 text-white md:p-10">
                  <div className="mb-4 flex items-center gap-3"><span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">כתבת שער</span><span className="text-sm text-white/70">{featured.readTime}</span></div>
                  <h1 className="mb-4 text-4xl font-black leading-tight md:text-6xl">{featured.title}</h1>
                  <p className="mb-6 max-w-2xl text-lg leading-8 text-white/80">{featured.subtitle}</p>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-stone-950">קרא עכשיו <ArrowLeft size={16} /></span>
                </div>
              </button>

              <aside className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-stone-400">Design House</p>
                <h2 className="mb-4 text-3xl font-black leading-tight">מגזין עיצוב ישראלי שנבנה לסמכות בגוגל</h2>
                <p className="mb-6 leading-8 text-stone-600">כתבות עומק, פרויקטים, מעצבי פנים, מדריכי שיפוץ וכלים חכמים. המטרה: אתר שנראה כמו מערכת תוכן אמיתית — לא כמו דף שמוכר מוצרים.</p>
                <div className="grid gap-3">
                  <button onClick={() => setPage('designers')} className="flex items-center justify-between rounded-2xl bg-stone-950 p-4 text-right font-bold text-white"><span className="flex items-center gap-2"><UserRound size={18} />אינדקס מעצבי פנים</span><ChevronLeft size={18} /></button>
                  <button onClick={() => setPage('tools')} className="flex items-center justify-between rounded-2xl bg-amber-100 p-4 text-right font-bold text-stone-950"><span className="flex items-center gap-2"><Calculator size={18} />כלים ומחשבונים</span><ChevronLeft size={18} /></button>
                </div>
              </aside>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div><p className="text-xs font-black uppercase tracking-[0.25em] text-stone-400">קטגוריות</p><h2 className="text-3xl font-black">הבסיס לאתר מוביל</h2></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <button key={cat.key} onClick={() => openCategory(cat.key)} className="group rounded-3xl border border-stone-200 bg-white p-5 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-100 text-stone-700 group-hover:bg-stone-950 group-hover:text-white">{cat.icon}</div>
                  <h3 className="mb-2 text-xl font-black">{cat.label}</h3>
                  <p className="text-sm leading-7 text-stone-500">{cat.description}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
            <div className="mb-6 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[0.25em] text-stone-400">מאמרים ראשונים</p><h2 className="text-3xl font-black">תוכן שמתחיל לבנות סמכות</h2></div></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => <ArticleCard key={article.id} article={article} onOpen={openArticle} />)}
            </div>
          </section>
        </main>
      )}

      {page === 'category' && (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <button onClick={() => setPage('home')} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-stone-950"><ChevronLeft size={16} />חזרה לבית</button>
          <div className="mb-8 rounded-[2rem] bg-stone-950 p-8 text-white">
            <p className="mb-2 text-sm text-stone-400">קטגוריה</p>
            <h1 className="mb-3 text-4xl font-black">{categories.find(c => c.key === selectedCategory)?.label}</h1>
            <p className="max-w-2xl leading-8 text-stone-300">{categories.find(c => c.key === selectedCategory)?.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryArticles.map((article) => <ArticleCard key={article.id} article={article} onOpen={openArticle} />)}
          </div>
        </main>
      )}

      {page === 'article' && (
        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <button onClick={() => setPage('home')} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-stone-950"><ChevronLeft size={16} />חזרה</button>
          <article className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
            <img src={selectedArticle.image} alt={selectedArticle.title} className="h-[420px] w-full object-cover" />
            <div className="p-7 md:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-stone-500"><span className="rounded-full bg-stone-100 px-3 py-1 font-bold">{selectedArticle.categoryLabel}</span><span>{selectedArticle.date}</span><span>·</span><span>{selectedArticle.readTime}</span></div>
              <h1 className="mb-4 text-4xl font-black leading-tight md:text-5xl">{selectedArticle.title}</h1>
              <p className="mb-8 text-xl leading-9 text-stone-600">{selectedArticle.subtitle}</p>
              <div className="mb-8 flex flex-wrap gap-2">{selectedArticle.tags.map(tag => <span key={tag} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">#{tag}</span>)}</div>
              <div className="space-y-6 text-lg leading-10 text-stone-700">
                {selectedArticle.content.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              {selectedArticle.ebathLink && (
                <div className="mt-10 rounded-3xl border border-stone-200 bg-stone-50 p-6">
                  <p className="mb-3 text-sm font-bold text-stone-500">קישור מומלץ בצורה טבעית</p>
                  <a href={selectedArticle.ebathLink.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 font-black text-white hover:bg-stone-700">
                    {selectedArticle.ebathLink.label} <ArrowUpRight size={16} />
                  </a>
                </div>
              )}
            </div>
          </article>
        </main>
      )}

      {page === 'designers' && (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-8 rounded-[2rem] bg-white p-8 shadow-sm"><p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-stone-400">אינדקס מקצועי</p><h1 className="mb-3 text-4xl font-black">מעצבי פנים מומלצים</h1><p className="max-w-2xl leading-8 text-stone-600">זה יהיה מנוע הקישורים והסמכות של האתר: כל מעצב יקבל עמוד פרופיל, פרויקטים וקישור לשיתוף.</p></div>
          <div className="grid gap-5 md:grid-cols-3">
            {designers.map(d => <div key={d.name} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100"><UserRound /></div><h2 className="text-2xl font-black">{d.name}</h2><p className="mt-2 text-stone-500">{d.area}</p><p className="mt-3 font-bold text-stone-700">{d.specialty}</p><p className="mt-5 text-sm text-stone-400">{d.projects} פרויקטים במערכת</p></div>)}
          </div>
        </main>
      )}

      {page === 'tools' && (
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-8 rounded-[2rem] bg-stone-950 p-8 text-white"><p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-stone-400">AI Tools</p><h1 className="mb-3 text-4xl font-black">כלים חכמים לעיצוב ושיפוץ</h1><p className="max-w-2xl leading-8 text-stone-300">בשלב הבא נוסיף מחשבונים אמיתיים: עלות שיפוץ, בחירת ארון אמבטיה, התאמת מקלחון ובוחר סגנון.</p></div>
          <div className="grid gap-5 md:grid-cols-3">
            {[['מחשבון שיפוץ חדר רחצה', 'הערכת עלות לפי גודל, רמת גמר ומוצרים'], ['בוחר סגנון עיצוב', 'שאלון קצר שממליץ על סגנון מתאים'], ['מחשבון ארון אמבטיה', 'בחירת רוחב, עומק, חומר וסוג כיור']].map(([title, desc]) => <div key={title} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"><Calculator className="mb-4" /><h2 className="text-xl font-black">{title}</h2><p className="mt-3 leading-7 text-stone-500">{desc}</p></div>)}
          </div>
        </main>
      )}

      <footer className="mt-10 bg-stone-950 px-4 py-10 text-stone-400">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div><p className="text-xl font-black text-white">DESIGN HOUSE</p><p className="mt-2 text-sm">מגזין עיצוב פנים, אדריכלות וחדרי רחצה בישראל.</p></div>
          <div className="flex flex-wrap gap-3 text-sm"><a href={EBATH} target="_blank" rel="noreferrer" className="rounded-full bg-white px-4 py-2 font-bold text-stone-950">eBath</a><span className="rounded-full border border-stone-800 px-4 py-2">designhouse.co.il</span></div>
        </div>
      </footer>
    </div>
  );
}
