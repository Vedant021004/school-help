import React, { useState, useEffect } from 'react';
import {
  Presentation, Sparkles, Download, Play, Layers,
  BookOpen, RefreshCw, Palette, Globe, Check, Info,
  Search, Plus, ArrowRight, BookMarked, Eye, Edit3
} from 'lucide-react';
import {
  fetchBooks, generatePresentOnDeck, fetchPresentOnThemes,
  downloadPresentOnPptx, fetchNcertCatalog
} from '../api';
import PresentOnDeck from '../components/PresentOnDeck';

export default function PresentOnStudio({ onNavigate }) {
  const [creationMode, setCreationMode] = useState('textbook'); // 'textbook' | 'prompt'
  
  // Textbook mode state
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  
  // Prompt mode state
  const [promptTopic, setPromptTopic] = useState('Artificial Intelligence and Machine Learning Foundations');
  const [promptSubject, setPromptSubject] = useState('Computer Science');
  const [promptGrade, setPromptGrade] = useState('Class 11');

  // Deck generation state
  const [slideCount, setSlideCount] = useState(10);
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
        setSelectedBookId(data[0].id);
        if (data[0].chapters && data[0].chapters.length > 0) {
          setSelectedChapterId(data[0].chapters[0].id);
        }
      }
    } catch (e) {
      console.error(e);
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
            AI Presentation & Slide Deck Generator
          </h1>
          <p className="text-xs text-indigo-200 max-w-2xl">
            Create high-impact, editable 16:9 widescreen presentation slides with rich multi-layout components, speaker notes, presenter live mode, and PowerPoint (.pptx) download.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://github.com/presenton/presenton"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-2"
          >
            <span>GitHub Repo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Generator Control Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Mode Switcher */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreationMode('textbook')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                creationMode === 'textbook'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>From NCERT / Textbook Chapter</span>
            </button>
            <button
              onClick={() => setCreationMode('prompt')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                creationMode === 'prompt'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>From Custom Topic / Prompt</span>
            </button>
          </div>

          {/* Slide Count Options */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Slide Count:</span>
            {[
              { count: 6, label: '6 Slides' },
              { count: 10, label: '10 Slides' },
              { count: 14, label: '14 Slides' },
              { count: 18, label: '18 Slides' },
            ].map((s) => (
              <button
                key={s.count}
                onClick={() => setSlideCount(s.count)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  slideCount === s.count
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Specific Inputs */}
        {creationMode === 'textbook' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Select Textbook
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} ({b.grade || 'NCERT'}) • {b.chapters?.length || 0} Chs
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Select Chapter
              </label>
              <select
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {(selectedBook?.chapters || []).map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    Ch {ch.chapter_number || ''}: {ch.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Presentation Topic
              </label>
              <input
                type="text"
                value={promptTopic}
                onChange={(e) => setPromptTopic(e.target.value)}
                placeholder="Enter lecture or topic name..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Grade / Audience
              </label>
              <input
                type="text"
                value={promptGrade}
                onChange={(e) => setPromptGrade(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="flex items-center justify-end pt-2">
          <button
            onClick={handleGenerateDeck}
            disabled={loading}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-black text-xs lg:text-sm shadow-lg shadow-indigo-200 flex items-center gap-2 disabled:opacity-50 transition"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>{loading ? 'Synthesizing Slides with PresentOn...' : 'Generate PresentOn Slide Deck (1-Click)'}</span>
          </button>
        </div>
      </div>

      {/* PresentOn Presentation Viewer Component */}
      {deck ? (
        <PresentOnDeck
          deck={deck}
          onRegenerate={handleGenerateDeck}
          loading={loading}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm space-y-4">
          <Presentation className="w-16 h-16 text-indigo-400 mx-auto animate-pulse" />
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900">PresentOn AI Presentation Engine Ready</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Select your textbook chapter or enter a custom prompt above to generate a full 16:9 presentation deck with multiple themes and layouts.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
