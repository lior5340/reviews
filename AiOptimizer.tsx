import { useState } from 'react';
import {
  Code2, Sparkles, BarChart3, Globe, Wrench, Settings, X
} from 'lucide-react';
import SchemaGenerator from './components/SchemaGenerator';
import SeoChecklist from './components/SeoChecklist';
import AiOptimizer from './components/AiOptimizer';
import LandingPage from './components/LandingPage';
import DesignHouse from './components/DesignHouse';

type SeoTab = 'landing' | 'schema' | 'checklist' | 'ai';

const SEO_TABS: { id: SeoTab; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'landing', label: 'דף נחיתה SEO', icon: <Globe size={16} />, description: 'תוכן לגוגל ו-AI' },
  { id: 'schema', label: 'Schema Generator', icon: <Code2 size={16} />, description: 'JSON-LD לכל דף' },
  { id: 'checklist', label: 'SEO Checklist', icon: <BarChart3 size={16} />, description: 'רשימת משימות' },
  { id: 'ai', label: 'AI Optimizer', icon: <Sparkles size={16} />, description: 'מטא-תגיות ל-AI Search' },
];

export default function App() {
  const [showSeo, setShowSeo] = useState(false);
  const [seoTab, setSeoTab] = useState<SeoTab>('landing');

  if (!showSeo) {
    return (
      <div className="relative">
        <DesignHouse />
        {/* Hidden SEO tools button */}
        <button
          onClick={() => setShowSeo(true)}
          className="fixed bottom-5 left-5 z-50 w-10 h-10 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-gray-700 hover:shadow-lg transition-all"
          title="כלי SEO"
        >
          <Settings size={17} />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* SEO Tools header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-sky-600 rounded-lg flex items-center justify-center">
                <Wrench size={13} className="text-white" />
              </div>
              <span className="font-bold text-gray-800 text-sm">eBath — כלי SEO</span>
            </div>

            <button
              onClick={() => setShowSeo(false)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
            >
              <X size={15} />
              <span>חזור ל-Design House</span>
            </button>
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {SEO_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSeoTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm border-b-2 transition-all whitespace-nowrap font-medium ${
                  seoTab === t.id
                    ? 'border-sky-600 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* SEO content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden sm:block w-52 flex-shrink-0">
            <nav className="space-y-1 sticky top-28">
              {SEO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSeoTab(tab.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl text-right transition-all ${
                    seoTab === tab.id
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-200'
                      : 'text-gray-600 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <span className={`mt-0.5 flex-shrink-0 ${seoTab === tab.id ? 'text-sky-200' : 'text-gray-400'}`}>
                    {tab.icon}
                  </span>
                  <div>
                    <div className={`font-semibold text-sm ${seoTab === tab.id ? 'text-white' : 'text-gray-700'}`}>
                      {tab.label}
                    </div>
                    <div className={`text-xs mt-0.5 ${seoTab === tab.id ? 'text-sky-200' : 'text-gray-400'}`}>
                      {tab.description}
                    </div>
                  </div>
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-sky-700 mb-1">טיפ מהיר</p>
                  <p className="text-xs text-gray-600">
                    התחל עם Schema LocalBusiness ו-FAQ — השפעה הגדולה ביותר על Google ו-AI.
                  </p>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sky-600">{SEO_TABS.find((t) => t.id === seoTab)?.icon}</span>
                <h1 className="text-xl font-bold text-gray-900">{SEO_TABS.find((t) => t.id === seoTab)?.label}</h1>
              </div>
              <p className="text-sm text-gray-500">{SEO_TABS.find((t) => t.id === seoTab)?.description}</p>
            </div>

            {seoTab === 'landing' && <LandingPage />}
            {seoTab === 'schema' && <SchemaGenerator />}
            {seoTab === 'checklist' && <SeoChecklist />}
            {seoTab === 'ai' && <AiOptimizer />}
          </main>
        </div>
      </div>
    </div>
  );
}
