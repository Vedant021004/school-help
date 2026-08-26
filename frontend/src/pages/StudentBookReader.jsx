import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen, Search, Volume2, Sparkles, Moon, Sun, BookMarked,
  ChevronLeft, ChevronRight, HelpCircle, Layers, CheckCircle2,
  ExternalLink, ArrowLeft, RefreshCw, ZoomIn, ZoomOut, Compass,
  Brain, FileText, Download, ShieldCheck, Share2, Info, File,
  Maximize2, Presentation, Eye, Check, VolumeX
} from 'lucide-react';
import { fetchBooks, fetchBookReaderContent, copilotExplain } from '../api';

export default function StudentBookReader({ onNavigate, initialBookId = '' }) {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(initialBookId || '');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [loadingBooks, setLoadingBooks] = useState(true);

  // View Mode: 'book' (Digital Textbook Pages) | 'pdf' (Real PDF Document Frame)
  const [viewMode, setViewMode] = useState('book');

  // Reader Content
  const [readerData, setReaderData] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Reader Customization State
  const [themeMode, setThemeMode] = useState('light'); // 'light' | 'sepia' | 'dark'
  const [fontSize, setFontSize] = useState(16); // in px
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Sidecar AI Tutor State
  const [sidecarExplanation, setSidecarExplanation] = useState(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [showSidecar, setShowSidecar] = useState(false);

  // Notifications
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
      setLoadingBooks(true);
      const data = await fetchBooks();
      setBooks(data);
      if (data && data.length > 0) {
        const targetBook = initialBookId ? data.find((b) => b.id === initialBookId) || data[0] : data[0];
        setSelectedBookId(targetBook.id);
        if (targetBook.chapters && targetBook.chapters.length > 0) {
          setSelectedChapterId(targetBook.chapters[0].id);
        }
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to load books catalog');
    } finally {
      setLoadingBooks(false);
    }
  };

  const selectedBook = books.find((b) => b.id === selectedBookId);
  const selectedChapter = selectedBook?.chapters?.find((c) => c.id === selectedChapterId);

  useEffect(() => {
    if (selectedBookId) {
      loadChapterContent(selectedBookId, selectedChapterId);
    }
  }, [selectedBookId, selectedChapterId]);

  const loadChapterContent = async (bookId, chapterId) => {
    try {
      setLoadingContent(true);
      const data = await fetchBookReaderContent(bookId, chapterId);
      setReaderData(data);
    } catch (err) {
      console.error(err);
      showToast('Failed to load chapter text');
    } finally {
      setLoadingContent(false);
    }
  };

  // Filter passages by user search query
  const filteredPassages = useMemo(() => {
    if (!readerData || !readerData.passages) return [];
    if (!searchQuery.trim()) return readerData.passages;
    const q = searchQuery.toLowerCase();
    return readerData.passages.filter(
      (p) =>
        p.content.toLowerCase().includes(q) ||
        (p.section_name && p.section_name.toLowerCase().includes(q))
    );
  }, [readerData, searchQuery]);

  // Text-to-speech for entire chapter or passage
  const toggleSpeech = (text) => {
    if (!window.speechSynthesis) {
      showToast('Speech synthesis not supported on this browser');
      return;
    }
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      showToast('Audio paused');
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = text || filteredPassages.map((p) => p.content).join('. ');
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      showToast('🔊 Reading textbook aloud...');
    }
  };

  // AI Tutor Explain Paragraph
  const handleExplainParagraph = async () => {
    try {
      setShowSidecar(true);
      setLoadingExplanation(true);
      const res = await copilotExplain(selectedBookId, selectedChapterId, 'student_friendly');
      setSidecarExplanation(res);
    } catch (err) {
      console.error(err);
      showToast('Failed to get explanation');
    } finally {
      setLoadingExplanation(false);
    }
  };

  const pdfStreamUrl = selectedBookId ? `/api/books/${selectedBookId}/pdf?chapter_id=${selectedChapterId || ''}` : '';

  const themeStyles = {
    light: 'bg-white text-slate-900 border-slate-200',
    sepia: 'bg-[#fbf0d9] text-[#433018] border-[#e4d3b6]',
    dark: 'bg-slate-900 text-slate-100 border-slate-800',
  };

  const pageCardStyle = {
    light: 'bg-white border-slate-200 text-slate-800 shadow-sm',
    sepia: 'bg-[#f5e9ce] border-[#e2d0b0] text-[#3d2b14]',
    dark: 'bg-slate-800/90 border-slate-700 text-slate-100 shadow-md',
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold border border-slate-700 animate-bounce">
          <Info className="w-5 h-5 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-indigo-900 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            Official NCERT Textbook Reader & Interactive eText
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            {selectedBook?.title || 'NCERT Textbook'} • {selectedChapter?.title || 'Chapter Reader'}
          </h1>
          <p className="text-xs text-indigo-200 max-w-xl">
            Clean, verified textbook reading with page-by-page excerpts, audio read-aloud, instant concept explanations, and printable PDF.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('presenton')}
            className="px-4 py-3 rounded-2xl bg-indigo-600/90 hover:bg-indigo-600 text-white font-bold text-xs shadow-md transition flex items-center gap-2 border border-indigo-400/30"
          >
            <Presentation className="w-4 h-4 text-amber-300" />
            <span>PresentOn Studio</span>
          </button>
          <button
            onClick={() => onNavigate('notes_hub')}
            className="px-4 py-3 rounded-2xl bg-red-700/90 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 border border-red-500/30"
          >
            <BookMarked className="w-4 h-4 text-amber-300" />
            <span>NCERTStudy Notes</span>
          </button>
          <button
            onClick={() => onNavigate('copilot')}
            className="px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Teacher Studio</span>
          </button>
        </div>
      </div>

      {/* Book & Chapter Selection & View Mode Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        {/* Book Selector */}
        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
            Choose Textbook
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
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            Choose Chapter
          </label>
          <select
            value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {(selectedBook?.chapters || []).map((ch) => (
              <option key={ch.id} value={ch.id}>
                Ch {ch.chapter_number || ''}: {ch.title}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle: Interactive Book vs Real PDF */}
        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
            Display Mode
          </label>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('book')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                viewMode === 'book' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Digital Book</span>
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                viewMode === 'pdf' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <File className="w-3.5 h-3.5" />
              <span>PDF Frame</span>
            </button>
          </div>
        </div>

        {/* Search within Book */}
        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
            Search in Chapter
          </label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Find terms, reactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Customization Toolbar & Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-4 sm:pt-0">
          {/* Theme Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setThemeMode('light')}
              className={`p-1.5 rounded-lg text-xs font-bold transition ${
                themeMode === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Day Light"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setThemeMode('sepia')}
              className={`p-1.5 rounded-lg text-xs font-bold transition ${
                themeMode === 'sepia' ? 'bg-[#fbf0d9] text-[#5f4b32] shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Warm Sepia"
            >
              📖
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              className={`p-1.5 rounded-lg text-xs font-bold transition ${
                themeMode === 'dark' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Night Dark"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Font Resizer */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
            <button
              onClick={() => setFontSize(Math.max(13, fontSize - 1))}
              className="px-2 py-1 text-xs font-black text-slate-600 hover:bg-white rounded"
              title="Smaller font"
            >
              A-
            </button>
            <span className="text-[10px] font-bold text-slate-500 px-1">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 1))}
              className="px-2 py-1 text-xs font-black text-slate-600 hover:bg-white rounded"
              title="Larger font"
            >
              A+
            </button>
          </div>

          {/* Download PDF Button */}
          {pdfStreamUrl && (
            <a
              href={pdfStreamUrl}
              download
              className="p-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition"
              title="Download Full Textbook PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Main Reader Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Table of Contents / Chapter Index */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4 max-h-[850px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              Chapter Directory
            </h3>
            <span className="text-[10px] font-bold text-slate-400">
              {selectedBook?.chapters?.length || 0} Chs
            </span>
          </div>

          <div className="space-y-1.5">
            {(selectedBook?.chapters || []).map((ch, idx) => {
              const isSelected = ch.id === selectedChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex items-start justify-between gap-2 ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-100'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className={`text-[10px] block ${isSelected ? 'text-indigo-200' : 'text-slate-400 font-bold'}`}>
                      Chapter {ch.chapter_number || idx + 1}
                    </span>
                    <p className="leading-snug">{ch.title}</p>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    p.{ch.start_page || 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Reader Stage */}
        <div className="lg:col-span-3 space-y-6">
          {viewMode === 'pdf' ? (
            /* PDF DOCUMENT FRAME */
            <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-slate-900">
                    PDF Document Stream: {selectedBook?.title} ({selectedChapter?.title})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={pdfStreamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Tab</span>
                  </a>
                  <a
                    href={pdfStreamUrl}
                    download
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>

              {/* PDF Embed Frame */}
              <div className="w-full h-[750px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <iframe
                  src={`${pdfStreamUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                  title="Textbook PDF Viewer"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          ) : (
            /* DIGITAL TEXTBOOK PAGES VIEW (ALWAYS RELIABLE & VISIBLE ON SCREEN) */
            <div className={`rounded-3xl border p-6 lg:p-8 space-y-6 transition-colors shadow-sm ${themeStyles[themeMode]}`}>
              {/* Chapter Header Card */}
              <div className="flex flex-wrap items-center justify-between border-b border-slate-200/60 pb-4 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {selectedBook?.grade || 'NCERT'} • {selectedBook?.subject}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">Verified NCERT Chapter Text</span>
                  </div>
                  <h2 className="text-xl lg:text-3xl font-black pt-1">
                    {selectedChapter?.title || 'Chapter Excerpts'}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSpeech()}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                      isPlayingAudio
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md animate-pulse'
                        : 'border-slate-300 hover:bg-black/5'
                    }`}
                  >
                    {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlayingAudio ? 'Stop Audio' : 'Read Chapter'}</span>
                  </button>

                  <button
                    onClick={handleExplainParagraph}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 flex items-center gap-1.5 transition"
                  >
                    <Brain className="w-3.5 h-3.5" />
                    <span>AI Tutor (ELI5)</span>
                  </button>
                </div>
              </div>

              {loadingContent ? (
                <div className="py-16 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                  <p className="text-xs font-bold">Retrieving Chapter Text from Knowledge Base...</p>
                </div>
              ) : filteredPassages.length > 0 ? (
                <div className="space-y-6 max-w-3xl mx-auto">
                  {filteredPassages.map((p, idx) => (
                    <div
                      key={p.id || idx}
                      className={`p-6 rounded-2xl border transition-all space-y-4 ${pageCardStyle[themeMode]}`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
                        <span className="text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-700 px-2 py-0.5 rounded">
                          Page {p.page_number} • {p.section_name || 'Main Content'}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleSpeech(p.content)}
                            className="p-1.5 rounded-lg hover:bg-black/5 text-slate-500 hover:text-indigo-600 transition"
                            title="Read Aloud this passage"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p
                        className="leading-relaxed font-serif whitespace-pre-line"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {p.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-xs text-slate-400 font-medium">
                  No passages found matching your search.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* AI Tutor Explain Modal */}
      {showSidecar && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
                <Brain className="w-5 h-5" />
                <span>AI Student Tutor (Simplified Explanation)</span>
              </div>
              <button
                onClick={() => setShowSidecar(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {loadingExplanation ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-600">Formulating simplified analogy...</p>
              </div>
            ) : sidecarExplanation ? (
              <div className="space-y-4 text-xs font-medium text-slate-700">
                <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-950 font-bold leading-relaxed">
                  💡 {sidecarExplanation.key_takeaway}
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Key Concept Breakdown:</h4>
                  {sidecarExplanation.sections?.map((s, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900">{s.heading}</span>
                      <p className="text-slate-600">{s.summary}</p>
                    </div>
                  ))}
                </div>

                {sidecarExplanation.real_life_analogies?.length > 0 && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-1">
                    <span className="font-bold block">Everyday Life Analogy:</span>
                    <p>{sidecarExplanation.real_life_analogies[0]}</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
