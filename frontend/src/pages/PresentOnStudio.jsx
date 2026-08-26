import React, { useState, useEffect } from 'react';
import {
  Presentation, Sparkles, Download, Play, Layers,
  BookOpen, RefreshCw, Palette, Globe, Check, Info,
  Search, Plus, ArrowRight, BookMarked, Eye, Edit3, Zap
} from 'lucide-react';
import {
  fetchBooks, generatePresentOnDeck, fetchPresentOnThemes,
  downloadPresentOnPptx
} from '../api';
import PresentOnDeck from '../components/PresentOnDeck';

export default function PresentOnStudio({ onNavigate }) {
  const [creationMode, setCreationMode] = useState('textbook'); // 'textbook' | 'prompt'
  
  // Textbook mode state
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  
  // Prompt mode state
  const [promptTopic, setPromptTopic] = useState('Chemical Reactions and Equations: Balancing & Types');
  const [promptSubject, setPromptSubject] = useState('Science');
  const [promptGrade, setPromptGrade] = useState('Class 10');

  // Deck generation state
  const [slideCount, setSlideCount] = useState(8);
  const [activeTheme, setActiveTheme] = useState('modern_indigo');
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await fetchBooks();
      setBooks(data);
      if (data && data.length > 0) {
        const b = data[0];
        setSelectedBookId(b.id);
        const chId = b.chapters && b.chapters.length > 0 ? b.chapters[0].id : '';
        setSelectedChapterId(chId);
        
        // Auto-generate presentation on load
        triggerInitialGenerate(b.id, chId, b.chapters?.[0]?.title || 'Chemical Reactions and Equations', b.subject, b.grade);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const triggerInitialGenerate = async (bookId, chapterId, chapterTitle, subject, grade) => {
    try {
      setLoading(true);
      const res = await generatePresentOnDeck({
        chapter_name: chapterTitle,
        subject: subject || 'Science',
        grade: grade || 'Class 10',
        slide_count: 8,
        theme: activeTheme,
        book_id: bookId,
        chapter_id: chapterId,
      });
      setDeck(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const selectedBook = books.find((b) => b.id === selectedBookId);
  const selectedChapter = selectedBook?.chapters?.find((c) => c.id === selectedChapterId);

  const handleGenerateDeck = async () => {
    try {
      setLoading(true);
      showToast('Synthesizing PresentOn presentation architecture...');
      
      const payload = creationMode === 'textbook'
        ? {
            chapter_name: selectedChapter?.title || 'Chapter Presentation',
            subject: selectedBook?.subject || 'Science',
            grade: selectedBook?.grade || 'Class 10',
            slide_count: slideCount,
            theme: activeTheme,
            book_id: selectedBookId,
            chapter_id: selectedChapterId,
          }
        : {
            chapter_name: promptTopic,
            subject: promptSubject,
            grade: promptGrade,
            slide_count: slideCount,
            theme: activeTheme,
          };

      const res = await generatePresentOnDeck(payload);
      setDeck(res);
      showToast('PresentOn Deck Generated Successfully!');
    } catch (e) {
      console.error(e);
      showToast('Failed to generate PresentOn presentation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold border border-slate-700 animate-bounce">
          <Info className="w-5 h-5 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 lg:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-wider">
            <Presentation className="w-3.5 h-3.5 text-amber-300" />
            PresentOn Open-Source AI Presentation Studio (github.com/presenton/presenton)
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            AI-Powered 16:9 Presentation Generator
          </h1>
          <p className="text-xs text-indigo-200 max-w-xl">
            Synthesize classroom slide decks with 9 multi-layout architectures (Hero, Concept Split, Step Flow, Formula Card, Activity Box, Comparison, Stats Grid, Diagnostic Quiz, Summary Roadmap) and 1-click PowerPoint (.pptx) download.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('reader')}
            className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shadow-md transition flex items-center gap-2 border border-white/10"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Open Textbook Reader</span>
          </button>
          <button
            onClick={() => onNavigate('notes_hub')}
            className="px-4 py-3 rounded-2xl bg-red-700/80 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 border border-red-500/30"
          >
            <BookMarked className="w-4 h-4 text-amber-300" />
            <span>NCERTStudy Notes</span>
          </button>
        </div>
      </div>

      {/* Creation Configuration Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Mode Selector */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setCreationMode('textbook')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                creationMode === 'textbook'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Textbook & Chapter Mode</span>
            </button>
            <button
              onClick={() => setCreationMode('prompt')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                creationMode === 'prompt'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Custom Topic / Prompt Mode</span>
            </button>
          </div>

          <span className="text-[11px] font-bold text-slate-400">
            PresentOn Engine v2.4 (Model: Groq Compound / Qwen 27B)
          </span>
        </div>

        {/* Dynamic Controls by Mode */}
        {creationMode === 'textbook' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Book Selector */}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                Select NCERT Textbook
              </label>
              <select
                value={selectedBookId}
                onChange={(e) => {
                  const bId = e.target.value;
                  setSelectedBookId(bId);
                  const b = books.find((x) => x.id === bId);
                  if (b && b.chapters && b.chapters.length > 0) {
                    setSelectedChapterId(b.chapters[0].id);
                  }
                }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} ({b.grade || 'NCERT'})
                  </option>
                ))}
              </select>
            </div>

            {/* Chapter Selector */}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                Select Chapter
              </label>
              <select
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {(selectedBook?.chapters || []).map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    Ch {ch.chapter_number || ''}: {ch.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Slide Count */}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                Slide Count
              </label>
              <select
                value={slideCount}
                onChange={(e) => setSlideCount(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={6}>6 Slides (Quick Briefing)</option>
                <option value={8}>8 Slides (Standard Lesson)</option>
                <option value={10}>10 Slides (Comprehensive)</option>
                <option value={12}>12 Slides (Deep-Dive)</option>
                <option value={16}>16 Slides (Full Unit Masterclass)</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                Visual Theme
              </label>
              <select
                value={activeTheme}
                onChange={(e) => setActiveTheme(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="modern_indigo">🔮 Modern Indigo</option>
                <option value="academic_emerald">🌿 Academic Emerald</option>
                <option value="corporate_slate">🏢 Corporate Slate</option>
                <option value="warm_amber">☀️ Warm Amber</option>
                <option value="midnight_cyber">🌌 Midnight Cyber</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                  Presentation Topic / Chapter Title
                </label>
                <input
                  type="text"
                  value={promptTopic}
                  onChange={(e) => setPromptTopic(e.target.value)}
                  placeholder="e.g. Periodic Classification of Elements, Newton's Laws..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                  Subject & Standard
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={promptSubject}
                    onChange={(e) => setPromptSubject(e.target.value)}
                    placeholder="Subject"
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                  <input
                    type="text"
                    value={promptGrade}
                    onChange={(e) => setPromptGrade(e.target.value)}
                    placeholder="Grade"
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                  Slide Count
                </label>
                <select
                  value={slideCount}
                  onChange={(e) => setSlideCount(Number(e.target.value))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value={6}>6 Slides (Quick Overview)</option>
                  <option value={8}>8 Slides (Standard Deck)</option>
                  <option value={10}>10 Slides (Detailed Concept)</option>
                  <option value={12}>12 Slides (Deep-Dive)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                  Color Theme
                </label>
                <select
                  value={activeTheme}
                  onChange={(e) => setActiveTheme(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="modern_indigo">🔮 Modern Indigo</option>
                  <option value="academic_emerald">🌿 Academic Emerald</option>
                  <option value="corporate_slate">🏢 Corporate Slate</option>
                  <option value="warm_amber">☀️ Warm Amber</option>
                  <option value="midnight_cyber">🌌 Midnight Cyber</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-500 font-medium">
            Generates 16:9 widescreen PowerPoint presentation with custom layouts and speaker notes.
          </p>

          <button
            onClick={handleGenerateDeck}
            disabled={loading}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs shadow-lg shadow-indigo-200 flex items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{loading ? 'Synthesizing PresentOn Deck...' : 'Generate PresentOn Slide Deck'}</span>
          </button>
        </div>
      </div>

      {/* Generated PresentOn Deck Stage */}
      {loading ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm space-y-4">
          <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin mx-auto" />
          <h3 className="text-base font-black text-slate-800">
            Synthesizing PresentOn Slide Architecture...
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Structuring 9 layouts, concept split matrices, reaction flows, and speaker delivery notes.
          </p>
        </div>
      ) : (
        <PresentOnDeck
          deck={deck}
          onUpdateDeck={(updated) => setDeck(updated)}
          onRegenerate={handleGenerateDeck}
          loading={loading}
        />
      )}
    </div>
  );
}
