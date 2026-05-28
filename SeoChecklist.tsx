import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, Code2, Plus, Trash2 } from 'lucide-react';
import { SCHEMA_TEMPLATES, EBATH_DATA, FAQ_SAMPLES } from '../data/ebathData';

type SchemaType = 'localBusiness' | 'website' | 'product' | 'faq' | 'breadcrumb' | 'review';

interface CopyState {
  [key: string]: boolean;
}

const SCHEMA_TYPES: { id: SchemaType; label: string; description: string }[] = [
  { id: 'localBusiness', label: 'Local Business', description: 'פרטי העסק לגוגל' },
  { id: 'website', label: 'Website + Search', description: 'חיפוש פנימי ו-Sitelinks' },
  { id: 'product', label: 'Product', description: 'מוצר בודד עם מחיר וזמינות' },
  { id: 'faq', label: 'FAQ', description: 'שאלות ותשובות ב-SERP ו-AI' },
  { id: 'breadcrumb', label: 'Breadcrumb', description: 'ניווט פירורי לחם' },
  { id: 'review', label: 'Reviews', description: 'ביקורות ודירוג כוללי' },
];

export default function SchemaGenerator() {
  const [activeType, setActiveType] = useState<SchemaType>('localBusiness');
  const [copied, setCopied] = useState<CopyState>({});
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const [productForm, setProductForm] = useState({
    name: 'ארון אמבטיה פרמיום 60 ס"מ',
    description: 'ארון אמבטיה איכותי בגימור לבן מבריק, כולל כיור ומראה. מתאים לחדר אמבטיה מודרני.',
    price: '1200',
    sku: 'EB-001',
    image: 'https://www.ebath.co.il/images/product-001.jpg',
    category: 'ארונות אמבטיה',
  });

  const [faqs, setFaqs] = useState(FAQ_SAMPLES);
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: 'דף הבית', url: EBATH_DATA.url },
    { name: 'ארונות אמבטיה', url: `${EBATH_DATA.url}/category/cabinets` },
    { name: 'ארון 60 ס"מ', url: `${EBATH_DATA.url}/product/EB-001` },
  ]);
  const [reviews] = useState([
    { author: 'דנה כהן', rating: 5, text: 'שירות מעולה ומוצרים איכותיים. מגוון עצום וצוות מקצועי.', date: '2024-11-15' },
    { author: 'יוסי לוי', rating: 5, text: 'הארון שקיבלתי מדהים. משלוח מהיר ושירות לקוחות נפלא.', date: '2024-10-22' },
    { author: 'מיכל אברהם', rating: 4, text: 'מחירים טובים ומוצרים איכותיים. ממליצה בחום.', date: '2024-09-10' },
  ]);

  const getSchema = () => {
    switch (activeType) {
      case 'localBusiness': return SCHEMA_TEMPLATES.localBusiness;
      case 'website': return SCHEMA_TEMPLATES.website;
      case 'product': return SCHEMA_TEMPLATES.product(productForm);
      case 'faq': return SCHEMA_TEMPLATES.faq(faqs);
      case 'breadcrumb': return SCHEMA_TEMPLATES.breadcrumb(breadcrumbs);
      case 'review': return SCHEMA_TEMPLATES.review(reviews);
    }
  };

  const schemaJson = JSON.stringify(getSchema(), null, 2);
  const scriptTag = `<script type="application/ld+json">\n${schemaJson}\n</script>`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied((p) => ({ ...p, [key]: true }));
    setTimeout(() => setCopied((p) => ({ ...p, [key]: false })), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {SCHEMA_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveType(t.id)}
            className={`p-3 rounded-xl text-right border-2 transition-all ${
              activeType === t.id
                ? 'border-sky-500 bg-sky-50 text-sky-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="font-semibold text-sm">{t.label}</div>
            <div className="text-xs mt-0.5 opacity-70">{t.description}</div>
          </button>
        ))}
      </div>

      {/* Dynamic form for product */}
      {activeType === 'product' && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
          <h3 className="font-semibold text-gray-700 text-sm">פרטי המוצר</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { key: 'name', label: 'שם המוצר' },
              { key: 'sku', label: 'מק"ט (SKU)' },
              { key: 'price', label: 'מחיר (₪)' },
              { key: 'category', label: 'קטגוריה' },
              { key: 'image', label: 'URL תמונה' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="text-xs text-gray-500 block mb-1">{label}</label>
                <input
                  value={productForm[key as keyof typeof productForm]}
                  onChange={(e) => setProductForm((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  dir="rtl"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="text-xs text-gray-500 block mb-1">תיאור</label>
              <textarea
                value={productForm.description}
                onChange={(e) => setProductForm((p) => ({ ...p, description: e.target.value }))}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                dir="rtl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Dynamic form for FAQ */}
      {activeType === 'faq' && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700 text-sm">שאלות ותשובות</h3>
            <button
              onClick={() => setFaqs((p) => [...p, { question: '', answer: '' }])}
              className="flex items-center gap-1 text-sky-600 text-xs hover:text-sky-700"
            >
              <Plus size={14} /> הוסף שאלה
            </button>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-200 space-y-2">
              <div className="flex items-start gap-2">
                <button onClick={() => setFaqs((p) => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 mt-1">
                  <Trash2 size={14} />
                </button>
                <div className="flex-1 space-y-2">
                  <input
                    value={faq.question}
                    onChange={(e) => setFaqs((p) => p.map((f, j) => j === i ? { ...f, question: e.target.value } : f))}
                    placeholder="שאלה..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    dir="rtl"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => setFaqs((p) => p.map((f, j) => j === i ? { ...f, answer: e.target.value } : f))}
                    placeholder="תשובה..."
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic form for breadcrumb */}
      {activeType === 'breadcrumb' && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700 text-sm">פירורי לחם</h3>
            <button
              onClick={() => setBreadcrumbs((p) => [...p, { name: '', url: '' }])}
              className="flex items-center gap-1 text-sky-600 text-xs hover:text-sky-700"
            >
              <Plus size={14} /> הוסף שכבה
            </button>
          </div>
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-5 text-center">{i + 1}</span>
              <input
                value={crumb.name}
                onChange={(e) => setBreadcrumbs((p) => p.map((c, j) => j === i ? { ...c, name: e.target.value } : c))}
                placeholder="שם..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                dir="rtl"
              />
              <input
                value={crumb.url}
                onChange={(e) => setBreadcrumbs((p) => p.map((c, j) => j === i ? { ...c, url: e.target.value } : c))}
                placeholder="URL..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-400"
                dir="ltr"
              />
              {i > 0 && (
                <button onClick={() => setBreadcrumbs((p) => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Output */}
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Code2 size={16} />
            <span>JSON-LD Schema</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded((p) => ({ ...p, json: !p.json }))}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              {expanded.json ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <button
              onClick={() => copyToClipboard(scriptTag, 'schema')}
              className="flex items-center gap-1.5 text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              {copied.schema ? <Check size={14} /> : <Copy size={14} />}
              {copied.schema ? 'הועתק!' : 'העתק Script Tag'}
            </button>
          </div>
        </div>
        <div className={`overflow-auto transition-all duration-300 ${expanded.json ? '' : 'max-h-64'}`}>
          <pre className="text-green-400 text-xs p-4 leading-relaxed">
            <span className="text-gray-500">{'<script type="application/ld+json">'}</span>{'\n'}
            {schemaJson}
            {'\n'}<span className="text-gray-500">{'</script>'}</span>
          </pre>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
        <h3 className="font-semibold text-sky-800 text-sm mb-2">איך להטמיע?</h3>
        <ol className="text-sky-700 text-xs space-y-1 list-decimal list-inside" dir="rtl">
          <li>העתק את ה-Script Tag כולו</li>
          <li>הדבק בתוך <code className="bg-sky-100 px-1 rounded">&lt;head&gt;</code> של הדף הרלוונטי</li>
          <li>לעמוד הבית: השתמש ב-LocalBusiness + Website</li>
          <li>לכל דף מוצר: Product + Breadcrumb</li>
          <li>לעמוד FAQ: FAQ schema</li>
          <li>בדוק עם <strong>Google Rich Results Test</strong></li>
        </ol>
      </div>
    </div>
  );
}
