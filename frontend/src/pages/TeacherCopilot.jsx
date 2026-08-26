import React, { useState, useEffect } from 'react';
import {
  Sparkles, BookOpen, Layers, FileText, Presentation, HelpCircle,
  CheckCircle2, Network, BookMarked, Image as ImageIcon, Calendar,
  TrendingUp, Users, Download, Copy, Play, Volume2, Share2,
  RefreshCw, Check, AlertCircle, Eye, EyeOff, ChevronLeft, ChevronRight,
  Maximize2, ArrowRight, ShieldCheck, Flame, Compass, Brain, Award, Info,
  Search, Plus, X, Globe, MessageSquare, Send, Book, ExternalLink
} from 'lucide-react';
import {
  fetchBooks, copilotTeachChapter, copilotExplain, copilotNotes,
  copilotDownloadNotesPdf, copilotPpt, copilotDownloadPptx,
  copilotTextbookSolutions, copilotWorksheet, copilotDownloadWorksheetPdf,
  copilotTerms, copilotDiagramWorksheet, copilotLessonPlan,
  copilotMindMap, copilotCreateLiveSession, copilotGetLiveAnalytics,
  copilotCloseLiveSession, copilotExamPatterns, fetchNcertCatalog,
  fetchNcertMeta, importNcertBook, fetchBookReaderContent,
  sendChatMessage, generatePresentOnDeck, downloadPresentOnPptx
} from '../api';
import PresentOnDeck from '../components/PresentOnDeck';

export default function TeacherCopilot({ onNavigate }) {
  // Books & Chapter selection
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [loadingBooks, setLoadingBooks] = useState(true);

  // Active module tab
  const [activeTab, setActiveTab] = useState('explain');

  // NCERT Importer Modal State
  const [showNcertModal, setShowNcertModal] = useState(false);
  const [ncertCatalog, setNcertCatalog] = useState([]);
  const [ncertMeta, setNcertMeta] = useState(null);
  const [ncertClassFilter, setNcertClassFilter] = useState('All Classes');
  const [ncertSubjectFilter, setNcertSubjectFilter] = useState('All Subjects');
  const [ncertSearchQuery, setNcertSearchQuery] = useState('');
  const [ncertLoading, setNcertLoading] = useState(false);
  const [importingCode, setImportingCode] = useState(null);

  // Textbook Reader Modal State
  const [showReaderModal, setShowReaderModal] = useState(false);
  const [readerData, setReaderData] = useState(null);
  const [readerLoading, setReaderLoading] = useState(false);
  const [readerModalViewMode, setReaderModalViewMode] = useState('pdf'); // 'pdf' | 'passages'

  // Chapter RAG Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your AI Teaching Assistant grounded strictly in this textbook chapter. Ask me any question, formula derivation, or structured pedagogical breakdown!',
      citations: [],
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatStrictOnly, setChatStrictOnly] = useState(true);

  // Module state data
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [explainMode, setExplainMode] = useState('student_friendly');
  const [loadingExplain, setLoadingExplain] = useState(false);

  const [notes, setNotes] = useState(null);
  const [loadingNotes, setLoadingNotes] = useState(false);

  // PPT Presentation state (Expandable Slide Count)
  const [slideDeck, setSlideDeck] = useState(null);
  const [slideCount, setSlideCount] = useState(10);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [loadingPpt, setLoadingPpt] = useState(false);

  const [solutions, setSolutions] = useState([]);
  const [loadingSolutions, setLoadingSolutions] = useState(false);

  // Worksheet state (Expandable Question Count: 5 to 30)
  const [worksheet, setWorksheet] = useState(null);
  const [worksheetType, setWorksheetType] = useState('practice');
  const [worksheetCount, setWorksheetCount] = useState(10);
  const [showAnswers, setShowAnswers] = useState(false);
  const [loadingWorksheet, setLoadingWorksheet] = useState(false);

  const [terms, setTerms] = useState([]);
  const [flippedTerms, setFlippedTerms] = useState({});
  const [loadingTerms, setLoadingTerms] = useState(false);

  const [diagram, setDiagram] = useState(null);
  const [loadingDiagram, setLoadingDiagram] = useState(false);

  const [lessonPlan, setLessonPlan] = useState(null);
  const [planDuration, setPlanDuration] = useState(45);
  const [loadingLessonPlan, setLoadingLessonPlan] = useState(false);

  const [mindMap, setMindMap] = useState(null);
  const [loadingMindMap, setLoadingMindMap] = useState(false);

  // Live Classroom
  const [liveSession, setLiveSession] = useState(null);
  const [liveAnalytics, setLiveAnalytics] = useState(null);
  const [liveIntervalId, setLiveIntervalId] = useState(null);
  const [creatingLive, setCreatingLive] = useState(false);

  // Exam Patterns
  const [examPatterns, setExamPatterns] = useState(null);
  const [loadingPatterns, setLoadingPatterns] = useState(false);

  // Notifications
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  useEffect(() => {
    loadBooks();
    loadNcertMetadata();
    return () => {
      if (liveIntervalId) clearInterval(liveIntervalId);
    };
  }, []);

  const loadBooks = async (selectLatestId = null) => {
    try {
      setLoadingBooks(true);
      const data = await fetchBooks();
      setBooks(data);
      if (data && data.length > 0) {
        const targetBook = selectLatestId ? data.find((b) => b.id === selectLatestId) || data[0] : (selectedBookId ? data.find((b) => b.id === selectedBookId) || data[0] : data[0]);
        setSelectedBookId(targetBook.id);
        if (targetBook.chapters && targetBook.chapters.length > 0) {
          setSelectedChapterId(targetBook.chapters[0].id);
        }
      }
    } catch (e) {
      console.error(e);
      showToast('Failed to load books catalog');
    } finally {
      setLoadingBooks(false);
    }
  };

  const loadNcertMetadata = async () => {
    try {
      const meta = await fetchNcertMeta();
      setNcertMeta(meta);
    } catch (e) {
      console.error(e);
    }
  };

  const loadNcertBooks = async () => {
    try {
      setNcertLoading(true);
      const data = await fetchNcertCatalog({
        query: ncertSearchQuery || undefined,
        class_grade: ncertClassFilter !== 'All Classes' ? ncertClassFilter : undefined,
        subject: ncertSubjectFilter !== 'All Subjects' ? ncertSubjectFilter : undefined,
        limit: 100,
      });
      setNcertCatalog(data);
    } catch (e) {
      console.error(e);
      showToast('Failed to load NCERT catalog');
    } finally {
      setNcertLoading(false);
    }
  };

  useEffect(() => {
    if (showNcertModal) {
      loadNcertBooks();
    }
  }, [showNcertModal, ncertClassFilter, ncertSubjectFilter, ncertSearchQuery]);

  const handleImportNcert = async (code) => {
    try {
      setImportingCode(code);
      const imported = await importNcertBook(code);
      showToast(`Imported "${imported.title}" successfully!`);
      await loadBooks(imported.id);
      setShowNcertModal(false);
    } catch (e) {
      console.error(e);
      showToast('Failed to import NCERT book');
    } finally {
      setImportingCode(null);
    }
  };

  // Open Book Reader Modal
  const handleOpenReader = async () => {
    if (!selectedBookId) return;
    try {
      setShowReaderModal(true);
      setReaderLoading(true);
      const data = await fetchBookReaderContent(selectedBookId, selectedChapterId);
      setReaderData(data);
    } catch (e) {
      console.error(e);
      showToast('Failed to load textbook content');
    } finally {
      setReaderLoading(false);
    }
  };

  const selectedBook = books.find((b) => b.id === selectedBookId);
  const selectedChapter = selectedBook?.chapters?.find((c) => c.id === selectedChapterId);

  // Auto-generate on chapter change or tab switch
  useEffect(() => {
    if (!selectedBookId || !selectedChapterId) return;
    if (activeTab === 'explain' && !explanation) loadExplanation(explainMode);
    if (activeTab === 'notes' && !notes) loadNotes();
    if (activeTab === 'ppt' && !slideDeck) loadPpt(slideCount);
    if (activeTab === 'solutions' && solutions.length === 0) loadSolutions();
    if (activeTab === 'worksheet' && !worksheet) loadWorksheet(worksheetType, worksheetCount);
    if (activeTab === 'terms' && terms.length === 0) loadTerms();
    if (activeTab === 'diagram' && !diagram) loadDiagram();
    if (activeTab === 'lesson' && !lessonPlan) loadLessonPlan(planDuration);
    if (activeTab === 'mindmap' && !mindMap) loadMindMap();
    if (activeTab === 'patterns' && !examPatterns) loadExamPatterns();
  }, [selectedBookId, selectedChapterId, activeTab]);

  // Master 1-Click "Teach This Chapter"
  const handleTeachThisChapter = async () => {
    if (!selectedBookId || !selectedChapterId) return;
    try {
      setIsGeneratingAll(true);
      showToast('Generating complete 16-module Teaching Suite...');
      const pkg = await copilotTeachChapter(selectedBookId, selectedChapterId);
      if (pkg.explanation) setExplanation(pkg.explanation);
      if (pkg.notes) setNotes(pkg.notes);
      if (pkg.slide_deck) setSlideDeck(pkg.slide_deck);
      if (pkg.textbook_solutions) setSolutions(pkg.textbook_solutions);
      if (pkg.worksheet) setWorksheet(pkg.worksheet);
      if (pkg.new_terms) setTerms(pkg.new_terms);
      if (pkg.diagram_worksheet) setDiagram(pkg.diagram_worksheet);
      if (pkg.lesson_plan) setLessonPlan(pkg.lesson_plan);
      showToast('Teaching Suite Generated Successfully!');
    } catch (e) {
      console.error(e);
      showToast('Error generating teaching suite');
    } finally {
      setIsGeneratingAll(false);
    }
  };

  const loadExplanation = async (mode) => {
    try {
      setLoadingExplain(true);
      const res = await copilotExplain(selectedBookId, selectedChapterId, mode);
      setExplanation(res);
    } catch (e) {
      console.error(e);
      showToast('Failed to generate chapter explanation');
    } finally {
      setLoadingExplain(false);
    }
  };

  const loadNotes = async () => {
    try {
      setLoadingNotes(true);
      const res = await copilotNotes(selectedBookId, selectedChapterId);
      setNotes(res);
    } catch (e) {
      console.error(e);
      showToast('Failed to generate notes');
    } finally {
      setLoadingNotes(false);
    }
  };

  const loadPpt = async (count = slideCount) => {
    try {
      setLoadingPpt(true);
      const res = await generatePresentOnDeck({
        chapter_name: selectedChapter?.title || 'Chapter Presentation',
        subject: selectedBook?.subject || 'Science',
        grade: selectedBook?.grade || 'Class 10',
        slide_count: count,
        book_id: selectedBookId,
        chapter_id: selectedChapterId
      });
      setSlideDeck(res);
      setCurrentSlideIndex(0);
    } catch (e) {
      console.error(e);
      showToast('Failed to generate PresentOn slides');
    } finally {
      setLoadingPpt(false);
    }
  };

  const loadSolutions = async () => {
    try {
      setLoadingSolutions(true);
      const res = await copilotTextbookSolutions(selectedBookId, selectedChapterId);
      setSolutions(res);
    } catch (e) {
      console.error(e);
      showToast('Failed to solve textbook questions');
    } finally {
      setLoadingSolutions(false);
    }
  };

  const loadWorksheet = async (wType = worksheetType, count = worksheetCount) => {
    try {
      setLoadingWorksheet(true);
      const res = await copilotWorksheet(selectedBookId, selectedChapterId, wType, count);
      setWorksheet(res);
    } catch (e) {
      console.error(e);
      showToast('Failed to generate worksheet');
    } finally {
      setLoadingWorksheet(false);
    }
  };

  const loadTerms = async () => {
    try {
      setLoadingTerms(true);
      const res = await copilotTerms(selectedBookId, selectedChapterId);
      setTerms(res);
    } catch (e) {
      console.error(e);
      showToast('Failed to extract terms');
    } finally {
      setLoadingTerms(false);
    }
  };

  const loadDiagram = async () => {
    try {
      setLoadingDiagram(true);
      const res = await copilotDiagramWorksheet(selectedBookId, selectedChapterId);
      setDiagram(res);
    } catch (e) {
      console.error(e);
      showToast('Failed to generate diagram worksheet');
    } finally {
      setLoadingDiagram(false);
    }
  };

  const loadLessonPlan = async (duration) => {
    try {
      setLoadingLessonPlan(true);
      const res = await copilotLessonPlan(selectedBookId, selectedChapterId, duration);
      setLessonPlan(res);
    } catch (e) {
      console.error(e);
      showToast('Failed to generate lesson plan');
    } finally {
      setLoadingLessonPlan(false);
    }
  };

  const loadMindMap = async () => {
    try {
      setLoadingMindMap(true);
      const chName = selectedChapter?.title || 'Chapter';
      const res = await copilotMindMap(selectedBookId, selectedChapterId, chName);
      setMindMap(res);
    } catch (e) {
      console.error(e);
      showToast('Failed to build mind map');
    } finally {
      setLoadingMindMap(false);
    }
  };

  const loadExamPatterns = async () => {
    try {
      setLoadingPatterns(true);
      const res = await copilotExamPatterns(selectedBook?.subject || 'Science', selectedBook?.grade || 'Class 10');
      setExamPatterns(res);
    } catch (e) {
      console.error(e);
      showToast('Failed to load past exam patterns');
    } finally {
      setLoadingPatterns(false);
    }
  };

  // Chapter RAG Chat Handler
  const handleSendChatMessage = async (customText = null) => {
    const textToSend = typeof customText === 'string' ? customText : chatInput;
    if (!textToSend.trim() || chatLoading) return;
    const userMsg = textToSend.trim();
    setChatInput('');
    const newHistory = [...chatMessages, { role: 'user', content: userMsg }];
    setChatMessages(newHistory);
    try {
      setChatLoading(true);
      const res = await sendChatMessage({
        message: userMsg,
        book_id: selectedBookId,
        chapter_id: selectedChapterId,
        book_only_mode: chatStrictOnly,
        history: chatMessages.slice(-6),
      });
      setChatMessages([
        ...newHistory,
        {
          role: 'assistant',
          content: res.response || res.message,
          citations: res.citations || res.sources || [],
          groundingScore: res.grounding_score,
          groundingStatus: res.grounding_status,
        },
      ]);
    } catch (err) {
      console.error(err);
      showToast('Chat failed to respond');
    } finally {
      setChatLoading(false);
    }
  };

  // Live Classroom Room Creator
  const handleStartLiveClassroom = async () => {
    if (!worksheet || !worksheet.questions || worksheet.questions.length === 0) {
      showToast('Please generate a worksheet first to launch a live room.');
      return;
    }
    try {
      setCreatingLive(true);
      const session = await copilotCreateLiveSession({
        teacher_name: 'Teacher',
        book_id: selectedBookId,
        chapter_id: selectedChapterId,
        chapter_name: selectedChapter?.title || 'Chapter',
        worksheet_title: worksheet.title,
        questions: worksheet.questions,
      });
      setLiveSession(session);
      showToast(`Live Room ${session.room_code} Opened!`);

      const intId = setInterval(async () => {
        try {
          const stats = await copilotGetLiveAnalytics(session.room_code);
          setLiveAnalytics(stats);
        } catch (err) {
          console.error(err);
        }
      }, 3000);
      setLiveIntervalId(intId);
    } catch (e) {
      console.error(e);
      showToast('Failed to open live classroom');
    } finally {
      setCreatingLive(false);
    }
  };

  // Downloads
  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadNotesPdf = async () => {
    if (!notes) return;
    try {
      const blob = await copilotDownloadNotesPdf(notes);
      downloadBlob(blob, `Notes_${selectedChapter?.title || 'Chapter'}.pdf`);
      showToast('Notes PDF Downloaded!');
    } catch (e) {
      console.error(e);
      showToast('Failed to download notes PDF');
    }
  };

  const handleDownloadPptx = async () => {
    if (!slideDeck) return;
    try {
      const blob = await copilotDownloadPptx(slideDeck);
      downloadBlob(blob, `Presentation_${selectedChapter?.title || 'Chapter'}.pptx`);
      showToast('PowerPoint (.pptx) Downloaded!');
    } catch (e) {
      console.error(e);
      showToast('Failed to download presentation');
    }
  };

  const handleDownloadWorksheetPdf = async () => {
    if (!worksheet) return;
    try {
      const blob = await copilotDownloadWorksheetPdf(worksheet, 'Central Public School');
      downloadBlob(blob, `Worksheet_${selectedChapter?.title || 'Chapter'}.pdf`);
      showToast('Worksheet PDF Downloaded!');
    } catch (e) {
      console.error(e);
      showToast('Failed to download worksheet PDF');
    }
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) {
      showToast('Speech synthesis not supported on this browser');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    showToast('Reading aloud...');
  };

  const tabs = [
    { id: 'explain', label: 'Chapter Explanation', icon: BookOpen, badge: '6 Modes' },
    { id: 'notes', label: 'Chapter Notes', icon: FileText, badge: 'PDF' },
    { id: 'ppt', label: 'Presentation (PPT)', icon: Presentation, badge: '16:9 Real PPTX' },
    { id: 'solutions', label: 'Textbook Solutions', icon: CheckCircle2, badge: 'Step-by-Step' },
    { id: 'worksheet', label: 'Worksheet Studio', icon: Layers, badge: 'Uncapped DPP' },
    { id: 'chat', label: 'Chapter Chat (RAG)', icon: MessageSquare, badge: 'Anti-Hallucination' },
    { id: 'live', label: 'Live Classroom', icon: Flame, badge: 'Realtime' },
    { id: 'mindmap', label: 'Knowledge Graph', icon: Network, badge: 'KAQG' },
    { id: 'terms', label: 'Glossary & Flashcards', icon: BookMarked, badge: 'Flip' },
    { id: 'diagram', label: 'Diagram Worksheet', icon: ImageIcon, badge: 'Visual' },
    { id: 'lesson', label: 'Lesson Plan', icon: Calendar, badge: 'Timed' },
    { id: 'patterns', label: 'Exam Pattern Analytics', icon: TrendingUp, badge: 'ExamRAG' },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold border border-slate-700 animate-bounce">
          <Info className="w-5 h-5 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner & Chapter Selector */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              AI Teacher Copilot • 100% NCERT & Textbook Grounded
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
              Curriculum Teaching & Assessment Studio
            </h1>
            <p className="text-sm text-indigo-200/90 max-w-2xl">
              Turn any chapter into instant high-yield explanations, study notes, slide decks, Bloom-level MCQs, printable worksheets, and live classroom quizzes.
            </p>
          </div>

          {/* Master Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('notes_hub')}
              className="px-4 py-3.5 rounded-2xl bg-red-700/90 hover:bg-red-700 text-white font-bold text-xs border border-red-500/40 shadow-md transition flex items-center gap-2"
            >
              <BookMarked className="w-4 h-4 text-amber-300" />
              <span>📚 NCERTStudy Notes (Class 6-12)</span>
            </button>

            <button
              onClick={() => setShowNcertModal(true)}
              className="px-4 py-3.5 rounded-2xl bg-indigo-700/80 hover:bg-indigo-700 text-white font-bold text-xs border border-indigo-500/40 shadow-md transition flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-amber-300" />
              <span>NCERT Catalog (1,122+ Books)</span>
            </button>

            <button
              onClick={handleOpenReader}
              disabled={!selectedBookId}
              className="px-4 py-3.5 rounded-2xl bg-indigo-700/80 hover:bg-indigo-700 text-white font-bold text-xs border border-indigo-500/40 shadow-md transition flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>📖 Read Textbook</span>
            </button>

            <button
              onClick={handleTeachThisChapter}
              disabled={isGeneratingAll || !selectedChapterId}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs lg:text-sm shadow-lg shadow-amber-500/20 transition flex items-center gap-2 disabled:opacity-50 group"
            >
              <Sparkles className={`w-4 h-4 text-slate-900 ${isGeneratingAll ? 'animate-spin' : 'group-hover:rotate-12 transition'}`} />
              <span>{isGeneratingAll ? 'Synthesizing All Modules...' : '⚡ Teach This Chapter (1-Click)'}</span>
            </button>
          </div>
        </div>

        {/* Book & Chapter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-indigo-700/40">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-indigo-200 uppercase tracking-wider">
                Select Book / NCERT Textbook ({books.length} Available)
              </label>
              <button
                onClick={() => setShowNcertModal(true)}
                className="text-[11px] font-bold text-amber-300 hover:underline flex items-center gap-1"
              >
                + Browse More Books
              </button>
            </div>
            <select
              value={selectedBookId}
              onChange={(e) => {
                const bId = e.target.value;
                setSelectedBookId(bId);
                const b = books.find((x) => x.id === bId);
                if (b && b.chapters && b.chapters.length > 0) {
                  setSelectedChapterId(b.chapters[0].id);
                }
                setExplanation(null);
                setNotes(null);
                setSlideDeck(null);
                setSolutions([]);
                setWorksheet(null);
                setTerms([]);
                setDiagram(null);
                setLessonPlan(null);
                setMindMap(null);
              }}
              className="w-full bg-indigo-950/60 border border-indigo-700/60 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {books.map((b) => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                  {b.title} ({b.grade || 'NCERT'}) • {b.chapters?.length || 0} Chs
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2">
              Select Chapter
            </label>
            <select
              value={selectedChapterId}
              onChange={(e) => {
                setSelectedChapterId(e.target.value);
                setExplanation(null);
                setNotes(null);
                setSlideDeck(null);
                setSolutions([]);
                setWorksheet(null);
                setTerms([]);
                setDiagram(null);
                setLessonPlan(null);
                setMindMap(null);
              }}
              className="w-full bg-indigo-950/60 border border-indigo-700/60 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {(selectedBook?.chapters || []).map((ch) => (
                <option key={ch.id} value={ch.id} className="bg-slate-900 text-white">
                  Ch {ch.chapter_number || ''}: {ch.title} (p. {ch.start_page || 1}-{ch.end_page || 1})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 1. CHAPTER EXPLANATION TAB */}
      {/* ========================================================= */}
      {activeTab === 'explain' && (
        <div className="space-y-6">
          {/* Pedagogical Modes Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pedagogical Mode:</span>
              {[
                { id: 'student_friendly', label: 'Student-Friendly', desc: 'Standard intuitive' },
                { id: 'very_simple', label: 'ELI5 (Very Simple)', desc: 'Cartoon analogies' },
                { id: 'detailed', label: 'Detailed Mechanism', desc: 'Deep scientific' },
                { id: 'teacher_mode', label: 'Teacher / Blackboard', desc: 'Pedagogical cues' },
                { id: 'exam_mode', label: 'Board Exam Focus', desc: 'Marking keywords' },
                { id: 'real_life_examples', label: 'Real-Life Examples', desc: 'Practical applications' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setExplainMode(m.id);
                    loadExplanation(m.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    explainMode === m.id
                      ? 'bg-indigo-50 border border-indigo-300 text-indigo-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => loadExplanation(explainMode)}
                disabled={loadingExplain}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                title="Regenerate"
              >
                <RefreshCw className={`w-4 h-4 ${loadingExplain ? 'animate-spin text-indigo-600' : ''}`} />
              </button>
              <button
                onClick={() => {
                  if (explanation) {
                    const fullText = `${explanation.title}\n\n${explanation.key_takeaway}\n\n` +
                      explanation.sections.map((s) => `${s.heading}\n${s.summary}\n${s.bullet_points.join('\n')}`).join('\n\n');
                    navigator.clipboard.writeText(fullText);
                    showToast('Explanation copied to clipboard!');
                  }
                }}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                title="Copy Text"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (explanation) speakText(`${explanation.title}. ${explanation.key_takeaway}`);
                }}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                title="Read Aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loadingExplain ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Synthesizing Pedagogical Explanation with Shiksha-AI...</p>
            </div>
          ) : explanation ? (
            <div className="space-y-6">
              {/* Overarching Takeaway */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-indigo-800 font-black text-xs uppercase tracking-wider">
                  <Brain className="w-4 h-4" />
                  <span>Key Conceptual Takeaway</span>
                </div>
                <p className="text-base font-bold text-indigo-950 leading-relaxed">
                  {explanation.key_takeaway}
                </p>
              </div>

              {/* Structured Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {explanation.sections.map((sec, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                    <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                        {idx + 1}
                      </span>
                      {sec.heading}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {sec.summary}
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {sec.bullet_points.map((bp, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span>{bp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Real Life & Board Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 space-y-2">
                  <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-600" />
                    Real-Life Analogies & Phenomena
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-900/90 font-medium">
                    {explanation.real_life_analogies.map((r, rIdx) => (
                      <li key={rIdx}>💡 {r}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-2">
                  <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    Board Examination Marking Tips
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-900/90 font-medium">
                    {explanation.board_exam_tips.map((t, tIdx) => (
                      <li key={tIdx}>✓ {t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. CHAPTER NOTES TAB */}
      {/* ========================================================= */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div>
              <h2 className="font-black text-slate-900 text-base">High-Yield Revision Notes</h2>
              <p className="text-xs text-slate-500 font-medium">Formulas, key definitions, and common student errors</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadNotesPdf}
                disabled={!notes}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 flex items-center gap-2 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF Notes</span>
              </button>
            </div>
          </div>

          {loadingNotes ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Synthesizing Notes with Shiksha-AI...</p>
            </div>
          ) : notes ? (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
                <h3 className="font-black text-slate-900 text-sm">Chapter Overview</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{notes.summary}</p>
              </div>

              {/* Definitions */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h3 className="font-black text-slate-900 text-sm">Key Terminology & Definitions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {notes.definitions.map((d, dIdx) => (
                    <div key={dIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-black text-xs text-indigo-900 block">{d.term}</span>
                      <p className="text-[11px] text-slate-600 font-medium">{d.definition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulas & Equations */}
              {notes.formulas && notes.formulas.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <h3 className="font-black text-slate-900 text-sm">Governing Formulas & Chemical Equations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {notes.formulas.map((f, fIdx) => (
                      <div key={fIdx} className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{f.name}</span>
                        <code className="text-xs font-mono font-bold text-indigo-800 block">{f.formula}</code>
                        {f.units && <span className="text-[10px] text-slate-400 font-medium">Units: {f.units}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Misconceptions vs Reality */}
              {notes.common_misconceptions && notes.common_misconceptions.length > 0 && (
                <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 space-y-3">
                  <h3 className="font-black text-rose-900 text-sm">Common Student Misconceptions</h3>
                  <div className="space-y-2">
                    {notes.common_misconceptions.map((m, mIdx) => (
                      <div key={mIdx} className="p-3 bg-white rounded-xl border border-rose-100 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-rose-600 font-bold">
                          <span>❌ Misconception:</span>
                          <span className="text-slate-700 font-medium">{m.misconception}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                          <span>✓ Fact:</span>
                          <span className="text-slate-700 font-medium">{m.reality}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. CHAPTER PRESENTATION (PPT) TAB (EXPANDABLE SLIDE COUNT) */}
      {/* ========================================================= */}
      {/* ========================================================= */}
      {/* 3. PRESENTON AI PRESENTATION ENGINE (github.com/presenton/presenton) */}
      {/* ========================================================= */}
      {activeTab === 'ppt' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Slide Count:</span>
              {[
                { count: 6, label: '6 Slides (Quick)' },
                { count: 10, label: '10 Slides (Standard)' },
                { count: 14, label: '14 Slides (Deep)' },
                { count: 18, label: '18 Slides (Master)' },
              ].map((s) => (
                <button
                  key={s.count}
                  onClick={() => {
                    setSlideCount(s.count);
                    loadPpt(s.count);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    slideCount === s.count
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => loadPpt(slideCount)}
                disabled={loadingPpt}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingPpt ? 'animate-spin text-indigo-600' : ''}`} />
                <span>Regenerate PresentOn</span>
              </button>
            </div>
          </div>

          {loadingPpt ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Synthesizing PresentOn {slideCount}-Slide Presentation with AI Engine...</p>
            </div>
          ) : (
            <PresentOnDeck deck={slideDeck} onRegenerate={loadPpt} loading={loadingPpt} />
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. TEXTBOOK & NCERT SOLUTIONS TAB */}
      {/* ========================================================= */}
      {activeTab === 'solutions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div>
              <h2 className="font-black text-slate-900 text-base">Textbook / NCERT Exercise Solutions</h2>
              <p className="text-xs text-slate-500 font-medium">Verified solutions with mathematical steps and governing formulas</p>
            </div>
            <button
              onClick={loadSolutions}
              disabled={loadingSolutions}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
              title="Regenerate Solutions"
            >
              <RefreshCw className={`w-4 h-4 ${loadingSolutions ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
          </div>

          {loadingSolutions ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Extracting and Solving Textbook Questions...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {solutions.map((sol, sIdx) => (
                <div key={sIdx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      Exercise Question {sol.question_number || sIdx + 1}
                    </span>
                    {sol.page_reference && (
                      <span className="text-[11px] font-bold text-slate-400">
                        Page {sol.page_reference}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-relaxed">
                    {sol.question_text}
                  </h3>

                  {sol.governing_formula && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-indigo-800">
                      <b>Formula:</b> {sol.governing_formula}
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                    <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider block">
                      Step-by-Step Solution:
                    </span>
                    <p className="text-xs text-slate-800 whitespace-pre-line font-medium leading-relaxed">
                      {sol.step_by_step_solution}
                    </p>
                    <div className="pt-2 border-t border-emerald-200/60 font-bold text-xs text-emerald-900">
                      <b>Final Answer:</b> {sol.final_answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. WORKSHEET STUDIO TAB (UNCAPPED DPP & QUESTION COUNT) */}
      {/* ========================================================= */}
      {activeTab === 'worksheet' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Style:</span>
              {[
                { id: 'practice', label: 'Daily DPP' },
                { id: 'revision', label: 'Rapid Revision' },
                { id: 'exam', label: 'Mock Test' },
                { id: 'activity', label: 'Activity Sheet' },
                { id: 'homework', label: 'Guided Homework' },
                { id: 'basic', label: 'Foundational' },
                { id: 'advanced', label: 'HOTS' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setWorksheetType(t.id);
                    loadWorksheet(t.id, worksheetCount);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    worksheetType === t.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Question Count Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Questions:</span>
              {[
                { count: 5, label: '5 Qs' },
                { count: 10, label: '10 Qs (DPP)' },
                { count: 15, label: '15 Qs' },
                { count: 20, label: '20 Qs (Test)' },
                { count: 30, label: '30 Qs (Grand)' },
              ].map((q) => (
                <button
                  key={q.count}
                  onClick={() => {
                    setWorksheetCount(q.count);
                    loadWorksheet(worksheetType, q.count);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    worksheetCount === q.count
                      ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  showAnswers ? 'bg-amber-50 border-amber-300 text-amber-800' : 'border-slate-200 text-slate-700'
                }`}
              >
                {showAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showAnswers ? 'Hide Answers' : 'Show Answer Key'}</span>
              </button>
              <button
                onClick={handleDownloadWorksheetPdf}
                disabled={!worksheet}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 flex items-center gap-2 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Printable PDF</span>
              </button>
            </div>
          </div>

          {loadingWorksheet ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Generating {worksheetCount} Verified Questions with EduAgentQG...</p>
            </div>
          ) : worksheet ? (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-base">{worksheet.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {worksheet.grade} • {worksheet.subject} • Total Marks: {worksheet.total_marks} • Time: {worksheet.estimated_time_minutes}m
                  </p>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {worksheet.questions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-indigo-700">
                        Q{q.question_number || qIdx + 1} [{q.marks} Mark{q.marks > 1 ? 's' : ''}] • {q.question_type}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        Bloom's: {q.blooms_level}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line">{q.question_text}</p>

                    {q.options && q.options.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Answer Key Toggle */}
                    {showAnswers && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                        <span className="font-black text-emerald-800">Correct Answer: {q.correct_answer}</span>
                        {q.step_by_step_solution && (
                          <p className="text-emerald-900/90 font-medium whitespace-pre-line">{q.step_by_step_solution}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. CHAPTER CHAT (STRICT RAG) TAB */}
      {/* ========================================================= */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">
                Textbook Grounded RAG Chat
              </span>
              <h3 className="font-black text-slate-900 text-sm">
                Chatting with: {selectedBook?.title} (Ch: {selectedChapter?.title})
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chatStrictOnly}
                  onChange={(e) => setChatStrictOnly(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Strict Textbook Mode</span>
              </label>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-3 bg-indigo-50/50 border-b border-indigo-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-black uppercase text-indigo-700 whitespace-nowrap">⚡ Quick Prompts:</span>
            {[
              `Explain core mechanism of ${selectedChapter?.title || 'this chapter'}`,
              `Give 5 high-yield practice questions with solutions`,
              `What are the most common student mistakes in this topic?`,
              `Explain all formulas and SI units in this chapter`,
            ].map((pText, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendChatMessage(pText)}
                className="px-3 py-1 bg-white hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-full text-xs font-semibold whitespace-nowrap transition shadow-2xs"
              >
                {pText}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {chatMessages.map((msg, mIdx) => (
              <div
                key={mIdx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs font-medium leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-900 border border-slate-200 space-y-3'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>

                  {/* Citations badge */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 space-y-1">
                      <span className="text-[10px] font-black uppercase text-indigo-700 flex items-center gap-1">
                        <BookMarked className="w-3 h-3" /> Grounded Textbook Citations:
                      </span>
                      {msg.citations.map((c, cIdx) => (
                        <div key={cIdx} className="text-[10px] bg-white p-2 rounded-lg border border-slate-200 text-slate-600 font-mono">
                          <b>p. {c.page || c.metadata?.page_number}</b> ({c.chapter_name || c.metadata?.chapter_title}): "{c.text_reference || c.content?.slice(0, 100)}..."
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex gap-2 items-center text-xs text-indigo-600 font-bold p-3 bg-indigo-50 rounded-xl w-fit">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Searching chapter context and reasoning with RAG...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={(e) => { e.preventDefault(); handleSendChatMessage(); }} className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
            <input
              type="text"
              placeholder={`Ask any question about ${selectedChapter?.title || 'this chapter'}...`}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md shadow-indigo-100 flex items-center gap-1.5 disabled:opacity-40 transition"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. LIVE CLASSROOM WORKSHEET TAB */}
      {/* ========================================================= */}
      {activeTab === 'live' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 lg:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                ⚡ Realtime Classroom Studio
              </span>
              <h2 className="text-2xl font-black">Interactive Live Classroom Room</h2>
              <p className="text-xs text-white/90 max-w-xl">
                Open a live room for students. Students join with the Room Code on their phones, submit answers, and see instant feedback on the live leaderboard.
              </p>
            </div>

            {!liveSession ? (
              <button
                onClick={handleStartLiveClassroom}
                disabled={creatingLive}
                className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-black text-sm shadow-xl hover:bg-slate-50 transition shrink-0 flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-orange-600" />
                <span>{creatingLive ? 'Opening Room...' : 'Launch Live Room'}</span>
              </button>
            ) : (
              <button
                onClick={async () => {
                  if (liveSession) {
                    await copilotCloseLiveSession(liveSession.room_code);
                    if (liveIntervalId) clearInterval(liveIntervalId);
                    setLiveSession(null);
                    showToast('Live Session Closed.');
                  }
                }}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-xl hover:bg-slate-800 transition shrink-0"
              >
                Close Room
              </button>
            )}
          </div>

          {liveSession && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Room Access Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Student Room Code
                </span>
                <div className="text-4xl font-black text-indigo-700 tracking-wider bg-indigo-50 py-3 rounded-2xl border border-indigo-100">
                  {liveSession.room_code}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Students join via the <b>Live Quiz (Student)</b> menu using this code.
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(liveSession.room_code);
                    showToast('Room Code copied!');
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" /> Copy Code
                </button>
              </div>

              {/* Realtime Stats */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600" />
                    Live Student Submissions ({liveAnalytics?.total_participants || 0})
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Feed
                  </span>
                </div>

                {liveAnalytics && liveAnalytics.leaderboard && liveAnalytics.leaderboard.length > 0 ? (
                  <div className="space-y-2">
                    {liveAnalytics.leaderboard.map((st, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">
                            {st.rank}
                          </span>
                          <span className="text-slate-900 font-bold">{st.student_name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-500">{st.score} / {st.total_marks} Marks</span>
                          <span className="text-emerald-700 font-extrabold">{st.accuracy}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400 font-medium">
                    Waiting for students to join room {liveSession.room_code}...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. KNOWLEDGE GRAPH & MIND MAP TAB */}
      {/* ========================================================= */}
      {activeTab === 'mindmap' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div>
              <h2 className="font-black text-slate-900 text-base">Knowledge-Aware Question Graph (KAQG)</h2>
              <p className="text-xs text-slate-500 font-medium">Prerequisite concept hierarchy, learning paths, and weak topic cues</p>
            </div>
            <button
              onClick={loadMindMap}
              disabled={loadingMindMap}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loadingMindMap ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
          </div>

          {loadingMindMap ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Building Concept Knowledge Graph...</p>
            </div>
          ) : mindMap && mindMap.nodes && mindMap.nodes.length > 0 ? (
            <div className="space-y-6">
              {/* Interactive Tree View */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm space-y-6">
                <div className="p-4 rounded-2xl bg-indigo-900 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-300 uppercase">Root Topic</span>
                    <h3 className="text-lg font-black">{mindMap.root_topic}</h3>
                  </div>
                  <span className="text-xs font-bold text-indigo-200">
                    {mindMap.nodes[0]?.children?.length || 0} Core Branches
                  </span>
                </div>

                {/* Branches */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mindMap.nodes[0]?.children?.map((branch, bIdx) => (
                    <div key={bIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <h4 className="font-black text-xs uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                        <Network className="w-4 h-4 text-indigo-600" />
                        {branch.text}
                      </h4>
                      <div className="space-y-2">
                        {branch.children?.map((sub, sIdx) => (
                          <div key={sIdx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                            <span className="font-bold text-xs text-slate-900 block">{sub.text}</span>
                            {sub.notes && <p className="text-[11px] text-slate-500 font-medium">{sub.notes}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. GLOSSARY & FLASHCARDS TAB */}
      {/* ========================================================= */}
      {activeTab === 'terms' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div>
              <h2 className="font-black text-slate-900 text-base">Key Terms & Interactive Flashcards</h2>
              <p className="text-xs text-slate-500 font-medium">Click any card to flip between textbook and simplified meanings</p>
            </div>
            <button
              onClick={loadTerms}
              disabled={loadingTerms}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loadingTerms ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
          </div>

          {loadingTerms ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Extracting Terms & Flashcards...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {terms.map((term, tIdx) => {
                const isFlipped = !!flippedTerms[tIdx];
                return (
                  <div
                    key={tIdx}
                    onClick={() => setFlippedTerms({ ...flippedTerms, [tIdx]: !isFlipped })}
                    className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-indigo-400 cursor-pointer shadow-sm transition-all space-y-3 min-h-[180px] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {term.category || 'Term'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">Click to flip</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-black text-slate-900 text-base">{term.term}</h4>
                      <p className="text-xs font-medium text-slate-600 leading-relaxed">
                        {isFlipped ? `💡 ${term.simple_meaning}` : term.textbook_meaning}
                      </p>
                    </div>

                    {term.example_sentence && (
                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
                        "{term.example_sentence}"
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. DIAGRAM WORKSHEET TAB */}
      {/* ========================================================= */}
      {activeTab === 'diagram' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div>
              <h2 className="font-black text-slate-900 text-base">Scientific Diagram & Labeling Worksheet</h2>
              <p className="text-xs text-slate-500 font-medium">Part identification and structural questions</p>
            </div>
            <button
              onClick={loadDiagram}
              disabled={loadingDiagram}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loadingDiagram ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
          </div>

          {loadingDiagram ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Generating Diagram Worksheet...</p>
            </div>
          ) : diagram ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="font-black text-slate-900 text-lg">{diagram.diagram_name}</h3>
                <p className="text-xs text-slate-600 font-medium">{diagram.diagram_description}</p>
              </div>

              {/* ASCII / Schematic Box */}
              {diagram.diagram_ascii_or_svg && (
                <pre className="p-5 rounded-2xl bg-slate-900 text-indigo-300 font-mono text-xs overflow-x-auto">
                  {diagram.diagram_ascii_or_svg}
                </pre>
              )}

              {/* Labeling Parts Key */}
              {diagram.labeling_parts && (
                <div className="space-y-2">
                  <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Identified Components:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {diagram.labeling_parts.map((p, pIdx) => (
                      <div key={pIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <span className="font-black text-indigo-700 mr-2">Part {p.label}:</span>
                        <span className="text-slate-800 font-medium">{p.part_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. LESSON PLAN TAB */}
      {/* ========================================================= */}
      {activeTab === 'lesson' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Duration:</span>
              {[30, 45, 60, 90].map((dur) => (
                <button
                  key={dur}
                  onClick={() => {
                    setPlanDuration(dur);
                    loadLessonPlan(dur);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    planDuration === dur
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {dur} Mins
                </button>
              ))}
            </div>

            <button
              onClick={() => loadLessonPlan(planDuration)}
              disabled={loadingLessonPlan}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loadingLessonPlan ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
          </div>

          {loadingLessonPlan ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Structuring Lesson Plan with Pedagogical LLM...</p>
            </div>
          ) : lessonPlan ? (
            <div className="space-y-6">
              {/* Objectives & Materials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
                  <h4 className="font-bold text-xs text-indigo-900 uppercase tracking-wider">Learning Objectives</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {lessonPlan.learning_objectives?.map((obj, oIdx) => (
                      <li key={oIdx}>🎯 {obj}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
                  <h4 className="font-bold text-xs text-indigo-900 uppercase tracking-wider">Materials & Setup</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {lessonPlan.materials_required?.map((mat, mIdx) => (
                      <li key={mIdx}>📦 {mat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Teaching Phases Timeline */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h4 className="font-black text-slate-900 text-sm">Classroom Teaching Phases</h4>
                <div className="space-y-3">
                  {lessonPlan.phases?.map((ph, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-indigo-800">
                          {pIdx + 1}. {ph.phase_name}
                        </span>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {ph.allocated_minutes} Minutes
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <p className="text-slate-700 font-medium">
                          <b>Teacher:</b> {ph.teacher_activity}
                        </p>
                        <p className="text-slate-700 font-medium">
                          <b>Student:</b> {ph.student_activity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. EXAM PATTERN ANALYTICS TAB */}
      {/* ========================================================= */}
      {activeTab === 'patterns' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div>
              <h2 className="font-black text-slate-900 text-base">ExamRAG Historical Pattern Analytics</h2>
              <p className="text-xs text-slate-500 font-medium">Topic frequencies, repeated questions, and under-tested areas</p>
            </div>
            <button
              onClick={loadExamPatterns}
              disabled={loadingPatterns}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loadingPatterns ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
          </div>

          {loadingPatterns ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">Analyzing Past Papers with ExamRAG...</p>
            </div>
          ) : examPatterns ? (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 space-y-2">
                <h4 className="font-black text-xs text-indigo-900 uppercase tracking-wider">Exam Analysis Summary</h4>
                <p className="text-xs text-indigo-950 font-medium leading-relaxed">{examPatterns.summary}</p>
              </div>

              {/* Frequent Topics Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h4 className="font-black text-slate-900 text-sm">High-Yield Exam Topics</h4>
                <div className="space-y-2">
                  {examPatterns.top_frequent_topics.map((t, tIdx) => (
                    <div key={tIdx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{t.topic_name}</span>
                        <span className="text-[10px] text-slate-500">Trend: {t.difficulty_trend} • Bloom: {t.bloom_trend}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-indigo-700 block">{t.marks_weightage_percentage}% Marks</span>
                        <span className="text-[10px] text-slate-400">Freq: {t.frequency_count}x</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================= */}
      {/* NCERT CATALOG & IMPORTER MODAL */}
      {/* ========================================================= */}
      {showNcertModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-amber-300" />
                  <h2 className="text-lg font-black tracking-tight">Official NCERT Textbook Library</h2>
                </div>
                <p className="text-xs text-indigo-200">
                  Select and import any textbook across Class 1 to 12. Instant RAG indexing with zero manual uploads.
                </p>
              </div>
              <button
                onClick={() => setShowNcertModal(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Bar */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                  Class Grade
                </label>
                <select
                  value={ncertClassFilter}
                  onChange={(e) => setNcertClassFilter(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All Classes">All Classes (1 to 12)</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                    <option key={g} value={`Class ${g}`}>Class {g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <select
                  value={ncertSubjectFilter}
                  onChange={(e) => setNcertSubjectFilter(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All Subjects">All Subjects</option>
                  {(ncertMeta?.all_subjects || ['Science', 'Mathematics', 'Social Science', 'English', 'Physics', 'Chemistry', 'Biology']).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
                  Search Title / Code
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search NCERT book..."
                    value={ncertSearchQuery}
                    onChange={(e) => setNcertSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="flex-1 p-6 overflow-y-auto">
              {ncertLoading ? (
                <div className="py-16 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-600">Loading NCERT Catalog...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {ncertCatalog.map((item) => {
                    const isAlreadyImported = books.some((b) => b.id === `ncert-${item.code}`);
                    return (
                      <div
                        key={item.code}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-indigo-400 transition-all flex flex-col justify-between space-y-3 shadow-sm"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                              {item.class_grade}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              {item.medium || 'English'}
                            </span>
                          </div>
                          <h4 className="font-black text-slate-900 text-sm leading-tight pt-1">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {item.subject} • {item.chapters_count || 12} Chapters
                          </p>
                        </div>

                        {isAlreadyImported ? (
                          <div className="w-full py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                            <Check className="w-3.5 h-3.5" /> In Your Library
                          </div>
                        ) : (
                          <button
                            onClick={() => handleImportNcert(item.code)}
                            disabled={importingCode === item.code}
                            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                          >
                            {importingCode === item.code ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                            <span>{importingCode === item.code ? 'Importing...' : '1-Click Import'}</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* INTERACTIVE TEXTBOOK READER & REAL PDF PREVIEW MODAL */}
      {/* ========================================================= */}
      {showReaderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Reader Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">{selectedBook?.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Chapter: {selectedChapter?.title}
                  </p>
                </div>
              </div>

              {/* Toggle Buttons */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-200/80 p-1 rounded-xl">
                  <button
                    onClick={() => setReaderModalViewMode('pdf')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      readerModalViewMode === 'pdf' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    📄 Real PDF Preview
                  </button>
                  <button
                    onClick={() => setReaderModalViewMode('passages')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      readerModalViewMode === 'passages' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    📖 Digital Excerpts
                  </button>
                </div>

                <a
                  href={`/api/books/${selectedBookId}/pdf?chapter_id=${selectedChapterId || ''}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-200 transition"
                  title="Open PDF in Full Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setShowReaderModal(false)}
                  className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-200 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Reader Content */}
            <div className="flex-1 p-4 lg:p-6 overflow-y-auto bg-slate-100/50">
              {readerModalViewMode === 'pdf' ? (
                <div className="w-full h-[650px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                  <iframe
                    src={`/api/books/${selectedBookId}/pdf?chapter_id=${selectedChapterId || ''}#toolbar=1&navpanes=1&scrollbar=1`}
                    title="Real Textbook PDF View"
                    className="w-full h-full border-0"
                  />
                </div>
              ) : readerLoading ? (
                <div className="py-16 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-600">Retrieving Full Textbook Passages...</p>
                </div>
              ) : readerData && readerData.passages && readerData.passages.length > 0 ? (
                <div className="max-w-3xl mx-auto space-y-6">
                  {readerData.passages.map((p, pIdx) => (
                    <div key={pIdx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          Page {p.page_number} • {p.section_name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          Excerpt #{pIdx + 1}
                        </span>
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed font-serif whitespace-pre-line">
                        {p.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-slate-400 font-medium">
                  No passages found for this chapter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
