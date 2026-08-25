import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, BookOpen, Layers, ShieldCheck, Sparkles, 
  ExternalLink, ChevronRight, X, AlertCircle, HelpCircle, Check,
  Lightbulb, RefreshCw
} from 'lucide-react';
import { fetchBooks, sendChatMessage } from '../api';

const QUICK_PROMPTS = [
  "Explain this chapter in simple language for students.",
  "What are the most important definitions and formulas?",
  "Give me 5 difficult practice questions from this chapter.",
  "Summarize the key concepts on page 6 of this textbook.",
  "What are common student misconceptions on this topic?"
];

export default function BookChat({ preselectedBookId, initialQuery }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
    loadBooks();
  }, []);

  useEffect(() => {
    if (initialQuery && selectedBookId && messages.length === 0) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, selectedBookId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
      if (!selectedBookId && data.length > 0) {
        setSelectedBookId(data[0].id);
      }
    } catch (err) {
      console.error('Failed to load books for chat:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeBook = books.find(b => b.id === selectedBookId);

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
      {/* Header & Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Book:</span>
          </div>

          <select
            value={selectedBookId}
            onChange={(e) => {
              setSelectedBookId(e.target.value);
              setSelectedChapterId('');
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {books.map(b => (
              <option key={b.id} value={b.id}>
                {b.title} ({b.grade})
              </option>
            ))}
          </select>

          {activeBook && (
            <select
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">All Chapters</option>
              {activeBook.chapters?.map(c => (
                <option key={c.id} value={c.id}>
                  Ch {c.chapter_number}: {c.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Strict Book-Only Mode Toggle */}
        <div className="flex items-center gap-3">
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

      {/* Main Chat Container */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex overflow-hidden">
        {/* Chat Stream View */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-12 space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Chat with {activeBook?.title || 'Selected Textbook'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ask definitions, explanations, formulas, or generate custom questions. In <strong>Book-Only Mode</strong>, the assistant answers exclusively from the indexed textbook text.
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Suggested Questions:</span>
                  <div className="flex flex-col gap-2 text-left">
                    {QUICK_PROMPTS.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-xs text-slate-700 hover:text-indigo-700 bg-slate-50 hover:bg-indigo-50/60 p-2.5 rounded-xl border border-slate-200 transition text-left flex items-center justify-between"
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
                          className="text-[11px] bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full border border-indigo-200 hover:bg-indigo-100 transition"
                        >
                          ✨ {fUp}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}

            {isSending && (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 p-3 rounded-2xl max-w-xs border border-slate-200">
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                Retrieving & Grounding from Textbook...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={`Ask anything about ${activeBook?.title || 'this textbook'}...`}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
              <button
                type="submit"
                disabled={isSending || !inputQuery.trim()}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold transition shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Source Citation Side Drawer */}
        {activeCitationDrawer && (
          <div className="w-80 border-l border-slate-200 bg-slate-50 p-6 flex flex-col justify-between overflow-y-auto animate-fadeIn">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    Textbook Excerpt
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900">{activeCitationDrawer.book_title}</h4>
                  <p className="text-xs text-slate-500">
                    Chapter {activeCitationDrawer.chapter_number}: {activeCitationDrawer.chapter_name} • Page {activeCitationDrawer.page}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCitationDrawer(null)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono">
                "{activeCitationDrawer.text_reference}"
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Grounding Confidence: {Math.round((activeCitationDrawer.similarity_score || 1) * 100)}%
              </div>
            </div>

            <button
              onClick={() => setActiveCitationDrawer(null)}
              className="w-full mt-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl"
            >
              Close Drawer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
