import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, MessageSquare, Sparkles, Layers, 
  FileSpreadsheet, BarChart2, Settings as SettingsIcon, Menu, X,
  ShieldCheck, FileText, ChevronRight, GraduationCap, Flame, BookMarked,
  Presentation
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import BookLibrary from './pages/BookLibrary';
import PaperFormats from './pages/PaperFormats';
import GeneratePaper from './pages/GeneratePaper';
import PaperEditor from './pages/PaperEditor';
import BookChat from './pages/BookChat';
import QuestionBank from './pages/QuestionBank';
import PreviousPaperAnalyzer from './pages/PreviousPaperAnalyzer';
import Settings from './pages/Settings';
import TeacherCopilot from './pages/TeacherCopilot';
import LiveClassroomStudent from './pages/LiveClassroomStudent';
import StudentBookReader from './pages/StudentBookReader';
import NcertStudyNotes from './pages/NcertStudyNotes';
import PresentOnStudio from './pages/PresentOnStudio';

export default function App() {
  const [currentPage, setCurrentPage] = useState('copilot');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cross-page selection states
  const [selectedBookForChat, setSelectedBookForChat] = useState('');
  const [chatInitialQuery, setChatInitialQuery] = useState('');
  const [selectedBookForPaper, setSelectedBookForPaper] = useState('');
  const [selectedFormatForPaper, setSelectedFormatForPaper] = useState('');
  const [editorPaperId, setEditorPaperId] = useState('');

  const navigateTo = (page) => {
    if (page.startsWith('editor/')) {
      const pId = page.replace('editor/', '');
      setEditorPaperId(pId);
      setCurrentPage('editor');
    } else {
      setCurrentPage(page);
    }
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBookForChat = (bookId, query = '') => {
    setSelectedBookForChat(bookId);
    setChatInitialQuery(query);
  };

  const handleSelectBookForPaper = (bookId) => {
    setSelectedBookForPaper(bookId);
  };

  const handleSelectFormatForPaper = (formatId) => {
    setSelectedFormatForPaper(formatId);
  };

  const navItems = [
    { id: 'copilot', label: 'AI Teacher Copilot', icon: GraduationCap, highlight: true },
    { id: 'presenton', label: 'PresentOn AI Studio', icon: Presentation, badge: 'Deck' },
    { id: 'notes_hub', label: 'NCERTStudy Notes (6-12)', icon: BookMarked, badge: 'New' },
    { id: 'reader', label: 'NCERT eBook Reader', icon: BookOpen },
    { id: 'live_student', label: 'Live Quiz (Student)', icon: Flame },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'books', label: 'NCERT & Books Library', icon: Layers },
    { id: 'chat', label: 'Chat with Book', icon: MessageSquare },
    { id: 'generate', label: 'Question Paper Studio', icon: Sparkles },
    { id: 'bank', label: 'Question Bank', icon: FileText },
    { id: 'formats', label: 'Paper Formats', icon: FileSpreadsheet },
    { id: 'analyzer', label: 'Past Paper Analyzer', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* App Branding */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('dashboard')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-slate-900 tracking-tight text-base block leading-tight">
                  AI Teacher Assistant
                </span>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                  Question Paper Studio
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                      : item.highlight
                      ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100/70 border border-indigo-200'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Anti-Hallucination Verified Badge in Sidebar Footer */}
        <div className="p-4 m-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Anti-Hallucination RAG</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
            Strict textbook grounding prevents LLM hallucinations. All questions include verified page references.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline-block">
              {currentPage.toUpperCase().replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('generate')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-extrabold shadow-md shadow-indigo-100 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Quick Generate
            </button>
          </div>
        </header>

        {/* Page View Rendering */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'copilot' && (
            <TeacherCopilot
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'presenton' && (
            <PresentOnStudio
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'notes_hub' && (
            <NcertStudyNotes
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'reader' && (
            <StudentBookReader
              onNavigate={navigateTo}
              initialBookId={selectedBookForChat || selectedBookForPaper}
            />
          )}

          {currentPage === 'live_student' && (
            <LiveClassroomStudent
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'dashboard' && (
            <Dashboard
              onNavigate={navigateTo}
              onSelectBookForChat={handleSelectBookForChat}
              onSelectBookForPaper={handleSelectBookForPaper}
            />
          )}

          {currentPage === 'books' && (
            <BookLibrary
              onNavigate={navigateTo}
              onSelectBookForChat={handleSelectBookForChat}
              onSelectBookForPaper={handleSelectBookForPaper}
            />
          )}

          {currentPage === 'formats' && (
            <PaperFormats
              onNavigate={navigateTo}
              onSelectFormatForPaper={handleSelectFormatForPaper}
            />
          )}

          {currentPage === 'generate' && (
            <GeneratePaper
              onNavigate={navigateTo}
              preselectedBookId={selectedBookForPaper}
              preselectedFormatId={selectedFormatForPaper}
            />
          )}

          {currentPage === 'editor' && (
            <PaperEditor
              paperId={editorPaperId}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'chat' && (
            <BookChat
              preselectedBookId={selectedBookForChat}
              initialQuery={chatInitialQuery}
            />
          )}

          {currentPage === 'bank' && (
            <QuestionBank
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'analyzer' && (
            <PreviousPaperAnalyzer
              onNavigate={navigateTo}
              onSelectFormatForPaper={handleSelectFormatForPaper}
            />
          )}

          {currentPage === 'settings' && (
            <Settings />
          )}
        </main>
      </div>
    </div>
  );
}
