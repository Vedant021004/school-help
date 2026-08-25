import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Key, ShieldCheck, Cpu, Sliders, Check, 
  RefreshCw, AlertCircle, Info, Sparkles
} from 'lucide-react';
import { fetchSettings, saveSettings } from '../api';

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    llm_provider: 'gemini',
    gemini_api_key: '',
    openai_api_key: '',
    grounding_threshold: 0.60
  });

  useEffect(() => {
    loadSettingsData();
  }, []);

  const loadSettingsData = async () => {
    try {
      setLoading(true);
      const data = await fetchSettings();
      setSettings(data);
      setForm({
        llm_provider: data.llm_provider || 'gemini',
        gemini_api_key: '',
        openai_api_key: '',
        grounding_threshold: data.grounding_threshold || 0.60
      });
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await saveSettings(form);
      alert('Settings & API credentials saved successfully!');
      await loadSettingsData();
    } catch (err) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">System Settings & LLM Configuration</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure external LLM providers (Gemini, OpenAI, Claude, Ollama) and anti-hallucination sensitivity thresholds.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Zero-Config Offline Mode Info Box */}
        <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-indigo-900 leading-relaxed">
            <span className="font-bold block">Offline Zero-Config Engine Active</span>
            The application is pre-configured with a deterministic textbook grounding engine that functions completely offline without requiring any paid API keys. You can also optionally connect your Google Gemini or OpenAI API keys below for enhanced linguistic styling.
          </div>
        </div>

        {/* LLM Provider Selection */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">LLM Provider Selection</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {['gemini', 'openai', 'claude', 'ollama'].map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => setForm({ ...form, llm_provider: provider })}
                className={`py-3 rounded-xl font-bold uppercase transition border ${
                  form.llm_provider === provider
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {provider}
              </button>
            ))}
          </div>

          {/* API Key Inputs */}
          <div className="space-y-3 pt-2 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Google Gemini API Key</label>
              <input
                type="password"
                value={form.gemini_api_key}
                onChange={(e) => setForm({ ...form, gemini_api_key: e.target.value })}
                placeholder={settings.has_gemini_key ? "•••••••••••••••• (API Key Configured)" : "Enter Gemini API Key (Optional)"}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">OpenAI API Key</label>
              <input
                type="password"
                value={form.openai_api_key}
                onChange={(e) => setForm({ ...form, openai_api_key: e.target.value })}
                placeholder={settings.has_openai_key ? "•••••••••••••••• (API Key Configured)" : "Enter OpenAI API Key (Optional)"}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Anti-Hallucination Threshold Configuration */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Anti-Hallucination & Quality Thresholds</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Grounding Verification Sensitivity Threshold</span>
                <span className="text-indigo-600">{Math.round(form.grounding_threshold * 100)}% Match</span>
              </div>
              <input
                type="range"
                min="0.30"
                max="0.90"
                step="0.05"
                value={form.grounding_threshold}
                onChange={(e) => setForm({ ...form, grounding_threshold: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-[11px] text-slate-500">
                Questions failing this textbook evidence score will be automatically rejected and regenerated.
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-xs"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
