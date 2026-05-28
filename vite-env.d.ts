export const EBATH_DATA = {
  name: 'eBath',
  url: 'https://www.ebath.co.il',
  logo: 'https://www.ebath.co.il/logo.png',
  description: 'חנות מקוונת המתמחה במוצרים לחדרי אמבטיה ושירותים עם למעלה מ-10,000 פריטים. ארונות אמבטיה, ברזים, קרמיקה, אביזרים, מראות וציוד רחצה.',
  phone: '',
  email: '',
  address: {
    street: 'שומרון 19',
    city: 'ראשון לציון',
    country: 'IL',
    postalCode: '',
  },
  categories: [
    'ארונות אמבטיה',
    'ברזים',
    'קרמיקה',
    'מראות',
    'אביזרי אמבטיה',
    'מקלחונים',
    'אמבטיות',
    'כלים סניטריים',
  ],
  keywords: [
    'ארון אמבטיה',
    'ברזים לאמבטיה',
    'קרמיקה לאמבטיה',
    'מראה לאמבטיה',
    'עיצוב חדר אמבטיה',
    'חנות אמבטיה אונליין',
    'מוצרי אמבטיה',
    'שיפוץ אמבטיה',
    'ebath',
    'אמבטיה ראשון לציון',
  ],
  competitors: ['kfar-hasade.co.il', 'tambour.co.il', 'ksp.co.il'],
  priceRange: '₪₪₪',
};

export const SCHEMA_TEMPLATES = {
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    name: EBATH_DATA.name,
    url: EBATH_DATA.url,
    description: EBATH_DATA.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: EBATH_DATA.address.street,
      addressLocality: EBATH_DATA.address.city,
      addressCountry: EBATH_DATA.address.country,
    },
    priceRange: EBATH_DATA.priceRange,
    hasMap: `https://www.google.com/maps/search/${encodeURIComponent('eBath ראשון לציון')}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  },
  breadcrumb: (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }),
  product: (product: {
    name: string;
    description: string;
    price: string;
    sku: string;
    image: string;
    category: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.image,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'eBath',
    },
    offers: {
      '@type': 'Offer',
      url: `${EBATH_DATA.url}/product/${product.sku}`,
      priceCurrency: 'ILS',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: EBATH_DATA.name,
      },
    },
  }),
  faq: (faqs: { question: string; answer: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),
  review: (reviews: { author: string; rating: number; text: string; date: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: EBATH_DATA.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating },
      reviewBody: r.text,
      datePublished: r.date,
    })),
  }),
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: EBATH_DATA.name,
    url: EBATH_DATA.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${EBATH_DATA.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
};

export const SEO_CHECKLIST_ITEMS = [
  {
    id: 'title',
    category: 'On-Page SEO',
    title: 'תגית Title מותאמת',
    description: 'כל עמוד צריך title ייחודי עד 60 תווים עם מילת מפתח ראשית',
    priority: 'critical',
    example: 'eBath | ארונות אמבטיה, ברזים וקרמיקה | ראשון לציון',
  },
  {
    id: 'meta_desc',
    category: 'On-Page SEO',
    title: 'Meta Description מותאמת',
    description: 'תיאור של 150-160 תווים עם CTA ומילות מפתח',
    priority: 'critical',
    example: 'גלה מעל 10,000 מוצרי אמבטיה במחירים מעולים. ארונות, ברזים, קרמיקה ועוד. משלוח לכל הארץ. כנס עכשיו!',
  },
  {
    id: 'schema_local',
    category: 'Structured Data',
    title: 'Schema LocalBusiness',
    description: 'JSON-LD עם פרטי העסק, שעות פתיחה, כתובת וטלפון',
    priority: 'critical',
  },
  {
    id: 'schema_product',
    category: 'Structured Data',
    title: 'Schema Product לכל מוצר',
    description: 'JSON-LD עם מחיר, זמינות, תמונה וביקורות לכל דף מוצר',
    priority: 'high',
  },
  {
    id: 'schema_breadcrumb',
    category: 'Structured Data',
    title: 'Schema Breadcrumb',
    description: 'ניווט פירורי לחם לשיפור הצגה בתוצאות חיפוש',
    priority: 'high',
  },
  {
    id: 'schema_faq',
    category: 'Structured Data',
    title: 'Schema FAQ',
    description: 'שאלות נפוצות בפורמט schema להצגה ב-SERP ולתשובות AI',
    priority: 'high',
  },
  {
    id: 'og_tags',
    category: 'Social & AI',
    title: 'Open Graph Tags',
    description: 'תגיות og:title, og:description, og:image לשיתוף ברשתות חברתיות',
    priority: 'high',
  },
  {
    id: 'hreflang',
    category: 'Technical SEO',
    title: 'Hreflang לעברית',
    description: 'הגדרת שפה ומיקום גיאוגרפי לגוגל',
    priority: 'medium',
    example: '<link rel="alternate" hreflang="he-il" href="https://www.ebath.co.il/" />',
  },
  {
    id: 'canonical',
    category: 'Technical SEO',
    title: 'Canonical URLs',
    description: 'מניעת תוכן כפול עם תגיות canonical בכל עמוד',
    priority: 'critical',
  },
  {
    id: 'sitemap',
    category: 'Technical SEO',
    title: 'XML Sitemap',
    description: 'מפת אתר עדכנית עם כל הדפים, המוצרים והקטגוריות',
    priority: 'critical',
  },
  {
    id: 'robots',
    category: 'Technical SEO',
    title: 'Robots.txt מוגדר',
    description: 'קובץ robots.txt עם הפניה לסייטמאפ',
    priority: 'high',
  },
  {
    id: 'core_web_vitals',
    category: 'ביצועים',
    title: 'Core Web Vitals',
    description: 'LCP < 2.5s, FID < 100ms, CLS < 0.1',
    priority: 'critical',
  },
  {
    id: 'mobile',
    category: 'ביצועים',
    title: 'Mobile-First',
    description: 'האתר מותאם מלא לנייד ועובר Google Mobile-Friendly Test',
    priority: 'critical',
  },
  {
    id: 'ai_content',
    category: 'AI Search',
    title: 'תוכן מותאם ל-AI (SGE/Perplexity)',
    description: 'תשובות ישירות לשאלות נפוצות, הגדרות ברורות, מבנה E-E-A-T',
    priority: 'high',
  },
  {
    id: 'entity',
    category: 'AI Search',
    title: 'Entity Optimization',
    description: 'ציון ברור של שם העסק, מיקום, התמחות ומומחיות בתוכן',
    priority: 'high',
  },
];

export const FAQ_SAMPLES = [
  {
    question: 'מה מגוון המוצרים ב-eBath?',
    answer: 'eBath מציעה למעלה מ-10,000 מוצרים לחדרי אמבטיה ושירותים, כולל ארונות אמבטיה, ברזים, קרמיקה, מראות, מקלחונים, אמבטיות ואביזרים נוספים.',
  },
  {
    question: 'האם eBath מספקת משלוח לכל הארץ?',
    answer: 'כן, eBath מספקת משלוח לכל רחבי ישראל. ניתן לרכוש באתר האינטרנט ולקבל את המוצרים ישירות לדלת.',
  },
  {
    question: 'האם אפשר לבקר בחנות הפיזית של eBath?',
    answer: 'כן, eBath ממוקמת ברחוב שומרון 19, ראשון לציון. ניתן לבקר בחנות ולקבל ייעוץ מקצועי אישי.',
  },
  {
    question: 'האם eBath מציעה ייעוץ עיצוב לחדר האמבטיה?',
    answer: 'כן, eBath מציעה שירות ייעוץ חינם לעיצוב וסידור חדר האמבטיה, בין אם בחנות הפיזית ובין אם אונליין.',
  },
  {
    question: 'מה טווח המחירים של המוצרים ב-eBath?',
    answer: 'eBath מציעה מוצרים במגוון רחב של מחירים, מפתרונות חסכוניים ועד מוצרי פרימיום, כדי להתאים לכל תקציב ולכל סגנון עיצוב.',
  },
];
