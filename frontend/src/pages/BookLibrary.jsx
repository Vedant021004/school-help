import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, Plus, Search, Trash2, RefreshCw, Sparkles, MessageSquare, 
  Layers, FileText, CheckCircle2, ChevronRight, X, UploadCloud, Eye, Tag,
  Globe, Download, Check, ExternalLink, Bookmark, Filter, BookMarked
} from 'lucide-react';
import { fetchBooks, uploadBook, deleteBook, reindexBook, fetchNcertCatalog, importNcertBook } from '../api';

const NCERT_CLASSES = [
  "All Classes",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12"
];

const ALL_NCERT_SUBJECTS = [
  "All Subjects",
  "Mathematics",
  "Science",
  "Social Science",
  "Environmental Studies",
  "English",
  "Hindi",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Economics",
  "Accountancy",
  "Political Science"
];

export default function BookLibrary({ onNavigate, onSelectBookForChat, onSelectBookForPaper }) {
  const [activeTab, setActiveTab] = useState('my-books'); // 'my-books' | 'ncert-catalog'
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  
  // NCERT Catalog state
  const [ncertCatalog, setNcertCatalog] = useState([]);
  const [ncertLoading, setNcertLoading] = useState(false);
  const [ncertSearchQuery, setNcertSearchQuery] = useState('');
  const [ncertClassFilter, setNcertClassFilter] = useState('All Classes');
  const [ncertSubjectFilter, setNcertSubjectFilter] = useState('All Subjects');
  const [ncertBookTitleFilter, setNcertBookTitleFilter] = useState('All Books');
  const [importingCode, setImportingCode] = useState(null);
  const [previewNcertBook, setPreviewNcertBook] = useState(null);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subject: 'Science',
    grade: 'Class 10',
    board: 'CBSE',
    author: 'NCERT',
    academic_year: '2025-2026',
    file: null,
  });

  // Active book drawer state
  const [selectedBook, setSelectedBook] = useState(null);
  const [reindexingId, setReindexingId] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    loadNcertCatalog();
  }, [ncertClassFilter, ncertSubjectFilter, ncertSearchQuery]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      console.error('Failed to load books:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadNcertCatalog = async () => {
    try {
      setNcertLoading(true);
      const data = await fetchNcertCatalog({
        query: ncertSearchQuery || undefined,
        class_grade: ncertClassFilter !== 'All Classes' ? ncertClassFilter : undefined,
        subject: ncertSubjectFilter !== 'All Subjects' ? ncertSubjectFilter : undefined,
      });
      setNcertCatalog(data);
    } catch (err) {
      console.error('Failed to load NCERT catalog:', err);
    } finally {
      setNcertLoading(false);
    }
  };

  // Compute available subjects for the currently selected class
  const dynamicSubjects = useMemo(() => {
    if (ncertClassFilter === 'All Classes') {
      return ALL_NCERT_SUBJECTS;
    }
    const subjectsInClass = new Set(
      ncertCatalog
        .filter(b => b.class_grade.toLowerCase() === ncertClassFilter.toLowerCase())
        .map(b => b.subject)
    );
    return ['All Subjects', ...Array.from(subjectsInClass)];
  }, [ncertClassFilter, ncertCatalog]);

  // Compute available book titles for cascading selector
  const dynamicBookTitles = useMemo(() => {
    let list = ncertCatalog;
    if (ncertClassFilter !== 'All Classes') {
      list = list.filter(b => b.class_grade.toLowerCase() === ncertClassFilter.toLowerCase());
    }
    if (ncertSubjectFilter !== 'All Subjects') {
      list = list.filter(b => b.subject.toLowerCase() === ncertSubjectFilter.toLowerCase());
    }
    return ['All Books', ...list.map(b => b.title)];
  }, [ncertClassFilter, ncertSubjectFilter, ncertCatalog]);

  // Filtered NCERT items based on book title selector
  const displayedNcertCatalog = useMemo(() => {
    if (ncertBookTitleFilter === 'All Books') {
      return ncertCatalog;
    }
    return ncertCatalog.filter(b => b.title === ncertBookTitleFilter);
  }, [ncertCatalog, ncertBookTitleFilter]);

  const handleImportNcert = async (bookItem) => {
    try {
      setImportingCode(bookItem.code);
      const imported = await importNcertBook(bookItem.code);
      await loadBooks();
      alert(`🎉 Successfully imported and indexed "${imported.title}" into your textbook library!`);
      setActiveTab('my-books');
    } catch (err) {
      alert(`Import failed: ${err.message}`);
    } finally {
      setImportingCode(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadForm({
        ...uploadForm,
        file,
        title: uploadForm.title || file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')
      });
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadForm.file) return alert('Please choose a PDF file');
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', uploadForm.file);
      formData.append('title', uploadForm.title);
      formData.append('subject', uploadForm.subject);
      formData.append('grade', uploadForm.grade);
      formData.append('board', uploadForm.board);
      formData.append('author', uploadForm.author);
      formData.append('academic_year', uploadForm.academic_year);

      await uploadBook(formData);
      setShowUploadModal(false);
      setUploadForm({
        title: '',
        subject: 'Science',
        grade: 'Class 10',
        board: 'CBSE',
        author: 'NCERT',
        academic_year: '2025-2026',
        file: null,
      });
      await loadBooks();
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (bookId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteBook(bookId);
      if (selectedBook?.id === bookId) setSelectedBook(null);
      await loadBooks();
    } catch (err) {
      alert(`Failed to delete book: ${err.message}`);
    }
  };

  const handleReindex = async (bookId) => {
    try {
      setReindexingId(bookId);
      await reindexBook(bookId);
      await loadBooks();
      alert('Book successfully re-indexed and updated in the RAG vector store!');
    } catch (err) {
      alert(`Re-indexing failed: ${err.message}`);
    } finally {
      setReindexingId(null);
    }
  };

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.grade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'All' || b.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const uniqueSubjects = ['All', ...new Set(books.map(b => b.subject))];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Textbook Library & NCERT Hub</h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete NCERT Curriculum (Classes 1–12) with official cascading selectors matching <strong>ncert.nic.in</strong>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition"
          >
            <UploadCloud className="w-4 h-4 text-indigo-600" />
            Upload Custom PDF
          </button>
          <button
            onClick={() => setActiveTab('ncert-catalog')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md transition"
          >
            <Globe className="w-4 h-4" />
            NCERT Online Portal
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('my-books')}
          className={`pb-3 text-sm font-extrabold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'my-books'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          My Indexed Textbooks ({books.length})
        </button>
        <button
          onClick={() => setActiveTab('ncert-catalog')}
          className={`pb-3 text-sm font-extrabold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'ncert-catalog'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="w-4 h-4 text-indigo-600" />
          🏛️ NCERT Official Portal (Class 1 to 12)
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MY INDEXED BOOKS                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'my-books' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by book name, subject, or grade..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Subject:</span>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {uniqueSubjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Books Grid */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-700">No textbooks in your personal library</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Explore the official NCERT catalog across Classes 1–12 or upload your own PDF textbook.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setActiveTab('ncert-catalog')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
                >
                  <Globe className="w-4 h-4" /> Open NCERT Class 1–12 Portal
                </button>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  <UploadCloud className="w-4 h-4" /> Upload Custom PDF
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                          {book.board || 'NCERT'} • {book.grade}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug">{book.title}</h3>
                        <p className="text-xs text-slate-500 font-medium">Subject: {book.subject} • {book.author || 'NCERT'}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(book.id, book.title)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition"
                        title="Delete Book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Layers className="w-3.5 h-3.5 text-indigo-600" />
                          Detected Chapters:
                        </span>
                        <span className="font-bold text-slate-900">{book.chapters?.length || 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-1.5 font-medium">
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          Total Pages / Chunks:
                        </span>
                        <span className="font-bold text-slate-900">{book.total_pages} pgs ({book.indexed_chunks || (book.chapters?.length * 4)} chunks)</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" /> Open Chapters
                    </button>
                    <button
                      onClick={() => {
                        onSelectBookForPaper(book.id);
                        onNavigate('generate');
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Generate Paper
                    </button>
                    <button
                      onClick={() => {
                        onSelectBookForChat(book.id);
                        onNavigate('chat');
                      }}
                      className="px-3 py-2 rounded-lg bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition flex items-center justify-center gap-1.5 shadow-sm"
                      title="Chat with this Book"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: NCERT OFFICIAL PORTAL (Class 1 to 12)                               */}
      {/* ========================================================================= */}
      {activeTab === 'ncert-catalog' && (
        <div className="space-y-6">
          {/* NCERT Direct Cascading Selector matching ncert.nic.in/textbook.php */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl space-y-6 border border-indigo-800/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-900/80 px-3 py-1 rounded-full border border-indigo-700/60">
                  Official NCERT Portal Directory (ncert.nic.in)
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  National Council of Educational Research and Training
                </h2>
                <p className="text-xs text-indigo-200/90">
                  Select Class (1 to 12), Subject, and Book Title to fetch and index official NCERT curriculum textbooks.
                </p>
              </div>
              <a
                href="https://ncert.nic.in/textbook.php"
                target="_blank"
                rel="noreferrer"
                className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs text-indigo-200 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl border border-white/15 transition"
              >
                ncert.nic.in <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Official 3-Tier Cascading Dropdown Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {/* 1. Select Class */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-indigo-200">
                  1. Select Class
                </label>
                <select
                  value={ncertClassFilter}
                  onChange={(e) => {
                    setNcertClassFilter(e.target.value);
                    setNcertSubjectFilter('All Subjects');
                    setNcertBookTitleFilter('All Books');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                >
                  {NCERT_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* 2. Select Subject */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-indigo-200">
                  2. Select Subject
                </label>
                <select
                  value={ncertSubjectFilter}
                  onChange={(e) => {
                    setNcertSubjectFilter(e.target.value);
                    setNcertBookTitleFilter('All Books');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                >
                  {dynamicSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* 3. Select Book Title */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-indigo-200">
                  3. Select Book Title
                </label>
                <select
                  value={ncertBookTitleFilter}
                  onChange={(e) => setNcertBookTitleFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                >
                  {dynamicBookTitles.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* 4. Live Search Bar */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-indigo-200">
                  4. Search Topic / Chapter
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={ncertSearchQuery}
                    onChange={(e) => setNcertSearchQuery(e.target.value)}
                    placeholder="e.g. Quadratic, Light, Motion..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Quick Filter Reset */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-indigo-200 pt-1 border-t border-white/10">
              <span className="font-semibold">
                Showing <strong>{displayedNcertCatalog.length}</strong> official textbooks
                {ncertClassFilter !== 'All Classes' && ` for ${ncertClassFilter}`}
                {ncertSubjectFilter !== 'All Subjects' && ` (${ncertSubjectFilter})`}
              </span>
              {(ncertClassFilter !== 'All Classes' || ncertSubjectFilter !== 'All Subjects' || ncertBookTitleFilter !== 'All Books' || ncertSearchQuery) && (
                <button
                  onClick={() => {
                    setNcertClassFilter('All Classes');
                    setNcertSubjectFilter('All Subjects');
                    setNcertBookTitleFilter('All Books');
                    setNcertSearchQuery('');
                  }}
                  className="text-amber-300 hover:text-amber-200 font-bold underline text-xs"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>

          {/* NCERT Catalog Results Grid */}
          {ncertLoading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : displayedNcertCatalog.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-700">No NCERT textbooks matched your selection</h3>
              <p className="text-xs text-slate-500">Try resetting the Class or Subject filter above.</p>
              <button
                onClick={() => {
                  setNcertClassFilter('All Classes');
                  setNcertSubjectFilter('All Subjects');
                  setNcertBookTitleFilter('All Books');
                  setNcertSearchQuery('');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Show All Classes 1 to 12
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedNcertCatalog.map((item) => {
                const isAlreadyImported = books.some(b => b.id === `ncert-${item.code}`);
                return (
                  <div
                    key={item.code}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                              {item.class_grade}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {item.medium} Medium
                            </span>
                          </div>
                          <h4 className="text-lg font-extrabold text-slate-900 leading-snug pt-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Subject: {item.subject} • NCERT Code: <span className="font-mono font-bold text-indigo-600">{item.code}</span>
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100 text-xs">
                        <div className="flex items-center justify-between text-slate-600 font-medium">
                          <span>Total Curriculum Chapters:</span>
                          <span className="font-extrabold text-slate-900">{item.total_chapters} Chapters</span>
                        </div>
                        <button
                          onClick={() => setPreviewNcertBook(item)}
                          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 pt-1"
                        >
                          <Eye className="w-3 h-3" /> View Chapter Syllabus &rarr;
                        </button>
                      </div>
                    </div>

                    {/* Import / Action Bar */}
                    <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                      {isAlreadyImported ? (
                        <div className="w-full flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> In Personal Library
                          </span>
                          <button
                            onClick={() => {
                              onSelectBookForPaper(`ncert-${item.code}`);
                              onNavigate('generate');
                            }}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm"
                          >
                            Generate Paper
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleImportNcert(item)}
                          disabled={importingCode === item.code}
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
                        >
                          {importingCode === item.code ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              Downloading & Indexing from NCERT...
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              1-Click Import & Index Book
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Chapter Syllabus Modal for NCERT Catalog Book */}
      {previewNcertBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  {previewNcertBook.class_grade} • {previewNcertBook.subject}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">{previewNcertBook.title}</h3>
                <p className="text-xs text-slate-500">
                  {previewNcertBook.chapters?.length} Official Curriculum Chapters
                </p>
              </div>
              <button
                onClick={() => setPreviewNcertBook(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-2 flex-1">
              {previewNcertBook.chapters?.map((ch) => (
                <div
                  key={ch.num}
                  className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">
                    Chapter {ch.num}: {ch.title}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    NCERT Code {previewNcertBook.code}{ch.num < 10 ? `0${ch.num}` : ch.num}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setPreviewNcertBook(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const toImport = previewNcertBook;
                  setPreviewNcertBook(null);
                  handleImportNcert(toImport);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Import & Index this Textbook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Inspector Drawer Modal for Existing Books */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  {selectedBook.board || 'NCERT'} • {selectedBook.grade}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedBook.title}</h3>
                <p className="text-xs text-slate-500">
                  {selectedBook.chapters?.length} Chapters Detected • {selectedBook.indexed_chunks || (selectedBook.chapters?.length * 4)} Indexed Chunks
                </p>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">Detected Chapters & Page Allocations</h4>
                {selectedBook.file_path && (
                  <button
                    onClick={() => handleReindex(selectedBook.id)}
                    disabled={reindexingId === selectedBook.id}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${reindexingId === selectedBook.id ? 'animate-spin' : ''}`} />
                    Re-process / Re-index Book
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {selectedBook.chapters?.map((ch, idx) => (
                  <div
                    key={ch.id || idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">
                        Chapter {ch.chapter_number}: {ch.title}
                      </span>
                      <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        Pages {ch.start_page} – {ch.end_page}
                      </span>
                    </div>
                    {ch.summary && (
                      <p className="text-xs text-slate-600 leading-relaxed">{ch.summary}</p>
                    )}
                    {ch.sections?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ch.sections.map((sec, sIdx) => (
                          <span key={sIdx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                            {sec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  onSelectBookForPaper(selectedBook.id);
                  setSelectedBook(null);
                  onNavigate('generate');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              >
                <Sparkles className="w-4 h-4" /> Generate Paper from this Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Custom Book Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Upload Custom Textbook (PDF)</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select PDF File *</label>
                <input
                  type="file"
                  accept=".pdf"
                  required
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 border border-slate-200 rounded-xl p-1"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Book Name / Title *</label>
                <input
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="e.g. NCERT Science Class 10"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={uploadForm.subject}
                    onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value })}
                    placeholder="e.g. Science, Mathematics"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class / Grade *</label>
                  <input
                    type="text"
                    required
                    value={uploadForm.grade}
                    onChange={(e) => setUploadForm({ ...uploadForm, grade: e.target.value })}
                    placeholder="e.g. Class 10, Class 8"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Board</label>
                  <input
                    type="text"
                    value={uploadForm.board}
                    onChange={(e) => setUploadForm({ ...uploadForm, board: e.target.value })}
                    placeholder="CBSE / ICSE / State"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={uploadForm.academic_year}
                    onChange={(e) => setUploadForm({ ...uploadForm, academic_year: e.target.value })}
                    placeholder="2025-2026"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 leading-relaxed">
                ✨ <strong>Automatic Pipeline:</strong> On upload, our PyMuPDF engine extracts structured text, detects chapter headings, sections, and indexes chunks into the RAG vector store for instant grounded paper generation.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Extracting & Indexing...
                    </>
                  ) : (
                    'Upload & Index Textbook'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
