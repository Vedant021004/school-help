import React, { useState, useEffect } from 'react';
import { 
  BookOpen, FileText, MessageSquare, PlusCircle, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, ArrowRight, Clock, Award, BarChart3,
  BookMarked, HelpCircle, FileCheck
} from 'lucide-react';
import { fetchStats } from '../api';

export default function Dashboard({ onNavigate, onSelectBookForChat, onSelectBookForPaper }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quickQuestion, setQuickQuestion] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAsk = (e) => {
    e.preventDefault();
    if (!quickQuestion.trim()) return;
    if (stats?.available_books_preview?.length > 0) {
      const defaultBook = stats.available_books_preview[0];
      onSelectBookForChat(defaultBook.id, quickQuestion);
      onNavigate('chat');
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Greeting */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Anti-Hallucination & RAG Grounded
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            AI-Powered Question Paper Generator & Book Assistant
          </h1>
          <p className="text-indigo-100 text-base sm:text-lg leading-relaxed">
            Create curriculum-compliant question papers strictly grounded in your uploaded textbooks.
            Zero hallucination, automatic answer keys, Bloom's cognitive taxonomy, and book-traceable citations.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('generate')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-indigo-900 font-bold shadow-lg hover:bg-indigo-50 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Generate Question Paper
            </button>
            <button
              onClick={() => onNavigate('books')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-400/40 text-white font-semibold backdrop-blur transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Manage Book Library
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Stored Textbooks</span>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <BookMarked className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{stats?.total_books || 0}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Indexed</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">{stats?.total_chapters || 0} total curriculum chapters</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Generated Papers</span>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{stats?.total_papers_generated || 0}</span>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Ready</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">PDF & DOCX with Answer Keys</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Question Bank</span>
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{stats?.total_question_bank_items || 0}</span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Verified</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Grounded textbook repository</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Paper Formats</span>
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{stats?.total_formats_available || 0}</span>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">Customizable</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">CBSE, ICSE & Custom blueprints</p>
        </div>
      </div>

      {/* Quick "Ask Book" Search Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Quick Ask Book (Strict Book-Only Search)</h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Ask any concept, definition, or question. The AI will retrieve exclusively from the selected textbook chapters without hallucinating.
        </p>

        <form onSubmit={handleQuickAsk} className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={quickQuestion}
              onChange={(e) => setQuickQuestion(e.target.value)}
              placeholder="e.g. What is Snell's Law according to Science Class 10? or Explain linear equations..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 text-sm"
          >
            <Sparkles className="w-4 h-4" />
            Ask Book
          </button>
        </form>
      </div>

      {/* Two Column Section: Available Textbooks & Recent Papers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Books Cards */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-800">My Stored Textbooks</h2>
            </div>
            <button
              onClick={() => onNavigate('books')}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {stats?.available_books_preview?.map((book) => (
              <div
                key={book.id}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-indigo-50/40 hover:border-indigo-200 transition-all flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{book.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-medium">{book.board}</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {book.grade} • {book.chapter_count} Detected Chapters
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectBookForPaper(book.id);
                      onNavigate('generate');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition"
                  >
                    Generate Paper
                  </button>
                  <button
                    onClick={() => {
                      onSelectBookForChat(book.id);
                      onNavigate('chat');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition"
                  >
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Generated Papers */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-800">Recent Question Papers</h2>
            </div>
            <button
              onClick={() => onNavigate('papers')}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {stats?.recent_papers?.length === 0 ? (
            <div className="text-center py-10 text-slate-400 space-y-2">
              <FileText className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-medium">No question papers generated yet</p>
              <button
                onClick={() => onNavigate('generate')}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                Generate your first paper now &rarr;
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {stats?.recent_papers?.map((paper) => (
                <div
                  key={paper.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/70 transition-all flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 text-sm">{paper.title}</span>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{paper.grade}</span>
                      <span>•</span>
                      <span>{paper.total_marks} Marks</span>
                      <span>•</span>
                      <span>{paper.questions?.length || 0} Questions</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onNavigate(`editor/${paper.id}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition"
                  >
                    Open Editor & Export
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
