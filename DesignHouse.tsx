import {
  MapPin, Clock, ExternalLink, Star, BadgeCheck, Heart,
  Users, Zap, ShieldCheck, Truck, HeadphonesIcon, Package, Phone
} from 'lucide-react';

const ABOUT_HERO = 'https://images.pexels.com/photos/6316065/pexels-photo-6316065.jpeg?auto=compress&cs=tinysrgb&w=1200';
const STORE_IMG = 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800';

const VALUES = [
  {
    icon: <BadgeCheck size={22} />,
    title: 'מומחיות אמיתית',
    desc: 'אנחנו מתמחים אך ורק בחדרי אמבטיה ומטבח. לא חנות כלי בית כללית — מומחים בתחום אחד, לעומק.',
  },
  {
    icon: <Heart size={22} />,
    title: 'שירות אישי',
    desc: 'כל לקוח מקבל ייעוץ מותאם אישית. אנחנו מקשיבים, מבינים את הצרכים ומוצאים את הפתרון הנכון.',
  },
  {
    icon: <Package size={22} />,
    title: 'מגוון עצום',
    desc: 'למעלה מ-10,000 מוצרים ב-20+ קטגוריות — ארונות, מקלחונים, ברזים, ראשי גשם, אביזרים ועוד.',
  },
  {
    icon: <Zap size={22} />,
    title: 'מחירים תחרותיים',
    desc: 'קנייה ישירה מספקים מובילים מאפשרת לנו להציע מחירים שלא תמצאו במקום אחר.',
  },
];

const TEAM_HIGHLIGHTS = [
  'ניסיון רב-שנתי מצטבר בתחום מוצרי האמבטיה',
  'ייעוץ מקצועי ללא עלות — גם אחרי הרכישה',
  'צוות שמכיר כל מותג ומוצר לעומק',
  'תמיכה בשפה עברית, מקצועית ואדיבה',
];

const MILESTONES = [
  { value: '10,000+', desc: 'מוצרים בקטלוג' },
  { value: '20+', desc: 'קטגוריות מוצר' },
  { value: 'כל הארץ', desc: 'פיזור לקוחות' },
  { value: 'חינם', desc: 'ייעוץ לכל לקוח' },
];

const CATEGORY_GROUPS = [
  {
    title: 'אמבטיה',
    items: ['ארונות אמבטיה', 'אביזרי אמבטיה', 'מקלחונים', 'ידיות אחיזה לאמבט', 'מושבי אסלה', 'מושבים למקלחת', 'מראות לאמבטיה', 'אסלות'],
  },
  {
    title: 'ברזים ומים',
    items: ['ברזים למטבח', 'ברזים לאמבטיה', 'ראשי גשם', 'מזלפים', 'מוטות פינוק למקלחת'],
  },
  {
    title: 'עיצוב ואביזרים',
    items: ['מראות מגדילות', 'מחממי מגבות', 'פחי אשפה', 'ידיות לריהוט ומטבחים', 'אביזרים למטבח', 'פסילות לויאלון'],
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-0 -mx-4 -mt-8" dir="rtl">

      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <img
          src={ABOUT_HERO}
          alt="eBath חנות אמבטיה"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-10 w-full">
          <p className="text-sky-400 font-semibold text-sm mb-1 tracking-wide uppercase">אודות eBath</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            הסיפור שלנו
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                מוצרי אמבטיה בשיווק ישיר
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-800">eBath</strong> היא חנות מקוונת ומחסן ישראלי המתמחה באופן
                  בלעדי במוצרים לחדרי אמבטיה ומטבח.
                </p>
                <p>
                  המחסן ממוקם ב<strong className="text-gray-800">המרכבה 19, א.ת. חולון</strong>, ומציע מגוון
                  של למעלה מ-<strong className="text-gray-800">10,000 מוצרים</strong> ב-20 קטגוריות
                  מהמותגים המובילים בישראל ובעולם.
                </p>
                <p>
                  בניגוד לחנויות כלי בית כלליות, eBath מתמחה אך ורק בחדרי אמבטיה ומטבח — מה
                  שמאפשר מגוון רחב במיוחד, מחירים תחרותיים וצוות מקצועי עם ידע מעמיק. ניתן
                  לקבל ייעוץ מקצועי בחנות הפיזית בחולון או דרך האתר{' '}
                  <a href="https://www.ebath.co.il" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                    ebath.co.il
                  </a>.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={STORE_IMG}
                alt="חנות eBath חולון"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-sky-600 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {MILESTONES.map((m) => (
            <div key={m.desc} className="text-center">
              <p className="text-3xl font-bold text-white">{m.value}</p>
              <p className="text-sky-100 text-sm mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">מה מייחד אותנו</h2>
            <p className="text-gray-500 mt-2">ארבעה עקרונות שמנחים אותנו בכל יום</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories breakdown */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">הקטגוריות שלנו</h2>
            <p className="text-gray-500 mt-2">20+ קטגוריות מוצר לכל צורך</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CATEGORY_GROUPS.map((g) => (
              <div key={g.title} className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <h3 className="font-bold text-sky-700 mb-3 text-sm uppercase tracking-wide">{g.title}</h3>
                <ul className="space-y-1.5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Star size={12} className="text-sky-400 fill-sky-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">הצוות שלנו</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  הצוות של eBath הוא הלב של העסק. כל חבר צוות עבר הכשרה מעמיקה
                  וצבר ניסיון רב בתחום — מהבנת חומרי גלם ועד ידע בעיצוב פנים.
                </p>
                <p>
                  כשאתה מגיע למחסן או מתקשר, אתה מדבר עם מישהו שיכול לעזור לך
                  לקבל החלטה טובה יותר — לא רק למכור לך מוצר.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-gray-50 border border-sky-100 rounded-2xl p-6">
              <Users size={32} className="text-sky-600 mb-4" />
              <ul className="space-y-3">
                {TEAM_HIGHLIGHTS.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <BadgeCheck size={18} className="text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">בוא לבקר אותנו</h2>
            <p className="text-gray-500 mt-2">ראה את המוצרים פיזית וקבל ייעוץ אישי</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex gap-4">
                <MapPin size={22} className="text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">כתובת מחסן ומשרד</h3>
                  <p className="text-gray-700 text-sm">המרכבה 19, א.ת. חולון</p>
                  <p className="text-gray-500 text-xs mt-0.5">מול תחנת דלק</p>
                  <a
                    href="https://www.google.com/maps/search/המרכבה+19+חולון"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sky-600 hover:underline text-xs mt-2"
                  >
                    <span>פתח במפות</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex gap-4">
                <Clock size={22} className="text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">שעות פתיחה</h3>
                  <p className="text-gray-700 text-sm">ימים א'–ה': 9:00–17:00</p>
                  <p className="text-gray-700 text-sm">יום ו': 9:00–13:00</p>
                </div>
              </div>
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex gap-4">
                <Phone size={22} className="text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">טלפון ופקס</h3>
                  <a href="tel:03-5622587" className="text-gray-700 text-sm hover:text-sky-600 transition-colors block">
                    טלפון: 03-5622587
                  </a>
                  <p className="text-gray-500 text-sm">פקס: 03-6205906</p>
                </div>
              </div>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-800 mb-3">קנייה אונליין — 24/7</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  לא יכול להגיע למחסן? האתר פתוח 24/7. בחר מתוך 10,000+ מוצרים וקבל
                  משלוח לכל מקום בישראל.
                </p>
              </div>
              <a
                href="https://www.ebath.co.il"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-xl transition-all"
              >
                <span>www.ebath.co.il</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service promises */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">ההבטחה שלנו</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <Truck size={24} />, title: 'משלוח לכל הארץ', desc: 'מוצר שהזמנת — מגיע אליך, בכל מקום בישראל.' },
              { icon: <HeadphonesIcon size={24} />, title: 'ייעוץ לאחר הרכישה', desc: 'שאלות? בעיות? אנחנו זמינים גם אחרי שהמוצר הגיע.' },
              { icon: <ShieldCheck size={24} />, title: 'מוצרים עם אחריות', desc: 'כל מוצר מגיע עם אחריות יצרן מלאה.' },
            ].map((p) => (
              <div key={p.title} className="bg-gray-800 rounded-2xl p-6 flex gap-4">
                <div className="text-sky-400 flex-shrink-0">{p.icon}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://www.ebath.co.il"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-4 rounded-xl transition-all text-lg"
            >
              <span>לאתר eBath</span>
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
