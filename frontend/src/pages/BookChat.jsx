import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  MessageSquare, Send, BookOpen, Layers, ShieldCheck, Sparkles, 
  ExternalLink, ChevronRight, X, AlertCircle, HelpCircle, Check,
  Lightbulb, RefreshCw, Globe, Search, Filter, BookMarked
} from 'lucide-react';
import { fetchBooks, fetchNcertCatalog, fetchNcertMeta, sendChatMessage } from '../api';

const QUICK_PROMPTS = [
  "Explain this chapter in simple language for students.",
  "What are the most important definitions and formulas?",
  "Give me 5 difficult practice questions from this chapter.",
  "Summarize the key concepts on page 6 of this textbook.",
  "What are common student misconceptions on this topic?"
];

export default function BookChat({ preselectedBookId, initialQuery }) {
  const [sourceMode, setSourceMode] = useState('my-books'); // 'my-books' | 'ncert-all'
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // NCERT Meta & Catalog for Chat
  const [ncertMeta, setNcertMeta] = useState(null);
  const [ncertCatalog, setNcertCatalog] = useState([]);
  const [ncertClassFilter, setNcertClassFilter] = useState('Class 10');
  const [ncertSubjectFilter, setNcertSubjectFilter] = useState('All Subjects');
  const [ncertBookSearch, setNcertBookSearch] = useState('');
  
  // Selection
  const [selectedBookId, setSelectedBookId] = useState(preselectedBookId || '');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [bookOnlyMode, setBookOnlyMode] = useState(true);

  // Chat History
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState(initialQuery || '');
  const [isSending, setIsSending] = useState(false);

  // Active Source Drawer
  const [activeCitationDrawer, setActiveCitationDrawer] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadNcertCatalogForChat();
  }, [ncertClassFilter, ncertSubjectFilter, ncertBookSearch]);

  useEffect(() => {
    if (initialQuery && selectedBookId && messages.length === 0) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, selectedBookId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [storedBooks, meta] = await Promise.all([
        fetchBooks(),
        fetchNcertMeta().catch(() => null)
      ]);
      setBooks(storedBooks);
      setNcertMeta(meta);

      if (preselectedBookId) {
        setSelectedBookId(preselectedBookId);
      } else if (storedBooks.length > 0) {
        setSelectedBookId(storedBooks[0].id);
      }
    } catch (err) {
      console.error('Failed to load books for chat:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadNcertCatalogForChat = async () => {
    try {
      const data = await fetchNcertCatalog({
        class_grade: ncertClassFilter !== 'All Classes' ? ncertClassFilter : undefined,
        subject: ncertSubjectFilter !== 'All Subjects' ? ncertSubjectFilter : undefined,
        query: ncertBookSearch || undefined,
        limit: 100
      });
      setNcertCatalog(data);
    } catch (err) {
      console.error('Failed to load NCERT books for chat:', err);
    }
  };

  // Find active book object (from stored books OR ncert catalog)
  const activeBook = useMemo(() => {
    if (!selectedBookId) return null;
    const fromMyBooks = books.find(b => b.id === selectedBookId);
    if (fromMyBooks) return fromMyBooks;

    const rawCode = selectedBookId.replace('ncert-', '');
    const fromNcert = ncertCatalog.find(b => b.code === rawCode || b.code === selectedBookId);
    if (fromNcert) {
      return {
        id: `ncert-${fromNcert.code}`,
        title: fromNcert.title,
        grade: fromNcert.class_grade,
        subject: fromNcert.subject,
        chapters: fromNcert.chapters?.map(c => ({
          id: `chap-${fromNcert.code}-${c.num}`,
          chapter_number: c.num,
          title: c.title,
          start_page: c.num * 10,
          end_page: c.num * 10 + 15
        })) || []
      };
    }
    return null;
  }, [selectedBookId, books, ncertCatalog]);

  // Dynamic subjects for NCERT selector
  const dynamicNcertSubjects = useMemo(() => {
    if (!ncertMeta) return ['All Subjects'];
    if (ncertClassFilter === 'All Classes') return ['All Subjects', ...ncertMeta.all_subjects];
    const subjs = ncertMeta.subjects_by_class[ncertClassFilter] || [];
    return ['All Subjects', ...subjs];
  }, [ncertClassFilter, ncertMeta]);

  const handleSelectNcertBook = (ncertBook) => {
    const bookId = `ncert-${ncertBook.code}`;
    setSelectedBookId(bookId);
    setSelectedChapterId('');
  };

  const handleSendMessage = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || !selectedBookId) return;

    const userMsg = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsSending(true);

    try {
      const payload = {
        book_id: selectedBookId,
        chapter_id: selectedChapterId || null,
        message: textToSend,
        conversation_history: messages.slice(-4),
        book_only_mode: bookOnlyMode
      };

      const res = await sendChatMessage(payload);

      const assistantMsg = {
        role: 'assistant',
        content: res.message,
        sources: res.sources,
        is_grounded: res.is_grounded,
        suggested_followups: res.suggested_followups,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg = {
        role: 'assistant',
        content: `Error: ${err.message}. Please verify your textbook selection.`,
        sources: [],
        is_grounded: false,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4 animate-fadeIn">
      {/* Top Header & Dual Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
        {/* Row 1: Source Tabs + Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSourceMode('my-books')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                sourceMode === 'my-books'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              My Library ({books.length})
            </button>
            <button
              onClick={() => setSourceMode('ncert-all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                sourceMode === 'ncert-all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              🏛️ Official NCERT Portal (1,122 Books)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBookOnlyMode(!bookOnlyMode)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
                bookOnlyMode
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-slate-300'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${bookOnlyMode ? 'text-emerald-600' : 'text-slate-400'}`} />
              📚 Book-Only Mode: {bookOnlyMode ? 'ON (Strict)' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Row 2: Cascading Selectors depending on Source Mode */}
        {sourceMode === 'my-books' ? (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Book:</span>
              <select
                value={selectedBookId}
                onChange={(e) => {
                  setSelectedBookId(e.target.value);
                  setSelectedChapterId('');
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none max-w-xs"
              >
                {books.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.title} ({b.grade})
                  </option>
                ))}
              </select>
            </div>

            {activeBook && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chapter:</span>
                <select
                  value={selectedChapterId}
                  onChange={(e) => setSelectedChapterId(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none max-w-xs"
                >
                  <option value="">All Chapters</option>
                  {activeBook.chapters?.map(c => (
                    <option key={c.id} value={c.id}>
                      Ch {c.chapter_number}: {c.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ) : (
          /* NCERT Complete 1122 Directory Selector */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                1. Class
              </label>
              <select
                value={ncertClassFilter}
                onChange={(e) => {
                  setNcertClassFilter(e.target.value);
                  setNcertSubjectFilter('All Subjects');
                }}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                {(ncertMeta?.classes || ['Class 10', 'Class 9', 'Class 8', 'Class 11', 'Class 12']).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                2. Subject
              </label>
              <select
                value={ncertSubjectFilter}
                onChange={(e) => setNcertSubjectFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                {dynamicNcertSubjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                3. Select NCERT Book
              </label>
              <select
                value={selectedBookId.replace('ncert-', '')}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) {
                    setSelectedBookId(`ncert-${val}`);
                    setSelectedChapterId('');
                  }
                }}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500 text-indigo-900"
              >
                <option value="">..Select NCERT Book..</option>
                {ncertCatalog.map(b => (
                  <option key={b.code} value={b.code}>
                    {b.title} ({b.medium || 'English'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                4. Chapter
              </label>
              <select
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Chapters</option>
                {activeBook?.chapters?.map(c => (
                  <option key={c.id} value={c.id}>
                    Ch {c.chapter_number}: {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Active Book Badge Chip */}
        {activeBook && (
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-indigo-50/70 px-3 py-1.5 rounded-xl border border-indigo-100">
            <span className="font-extrabold text-indigo-900 flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5 text-indigo-600" />
              Active Chat Target:
            </span>
            <span className="font-bold text-slate-800">{activeBook.title}</span>
            <span className="text-slate-400">•</span>
            <span className="text-indigo-700 font-semibold">{activeBook.grade}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">
              {selectedChapterId 
                ? activeBook.chapters?.find(c => c.id === selectedChapterId)?.title || 'Chapter Selected'
                : `All ${activeBook.chapters?.length || 0} Chapters`}
            </span>
          </div>
        )}
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex overflow-hidden">
        {/* Chat Stream View */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-12 space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Chat with {activeBook?.title || 'Selected Textbook'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ask definitions, chapter summaries, formulas, or generate custom examination questions. In <strong>Book-Only Mode</strong>, the assistant answers strictly from this curriculum textbook.
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Quick Prompts:</span>
                  <div className="flex flex-col gap-2 text-left">
                    {QUICK_PROMPTS.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-xs text-slate-700 hover:text-indigo-700 bg-slate-50 hover:bg-indigo-50/60 p-2.5 rounded-xl border border-slate-200 transition text-left flex items-center justify-between shadow-sm"
                      >
                        <span>{prompt}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl p-4 space-y-3 ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                        : 'bg-slate-50 border border-slate-200 text-slate-900 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed font-medium">
                      {msg.content}
                    </p>

                    {/* Source Citation Badges for Assistant */}
                    {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                      <div className="pt-2 border-t border-slate-200 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          Verified Textbook Sources:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.map((src, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => setActiveCitationDrawer(src)}
                              className="text-[11px] bg-white border border-slate-200 hover:border-indigo-400 text-indigo-700 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 shadow-sm transition"
                            >
                              <BookOpen className="w-3 h-3 text-indigo-500" />
                              Ch {src.chapter_number} • Page {src.page} ({src.section})
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Follow-up Prompts */}
                  {msg.role === 'assistant' && msg.suggested_followups && msg.suggested_followups.length > 0 && idx === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 mt-2 max-w-2xl">
                      {msg.suggested_followups.map((fUp, fIdx) => (
                        <button
                          key={fIdx}
                          onClick={() => handleSendMessage(fUp)}
                          className="text-[11px] bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-200 font-semibold transition flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          {fUp}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}

            {isSending && (
              <div className="flex items-center gap-3 text-slate-400 text-xs italic">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
                <span>Retrieving verified context from {activeBook?.title || 'textbook'}...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                activeBook 
                  ? `Ask anything about ${activeBook.title}...` 
                  : "Select a textbook to begin chatting..."
              }
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white shadow-sm"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isSending || !inputQuery.trim()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      </div>

      {/* Citation Inspector Drawer Modal */}
      {activeCitationDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  Source Verified
                </span>
                <h3 className="text-base font-extrabold text-slate-900 pt-1">
                  {activeCitationDrawer.book_title}
                </h3>
                <p className="text-xs text-slate-500">
                  Chapter {activeCitationDrawer.chapter_number}: {activeCitationDrawer.chapter_name} • Page {activeCitationDrawer.page}
                </p>
              </div>
              <button
                onClick={() => setActiveCitationDrawer(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">Original Textbook Excerpt:</span>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono">
                "{activeCitationDrawer.text_reference}"
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Section: <strong>{activeCitationDrawer.section}</strong></span>
                <span>Grounding Score: <strong>{(activeCitationDrawer.similarity_score * 100).toFixed(0)}%</strong></span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setActiveCitationDrawer(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
